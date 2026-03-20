import type { ComponentType } from "react";
import type { DotCMSComposedPageResponse, DotCMSPageResponse } from "@dotcms/types";
import type { PageView } from "./pageHelpers";

import { Page } from "@/views/Page";
import { DetailPage } from "@/views/DetailPage";
import { BlogListingPage } from "@/views/BlogListingPage";

interface ViewProps {
    pageContent: DotCMSComposedPageResponse<DotCMSPageResponse>;
}

type ViewComponent = ComponentType<ViewProps>;

export const pageViews: Record<PageView, ViewComponent> = {
    page: Page,
    "blog-detail": DetailPage,
    blog: BlogListingPage,
};
