import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { createCommentSchema } from "~/schemas/comment-schema";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

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
