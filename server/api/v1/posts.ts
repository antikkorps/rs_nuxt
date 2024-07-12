import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const session = await getServerSession(event, authOptions);
  let user = null;
  if (session && session.user) {
    user = session.user;
  }

  const { page = 1, limit = 3 } = query;

  try {
    const skip = (Number(page) - 1) * Number(limit);
    const totalPosts = await prisma.post.count();
    const posts = await prisma.post.findMany({
      skip: skip,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        postLikes: user
          ? {
              where: {
                userId: user.id,
              },
              select: {
                id: true,
              },
            }
          : false,
        _count: {
          select: {
            comments: {
              where: {
                parentId: null,
              },
            },
            postLikes: true,
          },
        },
        comments: {
          take: 3,
          where: {
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
            _count: {
              select: {
                children: true,
                commentLikes: true,
              },
            },
          },
        },
        bookmarkedPosts: user
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
    const totalPages = Math.ceil(totalPosts / Number(limit));
    return {
      posts,
      page: Number(page),
      limit: Number(limit),
      totalPages: totalPages,
      totalPosts: totalPosts,
      remainingPages: totalPages - Number(page),
      remainingPosts: totalPosts - skip - posts.length,
    };
  } catch (err: unknown) {
    return {
      error: err.message,
    };
  }
});
