import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search companies, people, investors…"
            className="h-9 w-full rounded-md border border-input bg-secondary/60 pl-9 pr-16 text-sm placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 select-none gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-destructive ring-2 ring-background" />
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="hidden text-xs font-medium sm:inline">Production</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 border-t border-border bg-background px-6 py-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action ?? (
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" /> New record
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
