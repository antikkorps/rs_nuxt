import { LikeType } from "@prisma/client";
import { z } from "zod";

export const likeSchema = z.object({
    likedItemId: z.coerce.number(),
    likeType: z.nativeEnum(LikeType),
  });