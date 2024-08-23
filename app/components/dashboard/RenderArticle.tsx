"use client";
import { JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import Code from "@tiptap/extension-code";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderedList from "@tiptap/extension-ordered-list";
export function RenderArticle({ json }: { json: JSONContent }) {
  const OutPut = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Heading,
      Blockquote,
      BulletList,
      Link,
      Underline,
      ListItem,
      Code,
      TextStyle,
      CodeBlock,
      OrderedList,
    ]);
  }, [json]);
  return (
    <div
      dangerouslySetInnerHTML={{ __html: OutPut }}
      className="prose m-auto w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary"
    />
  );
}
