import { auth } from "@/lib/auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await auth();
  const [postCount, publishedCount, draftCount, userCount, leadCount] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.user.count(),
    prisma.lead.count(),
  ]);

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-headline text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-secondary text-sm">
          Willkommen zurück, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-10">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <div className="text-3xl font-extrabold font-headline text-on-background mb-1">
            {postCount}
          </div>
          <div className="text-sm text-secondary">Beiträge gesamt</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <div className="text-3xl font-extrabold font-headline text-surface-tint mb-1">
            {publishedCount}
          </div>
          <div className="text-sm text-secondary">Veröffentlicht</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <div className="text-3xl font-extrabold font-headline text-on-background mb-1">
            {draftCount}
          </div>
          <div className="text-sm text-secondary">Entwürfe</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <div className="text-3xl font-extrabold font-headline text-on-background mb-1">
            {leadCount}
          </div>
          <div className="text-sm text-secondary">Leads</div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <div className="text-3xl font-extrabold font-headline text-on-background mb-1">
            {userCount}
          </div>
          <div className="text-sm text-secondary">Nutzer</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/posts/new"
          className="bg-surface-tint text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all inline-flex items-center gap-2"
        >
          <Icon name="add" className="text-xl" />
          Neuer Beitrag
        </Link>
        <Link
          href="/admin/posts"
          className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all"
        >
          Alle Beiträge
        </Link>
        <Link
          href="/admin/users"
          className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2"
        >
          <Icon name="group" className="text-xl" />
          Nutzer verwalten
        </Link>
        <Link
          href="/admin/leads"
          className="px-6 py-3 rounded-lg border border-outline-variant/30 font-semibold hover:bg-surface-container-low transition-all inline-flex items-center gap-2"
        >
          <Icon name="mail" className="text-xl" />
          Leads
        </Link>
      </div>
    </div>
  );
}
