"use client";

import { useState, useMemo } from "react";
import type { AlertItemView } from "@/lib/alert-types";
import { TYPE_LABELS, TYPE_COLORS } from "@/lib/alert-types";

interface Props {
  items: AlertItemView[];
  availableTypes: string[];
}

function unique(arr: string[]): string[] {
  return [...new Set(arr.filter(Boolean))].sort();
}

export default function AlertItemsView({ items, availableTypes }: Props) {
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState("");
  const [branche, setBranche] = useState("");
  const [search, setSearch] = useState("");

  const regions = useMemo(() => unique(items.map((i) => i.region)), [items]);
  const branchen = useMemo(() => unique(items.map((i) => i.branche)), [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (activeTypes.size > 0 && !activeTypes.has(item.type)) return false;
      if (region && item.region !== region) return false;
      if (branche && item.branche !== branche) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = [
          item.summary,
          ...item.brand,
          ...item.beklagter,
          item.quelle,
          item.rechtsgebiet ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [items, activeTypes, region, branche, search]);

  const toggleType = (t: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const hasActiveFilters = activeTypes.size > 0 || region || branche || search;

  return (
    <div>
      {/* Filter Bar */}
      <div className="alert-filter-bar">
        <div className="alert-filter-row">
          <div className="alert-filter-types">
            {availableTypes.map((t) => (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={`alert-type-chip ${activeTypes.has(t) ? "active" : ""}`}
                style={{
                  "--chip-color": TYPE_COLORS[t as keyof typeof TYPE_COLORS],
                } as React.CSSProperties}
              >
                <span className="alert-type-dot" />
                {TYPE_LABELS[t as keyof typeof TYPE_LABELS] ?? t}
              </button>
            ))}
          </div>
        </div>

        <div className="alert-filter-controls">
          <div className="alert-filter-select-wrap">
            <label htmlFor="alert-filter-region" className="sr-only">Region filtern</label>
            <select
              id="alert-filter-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="alert-filter-select"
            >
              <option value="">Alle Regionen</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="alert-filter-select-wrap">
            <label htmlFor="alert-filter-branche" className="sr-only">Branche filtern</label>
            <select
              id="alert-filter-branche"
              value={branche}
              onChange={(e) => setBranche(e.target.value)}
              className="alert-filter-select"
            >
              <option value="">Alle Branchen</option>
              {branchen.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suche (Marke, Beklagter, …)"
            className="alert-filter-search"
          />

          {hasActiveFilters && (
            <button
              onClick={() => {
                setActiveTypes(new Set());
                setRegion("");
                setBranche("");
                setSearch("");
              }}
              className="alert-filter-reset"
            >
              Zurücksetzen
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ink-3)", marginBottom: 20 }}>
        {filtered.length} VON {items.length} MELDUNGEN
        {hasActiveFilters && " (GEFILTERT)"}
      </div>

      {/* Items */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 0" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em" }}>
            Keine Meldungen für diese Filterkriterien.
          </div>
        </div>
      ) : (
        <div className="alert-items-grid">
          {filtered.map((item) => (
            <AlertCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function AlertCard({ item }: { item: AlertItemView }) {
  const typeColor = TYPE_COLORS[item.type as keyof typeof TYPE_COLORS] ?? "var(--ink-3)";
  const typeLabel = TYPE_LABELS[item.type as keyof typeof TYPE_LABELS] ?? item.type;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="alert-card"
      style={{ "--card-accent": typeColor } as React.CSSProperties}
    >
      <div className="alert-card-header">
        <span className="alert-card-type" style={{ color: typeColor }}>
          <span className="alert-card-type-dot" style={{ background: typeColor }} />
          {typeLabel}
        </span>
        <span className="alert-card-date mono">{item.publishedAt}</span>
      </div>

      <div className="alert-card-summary">{item.summary}</div>

      <div className="alert-card-meta">
        {item.brand.length > 0 && (
          <div className="alert-card-tags">
            {item.brand.map((b) => (
              <span key={b} className="alert-card-tag">{b}</span>
            ))}
          </div>
        )}
        {item.beklagter.filter((b) => !item.brand.includes(b)).length > 0 && (
          <div className="alert-card-tags">
            {item.beklagter.filter((b) => !item.brand.includes(b)).map((b) => (
              <span key={b} className="alert-card-tag alert-card-tag-beklagter">{b}</span>
            ))}
          </div>
        )}
      </div>

      <div className="alert-card-footer">
        <div className="alert-card-chips">
          {item.region && <span className="alert-card-chip">{item.region}</span>}
          {item.branche && <span className="alert-card-chip">{item.branche}</span>}
          {item.rechtsgebiet && <span className="alert-card-chip">{item.rechtsgebiet}</span>}
        </div>
        <div className="alert-card-right">
          {item.klaegerAnzahl !== null && (
            <span className="alert-card-count mono">
              {item.klaegerAnzahl.toLocaleString("de-DE")} Kläger
            </span>
          )}
          {item.klaegerSchaetzung && item.klaegerSchaetzung !== "n/a" && item.klaegerAnzahl === null && (
            <span className="alert-card-count mono">
              {item.klaegerSchaetzung}
            </span>
          )}
        </div>
      </div>

      <div className="alert-card-source mono">
        {item.quelle} · QUELLE ÖFFNEN →
      </div>
    </a>
  );
}
