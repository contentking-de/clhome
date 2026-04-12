"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn("resend", { email, callbackUrl: "/admin" });
    } catch {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold font-headline text-on-background tracking-tight">
            clever<span className="text-surface-tint">.</span>legal
          </h1>
          <p className="text-secondary mt-2">Admin-Bereich</p>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
          <h2 className="font-headline text-xl font-bold mb-2">Anmelden</h2>
          <p className="text-secondary text-sm mb-6">
            Geben Sie Ihre E-Mail-Adresse ein. Sie erhalten einen Magic Link
            zum Einloggen.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-on-surface mb-1.5"
              >
                E-Mail-Adresse
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@clever.legal"
                required
                className="w-full px-4 py-3 rounded-lg border border-outline-variant/30 bg-surface focus:outline-none focus:ring-2 focus:ring-surface-tint/50 text-on-background placeholder:text-outline"
              />
            </div>
            {error && (
              <p className="text-error text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-surface-tint text-white py-3 rounded-lg font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Wird gesendet..." : "Magic Link senden"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
