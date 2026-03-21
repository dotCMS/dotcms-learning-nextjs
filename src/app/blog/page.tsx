import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { buildSlots } from "@dotcms/react";
import { JsonLd } from "@/components/JsonLd";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { blogListGraphQL } from "@/utils/queries";
import {
  buildPageMetadata,
  buildCollectionPageStructuredData,
  handleVanityRedirect,
} from "@/utils/seo";
import { BlogListingPage } from "@/views/BlogListingPage";
import BlogList from "@/components/content-types/BlogList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PATH = "/blog";
const FALLBACK_DESCRIPTION =
  "Discover amazing destinations, travel tips, and unforgettable adventures.";

function getBlogTitle(page?: { friendlyName?: string; title?: string }): string {
  const pageTitle = page?.friendlyName || page?.title;
  return pageTitle ? `${pageTitle} - Blog` : "Blog";
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getDotCMSPage(PATH, blogListGraphQL);
    if (!pageData) return { title: "Not found" };

    const page = pageData.pageAsset?.page;
    return buildPageMetadata({
      title: getBlogTitle(page),
      description: page?.seodescription || FALLBACK_DESCRIPTION,
      path: PATH,
    });
  } catch {
    return { title: "Not found" };
  }
}

export default async function BlogPage() {
  const pageContent = await getDotCMSPage(PATH, blogListGraphQL);
  if (!pageContent) return notFound();

  handleVanityRedirect(pageContent.pageAsset?.vanityUrl, redirect);

  const layout = pageContent.pageAsset?.layout;
  const navItems = pageContent.content?.navigation?.children ?? [];
  const page = pageContent.pageAsset?.page;
  const jsonLd = buildCollectionPageStructuredData({
    title: getBlogTitle(page),
    description: page?.seodescription,
    path: PATH,
  });

  const slots = buildSlots(pageContent.pageAsset.containers, {
    BlogList,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {layout?.header && <Header navItems={navItems} />}
      <BlogListingPage pageContent={pageContent} slots={slots} />
      {layout?.footer && <Footer />}
    </>
  );
}
