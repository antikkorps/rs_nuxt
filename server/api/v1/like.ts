import { LikeType, PrismaClient } from "@prisma/client";
import { likeSchema } from "~/schemas/like-schema";
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
      // const t = LikeType.POST;
      // const prismaModel = prisma[t];
      const post = await prisma.post.findUnique({
        where: { id: likedItemId },
      });

      if (!post) {
        return {
          statusCode: 404,
          body: "Post not found",
        };
      }
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_likedItemId: {
          userId: session.user.id,
          likedItemId,
        },
      },
    });

    if (existingLike) {
      return await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      return await prisma.like.create({
        data: {
          likeType,
          likedItemId,
          userId: session.user.id,
        },
      });
    }
  }

  if(event.method == "GET") {
    if (!session || !session.user) {
      return false;
    }
    const query = getQuery(event);
    if(!query.likedItemId) {
      return {
        statusCode: 400,
        body: "likedItemId is required",
      };
    }
    const likedItemId = parseInt(query.likedItemId as string);
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_likedItemId: {
          userId: session.user.id as string,
          likedItemId: likedItemId,
        },
      },
    });

    return !!existingLike

  }
});
