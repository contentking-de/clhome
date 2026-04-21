"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

interface RefreshResult {
  success: boolean;
  id?: string;
  generatedAt?: string;
  period?: string;
  reports?: string[];
  error?: string;
}

export default function RefreshButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RefreshResult | null>(null);

  async function handleRefresh() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/legal-alerts/refresh", {
        method: "POST",
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "Netzwerkfehler" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleRefresh}
        disabled={loading}
        className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon
          name="refresh"
          className={`text-xl ${loading ? "animate-spin" : ""}`}
        />
        {loading ? "Wird aktualisiert…" : "Jetzt aktualisieren"}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded-lg border ${
            result.success
              ? "bg-green-50 border-green-300 text-green-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {result.success ? (
            <div className="flex items-start gap-3">
              <Icon name="check_circle" className="text-xl mt-0.5" />
              <div>
                <p className="font-semibold">Erfolgreich aktualisiert</p>
                <p className="text-sm opacity-80 mt-1">
                  Zeitraum: {result.period} &middot;{" "}
                  {result.reports?.length} Reports geladen
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Icon name="error" className="text-xl mt-0.5" />
              <div>
                <p className="font-semibold">Fehler beim Aktualisieren</p>
                <p className="text-sm opacity-80 mt-1">{result.error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
