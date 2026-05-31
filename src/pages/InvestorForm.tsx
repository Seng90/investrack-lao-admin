import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { investors } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const types = ["VC", "Angel", "Corporate", "Government", "Accelerator"] as const;
const statuses = ["draft", "pending", "verified", "rejected"];

const InvestorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = investors.find((i) => i.id === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    type: existing?.type ?? "VC",
    hq: existing?.hq ?? "",
    focus: existing?.focus ?? "",
    investments: existing?.investments ?? 0,
    aum: existing?.aum ?? 0,
    website: "",
    status: existing?.status ?? "draft",
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <Field label="Investor name" full>
        <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Type">
        <select value={form.type} onChange={(e) => set("type", e.target.value as any)} className={inputCls}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Headquarters">
        <input value={form.hq} onChange={(e) => set("hq", e.target.value)} className={inputCls} placeholder="Vientiane, LA" />
      </Field>
      <Field label="Investment focus" full>
        <input value={form.focus} onChange={(e) => set("focus", e.target.value)} className={inputCls} placeholder="e.g. Southeast Asia growth" />
      </Field>
      <Field label="Investments to date">
        <input type="number" value={form.investments} onChange={(e) => set("investments", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="AUM (USD)">
        <input type="number" value={form.aum} onChange={(e) => set("aum", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Website" full>
        <input value={form.website} onChange={(e) => set("website", e.target.value)} className={inputCls} placeholder="https://" />
      </Field>
      <Field label="Status">
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default InvestorForm;
