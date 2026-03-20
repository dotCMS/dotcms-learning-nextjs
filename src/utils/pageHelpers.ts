import type { Metadata } from "next";
import type { DotCMSComposedPageResponse, DotCMSPage, DotCMSPageResponse } from "@dotcms/types";
import {
    toAbsoluteUrl,
    buildWebPageStructuredData,
    buildCollectionPageStructuredData,
    buildArticleStructuredData,
    getAbsoluteImageUrl,
} from "./structuredData";
import type { BlogURLContentMap } from "@/types/blog";

export type PageView = "blog-detail" | "blog" | "page";

type PageData = DotCMSComposedPageResponse<DotCMSPageResponse>;
type MetadataBuilder = (pageData: PageData, path: string) => Metadata;
type StructuredDataBuilder = (pageData: PageData, path: string) => Record<string, unknown>;

export function detectPageView(pageData: PageData): PageView {
    const raw: string = pageData?.pageAsset?.page?.url ?? "";
    const url = raw.replace(/\/index$/, "");

    if (url.startsWith("/blog/") && url.split("/").length > 2) return "blog-detail";
    if (url === "/blog" || url === "/blog/") return "blog";

    return "page";
}

export function getVanityRedirect(pageData: PageData): string | null {
    const vanityUrl = pageData?.pageAsset?.vanityUrl;
    const action = vanityUrl?.action ?? 0;
    if (action > 200 && vanityUrl?.forwardTo) {
        return vanityUrl.forwardTo;
    }
    return null;
}

function getPageMeta(page: DotCMSPage): { title?: string; description?: string } {
    return {
        title: page?.friendlyName || page?.title,
        description: page?.seodescription || undefined,
    };
}

export function buildPageMetadata({
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

export const pageMetadata: Record<PageView, MetadataBuilder> = {
    "blog-detail": (pageData, path) => {
        const urlContentMap = pageData.pageAsset?.urlContentMap as BlogURLContentMap | undefined;
        const title = urlContentMap?.title ? `${urlContentMap.title} - Blog` : "Blog";
        const description = urlContentMap?.description || urlContentMap?.teaser || undefined;
        const imageUrl = urlContentMap?.image?.idPath
            ? getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined
            : undefined;
        return buildPageMetadata({ title, description, path, imageUrl, type: "article" });
    },
    blog: (pageData, path) => {
        const { title: pageTitle, description } = getPageMeta(pageData.pageAsset?.page);
        const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
        return buildPageMetadata({
            title,
            description: description || "Discover amazing destinations, travel tips, and unforgettable adventures.",
            path,
        });
    },
    page: (pageData, path) => {
        const { title, description } = getPageMeta(pageData.pageAsset?.page);
        return buildPageMetadata({ title, description, path });
    },
};

export const pageStructuredData: Record<PageView, StructuredDataBuilder> = {
    "blog-detail": (pageData, path) => {
        const urlContentMap = pageData.pageAsset?.urlContentMap as BlogURLContentMap | undefined;
        const author = urlContentMap?.author?.[0];
        const authorName = author
            ? [author.firstName, author.lastName].filter(Boolean).join(" ")
            : undefined;
        const imageUrl = urlContentMap?.image?.idPath
            ? getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined
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
    blog: (pageData, path) => {
        const { title: pageTitle, description } = getPageMeta(pageData.pageAsset?.page);
        const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
        return buildCollectionPageStructuredData({ title, description, path });
    },
    page: (pageData, path) => {
        const { title, description } = getPageMeta(pageData.pageAsset?.page);
        return buildWebPageStructuredData({ title, description, path });
    },
};
