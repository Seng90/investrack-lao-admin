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
        </main>
      </div>
    </div>
  );
}
