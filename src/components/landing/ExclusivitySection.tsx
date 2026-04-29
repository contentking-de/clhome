import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Icon from "../ui/Icon";

export default async function ExclusivitySection() {
  const t = await getTranslations("Exclusivity");

  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-surface-tint/15 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-tertiary-fixed-dim/15 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <Icon name="workspace_premium" className="text-5xl text-tertiary-fixed-dim mb-6 block" />
            <h2 className="font-headline text-[2.5rem] md:text-[3rem] font-extrabold leading-tight text-white mb-6">
              {t("heading")}
            </h2>
            <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-4">
              {t("body1")}
            </p>
            <p className="text-white font-bold text-lg mb-10">
              {t("body2Bold")}
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-surface-tint text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              {t("cta")}
              <Icon name="lock" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
