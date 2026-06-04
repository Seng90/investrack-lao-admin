export type Plan = "Free" | "Pro" | "Team" | "Enterprise";
export type MemberStatus = "verified" | "pending" | "draft" | "rejected";

export interface Member {
  id: string;
  name: string;
  initials: string;
  email: string;
  plan: Plan;
  seats: number;
  mrr: number;
  renewsAt: string;
  status: MemberStatus;
}

export const initialMembers: Member[] = [
  { id: "m1", name: "Souphanh Keomany", initials: "SK", email: "souphanh@laopay.la", plan: "Enterprise", seats: 25, mrr: 1200, renewsAt: "2026-02-14", status: "verified" },
  { id: "m2", name: "Vilaykham Phommachanh", initials: "VP", email: "vk@jumboride.la", plan: "Team", seats: 8, mrr: 320, renewsAt: "2026-06-09", status: "verified" },
  { id: "m3", name: "Noy Sisavath", initials: "NS", email: "noy@mekongfresh.la", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-06-30", status: "pending" },
  { id: "m4", name: "Khamla Vongdara", initials: "KV", email: "khamla@khaolao.la", plan: "Team", seats: 5, mrr: 200, renewsAt: "2026-07-22", status: "verified" },
  { id: "m5", name: "Mali Inthavong", initials: "MI", email: "mali@sabaidee.health", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-05-18", status: "draft" },
  { id: "m6", name: "Bounmy Sengdara", initials: "BS", email: "bounmy@namkhan.solar", plan: "Free", seats: 1, mrr: 0, renewsAt: "—", status: "verified" },
  { id: "m7", name: "Anong Phimmasone", initials: "AP", email: "anong@pakse.market", plan: "Pro", seats: 1, mrr: 49, renewsAt: "2026-08-04", status: "verified" },
  { id: "m8", name: "Thavone Xayachack", initials: "TX", email: "thavone@lanxang.ai", plan: "Free", seats: 1, mrr: 0, renewsAt: "—", status: "pending" },
];

type Listener = () => void;
const listeners = new Set<Listener>();
let members: Member[] = [...initialMembers];

export const memberStore = {
  get: () => members,
  remove: (id: string) => {
    members = members.filter((m) => m.id !== id);
    listeners.forEach((l) => l());
  },
  subscribe: (l: Listener) => {
    listeners.add(l);
    return () => { listeners.delete(l); };
  },
};
