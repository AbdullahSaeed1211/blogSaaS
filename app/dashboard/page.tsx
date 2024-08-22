import Image from "next/image";
import { EmptyState } from "../components/dashboard/EmptyState";
import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DefaultImage from "@/public/default.png";


async function getData(UserId: string) {
  //concurrent fetching of data
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: UserId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId: UserId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return {
    sites,
    articles,
  };
}

export default async function dashboardIndexPage() {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {sites.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.imageUrl ?? DefaultImage}
              alt="site image"
              className="rounded-t-lg object-cover w-full h-[200px]"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{item.name}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/dashboard/sites/${item.id}`}>
                  View Articles
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      ) : (
        <EmptyState
          title="You don't have any Sites yet"
          description=" You currently do not have any Sites. Please create some so that you can see them right here!"
          buttonText="Create Sites"
          href={`/dashboard/sites/new`}
        />
      )}

      <h1 className="text-xl font-semibold mb-5">Recent Articles</h1>
      {articles.length > 0 ? (
         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
         {articles.map((item) => (
           <Card key={item.id}>
             <Image
               src={item.image ?? DefaultImage}
               alt="site image"
               className="rounded-t-lg object-cover w-full h-[200px]"
               width={400}
               height={200}
             />
             <CardHeader>
               <CardTitle className="truncate">{item.title}</CardTitle>
               <CardDescription className="line-clamp-3">
                 {item.smallDescription}
               </CardDescription>
             </CardHeader>
             <CardFooter>
               <Button className="w-full" asChild>
                 <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                   Edit Article
                 </Link>
               </Button>
             </CardFooter>
           </Card>
         ))}
       </div>
      ) : (
        <EmptyState
          title="You don't have any Articles yet"
          description=" You currently do not have any Articles. Please create some so that you can see them right here!"
          buttonText="Create Articles"
          href={`/dashboard/sites`}
        />
      )}
    </div>
  );
}
