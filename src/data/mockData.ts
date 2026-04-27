export type Status = "verified" | "pending" | "draft" | "rejected";

export interface Company {
  id: string;
  name: string;
  logo: string;
  sector: string;
  stage: string;
  province: string;
  founded: number;
  employees: string;
  totalRaised: number; // USD
  status: Status;
  updatedAt: string;
}

export interface Person {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  location: string;
  linkedin: string;
  status: Status;
}

export interface Investor {
  id: string;
  name: string;
  type: "VC" | "Angel" | "Corporate" | "Government" | "Accelerator";
  hq: string;
  investments: number;
  aum: number; // USD
  focus: string;
  status: Status;
}

export interface Round {
  id: string;
  company: string;
  type: string;
  amount: number; // USD
  date: string;
  leadInvestor: string;
  investors: number;
  status: Status;
}

export interface Submission {
  id: string;
  entity: "Company" | "Person" | "Investor" | "Round";
  title: string;
  submittedBy: string;
  submittedAt: string;
  changes: number;
  priority: "high" | "medium" | "low";
}

export const companies: Company[] = [
  { id: "c1", name: "LaoPay", logo: "LP", sector: "FinTech", stage: "Series A", province: "Vientiane Capital", founded: 2019, employees: "51-100", totalRaised: 4_200_000, status: "verified", updatedAt: "2025-04-22" },
  { id: "c2", name: "MekongFresh", logo: "MF", sector: "AgriTech", stage: "Seed", province: "Champasak", founded: 2021, employees: "11-50", totalRaised: 850_000, status: "verified", updatedAt: "2025-04-19" },
  { id: "c3", name: "JumboRide", logo: "JR", sector: "Mobility", stage: "Series A", province: "Vientiane Capital", founded: 2018, employees: "51-100", totalRaised: 6_500_000, status: "pending", updatedAt: "2025-04-25" },
  { id: "c4", name: "Sabaidee Health", logo: "SH", sector: "HealthTech", stage: "Pre-seed", province: "Luang Prabang", founded: 2023, employees: "1-10", totalRaised: 220_000, status: "draft", updatedAt: "2025-04-26" },
  { id: "c5", name: "NamKhan Solar", logo: "NK", sector: "CleanTech", stage: "Seed", province: "Luang Prabang", founded: 2020, employees: "11-50", totalRaised: 1_400_000, status: "verified", updatedAt: "2025-04-10" },
  { id: "c6", name: "Phou Coffee Co.", logo: "PC", sector: "Consumer", stage: "Seed", province: "Xiangkhouang", founded: 2017, employees: "11-50", totalRaised: 600_000, status: "verified", updatedAt: "2025-03-30" },
  { id: "c7", name: "EduLao", logo: "EL", sector: "EdTech", stage: "Pre-seed", province: "Vientiane Capital", founded: 2022, employees: "1-10", totalRaised: 180_000, status: "pending", updatedAt: "2025-04-24" },
  { id: "c8", name: "Khaolao Logistics", logo: "KL", sector: "Logistics", stage: "Series A", province: "Savannakhet", founded: 2016, employees: "100-250", totalRaised: 8_300_000, status: "verified", updatedAt: "2025-04-12" },
  { id: "c9", name: "Pakse Marketplace", logo: "PM", sector: "E-commerce", stage: "Seed", province: "Champasak", founded: 2020, employees: "11-50", totalRaised: 1_100_000, status: "verified", updatedAt: "2025-04-08" },
  { id: "c10", name: "Lan Xang AI", logo: "LX", sector: "AI / ML", stage: "Pre-seed", province: "Vientiane Capital", founded: 2024, employees: "1-10", totalRaised: 95_000, status: "draft", updatedAt: "2025-04-26" },
];

export const people: Person[] = [
  { id: "p1", name: "Souphanh Keomany", initials: "SK", role: "CEO & Co-founder", company: "LaoPay", location: "Vientiane", linkedin: "in/souphanh", status: "verified" },
  { id: "p2", name: "Vilaykham Phommachanh", initials: "VP", role: "CTO", company: "JumboRide", location: "Vientiane", linkedin: "in/vilaykham", status: "verified" },
  { id: "p3", name: "Noy Sisavath", initials: "NS", role: "Founder", company: "MekongFresh", location: "Pakse", linkedin: "in/noy", status: "pending" },
  { id: "p4", name: "Khamla Vongdara", initials: "KV", role: "COO", company: "Khaolao Logistics", location: "Savannakhet", linkedin: "in/khamla", status: "verified" },
  { id: "p5", name: "Mali Inthavong", initials: "MI", role: "Founder & CEO", company: "Sabaidee Health", location: "Luang Prabang", linkedin: "in/mali", status: "draft" },
  { id: "p6", name: "Bounmy Sengdara", initials: "BS", role: "Co-founder", company: "NamKhan Solar", location: "Luang Prabang", linkedin: "in/bounmy", status: "verified" },
  { id: "p7", name: "Anong Phimmasone", initials: "AP", role: "Head of Product", company: "Pakse Marketplace", location: "Pakse", linkedin: "in/anong", status: "verified" },
  { id: "p8", name: "Thavone Xayachack", initials: "TX", role: "Founder", company: "Lan Xang AI", location: "Vientiane", linkedin: "in/thavone", status: "pending" },
];

export const investors: Investor[] = [
  { id: "i1", name: "Mekong Capital Partners", type: "VC", hq: "Bangkok, TH", investments: 14, aum: 220_000_000, focus: "Southeast Asia growth", status: "verified" },
  { id: "i2", name: "Lao Development Bank Ventures", type: "Government", hq: "Vientiane, LA", investments: 8, aum: 45_000_000, focus: "Domestic SMEs", status: "verified" },
  { id: "i3", name: "Indochina Angels", type: "Angel", hq: "Hanoi, VN", investments: 22, aum: 12_000_000, focus: "Pre-seed & Seed", status: "verified" },
  { id: "i4", name: "Sabaidee Ventures", type: "VC", hq: "Singapore, SG", investments: 6, aum: 35_000_000, focus: "Frontier markets", status: "pending" },
  { id: "i5", name: "Phongsavanh Group", type: "Corporate", hq: "Vientiane, LA", investments: 5, aum: 80_000_000, focus: "Strategic / FinTech", status: "verified" },
  { id: "i6", name: "Lao Launchpad", type: "Accelerator", hq: "Vientiane, LA", investments: 18, aum: 2_500_000, focus: "Early stage cohorts", status: "verified" },
  { id: "i7", name: "Tonle Capital", type: "VC", hq: "Phnom Penh, KH", investments: 9, aum: 60_000_000, focus: "Mekong region", status: "draft" },
];

export const rounds: Round[] = [
  { id: "r1", company: "JumboRide", type: "Series A", amount: 4_500_000, date: "2025-03-18", leadInvestor: "Mekong Capital Partners", investors: 4, status: "pending" },
  { id: "r2", company: "LaoPay", type: "Series A", amount: 3_200_000, date: "2024-11-04", leadInvestor: "Sabaidee Ventures", investors: 5, status: "verified" },
  { id: "r3", company: "MekongFresh", type: "Seed", amount: 850_000, date: "2024-09-22", leadInvestor: "Indochina Angels", investors: 3, status: "verified" },
  { id: "r4", company: "Khaolao Logistics", type: "Series A", amount: 5_000_000, date: "2024-07-15", leadInvestor: "Phongsavanh Group", investors: 2, status: "verified" },
  { id: "r5", company: "NamKhan Solar", type: "Seed", amount: 1_400_000, date: "2024-05-30", leadInvestor: "Mekong Capital Partners", investors: 4, status: "verified" },
  { id: "r6", company: "EduLao", type: "Pre-seed", amount: 180_000, date: "2025-02-12", leadInvestor: "Lao Launchpad", investors: 2, status: "pending" },
  { id: "r7", company: "Pakse Marketplace", type: "Seed", amount: 1_100_000, date: "2024-08-09", leadInvestor: "Tonle Capital", investors: 3, status: "verified" },
];

export const submissions: Submission[] = [
  { id: "s1", entity: "Company", title: "Update funding total for JumboRide", submittedBy: "noy@jumboride.la", submittedAt: "2 hours ago", changes: 3, priority: "high" },
  { id: "s2", entity: "Round", title: "New Series A — JumboRide ($4.5M)", submittedBy: "partner@mekongcap.com", submittedAt: "5 hours ago", changes: 8, priority: "high" },
  { id: "s3", entity: "Person", title: "Add Thavone Xayachack as Founder, Lan Xang AI", submittedBy: "thavone@lanxang.ai", submittedAt: "Yesterday", changes: 5, priority: "medium" },
  { id: "s4", entity: "Investor", title: "Verify Sabaidee Ventures profile", submittedBy: "ops@invest-track.la", submittedAt: "Yesterday", changes: 2, priority: "medium" },
  { id: "s5", entity: "Company", title: "EduLao — request profile claim", submittedBy: "founder@edulao.la", submittedAt: "2 days ago", changes: 1, priority: "low" },
  { id: "s6", entity: "Company", title: "Logo & description update — MekongFresh", submittedBy: "marketing@mekongfresh.la", submittedAt: "3 days ago", changes: 4, priority: "low" },
];

export const sectorBreakdown = [
  { name: "FinTech", value: 28 },
  { name: "AgriTech", value: 22 },
  { name: "E-commerce", value: 18 },
  { name: "Mobility", value: 12 },
  { name: "HealthTech", value: 9 },
  { name: "EdTech", value: 7 },
  { name: "Other", value: 14 },
];

export const fundingByMonth = [
  { month: "Nov", amount: 3.2 },
  { month: "Dec", amount: 1.4 },
  { month: "Jan", amount: 2.6 },
  { month: "Feb", amount: 0.4 },
  { month: "Mar", amount: 4.5 },
  { month: "Apr", amount: 2.1 },
];

export const provinces = [
  "Vientiane Capital", "Luang Prabang", "Champasak", "Savannakhet",
  "Xiangkhouang", "Bokeo", "Bolikhamsai", "Houaphanh", "Khammouane",
  "Oudomxay", "Phongsali", "Salavan", "Sekong", "Vientiane Province", "Xayaburi", "Xaisomboun", "Attapeu", "Luang Namtha",
];

export const sectors = [
  "FinTech", "AgriTech", "E-commerce", "Mobility", "HealthTech",
  "EdTech", "Logistics", "CleanTech", "AI / ML", "Consumer", "SaaS", "Tourism",
];
