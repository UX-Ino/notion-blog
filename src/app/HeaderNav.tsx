"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/photos", label: "📷 사진첩" },
  { href: "/guestbook", label: "💌 방명록" },
  { href: "/admin", label: "⚙️ 관리" },
];

export default function HeaderNav() {
  const pathname = usePathname() || "/";
  const rootSeg = "/" + (pathname.split("/").filter(Boolean)[0] || "");
  const [open, setOpen] = useState(false);

  const linkClass = (href: string) => {
    const active = href === "/" ? pathname === "/" : rootSeg === href;
    return [
      "px-2 py-1 rounded-md text-sm transition-colors",
      active
        ? "text-white bg-slate-700/40"
        : "text-slate-300 hover:text-white hover:bg-slate-700/30",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
        >
          <Image src={logo} alt="Logo" width={20} height={20} priority />
          Retro Dev Blog
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-700/30"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-700/60 bg-slate-900/95">
          <nav className="container mx-auto px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
