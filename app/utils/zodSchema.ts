import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

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

// subdirectory schema (async validation) 
export function siteCreationSchema(options?: {
    isSubdirectoryUnique: () => Promise<boolean>
}) {
    return z.object({
        subdirectory: z
            .string()
            .min(1)
            .max(35)
            .regex(/^[a-z]+$/, "Subdirectory must be lowercase")
            .transform((value) => value.toLowerCase())
            .pipe(
                z.string().superRefine((email, ctx) => {
                    if (typeof options?.isSubdirectoryUnique !== 'function') {
                        ctx.addIssue({
                            code: 'custom',
                            message: conformZodMessage.VALIDATION_UNDEFINED,
                            fatal: true,
                        })
                        return;
                    }
                    return options.isSubdirectoryUnique().then((isUnique) => {
                        if (!isUnique) {
                            ctx.addIssue({
                                code: 'custom',
                                message: 'Subdirectory already taken ...',
                            });
                        }
                    });
                }),
            ),
        name: z.string().min(1).max(35),
        description: z.string().min(1).max(150),
    });
}