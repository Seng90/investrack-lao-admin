import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RowActions } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { rounds } from "@/data/mockData";
import { Plus, Download, TrendingUp } from "lucide-react";

const Rounds = () => (
  <AdminShell
    title="Funding Rounds"
    subtitle="Capital raised by Lao startups, by round"
    action={
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
        <Button asChild size="sm" className="gap-1.5"><Link to="/rounds/new"><Plus className="h-4 w-4" /> Log round</Link></Button>
      </div>
    }
  >
    <div className="rounded-lg border border-border bg-card shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3 font-medium">Company</th>
            <th className="px-4 py-3 font-medium">Round</th>
            <th className="px-4 py-3 text-right font-medium">Amount</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Lead investor</th>
            <th className="px-4 py-3 text-right font-medium">Investors</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-10 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {rounds.map((r) => (
            <tr key={r.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-secondary/40">
              <td className="px-4 py-3 font-medium">{r.company}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
                  <TrendingUp className="h-3 w-3" /> {r.type}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums font-semibold">${(r.amount / 1_000_000).toFixed(2)}M</td>
              <td className="px-4 py-3 font-mono tabular-nums text-muted-foreground">{r.date}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.leadInvestor}</td>
              <td className="px-4 py-3 text-right font-mono tabular-nums">{r.investors}</td>
              <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              <td className="px-4 py-3 text-right">
                <RowActions base="/rounds" id={r.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
);

export default Rounds;
