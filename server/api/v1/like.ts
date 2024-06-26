import { PrismaClient } from "@prisma/client";
import { LikeType, likeSchema } from "~/schemas/like-schema";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";


const prisma = new PrismaClient();



export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

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
            userId: session.user.id
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
            userId: session.user.id
          },
        });
        return like;
      }
    }
  }

  if (event.method == "GET") {
    if (!session || !session.user) {
      return false;
    }
    const query = getQuery(event);
    if (!query.likedItemId) {
      return {
        statusCode: 400,
        body: "likedItemId is required",
      };
    }
    const likedItemId = parseInt(query.likedItemId as string);
    const existingLike = await prisma.postLike.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: likedItemId,
        },
      },
    });

    return !!existingLike;
  }
});

