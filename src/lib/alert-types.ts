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
  link: string;
  publishedAt: string;
  rechtsgebiet: string | null;
  vorlaufzeit: string | null;
  anzahlDatensaetze: number | null;
  produktIdentifier: string | null;
  aktenzeichen: string | null;
}
