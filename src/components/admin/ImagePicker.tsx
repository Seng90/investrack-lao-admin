import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
  onChange: (url: string) => void;
  fallbackLabel?: string;
  shape?: "circle" | "square";
  maxSizeMB?: number;
}

export function ImagePicker({ value, onChange, fallbackLabel = "?", shape = "square", maxSizeMB = 2 }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const onFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("File must be an image (PNG, JPG, SVG, WebP).");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be under ${maxSizeMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  const radius = shape === "circle" ? "rounded-full" : "rounded-2xl";

  return (
    <div className="sm:col-span-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Image</span>
      <div className="mt-1.5 flex flex-wrap items-center gap-4">
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-border bg-secondary text-sm font-semibold text-muted-foreground ${radius}`}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-6 w-6 opacity-60" aria-label={fallbackLabel} />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 min-w-[220px]">
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" className="gap-1.5" onClick={() => fileRef.current?.click()}>
              <Upload className="h-4 w-4" /> {value ? "Replace" : "Upload"}
            </Button>
            {value && (
              <Button type="button" size="sm" variant="ghost" className="gap-1.5 text-destructive" onClick={() => onChange("")}>
                <X className="h-4 w-4" /> Remove
              </Button>
            )}
          </div>
          <input
            type="url"
            placeholder="…or paste image URL"
            value={value.startsWith("data:") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-full rounded-xl border border-input bg-background px-3 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          {error && <span className="text-xs text-destructive">{error}</span>}
          <p className="text-[11px] text-muted-foreground">PNG, JPG, SVG or WebP. Max {maxSizeMB}MB.</p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}
