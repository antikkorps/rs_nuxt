import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../../auth/[...]";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const session = await getServerSession(event, authOptions);
  let user = null;
  if (session && session.user) {
    user = session.user;
  }
  let post = null;

  try {
    if (!id) {
      return {
        error: "Id is required",
      };
    }

    post = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
      include: {
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
              },
            },
          },
        },
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

    if (!post) {
      return {
        error: "Post not found",
      };
    }

    return post;
  } catch (error) {
    return {
      error: err.message,
    };
  }
});
