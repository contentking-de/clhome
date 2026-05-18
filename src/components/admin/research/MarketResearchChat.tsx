"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Icon from "@/components/ui/Icon";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "Wie groß ist der Legal-Tech-Markt in Deutschland?",
  "Wer sind die wichtigsten Wettbewerber im Bereich Sammelklagen?",
  "Welche Trends prägen den Legal-Tech-Markt 2025?",
  "Welche Geschäftsmodelle nutzen Legal-Tech-Startups?",
];

export default function MarketResearchChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [exporting, setExporting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || streaming) return;

    const userMessage: Message = { role: "user", content };
    const history = [...messages];
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      abortRef.current = new AbortController();
      const res = await fetch("/api/research/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const current = accumulated;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: current };
          return updated;
        });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  async function exportChat() {
    if (!messages.length) return;
    setExporting(true);
    try {
      const res = await fetch("/api/research/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, title: "Research Export" }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "research-export.docx";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export fehlgeschlagen.");
    } finally {
      setExporting(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] rounded-xl border border-outline-variant/10 bg-surface-container-low overflow-hidden">
      {messages.length > 0 && (
        <div className="px-6 py-3 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="query_stats" className="text-lg text-surface-tint" />
            <span className="text-sm font-medium text-on-background">Research Assistent</span>
          </div>
          <button
            onClick={exportChat}
            disabled={exporting || streaming}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-tint/10 text-surface-tint text-xs font-medium hover:bg-surface-tint/20 transition-colors disabled:opacity-50"
          >
            <Icon name="cloud_upload" className="text-xs" />
            {exporting ? "Exportiert..." : "Als DOCX exportieren"}
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center">
            <Icon name="query_stats" className="text-5xl text-secondary mb-4" />
            <h2 className="text-xl font-semibold text-on-background mb-2">
              Marktforschungs-Assistent
            </h2>
            <p className="text-sm text-secondary mb-8">
              Stelle Fragen zum Legal-Tech-Markt, Wettbewerbern, Zielgruppen und Geschäftsmodellen.
              Der Assistent hilft dir bei der Recherche.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-left px-4 py-3 rounded-xl border border-outline-variant/10 text-sm text-on-background hover:bg-surface-tint/10 hover:border-surface-tint/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-2xl rounded-xl px-5 py-3 ${
                    msg.role === "user"
                      ? "bg-surface-tint/10 text-on-background"
                      : "bg-surface-container-highest/50 text-on-background"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-on-background prose-headings:text-on-background prose-strong:text-on-background prose-a:text-surface-tint">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content || "…"}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-outline-variant/10 flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Stelle eine Frage zur Marktforschung..."
          disabled={streaming}
          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-container-highest/50 text-on-background text-sm placeholder:text-secondary border border-outline-variant/10 focus:outline-none focus:border-surface-tint disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="px-4 py-2.5 rounded-lg bg-surface-tint text-white text-sm font-medium disabled:opacity-50 transition-colors hover:opacity-90"
        >
          {streaming ? (
            <Icon name="progress_activity" className="text-sm animate-spin" />
          ) : (
            "Senden"
          )}
        </button>
      </form>
    </div>
  );
}
