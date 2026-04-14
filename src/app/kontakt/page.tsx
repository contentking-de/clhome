import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import type { Metadata } from "next";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Kontakt | clever.legal",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
              Kontakt
            </h1>
            <p className="text-secondary text-lg mb-12 max-w-2xl">
              Haben Sie Fragen oder möchten Sie mehr über unsere Leistungen
              erfahren? Wir freuen uns auf Ihre Nachricht.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        Vorname *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Max"
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface mb-1.5">
                        Nachname *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Mustermann"
                        className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="max@beispiel.de"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 ..."
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Wie können wir Ihnen helfen?"
                      className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-surface-tint text-white px-8 py-3 rounded-lg font-semibold hover:brightness-110 transition-all"
                  >
                    Nachricht senden
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                  <h2 className="font-headline text-xl font-bold mb-6">
                    Unsere Anschrift
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Icon name="business" className="text-surface-tint text-xl mt-0.5" />
                      <div>
                        <p className="font-medium text-on-background">
                          clever.legal GmbH i. Gr.
                        </p>
                        <p className="text-secondary text-sm">
                          Florianweg 1
                          <br />
                          88677 Markdorf
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Icon name="mail" className="text-surface-tint text-xl mt-0.5" />
                      <div>
                        <a
                          href="mailto:info@clever.legal"
                          className="text-surface-tint hover:underline font-medium"
                        >
                          info@clever.legal
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Icon name="person" className="text-surface-tint text-xl mt-0.5" />
                      <div>
                        <p className="text-secondary text-sm">
                          Geschäftsführer
                        </p>
                        <p className="font-medium text-on-background">
                          RA Marc Ellerbrock
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
                  <h2 className="font-headline text-xl font-bold mb-3">
                    Schnelle Antwort
                  </h2>
                  <p className="text-secondary text-sm leading-relaxed">
                    Wir bemühen uns, alle Anfragen innerhalb von 24 Stunden zu
                    beantworten. Für dringende Anliegen erreichen Sie uns auch
                    per E-Mail.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
