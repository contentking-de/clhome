import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist ein Pflichtfeld.").max(200),
  kanzlei: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().toLowerCase().email("Ungültige E-Mail-Adresse.").max(320),
  gebiet: z.string().trim().max(200).optional().default(""),
  service: z.string().trim().max(200).optional().default(""),
  msg: z.string().trim().min(1, "Nachricht ist ein Pflichtfeld.").max(5000),
  _hp: z.string().max(0).optional().default(""),
});

export const subscribeSchema = z.object({
  name: z.string().trim().min(1, "Name ist ein Pflichtfeld.").max(200),
  email: z.string().trim().toLowerCase().email("Ungültige E-Mail-Adresse.").max(320),
  _hp: z.string().max(0).optional().default(""),
});

// ---------------------------------------------------------------------------
// HTML escape for dynamic values in email templates
// ---------------------------------------------------------------------------

const ESC: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (ch) => ESC[ch] ?? ch);
}

// ---------------------------------------------------------------------------
// Honeypot check — returns true when the submission looks like a bot
// ---------------------------------------------------------------------------

export function isBot(hp: string | undefined): boolean {
  return typeof hp === "string" && hp.length > 0;
}

// ---------------------------------------------------------------------------
// Simple in-memory sliding-window rate limiter (per serverless instance)
// ---------------------------------------------------------------------------

interface RateBucket {
  timestamps: number[];
}

const buckets = new Map<string, RateBucket>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - windowMs;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}

export function rateLimit(
  key: string,
  { maxRequests, windowMs }: { maxRequests: number; windowMs: number },
): boolean {
  cleanup(windowMs);
  const now = Date.now();
  const cutoff = now - windowMs;

  let bucket = buckets.get(key);
  if (!bucket) {
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }

  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  if (bucket.timestamps.length >= maxRequests) {
    return false;
  }

  bucket.timestamps.push(now);
  return true;
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}
