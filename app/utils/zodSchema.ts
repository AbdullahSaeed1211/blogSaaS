import {z} from "zod";

//site schema
export const siteSchema = z.object({
    name: z.string().min(1).max(35),
    description: z.string().min(1).max(150),
    subdirectory: z.string().min(1).max(35),
})

//article schema
export const PostSchema = z.object({
    title: z.string().min(1).max(35),
    slug: z.string().min(1).max(190),
    coverImage: z.string().min(1),
    smallDescription: z.string().min(1).max(200),
    articleContent: z.string().min(1),
})