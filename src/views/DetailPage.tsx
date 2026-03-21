"use client";

import DotCMSImage from "@/components/DotCMSImage";

import { enableBlockEditorInline } from "@dotcms/uve";
import { customRenderers } from "@/utils/blockEditorRenderers";
import {
  DotCMSBlockEditorRenderer,
  useEditableDotCMSPage,
} from "@dotcms/react";
import type {
  DotCMSComposedPageResponse,
  DotCMSPageResponse,
  DotCMSBasicContentlet,
} from "@dotcms/types";

import { useIsEditMode } from "@/hooks/useIsEditMode";
import type { BlogURLContentMap } from "@/types/blog";

interface DetailPageProps {
  pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

const BASE_EDITOR_CLASSES =
  "prose prose-slate max-w-none prose-img:rounded-xl prose-a:text-primary hover:prose-a:text-primary-dark [&_li_p]:my-0";

export function DetailPage({ pageContent }: DetailPageProps) {
  const { pageAsset } = useEditableDotCMSPage(pageContent);
  const urlContentMap = pageAsset?.urlContentMap as
    | BlogURLContentMap
    | undefined;
  const body = urlContentMap?.body?.json;
  const isEditMode = useIsEditMode();
  const blockEditorClasses = isEditMode
    ? `${BASE_EDITOR_CLASSES} border-2 border-solid border-cyan-400 cursor-pointer`
    : BASE_EDITOR_CLASSES;

  const handleClick = () => {
    if (isEditMode && urlContentMap) {
      enableBlockEditorInline(
        urlContentMap as unknown as DotCMSBasicContentlet,
        "body",
      );
    }
  };

  return (
    <main className="container m-auto">
      <article className="w-full py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {urlContentMap?.title && (
            <h1 className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight mb-6">
              {urlContentMap?.title}
            </h1>
          )}

          <div className="flex items-center gap-4 mb-8 pb-6 border-gray-100">
            {urlContentMap?.author?.[0]?.firstName && (
              <div className="flex items-center gap-2">
                {urlContentMap.author[0].image?.idPath ? (
                  <DotCMSImage
                    className="w-8 h-8 rounded-full object-cover"
                    src={urlContentMap.author[0].image!}
                    width={32}
                    height={32}
                    alt={`${urlContentMap.author[0].firstName} ${urlContentMap.author[0].lastName}`}
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-semibold">
                      {urlContentMap.author[0].firstName[0]}
                      {urlContentMap.author[0].lastName?.[0]}
                    </span>
                  </div>
                )}
                <span className="text-foreground font-medium">
                  {urlContentMap.author[0].firstName}{" "}
                  {urlContentMap.author[0].lastName}
                </span>
              </div>
            )}
            {urlContentMap?.publishDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time className="text-sm">
                  {new Date(urlContentMap.publishDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </time>
              </div>
            )}
          </div>

          {urlContentMap?.image && (
            <div className="mb-8 -mx-6 sm:-mx-8 md:-mx-12 lg:-mx-16">
              <div className="bg-gray-100 rounded-2xl p-2">
                <DotCMSImage
                  className="w-full h-auto object-cover rounded-xl"
                  src={urlContentMap.image}
                  width={800}
                  height={400}
                  alt={urlContentMap?.title || "Blog post image"}
                />
              </div>
            </div>
          )}

          <div onClick={handleClick} className={blockEditorClasses}>
            {body && (
              <DotCMSBlockEditorRenderer blocks={body} />
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
