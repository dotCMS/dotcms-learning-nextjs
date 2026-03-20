import type {
  DotCMSComposedPageResponse,
  DotCMSPageResponse,
} from "@dotcms/types";

export type PageView = "blog-detail" | "blog" | "home" | "page";

type PageData = DotCMSComposedPageResponse<DotCMSPageResponse>;

export function detectPageViewFromPath(path: string): PageView {
  if (path.startsWith("/blog/") && path.split("/").length > 2)
    return "blog-detail";
  if (path === "/blog" || path === "/blog/") return "blog";
  if (path === "/" || path === "") return "home";
  return "page";
}

export function detectPageView(pageData: PageData): PageView {
  const raw: string = pageData?.pageAsset?.page?.url ?? "";
  const url = raw.replace(/\/index$/, "");

  return detectPageViewFromPath(url);
}

export function getVanityRedirect(pageData: PageData): string | null {
  const vanityUrl = pageData?.pageAsset?.vanityUrl;
  const action = vanityUrl?.action ?? 0;
  if (action > 200 && vanityUrl?.forwardTo) {
    return vanityUrl.forwardTo;
  }
  return null;
}
