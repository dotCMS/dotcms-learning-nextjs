"use client";

import { DotCMSBasicContentlet } from "@dotcms/types";
import { useIsEditMode } from "@/hooks/useIsEditMode";
import ContactUs from "@/components/forms/ContactUs";

type PageFormProps = DotCMSBasicContentlet & {
  formType?: string;
  description?: string;
};

export default function PageForm(contentlet: PageFormProps) {
  const { formType } = contentlet;
  const isEditMode = useIsEditMode();

  if (formType === "contact-us") {
    return <ContactUs {...contentlet} />;
  }

  if (isEditMode) {
    return (
      <div>
        <h4>There is no form component for this form type: {formType}</h4>
      </div>
    );
  }

  return null;
}
