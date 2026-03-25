import Image from "next/image";
import Link from "next/link";
import type { DotCMSNavigationItem } from "@dotcms/types";
import { Button } from "@/components/Button";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  navItems: DotCMSNavigationItem[];
  logo?: string;
  logoAlt?: string;
}

export default function Header({
  navItems,
  logo,
  logoAlt = "Logo",
}: HeaderProps) {
  return (
    <header className="header">
      <Link href="/" className="header__logo">
        {logo ? (
          <Image src={logo} alt={logoAlt} height={32} width={120} />
        ) : (
          "dotCMS"
        )}
      </Link>
      <nav>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} target={item.target || undefined}>
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="header__actions">
        <Link
          href="https://dev.dotcms.com/getting-started/setup/demo-instance"
          target="_blank"
          rel="noopener noreferrer"
          className="header__cta"
        >
          <Button>Try for Free</Button>
        </Link>
        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}
