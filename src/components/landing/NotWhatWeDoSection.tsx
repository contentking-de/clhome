import { getTranslations } from "next-intl/server";
import Icon from "../ui/Icon";

export default async function NotWhatWeDoSection() {
  const t = await getTranslations("NotWhatWeDo");

  return (
    <section id="abgrenzung" className="py-32 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-on-background rounded-2xl p-12 md:p-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-400/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-surface-tint/10 blur-[100px] rounded-full" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-400/15">
                <Icon name="block" className="text-3xl text-red-400" />
              </span>
              <span className="text-red-400 font-label font-bold text-xs uppercase tracking-widest">
                {t("badge")}
              </span>
            </div>

            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight text-white mb-6">
              {t("headingPart1")}
              <span className="text-red-400">{t("headingEmphasis")}</span>
              {t("headingPart2")}
            </h2>

            <p className="text-secondary-fixed-dim text-lg leading-relaxed mb-10">
              {t("intro")}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10">
              <div className="flex items-start gap-5">
                <Icon name="rocket_launch" className="text-3xl text-tertiary-fixed-dim mt-1 shrink-0" />
                <div>
                  <h3 className="font-headline text-xl font-bold text-white mb-3">
                    {t("cardTitle")}
                  </h3>
                  <p className="text-secondary-fixed-dim leading-relaxed">
                    {t("cardBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
