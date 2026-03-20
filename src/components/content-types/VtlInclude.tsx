"use client";

import { useIsEditMode } from "@/hooks/useIsEditMode";

interface VtlIncludeProps {
  componentType?: string;
  widgetCodeJSON?: string;
}

export default function VtlInclude({ componentType }: VtlIncludeProps) {
  const isEditMode = useIsEditMode();

  if (isEditMode) {
    return (
      <div className="bg-blue-100 p-4">
        <h4>
          No Component Type: {componentType || "generic"} Found for VTL Include
        </h4>
      </div>
    );
  }

  return null;
}
