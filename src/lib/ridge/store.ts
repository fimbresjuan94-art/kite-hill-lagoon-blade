import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { handoffToVisit, stepFloor } from "./closers";
import {
  checklistFor,
  createLead,
  drain,
  estimateTotal,
  fire,
  invoiceDue,
  invoiceTotal,
  lineTotal,
  mergeContacts,
  packagesFor,
  runOne,
  sweep,
  lighten,
  fileMonthlyReports,
  fileWeeklyForManager,
} from "./engine";
import { dayKey, phoneKey, uid } from "./format";
import { seed } from "./seed";
import type {
  Campaign,
  Contact,
  Estimate,
  JobStatus,
  Landing,
  LeadInput,
  PriceItem,
  RidgeData,
  SocialPost,
  Staff,
  Survey,
  WStep,
  Workflow,
} from "./types";

type Store = {
  data: RidgeData;
  sessionId: string | null;
  signIn: (email: string, pin: string) => boolean;
  signOut: () => void;
  boot: () => void;
  tidy: () => void;
  markRead: (id: string) => void;
  reset: () => void;
  importData: (data: RidgeData) => void;
  addLead: (input: LeadInput) => void;
  saveContact: (contact: Contact) => void;
  addTag: (id: string, tag: string) => void;
  addNote: (id: string, note: string) => void;
  merge: (keepId: string, dropId: string) => void;
  importCsv: (text: string) => number;
  addCompany: (name: string, kind: string, phone: string) => void;
  moveDeal: (id: string, stage: string) => void;
  addDeal: (contactId: string, title: string, value: number) => void;
  sendMessage: (contactId: string, channel: string, body: string) => void;
  addCall: (contactId: string, status: "answered" | "missed" | "voicemail", notes: string) => void;
  setJobStatus: (id: string, status: JobStatus) => void;
  assignCrew: (id: string, crewIds: string[]) => void;
  moveJobDay: (id: string, dayOffset: number) => void;
  toggleCheck: (jobId: string, checkId: string) => void;
  addPhotoNote: (jobId: string, caption: string, src: string) => void;
  addVideo: (jobId: string, id: string) => void;
  setLoads: (jobId: string, loads: number, dump: string) => void;
  saveEstimate: (est: Estimate) => void;
  buildEstimate: (contactId: string, type: string) => void;
  sendEstimate: (id: string) => void;
  approveEstimate: (id: string, option: string) => void;
  declineEstimate: (id: string) => void;
  markEstimateViewed: (id: string) => void;
  makeInvoice: (jobId: string) => void;
  sendInvoice: (id: string) => void;
  recordPayment: (invoiceId: string, method: string) => void;
  toggleWorkflow: (id: string) => void;
  saveWorkflow: (wf: Workflow) => void;
  addStep: (id: string, step: WStep) => void;
  runWorkflow: (id: string, contactId: string) => void;
  addTask: (title: string, contactId: string | undefined, ownerId: string) => void;
  toggleTask: (id: string) => void;
  sendPayload: (taskId: string) => void;
  addAppointment: (contactId: string, staffId: string, title: string, start: string) => void;
  sendCampaign: (id: string) => void;
  saveCampaign: (c: Campaign) => void;
  savePost: (p: SocialPost) => void;
  writePost: (id: string, copy: string) => void;
  submitForm: (formId: string, answers: Record<string, string>) => void;
  bumpFunnel: (id: string, index: number) => void;
  savePage: (page: Landing) => void;
  visitPage: (slug: string, variant: "A" | "B") => void;
  clickLink: (slug: string) => void;
  addLink: (label: string, slug: string) => void;
  replyReview: (id: string, reply: string) => void;
  addReview: (contactId: string, stars: number, text: string, source: string) => void;
  setTicket: (id: string, status: "open" | "pending" | "solved") => void;
  addTicket: (contactId: string, subject: string, priority: "low" | "normal" | "high") => void;
  toggleCourse: (id: string) => void;
  addBoard: (text: string) => void;
  clockIn: (staffId: string, jobId?: string) => void;
  clockOut: (staffId: string) => void;
  addPlan: (contactId: string, name: string, price: number, cadence: string) => void;
  addStaff: (name: string, role: Staff["role"], email: string, pin: string) => void;
  updateSettings: (patch: Partial<RidgeData["settings"]>) => void;
  addPrice: (item: Omit<PriceItem, "id">) => void;
  setRoute: (ids: string[]) => void;
  addPermit: (type: string, number: string, jobId?: string) => void;
  addHours: (id: string, hours: number) => void;
  addEquipment: (name: string, type: string) => void;
  recordSurvey: (input: Omit<Survey, "id" | "at">) => void;
  enroll: (workflowId: string, contactId: string) => void;
  stepClosers: () => void;
  takeHandoff: (sessionId: string) => void;
  toggleCloser: (id: string) => void;
  convertLead: (id: string) => void;
  postChatter: (text: string) => void;
};

function actorName(data: RidgeData, sessionId: string | null) {
  return data.staff.find((s) => s.id === sessionId)?.name ?? "Site";
}

export const useRidge = create<Store>()(
  persist(
    (set, get) => {
      const commit = (fn: (data: RidgeData, actor: string) => RidgeData) =>
        set((s) => ({ data: fn(s.data, actorName(s.data, s.sessionId)) }));

      return {
        data: seed(),
        sessionId: null,
        signIn: (email, pin) => {
          const staff = get().data.staff.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
          if (!staff || staff.pin !== pin) return false;
          set({ sessionId: staff.id });
          return true;
        },
        signOut: () => set({ sessionId: null }),
        boot: () =>
          set((s) => {
            const doors = seed().staff;
            const staff = s.data.staff.map((person) => {
              const fixed = doors.find((row) => row.id === person.id);
              return fixed ? { ...person, email: fixed.email } : person;
            });
            const withDoors = staff === s.data.staff ? s.data : { ...s.data, staff };
            return { data: fileWeeklyForManager(fileMonthlyReports(sweep(lighten(withDoors)))) };
          }),
        tidy: () => set((s) => ({ data: lighten(s.data) })),
        markRead: (id) =>
          commit((data) => ({ ...data, threads: data.threads.map((t) => (t.id === id ? { ...t, unread: false } : t)) })),
        reset: () => set({ data: seed(), sessionId: get().sessionId }),
        importData: (data) => set({ data }),
        addLead: (input) => commit((data, actor) => createLead(data, input, actor)),
        saveContact: (contact) =>
          commit((data) => ({
            ...data,
            contacts: data.contacts.some((c) => c.id === contact.id)
              ? data.contacts.map((c) => (c.id === contact.id ? contact : c))
              : [contact, ...data.contacts],
          })),
        addTag: (id, tag) =>
          commit((data) => ({
            ...data,
            contacts: data.contacts.map((c) =>
              c.id === id && tag && !c.tags.includes(tag) ? { ...c, tags: [...c.tags, tag] } : c,
            ),
          })),
        addNote: (id, note) =>
          commit((data, actor) => ({
            ...data,
            contacts: data.contacts.map((c) => (c.id === id ? { ...c, notes: `${c.notes}\n${note}`.trim() } : c)),
            activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} noted ${note}`, kind: "note" }, ...data.activity],
          })),
        merge: (keepId, dropId) => commit((data) => mergeContacts(data, keepId, dropId)),
        importCsv: (text) => {
          const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
          const start = lines[0]?.toLowerCase().includes("name") ? 1 : 0;
          let count = 0;
          commit((data, actor) => {
            let next = data;
            for (const line of lines.slice(start)) {
              const [name, phone, email, address, city, source] = line.split(",").map((p) => p.trim());
              if (!name || !phone) continue;
              if (next.contacts.some((c) => phoneKey(c.phone) === phoneKey(phone))) continue;
              next = createLead(next, { name, phone, email: email ?? "", address: address ?? "", city: city ?? "", service: "Imported lead", notes: "CSV import", source: source || "Import" }, actor);
              count += 1;
            }
            return next;
          });
          return count;
        },
        addCompany: (name, kind, phone) =>
          commit((data) => ({
            ...data,
            companies: [{ id: uid("co"), name, kind, phone, address: "" }, ...data.companies],
          })),
        moveDeal: (id, stage) =>
          commit((data, actor) => {
            const deal = data.deals.find((d) => d.id === id);
            if (!deal) return data;
            const next = {
              ...data,
              deals: data.deals.map((d) => (d.id === id ? { ...d, stage, updatedAt: new Date().toISOString() } : d)),
            };
            return fire(next, "deal.stage", { contactId: deal.contactId, dealId: id, stage }, actor);
          }),
        addDeal: (contactId, title, value) =>
          commit((data) => ({
            ...data,
            deals: [
              {
                id: uid("d"),
                title,
                contactId,
                value,
                stage: "New",
                ownerId: data.contacts.find((c) => c.id === contactId)?.ownerId ?? data.staff[0].id,
                source: "Manual",
                updatedAt: new Date().toISOString(),
              },
              ...data.deals,
            ],
          })),
        sendMessage: (contactId, channel, body) =>
          commit((data, actor) => {
            const thread = data.threads.find((t) => t.contactId === contactId);
            const msg = { id: uid("m"), dir: "out" as const, channel, body, at: new Date().toISOString() };
            const threads = thread
              ? data.threads.map((t) => (t.id === thread.id ? { ...t, unread: false, messages: [...t.messages, msg] } : t))
              : [{ id: uid("th"), contactId, unread: false, messages: [msg] }, ...data.threads];
            return {
              ...data,
              threads,
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} sent ${channel}`, kind: "inbox" }, ...data.activity],
            };
          }),
        addCall: (contactId, status, notes) =>
          commit((data, actor) => {
            const next = {
              ...data,
              calls: [
                { id: uid("call"), contactId, direction: "in" as const, status, seconds: status === "answered" ? 180 : 0, at: new Date().toISOString(), notes },
                ...data.calls,
              ],
            };
            if (status === "missed") return fire(next, "call.missed", { contactId }, actor);
            if (status === "voicemail") {
              const thread = next.threads.find((t) => t.contactId === contactId);
              const msg = { id: uid("m"), dir: "out" as const, channel: "voicemail", body: notes || "Voicemail drop: we will call you back from the yard.", at: new Date().toISOString() };
              return {
                ...next,
                threads: thread
                  ? next.threads.map((t) => (t.contactId === contactId ? { ...t, messages: [...t.messages, msg] } : t))
                  : [{ id: uid("th"), contactId, unread: false, messages: [msg] }, ...next.threads],
              };
            }
            return next;
          }),
        setJobStatus: (id, status) =>
          commit((data, actor) => {
            const job = data.jobs.find((j) => j.id === id);
            if (!job) return data;
            let next: RidgeData = {
              ...data,
              jobs: data.jobs.map((j) => (j.id === id ? { ...j, status, weatherHold: status === "hold" } : j)),
              pings: data.pings.map((p) =>
                job.crewIds.includes(p.staffId) ? { ...p, status, at: new Date().toISOString(), place: job.address } : p,
              ),
            };
            const ctx = { contactId: job.contactId, jobId: job.id, amount: job.price };
            if (status === "enroute") next = fire(next, "job.enroute", ctx, actor);
            if (status === "done") next = fire(next, "job.complete", ctx, actor);
            return {
              ...next,
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} set ${job.title} to ${status}`, kind: "field" }, ...next.activity],
            };
          }),
        assignCrew: (id, crewIds) =>
          commit((data) => ({ ...data, jobs: data.jobs.map((j) => (j.id === id ? { ...j, crewIds } : j)) })),
        moveJobDay: (id, dayOffset) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) => {
              if (j.id !== id) return j;
              const d = new Date();
              d.setDate(d.getDate() + dayOffset);
              const prev = new Date(j.start);
              d.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
              return { ...j, start: d.toISOString(), status: j.status === "unscheduled" ? "scheduled" : j.status };
            }),
          })),
        toggleCheck: (jobId, checkId) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) =>
              j.id === jobId
                ? { ...j, checklist: j.checklist.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c)) }
                : j,
            ),
          })),
        addPhotoNote: (jobId, caption, src) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) =>
              j.id === jobId ? { ...j, photos: [...j.photos, { src, caption: caption || "Job photo" }] } : j,
            ),
          })),
        addVideo: (jobId, id) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) =>
              j.id === jobId ? { ...j, videos: [...(j.videos ?? []), { id, caption: "Job video" }] } : j,
            ),
          })),
        setLoads: (jobId, loads, dump) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) => (j.id === jobId ? { ...j, loads, dump } : j)),
          })),
        saveEstimate: (est) =>
          commit((data) => ({
            ...data,
            estimates: data.estimates.some((e) => e.id === est.id)
              ? data.estimates.map((e) => (e.id === est.id ? est : e))
              : [est, ...data.estimates],
          })),
        buildEstimate: (contactId, type) =>
          commit((data, actor) => {
            const options = packagesFor(data, type);
            const est: Estimate = {
              id: uid("e"),
              number: `EST-${230 + data.estimates.length}`,
              contactId,
              title: type,
              status: "draft",
              options,
              discount: 0,
            };
            return {
              ...data,
              estimates: [est, ...data.estimates],
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} built ${est.number}`, kind: "money" }, ...data.activity],
            };
          }),
        sendEstimate: (id) =>
          commit((data, actor) => {
            const est = data.estimates.find((e) => e.id === id);
            if (!est) return data;
            const next: RidgeData = {
              ...data,
              estimates: data.estimates.map((e) => (e.id === id ? { ...e, status: "sent", sentAt: new Date().toISOString() } : e)),
              deals: data.deals.map((d) =>
                d.contactId === est.contactId && d.stage !== "Won" && d.stage !== "Lost"
                  ? { ...d, stage: "Estimate sent", value: estimateTotal(est, "Best"), updatedAt: new Date().toISOString() }
                  : d,
              ),
            };
            return fire(next, "estimate.sent", { contactId: est.contactId, amount: estimateTotal(est, "Best") }, actor);
          }),
        approveEstimate: (id, option) =>
          commit((data, actor) => {
            const est = data.estimates.find((e) => e.id === id);
            if (!est) return data;
            const total = estimateTotal({ ...est, chosen: option }, option);
            let jobs = data.jobs;
            let jobId = est.jobId;
            if (!jobId) {
              const contact = data.contacts.find((c) => c.id === est.contactId);
              jobId = uid("j");
              jobs = [
                {
                  id: jobId,
                  title: est.title,
                  type: est.title,
                  contactId: est.contactId,
                  address: contact?.address || contact?.city || "",
                  status: "unscheduled",
                  crewIds: [],
                  start: new Date().toISOString(),
                  hours: 6,
                  lat: 31.32,
                  lng: -113.54,
                  notes: `Approved ${option}.`,
                  checklist: checklistFor(est.title),
                  photos: [],
                  price: total,
                  costLabor: 0,
                  costMaterials: 0,
                  loads: 0,
                  dump: "",
                  weatherHold: false,
                  routeOrder: jobs.length + 1,
                },
                ...jobs,
              ];
            } else {
              jobs = jobs.map((j) => (j.id === jobId ? { ...j, price: total } : j));
            }
            const next: RidgeData = {
              ...data,
              jobs,
              estimates: data.estimates.map((e) => (e.id === id ? { ...e, status: "approved", chosen: option, jobId } : e)),
              deals: data.deals.map((d) =>
                d.contactId === est.contactId && d.stage !== "Lost"
                  ? { ...d, stage: "Won", value: total, updatedAt: new Date().toISOString() }
                  : d,
              ),
            };
            return fire(next, "estimate.approved", { contactId: est.contactId, jobId, dealId: next.deals.find((d) => d.contactId === est.contactId)?.id, amount: total }, actor);
          }),
        declineEstimate: (id) =>
          commit((data) => ({
            ...data,
            estimates: data.estimates.map((e) => (e.id === id ? { ...e, status: "declined" } : e)),
          })),
        markEstimateViewed: (id) =>
          commit((data) => ({
            ...data,
            estimates: data.estimates.map((e) => (e.id === id && e.status === "sent" ? { ...e, status: "viewed" } : e)),
          })),
        makeInvoice: (jobId) =>
          commit((data, actor) => {
            const job = data.jobs.find((j) => j.id === jobId);
            if (!job) return data;
            if (data.invoices.some((i) => i.jobId === jobId && i.status !== "paid")) return data;
            const inv = {
              id: uid("inv"),
              number: `INV-${1100 + data.invoices.length}`,
              contactId: job.contactId,
              jobId,
              items: [{ name: job.title, qty: 1, price: job.price }],
              status: "draft" as const,
              issuedAt: new Date().toISOString(),
              dueAt: new Date(Date.now() + 7 * 86400000).toISOString(),
              overduePinged: false,
              financing: data.settings.financing,
            };
            return {
              ...data,
              invoices: [inv, ...data.invoices],
              jobs: data.jobs.map((j) => (j.id === jobId ? { ...j, status: j.status === "done" ? "invoiced" : j.status } : j)),
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} drafted ${inv.number}`, kind: "money" }, ...data.activity],
            };
          }),
        sendInvoice: (id) =>
          commit((data, actor) => {
            const inv = data.invoices.find((i) => i.id === id);
            if (!inv) return data;
            const amount = invoiceTotal(inv);
            const body = `${data.contacts.find((c) => c.id === inv.contactId)?.name.split(" ")[0] ?? "Hi"}, invoice ${inv.number} for ${amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} is ready.`;
            const thread = data.threads.find((t) => t.contactId === inv.contactId);
            const msg = { id: uid("m"), dir: "out" as const, channel: "sms", body, at: new Date().toISOString() };
            return {
              ...data,
              invoices: data.invoices.map((i) => (i.id === id ? { ...i, status: "sent" } : i)),
              threads: thread
                ? data.threads.map((t) => (t.contactId === inv.contactId ? { ...t, messages: [...t.messages, msg] } : t))
                : [{ id: uid("th"), contactId: inv.contactId, unread: false, messages: [msg] }, ...data.threads],
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} sent ${inv.number}`, kind: "money" }, ...data.activity],
            };
          }),
        recordPayment: (invoiceId, method) =>
          commit((data, actor) => {
            const inv = data.invoices.find((i) => i.id === invoiceId);
            if (!inv) return data;
            const due = invoiceDue(data, inv);
            if (due <= 0) return data;
            const next: RidgeData = {
              ...data,
              payments: [{ id: uid("pay"), invoiceId, amount: due, method, at: new Date().toISOString() }, ...data.payments],
              invoices: data.invoices.map((i) => (i.id === invoiceId ? { ...i, status: "paid" } : i)),
            };
            return fire(next, "invoice.paid", { contactId: inv.contactId, jobId: inv.jobId, amount: due }, actor);
          }),
        toggleWorkflow: (id) =>
          commit((data) => ({
            ...data,
            workflows: data.workflows.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w)),
          })),
        saveWorkflow: (wf) =>
          commit((data) => ({
            ...data,
            workflows: data.workflows.some((w) => w.id === wf.id)
              ? data.workflows.map((w) => (w.id === wf.id ? wf : w))
              : [wf, ...data.workflows],
          })),
        addStep: (id, step) =>
          commit((data) => ({
            ...data,
            workflows: data.workflows.map((w) => (w.id === id ? { ...w, steps: [...w.steps, step] } : w)),
          })),
        runWorkflow: (id, contactId) => commit((data, actor) => runOne(data, id, { contactId }, actor)),
        addTask: (title, contactId, ownerId) =>
          commit((data) => ({
            ...data,
            tasks: [{ id: uid("t"), title, contactId, ownerId, due: new Date().toISOString(), done: false }, ...data.tasks],
          })),
        toggleTask: (id) =>
          commit((data) => ({ ...data, tasks: data.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
        sendPayload: (taskId) =>
          commit((data, actor) => {
            const task = data.tasks.find((t) => t.id === taskId);
            if (!task?.payload || !task.contactId) return data;
            const body = task.payload.replaceAll("{{name}}", data.contacts.find((c) => c.id === task.contactId)?.name.split(" ")[0] ?? "there").replaceAll("{{company}}", data.settings.company);
            const thread = data.threads.find((t) => t.contactId === task.contactId);
            const msg = { id: uid("m"), dir: "out" as const, channel: "sms", body, at: new Date().toISOString() };
            return {
              ...data,
              tasks: data.tasks.map((t) => (t.id === taskId ? { ...t, done: true } : t)),
              threads: thread
                ? data.threads.map((t) => (t.contactId === task.contactId ? { ...t, messages: [...t.messages, msg] } : t))
                : [{ id: uid("th"), contactId: task.contactId!, unread: false, messages: [msg] }, ...data.threads],
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} sent a sequence touch`, kind: "workflow" }, ...data.activity],
            };
          }),
        addAppointment: (contactId, staffId, title, start) =>
          commit((data, actor) => {
            const end = new Date(new Date(start).getTime() + 3600000).toISOString();
            const next: RidgeData = {
              ...data,
              appointments: [{ id: uid("ap"), title, contactId, staffId, start, end, kind: "Site visit", status: "set" }, ...data.appointments],
              deals: data.deals.map((d) =>
                d.contactId === contactId && (d.stage === "New" || d.stage === "Contacted")
                  ? { ...d, stage: "Site visit", updatedAt: new Date().toISOString() }
                  : d,
              ),
            };
            return fire(next, "appointment.booked", { contactId }, actor);
          }),
        sendCampaign: (id) =>
          commit((data, actor) => {
            const camp = data.campaigns.find((c) => c.id === id);
            if (!camp) return data;
            const people = data.contacts.filter((c) => camp.audience === "all" || c.tags.includes(camp.audience) || c.status === camp.audience);
            let threads = data.threads;
            for (const person of people) {
              const body = camp.body.replaceAll("{{company}}", data.settings.company).replaceAll("{{name}}", person.name.split(" ")[0]);
              const msg = { id: uid("m"), dir: "out" as const, channel: camp.channel, body, at: new Date().toISOString() };
              const thread = threads.find((t) => t.contactId === person.id);
              threads = thread
                ? threads.map((t) => (t.contactId === person.id ? { ...t, messages: [...t.messages, msg] } : t))
                : [{ id: uid("th"), contactId: person.id, unread: false, messages: [msg] }, ...threads];
            }
            return {
              ...data,
              threads,
              campaigns: data.campaigns.map((c) => (c.id === id ? { ...c, status: "sent", sent: people.length } : c)),
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} sent ${camp.name} to ${people.length}`, kind: "marketing" }, ...data.activity],
            };
          }),
        saveCampaign: (c) =>
          commit((data) => ({
            ...data,
            campaigns: data.campaigns.some((row) => row.id === c.id) ? data.campaigns.map((row) => (row.id === c.id ? c : row)) : [c, ...data.campaigns],
          })),
        savePost: (p) =>
          commit((data) => ({
            ...data,
            posts: data.posts.some((row) => row.id === p.id) ? data.posts.map((row) => (row.id === p.id ? p : row)) : [p, ...data.posts],
          })),
        writePost: (id, copy) =>
          commit((data) => ({ ...data, posts: data.posts.map((p) => (p.id === id ? { ...p, copy } : p)) })),
        submitForm: (formId, answers) =>
          commit((data, actor) => {
            const name = answers.Name || answers.name || "Form lead";
            const phone = answers.Phone || answers.phone || "";
            let next = data;
            let contactId = data.contacts.find((c) => phone && phoneKey(c.phone) === phoneKey(phone))?.id;
            if (!contactId && name) {
              next = createLead(next, {
                name,
                phone: phone || "000-000-0000",
                email: answers.Email || "",
                address: answers.Address || "",
                city: answers.City || "",
                service: answers["What do you need dug"] || Object.values(answers)[0] || "Form",
                notes: Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(" · "),
                source: "Form",
              }, actor);
              contactId = next.contacts[0]?.id;
            }
            next = {
              ...next,
              submissions: [{ id: uid("sub"), formId, at: new Date().toISOString(), answers, contactId }, ...next.submissions],
            };
            return contactId ? fire(next, "form.submitted", { contactId }, actor) : next;
          }),
        bumpFunnel: (id, index) =>
          commit((data) => ({
            ...data,
            funnels: data.funnels.map((f) =>
              f.id === id
                ? { ...f, steps: f.steps.map((step, i) => (i === index ? { ...step, visits: step.visits + 1, conversions: step.conversions + (i < f.steps.length - 1 ? 0 : 1) } : step)) }
                : f,
            ),
          })),
        savePage: (page) =>
          commit((data) => ({
            ...data,
            pages: data.pages.some((p) => p.id === page.id) ? data.pages.map((p) => (p.id === page.id ? page : p)) : [page, ...data.pages],
          })),
        visitPage: (slug, variant) =>
          commit((data) => ({
            ...data,
            pages: data.pages.map((p) =>
              p.slug === slug ? { ...p, visitsA: p.visitsA + (variant === "A" ? 1 : 0), visitsB: p.visitsB + (variant === "B" ? 1 : 0) } : p,
            ),
          })),
        clickLink: (slug) =>
          commit((data) => ({
            ...data,
            links: data.links.map((l) => (l.slug === slug ? { ...l, clicks: l.clicks + 1 } : l)),
          })),
        addLink: (label, slug) =>
          commit((data) => ({ ...data, links: [{ id: uid("lk"), slug, label, clicks: 0 }, ...data.links] })),
        replyReview: (id, reply) =>
          commit((data, actor) => ({
            ...data,
            reviews: data.reviews.map((r) => (r.id === id ? { ...r, reply } : r)),
            activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} replied to a review`, kind: "reputation" }, ...data.activity],
          })),
        addReview: (contactId, stars, text, source) =>
          commit((data, actor) => {
            const next: RidgeData = {
              ...data,
              reviews: [{ id: uid("r"), contactId, stars, text, source, at: new Date().toISOString(), reply: "" }, ...data.reviews],
            };
            return fire(next, stars <= 3 ? "review.low" : "review.high", { contactId }, actor);
          }),
        setTicket: (id, status) =>
          commit((data) => ({ ...data, tickets: data.tickets.map((t) => (t.id === id ? { ...t, status } : t)) })),
        addTicket: (contactId, subject, priority) =>
          commit((data) => ({
            ...data,
            tickets: [{ id: uid("tk"), contactId, subject, priority, status: "open", slaHours: priority === "high" ? 8 : 48, openedAt: new Date().toISOString() }, ...data.tickets],
          })),
        toggleCourse: (id) =>
          commit((data) => ({ ...data, courses: data.courses.map((c) => (c.id === id ? { ...c, done: !c.done } : c)) })),
        addBoard: (text) => {
          const authorId = get().sessionId ?? get().data.staff[0].id;
          commit((data) => ({
            ...data,
            board: [{ id: uid("b"), authorId, text, at: new Date().toISOString() }, ...data.board],
          }));
        },
        clockIn: (staffId, jobId) =>
          commit((data) => {
            if (data.clocks.some((c) => c.staffId === staffId && !c.outAt)) return data;
            return { ...data, clocks: [{ id: uid("cl"), staffId, jobId, inAt: new Date().toISOString() }, ...data.clocks] };
          }),
        clockOut: (staffId) =>
          commit((data) => ({
            ...data,
            clocks: data.clocks.map((c) => (c.staffId === staffId && !c.outAt ? { ...c, outAt: new Date().toISOString() } : c)),
          })),
        addPlan: (contactId, name, price, cadence) =>
          commit((data) => ({
            ...data,
            plans: [{ id: uid("pl"), contactId, name, cadence, price, next: new Date(Date.now() + 30 * 86400000).toISOString(), active: true }, ...data.plans],
          })),
        addStaff: (name, role, email, pin) =>
          commit((data) => ({
            ...data,
            staff: [...data.staff, { id: uid("s"), name, role, email: email.trim().toLowerCase(), pin, phone: "", certs: [], rate: 24 }],
          })),
        updateSettings: (patch) => commit((data) => ({ ...data, settings: { ...data.settings, ...patch } })),
        addPrice: (item) => commit((data) => ({ ...data, priceBook: [...data.priceBook, { ...item, id: uid("pr") }] })),
        setRoute: (ids) =>
          commit((data) => ({
            ...data,
            jobs: data.jobs.map((j) => ({ ...j, routeOrder: ids.indexOf(j.id) === -1 ? j.routeOrder : ids.indexOf(j.id) })),
          })),
        addPermit: (type, number, jobId) =>
          commit((data) => ({
            ...data,
            permits: [{ id: uid("pm"), type, number, jobId, status: "pending", expires: new Date(Date.now() + 14 * 86400000).toISOString() }, ...data.permits],
          })),
        addHours: (id, hours) =>
          commit((data) => ({
            ...data,
            equipment: data.equipment.map((e) => (e.id === id ? { ...e, hours: e.hours + hours } : e)),
          })),
        addEquipment: (name, type) =>
          commit((data) => ({
            ...data,
            equipment: [...data.equipment, { id: uid("eq"), name, type: type || "Machine", hours: 0, nextService: 250, status: "ready" }],
          })),
        recordSurvey: (input) =>
          commit((data) => ({ ...data, surveys: [{ ...input, id: uid("sv"), at: new Date().toISOString() }, ...data.surveys] })),
        enroll: (workflowId, contactId) => commit((data, actor) => runOne(data, workflowId, { contactId }, actor)),
        stepClosers: () => set((s) => ({ data: stepFloor(s.data, actorName(s.data, s.sessionId)) })),
        takeHandoff: (sessionId) => set((s) => ({ data: handoffToVisit(s.data, sessionId, actorName(s.data, s.sessionId)) })),
        toggleCloser: (id) =>
          commit((data) => ({
            ...data,
            closers: (data.closers ?? []).map((c) => (c.id === id ? { ...c, status: c.status === "on" ? "paused" : "on" } : c)),
          })),
        convertLead: (id) =>
          commit((data, actor) => {
            const lead = data.sfLeads?.find((l) => l.id === id);
            if (!lead || lead.status === "Converted" || lead.status === "Unqualified") return data;
            const phone = lead.phone.replace(/\D/g, "");
            const existing = data.contacts.find((c) => c.phone.replace(/\D/g, "") === phone);
            const contactId = existing?.id ?? uid("c");
            const contact = existing ?? {
              id: contactId,
              name: lead.name,
              phone: lead.phone,
              email: lead.email,
              address: "",
              city: lead.city,
              tags: ["salesforce", "cdigs.bid"],
              score: lead.score,
              source: lead.source,
              ownerId: lead.ownerId,
              status: "lead",
              notes: `Confirmed request. ${lead.service}.`,
              gate: "",
              soil: "",
              createdAt: new Date().toISOString(),
            };
            return {
              ...data,
              contacts: existing ? data.contacts : [contact, ...data.contacts],
              deals: [
                {
                  id: uid("d"),
                  title: `${lead.service} — ${lead.city}`,
                  contactId,
                  value: 0,
                  stage: "New",
                  ownerId: lead.ownerId,
                  source: "Request",
                  updatedAt: new Date().toISOString(),
                },
                ...data.deals,
              ],
              sfLeads: data.sfLeads.map((l) => (l.id === id ? { ...l, status: "Converted" as const } : l)),
              activity: [{ id: uid("a"), at: new Date().toISOString(), text: `${actor} confirmed ${lead.name}`, kind: "salesforce" }, ...data.activity],
            };
          }),
        postChatter: (text) =>
          commit((data, actor) => ({
            ...data,
            chatter: [{ id: uid("ch"), author: actor, text, at: new Date().toISOString(), record: "Chatter" }, ...(data.chatter ?? [])],
          })),
      };
    },
    {
      name: "carranza-ridge-v1",
      version: 10,
      partialize: (s) => ({ data: s.data, sessionId: s.sessionId }),
      migrate: (persisted, version) => {
        if (version < 3) return { data: seed(), sessionId: null };
        const saved = persisted as { data: RidgeData; sessionId: string | null };
        if (version < 4 && saved?.data?.closers) {
          const names: Record<string, string> = { cl_mira: "Chente", cl_luca: "Neto", cl_vega: "Chayo", cl_noa: "Tavo" };
          saved.data.closers = saved.data.closers.map((c) => (names[c.id] ? { ...c, name: names[c.id] } : c));
        }
        if (version < 5 && saved?.data?.workflows) {
          const steps = [
            { op: "task" as const, title: "Call this estimate request today" },
            { op: "note" as const, text: "If they don't pick up, text: This is CD Services. We got your estimate request on cdigs.bid. What do you need dug or hauled, and what day can we walk it?" },
            { op: "tag" as const, tag: "cdigs.bid" },
            { op: "task" as const, title: "Call again if they have not answered", day: 1 },
          ];
          const has = saved.data.workflows.some((w) => w.id === "w_call");
          saved.data.workflows = has
            ? saved.data.workflows.map((w) => (w.id === "w_call" ? { ...w, enabled: true, steps } : w))
            : [{ id: "w_call", name: "Call the new request", trigger: "lead.created", enabled: true, lane: "auto", runs: 0, steps }, ...saved.data.workflows];
        }
        if (version < 6 && saved?.data?.staff) {
          saved.data.staff = saved.data.staff.map((s) => (s.id === "s_owner" ? { ...s, name: "Owner", role: "owner" } : s));
          if (!saved.data.staff.some((s) => s.id === "s_crew")) {
            saved.data.staff.push({ id: "s_crew", name: "Crew", role: "operator", email: "", pin: "2580", phone: "(480) 989-5802", certs: [], rate: 0 });
          }
        }
        if (version < 7 && saved?.data) {
          const fresh = seed();
          const d = saved.data;
          if (!d.forms?.length) d.forms = fresh.forms;
          if (!d.funnels?.length) d.funnels = fresh.funnels;
          if (!d.ads?.length) d.ads = fresh.ads;
          if (!d.pages?.length) d.pages = fresh.pages;
          if (!d.courses?.length) d.courses = fresh.courses;
          if (!d.workflows?.some((w) => w.lane === "sequence")) {
            d.workflows = [...d.workflows, ...fresh.workflows.filter((w) => w.lane === "sequence")];
          }
        }
        if (version < 8 && saved?.data?.staff && !saved.data.staff.some((s) => s.role === "developer")) {
          saved.data.staff.unshift({ id: "s_dev", name: "Developer", role: "developer", email: "", pin: "2580", phone: "(480) 989-5802", certs: [], rate: 0 });
        }
        if (version < 9 && saved?.data) {
          const fresh = seed().staff;
          const extra = saved.data.staff.filter((s) => !fresh.some((row) => row.id === s.id));
          saved.data.staff = [...fresh, ...extra.map((s) => ({ ...s, email: s.email || "" }))];
          saved.sessionId = null;
        }
        if (version < 10 && saved?.data?.staff) {
          const fresh = seed().staff;
          saved.data.staff = saved.data.staff.map((person) => {
            const fixed = fresh.find((row) => row.id === person.id);
            return fixed ? { ...person, email: fixed.email, name: fixed.name, role: fixed.role } : person;
          });
          for (const row of fresh) {
            if (!saved.data.staff.some((person) => person.id === row.id)) saved.data.staff.push(row);
          }
        }
        return saved;
      },
    },
  ),
);

export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => setReady(true);
    if (useRidge.persist.hasHydrated()) go();
    return useRidge.persist.onFinishHydration(go);
  }, []);
  return ready;
}

export function download(filename: string, text: string, type = "application/json") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function todayOffset(iso: string) {
  const a = new Date(iso);
  const b = new Date();
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

export { dayKey, lineTotal };
