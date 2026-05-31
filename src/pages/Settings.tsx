import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Button } from "@/components/ui/button";
import { Field, inputCls } from "@/components/admin/FormShell";
import { toast } from "@/hooks/use-toast";
import { Bell, Building2, Globe, KeyRound, Palette, Shield, User } from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "localization", label: "Localization", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "api", label: "API & Tokens", icon: KeyRound },
];

const Card = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <section className="rounded-3xl border border-border bg-card p-6 shadow-card">
    <header className="mb-5">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
    </header>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
  </section>
);

const Toggle = ({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 sm:col-span-2">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
};

const Settings = () => {
  const [active, setActive] = useState("profile");

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
  };

  return (
    <AdminShell title="Settings" subtitle="Manage your workspace, account, and integrations">
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
              <Field label="Full name"><input defaultValue="Anousone K." className={inputCls} /></Field>
              <Field label="Role"><input defaultValue="Data Lead" className={inputCls} /></Field>
              <Field label="Email" full><input type="email" defaultValue="anousone@invest-track.la" className={inputCls} /></Field>
              <Field label="Phone"><input defaultValue="+856 20 5555 0123" className={inputCls} /></Field>
              <Field label="Timezone">
                <select className={inputCls} defaultValue="Asia/Vientiane">
                  <option>Asia/Vientiane</option><option>Asia/Bangkok</option><option>UTC</option>
                </select>
              </Field>
            </Card>
          )}

          {active === "workspace" && (
            <Card title="Workspace" description="Settings for the InvestTrack admin workspace">
              <Field label="Workspace name" full><input defaultValue="InvestTrack — Laos" className={inputCls} /></Field>
              <Field label="Default currency">
                <select className={inputCls} defaultValue="USD"><option>USD</option><option>LAK</option><option>THB</option></select>
              </Field>
              <Field label="Fiscal year start">
                <select className={inputCls} defaultValue="January"><option>January</option><option>April</option><option>July</option><option>October</option></select>
              </Field>
              <Toggle label="Require moderation for public submissions" description="All public-submitted records enter the review queue" defaultOn />
            </Card>
          )}

          {active === "localization" && (
            <Card title="Localization" description="Language and regional preferences">
              <Field label="Interface language">
                <select className={inputCls} defaultValue="English"><option>English</option><option>ລາວ (Lao)</option><option>ไทย</option></select>
              </Field>
              <Field label="Date format">
                <select className={inputCls} defaultValue="YYYY-MM-DD"><option>YYYY-MM-DD</option><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select>
              </Field>
              <Field label="Number format">
                <select className={inputCls} defaultValue="1,234.56"><option>1,234.56</option><option>1.234,56</option><option>1 234,56</option></select>
              </Field>
              <Field label="First day of week">
                <select className={inputCls} defaultValue="Monday"><option>Monday</option><option>Sunday</option></select>
              </Field>
            </Card>
          )}

          {active === "notifications" && (
            <Card title="Notifications" description="Choose how you want to be notified">
              <Toggle label="New submission in moderation queue" defaultOn />
              <Toggle label="Weekly funding digest" description="Sent every Monday at 9:00 AM" defaultOn />
              <Toggle label="High-priority data alerts" />
              <Toggle label="Mention & assignment emails" defaultOn />
            </Card>
          )}

          {active === "appearance" && (
            <Card title="Appearance" description="Theme and density">
              <Field label="Theme">
                <select className={inputCls} defaultValue="System"><option>Light</option><option>Dark</option><option>System</option></select>
              </Field>
              <Field label="Density">
                <select className={inputCls} defaultValue="Comfortable"><option>Compact</option><option>Comfortable</option><option>Spacious</option></select>
              </Field>
              <Toggle label="Show monospace tabular numbers in tables" defaultOn />
            </Card>
          )}

          {active === "security" && (
            <Card title="Security" description="Protect your account">
              <Field label="Current password" full><input type="password" className={inputCls} /></Field>
              <Field label="New password"><input type="password" className={inputCls} /></Field>
              <Field label="Confirm password"><input type="password" className={inputCls} /></Field>
              <Toggle label="Two-factor authentication" description="Require a code from your authenticator app on sign-in" defaultOn />
              <Toggle label="Session timeout after 30 min idle" />
            </Card>
          )}

          {active === "api" && (
            <Card title="API & tokens" description="Manage programmatic access to InvestTrack data">
              <Field label="Public API key" full>
                <input readOnly value="pk_live_la_••••••••••••5a91" className={`${inputCls} font-mono`} />
              </Field>
              <Field label="Webhook endpoint" full>
                <input placeholder="https://your-app.la/webhooks/invest-track" className={inputCls} />
              </Field>
              <Toggle label="Allow read-only public exports" defaultOn />
              <Toggle label="Enable rate limiting (1,000 req/hour)" defaultOn />
            </Card>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm">Discard</Button>
            <Button type="submit" size="sm">Save changes</Button>
          </div>
        </div>
      </form>
    </AdminShell>
  );
};

export default Settings;
