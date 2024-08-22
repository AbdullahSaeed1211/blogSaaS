'use server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema, siteCreationSchema, siteSchema } from "./utils/zodSchema";
import prisma from "./utils/db";
import { requireUser } from "./utils/requireUser";

export async function CreateSiteAction(prevState: any, formData: FormData) {
    const user = await requireUser();
    //server validation for site creation
    const submission = await parseWithZod(formData, {
        schema: siteCreationSchema({
            async isSubdirectoryUnique() {
                const existingSubdirectory = await prisma.site.findUnique({
                    where: {
                        subdirectory: formData.get('subdirectory') as string,
                    }
                });
                return !existingSubdirectory;
            }
        }),
        async: true,
    });
    if (submission.status !== 'success') {
        return submission.reply();
    }

    const response = await prisma.site.create({
        data: {
            description: submission.value.description,
            name: submission.value.name,
            subdirectory: submission.value.subdirectory,
            userId: user.id,
        }
    });



    return redirect("/dashboard/sites");

}

// articles(posts) creation validation
export async function CreatePostAction(prevState: any, formData: FormData) {
    const user = await requireUser();

    const submission = parseWithZod(formData, {
        schema: PostSchema,
    });
    if (submission.status !== 'success') {
        return submission.reply();
    }

    const response = await prisma.post.create({
        data: {
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,
            userId: user.id,
            siteId: formData.get('siteId') as string,
        }
    });
    return redirect(`/dashboard/sites/${formData.get('siteId')}`);

}

//edit post
export async function EditPostActions(prevState: any, formData: FormData) {
    const user = await requireUser();
    const submission = parseWithZod(formData, {
        schema: PostSchema,
    });
    if (submission.status !== 'success') {
        return submission.reply();
    }
    const data = await prisma.post.update({
        where: {
            userId: user.id,
            id: formData.get('articleId') as string,
        },
        data: {
            title: submission.value.title,
            smallDescription: submission.value.smallDescription,
            slug: submission.value.slug,
            articleContent: JSON.parse(submission.value.articleContent),
            image: submission.value.coverImage,
        }
    })
    return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

//delete post
export async function DeletePostAction(formData: FormData) {
    const user = await requireUser();
    const data = await prisma.post.delete({
        where: {
            userId: user.id,
            id: formData.get('articleId') as string,
        }
    });
    return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

// edit site Image
export async function UpdateSiteImage(formData: FormData) {
    const user = await requireUser();
    const data = await prisma.site.update({
        where: {
            userId: user.id,
            id: formData.get('siteId') as string,
        },
        data: {
            imageUrl: formData.get('imageUrl') as string,
        }
    });
    return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

// delete site
export async function DeleteSiteAction(formData: FormData) {
    const user = await requireUser();
    const data = await prisma.site.delete({
        where: {
            userId: user.id,
            id: formData.get('siteId') as string,
        }
    });
    return redirect(`/dashboard/sites`);
}