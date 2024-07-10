export const likeUnlike = async ({
  likedItemId,
  likeType,
}: {
  likedItemId: number
  likeType: string
}) => {
  const response = await fetch("/api/v1/like", {
    method: "POST",
    body: JSON.stringify({
      likedItemId,
      likeType,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to toggle like")
  }
  const data = await response.json()
  return data
}


export const getItemCountLikes = async (likedItemId: number, likeType: string) => {
  const response = await fetch(`/api/v1/like?count=true&likeType=${likeType}&likedItemId=${likedItemId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch like count")
  }
  const data = await response.json()
  return data
}