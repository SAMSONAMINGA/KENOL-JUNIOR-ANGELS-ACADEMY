"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/news-events", label: "News & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

// Helper – returns false on server, true on client (hydration-safe)
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},           // subscribe (no-op)
    () => true,               // client snapshot
    () => false               // server snapshot
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mounted = useIsClient();               // ← replaces useState + useEffect
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar – unchanged */}
      <div className="bg-[#6e0000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
          <span>P.O. Box 340 – 01020, Kenol</span>
          <a href="mailto:kjuniorangels1@gmail.com" className="hover:underline font-medium">
            Email: kjuniorangels1@gmail.com
          </a>
          <span className="hidden sm:inline">MOTTO :STRIVE TO EXCEL, SKY IS THE LIMIT</span>
          <a href="tel:0723248400" className="hover:underline font-medium">
            Tel: 0723 248 400
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        {/* Mobile: stacked, centered — name on top, badge centered, menu button below */}
        <div className="flex flex-col items-center gap-1 py-3 lg:hidden">
          <Link href="/" className="text-center text-sm font-bold tracking-wide text-[#6e0000] sm:text-base">
            Kenol Junior Angels Academy
          </Link>
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Kenol Junior Angels Academy"
              width={360}
              height={72}
              className="h-16 w-auto"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mt-1 rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop / large screens: original row layout, unchanged */}
        <div className="hidden h-20 items-center justify-between lg:flex">
          <Link href="/" className="flex shrink-0 items-center gap-3 -ml-2">
            <Image
              src="/logo.svg"
              alt="Kenol Junior Angels Academy"
              width={360}
              height={72}
              className="h-[120px] w-auto"
              priority
            />
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = mounted && isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "text-[#6e0000]"
                      : "text-gray-700 hover:text-[#6e0000] hover:bg-red-50"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="nav-breathe absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-[#6e0000]" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/admissions"
              className="ml-3 px-5 py-2.5 bg-[#6e0000] text-white text-sm font-semibold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(110,0,0,0.6)]"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = mounted && isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2.5 text-base font-medium rounded-md ${
                    active
                      ? "text-[#6e0000] bg-red-50"
                      : "text-gray-700 hover:text-[#6e0000] hover:bg-red-50"
                  }`}
                >
                  {active && (
                    <span className="nav-breathe-y absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-[#6e0000]" />
                  )}
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-3 bg-[#6e0000] text-white text-center font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(110,0,0,0.5)]"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}