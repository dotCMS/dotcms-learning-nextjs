import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { getDotCMSPage } from "@/utils/getDotCMSPage";
import { blogDetailGraphQL } from "@/utils/queries";
import {
  buildPageMetadata,
  buildArticleStructuredData,
  getAbsoluteImageUrl,
  handleVanityRedirect,
} from "@/utils/seo";
import { DetailPage } from "@/views/DetailPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { BlogURLContentMap } from "@/types/blog";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

function getBlogDetailMeta(urlContentMap: BlogURLContentMap | undefined) {
  const title = urlContentMap?.title ? `${urlContentMap.title} - Blog` : "Blog";
  const description = urlContentMap?.description || urlContentMap?.teaser;
  const imageUrl = urlContentMap?.image?.idPath
    ? getAbsoluteImageUrl(urlContentMap.image.idPath) ?? undefined
    : undefined;
  const publishDate = urlContentMap?.publishDate
    ? new Date(urlContentMap.publishDate).toISOString()
    : undefined;
  const modDate = urlContentMap?.modDate
    ? new Date(Number(urlContentMap.modDate)).toISOString()
    : undefined;
  const author = urlContentMap?.author?.[0];
  const authorName = author
    ? [author.firstName, author.lastName].filter(Boolean).join(" ")
    : undefined;
  return { title, description, imageUrl, publishDate, modDate, authorName };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = `/blog/${slug.join("/")}`;

  try {
    const pageData = await getDotCMSPage(path, blogDetailGraphQL);
    if (!pageData) return { title: "Not found" };

    const urlContentMap = pageData.pageAsset?.urlContentMap as BlogURLContentMap | undefined;
    const { title, description, imageUrl } = getBlogDetailMeta(urlContentMap);
    return buildPageMetadata({ title, description, path, imageUrl, type: "article" });
  } catch {
    return { title: "Not found" };
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const path = `/blog/${slug.join("/")}`;

  const pageContent = await getDotCMSPage(path, blogDetailGraphQL);
  if (!pageContent) return notFound();

  handleVanityRedirect(pageContent.pageAsset?.vanityUrl, redirect);

  const layout = pageContent.pageAsset?.layout;
  const navItems = pageContent.content?.navigation?.children ?? [];

  const urlContentMap = pageContent.pageAsset?.urlContentMap as BlogURLContentMap | undefined;
  const { title, description, imageUrl, publishDate, modDate, authorName } =
    getBlogDetailMeta(urlContentMap);
  const jsonLd = buildArticleStructuredData({
    title,
    description,
    authorName,
    datePublished: publishDate,
    dateModified: modDate,
    imageUrl,
    path,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      {layout?.header && <Header navItems={navItems} />}
      <DetailPage pageContent={pageContent} />
      {layout?.footer && <Footer />}
    </>
  );
}
