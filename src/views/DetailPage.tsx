"use client";

import DotCMSImage from "@/components/DotCMSImage";

import { enableBlockEditorInline } from "@dotcms/uve";
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

  const author = urlContentMap?.author?.[0];
  const authorName =
    author?.firstName && author?.lastName
      ? `${author.firstName} ${author.lastName}`
      : null;

  return (
    <main className="detail-page">
      <article>
        <div>
          {urlContentMap?.title && (
            <h1>{urlContentMap.title}</h1>
          )}

          <div className="detail-page__meta">
            {author?.image?.idPath && authorName && (
              <div className="detail-page__author">
                <DotCMSImage
                  src={author.image}
                  width={32}
                  height={32}
                  alt={authorName}
                />
                <span>{authorName}</span>
              </div>
            )}
            {urlContentMap?.publishDate && (
              <div className="detail-page__date">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time>
                  {new Date(urlContentMap.publishDate).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </time>
              </div>
            )}
          </div>

          {urlContentMap?.image && (
            <div className="detail-page__image">
              <DotCMSImage
                src={urlContentMap.image}
                width={800}
                height={400}
                alt={urlContentMap?.title || "Blog post image"}
              />
            </div>
          )}

          <div onClick={handleClick} className={blockEditorClasses}>
            {body && <DotCMSBlockEditorRenderer blocks={body} />}
          </div>
        </div>
      </article>
    </main>
  );
}
