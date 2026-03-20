import type { ComponentType } from "react";
import type { Metadata } from "next";
import type {
  DotCMSComposedPageResponse,
  DotCMSGraphQLParams,
  DotCMSPageResponse,
} from "@dotcms/types";

export type PageData = DotCMSComposedPageResponse<DotCMSPageResponse>;

interface ViewProps {
  pageContent: PageData;
}

export type ViewComponent = ComponentType<ViewProps>;
export type MetadataBuilder = (pageData: PageData, path: string) => Metadata;
export type StructuredDataBuilder = (
  pageData: PageData,
  path: string,
) => Record<string, unknown>;

export interface PageConfig {
  component: ViewComponent;
  query: DotCMSGraphQLParams;
  metadata: MetadataBuilder;
  structuredData: StructuredDataBuilder;
}
