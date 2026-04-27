import { AdminShell } from "@/components/admin/AdminShell";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { Button } from "@/components/ui/button";
import { Building2, Users, Wallet, TrendingUp, Download, ArrowRight } from "lucide-react";
import { companies, fundingByMonth, sectorBreakdown, submissions } from "@/data/mockData";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {
  const recent = [...companies].slice(0, 5);

  return (
    <AdminShell
      title="Welcome back, Anousone"
      subtitle="Here's the state of the InvestTrack data lake — Tuesday, 27 April"
      action={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button size="sm">Generate report</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Companies" value="248" delta={{ value: "+12 this month", positive: true }} hint="32 awaiting review" icon={<Building2 className="h-4 w-4" />} />
        <StatCard label="Founders & people" value="612" delta={{ value: "+38", positive: true }} hint="84 unverified" icon={<Users className="h-4 w-4" />} />
        <StatCard label="Active investors" value="84" delta={{ value: "+4", positive: true }} hint="across 11 countries" icon={<Wallet className="h-4 w-4" />} />
        <StatCard label="Funding tracked (YTD)" value="$48.6M" delta={{ value: "−6.4%", positive: false }} hint="vs. same period 2024" icon={<TrendingUp className="h-4 w-4" />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-card p-5 shadow-card lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Funding deployed in Laos</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Last 6 months · USD millions</p>
            </div>
            <div className="flex gap-1 rounded-md border border-border bg-secondary p-0.5 text-xs">
              <button className="rounded-sm bg-background px-2.5 py-1 font-medium shadow-card">6M</button>
              <button className="rounded-sm px-2.5 py-1 text-muted-foreground hover:text-foreground">1Y</button>
              <button className="rounded-sm px-2.5 py-1 text-muted-foreground hover:text-foreground">All</button>
            </div>
          </div>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fundingByMonth} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                  formatter={(v: number) => [`$${v}M`, "Funding"]}
                />
                <Area type="monotone" dataKey="amount" stroke="hsl(var(--accent))" strokeWidth={2} fill="url(#fundGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h2 className="text-base font-semibold tracking-tight">Sectors</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Share of tracked companies</p>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorBreakdown} layout="vertical" margin={{ left: 0, right: 8 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-card shadow-card lg:col-span-2">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Recently updated companies</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">Last edits across the dataset</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </header>
          <ul className="divide-y divide-border">
            {recent.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40">
                <EntityAvatar label={c.logo} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.sector} · {c.province} · Updated {c.updatedAt}
                  </p>
                </div>
                <span className="hidden font-mono text-xs tabular-nums text-muted-foreground sm:block">
                  ${(c.totalRaised / 1_000_000).toFixed(2)}M
                </span>
                <StatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-border bg-card shadow-card">
          <header className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold tracking-tight">Moderation queue</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">12 items awaiting review</p>
            </div>
          </header>
          <ul className="divide-y divide-border">
            {submissions.slice(0, 4).map((s) => (
              <li key={s.id} className="px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {s.entity}
                  </span>
                  <span className={
                    s.priority === "high" ? "text-[10px] font-semibold uppercase text-destructive"
                      : s.priority === "medium" ? "text-[10px] font-semibold uppercase text-warning"
                      : "text-[10px] font-semibold uppercase text-muted-foreground"
                  }>
                    {s.priority}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-medium leading-snug">{s.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.submittedBy} · {s.submittedAt}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-border px-5 py-3">
            <Button variant="outline" size="sm" className="w-full">Open queue</Button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
};

export default Dashboard;
