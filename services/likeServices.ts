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

export const getLikesByAuthUser = async (page: number = 1, limit: number = 3) => {
  const response = await fetch(`/api/v1/like?authUser=true&page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch likes");
  }
  const data = await response.json();

  return data;
}