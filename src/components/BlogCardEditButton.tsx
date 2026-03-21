"use client";

import { useIsEditMode } from "@/hooks/useIsEditMode";
import { editContentlet } from "@dotcms/uve";
import type { Blog } from "@/types/blog";
import type { Contentlet } from "@dotcms/types";

export function BlogCardEditButton({ blog }: { blog: Blog }) {
  const isEditMode = useIsEditMode();

  if (!isEditMode) return null;

  return (
    <button
      onClick={() => editContentlet(blog as Contentlet<Blog>)}
      className="absolute top-2 right-2 z-10 bg-blue-500 text-white rounded-md py-2 px-4 shadow-md hover:bg-blue-600"
    >
      Edit
    </button>
  );
}
