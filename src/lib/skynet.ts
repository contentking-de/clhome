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

export async function fetchFeed(): Promise<FeedData> {
  const res = await fetch(`${BASE_URL}/feed.json`, {
    headers: { Authorization: getAuthHeader() },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Feed fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchReport(filename: string): Promise<string> {
  const res = await fetch(`${BASE_URL}/${filename}`, {
    headers: { Authorization: getAuthHeader() },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Report fetch failed: ${res.status}`);
  return res.text();
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
