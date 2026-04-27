import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, Check, FileText, Clock } from "lucide-react";

const recent = [
  { name: "companies_q1_2025.csv", rows: 142, status: "completed", when: "2h ago", by: "Anousone K." },
  { name: "investor_directory_v3.csv", rows: 28, status: "completed", when: "Yesterday", by: "Phetsamone S." },
  { name: "rounds_2024_full.csv", rows: 67, status: "partial", when: "2 days ago", by: "Anousone K." },
  { name: "founders_linkedin.csv", rows: 211, status: "completed", when: "1 week ago", by: "Outhai V." },
];

const BulkImport = () => (
  <AdminShell
    title="Bulk Import"
    subtitle="Upload CSV files to ingest companies, people, investors and rounds in batches"
  >
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <section className="lg:col-span-2 space-y-4">
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-10 text-center transition-colors hover:border-accent/50 hover:bg-accent/[0.02]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <Upload className="h-6 w-6 text-accent" />
          </div>
          <h3 className="mt-4 text-base font-semibold tracking-tight">Drop your CSV file here</h3>
          <p className="mt-1 text-sm text-muted-foreground">or click to browse · max 25 MB · UTF-8 encoded</p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <Button size="sm" className="gap-1.5"><Upload className="h-4 w-4" /> Choose file</Button>
            <Button variant="outline" size="sm" className="gap-1.5"><FileText className="h-4 w-4" /> Download template</Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card shadow-card">
          <header className="border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold tracking-tight">Recent imports</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Last 30 days</p>
          </header>
          <ul className="divide-y divide-border">
            {recent.map((r) => (
              <li key={r.name} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-mono tabular-nums">{r.rows}</span> rows · {r.by} · {r.when}
                  </p>
                </div>
                {r.status === "completed" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success ring-1 ring-inset ring-success/20">
                    <Check className="h-3 w-3" /> Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning ring-1 ring-inset ring-warning/20">
                    <Clock className="h-3 w-3" /> Partial
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold tracking-tight">Import target</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Choose what entity this CSV represents</p>
          <div className="mt-4 space-y-2">
            {[
              { label: "Companies", desc: "name, sector, stage, province…" },
              { label: "People", desc: "name, role, company, linkedin…" },
              { label: "Investors", desc: "name, type, hq, focus…" },
              { label: "Funding rounds", desc: "company, type, amount, date…" },
            ].map((opt, i) => (
              <label key={opt.label} className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                <input type="radio" name="target" defaultChecked={i === 0} className="mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold tracking-tight">Options</h3>
          <div className="mt-3 space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span>Skip duplicates</span>
              <input type="checkbox" defaultChecked className="rounded border-input" />
            </label>
            <label className="flex items-center justify-between">
              <span>Send to moderation</span>
              <input type="checkbox" defaultChecked className="rounded border-input" />
            </label>
            <label className="flex items-center justify-between">
              <span>Notify on completion</span>
              <input type="checkbox" className="rounded border-input" />
            </label>
          </div>
        </div>
      </aside>
    </div>
  </AdminShell>
);

export default BulkImport;
