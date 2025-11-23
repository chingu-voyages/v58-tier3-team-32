"use client";

import { Body1, Subheading1 } from "@/app/component/typography";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  navItems: { label: string; href: string }[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
        className="p-3 rounded-md focus:outline-none"
      >
        {isOpen ? <Subheading1>✕</Subheading1> : <Subheading1>☰</Subheading1>}
      </button>
      {isOpen && (
        <nav className="fixed top-16 w-[40vw] right-0 bg-[var(--primary)] border-t border-[var(--border)] shadow-md flex flex-col text-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block w-full active:bg-[var(--primary-hover)] hover:bg-[var(--primary-hover)]"
            >
              <Body1 className="block px-4 py-3">{item.label}</Body1>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
