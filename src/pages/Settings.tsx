import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Field, inputCls } from "@/components/admin/FormShell";
import { toast } from "@/hooks/use-toast";
import { Bell, Building2, Globe, KeyRound, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import { useSettings, defaultSettings, type SettingsState } from "@/lib/settingsStore";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API & Tokens", icon: KeyRound },
] as const;

type SectionId = (typeof sections)[number]["id"];

const Card = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
    <header className="mb-5">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </header>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
  </section>
);

const Toggle = ({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-start justify-between gap-4 sm:col-span-2">
    <div>
      <p className="text-sm font-medium">{label}</p>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      aria-pressed={checked}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  </div>
);

const Settings = () => {
  const { settings, update } = useSettings();
  const [active, setActive] = useState<SectionId>("profile");
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdError, setPwdError] = useState("");

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (active === "security" && (pwd.current || pwd.next || pwd.confirm)) {
      if (pwd.next.length < 8) {
        setPwdError("New password must be at least 8 characters.");
        return;
      }
      if (pwd.next !== pwd.confirm) {
        setPwdError("Passwords do not match.");
        return;
      }
      setPwd({ current: "", next: "", confirm: "" });
      setPwdError("");
    }
    toast({ title: "Settings saved", description: "Your preferences have been persisted." });
  };

  const onDiscard = () => {
    const s = sections.find((x) => x.id === active)!;
    update(active as keyof SettingsState, defaultSettings[active as keyof SettingsState] as any);
    toast({ title: `${s.label} reset to defaults` });
  };

  return (
    <AdminShell title="Settings" subtitle="Manage your workspace, account, and integrations. Changes save automatically.">
      <form onSubmit={onSave} className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`m3-state flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                active === id ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          {active === "profile" && (
            <Card title="Profile" description="Your personal admin account">
              <Field label="Full name" required>
                <input value={settings.profile.fullName} onChange={(e) => update("profile", { fullName: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Role">
                <input value={settings.profile.role} onChange={(e) => update("profile", { role: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Email" full required>
                <input type="email" value={settings.profile.email} onChange={(e) => update("profile", { email: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Phone">
                <input value={settings.profile.phone} onChange={(e) => update("profile", { phone: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Timezone">
                <select value={settings.profile.timezone} onChange={(e) => update("profile", { timezone: e.target.value })} className={inputCls}>
                  <option>Asia/Vientiane</option><option>Asia/Bangkok</option><option>UTC</option>
                </select>
              </Field>
            </Card>
          )}

          {active === "workspace" && (
            <Card title="Workspace" description="Settings for the InvestTrack admin workspace">
              <Field label="Workspace name" full required>
                <input value={settings.workspace.name} onChange={(e) => update("workspace", { name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Default currency">
                <select value={settings.workspace.currency} onChange={(e) => update("workspace", { currency: e.target.value as any })} className={inputCls}>
                  <option>USD</option><option>LAK</option><option>THB</option>
                </select>
              </Field>
              <Field label="Fiscal year start">
                <select value={settings.workspace.fiscalStart} onChange={(e) => update("workspace", { fiscalStart: e.target.value })} className={inputCls}>
                  <option>January</option><option>April</option><option>July</option><option>October</option>
                </select>
              </Field>
              <Toggle
                label="Require moderation for public submissions"
                description="All public-submitted records enter the review queue"
                checked={settings.workspace.requireModeration}
                onChange={(v) => update("workspace", { requireModeration: v })}
              />
            </Card>
          )}

          {active === "localization" && (
            <Card title="Localization" description="Language and regional preferences">
              <Field label="Interface language">
                <select value={settings.localization.language} onChange={(e) => update("localization", { language: e.target.value })} className={inputCls}>
                  <option>English</option><option>ລາວ (Lao)</option><option>ไทย</option>
                </select>
              </Field>
              <Field label="Date format">
                <select value={settings.localization.dateFormat} onChange={(e) => update("localization", { dateFormat: e.target.value })} className={inputCls}>
                  <option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option>
                </select>
              </Field>
              <Field label="Number format">
                <select value={settings.localization.numberFormat} onChange={(e) => update("localization", { numberFormat: e.target.value })} className={inputCls}>
                  <option>1,234.56</option><option>1.234,56</option><option>1 234,56</option>
                </select>
              </Field>
              <Field label="First day of week">
                <select value={settings.localization.weekStart} onChange={(e) => update("localization", { weekStart: e.target.value })} className={inputCls}>
                  <option>Monday</option><option>Sunday</option>
                </select>
              </Field>
            </Card>
          )}

          {active === "notifications" && (
            <Card title="Notifications" description="Choose how you want to be notified">
              <Toggle label="New submission in moderation queue" checked={settings.notifications.submission} onChange={(v) => update("notifications", { submission: v })} />
              <Toggle label="Weekly funding digest" description="Sent every Monday at 9:00 AM" checked={settings.notifications.digest} onChange={(v) => update("notifications", { digest: v })} />
              <Toggle label="High-priority data alerts" checked={settings.notifications.highPriority} onChange={(v) => update("notifications", { highPriority: v })} />
              <Toggle label="Mention & assignment emails" checked={settings.notifications.mentions} onChange={(v) => update("notifications", { mentions: v })} />
            </Card>
          )}

          {active === "appearance" && (
            <Card title="Appearance" description="Theme and density — applied immediately">
              <Field label="Theme">
                <select value={settings.appearance.theme} onChange={(e) => update("appearance", { theme: e.target.value as any })} className={inputCls}>
                  <option>Light</option><option>Dark</option><option>System</option>
                </select>
              </Field>
              <Field label="Density">
                <select value={settings.appearance.density} onChange={(e) => update("appearance", { density: e.target.value as any })} className={inputCls}>
                  <option>Compact</option><option>Comfortable</option><option>Spacious</option>
                </select>
              </Field>
              <Toggle label="Show monospace tabular numbers in tables" checked={settings.appearance.tabularNums} onChange={(v) => update("appearance", { tabularNums: v })} />
            </Card>
          )}

          {active === "security" && (
            <Card title="Security" description="Protect your account">
              <Field label="Current password" full>
                <input type="password" value={pwd.current} onChange={(e) => setPwd({ ...pwd, current: e.target.value })} className={inputCls} />
              </Field>
              <Field label="New password" error={pwdError ? " " : undefined} hint="At least 8 characters">
                <input type="password" value={pwd.next} onChange={(e) => setPwd({ ...pwd, next: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Confirm password" error={pwdError}>
                <input type="password" value={pwd.confirm} onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })} className={inputCls} />
              </Field>
              <Toggle label="Two-factor authentication" description="Require a code from your authenticator app on sign-in" checked={settings.security.twoFactor} onChange={(v) => update("security", { twoFactor: v })} />
              <Toggle label="Session timeout after 30 min idle" checked={settings.security.sessionTimeout} onChange={(v) => update("security", { sessionTimeout: v })} />
            </Card>
          )}

          {active === "api" && (
            <Card title="API & tokens" description="Manage programmatic access to InvestTrack data">
              <Field label="Public API key" full>
                <input readOnly value="pk_live_la_••••••••••••5a91" className={`${inputCls} font-mono`} />
              </Field>
              <Field label="Webhook endpoint" full hint="Must start with https://">
                <input
                  placeholder="https://your-app.la/webhooks/invest-track"
                  value={settings.api.webhook}
                  onChange={(e) => update("api", { webhook: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Toggle label="Allow read-only public exports" checked={settings.api.publicExports} onChange={(v) => update("api", { publicExports: v })} />
              <Toggle label="Enable rate limiting (1,000 req/hour)" checked={settings.api.rateLimit} onChange={(v) => update("api", { rateLimit: v })} />
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onDiscard}>Reset section</Button>
            <Button type="submit" size="sm">Save changes</Button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
};

export default Settings;
