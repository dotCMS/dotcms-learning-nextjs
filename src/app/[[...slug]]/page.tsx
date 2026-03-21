import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { navigationQuery } from "@/utils/queries";
import {
  buildPageMetadata,
  buildWebPageStructuredData,
  handleVanityRedirect,
} from "@/utils/seo";
import { Page } from "@/views/Page";
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

    const page = pageData.pageAsset?.page;
    return buildPageMetadata({
      title: page?.friendlyName || page?.title,
      description: page?.seodescription,
      path,
    });
  } catch {
    return { title: "Not found" };
  }
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const path = resolvePath(slug);

  const pageContent = await getDotCMSPage(path, {
    content: { navigation: navigationQuery },
  });

  if (!pageContent) return notFound();

  handleVanityRedirect(pageContent.pageAsset?.vanityUrl, redirect);

  const layout = pageContent.pageAsset?.layout;
  const navItems = pageContent.content?.navigation?.children ?? [];
  const page = pageContent.pageAsset?.page;
  const jsonLd = buildWebPageStructuredData({
    title: page?.friendlyName || page?.title,
    description: page?.seodescription,
    path,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {layout?.header && <Header navItems={navItems} />}
      <Page pageContent={pageContent} />
      {layout?.footer && <Footer />}
    </>
  );
}
