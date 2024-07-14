import type { MediaPost, Post, User } from "@prisma/client";
import type { CommentFormatedWithCommentLikes } from "./types";

export interface ExtendedPost extends Post {
  comments: CommentFormatedWithCommentLikes[];
  bookmarkedPosts?: { id: number }[];
  postLikes?: { id: number }[];
  _count: {
    comments: number;
    postLikes: number;
  };
}

export interface BookmarkedAndLikedPost {
  id: number;
  post: {
    title?: string;
    createdAt: string;
    description?: string;
    id: number;
    mediaPosts?: Partial<MediaPost[]>;
    user: Partial<User>;
  },
  postId: number;
  userId: string;
}

export interface UserGalleryPost {
    title?: string;
    createdAt: string;
    description?: string;
    id: number;
    mediaPosts?: Partial<MediaPost[]>;
    user: Partial<User>;
}