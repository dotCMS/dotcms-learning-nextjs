import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { detectPageView, getVanityRedirect } from "@/utils/pageView";
import { pageConfig } from "@/utils/pageConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

function resolvePath(slug?: string[]): string {
    return `/${(slug ?? []).join("/")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const path = resolvePath(slug);

    try {
        const pageData = await getDotCMSPage(path);
        if (!pageData) return { title: "Not found" };

        const view = detectPageView(pageData);
        return pageConfig[view].metadata(pageData, path);
    } catch {
        return { title: "Not found" };
    }
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

    const layout = pageContent.pageAsset?.layout;
    const navItems = pageContent.content?.navigation?.children ?? [];
    const view = detectPageView(pageContent);
    const config = pageConfig[view];
    const ViewComponent = config.component;
    const jsonLd = config.structuredData(pageContent, path);

    return (
        <>
            <JsonLd data={jsonLd} />
            {layout?.header && <Header navItems={navItems} />}
            <ViewComponent pageContent={pageContent} />
            {layout?.footer && <Footer />}
        </>
    );
}
