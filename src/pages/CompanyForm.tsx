import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { companies, sectors, provinces } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

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
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Field label="Company name" full>
        <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="e.g. LaoPay" />
      </Field>
      <Field label="Sector">
        <select value={form.sector} onChange={(e) => set("sector", e.target.value)} className={inputCls}>
          {sectors.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Stage">
        <select value={form.stage} onChange={(e) => set("stage", e.target.value)} className={inputCls}>
          {stages.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Province">
        <select value={form.province} onChange={(e) => set("province", e.target.value)} className={inputCls}>
          {provinces.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <Field label="Founded year">
        <input type="number" value={form.founded} onChange={(e) => set("founded", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Employees">
        <select value={form.employees} onChange={(e) => set("employees", e.target.value)} className={inputCls}>
          {sizes.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Total raised (USD)">
        <input type="number" value={form.totalRaised} onChange={(e) => set("totalRaised", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Website" full>
        <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="https://" />
      </Field>
      <Field label="Description" full>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className={`${inputCls} h-auto py-2`} placeholder="Short company description…" />
      </Field>
      <Field label="Status">
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default CompanyForm;
