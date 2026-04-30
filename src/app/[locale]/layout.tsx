import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import LazyCookieConsent from "@/components/landing/LazyCookieConsent";
import { AlternateUrlProvider } from "@/components/landing/AlternateUrlContext";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const ogLocale = locale === "de" ? "de_DE" : "en_US";
  const url = locale === "de" ? "/" : "/en";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url,
      siteName: "clever.legal",
      type: "website",
      locale: ogLocale,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary",
      site: "@clever_legal",
      title: t("title"),
      description: t("ogDescription"),
    },
    alternates: {
      languages: {
        de: "/",
        en: "/en",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {locale === "de" ? "Zum Inhalt springen" : "Skip to content"}
      </a>
      <NextIntlClientProvider messages={messages}>
        <AlternateUrlProvider>
          {children}
          <LazyCookieConsent />
        </AlternateUrlProvider>
      </NextIntlClientProvider>
    </>
  );
}
