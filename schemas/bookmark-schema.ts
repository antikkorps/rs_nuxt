import { z } from "zod";

export const bookMarkSchema = z.object({
    postId: z.number(),
  });