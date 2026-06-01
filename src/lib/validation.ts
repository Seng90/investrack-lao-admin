import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine((v) => v === "" || /^(https?:\/\/|data:image\/)/i.test(v), {
    message: "Must be a valid URL (https://…)",
  })
  .optional()
  .or(z.literal(""));

const currentYear = new Date().getFullYear();

export const companySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  sector: z.string().min(1, "Sector is required"),
  stage: z.string().min(1, "Stage is required"),
  province: z.string().min(1, "Province is required"),
  founded: z.coerce
    .number({ invalid_type_error: "Year must be a number" })
    .int("Year must be a whole number")
    .min(1900, "Year must be after 1900")
    .max(currentYear + 1, `Year cannot be after ${currentYear + 1}`),
  employees: z.string().min(1, "Employees is required"),
  totalRaised: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .min(0, "Cannot be negative"),
  status: z.string().min(1),
  website: optionalUrl,
  description: z.string().max(1000, "Max 1000 characters").optional().or(z.literal("")),
  imageUrl: optionalUrl,
});

export const investorSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  type: z.enum(["VC", "Angel", "Corporate", "Government", "Accelerator"]),
  hq: z.string().trim().min(2, "Headquarters is required"),
  focus: z.string().trim().max(200, "Max 200 characters").optional().or(z.literal("")),
  investments: z.coerce.number().int().min(0, "Cannot be negative"),
  aum: z.coerce.number().min(0, "Cannot be negative"),
  website: optionalUrl,
  status: z.string().min(1),
  imageUrl: optionalUrl,
});

export const personSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  role: z.string().trim().min(2, "Role is required").max(120),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255)
    .optional()
    .or(z.literal("")),
  linkedin: z.string().trim().max(120).optional().or(z.literal("")),
  bio: z.string().max(1000, "Max 1000 characters").optional().or(z.literal("")),
  status: z.string().min(1),
});

export const roundSchema = z
  .object({
    company: z.string().min(1, "Company is required"),
    type: z.string().min(1, "Round type is required"),
    amount: z.coerce.number().positive("Amount must be greater than 0"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
    leadInvestor: z.string().min(1, "Lead investor is required"),
    investors: z.coerce.number().int().min(1, "At least 1 investor"),
    valuation: z.coerce.number().min(0, "Cannot be negative"),
    notes: z.string().max(1000, "Max 1000 characters").optional().or(z.literal("")),
    status: z.string().min(1),
  })
  .refine(
    (v) => v.valuation === 0 || v.valuation >= v.amount,
    { message: "Valuation must be ≥ round amount", path: ["valuation"] },
  );

export type FieldErrors = Record<string, string>;

export function collectErrors(result: { error: z.ZodError }): FieldErrors {
  const errs: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as string;
    if (key && !errs[key]) errs[key] = issue.message;
  }
  return errs;
}
