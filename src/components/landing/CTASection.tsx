import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Icon from "../ui/Icon";

export default async function CTASection() {
  const t = await getTranslations("CTA");

  return (
    <section className="py-24 px-8 border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-headline text-2xl font-bold mb-2">
              {t("headline")}
            </h3>
            <p className="text-secondary max-w-lg">
              {t("body")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                {t("stat1Value")}
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                {t("stat1Label")}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                {t("stat2Value")}
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                {t("stat2Label")}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold font-headline text-on-background mb-1">
                {t("stat3Value")}
              </span>
              <span className="text-xs uppercase font-label tracking-tighter text-secondary">
                {t("stat3Label")}
              </span>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-on-primary-container text-on-primary px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
          >
            {t("buttonRequestStrategyCall")}
            <Icon name="arrow_forward" />
          </Link>
          <p className="text-secondary text-sm mt-3">
            {t("footnoteOnePartner")}
          </p>
        </div>
      </div>
    </section>
  );
}
