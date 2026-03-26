"use client";

import {
  DotCMSBlockEditorRenderer,
  useStyleEditorSchemas,
} from "@dotcms/react";
import { DotCMSBasicContentlet } from "@dotcms/types";

import type { BlockEditorNode } from "@dotcms/types";
import { defineStyleEditorSchema, styleEditorField } from "@dotcms/uve";
import { cn } from "@/lib/utils";

type WebPageContentProps = DotCMSBasicContentlet & {
  body?: BlockEditorNode;
  dotStyleProperties?: Record<string, string>;
};

const mySchema = defineStyleEditorSchema({
  contentType: "webPageContent",
  sections: [
    {
      title: "Spacing",
      fields: [
        styleEditorField.dropdown({
          id: "marginTop",
          label: "Margin Top",
          options: [
            { label: "None", value: "mt-0" },
            { label: "Small", value: "mt-4" },
            { label: "Medium", value: "mt-8" },
            { label: "Large", value: "mt-12" },
          ],
        }),
        styleEditorField.dropdown({
          id: "marginBottom",
          label: "Margin Bottom",
          options: [
            { label: "None", value: "mb-0" },
            { label: "Small", value: "mb-4" },
            { label: "Medium", value: "mb-8" },
            { label: "Large", value: "mb-12" },
          ],
        }),
      ],
    },
    {
      title: "Positioning",
      fields: [
        styleEditorField.dropdown({
          id: "alignment",
          label: "Alignment",
          options: [
            { label: "Left", value: "text-left" },
            { label: "Center", value: "text-center" },
            { label: "Right", value: "text-right" },
          ],
        }),
      ],
    },
  ],
});

function WebPageContent(props: WebPageContentProps) {
  useStyleEditorSchemas([mySchema]);

  const { body, dotStyleProperties } = props;

  const { marginTop, marginBottom, alignment } = dotStyleProperties ?? {};

  const contentClasses = cn(
    "web-page-content",
    marginTop,
    marginBottom,
    alignment,
  );

  return (
    <div className={contentClasses}>
      {body && <DotCMSBlockEditorRenderer blocks={body} />}
    </div>
  );
}

export default WebPageContent;
