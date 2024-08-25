import prisma from "@/app/utils/db";
import { Metadata } from "next";
import { ReactNode } from "react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    select: {
      title: true,
      image: true,
      smallDescription: true,
    },
  });

  if (!post) {
    return {
      title: "Post not found",
      description: "No post found for the given slug",
    };
  }

  return {
    title: post.title || "Default Title",
    description: post.smallDescription || "Gather Your Ideas, Share Your Story",
    openGraph: {
      title: post.title,
      description: post.smallDescription,
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.smallDescription,
      images: post.image ? [{ url: post.image }] : [],
    },
  };
}

export default function SlugLayout({ children }: { children: ReactNode }) {
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">{children}</main>;
}
