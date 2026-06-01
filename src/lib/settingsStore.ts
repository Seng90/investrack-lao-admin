import { useEffect, useState, useCallback } from "react";

const KEY = "investtrack.settings.v1";
const EVT = "investtrack:settings-changed";

export interface SettingsState {
  profile: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    timezone: string;
  };
  workspace: {
    name: string;
    currency: "USD" | "LAK" | "THB";
    fiscalStart: string;
    requireModeration: boolean;
  };
  localization: {
    language: string;
    dateFormat: string;
    numberFormat: string;
    weekStart: string;
  };
  notifications: {
    submission: boolean;
    digest: boolean;
    highPriority: boolean;
    mentions: boolean;
  };
  appearance: {
    theme: "Light" | "Dark" | "System";
    density: "Compact" | "Comfortable" | "Spacious";
    tabularNums: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: boolean;
  };
  api: {
    webhook: string;
    publicExports: boolean;
    rateLimit: boolean;
  };
}

export const defaultSettings: SettingsState = {
  profile: {
    fullName: "Anousone K.",
    role: "Data Lead",
    email: "anousone@invest-track.la",
    phone: "+856 20 5555 0123",
    timezone: "Asia/Vientiane",
  },
  workspace: { name: "InvestTrack — Laos", currency: "USD", fiscalStart: "January", requireModeration: true },
  localization: { language: "English", dateFormat: "YYYY-MM-DD", numberFormat: "1,234.56", weekStart: "Monday" },
  notifications: { submission: true, digest: true, highPriority: false, mentions: true },
  appearance: { theme: "System", density: "Comfortable", tabularNums: true },
  security: { twoFactor: true, sessionTimeout: false },
  api: { webhook: "", publicExports: true, rateLimit: true },
};

function read(): SettingsState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

function write(next: SettingsState) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVT));
  applyAppearance(next.appearance);
}

export function applyAppearance(a: SettingsState["appearance"]) {
  const root = document.documentElement;
  const isDark =
    a.theme === "Dark" ||
    (a.theme === "System" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", isDark);
  root.dataset.density = a.density.toLowerCase();
  root.dataset.tabular = a.tabularNums ? "on" : "off";
}

export function useSettings() {
  const [state, setState] = useState<SettingsState>(() => read());

  useEffect(() => {
    const sync = () => setState(read());
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const update = useCallback(<K extends keyof SettingsState>(section: K, patch: Partial<SettingsState[K]>) => {
    setState((prev) => {
      const next = { ...prev, [section]: { ...prev[section], ...patch } };
      write(next);
      return next;
    });
  }, []);

  return { settings: state, update };
}

// Boot: apply appearance immediately on app load
if (typeof window !== "undefined") {
  applyAppearance(read().appearance);
}
