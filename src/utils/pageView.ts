import type { DotCMSComposedPageResponse, DotCMSPageResponse } from "@dotcms/types";

export type PageView = "blog-detail" | "blog" | "page";

type PageData = DotCMSComposedPageResponse<DotCMSPageResponse>;

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
