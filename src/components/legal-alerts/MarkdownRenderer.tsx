"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={`prose-blog max-w-none ${className ?? ""}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
