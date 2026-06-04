import { useParams, Navigate } from "react-router-dom";
import { DeleteShell } from "@/components/admin/DeleteShell";
import { companies, investors, rounds } from "@/data/mockData";

type Entity = "companies" | "members" | "investors" | "rounds";

const memberNames: Record<string, string> = {
  m1: "Souphanh Keomany",
  m2: "Vilaykham Phommachanh",
  m3: "Noy Sisavath",
  m4: "Khamla Vongdara",
  m5: "Mali Inthavong",
  m6: "Bounmy Sengdara",
  m7: "Anong Phimmasone",
  m8: "Thavone Xayachack",
};

const config: Record<Entity, { label: string; back: string; backLabel: string; find: (id: string) => string | undefined }> = {
  companies: {
    label: "Company",
    back: "/companies",
    backLabel: "Back to companies",
    find: (id) => companies.find((c) => c.id === id)?.name,
  },
  members: {
    label: "Member",
    back: "/members",
    backLabel: "Back to members",
    find: (id) => memberNames[id],
  },
  investors: {
    label: "Investor",
    back: "/investors",
    backLabel: "Back to investors",
    find: (id) => investors.find((i) => i.id === id)?.name,
  },
  rounds: {
    label: "Round",
    back: "/rounds",
    backLabel: "Back to rounds",
    find: (id) => {
      const r = rounds.find((r) => r.id === id);
      return r ? `${r.type} — ${r.company}` : undefined;
    },
  },
};

const DeletePage = () => {
  const { entity, id } = useParams<{ entity: Entity; id: string }>();
  if (!entity || !id || !config[entity]) return <Navigate to="/" replace />;
  const cfg = config[entity];
  const name = cfg.find(id) ?? "Unknown record";
  return <DeleteShell entity={cfg.label} name={name} backTo={cfg.back} backLabel={cfg.backLabel} />;
};

export default DeletePage;
