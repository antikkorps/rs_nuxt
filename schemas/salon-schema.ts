import { z } from "zod";

export const SalonSchema = z.object({
    id: z.number().optional().nullable(),
    name: z.string().min(1).max(60),
    description: z.string().optional(),
    logo: z.string().optional(),
    street: z.string().min(1).max(255),
    zipcode: z.string().min(1).max(6),
    city: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
})


export type SalonType = z.infer<typeof SalonSchema>;