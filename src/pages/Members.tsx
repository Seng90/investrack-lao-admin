import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { RowActions } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { Plus, Download, Crown, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { memberStore, type Member, type Plan } from "@/data/members";

const planStyles: Record<Plan, string> = {
  Free: "bg-muted text-muted-foreground ring-border",
  Pro: "bg-accent/10 text-accent ring-accent/20",
  Team: "bg-primary/10 text-primary ring-primary/20",
  Enterprise: "bg-warning/10 text-warning ring-warning/20",
};

const Members = () => {
  const [members, setMembers] = useState<Member[]>(memberStore.get());
  const [pending, setPending] = useState<Member | null>(null);

  useEffect(() => {
    const unsub = memberStore.subscribe(() => setMembers([...memberStore.get()]));
    return () => { unsub; };
  }, []);

  const totalMrr = members.reduce((s, m) => s + m.mrr, 0);
  const paid = members.filter((m) => m.plan !== "Free").length;

  const confirmDelete = () => {
    if (!pending) return;
    const name = pending.name;
    memberStore.remove(pending.id);
    setPending(null);
    toast({ title: "Member deleted", description: `${name} has been removed.` });
  };

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
            {members.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No members yet. Invite your first subscriber.
                </td>
              </tr>
            )}
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
                <td className="px-4 py-3 text-right">
                  <RowActions base="/members" id={m.id} onDelete={() => setPending(m)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete member?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <span className="font-medium text-foreground">{pending?.name}</span> and
              release {pending?.seats ?? 0} seat(s) from the subscription. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
};

export default Members;
