import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);
  

  
  try {
    let posts = [];

    if (!session || !session.user) {
      posts = await prisma.post.findMany({
        include: {
          _count: {
            select: {
              comments: {
                where: {
                  parentId: null,
                },
              },
              postLikes: true,
            }
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

              _count: {
                select: {
                  children: true,
                }
              },
            },
          },
        },
      });
    } else {
      const user = session.user;

      const rawPosts = await prisma.post.findMany({
        include: {
          postLikes: {
            where: {
              userId: user.id,
            },
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              comments: {
                where: {
                  parentId: null,
                },
              },
              postLikes: true,
            }
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
              commentLikes: {
                where: {
                  userId: user.id,
                },
                select: {
                  id: true,
                },
              },
              _count: {
                select: {
                  children: true,
                }
              },
            },
          },
          bookmarkedPosts: {
            where: {
              userId: user.id,
            },
            select: {
              id: true,
            },
          },
        },
      });
      posts = rawPosts
    }

    return {
      posts,
    };
  } catch (err: unknown) {
    return {
      error: err.message,
    };
  }
});
