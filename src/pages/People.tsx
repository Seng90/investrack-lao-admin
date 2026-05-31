import { Link } from "react-router-dom";
import { AdminShell } from "@/components/admin/AdminShell";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { EntityAvatar } from "@/components/admin/EntityAvatar";
import { RowActions } from "@/components/admin/RowActions";
import { Button } from "@/components/ui/button";
import { people } from "@/data/mockData";
import { Plus, Download, Linkedin } from "lucide-react";

const People = () => (
  <AdminShell
    title="People"
    subtitle="Founders, executives and operators across Lao startups"
    action={
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1.5"><Download className="h-4 w-4" /> Export</Button>
        <Button asChild size="sm" className="gap-1.5"><Link to="/people/new"><Plus className="h-4 w-4" /> Add person</Link></Button>
      </div>
    }
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {people.map((p) => (
        <article key={p.id} className="group rounded-lg border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
          <div className="flex items-start justify-between">
            <EntityAvatar label={p.initials} size="lg" />
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <RowActions base="/people" id={p.id} />
            </div>
          </div>
          <h3 className="mt-3 truncate text-base font-semibold tracking-tight">{p.name}</h3>
          <p className="text-sm text-muted-foreground">{p.role}</p>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">{p.company}</span>
            <span className="text-muted-foreground">{p.location}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <a href="#" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <Linkedin className="h-3.5 w-3.5" /> {p.linkedin}
            </a>
            <StatusBadge status={p.status} />
          </div>
        </article>
      ))}
    </div>
  </AdminShell>
);

export default People;
