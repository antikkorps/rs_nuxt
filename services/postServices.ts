export const getAllPosts = async () => {
  const response = await fetch("/api/v1/posts")
  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }
  const data = await response.json()
  return data
}
