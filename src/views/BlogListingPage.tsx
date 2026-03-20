"use client";

import { DotCMSLayoutBody, useEditableDotCMSPage } from "@dotcms/react";
import type {
  DotCMSComposedPageResponse,
  DotCMSPageRendererMode,
  DotCMSPageResponse,
} from "@dotcms/types";
import { pageComponents } from "@/components/content-types";

interface BlogListingPageProps {
  pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

export function BlogListingPage({ pageContent }: BlogListingPageProps) {
  const { pageAsset } = useEditableDotCMSPage(pageContent);

  return (
    <main className="container m-auto py-12 md:py-16 lg:py-20">
      <DotCMSLayoutBody
        page={pageAsset}
        components={pageComponents}
        mode={
          process.env.NEXT_PUBLIC_DOTCMS_MODE as
            | DotCMSPageRendererMode
            | undefined
        }
      />
    </main>
  );
}
