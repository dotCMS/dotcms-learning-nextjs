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

function getBlogDetailMeta(blog: BlogURLContentMap | undefined) {
  const title = blog?.title ? `${blog.title} - Blog` : "Blog";
  const description = blog?.description;
  const imageUrl = blog?.image?.idPath
    ? getAbsoluteImageUrl(blog.image.idPath) ?? undefined
    : undefined;
  const publishDate = blog?.publishDate
    ? new Date(blog.publishDate).toISOString()
    : undefined;
  const modDateMs = Number(blog?.modDate);
  const modDate =
    blog?.modDate && !isNaN(modDateMs)
      ? new Date(modDateMs).toISOString()
      : undefined;
  const author = blog?.author?.[0];
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
