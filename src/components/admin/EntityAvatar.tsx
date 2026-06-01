import { cn } from "@/lib/utils";

const palette = [
  "bg-[hsl(217_91%_60%)]",
  "bg-[hsl(152_60%_42%)]",
  "bg-[hsl(38_92%_50%)]",
  "bg-[hsl(280_65%_60%)]",
  "bg-[hsl(0_72%_60%)]",
  "bg-[hsl(190_80%_42%)]",
  "bg-[hsl(340_75%_55%)]",
];

export function EntityAvatar({
  label,
  size = "md",
  className,
  imageUrl,
}: {
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  imageUrl?: string;
}) {
  const idx = (label.charCodeAt(0) || 0) % palette.length;
  const dims = size === "sm" ? "h-7 w-7 text-[11px]" : size === "lg" ? "h-12 w-12 text-base" : "h-9 w-9 text-xs";
  if (imageUrl) {
    return (
      <div className={cn("shrink-0 overflow-hidden rounded-full bg-secondary shadow-card", dims, className)}>
        <img src={imageUrl} alt={label} className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white shadow-card",
        palette[idx],
        dims,
        className,
      )}
    >
      {label.slice(0, 2).toUpperCase()}
    </div>
  );
}
