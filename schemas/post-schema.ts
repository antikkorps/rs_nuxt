import { PostType, UserChoiceStatus } from "@prisma/client";
import { z } from "zod";

const TagSchema = z.object({
    id: z.number(),
    postId: z.number(),
    tagName: z.string(),
});

const MediaPostSchema = z.object({
    id: z.number(),
    postId: z.number(),
    url: z.string(),
    name: z.string().optional(),
    status: z.boolean().default(false),
});

const PostContentSchema = z.object({
    id: z.number().optional(),
    postTypeId: z.number().optional(),
    content: z.string(),
});

const PostTypeChoiceSchema = z.object({
    id: z.number().optional(),
    postId: z.number().optional(),
    type: z.enum([PostType.MEDIA, PostType.TEXT]),
    content: z.array(PostContentSchema),
});

export const PostFormSchema = z.object({
    id: z.number().optional().nullable(),
    title: z.string().max(60).optional(),
    description: z.string().max(255).optional(), // FIXME: 255 is not enough
    // tags: z.array(TagSchema).optional(),
    // mediaPosts: z.array(MediaPostSchema).optional(),
    // postTypeChoice: z.object({PostTypeChoiceSchema}),
    user_status: z.enum([UserChoiceStatus.DRAFT, UserChoiceStatus.ARCHIVED, UserChoiceStatus.PUBLISHED]),
})


export type PostTypeZod = z.infer<typeof PostFormSchema>;