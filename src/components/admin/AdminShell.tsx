import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";

interface Props {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminShell({ title, subtitle, action, children }: Props) {
  return (
    <div className="flex min-h-screen w-full bg-surface">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader title={title} subtitle={subtitle} action={action} />
        <main className="relative flex-1 px-6 py-6 animate-fade-in">
          {children}
          {/* Material 3 Floating Action Button */}
          <button
            aria-label="Create"
            className="m3-state fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--tertiary-container))] text-[hsl(var(--tertiary))] shadow-pop transition-transform hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </main>
      </div>
    </div>
  );
}
