import type { ExtendedPost } from "~/types/posts"

export const getAllPosts = async (page: number = 1, limit: number = 3) => {
  const response = await fetch(`/api/v1/posts?page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  const data = await response.json()
  return data
}

export const getPostById = async (id: number): Promise<ExtendedPost | null> => {
  const response = await fetch(`/api/v1/post/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch post")
  }
  const data = await response.json()
  return data
}


export const getMyPosts = async (page: number = 1, limit: number = 3) => {
  const response = await fetch(`/api/v1/posts?me=true&page=${page}&limit=${limit}`)
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  const data = await response.json()
  return data
}