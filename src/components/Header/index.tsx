import { getNavigation } from "@/utils/getNavigation"
import { HeaderClient } from "./HeaderClient"

interface HeaderProps {
    logo?: string;
    logoAlt?: string;
}

export default async function Header({ logo, logoAlt }: HeaderProps) {
    const navItems = await getNavigation("/")
    return <HeaderClient navItems={navItems} logo={logo} logoAlt={logoAlt} />
}
