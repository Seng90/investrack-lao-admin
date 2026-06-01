import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { RowActions } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { investors } from "@/data/mockData";
import { Plus, Download } from "lucide-react";

const typeColors: Record<string, string> = {
  VC: "bg-accent/10 text-accent ring-accent/20",
  Angel: "bg-warning/10 text-warning ring-warning/20",
  Corporate: "bg-primary/10 text-primary ring-primary/20",
  Government: "bg-success/10 text-success ring-success/20",
  Accelerator: "bg-[hsl(280_65%_60%)]/10 text-[hsl(280_65%_55%)] ring-[hsl(280_65%_60%)]/20",
};

const Investors = () => (
  <AdminShell
    title="Investors"
    subtitle="Funds, angels and corporate investors active in Laos"
    action={
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
        <Button asChild size="sm" className="gap-1.5"><Link to="/investors/new"><Plus className="h-4 w-4" /> Add investor</Link></Button>
      </div>
    }
  >
    <div className="rounded-lg border border-border bg-card shadow-card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3 font-medium">Investor</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">HQ</th>
            <th className="px-4 py-3 font-medium">Focus</th>
            <th className="px-4 py-3 text-right font-medium">Investments</th>
            <th className="px-4 py-3 text-right font-medium">AUM</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="w-10 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {investors.map((i) => (
            <tr key={i.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-secondary/40">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <EntityAvatar label={i.name.slice(0, 2)} imageUrl={i.imageUrl} />
                  <p className="font-medium">{i.name}</p>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${typeColors[i.type]}`}>
                  {i.type}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{i.hq}</td>
              <td className="px-4 py-3 text-muted-foreground">{i.focus}</td>
              <td className="px-4 py-3 text-right font-mono tabular-nums">{i.investments}</td>
              <td className="px-4 py-3 text-right font-mono tabular-nums">${(i.aum / 1_000_000).toFixed(0)}M</td>
              <td className="px-4 py-3"><StatusBadge status={i.status} /></td>
              <td className="px-4 py-3 text-right">
                <RowActions base="/investors" id={i.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminShell>
);

export default Investors;
