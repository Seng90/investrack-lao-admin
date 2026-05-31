import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { rounds, companies, investors } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const types = ["Pre-seed", "Seed", "Series A", "Series B", "Series C", "Debt", "Grant"];
const statuses = ["draft", "pending", "verified", "rejected"];

const RoundForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = rounds.find((r) => r.id === id);

  const [form, setForm] = useState({
    company: existing?.company ?? companies[0].name,
    type: existing?.type ?? "Seed",
    amount: existing?.amount ?? 0,
    date: existing?.date ?? new Date().toISOString().slice(0, 10),
    leadInvestor: existing?.leadInvestor ?? investors[0].name,
    investors: existing?.investors ?? 1,
    valuation: 0,
    notes: "",
    status: existing?.status ?? "draft",
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: editing ? "Round updated" : "Round logged",
      description: `${form.type} round for ${form.company} saved.`,
    });
    navigate("/rounds");
  };

  return (
    <FormShell
      title={editing ? `Edit round` : "Log funding round"}
      subtitle={editing ? "Update round details" : "Record a new capital raise"}
      backTo="/rounds"
      backLabel="Back to rounds"
      onSubmit={onSubmit}
      submitLabel={editing ? "Save changes" : "Log round"}
    >
      <Field label="Company">
        <select value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls}>
          {companies.map((c) => <option key={c.id}>{c.name}</option>)}
        </select>
      </Field>
      <Field label="Round type">
        <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Amount (USD)">
        <input type="number" value={form.amount} onChange={(e) => set("amount", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Round date">
        <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Lead investor">
        <select value={form.leadInvestor} onChange={(e) => set("leadInvestor", e.target.value)} className={inputCls}>
          {investors.map((i) => <option key={i.id}>{i.name}</option>)}
        </select>
      </Field>
      <Field label="Number of investors">
        <input type="number" min={1} value={form.investors} onChange={(e) => set("investors", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Post-money valuation (USD)">
        <input type="number" value={form.valuation} onChange={(e) => set("valuation", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Status">
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Notes" full>
        <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={4} className={`${inputCls} h-auto py-2`} />
      </Field>
    </FormShell>
  );
};

export default RoundForm;
