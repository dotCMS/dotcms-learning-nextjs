import type { Metadata } from "next";
import type { DotCMSComposedPageResponse, DotCMSPageResponse } from "@dotcms/types";
import { toAbsoluteUrl } from "./structuredData";

export type PageView = "detail" | "blog-listing" | "page";

export function detectPageView(pageData: DotCMSComposedPageResponse<DotCMSPageResponse>): PageView {
    const url: string = pageData?.pageAsset?.page?.url ?? "";

    if (url.startsWith("/blog/") && url.split("/").length > 2) return "detail";
    if (url === "/blog" || url === "/blog/") return "blog-listing";

    return "page";
}

export function getVanityRedirect(pageData: DotCMSComposedPageResponse<DotCMSPageResponse>): string | null {
    const vanityUrl = pageData?.pageAsset?.vanityUrl;
    const action = vanityUrl?.action ?? 0;
    if (action > 200 && vanityUrl?.forwardTo) {
        return vanityUrl.forwardTo;
    }
    return null;
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
