import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Building2,
  Users,
  Wallet,
  TrendingUp,
  Tags,
  ShieldCheck,
  Upload,
  Settings,
  LifeBuoy,
} from "lucide-react";

const primary = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/companies", label: "Companies", icon: Building2, count: 248 },
  { to: "/people", label: "People", icon: Users, count: 612 },
  { to: "/investors", label: "Investors", icon: Wallet, count: 84 },
  { to: "/rounds", label: "Funding Rounds", icon: TrendingUp, count: 156 },
  { to: "/taxonomy", label: "Taxonomy", icon: Tags },
];

const ops = [
  { to: "/moderation", label: "Moderation", icon: ShieldCheck, badge: "12" },
  { to: "/import", label: "Bulk Import", icon: Upload },
];

const footer = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help & Docs", icon: LifeBuoy },
];

const linkBase =
  "group m3-state flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors";
const linkActive =
  "bg-sidebar-accent text-sidebar-accent-foreground";

function Section({ label, items }: { label: string; items: typeof primary }) {
  return (
    <div className="mb-4">
      {label && (
        <p className="mb-1 px-4 pt-2 text-[11px] font-medium uppercase tracking-[0.1em] text-sidebar-foreground/60">
          {label}
        </p>
      )}
      <nav className="space-y-1 px-3">
        {items.map(({ to, label, icon: Icon, end, count, badge }: any) => (
          <NavLink key={to} to={to} end={end} className={linkBase} activeClassName={linkActive}>
            <Icon className="h-5 w-5 shrink-0" />
            <span className="flex-1 truncate">{label}</span>
            {count !== undefined && (
              <span className="font-mono text-[11px] tabular-nums text-sidebar-foreground/60">
                {count}
              </span>
            )}
            {badge && (
              <span className="rounded-full bg-[hsl(var(--tertiary))] px-2 py-0.5 font-mono text-[10px] font-semibold text-white">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-3 px-6 pt-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
          <TrendingUp className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-base font-medium text-foreground">InvestTrack</p>
          <p className="text-[11px] uppercase tracking-wider text-sidebar-foreground/60">Admin · Laos</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <Section label="Data" items={primary} />
        <Section label="Operations" items={ops as any} />
      </div>

      <div className="border-t border-sidebar-border p-3">
        <Section label="" items={footer as any} />
        <div className="mx-2 mt-2 flex items-center gap-3 rounded-2xl bg-[hsl(var(--primary-container))] px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            AK
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-[hsl(var(--on-primary-container))]">Anousone K.</p>
            <p className="truncate text-[11px] text-[hsl(var(--on-primary-container))]/70">Data Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
