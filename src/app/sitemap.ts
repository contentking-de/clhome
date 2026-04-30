import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE = "https://www.clever.legal";

const STATIC_PATHS = [
  "",
  "/fuer-anwaelte",
  "/fuer-unternehmen",
  "/story",
  "/kontakt",
  "/leistungen/ki-schulungen",
  "/leistungen/ki-integration",
  "/leistungen/lead-satelliten",
  "/leistungen/online-marketing",
  "/blog",
  "/legal-alerts",
  "/impressum",
  "/datenschutz",
  "/barrierefreiheit",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    entries.push({
      url: `${BASE}${path}`,
      alternates: {
        languages: {
          de: `${BASE}${path}`,
          en: `${BASE}/en${path}`,
        },
      },
    });
  }

  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, locale: true, updatedAt: true, translationOfId: true, translations: { select: { slug: true } } },
  });

  const dePosts = posts.filter((p) => p.locale === "de");
  for (const post of dePosts) {
    const enTranslation = post.translations[0];
    const alternates: Record<string, string> = {
      de: `${BASE}/blog/${post.slug}`,
    };
    if (enTranslation) {
      alternates.en = `${BASE}/en/blog/${enTranslation.slug}`;
    }
    entries.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      alternates: { languages: alternates },
    });
  }

  const enPosts = posts.filter((p) => p.locale === "en");
  for (const post of enPosts) {
    const deOriginal = dePosts.find((dp) => dp.translations.some((t) => t.slug === post.slug));
    const alternates: Record<string, string> = {
      en: `${BASE}/en/blog/${post.slug}`,
    };
    if (deOriginal) {
      alternates.de = `${BASE}/blog/${deOriginal.slug}`;
    }
    entries.push({
      url: `${BASE}/en/blog/${post.slug}`,
      lastModified: post.updatedAt,
      alternates: { languages: alternates },
    });
  }

  const editions = await prisma.legalAlertEdition.findMany({
    select: { runDay: true, reportsEn: true, createdAt: true },
    orderBy: { generatedAt: "desc" },
    take: 20,
  });

  for (const edition of editions) {
    const slug = edition.runDay;
    const hasEn = edition.reportsEn != null;
    const alternates: Record<string, string> = {
      de: `${BASE}/legal-alerts/${slug}`,
    };
    if (hasEn) {
      alternates.en = `${BASE}/en/legal-alerts/${slug}`;
    }
    entries.push({
      url: `${BASE}/legal-alerts/${slug}`,
      lastModified: edition.createdAt,
      alternates: { languages: alternates },
    });
  }

  return entries;
}
