"use client";

import { DotCMSLayoutBody, useEditableDotCMSPage } from "@dotcms/react";
import type { DotCMSComposedPageResponse, DotCMSPageResponse, DotCMSPageRendererMode } from "@dotcms/types";

import { pageComponents } from "@/components/content-types";

interface PageProps {
    pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

export function Page({ pageContent }: PageProps) {
    // TODO: we're getting the blogs from the graphql query
    const { pageAsset } = useEditableDotCMSPage(pageContent);

    return (
        <main className="container m-auto">
            <DotCMSLayoutBody
                page={pageAsset}
                components={pageComponents}
                mode={process.env.NEXT_PUBLIC_DOTCMS_MODE as DotCMSPageRendererMode | undefined}
            />
        </main>
    );
}
