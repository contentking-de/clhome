"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import MarkdownRenderer from "@/components/legal-alerts/MarkdownRenderer";

interface ReportPreviewProps {
  reportKey: string;
  title: string;
  subtitle: string;
  icon: string;
  slug: string;
  content: string;
}

export default function ReportPreview({
  title,
  subtitle,
  icon,
  slug,
  content,
}: ReportPreviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-container-highest/30 transition-colors"
      >
        <Icon name={icon} className="text-2xl text-surface-tint shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-headline font-bold">{title}</div>
          <div className="text-sm text-secondary truncate">{subtitle}</div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`/legal-alerts/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-surface-tint hover:underline"
          >
            Öffentliche Seite
          </a>
          <Icon
            name={expanded ? "expand_less" : "expand_more"}
            className="text-xl text-secondary"
          />
        </div>
      </button>

      {expanded && (
        <div
          className="border-t border-outline-variant/10 p-6 max-h-[600px] overflow-y-auto"
          style={{
            "--ink": "#131b2e",
            "--ink-2": "#3a3f4b",
            "--ink-3": "#6b7082",
            "--bg-2": "#eaedff",
            "--bg-3": "#dae2fd",
            "--line": "#c8cfe0",
            "--line-2": "#dae2fd",
            "--accent": "#4d34ff",
            "--accent-ink": "#ffffff",
          } as React.CSSProperties}
        >
          <MarkdownRenderer content={content} />
        </div>
      )}
    </div>
  );
}
