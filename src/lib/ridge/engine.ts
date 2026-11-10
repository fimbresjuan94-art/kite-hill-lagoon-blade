import { dayKey, money, phoneKey, uid, when } from "./format";
import { readCorralLang } from "./es";
import type { Ctx, Estimate, Invoice, Job, LeadInput, Line, RidgeData, Task, Thread, WStep, Workflow } from "./types";

const YARD = { lat: 31.3172, lng: -113.5284 };

export function lineTotal(items: Line[], discount = 0) {
  const raw = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  return Math.max(0, raw - discount);
}

export function invoiceTotal(inv: Invoice) {
  return lineTotal(inv.items);
}

export function paidToward(db: RidgeData, invoiceId: string) {
  return db.payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.amount, 0);
}

export function invoiceDue(db: RidgeData, inv: Invoice) {
  return Math.max(0, invoiceTotal(inv) - paidToward(db, inv.id));
}

export function estimateTotal(est: Estimate, optionName?: string) {
  const opt = est.options.find((o) => o.name === (optionName ?? est.chosen)) ?? est.options[0];
  if (!opt) return 0;
  return lineTotal(opt.items, est.discount);
}

export function nameOf(db: RidgeData, id?: string) {
  return db.contacts.find((c) => c.id === id)?.name ?? "Unknown";
}

export function companyOf(db: RidgeData, id?: string) {
  return db.companies.find((c) => c.id === id)?.name ?? "";
}

function log(db: RidgeData, text: string, kind = "log"): RidgeData {
  return {
    ...db,
    activity: [{ id: uid("a"), at: new Date().toISOString(), text, kind }, ...db.activity].slice(0, 250),
  };
}

export function fill(db: RidgeData, text: string, ctx: Ctx) {
  const contact = db.contacts.find((c) => c.id === ctx.contactId);
  const job = db.jobs.find((j) => j.id === ctx.jobId);
  const crew = job
    ? job.crewIds
        .map((id) => db.staff.find((s) => s.id === id)?.name.split(" ")[0])
        .filter(Boolean)
        .join(" & ")
    : "the crew";
  const amount = ctx.amount ?? job?.price ?? 0;
  return (text ?? "")
    .replaceAll("{{name}}", contact?.name.split(" ")[0] ?? "there")
    .replaceAll("{{full}}", contact?.name ?? "there")
    .replaceAll("{{job}}", job?.title ?? "your project")
    .replaceAll("{{crew}}", crew || "the crew")
    .replaceAll("{{amount}}", money(amount))
    .replaceAll("{{link}}", db.settings.reviewUrl)
    .replaceAll("{{company}}", db.settings.company)
    .replaceAll("{{yard}}", db.settings.yard)
    .replaceAll("{{when}}", job ? when(job.start) : "soon");
}

function ensureThread(db: RidgeData, contactId: string): { db: RidgeData; thread: Thread } {
  const found = db.threads.find((t) => t.contactId === contactId);
  if (found) return { db, thread: found };
  const thread: Thread = { id: uid("th"), contactId, unread: false, messages: [] };
  return { db: { ...db, threads: [thread, ...db.threads] }, thread };
}

function pushMessage(db: RidgeData, contactId: string, dir: "in" | "out", channel: string, body: string) {
  const ensured = ensureThread(db, contactId);
  const msg = { id: uid("m"), dir, channel, body, at: new Date().toISOString() };
  const threads = ensured.db.threads.map((t) =>
    t.id === ensured.thread.id
      ? { ...t, unread: dir === "in", messages: [...t.messages, msg] }
      : t,
  );
  return { ...ensured.db, threads };
}

function addTask(db: RidgeData, task: Omit<Task, "id" | "done"> & { done?: boolean }): RidgeData {
  const next: Task = { id: uid("t"), done: false, ...task };
  return { ...db, tasks: [next, ...db.tasks] };
}

function touchScore(db: RidgeData, contactId: string | undefined, delta: number) {
  if (!contactId || !delta) return db;
  return {
    ...db,
    contacts: db.contacts.map((c) =>
      c.id === contactId ? { ...c, score: Math.max(0, Math.min(100, c.score + delta)) } : c,
    ),
  };
}

function applyStep(db: RidgeData, step: WStep, ctx: Ctx, actor: string): RidgeData {
  const contact = db.contacts.find((c) => c.id === ctx.contactId);
  if (step.minScore != null && (contact?.score ?? 0) < step.minScore) return db;
  if ((step.day ?? 0) > 0) {
    const due = new Date();
    due.setDate(due.getDate() + (step.day ?? 0));
    return addTask(log(db, `${actor} queued a day-${step.day} touch`, "workflow"), {
      title: step.title || step.text || "Follow up",
      contactId: ctx.contactId,
      ownerId: contact?.ownerId ?? db.staff[0]?.id ?? "",
      due: due.toISOString(),
      payload: step.text,
    });
  }
  if (step.op === "sms" || step.op === "email" || step.op === "review") {
    const channel = step.op === "email" ? "email" : "sms";
    const body = fill(
      db,
      step.op === "review"
        ? "{{name}}, it's {{company}}. The work is done and paid. If we earned it, a review helps more than you know: {{link}}"
        : step.text || "",
      ctx,
    );
    if (!ctx.contactId) return db;
    const next = pushMessage(db, ctx.contactId, "out", channel, body);
    return log(next, `${actor} sent ${channel} to ${contact?.name ?? "a contact"}`, "workflow");
  }
  if (step.op === "task") {
    return addTask(db, {
      title: fill(db, step.title || step.text || "Follow up", ctx),
      contactId: ctx.contactId,
      ownerId: contact?.ownerId ?? db.staff[0]?.id ?? "",
      due: new Date().toISOString(),
    });
  }
  if (step.op === "tag" && ctx.contactId && step.tag) {
    return {
      ...db,
      contacts: db.contacts.map((c) =>
        c.id === ctx.contactId && !c.tags.includes(step.tag!) ? { ...c, tags: [...c.tags, step.tag!] } : c,
      ),
    };
  }
  if (step.op === "score") return touchScore(db, ctx.contactId, step.delta ?? 0);
  if (step.op === "dealStage" && step.stage) {
    return {
      ...db,
      deals: db.deals.map((d) =>
        d.id === ctx.dealId || (!ctx.dealId && d.contactId === ctx.contactId && d.stage !== "Lost" && d.stage !== "Won")
          ? { ...d, stage: step.stage!, updatedAt: new Date().toISOString() }
          : d,
      ),
    };
  }
  if (step.op === "note" && ctx.contactId) {
    const line = fill(db, step.text || "", ctx);
    return {
      ...log(db, line, "note"),
      contacts: db.contacts.map((c) =>
        c.id === ctx.contactId ? { ...c, notes: `${c.notes}\n${line}`.trim() } : c,
      ),
    };
  }
  if (step.op === "invoice" && ctx.jobId) {
    const job = db.jobs.find((j) => j.id === ctx.jobId);
    if (!job) return db;
    if (db.invoices.some((inv) => inv.jobId === job.id && inv.status !== "paid")) return db;
    const inv: Invoice = {
      id: uid("inv"),
      number: `INV-${1040 + db.invoices.length}`,
      contactId: job.contactId,
      jobId: job.id,
      items: [{ name: job.title, qty: 1, price: job.price }],
      status: "draft",
      issuedAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      overduePinged: false,
      financing: db.settings.financing,
    };
    return log(
      { ...db, invoices: [inv, ...db.invoices] },
      `${actor} drafted ${inv.number} for ${job.title}`,
      "workflow",
    );
  }
  return db;
}

export function drain(db: RidgeData, actor = "Bajada"): RidgeData {
  let next = db;
  for (let guard = 0; guard < 60; guard += 1) {
    const run = next.runs.find((r) => r.status === "running");
    if (!run) break;
    const wf = next.workflows.find((w) => w.id === run.workflowId);
    const step = wf?.steps[run.cursor];
    if (!wf || !step) {
      next = {
        ...next,
        runs: next.runs.map((r) => (r.id === run.id ? { ...r, status: "done" } : r)),
      };
      continue;
    }
    const ctx: Ctx = { contactId: run.contactId, jobId: run.jobId, dealId: run.dealId };
    next = applyStep(next, step, ctx, actor);
    const done = run.cursor + 1 >= wf.steps.length;
    next = {
      ...next,
      runs: next.runs.map((r) =>
        r.id === run.id ? { ...r, cursor: r.cursor + 1, status: done ? "done" : "running" } : r,
      ),
    };
  }
  return { ...next, runs: next.runs.slice(0, 200) };
}

export function fire(db: RidgeData, trigger: string, ctx: Ctx, actor = "Bajada"): RidgeData {
  const matched = db.workflows.filter((w) => {
    if (!w.enabled || w.trigger !== trigger) return false;
    if (w.when && ctx.stage && w.when !== ctx.stage) return false;
    return true;
  });
  if (!matched.length) return db;
  let next = db;
  for (const wf of matched) {
    next = {
      ...next,
      workflows: next.workflows.map((w) => (w.id === wf.id ? { ...w, runs: w.runs + 1 } : w)),
      runs: [
        {
          id: uid("run"),
          workflowId: wf.id,
          contactId: ctx.contactId,
          jobId: ctx.jobId,
          dealId: ctx.dealId,
          cursor: 0,
          status: "running",
        },
        ...next.runs,
      ],
    };
    next = log(next, `${wf.name} ran`, "workflow");
  }
  return drain(next, actor);
}

export function runOne(db: RidgeData, workflowId: string, ctx: Ctx, actor = "Bajada") {
  const wf = db.workflows.find((w) => w.id === workflowId);
  if (!wf) return db;
  const next = {
    ...db,
    workflows: db.workflows.map((w) => (w.id === wf.id ? { ...w, runs: w.runs + 1 } : w)),
    runs: [
      {
        id: uid("run"),
        workflowId: wf.id,
        contactId: ctx.contactId,
        jobId: ctx.jobId,
        dealId: ctx.dealId,
        cursor: 0,
        status: "running" as const,
      },
      ...db.runs,
    ],
  };
  return drain(log(next, `${actor} ran ${wf.name}`, "workflow"), actor);
}

export function sweep(db: RidgeData): RidgeData {
  const today = dayKey();
  if (db.settings.sweptOn === today) return drain(db);
  let next: RidgeData = { ...db, settings: { ...db.settings, sweptOn: today } };
  for (const inv of db.invoices) {
    if ((inv.status === "sent" || inv.status === "partial") && new Date(inv.dueAt).getTime() < Date.now() && !inv.overduePinged) {
      next = {
        ...next,
        invoices: next.invoices.map((row) =>
          row.id === inv.id ? { ...row, status: "overdue", overduePinged: true } : row,
        ),
      };
      next = fire(next, "invoice.overdue", { contactId: inv.contactId, amount: invoiceDue(next, inv) }, "Bajada");
    }
  }
  const soon = Date.now() + 14 * 86400000;
  for (const permit of next.permits) {
    const title = `Renew ${permit.type} ${permit.number}`;
    if (new Date(permit.expires).getTime() < soon && !next.tasks.some((t) => t.title === title)) {
      next = addTask(next, {
        title,
        ownerId: next.staff.find((s) => s.role === "office")?.id ?? next.staff[0].id,
        due: permit.expires,
      });
    }
  }
  for (const eq of next.equipment) {
    const title = `Service ${eq.name}`;
    if (eq.hours >= eq.nextService - 10 && !next.tasks.some((t) => t.title === title && !t.done)) {
      next = addTask(next, {
        title,
        ownerId: next.staff.find((s) => s.role === "dispatcher")?.id ?? next.staff[0].id,
        due: new Date().toISOString(),
      });
    }
  }
  return log(next, "Morning sweep checked overdue cash, permits, and machines", "workflow");
}

export function nextOwner(db: RidgeData) {
  const pool = db.staff.filter((s) => s.role === "estimator" || s.role === "dispatcher");
  const open = (id: string) => db.deals.filter((d) => d.ownerId === id && d.stage !== "Won" && d.stage !== "Lost").length;
  return [...pool].sort((a, b) => open(a.id) - open(b.id))[0]?.id ?? db.staff[0]?.id ?? "";
}

export function checklistFor(type: string) {
  const base = [
    "811 locate is clear",
    "Before photos",
    "Spoil plan confirmed",
    "Grade check",
    "Customer walkthrough",
    "After photos",
  ];
  if (type.toLowerCase().includes("septic")) base.splice(1, 0, "Tank and field setbacks checked");
  if (type.toLowerCase().includes("trench")) base.splice(1, 0, "Utility conflict walk");
  return base.map((label) => ({ id: uid("ck"), label, done: false }));
}

export function createLead(db: RidgeData, input: LeadInput, actor = "Site"): RidgeData {
  const existing = db.contacts.find((c) => phoneKey(c.phone) === phoneKey(input.phone) && phoneKey(input.phone));
  let next = db;
  let contactId = existing?.id;
  if (existing) {
    next = {
      ...next,
      contacts: next.contacts.map((c) =>
        c.id === existing.id
          ? {
              ...c,
              notes: `${c.notes}\nNew ${input.source} request: ${input.service}. ${input.notes}`.trim(),
              score: Math.min(100, c.score + 8),
            }
          : c,
      ),
    };
  } else {
    contactId = uid("c");
    next = {
      ...next,
      contacts: [
        {
          id: contactId,
          name: input.name || "New lead",
          phone: input.phone,
          email: input.email,
          address: input.address,
          city: input.city || "",
          tags: ["lead"],
          score: 40,
          source: input.source,
          ownerId: nextOwner(next),
          status: "lead",
          notes: input.notes,
          gate: "",
          soil: "",
          createdAt: new Date().toISOString(),
        },
        ...next.contacts,
      ],
    };
  }
  const deal = {
    id: uid("d"),
    title: input.service || "Site visit",
    contactId: contactId!,
    value: 0,
    stage: "New",
    ownerId: next.contacts.find((c) => c.id === contactId)?.ownerId ?? nextOwner(next),
    source: input.source,
    updatedAt: new Date().toISOString(),
  };
  next = { ...next, deals: [deal, ...next.deals] };
  if (input.visit) {
    const start = new Date(input.visit);
    if (!Number.isNaN(start.getTime())) {
      const end = new Date(start.getTime() + 60 * 60 * 1000);
      next = {
        ...next,
        appointments: [
          {
            id: uid("ap"),
            title: `${input.service || "Estimate"} visit`,
            contactId: contactId!,
            staffId: next.staff[0]?.id ?? "",
            start: start.toISOString(),
            end: end.toISOString(),
            kind: "Estimate",
            status: "requested",
            source: input.source,
            bookedBy: "cdigs.bid",
          },
          ...next.appointments,
        ],
      };
    }
  }
  next = log(next, `${actor} captured ${input.name || "a lead"} from ${input.source}`, "lead");
  return fire(next, "lead.created", { contactId, dealId: deal.id }, actor);
}

export function packagesFor(db: RidgeData, type: string) {
  const want = type.toLowerCase();
  const pick = (...ids: string[]) =>
    ids
      .map((id) => db.priceBook.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ name: p.name, qty: 1, price: p.price }));
  if (want.includes("pool")) {
    return [
      { name: "Good", note: "Dig only. You haul.", items: pick("pool") },
      { name: "Better", note: "Dig plus eight spoil loads.", items: [...pick("pool"), { name: "Spoil load", qty: 8, price: 185 }] },
      { name: "Best", note: "Dig, haul, laser finish.", items: [...pick("pool"), { name: "Spoil load", qty: 8, price: 185 }, ...pick("laser")] },
    ];
  }
  if (want.includes("septic")) {
    return [
      { name: "Good", note: "Tank set.", items: pick("tank") },
      { name: "Better", note: "Tank and field.", items: pick("tank", "field") },
      { name: "Best", note: "Tank, field, six loads.", items: [...pick("tank", "field"), { name: "Spoil load", qty: 6, price: 185 }] },
    ];
  }
  if (want.includes("trench")) {
    return [
      { name: "Good", note: "Machine hour.", items: pick("ex") },
      { name: "Better", note: "Four hours plus haul.", items: [{ name: "Excavator hour", qty: 4, price: 185 }, { name: "Spoil load", qty: 2, price: 185 }] },
      { name: "Best", note: "Day rate, haul, laser.", items: [{ name: "Excavator hour", qty: 8, price: 185 }, { name: "Spoil load", qty: 3, price: 185 }, ...pick("laser")] },
    ];
  }
  return [
    { name: "Good", note: "Pad cut.", items: pick("pad") },
    { name: "Better", note: "Pad plus haul.", items: [...pick("pad"), { name: "Spoil load", qty: 4, price: 185 }] },
    { name: "Best", note: "Pad, haul, laser.", items: [...pick("pad"), { name: "Spoil load", qty: 4, price: 185 }, ...pick("laser")] },
  ];
}

export function miles(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const dy = (a.lat - b.lat) * 69;
  const dx = (a.lng - b.lng) * 54;
  return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
}

export function optimize(jobs: Job[]) {
  const open = jobs.filter((j) => j.status !== "done" && j.status !== "invoiced");
  const ordered: Job[] = [];
  let cursor = YARD;
  const pool = [...open];
  while (pool.length) {
    pool.sort((a, b) => miles(cursor, a) - miles(cursor, b));
    const next = pool.shift()!;
    ordered.push(next);
    cursor = next;
  }
  return ordered;
}

export function duplicateGroups(db: RidgeData) {
  const map = new Map<string, string[]>();
  for (const c of db.contacts) {
    const key = phoneKey(c.phone);
    if (!key) continue;
    map.set(key, [...(map.get(key) ?? []), c.id]);
  }
  return [...map.values()].filter((ids) => ids.length > 1);
}

export function mergeContacts(db: RidgeData, keepId: string, dropId: string): RidgeData {
  if (keepId === dropId) return db;
  const drop = db.contacts.find((c) => c.id === dropId);
  const keep = db.contacts.find((c) => c.id === keepId);
  if (!drop || !keep) return db;
  const tags = [...new Set([...keep.tags, ...drop.tags])];
  const next: RidgeData = {
    ...db,
    contacts: db.contacts
      .filter((c) => c.id !== dropId)
      .map((c) =>
        c.id === keepId
          ? { ...c, tags, notes: `${c.notes}\nMerged ${drop.name}. ${drop.notes}`.trim(), score: Math.max(c.score, drop.score) }
          : c,
      ),
    deals: db.deals.map((d) => (d.contactId === dropId ? { ...d, contactId: keepId } : d)),
    jobs: db.jobs.map((j) => (j.contactId === dropId ? { ...j, contactId: keepId } : j)),
    estimates: db.estimates.map((e) => (e.contactId === dropId ? { ...e, contactId: keepId } : e)),
    invoices: db.invoices.map((i) => (i.contactId === dropId ? { ...i, contactId: keepId } : i)),
    threads: db.threads.filter((t) => t.contactId !== dropId),
    tasks: db.tasks.map((t) => (t.contactId === dropId ? { ...t, contactId: keepId } : t)),
    reviews: db.reviews.map((r) => (r.contactId === dropId ? { ...r, contactId: keepId } : r)),
    appointments: db.appointments.map((a) => (a.contactId === dropId ? { ...a, contactId: keepId } : a)),
  };
  return log(next, `Merged ${drop.name} into ${keep.name}`, "data");
}

const WEIGHT: Record<string, number> = {
  New: 0.1,
  Contacted: 0.22,
  "Site visit": 0.4,
  "Estimate sent": 0.6,
  Won: 1,
  Lost: 0,
};

export function fileMonthlyReports(db: RidgeData): RidgeData {
  const now = new Date();
  let threads = db.threads;
  for (let back = 0; back < 3; back++) {
    const start = new Date(now.getFullYear(), now.getMonth() - back, 1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
    const id = `rpt_${start.getFullYear()}_${start.getMonth() + 1}`;
    const closed = back > 0;
    const existing = threads.find((t) => t.id === id);
    if (closed && existing) continue;
    const inside = (iso?: string) => {
      if (!iso) return false;
      const t = new Date(iso).getTime();
      return t >= start.getTime() && t < end.getTime();
    };
    const collected = db.payments.filter((p) => inside(p.at)).reduce((sum, p) => sum + p.amount, 0);
    const billed = db.invoices.filter((inv) => inside(inv.issuedAt)).reduce((sum, inv) => sum + invoiceTotal(inv), 0);
    const owed = db.invoices.filter((inv) => inv.status !== "paid" && inv.status !== "draft").reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
    const requests = db.contacts.filter((c) => inside(c.createdAt)).length;
    const looks = db.appointments.filter((a) => inside(a.start)).length;
    const finished = db.jobs.filter((j) => j.status === "done" || j.status === "invoiced").filter((j) => inside(j.start)).length;
    const calls = db.tasks.filter((t) => !t.done).length;
    const label = start.toLocaleDateString(readCorralLang() === "es" ? "es-MX" : "en-US", { month: "long", year: "numeric" });
    const es = readCorralLang() === "es";
    const owedNow = back === 0 ? owed : db.invoices.filter((inv) => inside(inv.issuedAt) && inv.status !== "paid").reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
    const body = es
      ? [
          label,
          `Cobrado ${money(collected)}`,
          `Facturado ${money(billed)}`,
          `Todavía deben ${money(owedNow)}`,
          `Solicitudes nuevas ${requests}`,
          `Visitas apuntadas ${looks}`,
          `Trabajos terminados ${finished}`,
          back === 0 ? `Llamadas abiertas ${calls}` : "Mes cerrado",
          "Solo números del libro.",
        ].join("\n")
      : [
          label,
          `Collected ${money(collected)}`,
          `Billed ${money(billed)}`,
          `Still owed ${money(owedNow)}`,
          `New requests ${requests}`,
          `Looks booked ${looks}`,
          `Jobs finished ${finished}`,
          back === 0 ? `Calls still open ${calls}` : "Month closed",
          "Numbers from the book only.",
        ].join("\n");
    const msg = { id: `${id}_m`, dir: "in" as const, channel: "report", body, at: (closed ? end : now).toISOString() };
    const thread: Thread = { id, contactId: "", unread: existing?.unread ?? true, messages: [msg], title: `${label} report` };
    threads = existing ? threads.map((t) => (t.id === id ? { ...thread, unread: t.unread } : t)) : [thread, ...threads];
  }
  return { ...db, threads };
}

export function forecast(db: RidgeData) {
  return db.deals.reduce((sum, d) => sum + d.value * (WEIGHT[d.stage] ?? 0.15), 0);
}

export function monthBuckets(db: RidgeData) {
  const now = new Date();
  return Array.from({ length: 6 }, (_, index) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const label = d.toLocaleString("en-US", { month: "short" });
    const amount = db.payments
      .filter((p) => {
        const at = new Date(p.at);
        return at.getMonth() === d.getMonth() && at.getFullYear() === d.getFullYear();
      })
      .reduce((sum, p) => sum + p.amount, 0);
    return { name: label, cash: amount };
  });
}

export function sourceBuckets(db: RidgeData) {
  const map = new Map<string, number>();
  for (const c of db.contacts) map.set(c.source, (map.get(c.source) ?? 0) + 1);
  return [...map.entries()].map(([name, leads]) => ({ name, leads }));
}

export function jobMargin(job: Job) {
  const cost = job.costLabor + job.costMaterials + job.loads * 70;
  return { cost, margin: job.price - cost, pct: job.price ? Math.round(((job.price - cost) / job.price) * 100) : 0 };
}

export function commissions(db: RidgeData) {
  const rows = new Map<string, number>();
  for (const payment of db.payments) {
    const inv = db.invoices.find((i) => i.id === payment.invoiceId);
    if (!inv) continue;
    const owner = db.deals.find((d) => d.contactId === inv.contactId && d.stage === "Won")?.ownerId ?? db.staff[0]?.id;
    if (!owner) continue;
    rows.set(owner, (rows.get(owner) ?? 0) + payment.amount * db.settings.commissionRate);
  }
  return [...rows.entries()].map(([id, amount]) => ({
    name: db.staff.find((s) => s.id === id)?.name ?? "Crew",
    amount,
  }));
}

export function askRidge(db: RidgeData, q: string) {
  const s = q.toLowerCase();
  const openJobs = db.jobs.filter((j) => j.status !== "done" && j.status !== "invoiced");
  const overdue = db.invoices.filter((i) => i.status === "overdue" || (i.status === "sent" && new Date(i.dueAt) < new Date()));
  const waiting = overdue.reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
  if (s.includes("overdue") || s.includes("invoice") || s.includes("cash") || s.includes("owe")) {
    return {
      title: waiting ? `${money(waiting)} is late` : "Cash is current",
      body: overdue.length
        ? overdue.map((inv) => `${inv.number} · ${nameOf(db, inv.contactId)} · ${money(invoiceDue(db, inv))}`).join("\n")
        : "No sent invoice is past due.",
      m: "invoices" as const,
    };
  }
  if (s.includes("today") || s.includes("crew") || s.includes("schedule") || s.includes("who")) {
    const today = dayKey();
    const jobs = db.jobs.filter((j) => dayKey(j.start) === today);
    return {
      title: jobs.length ? `${jobs.length} jobs today` : "Nothing on today's board",
      body: jobs
        .map((j) => {
          const crew = j.crewIds.map((id) => db.staff.find((p) => p.id === id)?.name.split(" ")[0]).join(", ");
          return `${j.title} · ${j.status} · ${crew || "unassigned"}`;
        })
        .join("\n") || "Open the schedule and drop a job on a crew.",
      m: "schedule" as const,
    };
  }
  if (s.includes("pipeline") || s.includes("forecast") || s.includes("deal")) {
    return {
      title: `${money(forecast(db))} weighted`,
      body: db.deals
        .filter((d) => d.stage !== "Lost")
        .map((d) => `${d.stage}: ${d.title} · ${money(d.value)}`)
        .join("\n"),
      m: "pipeline" as const,
    };
  }
  if (s.includes("review")) {
    const avg = db.reviews.length ? db.reviews.reduce((sum, r) => sum + r.stars, 0) / db.reviews.length : 0;
    const quiet = db.reviews.filter((r) => !r.reply);
    return {
      title: avg ? `${avg.toFixed(1)} star average` : "No reviews yet",
      body: quiet.length ? `${quiet.length} still need a reply.` : "Every review has a reply.",
      m: "reviews" as const,
    };
  }
  if (s.includes("margin") || s.includes("profit") || s.includes("cost")) {
    const rows = db.jobs.map((j) => ({ j, ...jobMargin(j) }));
    const worst = [...rows].sort((a, b) => a.pct - b.pct)[0];
    return {
      title: worst ? `Tightest job is ${worst.pct}%` : "No jobs",
      body: worst ? `${worst.j.title} · price ${money(worst.j.price)} · cost ${money(worst.cost)}` : "",
      m: "costing" as const,
    };
  }
  if (s.includes("permit") || s.includes("811") || s.includes("locate")) {
    return {
      title: `${db.permits.length} locate files`,
      body: db.permits.map((p) => `${p.type} ${p.number} · ${p.status} · exp ${when(p.expires)}`).join("\n"),
      m: "permits" as const,
    };
  }
  const hit = db.contacts.find((c) => s.includes(c.name.toLowerCase().split(" ")[0].toLowerCase()) && s.length > 2);
  if (hit) {
    const jobs = db.jobs.filter((j) => j.contactId === hit.id).length;
    return {
      title: hit.name,
      body: `${hit.city} · score ${hit.score} · ${hit.source}\n${hit.notes || "No notes."}\n${jobs} jobs on file.`,
      m: "contacts" as const,
    };
  }
  const tasks = db.tasks.filter((t) => !t.done).length;
  return {
    title: "Morning brief",
    body: `${openJobs.length} open jobs. ${money(waiting)} late. ${tasks} open tasks. Weighted pipeline ${money(forecast(db))}. Ask about a person, today, cash, reviews, margin, or permits.`,
    m: "overview" as const,
  };
}

export function rioDraft(db: RidgeData, contactId: string) {
  const thread = db.threads.find((t) => t.contactId === contactId);
  const last = [...(thread?.messages ?? [])].reverse().find((m) => m.dir === "in");
  const contact = db.contacts.find((c) => c.id === contactId);
  if (!last) {
    return `Hi ${contact?.name.split(" ")[0] ?? "there"}, this is ${db.settings.company}. Want us to walk the site this week?`;
  }
  return `Hi ${contact?.name.split(" ")[0] ?? "there"} — got your note. ${last.body.slice(0, 80)} We can put a time on the board. Reply with a window that works.`;
}

export function solDraft(stars: number, name: string) {
  const first = name.split(" ")[0];
  if (stars >= 4) return `${first}, thank you. We'll keep the lines straight and the price written before we dig.`;
  return `${first}, thank you for saying it. We want to make this right — call the yard and ask for the owner. We'll walk it with you.`;
}

export function writerDraft(db: RidgeData, job?: Job) {
  const tone = db.settings.writerTone;
  if (!job) return `${tone} Fresh cuts in ${db.settings.yard}. Written price before the machine starts.`;
  return `${tone} ${job.title} in ${job.address}. ${job.loads} spoil loads, checklist on the job, price locked at ${money(job.price)}.`;
}

export function stageWeight(stage: string) {
  return WEIGHT[stage] ?? 0.15;
}

export function laborFromClocks(db: RidgeData, jobId: string) {
  return db.clocks
    .filter((c) => c.jobId === jobId && c.outAt)
    .reduce((sum, c) => {
      const hours = (new Date(c.outAt!).getTime() - new Date(c.inAt).getTime()) / 36e5;
      const rate = db.staff.find((s) => s.id === c.staffId)?.rate ?? 0;
      return sum + hours * rate;
    }, 0);
}

export function newWorkflow(partial: Partial<Workflow>): Workflow {
  return {
    id: uid("wf"),
    name: partial.name || "New line",
    trigger: partial.trigger || "lead.created",
    when: partial.when,
    enabled: partial.enabled ?? true,
    lane: partial.lane ?? "auto",
    steps: partial.steps ?? [{ op: "sms", text: "Hi {{name}}, it's {{company}}." }],
    runs: 0,
  };
}
