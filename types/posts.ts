import type { Post } from "@prisma/client";
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
