import type { Metadata } from "next";

const SITE_NAME = "clever.legal";
const DEFAULT_OG_IMAGE = "/og-image.png";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path: string;
  locale: string;
  ogType?: "website" | "article";
  image?: string;
  publishedTime?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  ogType = "website",
  image,
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = path === "/" ? "/" : path;
  const ogLocale = locale === "de" ? "de_DE" : "en_US";

  return {
    title,
    description,
    openGraph: {
      title,
      description: description || undefined,
      url,
      siteName: SITE_NAME,
      type: ogType,
      locale: ogLocale,
      ...(image ? { images: [image] } : { images: [DEFAULT_OG_IMAGE] }),
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      site: "@clever_legal",
      title,
      description: description || undefined,
    },
  };
}
