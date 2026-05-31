import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { people, companies, provinces } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const statuses = ["draft", "pending", "verified", "rejected"];

const PersonForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = people.find((p) => p.id === id);

  const [form, setForm] = useState({
    name: existing?.name ?? "",
    role: existing?.role ?? "",
    company: existing?.company ?? companies[0].name,
    location: existing?.location ?? provinces[0],
    linkedin: existing?.linkedin ?? "",
    email: "",
    status: existing?.status ?? "draft",
    bio: "",
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: editing ? "Person updated" : "Person created",
      description: `${form.name} saved successfully.`,
    });
    navigate("/people");
  };

  return (
    <FormShell
      title={editing ? `Edit ${existing?.name ?? "person"}` : "New person"}
      subtitle={editing ? "Update profile details" : "Add a founder, executive, or operator"}
      backTo="/people"
      backLabel="Back to people"
      onSubmit={onSubmit}
      submitLabel={editing ? "Save changes" : "Create person"}
    >
      <Field label="Full name">
        <input required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Role / title">
        <input value={form.role} onChange={(e) => set("role", e.target.value)} className={inputCls} placeholder="e.g. CEO & Co-founder" />
      </Field>
      <Field label="Company">
        <select value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls}>
          {companies.map((c) => <option key={c.id}>{c.name}</option>)}
        </select>
      </Field>
      <Field label="Location">
        <select value={form.location} onChange={(e) => set("location", e.target.value)} className={inputCls}>
          {provinces.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <Field label="Email">
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="name@example.la" />
      </Field>
      <Field label="LinkedIn handle">
        <input value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inputCls} placeholder="in/handle" />
      </Field>
      <Field label="Bio" full>
        <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={4} className={`${inputCls} h-auto py-2`} />
      </Field>
      <Field label="Status">
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default PersonForm;
