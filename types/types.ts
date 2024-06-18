import type { Comment, User } from '@prisma/client';

export type UserRegistration = {
  email: string
  password: string
}


export type CommentFormatedWithCommentLikes = Comment & {
  commentLikes: {id: number}[];
  parentId: number | null;
  childCommentCount: number | null;
  user: User;
}

