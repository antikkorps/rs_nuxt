import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";
import { bookMarkSchema } from "~/schemas/bookmark-schema";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  const query = getQuery(event);
  const { page, limit } = query;

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
      return {
        statusCode: 401,
        body: "Unauthorized",
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalBookmarks = await prisma.bookmark.count({
      where: {
        userId: session.user.id,
      },
    });

    const bookmarkedPosts = await prisma.bookmark.findMany({
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

    const totalPages = Math.ceil(totalBookmarks / Number(limit));
    return {
      bookmarkedPosts,
      totalPages,
      page: Number(page),
      limit: Number(limit),
      remainingPages: totalPages - Number(page),
      remainingPostsBookmarked: totalBookmarks - skip - bookmarkedPosts.length,
    };
  }
});
