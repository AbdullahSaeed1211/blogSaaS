import {z} from "zod";

//site schema
export const siteSchema = z.object({
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(150),
    subdirectory: z.string().min(1).max(35),
})