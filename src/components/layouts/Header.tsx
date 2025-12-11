"use client";

import Link from "next/link";
import { Subheading1, Label } from "@/app/component/typography";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/app/chinguverse/auth/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Login from "@/app/design-system/components/icons/Login";
import Logout from "@/app/design-system/components/icons/Logout";

export default function Header() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);

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
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 border-b border-[var(--border)]">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-24 h-16 bg-[var(--primary)] md:grid md:grid-cols-[1fr_auto_1fr]">
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
        <div className="flex items-center justify-end gap-4 sm:mr-10 md:mr-0">
          <Label className="hidden md:flex">{today}</Label>
          {mounted &&
            (user ? (
              <button onClick={() => signOut(auth)}>
                <Logout />
              </button>
            ) : (
              <Link
                href="/chinguverse/auth/login"
                className="text-[var(--text-link)] hover:text-[var(--text-link-hover)]"
              >
                <Login />
              </Link>
            ))}
          <div className="sm:hidden">
            <MobileMenu navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
