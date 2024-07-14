export const attachDetachBookmark = async (postId: number) => {
  const response = await fetch("/api/v1/bookmark", {
    method: "POST",
    body: JSON.stringify({
      postId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to toggle bookmark");
  }
  const data = await response.json();

  return data;
};


export const getBookmarksByAuthUser = async (page: number = 1, limit: number = 3) => {
  const response = await fetch(`/api/v1/bookmark?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }
  const data = await response.json();

  return data;
}