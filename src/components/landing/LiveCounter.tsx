"use client";

import { useState, useEffect } from "react";

export default function LiveCounter() {
  const [n, setN] = useState(52882);
  useEffect(() => {
    const t = setInterval(
      () => setN((v) => v + Math.floor(Math.random() * 3 + 1)),
      1200,
    );
    return () => clearInterval(t);
  }, []);
  return <span>{n.toLocaleString("de-DE")}</span>;
}
