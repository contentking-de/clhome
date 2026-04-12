import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link href="/" className="-ml-9">
          <Image
            src="/cleverlegal_logo.png"
            alt="clever.legal"
            width={160}
            height={48}
            className="h-[4.5rem] w-auto"
            priority
          />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <a
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="#anwaelte"
          >
            Anwälte
          </a>
          <a
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="#unternehmen"
          >
            Unternehmen
          </a>
          <a
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="#privatkunden"
          >
            Privatkunden
          </a>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors duration-300 font-medium"
            href="/blog"
          >
            Blog
          </Link>
        </div>
        <button className="bg-surface-tint text-white px-6 py-2.5 rounded-xl font-semibold active:opacity-80 transition-all hover:brightness-110">
          Kontakt
        </button>
      </nav>
    </header>
  );
}
