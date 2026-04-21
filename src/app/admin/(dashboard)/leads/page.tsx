import { prisma } from "@/lib/prisma";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">Leads</h1>
        <p className="text-secondary text-sm">
          Alle Kontaktanfragen über das Formular. {leads.length} Einträge gesamt.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 text-center">
          <Icon name="mail" className="text-3xl text-secondary mb-3" />
          <p className="text-secondary">Noch keine Leads vorhanden.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-tint/10 flex items-center justify-center shrink-0">
                    <Icon name="person" className="text-lg text-surface-tint" />
                  </div>
                  <div>
                    <div className="font-semibold">{lead.name}</div>
                    {lead.kanzlei && (
                      <div className="text-sm text-secondary">{lead.kanzlei}</div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-secondary whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-3 text-sm">
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-1.5 text-surface-tint hover:underline"
                >
                  <Icon name="mail" className="text-sm" />
                  {lead.email}
                </a>
                {lead.gebiet && (
                  <span className="inline-flex items-center gap-1.5 text-secondary">
                    <Icon name="gavel" className="text-sm" />
                    {lead.gebiet}
                  </span>
                )}
              </div>

              <div className="text-sm text-on-background/80 whitespace-pre-wrap bg-surface-container-highest/30 rounded-lg p-3">
                {lead.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
