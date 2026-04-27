import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { submissions } from "@/data/mockData";
import { Check, X, Eye, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityStyles = {
  high: "bg-destructive/10 text-destructive ring-destructive/20",
  medium: "bg-warning/10 text-warning ring-warning/20",
  low: "bg-muted text-muted-foreground ring-border",
};

const Moderation = () => (
  <AdminShell
    title="Moderation Queue"
    subtitle="Review user submissions and edit suggestions before they go live"
    action={
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Bulk approve</Button>
        <Button size="sm">Auto-rules</Button>
      </div>
    }
  >
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 text-sm">
      <AlertCircle className="h-4 w-4 text-warning" />
      <p><span className="font-medium">12 pending submissions</span> — average review time this week: 4h 12m</p>
    </div>

    <div className="flex gap-1 border-b border-border">
      {["All (12)", "High priority (2)", "Companies (4)", "People (3)", "Investors (2)", "Rounds (3)"].map((tab, i) => (
        <button
          key={tab}
          className={cn(
            "border-b-2 px-3 py-2.5 text-sm font-medium transition-colors -mb-px",
            i === 0 ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab}
        </button>
      ))}
    </div>

    <ul className="mt-4 space-y-3">
      {submissions.map((s) => (
        <li key={s.id} className="rounded-lg border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider">
                  {s.entity}
                </span>
                <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-inset", priorityStyles[s.priority])}>
                  {s.priority} priority
                </span>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                  {s.changes} field{s.changes > 1 ? "s" : ""} changed
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold leading-snug">{s.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Submitted by <span className="font-medium text-foreground">{s.submittedBy}</span> · {s.submittedAt}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 rounded-md border border-border bg-secondary/40 p-3 text-xs sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">Field</p>
                  <p className="font-medium">total_raised</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Change</p>
                  <p className="font-mono">
                    <span className="line-through text-destructive/70">$3.2M</span>
                    {" → "}
                    <span className="font-semibold text-success">$4.5M</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <Button variant="outline" size="sm" className="gap-1.5"><Eye className="h-4 w-4" /> Diff</Button>
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive"><X className="h-4 w-4" /> Reject</Button>
              <Button size="sm" className="gap-1.5 bg-success text-success-foreground hover:bg-success/90"><Check className="h-4 w-4" /> Approve</Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </AdminShell>
);

export default Moderation;
