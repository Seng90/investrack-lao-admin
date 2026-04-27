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
  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
const linkActive =
  "bg-sidebar-accent text-sidebar-accent-foreground shadow-card";

function Section({ label, items }: { label: string; items: typeof primary }) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/40">
        {label}
      </p>
      <nav className="space-y-0.5">
        {items.map(({ to, label, icon: Icon, end, count, badge }: any) => (
          <NavLink key={to} to={to} end={end} className={linkBase} activeClassName={linkActive}>
            <Icon className="h-4 w-4 shrink-0 opacity-80 group-hover:opacity-100" />
            <span className="flex-1 truncate">{label}</span>
            {count !== undefined && (
              <span className="font-mono text-[10px] tabular-nums text-sidebar-foreground/40">
                {count}
              </span>
            )}
            {badge && (
              <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent-foreground">
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
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
          <TrendingUp className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">InvestTrack</p>
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">Admin · Laos</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <Section label="Data" items={primary} />
        <Section label="Operations" items={ops as any} />
      </div>

      <div className="border-t border-sidebar-border p-3">
        <Section label="" items={footer as any} />
        <div className="mt-2 flex items-center gap-3 rounded-md bg-sidebar-accent/40 px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            AK
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-medium text-white">Anousone K.</p>
            <p className="truncate text-[11px] text-sidebar-foreground/50">Data Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
