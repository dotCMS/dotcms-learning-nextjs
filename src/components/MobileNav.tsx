"use client";

import { Button } from "@/components/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import type { DotCMSNavigationItem } from "@dotcms/types";

interface MobileNavProps {
  navItems: DotCMSNavigationItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  return (
    <Sheet>
      <div className="mobile-nav">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-7 w-7" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="mobile-nav__sheet">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} target={item.target || undefined}>
                {item.title}
              </Link>
            ))}
            <Link
              href="https://dev.dotcms.com/getting-started/setup/demo-instance"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav__cta"
            >
              <Button>Try for Free</Button>
            </Link>
          </nav>
        </SheetContent>
      </div>
    </Sheet>
  );
}
