export const attachDetachBookmark = async (postId: number) => {
    const response = await fetch("/api/v1/bookmark", {
        method: "POST",
        body: JSON.stringify({
          postId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to toggle bookmark")
      }
      const data = await response.json();

      return data;
}