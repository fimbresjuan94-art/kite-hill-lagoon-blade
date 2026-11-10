import { bringEstimates, createLead, lighten } from "./engine";
import { useRidge } from "./store";
import type { LeadInput, RidgeData } from "./types";

let watching: string | null = null;
let pending: RidgeData | null = null;
let started = false;
let lastLight = 0;

const CARE: Record<string, (keyof RidgeData)[]> = {
  overview: ["estimates", "deals", "contacts", "jobs", "appointments", "activity"],
  estimates: ["estimates", "contacts", "deals"],
  pipeline: ["deals", "contacts"],
  inbox: ["threads", "contacts"],
  contacts: ["contacts", "deals"],
  jobs: ["jobs", "contacts"],
  calendar: ["appointments", "contacts"],
  closers: ["sessions", "appointments", "contacts", "estimates"],
  activity: ["activity"],
  invoices: ["invoices"],
  calls: ["calls", "contacts"],
  tasks: ["tasks"],
};

function cares(page: string, prev: RidgeData, next: RidgeData) {
  const keys = CARE[page];
  if (!keys) return false;
  return keys.some((key) => prev[key] !== next[key]);
}

function takePending(db: RidgeData): RidgeData {
  if (typeof localStorage === "undefined") return db;
  const raw = localStorage.getItem("cds-pending-leads");
  if (!raw) return db;
  localStorage.removeItem("cds-pending-leads");
  let rows: Array<Partial<LeadInput> & { name?: string }> = [];
  try {
    const parsed = JSON.parse(raw) as Array<Partial<LeadInput> & { name?: string }>;
    if (Array.isArray(parsed)) rows = parsed.filter((row) => row?.name);
  } catch {
    return db;
  }
  if (!rows.length) return db;
  return rows.reduce(
    (next, lead) =>
      createLead(
        next,
        {
          name: lead.name || "",
          phone: lead.phone || "",
          email: lead.email || "",
          address: lead.address || "",
          city: lead.city || "",
          service: lead.service || "Estimate",
          notes: lead.notes || "",
          source: lead.source || "cdigs.bid",
          visit: lead.visit || "",
        },
        "Battalion",
      ),
    db,
  );
}

let lastShown: RidgeData | null = null;

function paint(next: RidgeData) {
  useRidge.setState({ data: next });
  pending = null;
  lastShown = next;
}

export function watchPage(id: string | null) {
  watching = id;
  if (pending && typeof document !== "undefined" && document.visibilityState === "visible" && id && cares(id, useRidge.getState().data, pending)) {
    paint(pending);
  }
}

export function wakeBattalion() {
  if (started || typeof window === "undefined") return;
  started = true;
  const tick = () => {
    const shown = useRidge.getState().data;
    if (pending && lastShown && shown !== lastShown && shown !== pending) pending = null;
    const base = pending ?? shown;
    let next = takePending(base);
    next = bringEstimates(next);
    const now = Date.now();
    if (now - lastLight > 60000) {
      const lean = lighten(next);
      if (lean.activity !== next.activity || lean.jobs !== next.jobs) next = lean;
      lastLight = now;
    }
    if (next === base) {
      lastShown = shown;
      return;
    }
    pending = next;
    const page = watching;
    if (page && document.visibilityState === "visible" && cares(page, shown, next)) paint(next);
    else lastShown = shown;
  };
  window.setInterval(tick, 4000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && watching && pending && cares(watching, useRidge.getState().data, pending)) paint(pending);
  });
  tick();
}
