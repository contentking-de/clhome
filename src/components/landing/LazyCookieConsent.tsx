"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/landing/CookieConsent"),
  { ssr: false },
);

export default function LazyCookieConsent() {
  return <CookieConsent />;
}
