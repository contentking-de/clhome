"use client";

import { useState } from "react";

const HOURLY_RATE = 250;
const SAVINGS_FACTOR = 0.9;

export default function CalculatorSection() {
  const [casesPerMonth, setCasesPerMonth] = useState(50);
  const [hoursPerCase, setHoursPerCase] = useState(3);

  const totalHours = casesPerMonth * hoursPerCase;
  const savedHours = Math.round(totalHours * SAVINGS_FACTOR);
  const savedRevenue = savedHours * HOURLY_RATE;

  return (
    <section id="calculator" className="py-32 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <span className="text-surface-tint font-bold font-label uppercase tracking-widest block mb-4">
            Der Beweis
          </span>
          <h2 className="font-headline text-[2.5rem] font-extrabold leading-tight mb-4">
            Wie viel Zeit verschwenden Sie?
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Berechnen Sie Ihr Einsparpotenzial. Anwaltliche Sorgfalt ist keine
            Ausrede für analoge Trägheit.
          </p>
          <p className="text-secondary text-lg leading-relaxed mt-4">
            Jede Stunde, die in Routineaufgaben fließt, fehlt bei der
            strategischen Beratung – dem Bereich, in dem Ihre Expertise
            tatsächlich den Unterschied macht und Mandanten bereit sind, dafür
            zu zahlen.
          </p>
          <p className="text-secondary text-lg leading-relaxed mt-4">
            Wer repetitive Prozesse automatisiert, gewinnt nicht nur Zeit,
            sondern steigert Qualität und Konsistenz. Weniger Flüchtigkeitsfehler,
            schnellere Durchlaufzeiten, zufriedenere Mandanten.
          </p>
          <p className="text-secondary text-lg leading-relaxed mt-4">
            Mit dem clever.legal Rechner sehen Sie schnell und einfach, wie
            groß das Potenzial Ihrer Kanzlei sein könnte.
          </p>
          <p className="text-secondary text-lg leading-relaxed mt-4">
            Probieren Sie es aus und schieben Sie die Regler auf Ihre
            individuellen Werte.
          </p>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-8 md:p-12 border border-gray-400">
          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-end mb-3">
                <label htmlFor="cases-per-month" className="font-headline font-bold text-lg">
                  Fälle pro Monat
                </label>
                <span className="text-2xl font-extrabold font-headline text-surface-tint">
                  {casesPerMonth}
                </span>
              </div>
              <input
                id="cases-per-month"
                type="range"
                min={5}
                max={500}
                step={5}
                value={casesPerMonth}
                onChange={(e) => setCasesPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-outline-variant/20 rounded-full appearance-none cursor-pointer accent-surface-tint"
              />
              <div className="flex justify-between text-xs text-secondary mt-1">
                <span>5</span>
                <span>500</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <label htmlFor="hours-per-case" className="font-headline font-bold text-lg">
                  Stunden pro Fall (manuell)
                </label>
                <span className="text-2xl font-extrabold font-headline text-surface-tint">
                  {hoursPerCase}h
                </span>
              </div>
              <input
                id="hours-per-case"
                type="range"
                min={0.5}
                max={10}
                step={0.5}
                value={hoursPerCase}
                onChange={(e) => setHoursPerCase(Number(e.target.value))}
                className="w-full h-2 bg-outline-variant/20 rounded-full appearance-none cursor-pointer accent-surface-tint"
              />
              <div className="flex justify-between text-xs text-secondary mt-1">
                <span>0,5h</span>
                <span>10h</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-outline-variant/15">
            <p className="text-secondary text-center mb-6">
              Mit clever.legal gewinnen Sie zurück:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 text-center border border-outline-variant/10">
                <span className="text-4xl font-extrabold font-headline text-on-background block mb-1">
                  {savedHours}h
                </span>
                <span className="text-sm text-secondary">pro Monat</span>
              </div>
              <div className="bg-on-background rounded-xl p-6 text-center">
                <span className="text-4xl font-extrabold font-headline text-tertiary-fixed-dim block mb-1">
                  {savedRevenue.toLocaleString("de-DE")} €
                </span>
                <span className="text-sm text-secondary-fixed-dim">
                  zusätzliche Marge / Monat
                </span>
              </div>
            </div>
          </div>

          <p className="text-secondary text-xs text-center mt-6 leading-relaxed max-w-xl mx-auto">
            Hinweis: Es handelt sich um eine Beispielberechnung mit uns bekannten
            Durchschnittswerten. Individuelle Fälle können abweichen – sprechen
            Sie uns für eine{" "}
            <a href="/kontakt" className="text-surface-tint underline hover:brightness-110 transition-all">
              kostenlose Erstberatung
            </a>{" "}
            gerne an.
          </p>
        </div>
      </div>
    </section>
  );
}
