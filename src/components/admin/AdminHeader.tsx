import { Search, Bell, Plus, ChevronDown, Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/settingsStore";

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const { settings, update } = useSettings();
  const isDark =
    settings.appearance.theme === "Dark" ||
    (settings.appearance.theme === "System" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const toggleTheme = () => update("appearance", { theme: isDark ? "Light" : "Dark" });
  return (
    <header className="sticky top-0 z-20 bg-surface/85 backdrop-blur-xl">
      {/* Material 3 top app bar */}
      <div className="flex h-16 items-center gap-3 px-6">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search companies, investors, members…"
            className="h-12 w-full rounded-full border border-transparent bg-[hsl(var(--surface-variant))] pl-11 pr-16 text-sm placeholder:text-muted-foreground focus:border-ring focus:bg-card focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none gap-1 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[hsl(var(--tertiary))] ring-2 ring-surface" />
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 normal-case tracking-normal">
            <span className="hidden text-xs font-medium sm:inline">Production</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-5 pt-2">
        <div>
          <h1 className="font-display text-3xl font-normal tracking-tight text-foreground">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action ?? (
            <Button size="default" className="gap-1.5 normal-case tracking-normal shadow-elevated">
              <Plus className="h-4 w-4" /> New record
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
