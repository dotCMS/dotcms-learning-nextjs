import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import type { DotCMSPage, DotCMSComposedPageResponse, DotCMSPageResponse } from "@dotcms/types";

import { JsonLd } from "@/components/JsonLd";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { detectPageView, getVanityRedirect, buildPageMetadata, PageView } from "@/utils/pageHelpers";
import { pageViews } from "@/utils/pageViews";
import {
    buildWebPageStructuredData,
    buildCollectionPageStructuredData,
    buildArticleStructuredData,
    getAbsoluteImageUrl,
} from "@/utils/structuredData";
import type { BlogURLContentMap } from "@/types/blog";

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

function resolvePath(slug?: string[]): string {
    return `/${(slug ?? []).join("/")}`;
}

function getPageMeta(page: DotCMSPage): { title?: string; description?: string } {
    return {
        title: page?.friendlyName || page?.title,
        description: page?.seodescription || undefined,
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const path = resolvePath(slug);

    try {
        const pageData = await getDotCMSPage(path);
        if (!pageData) return { title: "Not found" };

        const view = detectPageView(pageData);
        const page = pageData.pageAsset?.page;

        if (view === "detail") {
            const urlContentMap = pageData.pageAsset?.urlContentMap as BlogURLContentMap | undefined;
            const title = urlContentMap?.title ? `${urlContentMap.title} - Blog` : "Blog";
            const description = urlContentMap?.description || urlContentMap?.teaser || undefined;
            const imageUrl = urlContentMap?.image?.idPath
                ? getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined
                : undefined;
            return buildPageMetadata({ title, description, path, imageUrl, type: "article" });
        }

        if (view === "blog-listing") {
            const { title: pageTitle, description } = getPageMeta(page);
            const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
            return buildPageMetadata({
                title,
                description: description || "Discover amazing destinations, travel tips, and unforgettable adventures.",
                path,
            });
        }

        const { title, description } = getPageMeta(page);
        return buildPageMetadata({ title, description, path });
    } catch {
        return { title: "Not found" };
    }
}

function buildStructuredData(pageData: DotCMSComposedPageResponse<DotCMSPageResponse>, view: PageView, path: string) {
    const pageAsset = pageData?.pageAsset;
    const page = pageAsset?.page;

    if (view === "detail") {
        const urlContentMap = pageAsset?.urlContentMap as BlogURLContentMap | undefined;
        const author = urlContentMap?.author?.[0];
        const authorName = author
            ? [author.firstName, author.lastName].filter(Boolean).join(" ")
            : undefined;
        const imageUrl = urlContentMap?.image?.idPath
            ? getAbsoluteImageUrl(urlContentMap.image.idPath)
            : undefined;
        return buildArticleStructuredData({
            title: urlContentMap?.title,
            description: urlContentMap?.description || urlContentMap?.teaser,
            authorName,
            datePublished: urlContentMap?.postingDate,
            dateModified: urlContentMap?.modDate || urlContentMap?.postingDate,
            imageUrl: imageUrl ?? undefined,
            path,
        });
    }

    if (view === "blog-listing") {
        const { title: pageTitle, description } = getPageMeta(page);
        const title = pageTitle ? `${pageTitle} - Blog` : "Blog";
        return buildCollectionPageStructuredData({ title, description, path });
    }

    const { title, description } = getPageMeta(page);
    return buildWebPageStructuredData({ title, description, path });
}

export default async function CatchAllPage({ params }: PageProps) {
    const { slug } = await params;
    const path = resolvePath(slug);
    const pageContent = await getDotCMSPage(path);

    if (!pageContent) return notFound();

    const vanityRedirect = getVanityRedirect(pageContent);
    if (vanityRedirect) {
        return redirect(vanityRedirect);
    }

    const view = detectPageView(pageContent);
    const ViewComponent = pageViews[view];
    const jsonLd = buildStructuredData(pageContent, view, path);

    return (
        <>
            <JsonLd data={jsonLd} />
            <ViewComponent pageContent={pageContent} />
        </>
    );
}
