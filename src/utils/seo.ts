/**
 * Builds Schema.org JSON-LD for SEO.
 * @see https://schema.org
 */

import type { Metadata } from "next";

interface WebPageParams {
  title?: string;
  description?: string;
  path?: string;
}

interface ArticleParams {
  title?: string;
  description?: string;
  authorName?: string;
  datePublished?: string;
  dateModified?: string;
  imageUrl?: string;
  path?: string;
}

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "";
}

function toAbsoluteUrl(path: string): string {
  const base = getBaseUrl().replace(/\/$/, "");
  const pathStr = path.startsWith("/") ? path : `/${path}`;
  return pathStr === "/" ? base : `${base}${pathStr}`;
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
  type?: "website" | "article";
}): Metadata {
  const url = toAbsoluteUrl(path || "/") || undefined;
  return {
    title: title || "Page",
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      ...(imageUrl && { images: [{ url: imageUrl }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * WebPage structured data for generic pages.
 */
export function buildWebPageStructuredData({
  title,
  description,
  path,
}: WebPageParams): Record<string, unknown> {
  const url = toAbsoluteUrl(path || "/");
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title || undefined,
    description: description || undefined,
    url: url || undefined,
  };
}

/**
 * CollectionPage structured data for blog listing.
 */
export function buildCollectionPageStructuredData({
  title,
  description,
  path,
}: WebPageParams): Record<string, unknown> {
  const url = toAbsoluteUrl(path || "/blog");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title || "Blog",
    description: description || undefined,
    url: url || undefined,
  };
}

/**
 * Article / BlogPosting structured data for blog posts.
 * Uses BlogPosting (Schema.org subtype of Article) for better rich result eligibility.
 */
export function buildArticleStructuredData({
  title,
  description,
  authorName,
  datePublished,
  dateModified,
  imageUrl,
  path,
}: ArticleParams): Record<string, unknown> {
  const url = path ? toAbsoluteUrl(path) : undefined;
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title || undefined,
    description: description || undefined,
    url: url || undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: authorName ? { "@type": "Person", name: authorName } : undefined,
    image: imageUrl ? { "@type": "ImageObject", url: imageUrl } : undefined,
  };
  return article;
}

/**
 * Returns absolute image URL for dotCMS assets (OG/JSON-LD).
 * Accepts idPath, inode, or full URL.
 */
export function getAbsoluteImageUrl(
  idPathOrUrl: string | null | undefined,
): string | null {
  if (!idPathOrUrl || typeof idPathOrUrl !== "string") return null;
  if (idPathOrUrl.startsWith("http")) return idPathOrUrl;
  const host = (process.env.NEXT_PUBLIC_DOTCMS_HOST || "").replace(/\/$/, "");
  if (!host) return null;
  const path = idPathOrUrl.startsWith("/dA/")
    ? idPathOrUrl
    : `/dA/${idPathOrUrl}`;
  return `${host}${path}`;
}

export function handleVanityRedirect(
  vanityUrl: { action?: number; forwardTo?: string } | undefined,
  redirectFn: (url: string) => never,
): void {
  if ((vanityUrl?.action ?? 0) > 200 && vanityUrl?.forwardTo) {
    redirectFn(vanityUrl.forwardTo);
  }
}
