"use client";

import { useEditableDotCMSPage } from "@dotcms/react";
import type {
  DotCMSComposedPageResponse,
  DotCMSPageResponse,
} from "@dotcms/types";
import BlogList from "@/components/BlogList";
import type { Blog } from "@/types/blog";

interface BlogListingPageProps {
  pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

export function BlogListingPage({ pageContent }: BlogListingPageProps) {
  // TODO: we're getting the blogs here from the `content` property in the page get
  const { content } = useEditableDotCMSPage(pageContent);
  const blogs =
    ((content as Record<string, unknown> | undefined)?.blogs as
      | Blog[]
      | undefined) ?? [];

  return (
    <main className="container m-auto py-12 md:py-16 lg:py-20">
      <section className="w-full">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-foreground text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-base md:text-base lg:text-lg font-medium leading-relaxed max-w-2xl mb-8">
            Discover amazing destinations, travel tips, and unforgettable
            adventures from around the world. Get inspired for your next
            journey.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <BlogList blogs={blogs} />
      </div>
    </main>
  );
}
