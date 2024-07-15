import { PrismaClient } from "@prisma/client";
import { LikeType, likeSchema } from "~/schemas/like-schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  const query = getQuery(event);

  if (event.method == "POST") {
    const body = await readBody(event);

    const bodyObject = JSON.parse(body);
    const parsedBody = likeSchema.safeParse(bodyObject);
    if (!parsedBody.success) {
      return {
        statusCode: 400,
        body: parsedBody.error.errors,
      };
    }

    const { likedItemId, likeType } = parsedBody.data;

    if (!session || !session.user) {
      return {
        statusCode: 401,
        body: "Unauthorized",
      };
    }
    if (likeType === LikeType.POST) {
      const post = await prisma.post.findUnique({
        where: { id: likedItemId },
      });

      if (!post) {
        return {
          statusCode: 404,
          body: "Post not found",
        };
      }

      const existingLike = await prisma.postLike.findUnique({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId: likedItemId,
          },
        },
      });

      if (existingLike) {
        return await prisma.postLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        const like = await prisma.postLike.create({
          data: {
            postId: likedItemId,
            userId: session.user.id,
          },
        });
        return like;
      }
    }

    if (likeType === LikeType.COMMENT) {
      const comment = await prisma.comment.findUnique({
        where: { id: likedItemId },
      });

      if (!comment) {
        return {
          statusCode: 404,
          body: "Comment not found",
        };
      }

      const existingLike = await prisma.commentLike.findUnique({
        where: {
          userId_commentId: {
            userId: session.user.id,
            commentId: likedItemId,
          },
        },
      });

      if (existingLike) {
        return await prisma.commentLike.delete({
          where: {
            id: existingLike.id,
          },
        });
      } else {
        const like = await prisma.commentLike.create({
          data: {
            commentId: likedItemId,
            userId: session.user.id,
          },
        });
        return like;
      }
    }
  }

  const { count, likedItemId, likeType, authUser, page, limit } = query;

  if (event.method == "GET") {
    if (count) {
      if (!likedItemId) {
        return {
          statusCode: 400,
          body: "likedItemId is required",
        };
      }

      let countLikes = 0;
      if (likeType === LikeType.POST) {
        countLikes = await prisma.postLike.count({
          where: {
            postId: parseInt(likedItemId as string),
          },
        });
      }
      if (likeType === LikeType.COMMENT) {
        countLikes = await prisma.commentLike.count({
          where: {
            commentId: parseInt(likedItemId as string),
          },
        });
      }
      return countLikes;
    }
    if (authUser) {
      // get post like for the auth user
      if (!session || !session.user) {
        return false;
      }

      const skip = (Number(page) - 1) * Number(limit);
      const totalLikes = await prisma.postLike.count({
        where: {
          userId: session.user.id,
        },
      });

      const likedPosts = await prisma.postLike.findMany({
        where: {
          userId: session.user.id,
        },
        skip: skip,
        take: Number(limit),
        orderBy: {
          id: "desc",
        },
        include: {
          post: {
            select: {
              id: true,
              title: true,
              description: true,
              createdAt: true,
              mediaPosts: {
                select: {
                  id: true,
                  url: true,
                },
              },
              user: {
                select: {
                  id: true,
                  pseudo: true,
                  email: true,
                },
              },
            },
          },
        },
      });

      const totalPages = Math.ceil(totalLikes / Number(limit));
      return {
        likedPosts,
        totalPages,
        page: Number(page),
        limit: Number(limit),
        remainingPages: totalPages - Number(page),
        remainingPostsLiked: totalLikes - skip - likedPosts.length,
      };
    }
  }
});
