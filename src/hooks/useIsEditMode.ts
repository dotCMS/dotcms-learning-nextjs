"use client";

import { useState } from "react";

import { getUVEState } from "@dotcms/uve";
import { UVE_MODE } from "@dotcms/types";

export function useIsEditMode(): boolean {
    const [isEditMode] = useState(() => getUVEState()?.mode === UVE_MODE.EDIT);
    return isEditMode;
}
