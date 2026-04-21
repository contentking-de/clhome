import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inter_Tight } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
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
    <html
      lang="de"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
