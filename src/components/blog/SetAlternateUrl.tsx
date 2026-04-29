"use client";

import { useEffect } from "react";
import { useAlternateUrl } from "@/components/landing/AlternateUrlContext";

export default function SetAlternateUrl({
  locale,
  path,
}: {
  locale: string;
  path: string;
}) {
  const { setAlternate } = useAlternateUrl();

  useEffect(() => {
    setAlternate({ locale, path });
    return () => setAlternate(null);
  }, [locale, path, setAlternate]);

  return null;
}
