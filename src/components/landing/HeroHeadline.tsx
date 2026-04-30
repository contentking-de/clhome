"use client";

import { useState, useEffect } from "react";

export default function HeroHeadline({
  lines,
  reveal,
}: {
  lines: string[];
  reveal: string;
}) {
  const fullText = lines.join("\n");
  const [typedCount, setTypedCount] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setTypedCount(fullText.length);
      setShowReveal(true);
      return;
    }
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        i++;
        setTypedCount(i);
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowReveal(true), 2000);
      }
    }, 45);
    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  let offset = 0;
  const lineRanges = lines.map((line) => {
    const start = offset;
    offset += line.length + 1;
    return { start, end: start + line.length };
  });

  return (
    <h1
      className="display"
      style={{
        fontSize: "clamp(56px, 9vw, 148px)",
        fontWeight: 800,
        lineHeight: 0.95,
        letterSpacing: "-0.04em",
        textAlign: "center",
        minHeight: "4.2em",
      }}
    >
      {lines.map((line, lineIdx) => {
        const { start, end } = lineRanges[lineIdx];
        const charsTyped = Math.max(
          0,
          Math.min(line.length, typedCount - start),
        );
        const typedPart = line.slice(0, charsTyped);
        const untypedPart = line.slice(charsTyped);
        const showCursorHere =
          !showReveal && typedCount >= start && typedCount <= end;
        const isAccent = lineIdx === 2;

        const content = (
          <>
            {typedPart}
            {showCursorHere && (
              <span
                aria-hidden="true"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              >
                _
              </span>
            )}
            {untypedPart && (
              <span style={{ visibility: "hidden" }}>{untypedPart}</span>
            )}
          </>
        );

        return (
          <span key={lineIdx}>
            {isAccent ? (
              <span style={{ color: "var(--accent)" }}>{content}</span>
            ) : (
              content
            )}
            <br />
          </span>
        );
      })}
      <span
        style={{
          color: "var(--ink-2)",
          visibility: showReveal ? "visible" : "hidden",
          opacity: showReveal ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {reveal}
      </span>
    </h1>
  );
}
