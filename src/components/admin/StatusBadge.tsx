import { cn } from "@/lib/utils";
import type { Status } from "@/data/mockData";

const styles: Record<Status, string> = {
  verified: "bg-success/10 text-success ring-1 ring-inset ring-success/20",
  pending: "bg-warning/10 text-warning ring-1 ring-inset ring-warning/20",
  draft: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
  rejected: "bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/20",
};

const labels: Record<Status, string> = {
  verified: "Verified",
  pending: "Pending",
  draft: "Draft",
  rejected: "Rejected",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
        styles[status],
        className,
      )}
    >
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        status === "verified" && "bg-success",
        status === "pending" && "bg-warning",
        status === "draft" && "bg-muted-foreground",
        status === "rejected" && "bg-destructive",
      )} />
      {labels[status]}
    </span>
  );
}
