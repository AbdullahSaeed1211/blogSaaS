"use client";

import { UploadDropzone } from "@/app/utils/uploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateSiteImage } from "@/app/actions";

interface iAppProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Upload an image to be used as the site{`'`}s logo
          </CardDescription>
          <CardContent>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="uploaded image"
                width={200}
                height={200}
                className="size-[200px] object-cover rounded-lg"
              />
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success("Image uploaded successfully");
                }}
                onUploadError={() => {
                  toast.error("Image upload failed");
                }}
              />
            )}
          </CardContent>
        </CardHeader>
        <CardFooter>
          <form action={UpdateSiteImage}>
            <input type="hidden" name="siteId" value={siteId} />
            <input type="hidden" name="imageUrl" value={imageUrl} />
            <SubmitButton text="Change Image" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
