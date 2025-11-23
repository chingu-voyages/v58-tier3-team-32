"use client";

import Link from "next/link";
import { Subheading1, Body1 } from "@/app/component/typography";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();

  let navItems: { label: string; href: string }[] = [];

  switch (pathname) {
    case "/":
      navItems = [
        { label: "Map", href: "/chinguverse/map" },
        { label: "List", href: "/chinguverse/list" },
      ];
      break;
    case "/chinguverse/map":
      navItems = [
        { label: "Home", href: "/" },
        { label: "List", href: "/chinguverse/list" },
      ];
      break;
    case "/chinguverse/list":
      navItems = [
        { label: "Home", href: "/" },
        { label: "Map", href: "/chinguverse/map" },
      ];
      break;
    default:
      navItems = [
        { label: "Home", href: "/" },
        { label: "Map", href: "/chinguverse/map" },
        { label: "List", href: "/chinguverse/list" },
      ];
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[var(--border)]">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-24 h-16 bg-[var(--primary)]">
        <Link href="/" className="flex h-full items-center">
          <Image
            src="/images/chinguverse-logo.png"
            alt="Chingu Logo"
            width={100}
            height={100}
            className="h-full w-auto"
          />
        </Link>
        <nav className="hidden sm:flex gap-6 md:gap-8 lg:gap-20 items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Subheading1 className="text-[var(--text-link)] hover:text-[var(--text-link-hover)]">
                {item.label}
              </Subheading1>
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex">
          <Body1>{today}</Body1>
        </div>
        <div className="sm:hidden">
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
