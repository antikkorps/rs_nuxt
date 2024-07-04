import type { z } from "zod";
import { createCommentSchema } from "~/schemas/comment-schema";

export const createComment = async <T>(
  values: z.infer<typeof createCommentSchema>
) => {
  const response = await fetch("/api/v1/comment", {
    method: "POST",
    body: JSON.stringify({
      values,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create comment");
  }
  const data = await response.json();

  return data;
};


export const getCommentsByPostId = async (postId: number) => {
  const response = await fetch(`/api/v1/comment?postId=${postId}`);

  if (!response.ok) {
    throw new Error("Failed to get comments");
  }

  const data = await response.json();

  return data;
}

export const getChildrenByCommentId = async (commentId: number) => {
  const response = await fetch(`/api/v1/comment?getChildren=true&commentId=${commentId}`);

  if (!response.ok) {
    throw new Error("Failed to get comments");
  }
  console.log(response)
  const data = await response.json();
  return data;
}

export const getChildrenByCommentIdWithPagination = async (commentId: number, page: number = 1, limit: number = 5) => {
  const response = await fetch(`/api/v1/comment?getChildren=true&pagination=true&commentId=${commentId}&page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to get comments");
  }

  const data = await response.json();
  return data;
};

export const getCommentById = async (commentId: number) => {
  const response = await fetch(`/api/v1/comment?commentId=${commentId}`);

  if (!response.ok) {
    throw new Error("Failed to get comment");
  }

  const data = await response.json();

  return data;
}