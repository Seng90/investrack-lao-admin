import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { sectors, provinces } from "@/data/mockData";
import { Plus, Tag, MapPin, Layers } from "lucide-react";

function TaxonomyCard({ icon, title, description, items }: { icon: React.ReactNode; title: string; description: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-card">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-foreground">{icon}</div>
          <div>
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5"><Plus className="h-3.5 w-3.5" /> Add</Button>
      </header>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span key={it} className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium transition-colors hover:border-accent hover:bg-accent/5">
            {it}
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{Math.floor(Math.random() * 40) + 2}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const Taxonomy = () => (
  <AdminShell
    title="Taxonomy"
    subtitle="Reference data powering filters across InvestTrack"
  >
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <TaxonomyCard icon={<Layers className="h-4 w-4" />} title="Sectors" description="Industry verticals" items={sectors} />
      <TaxonomyCard icon={<MapPin className="h-4 w-4" />} title="Provinces" description="Lao administrative regions" items={provinces} />
      <TaxonomyCard icon={<Tag className="h-4 w-4" />} title="Stages" description="Funding maturity" items={["Pre-seed", "Seed", "Series A", "Series B", "Growth", "Bootstrapped"]} />
      <TaxonomyCard icon={<Tag className="h-4 w-4" />} title="Tags" description="Cross-cutting labels" items={["Female-founded", "Diaspora", "Government-backed", "Export-oriented", "Carbon-positive", "Rural", "Cross-border", "B2B", "B2C"]} />
    </div>
  </AdminShell>
);

export default Taxonomy;
