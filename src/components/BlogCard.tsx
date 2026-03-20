"use client";

import { useIsEditMode } from "@/hooks/useIsEditMode";
import { editContentlet } from "@dotcms/uve";
import DotCMSImage from "@/components/DotCMSImage";
import Link from "next/link";
import type { Blog } from "@/types/blog";
import type { Contentlet } from "@dotcms/types";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function BlogCard(blog: Blog) {
  const { title, image, urlMap, modDate, urlTitle, description, author } = blog;
  const authorData = author?.[0];
  const authorName =
    authorData?.firstName && authorData?.lastName
      ? `${authorData.firstName} ${authorData.lastName}`
      : null;

  const isEditMode = useIsEditMode();

  return (
    <div className="flex size-full flex-col gap-2 p-3 bg-[#fdfdfb] rounded-2xl border group transition-all duration-200 hover:shadow-lg cursor-pointer relative">
      {isEditMode && (
        <button
          onClick={() => editContentlet(blog as Contentlet<Blog>)}
          className="absolute top-2 right-2 z-10 bg-blue-500 text-white rounded-md py-2 px-4 shadow-md hover:bg-blue-600"
        >
          Edit
        </button>
      )}

      <Link
        href={urlMap || "#"}
        className="relative w-full aspect-video rounded-lg overflow-hidden shrink-0 block"
      >
        {image ? (
          <DotCMSImage
            alt={urlTitle || title || ""}
            title={title || ""}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
            src={image}
            fill={true}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </Link>

      <div className="flex w-full flex-col gap-4 grow p-3">
        <div className="text-md w-full flex flex-col gap-4">
          <a
            href={urlMap || "#"}
            className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-200"
          >
            {title}
          </a>
          {description && (
            <div className="line-clamp-4">
              <p className="text-muted-foreground">{description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto">
          {modDate && (
            <time className="text-sm text-muted-foreground">
              {new Date(modDate).toLocaleDateString("en-US", dateFormatOptions)}
            </time>
          )}
          {authorName && (
            <div className="text-sm text-muted-foreground">{authorName}</div>
          )}
        </div>
      </div>
    </div>
  );
}
