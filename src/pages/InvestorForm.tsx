import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { investors } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { investorSchema, collectErrors, type FieldErrors } from "@/lib/validation";

const types = ["VC", "Angel", "Corporate", "Government", "Accelerator"] as const;
const statuses = ["draft", "pending", "verified", "rejected"];

const InvestorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = investors.find((i) => i.id === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    type: (existing?.type ?? "VC") as (typeof types)[number],
    hq: existing?.hq ?? "",
    focus: existing?.focus ?? "",
    investments: existing?.investments ?? 0,
    aum: existing?.aum ?? 0,
    website: "",
    status: existing?.status ?? "draft",
    imageUrl: existing?.imageUrl ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (k: string, v: any) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = investorSchema.safeParse(form);
    if (!result.success) {
      setErrors(collectErrors(result.error));
      toast({ title: "Please fix the highlighted fields", variant: "destructive" });
      return;
    }
    toast({
      title: editing ? "Investor updated" : "Investor created",
      description: `${form.name} saved successfully.`,
    });
    navigate("/investors");
  };

  return (
    <FormShell
      title={editing ? `Edit ${existing?.name ?? "investor"}` : "New investor"}
      subtitle={editing ? "Update investor profile" : "Add a fund, angel, or corporate investor"}
      backTo="/investors"
      backLabel="Back to investors"
      onSubmit={onSubmit}
      submitLabel={editing ? "Save changes" : "Create investor"}
    >
      <ImagePicker
        value={form.imageUrl}
        onChange={(url) => set("imageUrl", url)}
        fallbackLabel={form.name.slice(0, 2) || "In"}
        shape="circle"
      />
      <Field label="Investor name" full required error={errors.name}>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Type" required error={errors.type}>
        <select value={form.type} onChange={(e) => set("type", e.target.value as any)} className={inputCls}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Headquarters" required error={errors.hq}>
        <input value={form.hq} onChange={(e) => set("hq", e.target.value)} className={inputCls} placeholder="Vientiane, LA" />
      </Field>
      <Field label="Investment focus" full error={errors.focus}>
        <input value={form.focus} onChange={(e) => set("focus", e.target.value)} className={inputCls} placeholder="e.g. Southeast Asia growth" />
      </Field>
      <Field label="Investments to date" error={errors.investments}>
        <input type="number" min={0} value={form.investments} onChange={(e) => set("investments", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="AUM (USD)" error={errors.aum}>
        <input type="number" min={0} value={form.aum} onChange={(e) => set("aum", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Website" full error={errors.website} hint="Include https://">
        <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="https://" />
      </Field>
      <Field label="Status" required error={errors.status}>
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default InvestorForm;
