"use client";

import { DotCMSLayoutBody, useEditableDotCMSPage } from "@dotcms/react";
import { DotCMSComposedPageResponse, DotCMSPageResponse } from "@dotcms/types";

import { pageComponents } from "@/components/content-types";
import Footer from "@/components/footer/Footer";
import Header from "@/components/Header";

interface PageProps {
    pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

export function Page({ pageContent }: PageProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { pageAsset, content = {} } = useEditableDotCMSPage(pageContent) as any;

    return (
        <div>
            {pageAsset?.layout.header && (
                <Header />
            )}

            <main className="container m-auto">
                <DotCMSLayoutBody
                    page={pageAsset}
                    components={pageComponents}
                    mode={process.env.NEXT_PUBLIC_DOTCMS_MODE as any}
                />
            </main>

            {pageAsset?.layout.footer && <Footer {...content} />}
        </div>
    );
}
