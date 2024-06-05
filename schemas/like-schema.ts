import { z } from "zod";

export const LikeType = {
  POST: "POST",
  COMMENT: "COMMENT",
};

export const likeSchema = z.object({
    likedItemId: z.coerce.number(),
    likeType: z.nativeEnum(LikeType),
  });