import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    firstname: z.string().min(2).max(255),
    lastname: z.string().min(2).max(255),
    email: z.string().email(),
    role: z.string(),
    // bio: z.string().max(255).nullable(),
    avatar: z.string().nullable(),
    // cover: z.string().nullable(),
    // location: z.string().nullable(),
    // website: z.string().nullable(),
    // birthday: z.string().nullable(),

});
export type User = z.infer<typeof userSchema>;