import type { ComponentType } from "react";
import type { Metadata } from "next";
import type {
  DotCMSComposedPageResponse,
  DotCMSGraphQLParams,
  DotCMSPage,
  DotCMSPageResponse,
} from "@dotcms/types";
import {
  toAbsoluteUrl,
  buildWebPageStructuredData,
  buildCollectionPageStructuredData,
  buildArticleStructuredData,
  getAbsoluteImageUrl,
} from "./structuredData";
import type { BlogURLContentMap } from "@/types/blog";
import type { PageView } from "./pageView";
import {
  homeGraphQL,
  pageGraphQL,
  blogListGraphQL,
  blogDetailGraphQL,
} from "./queries";

import { Page } from "@/views/Page";
import { DetailPage } from "@/views/DetailPage";
import { BlogListingPage } from "@/views/BlogListingPage";

type PageData = DotCMSComposedPageResponse<DotCMSPageResponse>;

interface ViewProps {
  pageContent: PageData;
}

type ViewComponent = ComponentType<ViewProps>;
type MetadataBuilder = (pageData: PageData, path: string) => Metadata;
type StructuredDataBuilder = (
  pageData: PageData,
  path: string,
) => Record<string, unknown>;

interface PageConfig {
  component: ViewComponent;
  metadata: MetadataBuilder;
  structuredData: StructuredDataBuilder;
  query: DotCMSGraphQLParams;
}

function getPageMeta(page: DotCMSPage): {
  title?: string;
  description?: string;
} {
  return {
    title: page?.friendlyName || page?.title,
    description: page?.seodescription || undefined,
  };
}

function buildPageMetadata({
  title,
  description,
  path,
  imageUrl,
  type = "website",
}: {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  type?: string;
}): Metadata {
  const url = toAbsoluteUrl(path || "/") || undefined;

  return {
    title: title || "Page",
    description: description || undefined,
    alternates: { canonical: url },
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      url,
      type: type as "website" | "article",
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
    },
  };
}

export const pageConfig: Record<PageView, PageConfig> = {
  home: {
    component: Page,
    query: homeGraphQL,
    metadata: (pageData, path) => {
      const { title, description } = getPageMeta(pageData.pageAsset?.page);
      return buildPageMetadata({ title, description, path });
    },
    structuredData: (pageData, path) => {
      const { title, description } = getPageMeta(pageData.pageAsset?.page);
      return buildWebPageStructuredData({ title, description, path });
    },
  },
  page: {
    component: Page,
    query: pageGraphQL,
    metadata: (pageData, path) => {
      const { title, description } = getPageMeta(pageData.pageAsset?.page);
      return buildPageMetadata({ title, description, path });
    },
    structuredData: (pageData, path) => {
      const { title, description } = getPageMeta(pageData.pageAsset?.page);
      return buildWebPageStructuredData({ title, description, path });
    },
  },
  blog: {
    component: BlogListingPage,
    query: blogListGraphQL,
    metadata: (pageData, path) => {
      const { title: pageTitle, description } = getPageMeta(
        pageData.pageAsset?.page,
      );
      const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
      return buildPageMetadata({
        title,
        description:
          description ||
          "Discover amazing destinations, travel tips, and unforgettable adventures.",
        path,
      });
    },
    structuredData: (pageData, path) => {
      const { title: pageTitle, description } = getPageMeta(
        pageData.pageAsset?.page,
      );
      const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
      return buildCollectionPageStructuredData({ title, description, path });
    },
  },
  "blog-detail": {
    component: DetailPage,
    query: blogDetailGraphQL,
    metadata: (pageData: PageData, path: string) => {
      const urlContentMap = pageData.pageAsset?.urlContentMap as
        | BlogURLContentMap
        | undefined;
      const title = urlContentMap?.title
        ? `${urlContentMap.title} - Blog`
        : "Blog";
      const description =
        urlContentMap?.description || urlContentMap?.teaser || undefined;
      const imageUrl = urlContentMap?.image?.idPath
        ? (getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined)
        : undefined;
      return buildPageMetadata({
        title,
        description,
        path,
        imageUrl,
        type: "article",
      });
    },
    structuredData: (pageData, path) => {
      const urlContentMap = pageData.pageAsset?.urlContentMap as
        | BlogURLContentMap
        | undefined;
      const author = urlContentMap?.author?.[0];
      const authorName = author
        ? [author.firstName, author.lastName].filter(Boolean).join(" ")
        : undefined;
      const imageUrl = urlContentMap?.image?.idPath
        ? (getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined)
        : undefined;
      return buildArticleStructuredData({
        title: urlContentMap?.title,
        description: urlContentMap?.description || urlContentMap?.teaser,
        authorName,
        datePublished: urlContentMap?.postingDate,
        dateModified: urlContentMap?.modDate || urlContentMap?.postingDate,
        imageUrl,
        path,
      });
    },
  },
};
