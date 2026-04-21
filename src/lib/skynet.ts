import { prisma } from "@/lib/prisma";
import type { LegalAlertEdition } from "@prisma/client";

const BASE_URL = "https://skynet42.de/clever-legal";

function getAuthHeader(): string {
  const user = process.env.SKYNET42_USERNAME;
  const pass = process.env.SKYNET42_PASSWORD;
  if (!user || !pass) throw new Error("SKYNET42 credentials missing");
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

export interface FeedData {
  generatedAt: string;
  runDay: string;
  period: string;
  stats: {
    feedsProcessed: number;
    feedsFailed: { name: string; error: string }[];
    articleCount: number;
    scrapeCount: number;
  };
  reports: Record<string, string>;
}

export async function fetchFeedFromSkynet(): Promise<FeedData> {
  const res = await fetch(`${BASE_URL}/feed.json`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchReportFromSkynet(filename: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/${filename}`, {
    headers: { Authorization: getAuthHeader() },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Report fetch failed: ${res.status}`);
  return res.text();
}

export async function refreshEdition(): Promise<LegalAlertEdition> {
  const feed = await fetchFeedFromSkynet();
  const reportContents: Record<string, string> = {};
  for (const [key, filename] of Object.entries(feed.reports)) {
    reportContents[key] = await fetchReportFromSkynet(filename as string);
  }

  const [, edition] = await prisma.$transaction([
    prisma.legalAlertEdition.updateMany({
      where: { isCurrent: true },
      data: { isCurrent: false },
    }),
    prisma.legalAlertEdition.create({
      data: {
        generatedAt: new Date(feed.generatedAt),
        period: feed.period,
        runDay: feed.runDay,
        stats: feed.stats,
        reports: reportContents,
        feedJson: JSON.parse(JSON.stringify(feed)),
        isCurrent: true,
      },
    }),
  ]);
  return edition;
}

export interface EditionView {
  id: string;
  generatedAt: Date;
  period: string;
  runDay: string;
  stats: FeedData["stats"];
  reports: Record<string, string>;
  isCurrent: boolean;
  createdAt: Date;
}

function toEditionView(edition: LegalAlertEdition): EditionView {
  return {
    id: edition.id,
    generatedAt: edition.generatedAt,
    period: edition.period,
    runDay: edition.runDay,
    stats: edition.stats as FeedData["stats"],
    reports: edition.reports as Record<string, string>,
    isCurrent: edition.isCurrent,
    createdAt: edition.createdAt,
  };
}

export async function getCurrentEdition(): Promise<EditionView | null> {
  let edition = await prisma.legalAlertEdition.findFirst({
    where: { isCurrent: true },
  });

  if (!edition) {
    try {
      edition = await refreshEdition();
    } catch {
      return null;
    }
  }

  return toEditionView(edition);
}

export async function getEditionById(id: string): Promise<EditionView | null> {
  const edition = await prisma.legalAlertEdition.findUnique({
    where: { id },
  });
  return edition ? toEditionView(edition) : null;
}

export async function getArchivedEditions(): Promise<EditionView[]> {
  const editions = await prisma.legalAlertEdition.findMany({
    where: { isCurrent: false },
    orderBy: { generatedAt: "desc" },
  });
  return editions.map(toEditionView);
}

const REPORT_META: Record<string, {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
}> = {
  frühwarnung: {
    slug: "fruehwarnung",
    title: "Sammelklagen-Frühwarnung",
    subtitle: "Neue Klagen, potenzielle Verfahren und regulatorische Signale – kompakt aufbereitet.",
    icon: "crisis_alert",
    accent: "text-error",
  },
  hotTopics: {
    slug: "hot-topics",
    title: "Hot Legal Topics",
    subtitle: "Gesetze, BGH-Urteile und Trends in Litigation Funding & Legal-Tech.",
    icon: "local_fire_department",
    accent: "text-on-primary-container",
  },
};

export function getReportMeta(key: string) {
  return REPORT_META[key] ?? null;
}

export function getAllReportMeta() {
  return REPORT_META;
}

export function getReportKeyBySlug(slug: string): string | null {
  for (const [key, meta] of Object.entries(REPORT_META)) {
    if (meta.slug === slug) return key;
  }
  return null;
}
