"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; 2013 - {currentYear} All rights reserved.</p>
      <nav>
        <Link href="https://dev.dotcms.com/">Documentation</Link>
        <Link href="https://dotcms.com/contact-us/">Contact Us</Link>
        <Link href="https://dev.dotcms.com/getting-started/setup/demo-instance">
          Access Demo Site
        </Link>
      </nav>
    </footer>
  );
}
