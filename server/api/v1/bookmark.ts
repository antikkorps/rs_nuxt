import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { bookMarkSchema } from "~/schemas/bookmark-schema";

const prisma = new PrismaClient();


export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  if (event.method == "POST") {
    const body = await readBody(event);
    const bodyObject = JSON.parse(body);
    const parsedBody = bookMarkSchema.safeParse(bodyObject);
    if (!parsedBody.success) {
      return {
        statusCode: 400,
        body: parsedBody.error.errors,
      };
    }

    const { postId } = parsedBody.data;

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

    const existingBookMarked = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });
    if (existingBookMarked) {
      return await prisma.bookmark.delete({
        where: { id: existingBookMarked.id },
      });
    } else {
      return await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          postId,
        },
      });
    }
  }

  if (event.method == "GET") {
    if (!session || !session.user) {
      return false;
    }
    const query = getQuery(event);
    if (!query.postId) {
      return {
        statusCode: 400,
        body: "likedItemId is required",
      };
    }
    const postId = parseInt(query.postId as string);
    const existingBookMarked = await prisma.bookmark.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });

    return !!existingBookMarked;
  }
});
