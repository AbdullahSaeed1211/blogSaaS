"use client";

import { TfiFacebook, TfiLinkedin, TfiLink } from "react-icons/tfi";
import { RiTwitterXFill } from "react-icons/ri";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FacebookShare, TwitterShare, LinkedinShare } from "react-share-kit";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareDropdownProps {
  postUrl: string;
  title: string;
  description: string;
}

export default function ShareDropdown({
  postUrl,
  title,
  description,
}: ShareDropdownProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    return toast.success("Link copied to clipboard!");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>Share this article</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Copy Link */}
        <DropdownMenuItem
          onSelect={handleCopyLink}
          className="flex justify-start items-center gap-x-2 px-2">
          <TfiLink className="h-5 w-5 text-muted-foreground" />
          {copied ? "Link copied!" : "Copy link"}
        </DropdownMenuItem>

        {/* X (Twitter) Share */}
        <DropdownMenuItem asChild>
          <div className="flex justify-start items-center gap-x-2 px-2">
            <RiTwitterXFill className="h-5 w-5 text-muted-foreground" />
            <TwitterShare
              url={postUrl}
              title={`Check out this blog titled "${title}" at:`}
              buttonTitle="Share on X"
              blankTarget
            />
          </div>
        </DropdownMenuItem>

        {/* Facebook Share */}
        <DropdownMenuItem asChild>
          <div className="flex justify-start items-center gap-x-2 px-2">
            <TfiFacebook className="h-5 w-5 text-muted-foreground" />
            <FacebookShare
              url={postUrl}
              title={title}
              buttonTitle="Share on Facebook"
              blankTarget
            />
          </div>
        </DropdownMenuItem>

        {/* LinkedIn Share */}
        <DropdownMenuItem asChild>
          <div className="flex justify-start items-center gap-x-2 px-2">
            <TfiLinkedin className="h-5 w-5 text-muted-foreground" />
            <LinkedinShare
              url={postUrl}
              title={title}
              buttonTitle="Share on LinkedIn"
              summary={description}
              blankTarget
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
