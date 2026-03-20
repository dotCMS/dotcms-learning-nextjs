import type { DotCMSNavigationItem } from "@dotcms/types";
import { dotCMSClient } from "./dotCMSClient";

export async function getNavigation(path: string = "/"): Promise<DotCMSNavigationItem[]> {
    try {
        return await dotCMSClient.nav.get(path, { depth: 2 });
    } catch {
        return [];
    }
}
