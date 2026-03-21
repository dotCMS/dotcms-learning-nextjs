"use client";

import { enableBlockEditorInline } from "@dotcms/uve";
import { DotCMSBlockEditorRenderer } from "@dotcms/react";
import { DotCMSBasicContentlet } from "@dotcms/types";

import type { BlockEditorNode } from "@dotcms/types";
import { useIsEditMode } from "@/hooks/useIsEditMode";
import { customRenderers } from "@/utils/blockEditorRenderers";

type WebPageContentProps = DotCMSBasicContentlet & {
  body?: BlockEditorNode;
};

const BASE_EDITOR_CLASSES =
  "prose prose-slate max-w-none prose-img:rounded-xl prose-a:text-primary hover:prose-a:text-primary-dark [&_li_p]:my-0";

function WebPageContent(props: WebPageContentProps) {
  const { body } = props;
  const isEditMode = useIsEditMode();

  const blockEditorClasses = isEditMode
    ? `${BASE_EDITOR_CLASSES} border-2 border-solid border-cyan-400 cursor-pointer`
    : BASE_EDITOR_CLASSES;

  const handleClick = () => {
    if (isEditMode) {
      enableBlockEditorInline(props, "body");
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <div onClick={handleClick}>
          {body && (
            <DotCMSBlockEditorRenderer
              blocks={body}
              className={blockEditorClasses}
              customRenderers={customRenderers}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WebPageContent;
