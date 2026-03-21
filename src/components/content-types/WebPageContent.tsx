"use client";

import { enableBlockEditorInline } from "@dotcms/uve";
import {
  DotCMSBlockEditorRenderer,
  useStyleEditorSchemas,
} from "@dotcms/react";
import { DotCMSBasicContentlet } from "@dotcms/types";

import type { BlockEditorNode } from "@dotcms/types";
import { useIsEditMode } from "@/hooks/useIsEditMode";
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

const BASE_EDITOR_CLASSES =
  "prose prose-slate max-w-none prose-img:rounded-xl prose-a:text-primary hover:prose-a:text-primary-dark [&_li_p]:my-0 prose-h1:text-slate-800";

function WebPageContent(props: WebPageContentProps) {
  const isEditMode = useIsEditMode();
  useStyleEditorSchemas([mySchema]);

  const { body, dotStyleProperties } = props;

  const { marginTop, marginBottom, alignment } = dotStyleProperties ?? {};

  const blockEditorClasses = cn(
    BASE_EDITOR_CLASSES,
    "prose-h1:mb-0",
    alignment,
    isEditMode && "border-2 border-solid border-cyan-400 cursor-pointer",
  );

  const handleClick = () => {
    if (isEditMode) {
      enableBlockEditorInline(props, "body");
    }
  };

  const contentClasses = cn("w-full", marginTop, marginBottom);

  return (
    <div className={contentClasses}>
      <div onClick={handleClick}>
        {body && (
          <DotCMSBlockEditorRenderer
            blocks={body}
            className={blockEditorClasses}
          />
        )}
      </div>
    </div>
  );
}

export default WebPageContent;
