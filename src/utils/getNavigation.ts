import { cache } from "react";
import type { DotCMSNavigationItem } from "@dotcms/types";
import { dotCMSClient } from "./dotCMSClient";

export const getNavigation = cache(async (path: string = "/"): Promise<DotCMSNavigationItem[]> => {
    try {
        return await dotCMSClient.nav.get(path, { depth: 2 });
    } catch {
        return [];
    }
});
