"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "../ui/Icon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [schwerpunkteOpen, setSchwerpunkteOpen] = useState(false);

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
          <div className="relative group">
            <a
              className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium inline-flex items-center gap-1"
              href="/#schwerpunkte"
            >
              Schwerpunkte
              <Icon name="expand_more" className="text-base transition-transform duration-200 group-hover:rotate-180" />
            </a>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-surface/95 backdrop-blur-md border border-outline-variant/15 rounded-xl shadow-lg shadow-on-background/5 py-2 px-1 min-w-[220px]">
                <a
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:text-surface-tint hover:bg-surface-container-low rounded-lg transition-colors"
                  href="/#satelliten"
                >
                  <Icon name="satellite_alt" className="text-lg" />
                  Lead-Satelliten
                </a>
              </div>
            </div>
          </div>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/fuer-anwaelte"
          >
            Für Anwälte
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/fuer-unternehmen"
          >
            Für Unternehmen
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/legal-alerts"
            className="inline-flex items-center gap-2 border border-error/30 text-error px-5 py-2.5 rounded-xl font-semibold active:opacity-80 transition-all hover:bg-error/5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-error" />
            </span>
            Legal Alerts
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-on-background text-white px-6 py-2.5 rounded-xl font-semibold active:opacity-80 transition-all hover:brightness-150"
          >
            <Icon name="chat" className="text-lg" />
            Kostenloses Erstgespräch
          </Link>
        </div>

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
          <button
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors flex items-center justify-between w-full"
            onClick={() => setSchwerpunkteOpen(!schwerpunkteOpen)}
          >
            <a href="/#schwerpunkte" onClick={() => setOpen(false)}>
              Schwerpunkte
            </a>
            <Icon
              name="expand_more"
              className={`text-base text-secondary transition-transform duration-200 ${schwerpunkteOpen ? "rotate-180" : ""}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-200 ${schwerpunkteOpen ? "max-h-20" : "max-h-0"}`}
          >
            <a
              className="text-secondary font-medium py-2 pl-4 hover:text-surface-tint transition-colors flex items-center gap-2"
              href="/#satelliten"
              onClick={() => setOpen(false)}
            >
              <Icon name="satellite_alt" className="text-lg" />
              Lead-Satelliten
            </a>
          </div>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/fuer-anwaelte"
            onClick={() => setOpen(false)}
          >
            Für Anwälte
          </Link>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/fuer-unternehmen"
            onClick={() => setOpen(false)}
          >
            Für Unternehmen
          </Link>
          <Link
            className="text-on-background font-medium py-2 hover:text-surface-tint transition-colors"
            href="/legal-alerts"
            onClick={() => setOpen(false)}
          >
            Legal Alerts
          </Link>
          <Link
            href="/kontakt"
            className="bg-on-background text-white px-6 py-3 rounded-xl font-semibold text-center mt-2 active:opacity-80 transition-all"
            onClick={() => setOpen(false)}
          >
            Kostenloses Erstgespräch
          </Link>
        </div>
      </div>
    </header>
  );
}
