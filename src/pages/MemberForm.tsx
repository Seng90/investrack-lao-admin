import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { FormShell, Field, inputCls } from "@/components/admin/FormShell";
import { toast } from "@/hooks/use-toast";
import { collectErrors, type FieldErrors } from "@/lib/validation";

const plans = ["Free", "Pro", "Team", "Enterprise"] as const;
const statuses = ["draft", "pending", "verified", "rejected"];

const memberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Invalid email address").max(255),
  plan: z.enum(plans),
  seats: z.coerce.number().int().min(1, "At least 1 seat"),
  mrr: z.coerce.number().min(0, "Cannot be negative"),
  renewsAt: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Date must be YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  status: z.string().min(1),
});

const MemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    plan: "Pro" as (typeof plans)[number],
    seats: 1,
    mrr: 49,
    renewsAt: "",
    status: "pending",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (k: string, v: any) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = memberSchema.safeParse(form);
    if (!result.success) {
      setErrors(collectErrors(result.error));
      toast({ title: "Please fix the highlighted fields", variant: "destructive" });
      return;
    }
    toast({
      title: editing ? "Member updated" : "Member invited",
      description: `${form.name} saved successfully.`,
    });
    navigate("/members");
  };

  return (
    <FormShell
      title={editing ? "Edit member" : "Invite member"}
      subtitle={editing ? "Update subscriber details" : "Add a new subscriber to the platform"}
      backTo="/members"
      backLabel="Back to members"
      onSubmit={onSubmit}
      submitLabel={editing ? "Save changes" : "Send invite"}
    >
      <Field label="Full name" full required error={errors.name}>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} placeholder="e.g. Souphanh Keomany" />
      </Field>
      <Field label="Email" full required error={errors.email}>
        <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} placeholder="name@company.la" />
      </Field>
      <Field label="Plan" required error={errors.plan}>
        <select value={form.plan} onChange={(e) => set("plan", e.target.value)} className={inputCls}>
          {plans.map((p) => <option key={p}>{p}</option>)}
        </select>
      </Field>
      <Field label="Seats" required error={errors.seats}>
        <input type="number" min={1} value={form.seats} onChange={(e) => set("seats", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="MRR (USD)" error={errors.mrr}>
        <input type="number" min={0} value={form.mrr} onChange={(e) => set("mrr", +e.target.value)} className={inputCls} />
      </Field>
      <Field label="Renews at" error={errors.renewsAt} hint="YYYY-MM-DD (optional)">
        <input type="date" value={form.renewsAt} onChange={(e) => set("renewsAt", e.target.value)} className={inputCls} />
      </Field>
      <Field label="Status" required error={errors.status}>
        <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputCls}>
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </Field>
    </FormShell>
  );
};

export default MemberForm;
