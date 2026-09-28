"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/news-events", label: "News & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/fees", label: "Fees" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar */}
      <div className="bg-[#6e0000] text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap justify-between items-center gap-2">
          <span>P.O. Box 340 – 01020, Kenol</span>
          <a href="mailto:info@kenoljuniorangelsacademy.com" className="hover:underline font-medium">
            Email: info@kenoljuniorangelsacademy.com
          </a>
          <span className="hidden sm:inline">MOTTO :STRIVE TO EXCEL, SKY IS THE LIMIT</span>
            
          <a href="tel:0723248400" className="hover:underline font-medium">
            Tel: 0723 248 400
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 -ml-1 sm:-ml-2">
            <Image
              src="/logo.svg"
              alt="Kenol Junior Angels Academy"
              width={360}
              height={72}
              className="h-12 w-auto md:h-14 lg:h-[120px]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#6e0000] hover:bg-red-50 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              className="ml-3 px-5 py-2.5 bg-[#6e0000] text-white text-sm font-semibold rounded-full hover:bg-[#4d0000] transition-colors"
            >
              Enroll Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-gray-700 hover:text-[#6e0000] hover:bg-red-50 rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-3 bg-[#6e0000] text-white text-center font-semibold rounded-full"
            >
              Enroll Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
