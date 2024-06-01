import { Post, PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const prisma = new PrismaClient();

export interface PostWithLikesAndBookmarks extends Post {
  likes: { id: number }[];
  bookmarkedPosts: { id: number }[];
}

export interface PostWithBoolean extends Omit<PostWithLikesAndBookmarks, "likes" | "bookmarkedPosts"> {
  isLiked: boolean;
  isBookmarked: boolean;
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  try {
    let posts: PostWithBoolean[] | null = [];

    if (!session || !session.user) {
      const postsWithoutBooleans = await prisma.post.findMany();
      posts = postsWithoutBooleans.map(post => ({
        ...post,
        isLiked: false,
        isBookmarked: false,
      })) as PostWithBoolean[];
    } else {
      const user = session.user;
      
      const rawPosts = (await prisma.post.findMany({
        include: {
          likes: {
            where: {
              userId: user.id,
              likeType: "POST",
            },
            select: {
              id: true,
            },
          },
          bookmarkedPosts: {
            where: {
              userId: user.id,
            },
            select: {
              id: true,
            },
          }
        },
      })) as PostWithLikesAndBookmarks[];

      posts = rawPosts.map((post) => ({
        ...post,
        isLiked: post.likes.length > 0,
        isBookmarked: post.bookmarkedPosts.length > 0,
      })) as PostWithBoolean[];
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
