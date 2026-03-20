import type { DotCMSNavigationItem } from "@dotcms/types";
import { HeaderClient } from "./HeaderClient"

interface HeaderProps {
    navItems: DotCMSNavigationItem[];
    logo?: string;
    logoAlt?: string;
}

export default function Header({ navItems, logo, logoAlt }: HeaderProps) {
    return <HeaderClient navItems={navItems} logo={logo} logoAlt={logoAlt} />
}
