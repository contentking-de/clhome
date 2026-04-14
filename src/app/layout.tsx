import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "clever.legal | Recht haben dauert Sekunden",
  description:
    "clever.legal GmbH – Wir eliminieren die Bürokratie des Wartens. Mit algorithmischer Präzision und menschlicher Exzellenz transformieren wir komplexe Rechtslagen in sofortige Resultate.",
  openGraph: {
    title: "clever.legal | Recht haben dauert Sekunden",
    description:
      "Mit algorithmischer Präzision und menschlicher Exzellenz transformieren wir komplexe Rechtslagen in sofortige Resultate.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="preload"
          href="https://suudphdtlchxrc5q.public.blob.vercel-storage.com/landing/hero-building.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className="bg-background text-on-background font-body selection:bg-surface-tint/20">
        {children}
      </body>
    </html>
  );
}
