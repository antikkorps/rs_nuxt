import { Comment, Post, PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";
import { authOptions } from "../auth/[...]";

const prisma = new PrismaClient();

export interface PostWithLikesAndBookmarks extends Post {
  postLikes: { id: number }[];
  bookmarkedPosts: { id: number }[];
}

export interface PostWithBoolean
  extends Omit<PostWithLikesAndBookmarks, "postLikes" | "bookmarkedPosts"> {
  isLiked: boolean;
  isBookmarked: boolean;
  comments: Comment[];
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event, authOptions);

  try {
    let posts: PostWithBoolean[] | null = [];

    if (!session || !session.user) {
      const postsWithoutBooleans = await prisma.post.findMany();
      posts = postsWithoutBooleans.map((post) => ({
        ...post,
        isLiked: false,
        isBookmarked: false,
        comments: [],
        totalComments: 0,
      })) as PostWithBoolean[];
    } else {
      const user = session.user;

      const rawPosts = (await prisma.post.findMany({
        include: {
          postLikes: {
            where: {
              userId: user.id,
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
          },
        },
      })) as PostWithLikesAndBookmarks[];

      posts = rawPosts.map((post) => ({
        ...post,
        isLiked: post.postLikes.length > 0,
        isBookmarked: post.bookmarkedPosts.length > 0,
        comments: [],
        totalComments: 0,
      })) as PostWithBoolean[];
    }

    const postIds = posts.map((post) => post.id);

    let comments: Comment[] | null = [];
    if (!session || !session.user) {
       comments = await prisma.comment.findMany({
        where: {
          postId: {
            in: postIds,
          },
          parentId: null,
        },
        include: {
          user: {
            select: {
              pseudo: true,
              avatar: true,
              firstname: true,
              lastname: true,
            },
          }
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });
    } else {
      const user = session.user;
      comments = await prisma.comment.findMany({
        where: {
          postId: {
            in: postIds,
          },
          parentId: null,
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
              userId: user.id
            },
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });
    }

    const commentsGroupedByPost = comments.reduce((acc, comment) => {
      if (!acc[comment.postId]) {
        acc[comment.postId] = [];
      }
      acc[comment.postId].push(comment);
      return acc;
    }, {} as Record<number, Comment[]>);

    const totalCommentsCounts = await prisma.comment.groupBy({
      by: ["postId"],
      where: {
        postId: {
          in: postIds,
        },
        parentId: null,
      },
      _count: {
        id: true,
      },
    });

    const totalCommentsMap = totalCommentsCounts.reduce(
      (acc, { postId, _count }) => {
        acc[postId] = _count.id;
        return acc;
      },
      {} as Record<number, number>
    );

    const commentIds = comments.map((comment) => comment.id);
    const childCommentCounts = await prisma.comment.groupBy({
      by: ["parentId"],
      where: {
        parentId: {
          in: commentIds,
        },
      },
      _count: {
        id: true,
      },
    });

    const childCommentMap = childCommentCounts.reduce(
      (acc, { parentId, _count }) => {
        acc[parentId] = _count.id;
        return acc;
      },
      {} as Record<number, number>
    );
    // Attach the comments to the corresponding posts
    posts = posts.map((post) => ({
      ...post,
      comments: (commentsGroupedByPost[post.id] || []).map((comment) => ({
        ...comment,
        childCommentCount: childCommentMap[comment.id] || 0,
      })),
      totalComments: totalCommentsMap[post.id] || 0,
    }));

    return {
      posts,
    };
  } catch (err: unknown) {
    return {
      error: err.message,
    };
  }
});
