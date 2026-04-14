import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-6">
        <Link href="/">
          <Image
            src="/logo_clever_legal.png"
            alt="clever.legal"
            width={128}
            height={38}
            className="h-8 w-auto"
          />
        </Link>
        <div className="flex gap-8">
          <Link
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="/blog"
          >
            Blog
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="/story"
          >
            Story
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="/impressum"
          >
            Impressum
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="/datenschutz"
          >
            Datenschutz
          </Link>
          <Link
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="/kontakt"
          >
            Kontakt
          </Link>
          <a
            className="text-secondary hover:text-surface-tint transition-colors text-sm"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="text-secondary text-sm">
          © {new Date().getFullYear()} clever.legal GmbH
        </div>
      </div>
    </footer>
  );
}
