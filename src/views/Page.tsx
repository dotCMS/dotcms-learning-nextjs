"use client";

import { DotCMSLayoutBody, useEditableDotCMSPage } from "@dotcms/react";
import type { DotCMSComposedPageResponse, DotCMSPageResponse, DotCMSPageRendererMode } from "@dotcms/types";

import { pageComponents } from "@/components/content-types";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";

interface PageProps {
    pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

export function Page({ pageContent }: PageProps) {
    const { pageAsset } = useEditableDotCMSPage(pageContent);

    return (
        <div>
            {pageAsset?.layout.header && (
                <Header />
            )}

            <main className="container m-auto">
                <DotCMSLayoutBody
                    page={pageAsset}
                    components={pageComponents}
                    mode={process.env.NEXT_PUBLIC_DOTCMS_MODE as DotCMSPageRendererMode | undefined}
                />
            </main>

            {pageAsset?.layout.footer && <Footer />}
        </div>
    );
}
