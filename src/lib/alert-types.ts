export const FW_TYPES = ["klage", "potenzielle_klage", "regulatorisch", "rueckruf", "leak"] as const;
export const HT_TYPES = ["neues_gesetz", "bgh_urteil", "trend"] as const;

export type ItemType = (typeof FW_TYPES)[number] | (typeof HT_TYPES)[number];

export const TYPE_LABELS: Record<ItemType, string> = {
  klage: "Sammelklage",
  potenzielle_klage: "Potenzielle Klage",
  regulatorisch: "Regulatorisch",
  rueckruf: "Rückruf",
  leak: "Datenleck",
  neues_gesetz: "Neues Gesetz",
  bgh_urteil: "BGH-Urteil",
  trend: "Trend",
};

export const TYPE_LABELS_EN: Record<ItemType, string> = {
  klage: "Class Action",
  potenzielle_klage: "Potential Lawsuit",
  regulatorisch: "Regulatory",
  rueckruf: "Recall",
  leak: "Data Leak",
  neues_gesetz: "New Law",
  bgh_urteil: "BGH Ruling",
  trend: "Trend",
};

export function getTypeLabels(locale: string): Record<ItemType, string> {
  return locale === "en" ? TYPE_LABELS_EN : TYPE_LABELS;
}

export const TYPE_COLORS: Record<ItemType, string> = {
  klage: "var(--danger)",
  potenzielle_klage: "var(--warn)",
  regulatorisch: "oklch(0.72 0.15 280)",
  rueckruf: "oklch(0.70 0.18 40)",
  leak: "oklch(0.68 0.16 340)",
  neues_gesetz: "var(--accent)",
  bgh_urteil: "oklch(0.72 0.12 220)",
  trend: "oklch(0.75 0.14 180)",
};

export interface AlertItemView {
  id: string;
  type: string;
  brand: string[];
  beklagter: string[];
  region: string;
  branche: string;
  klaegerSchaetzung: string;
  klaegerAnzahl: number | null;
  quelle: string;
  summary: string;
  summaryEn: string | null;
  link: string;
  publishedAt: string;
  rechtsgebiet: string | null;
  vorlaufzeit: string | null;
  anzahlDatensaetze: number | null;
  produktIdentifier: string | null;
  aktenzeichen: string | null;
}

const BRANCHE_EN: Record<string, string> = {
  Automobilindustrie: "Automotive",
  "E-Commerce": "E-Commerce",
  Gesundheitswesen: "Healthcare",
  "Glücksspielindustrie": "Gambling",
  Lebensmittelindustrie: "Food Industry",
  Pharmaindustrie: "Pharmaceuticals",
  Systemgastronomie: "Fast Food",
  Technologie: "Technology",
  Finanzdienstleistungen: "Financial Services",
  Versicherungen: "Insurance",
  Telekommunikation: "Telecommunications",
  Energiewirtschaft: "Energy",
  Immobilien: "Real Estate",
  Logistik: "Logistics",
};

const REGION_EN: Record<string, string> = {
  Deutschland: "Germany",
  Australien: "Australia",
  Global: "Global",
  USA: "USA",
  "Vereinigtes Königreich": "United Kingdom",
  Frankreich: "France",
  Österreich: "Austria",
  Schweiz: "Switzerland",
  Niederlande: "Netherlands",
  EU: "EU",
};

const RECHTSGEBIET_EN: Record<string, string> = {
  Datenschutzrecht: "Data Protection Law",
  Kapitalmarktrecht: "Capital Markets Law",
  Produkthaftung: "Product Liability",
  Produktsicherheit: "Product Safety",
  Verbraucherschutzrecht: "Consumer Protection Law",
  "Wettbewerbsrecht / Verbraucherschutz": "Competition / Consumer Protection",
  Arbeitsrecht: "Employment Law",
  Kartellrecht: "Antitrust Law",
  Umweltrecht: "Environmental Law",
  Versicherungsrecht: "Insurance Law",
};

export function translateField(field: string, value: string, locale: string): string {
  if (locale !== "en") return value;
  if (field === "branche") return BRANCHE_EN[value] ?? value;
  if (field === "region") return REGION_EN[value] ?? value;
  if (field === "rechtsgebiet") return RECHTSGEBIET_EN[value] ?? value;
  return value;
}

const DAY_ABBREV_EN: Record<string, string> = {
  MO: "MON", DI: "TUE", MI: "WED", DO: "THU", FR: "FRI", SA: "SAT", SO: "SUN",
};

const DAY_NAME_EN: Record<string, string> = {
  Montag: "Monday", Dienstag: "Tuesday", Mittwoch: "Wednesday",
  Donnerstag: "Thursday", Freitag: "Friday", Samstag: "Saturday", Sonntag: "Sunday",
  Manuell: "Manual",
};

export function translatePeriod(period: string, locale: string): string {
  if (locale !== "en") return period;
  let result = period
    .replace(/^letzte\s+(\d+)\s+Tage/i, "last $1 days")
    .replace(/^letzte\s+(\d+)\s+Tag\b/i, "last $1 day")
    .replace(/^letzter\s+Tag/i, "last day")
    .replace(/^letzte\s+Woche/i, "last week")
    .replace(/^letzten\s+(\d+)\s+Wochen/i, "last $1 weeks");
  result = result.replace(/\b(MO|DI|MI|DO|FR|SA|SO)\b/g, (m) => DAY_ABBREV_EN[m] ?? m);
  return result;
}

export function translateRunDay(runDay: string, locale: string): string {
  if (locale !== "en") return runDay;
  return DAY_NAME_EN[runDay] ?? runDay;
}
