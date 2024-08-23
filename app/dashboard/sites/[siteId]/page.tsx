import { EmptyState } from "@/app/components/dashboard/EmptyState";
import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Book,
  FileIcon,
  MoreHorizontal,
  PlusCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData(userId: string, siteId: string) {
  // const data = await prisma.post.findMany({
  //   where: {
  //     userId: userId,
  //     siteId: siteId,
  //   },
  //   select: {
  //     image: true,
  //     title: true,
  //     createdAt: true,
  //     id: true,
  //     Site:{
  //       select:{

  //         subdirectory: true,
  //       }
  //     }
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  // return data;

  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return data;
}

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="size-4 mr-2" />
            View blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings className="size-4 mr-2" />
            Site Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      {data?.posts === undefined || data.posts.length === 0 ? (
        <>
          <EmptyState
            title="You don't have any Articles yet"
            description=" You currently do not have any Articles. Please create some so that you can see them right here!"
            buttonText="Create Articles"
            href={`/dashboard/sites/${params.siteId}/create`}
          />
        </>
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Manage your Articles in a simple and intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.posts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image || ""}
                          width={64}
                          height={64}
                          alt="Article cover image"
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500">
                          Published
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                        }).format(item.createdAt)}
                      </TableCell>
                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${params.siteId}/${item.id}`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" asChild>
                              <Link
                                href={`/dashboard/sites/${params.siteId}/${item.id}/delete`}>
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
