import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { AdminShell } from "./AdminShell";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  entity: string;
  name: string;
  backTo: string;
  backLabel: string;
  description?: string;
}

export function DeleteShell({ entity, name, backTo, backLabel, description }: Props) {
  const navigate = useNavigate();

  const handleDelete = () => {
    toast({ title: `${entity} deleted`, description: `${name} has been removed.` });
    navigate(backTo);
  };

  return (
    <AdminShell
      title={`Delete ${entity}`}
      subtitle="This action cannot be undone"
      action={
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to={backTo}><ChevronLeft className="h-4 w-4" /> {backLabel}</Link>
        </Button>
      }
    >
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Delete “{name}”?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {description ?? `This will permanently remove the ${entity.toLowerCase()} from InvestTrack. Related records may be affected.`}
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button asChild variant="ghost" size="sm"><Link to={backTo}>Cancel</Link></Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>Delete {entity.toLowerCase()}</Button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
