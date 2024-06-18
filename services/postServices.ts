import type { ExtendedPost } from "~/types/posts";

export const getAllPosts = async () => {
  const response = await fetch("/api/v1/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data;
};

export const getPostById = async (id: number): Promise<ExtendedPost | null> => {
  const response = await fetch(`/api/v1/post/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  const data = await response.json();
  return data;
};
