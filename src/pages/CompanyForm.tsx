import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { companies, sectors, provinces } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { companySchema, collectErrors, type FieldErrors } from "@/lib/validation";

const stages = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"];
const sizes = ["1-10", "11-50", "51-100", "100-250", "250+"];
const statuses = ["draft", "pending", "verified", "rejected"];

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = companies.find((c) => c.id === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    sector: existing?.sector ?? sectors[0],
    stage: existing?.stage ?? stages[0],
    province: existing?.province ?? provinces[0],
    founded: existing?.founded ?? new Date().getFullYear(),
    employees: existing?.employees ?? sizes[0],
    totalRaised: existing?.totalRaised ?? 0,
    status: existing?.status ?? "draft",
    website: "",
    description: "",
    imageUrl: existing?.imageUrl ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (k: string, v: any) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = companySchema.safeParse(form);
    if (!result.success) {
      setErrors(collectErrors(result));
      toast({ title: "Please fix the highlighted fields", variant: "destructive" });
      return;
    }
    toast({
      title: editing ? "Company updated" : "Company created",
      description: `${form.name} saved successfully.`,
    });
    navigate("/companies");
  };

  return (
    <FormShell
      title={editing ? `Edit ${existing?.name ?? "company"}` : "New company"}
      subtitle={editing ? "Update company profile details" : "Add a new company to the Lao ecosystem"}
      backTo="/companies"
      backLabel="Back to companies"
      onSubmit={onSubmit}
      submitLabel={editing ? "Save changes" : "Create company"}
    >
      <ImagePicker
        value={form.imageUrl}
        onChange={(url) => set("imageUrl", url)}
        fallbackLabel={form.name.slice(0, 2) || "Co"}
        shape="square"
      />
      <Field label="Company name" full required error={errors.name}>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="e.g. LaoPay" />
      </Field>
      <Field label="Sector" required error={errors.sector}>
        <select value={form.sector} onChange={(e) => set("sector", e.target.value)} className={inputCls}>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Stage" required error={errors.stage}>
        <select value={form.stage} onChange={(e) => set("stage", e.target.value)} className={inputCls}>
          {stages.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Province" required error={errors.province}>
        <select value={form.province} onChange={(e) => set("province", e.target.value)} className={inputCls}>
          {provinces.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <Field label="Founded year" required error={errors.founded}>
        <input type="number" value={form.founded} onChange={(e) => set("founded", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Employees" required error={errors.employees}>
        <select value={form.employees} onChange={(e) => set("employees", e.target.value)} className={inputCls}>
          {sizes.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Total raised (USD)" error={errors.totalRaised}>
        <input type="number" min={0} value={form.totalRaised} onChange={(e) => set("totalRaised", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Website" full error={errors.website} hint="Include https://">
        <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="https://" />
      </Field>
      <Field label="Description" full error={errors.description} hint="Max 1000 characters">
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className={`${inputCls} h-auto py-2`} placeholder="Short company description…" />
      </Field>
      <Field label="Status" required error={errors.status}>
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default CompanyForm;
