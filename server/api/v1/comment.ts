import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { createCommentSchema } from "~/schemas/comment-schema";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const session = await getServerSession(event, authOptions);
  let user = null;
  if (session && session.user) {
    user = session.user;
  }

  if (event.method === "GET") {
    if (query.postId) {
      const { postId } = query;
      if (!postId) {
        return { statusCode: 400, body: "postId is required" };
      }

      if (postId) {
        const commentsWithLikes = await prisma.comment.findMany({
          where: {
            postId: Number(postId),
            parentId: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                pseudo: true,
                avatar: true,
                firstname: true,
                lastname: true,
              },
            },
            _count: {
              select: {
                children: true,
              },
            },
            commentLikes: user
              ? {
                  where: {
                    userId: user.id,
                  },
                  select: {
                    id: true,
                  },
                }
              : false,
          },
        });
        return commentsWithLikes;
      }
    }

    if (query.commentId) {
      const { commentId } = query;
      if (!commentId) {
        return { statusCode: 400, body: "commentId is required" };
      }
      if (commentId) {
        const commentsWithLikes = await prisma.comment.findMany({
          where: {
            parentId: Number(commentId),
          },
          take: 10,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                pseudo: true,
                avatar: true,
                firstname: true,
                lastname: true,
              },
            },
            _count: {
              select: {
                children: true,
              },
            },
            commentLikes: user
              ? {
                  where: {
                    userId: user.id,
                  },
                  select: {
                    id: true,
                  },
                }
              : false,

            parent: {
              include: {
                user: {
                  select: {
                    pseudo: true,
                    avatar: true,
                    firstname: true,
                    lastname: true,
                  },
                },
                _count: {
                  select: {
                    children: true,
                  },
                },
                commentLikes: user
                ? {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                    },
                  }
                : false,
              },
            },
          },
        });
        return commentsWithLikes;
      }
    }
  }

  if (event.method == "POST") {
    const body = await readBody(event);

    const bodyObject = JSON.parse(body);

    const parsedBody = createCommentSchema.safeParse(bodyObject.values);

    if (!parsedBody.success) {
      return {
        statusCode: 400,
        body: parsedBody.error.errors,
      };
    }

    const { postId, description, parentId } = parsedBody.data;

    if (!session || !session.user) {
      return {
        statusCode: 401,
        body: "Unauthorized",
      };
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        statusCode: 404,
        body: "Post not found",
      };
    }

    const comment = await prisma.comment.create({
      data: {
        postId: postId,
        description: description,
        parentId: parentId ?? null,
        userId: session.user.id,
      },
    });
    return comment;
  }
  return {
    statusCode: 405,
    body: "Method not allowed",
  };
});
