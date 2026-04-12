import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-10">
          <h1 className="text-2xl font-bold font-headline text-on-background tracking-tight">
            clever<span className="text-surface-tint">.</span>legal
          </h1>
        </div>
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
          <span className="material-symbols-outlined text-5xl text-surface-tint mb-4 block">
            mark_email_read
          </span>
          <h2 className="font-headline text-xl font-bold mb-2">
            Prüfen Sie Ihr Postfach
          </h2>
          <p className="text-secondary text-sm mb-6">
            Wir haben Ihnen einen Magic Link per E-Mail gesendet. Klicken Sie
            auf den Link, um sich einzuloggen.
          </p>
          <Link
            href="/admin/login"
            className="text-surface-tint font-medium text-sm hover:underline"
          >
            Zurück zur Anmeldung
          </Link>
        </div>
      </div>
    </div>
  );
}
