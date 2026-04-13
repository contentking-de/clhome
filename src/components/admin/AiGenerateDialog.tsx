"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface AiGenerateDialogProps {
  open: boolean;
  onClose: () => void;
  onGenerated: (data: {
    title: string;
    excerpt: string;
    content: string;
  }) => void;
}

const TOPIC_SUGGESTIONS = [
  "Legal Tech Trends 2026 – Was Kanzleien jetzt wissen müssen",
  "KI in der Rechtsberatung: Chancen, Risiken und aktuelle Rechtslage",
  "Digitalisierung von Kanzleien: Ein Praxis-Leitfaden",
  "Massenverfahren automatisieren – So gelingt die Skalierung",
  "DSGVO-Compliance mit KI: Automatisierte Datenschutzprüfung",
  "beA und Legal Tech: Schnittstellen intelligent nutzen",
];

type Phase = "idle" | "searching" | "processing" | "done" | "error";

export default function AiGenerateDialog({
  open,
  onClose,
  onGenerated,
}: AiGenerateDialogProps) {
  const [topic, setTopic] = useState("");
  const [instructions, setInstructions] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const topicInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && topicInputRef.current) {
      setTimeout(() => topicInputRef.current?.focus(), 100);
    }
    if (!open) {
      setPhase("idle");
      setStatusMessage("");
      setErrorMessage("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (phase === "searching" || phase === "processing") {
          abortRef.current?.abort();
        }
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, phase, onClose]);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) return;

    setPhase("searching");
    setStatusMessage("Recherchiere im Web und analysiere Quellen...");
    setErrorMessage("");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          instructions: instructions.trim() || undefined,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("Kein Stream verfügbar");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6);

          try {
            const event = JSON.parse(json);

            if (event.type === "status") {
              setStatusMessage(event.message);
              if (event.message.includes("Verarbeite")) {
                setPhase("processing");
              }
            } else if (event.type === "result") {
              setPhase("done");
              onGenerated({
                title: event.title,
                excerpt: event.excerpt,
                content: event.content,
              });
            } else if (event.type === "error") {
              throw new Error(event.message);
            }
          } catch (parseErr) {
            if (
              parseErr instanceof Error &&
              parseErr.message !== json
            ) {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setPhase("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Unbekannter Fehler"
      );
    }
  }, [topic, instructions, onGenerated]);

  if (!open) return null;

  const isLoading = phase === "searching" || phase === "processing";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (!isLoading) onClose();
        }}
      />

      <div className="relative bg-surface-container-low rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-outline-variant/20">
        <div className="sticky top-0 bg-surface-container-low z-10 px-6 pt-6 pb-4 border-b border-outline-variant/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-tint/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-surface-tint">
                  auto_awesome
                </span>
              </div>
              <div>
                <h2 className="font-headline text-lg font-bold text-on-background">
                  KI-Artikel generieren
                </h2>
                <p className="text-secondary text-xs">
                  Web-Recherche + tiefgründige Analyse
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="p-2 rounded-lg text-secondary hover:text-on-background hover:bg-surface-container-highest transition-colors disabled:opacity-30"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {phase === "idle" || phase === "error" ? (
            <>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">
                  Thema / Titel-Idee
                </label>
                <input
                  ref={topicInputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && topic.trim()) handleGenerate();
                  }}
                  placeholder="z.B. KI in der Rechtsberatung, DSGVO-Änderungen 2026..."
                  className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background placeholder:text-outline"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {TOPIC_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setTopic(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full border border-outline-variant/20 text-secondary hover:text-on-background hover:border-surface-tint/30 hover:bg-surface-tint/5 transition-all"
                  >
                    {suggestion.length > 45
                      ? suggestion.slice(0, 45) + "…"
                      : suggestion}
                  </button>
                ))}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-sm text-secondary hover:text-on-background flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">
                    {showInstructions ? "expand_less" : "expand_more"}
                  </span>
                  Zusätzliche Anweisungen
                </button>
                {showInstructions && (
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={3}
                    placeholder="z.B. Fokus auf mittelständische Kanzleien, Vergleichstabelle aufnehmen, bestimmte Gesetze erwähnen..."
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background resize-none placeholder:text-outline text-sm"
                  />
                )}
              </div>

              {phase === "error" && (
                <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                  <span className="material-symbols-outlined text-base mt-0.5">
                    error
                  </span>
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!topic.trim()}
                  className="flex-1 bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">
                    auto_awesome
                  </span>
                  Artikel generieren
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-highest transition-all text-on-background"
                >
                  Abbrechen
                </button>
              </div>
            </>
          ) : isLoading ? (
            <div className="py-12 flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-surface-tint/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-surface-tint animate-pulse">
                    {phase === "searching" ? "travel_explore" : "edit_note"}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface-tint flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm animate-spin">
                    progress_activity
                  </span>
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="font-headline font-bold text-on-background">
                  {phase === "searching"
                    ? "Web-Recherche läuft"
                    : "Artikel wird geschrieben"}
                </p>
                <p className="text-secondary text-sm max-w-sm">
                  {statusMessage}
                </p>
                <p className="text-outline text-xs">
                  Das kann 30–60 Sekunden dauern
                </p>
              </div>

              <div className="w-full max-w-xs">
                <div className="h-1 bg-outline-variant/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-surface-tint rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: phase === "searching" ? "45%" : "80%",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  abortRef.current?.abort();
                  setPhase("idle");
                }}
                className="text-sm text-secondary hover:text-on-background transition-colors"
              >
                Abbrechen
              </button>
            </div>
          ) : phase === "done" ? (
            <div className="py-8 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-green-600">
                  check_circle
                </span>
              </div>
              <div className="text-center">
                <p className="font-headline font-bold text-on-background">
                  Artikel wurde generiert
                </p>
                <p className="text-secondary text-sm mt-1">
                  Titel, Auszug und Inhalt wurden ins Formular übernommen.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
              >
                Schließen
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
