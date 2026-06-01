import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { AdminShell } from "./AdminShell";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subtitle?: string;
  backTo: string;
  backLabel: string;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  children: React.ReactNode;
}

export function FormShell({ title, subtitle, backTo, backLabel, onSubmit, submitLabel, children }: Props) {
  return (
    <AdminShell
      title={title}
      subtitle={subtitle}
      action={
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link to={backTo}><ChevronLeft className="h-4 w-4" /> {backLabel}</Link>
        </Button>
      }
    >
      <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
        </div>
        <div className="flex justify-end gap-2">
          <Button asChild variant="ghost" size="sm"><Link to={backTo}>Cancel</Link></Button>
          <Button type="submit" size="sm">{submitLabel}</Button>
        </div>
      </form>
    </AdminShell>
  );
}

export function Field({
  label,
  children,
  full,
  error,
  required,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  error?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-destructive">*</span>}
      </span>
      <div className={error ? "[&_input]:border-destructive [&_select]:border-destructive [&_textarea]:border-destructive" : ""}>
        {children}
      </div>
      {error ? (
        <span className="text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="text-[11px] text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

export const inputCls =
  "h-10 w-full rounded-xl border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";
