import { z } from "zod";

export const createCommentSchema = z.object({
    description: z.string().min(1).max(255),
    postId: z.number(),
    parentId: z.number().nullable(),
})