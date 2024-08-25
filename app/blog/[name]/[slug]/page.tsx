import { RenderArticle } from "@/app/components/dashboard/RenderArticle";
import { ThemeToggle } from "@/app/components/dashboard/ThemeToggle";
import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";
import ShareDropdown from "@/app/components/dashboard/ShareDropdown";
import { calculateReadingTime } from "@/app/utils/readingTime";

async function getdata(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      image: true,
      createdAt: true,
      smallDescription: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

const readingTime = require("reading-time");

export default async function SlugRoute({
  params,
}: {
  params: { slug: string; name: string };
}) {
  const data = await getdata(params.slug);
  const stats = calculateReadingTime(data.articleContent as string); // Calculate reading time
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.name}/${params.slug}`; // Base URL for sharing
  return (
    <>
      <div className="flex w-full items-center justify-between pt-10 pb-5">
        <div className="flex items-center gap-x-3">
          <Button variant="outline" size="icon">
            <Link href={`/blog/${params.name}`}>
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Go Back</h1>
        </div>

        <div className="flex gap-x-3 items-center justify-center">
          <ThemeToggle />
          <ShareDropdown
            postUrl={postUrl}
            title={data.title}
            description={data.smallDescription}
          />
        </div>
      </div>

      {/* Content rendering */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-3 w-10/12 text-sm font-light text-muted-foreground md:text-base">
            {stats} ·
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(data.createdAt)}
          </p>
          <h1 className="text-4xl tracking-tight mb-5 font-bold md:text-6xl">
            {data.title}
          </h1>
          <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
            {data.smallDescription}
          </p>
        </div>
      </div>

      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-15 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      <RenderArticle json={data.articleContent as JSONContent} />
    </>
  );
}