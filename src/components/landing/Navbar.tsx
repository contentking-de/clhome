import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link href="/" className="-ml-9.5">
          <Image
            src="/logo_clever_legal.png"
            alt="clever.legal"
            width={120}
            height={36}
            className="h-12 w-auto"
            priority
          />
        </Link>
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
          className="bg-on-background text-white px-6 py-2.5 rounded-xl font-semibold active:opacity-80 transition-all hover:brightness-150"
        >
          Strategie-Gespräch vereinbaren
        </Link>
      </nav>
    </header>
  );
}
