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