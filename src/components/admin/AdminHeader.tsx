import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Plus, ChevronDown, Menu, Sun, Moon, Building2, Wallet, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/lib/settingsStore";
import { companies, investors, rounds } from "@/data/mockData";
import { memberStore } from "@/data/members";

interface SearchHit {
  id: string;
  label: string;
  sub: string;
  route: string;
  group: "Companies" | "Investors" | "Members" | "Rounds";
  icon: React.ComponentType<{ className?: string }>;
}

function useSearchHits(query: string): SearchHit[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    const hits: SearchHit[] = [];
    for (const c of companies) {
      if (c.name.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q))
        hits.push({ id: c.id, label: c.name, sub: `${c.sector} · ${c.province}`, route: `/companies/${c.id}/edit`, group: "Companies", icon: Building2 });
    }
    for (const i of investors) {
      if (i.name.toLowerCase().includes(q) || i.hq.toLowerCase().includes(q))
        hits.push({ id: i.id, label: i.name, sub: `${i.type} · ${i.hq}`, route: `/investors/${i.id}/edit`, group: "Investors", icon: Wallet });
    }
    for (const m of memberStore.get()) {
      if (m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.plan.toLowerCase().includes(q))
        hits.push({ id: m.id, label: m.name, sub: `${m.plan} · ${m.email}`, route: `/members/${m.id}/edit`, group: "Members", icon: Users });
    }
    for (const r of rounds) {
      if (r.company.toLowerCase().includes(q) || r.type.toLowerCase().includes(q) || r.leadInvestor.toLowerCase().includes(q))
        hits.push({ id: r.id, label: `${r.type} — ${r.company}`, sub: `Lead: ${r.leadInvestor}`, route: `/rounds/${r.id}/edit`, group: "Rounds", icon: TrendingUp });
    }
    return hits.slice(0, 12);
  }, [query]);
}

export function AdminHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  const { settings, update } = useSettings();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hits = useSearchHits(query);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const isDark =
    settings.appearance.theme === "Dark" ||
    (settings.appearance.theme === "System" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const toggleTheme = () => update("appearance", { theme: isDark ? "Light" : "Dark" });

  const go = (route: string) => {
    setOpen(false);
    setQuery("");
    navigate(route);
  };

  const grouped = useMemo(() => {
    const m = new Map<string, SearchHit[]>();
    for (const h of hits) {
      if (!m.has(h.group)) m.set(h.group, []);
      m.get(h.group)!.push(h);
    }
    return Array.from(m.entries());
  }, [hits]);

  return (
    <header className="sticky top-0 z-20 bg-surface/85 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-6">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div ref={wrapRef} className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && hits[0]) { e.preventDefault(); go(hits[0].route); }
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search companies, investors, members, rounds…"
            className="h-12 w-full rounded-full border border-transparent bg-[hsl(var(--surface-variant))] pl-11 pr-16 text-sm placeholder:text-muted-foreground focus:border-ring focus:bg-card focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 select-none gap-1 rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </kbd>

          {open && query.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-96 overflow-y-auto rounded-2xl border border-border bg-popover p-2 shadow-elevated">
              {grouped.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">No results for “{query}”</p>
              ) : (
                grouped.map(([group, items]) => (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{group}</p>
                    {items.map((h) => {
                      const Icon = h.icon;
                      return (
                        <button
                          key={`${h.group}-${h.id}`}
                          type="button"
                          onClick={() => go(h.route)}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-secondary"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{h.label}</span>
                            <span className="block truncate text-xs text-muted-foreground">{h.sub}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          )}
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
