const experts = [
  {
    name: "Marc Ellerbrock",
    role: "Massenklage-Stratege & Juristischer Anker",
    quote:
      "Präzision skaliert nicht durch mehr Anwälte, sondern durch bessere Systeme.",
    description:
      "Das juristische Rückgrat von clever.legal. Während andere Massenverfahren als organisatorisches Risiko sehen, sieht er sie als algorithmische Herausforderung.",
    strengths: [
      "Deep Legal Tech",
      "Proof of Concept",
      "Risiko-Eliminator",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA33mGjaIkxji2yGtCg4e0sRV1-YH38vuecy6usLHeLgPA7sijKwRgQZpFTx3fdM6DYsqgGR3nFVdeTCA--DR12YQe9rv57y5eElB1mVEbkWbyEH_exP9nG3Wif90Wg1WgUlAJ0SQ-p9TuuWxc1qMWH1OYzH8kr61OfzxWUR9p0dqGMXzlbbFYk1UxCJsgWbdWgkzqst-xAruKsT6KgUSrPE99wCyjxWGWetG5DN6EvvRhMymlECDeEFVD-JiPXpat_NcIgGYVSriN_",
    offset: false,
  },
  {
    name: "Nico Sacotte",
    role: "Content-Stratege & Digitaler Provokateur",
    quote:
      "Recht ist staubig? Nur, wenn man es analog lässt.",
    description:
      "Mit über 20 Jahren Erfahrung im Digital Marketing der Architekt für digitale Autorität. Er baut keine Werbekampagnen, sondern Content-Maschinen.",
    strengths: [
      "The Authority Engine",
      "SEO-DNA",
      "Brückenbauer",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCG8HAkl4mVCRxwnA14OqiRSiEB9qh-cZke-SJcQ-hO-ljcdTpT2JUcWNtY2XgSthZ0Wuaubdw5bHhqLM-H3-vLVloFno9PpANGNH7ADEovVSCKnTjlaSi8FnRt00D5zyjrwssNGYphK4qciHLR3xyn1i3pLrduHwbpkDy7a9fRQegmb8tjkRnYvV704A6FTGmOJtcgRAx_sDMpdG_qh84VZHg1yf8YoeIS0LMXqDU1f62u14vGvY_h8O9yEx5v4peF-uEv4OEnOVOl",
    offset: true,
  },
  {
    name: "Thorsten Loth",
    role: "Performance Marketing & Lead-Architekt",
    quote:
      "Sichtbarkeit ist kein Zufall, sondern Mathematik.",
    description:
      "Der Motor hinter den Performance-Satelliten. Radikale Datentransparenz und Funnel, die Mandanten genau dort abholen, wo der Schmerz am größten ist.",
    strengths: [
      "Growth on Autopilot",
      "Datengesteuerte Strategie",
      "Psychologische Conversion",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAgHKB-55Fz7zYkOErflPOUwJa7qlrfGKrtbIT6Lsbm4R9ZaXpXXotZaWCvfu1lRWmCDFBUk-Wg6SxWBpIfEs0Hm6VYpCF_TAAb1l831oaW3vj6twygIQUodH6vOTpSraByU6g9CsCvX7OsjZQYSbC5LFYdBBhvkTT5DPtGqDROeChRnsFdXC0UebCWmhTrzm2E9Y61BwH4wnVGj5wqLbE1PGCOoY8KqjtzQuF-hAUNGSoD8tqjTl7VcRlvKKzPWkBnab_w1dbyjUyN",
    offset: false,
  },
  {
    name: "Christoph Ehrke",
    role: "IT-Architekt & Engine-Mastermind",
    quote:
      "Code ist das Gesetz der digitalen Welt.",
    description:
      "Entwickelt die IT-Architekturen, die Skalierung erst ermöglichen. Als Fullstack-Experte beherrscht er den gesamten Prozess – vom UI bis zum Backend.",
    strengths: [
      "High-Performance Infrastructure",
      "Seamless Integration",
      "Innovation by Design",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_-orcL89LRTts-e0z1bDj9AoGXdEzIPBJQWkcnohfIGkheA3PiexRpHJ2VGFazNqJMx-GSxFQ65VXFlnBv-t1hjEwXFWN_6v1BZkzGf2nBmulBxNa3txvvu6Xw4ohAVnEb7XDsGLfJjiPTPVQt8sYsA4CGsSl68TKibs4mQ2xi3Bp4ijGSSNW_m68GS_i3Il87_yt7wwV5tA1aAXIPIVR-LOR_tQia8X4w_u6obSEd3OlA_Ou4363x70kQfsf5FJ87umdivAHZWbs",
    offset: true,
  },
];

export default function ExpertsSection() {
  return (
    <section className="py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
              Die Spezialeinheit
            </span>
            <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight">
              Vier Köpfe. Ein Ziel: <br />
              Die Kanzlei der Zukunft bauen.
            </h2>
          </div>
          <div className="flex items-center gap-4 text-secondary">
            <span className="font-bold text-on-background">4</span> Experten
            <span className="w-12 h-px bg-outline-variant" />
            Interdisziplinär
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experts.map((expert) => (
            <div
              key={expert.name}
              className={`group cursor-pointer ${expert.offset ? "lg:mt-12" : ""}`}
            >
              <div className="aspect-[3/4] mb-6 overflow-hidden bg-surface-container-highest relative">
                <img
                  alt={`Portrait von ${expert.name}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  src={expert.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white/90 text-sm italic leading-relaxed">
                    &bdquo;{expert.quote}&ldquo;
                  </p>
                </div>
              </div>
              <h4 className="font-headline text-xl font-bold mb-1">
                {expert.name}
              </h4>
              <p className="text-surface-tint font-label text-xs uppercase tracking-wider mb-3">
                {expert.role}
              </p>
              <p className="text-secondary text-sm leading-relaxed mb-3">
                {expert.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {expert.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="text-[0.65rem] font-label uppercase tracking-wider text-surface-tint border border-outline-variant rounded-full px-2.5 py-1"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
