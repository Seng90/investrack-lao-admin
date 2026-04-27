import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { Button } from "@/components/ui/button";
import { companies, sectors } from "@/data/mockData";
import { Filter, Download, Plus, Search, ArrowUpDown, MoreHorizontal } from "lucide-react";

const Companies = () => {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<string>("all");

  const filtered = companies.filter((c) => {
    const m = c.name.toLowerCase().includes(query.toLowerCase());
    const s = sector === "all" || c.sector === sector;
    return m && s;
  });

  return (
    <AdminShell
      title="Companies"
      subtitle="248 companies tracked across the Lao startup ecosystem"
      action={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export CSV</Button>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> New company</Button>
        </div>
      }
    >
      <div className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter companies…"
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          >
            <option value="all">All sectors</option>
            {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button variant="outline" size="sm" className="gap-1.5"><Filter className="h-4 w-4" /> More filters</Button>
          <div className="ml-auto text-xs text-muted-foreground">
            <span className="font-mono tabular-nums text-foreground">{filtered.length}</span> of {companies.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="w-10 px-4 py-3"><input type="checkbox" className="rounded border-input" /></th>
                <th className="px-4 py-3 font-medium">
                  <button className="inline-flex items-center gap-1 hover:text-foreground">Company <ArrowUpDown className="h-3 w-3" /></button>
                </th>
                <th className="px-4 py-3 font-medium">Sector</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Province</th>
                <th className="px-4 py-3 text-right font-medium">Total raised</th>
                <th className="px-4 py-3 font-medium">Founded</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="w-10 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-b-0 transition-colors hover:bg-secondary/40">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded border-input" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <EntityAvatar label={c.logo} />
                      <div>
                        <p className="font-medium leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.employees} employees</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.sector}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium">{c.stage}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.province}</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">${(c.totalRaised / 1_000_000).toFixed(2)}M</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-muted-foreground">{c.founded}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Showing 1–{filtered.length} of {companies.length}</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 px-2.5" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="h-7 px-2.5">Next</Button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
};

export default Companies;
