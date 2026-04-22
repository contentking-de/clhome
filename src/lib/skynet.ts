import { prisma } from "@/lib/prisma";
import type { LegalAlertEdition, LegalAlertItem } from "@prisma/client";
import { FW_TYPES, HT_TYPES, TYPE_LABELS, TYPE_COLORS } from "@/lib/alert-types";
import type { ItemType, AlertItemView } from "@/lib/alert-types";

export { TYPE_LABELS, TYPE_COLORS };
export type { ItemType, AlertItemView };

const BASE_URL = "https://skynet42.de/clever-legal";

function getAuthHeader(): string {
  const user = process.env.SKYNET42_USERNAME;
  const pass = process.env.SKYNET42_PASSWORD;
  if (!user || !pass) throw new Error("SKYNET42 credentials missing");
  return "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
}

// ── Feed Types (v2, since 2026-04-21) ──

export interface FeedItem {
  type: ItemType;
  brand: string[];
  beklagter: string[];
  region: string;
  branche: string;
  klägerSchätzung: string;
  klägerAnzahl: number | null;
  quelle: string;
  summary: string;
  link: string;
  publishedAt: string;
  details?: {
    rechtsgebiet?: string;
    vorlaufzeit?: string;
    anzahlDatensätze?: number;
    produktIdentifier?: string;
    aktenzeichen?: string;
  };
}

export interface FeedData {
  generatedAt: string;
  runDay: string;
  period: { label: string; from: string; to: string };
  next_update: string;
  items: FeedItem[];
  stats: {
    totalArticles: number;
    feedsProcessed: number;
    feedsFailed: number;
  };
  reports: { frühwarnung: string; hotTopics: string };
  errors?: string[];
}

export interface NormalizedStats {
  totalArticles: number;
  feedsProcessed: number;
  feedsFailed: number;
}

/** Old editions stored different stats shapes — normalize for UI */
export function normalizeStats(raw: unknown): NormalizedStats {
  const s = raw as Record<string, unknown>;
  return {
    totalArticles:
      typeof s.totalArticles === "number"
        ? s.totalArticles
        : typeof s.articleCount === "number"
          ? s.articleCount
          : 0,
    feedsProcessed:
      typeof s.feedsProcessed === "number" ? s.feedsProcessed : 0,
    feedsFailed:
      typeof s.feedsFailed === "number"
        ? s.feedsFailed
        : Array.isArray(s.feedsFailed)
          ? s.feedsFailed.length
          : 0,
  };
}

// ── Fetching ──

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

// ── Persist ──

export async function refreshEdition(): Promise<LegalAlertEdition> {
  const feed = await fetchFeedFromSkynet();

  const reportContents: Record<string, string> = {};
  for (const [key, filename] of Object.entries(feed.reports)) {
    reportContents[key] = await fetchReportFromSkynet(filename);
  }

  const [, edition] = await prisma.$transaction([
    prisma.legalAlertEdition.updateMany({
      where: { isCurrent: true },
      data: { isCurrent: false },
    }),
    prisma.legalAlertEdition.create({
      data: {
        generatedAt: new Date(feed.generatedAt),
        period: feed.period.label,
        runDay: feed.runDay,
        nextUpdate: feed.next_update,
        stats: {
          totalArticles: feed.stats.totalArticles,
          feedsProcessed: feed.stats.feedsProcessed,
          feedsFailed: feed.stats.feedsFailed,
        },
        reports: reportContents,
        feedJson: JSON.parse(JSON.stringify(feed)),
        errors: feed.errors ?? [],
        isCurrent: true,
        items: {
          create: feed.items.map((item) => ({
            type: item.type,
            brand: item.brand,
            beklagter: item.beklagter,
            region: item.region,
            branche: item.branche,
            klaegerSchaetzung: item.klägerSchätzung,
            klaegerAnzahl: item.klägerAnzahl,
            quelle: item.quelle,
            summary: item.summary,
            link: item.link,
            publishedAt: item.publishedAt,
            rechtsgebiet: item.details?.rechtsgebiet ?? null,
            vorlaufzeit: item.details?.vorlaufzeit ?? null,
            anzahlDatensaetze: item.details?.anzahlDatensätze ?? null,
            produktIdentifier: item.details?.produktIdentifier ?? null,
            aktenzeichen: item.details?.aktenzeichen ?? null,
          })),
        },
      },
    }),
  ]);
  return edition;
}

// ── Views ──

export interface EditionView {
  id: string;
  generatedAt: Date;
  period: string;
  runDay: string;
  nextUpdate: string | null;
  stats: NormalizedStats;
  reports: Record<string, string>;
  errors: string[];
  isCurrent: boolean;
  createdAt: Date;
}

function toEditionView(edition: LegalAlertEdition): EditionView {
  return {
    id: edition.id,
    generatedAt: edition.generatedAt,
    period: edition.period,
    runDay: edition.runDay,
    nextUpdate: edition.nextUpdate,
    stats: normalizeStats(edition.stats),
    reports: edition.reports as Record<string, string>,
    errors: edition.errors,
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

// ── Item Queries ──

function toAlertItemView(item: LegalAlertItem): AlertItemView {
  return {
    id: item.id,
    type: item.type,
    brand: item.brand,
    beklagter: item.beklagter,
    region: item.region,
    branche: item.branche,
    klaegerSchaetzung: item.klaegerSchaetzung,
    klaegerAnzahl: item.klaegerAnzahl,
    quelle: item.quelle,
    summary: item.summary,
    link: item.link,
    publishedAt: item.publishedAt,
    rechtsgebiet: item.rechtsgebiet,
    vorlaufzeit: item.vorlaufzeit,
    anzahlDatensaetze: item.anzahlDatensaetze,
    produktIdentifier: item.produktIdentifier,
    aktenzeichen: item.aktenzeichen,
  };
}

export async function getItemsForEdition(
  editionId: string,
  category?: "fw" | "ht"
): Promise<AlertItemView[]> {
  const typeFilter =
    category === "fw"
      ? { in: [...FW_TYPES] }
      : category === "ht"
        ? { in: [...HT_TYPES] }
        : undefined;

  const items = await prisma.legalAlertItem.findMany({
    where: {
      editionId,
      ...(typeFilter ? { type: typeFilter } : {}),
    },
    orderBy: [{ klaegerAnzahl: { sort: "desc", nulls: "last" } }, { publishedAt: "desc" }],
  });
  return items.map(toAlertItemView);
}

export function getCategoryForSlug(slug: string): "fw" | "ht" | null {
  if (slug === "fruehwarnung") return "fw";
  if (slug === "hot-topics") return "ht";
  return null;
}

export function getTypesForCategory(category: "fw" | "ht"): readonly string[] {
  return category === "fw" ? FW_TYPES : HT_TYPES;
}

// ── Report Meta ──

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
