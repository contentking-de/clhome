import SubpageShell from "@/components/landing/SubpageShell";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Barrierefreiheit");
  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/barrierefreiheit",
    locale,
  });
}

export default async function BarrierefreiheitPage() {
  const t = await getTranslations("Barrierefreiheit");
  return (
    <SubpageShell>
      <section style={{ borderBottom: "1px solid var(--line-2)" }}>
        <div className="l-container" style={{ padding: "96px 32px" }}>
          <div className="l-label" style={{ marginBottom: 18 }}>
            {t("heroLabel")}
          </div>
          <h1
            className="display"
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            {t("heroHeadingPart1")}
            <span style={{ color: "var(--accent)" }}>{t("heroHeadingAccent")}</span>
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            <Block title={t("scopeTitle")}>
              <p>
                {t("scopeP1")}
              </p>
              <p style={{ marginTop: 12 }}>
                {t("scopeP2")}
              </p>
            </Block>

            <Block title={t("statusTitle")}>
              <p>
                {t("statusP1")}
              </p>
            </Block>

            <Divider />

            <h2
              className="display"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 700,
              }}
            >
              {t("measuresHeading")}
            </h2>

            <Measure
              num="01"
              title={t("measure01Title")}
              items={[
                t("measure01Item1"),
                t("measure01Item2"),
                t("measure01Item3"),
              ]}
            />

            <Measure
              num="02"
              title={t("measure02Title")}
              items={[
                t("measure02Item1"),
                t("measure02Item2"),
                t("measure02Item3"),
                t("measure02Item4"),
              ]}
            />

            <Measure
              num="03"
              title={t("measure03Title")}
              items={[
                t("measure03Item1"),
                t("measure03Item2"),
                t("measure03Item3"),
              ]}
            />

            <Measure
              num="04"
              title={t("measure04Title")}
              items={[
                t("measure04Item1"),
                t("measure04Item2"),
                t("measure04Item3"),
              ]}
            />

            <Measure
              num="05"
              title={t("measure05Title")}
              items={[
                t("measure05Item1"),
                t("measure05Item2"),
                t("measure05Item3"),
                t("measure05Item4"),
              ]}
            />

            <Measure
              num="06"
              title={t("measure06Title")}
              items={[
                t("measure06Item1"),
                t("measure06Item2"),
                t("measure06Item3"),
              ]}
            />

            <Measure
              num="07"
              title={t("measure07Title")}
              items={[
                t("measure07Item1"),
                t("measure07Item2"),
                t("measure07Item3"),
                t("measure07Item4"),
              ]}
            />

            <Measure
              num="08"
              title={t("measure08Title")}
              items={[
                t("measure08Item1"),
                t("measure08Item2"),
                t("measure08Item3"),
              ]}
            />

            <Divider />

            <Block title={t("limitationsTitle")}>
              <p>
                {t("limitationsIntro")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  t("limitation1"),
                  t("limitation2"),
                  t("limitation3"),
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: "var(--accent)", fontSize: 12 }}
                    >
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t("testingTitle")}>
              <p>
                {t("testingIntro")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {[
                  t("testing1"),
                  t("testing2"),
                  t("testing3"),
                  t("testing4"),
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "baseline",
                    }}
                  >
                    <span
                      className="mono"
                      style={{ color: "var(--accent)", fontSize: 12 }}
                    >
                      ›
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title={t("feedbackTitle")}>
              <p>
                {t("feedbackIntro")}
              </p>
              <div style={{ marginTop: 16 }}>
                <p>
                  <strong style={{ color: "var(--ink)" }}>
                    {t("feedbackCompany")}
                  </strong>
                </p>
                <p>{t("feedbackPerson")}</p>
                <p>{t("feedbackAddress")}</p>
                <p style={{ marginTop: 8 }}>
                  E-Mail:{" "}
                  <a
                    href={`mailto:${t("feedbackEmail")}`}
                    style={{ color: "var(--accent)" }}
                  >
                    {t("feedbackEmail")}
                  </a>
                </p>
              </div>
              <p style={{ marginTop: 16 }}>
                {t("feedbackResponse")}
              </p>
            </Block>

            <Block title={t("enforcementTitle")}>
              <p>
                {t("enforcementP1")}
              </p>
            </Block>

            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-3)",
                letterSpacing: "0.1em",
                paddingTop: 24,
                borderTop: "1px dashed var(--line-2)",
              }}
            >
              {t("footerDate")}
            </div>
          </div>
        </div>
      </section>
    </SubpageShell>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: 24 }}>
      <div
        className="mono"
        style={{
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--accent)",
          marginBottom: 12,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  );
}

function Measure({
  num,
  title,
  items,
}: {
  num: string;
  title: string;
  items: string[];
}) {
  return (
    <div
      style={{
        border: "1px solid var(--line-2)",
        background: "var(--bg-2)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "20px 28px",
          borderBottom: "1px solid var(--line-2)",
        }}
      >
        <span
          className="mono"
          style={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <h3
          className="display"
          style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          {title}
        </h3>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {items.map((item) => (
          <li
            key={item}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "baseline",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink-2)",
            }}
          >
            <span
              className="mono"
              style={{
                color: "var(--accent)",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--line-2)",
        margin: "8px 0",
      }}
    />
  );
}
