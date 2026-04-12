"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link href="/" className="md:-ml-9.5">
          <Image
            src="/logo_clever_legal.png"
            alt="clever.legal"
            width={120}
            height={36}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/fuer-anwaelte"
          >
            Anwälte
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/fuer-unternehmen"
          >
            Unternehmen
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/fuer-privatkunden"
          >
            Privatkunden
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/blog"
          >
            Blog
          </Link>
        </div>

        <Link
          href="/kontakt"
          className="hidden md:inline-flex bg-on-background text-white px-6 py-2.5 rounded-xl font-semibold active:opacity-80 transition-all hover:brightness-150"
        >
          Strategie-Gespräch vereinbaren
        </Link>

        {/* Burger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Menü öffnen"
        >
          <span
            className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-on-background transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md border-t border-outline-variant/10 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="flex flex-col px-8 py-6 gap-4">
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/fuer-anwaelte"
            onClick={() => setOpen(false)}
          >
            Anwälte
          </Link>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/fuer-unternehmen"
            onClick={() => setOpen(false)}
          >
            Unternehmen
          </Link>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/fuer-privatkunden"
            onClick={() => setOpen(false)}
          >
            Privatkunden
          </Link>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/blog"
            onClick={() => setOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/kontakt"
            className="bg-on-background text-white px-6 py-3 rounded-xl font-semibold text-center mt-2 active:opacity-80 transition-all"
            onClick={() => setOpen(false)}
          >
            Strategie-Gespräch vereinbaren
          </Link>
        </div>
      </div>
    </header>
  );
}
