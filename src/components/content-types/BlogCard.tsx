import DotCMSImage from "@/components/DotCMSImage";
import Link from "next/link";
import type { Blog } from "@/types/blog";
import type { BlogCardShow } from "@/components/content-types/BlogList";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

export default function BlogCard(blog: Blog & { show?: BlogCardShow }) {
  const { title, image, urlMap, modDate, urlTitle, description, author, show } = blog;
  const authorData = author?.[0];
  const authorName =
    authorData?.firstName && authorData?.lastName
      ? `${authorData.firstName} ${authorData.lastName}`
      : null;

  return (
    <article className="blog-card">
      {(show?.image ?? true) && image && (
        <Link href={urlMap || "#"}>
          <DotCMSImage
            alt={urlTitle || title || ""}
            title={title || ""}
            loading="lazy"
            decoding="async"
            src={image}
            fill={true}
          />
        </Link>
      )}
      <div className="blog-card__body">
        <a href={urlMap || "#"}>{title}</a>
        {(show?.description ?? true) && description && (
          <p>{description}</p>
        )}
        <footer>
          {(show?.date ?? true) && modDate && (
            <time>{new Date(modDate).toLocaleDateString("en-US", dateFormatOptions)}</time>
          )}
          {authorName && <span>{authorName}</span>}
        </footer>
      </div>
    </article>
  );
}
