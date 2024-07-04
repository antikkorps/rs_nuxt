import type { Comment, User } from '@prisma/client';

export type UserRegistration = {
  email: string
  password: string
}


export type CommentFormatedWithCommentLikes = Comment & {
  commentLikes: {id: number}[];
  parentId: number | null;
  depth: number;
  childCommentCount: number | null;
  user: User;
  _count: {
    children: number;
  }
  parent: CommentFormatedWithCommentLikes | null;
}

