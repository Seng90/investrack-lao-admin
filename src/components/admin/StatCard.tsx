import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  delta?: { value: string; positive?: boolean };
  hint?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, delta, hint, icon }: Props) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground/60">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">{value}</p>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded text-xs font-medium",
              delta.positive ? "text-success" : "text-destructive",
            )}
          >
            {delta.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {delta.value}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
