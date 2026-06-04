import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { RowActions } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { Plus, Download, Crown, Mail } from "lucide-react";

type Plan = "Free" | "Pro" | "Team" | "Enterprise";
type MemberStatus = "verified" | "pending" | "draft" | "rejected";

interface Member {
  id: string;
  name: string;
  initials: string;
  email: string;
  plan: Plan;
  seats: number;
  mrr: number;
  renewsAt: string;
  status: MemberStatus;
}

const members: Member[] = [
  { id: "m1", name: "Souphanh Keomany", initials: "SK", email: "souphanh@laopay.la", plan: "Enterprise", seats: 25, mrr: 1200, renewsAt: "2026-02-14", status: "verified" },
  { id: "m2", name: "Vilaykham Phommachanh", initials: "VP", email: "vk@jumboride.la", plan: "Team", seats: 8, mrr: 320, renewsAt: "2026-06-09", status: "verified" },
  { id: "m3", name: "Noy Sisavath", initials: "NS", email: "noy@mekongfresh.la", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-06-30", status: "pending" },
  { id: "m4", name: "Khamla Vongdara", initials: "KV", email: "khamla@khaolao.la", plan: "Team", seats: 5, mrr: 200, renewsAt: "2026-07-22", status: "verified" },
  { id: "m5", name: "Mali Inthavong", initials: "MI", email: "mali@sabaidee.health", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-05-18", status: "draft" },
  { id: "m6", name: "Bounmy Sengdara", initials: "BS", email: "bounmy@namkhan.solar", plan: "Free", seats: 1, mrr: 0, renewsAt: "—", status: "verified" },
  { id: "m7", name: "Anong Phimmasone", initials: "AP", email: "anong@pakse.market", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-08-04", status: "verified" },
  { id: "m8", name: "Thavone Xayachack", initials: "TX", email: "thavone@lanxang.ai", plan: "Free", seats: 1, mrr: 0, renewsAt: "—", status: "pending" },
];

const planStyles: Record<Plan, string> = {
  Free: "bg-muted text-muted-foreground ring-border",
  Pro: "bg-accent/10 text-accent ring-accent/20",
  Team: "bg-primary/10 text-primary ring-primary/20",
  Enterprise: "bg-warning/10 text-warning ring-warning/20",
};

const Members = () => {
  const totalMrr = members.reduce((s, m) => s + m.mrr, 0);
  const paid = members.filter((m) => m.plan !== "Free").length;

  return (
    <AdminShell
      title="Members"
      subtitle="Subscribers and seat management for the InvestTrack platform"
      action={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
          <Button asChild size="sm" className="gap-1.5"><Link to="/members/new"><Plus className="h-4 w-4" /> Invite member</Link></Button>
        </div>
      }
    >
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Active members</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{members.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Paid subscribers</p>
          <p className="mt-1 font-display text-2xl tabular-nums">{paid}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-card">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Monthly recurring</p>
          <p className="mt-1 font-display text-2xl tabular-nums">${totalMrr.toLocaleString()}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Plan</th>
              <th className="px-4 py-3 text-right font-medium">Seats</th>
              <th className="px-4 py-3 text-right font-medium">MRR</th>
              <th className="px-4 py-3 font-medium">Renews</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="w-10 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-secondary/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <EntityAvatar label={m.initials} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{m.name}</p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" /> {m.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${planStyles[m.plan]}`}>
                    {m.plan === "Enterprise" && <Crown className="h-3 w-3" />}
                    {m.plan}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{m.seats}</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">{m.mrr ? `$${m.mrr}` : "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.renewsAt}</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-4 py-3 text-right"><RowActions base="/members" id={m.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
};

export default Members;
