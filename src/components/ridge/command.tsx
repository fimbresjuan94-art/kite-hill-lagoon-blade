import { Btn, Card, Input, Page, Pill, Stat } from "@/components/ridge/ui";
import { MODULES } from "@/components/ridge/nav";
import { COVERAGE } from "@/lib/ridge/coverage";
import { askRidge, forecast, invoiceDue, monthBuckets, sourceBuckets } from "@/lib/ridge/engine";
import { dayKey, money, when } from "@/lib/ridge/format";
import { useRidge } from "@/lib/ridge/store";
import type { ModuleId, RidgeData } from "@/lib/ridge/types";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DESKS: { name: string; line: string; ids: ModuleId[] }[] = [
  {
    name: "People and follow-up",
    line: "Contacts, the inbox, and the lines that remind you to call.",
    ids: ["contacts", "pipeline", "inbox", "calls", "campaigns", "workflows", "calendar", "forms", "funnels", "sites", "social", "ads", "reviews", "sequences", "academy", "board"],
  },
  {
    name: "Jobs and money",
    line: "Dispatch, the written price, the truck, and what was collected.",
    ids: ["dispatch", "schedule", "jobs", "estimates", "invoices", "payments", "pricebook", "costing", "routes", "time", "photos", "equipment", "permits", "plans"],
  },
  {
    name: "Records",
    line: "Accounts, the forecast, and the history of each request.",
    ids: ["companies", "lists", "tasks", "tickets", "knowledge", "surveys", "reports", "activity", "agents"],
  },
  {
    name: "Requests",
    line: "Real requests from cdigs.bid.",
    ids: ["closers", "salesforce", "ask", "coverage", "team", "settings"],
  },
];

function tally(id: ModuleId, data: RidgeData) {
  const openDeals = data.deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost").length;
  const map: Partial<Record<ModuleId, string>> = {
    contacts: String(data.contacts.length),
    companies: String(data.companies.length),
    pipeline: String(openDeals),
    lists: String(new Set(data.contacts.flatMap((c) => c.tags)).size),
    tasks: String(data.tasks.filter((t) => !t.done).length),
    inbox: String(data.threads.filter((t) => t.unread).length),
    calls: String(data.calls.length),
    campaigns: String(data.campaigns.length),
    funnels: String(data.funnels.length),
    forms: String(data.submissions.length),
    sites: String(data.pages.length),
    social: String(data.posts.length),
    ads: String(data.ads.length),
    reviews: String(data.reviews.length),
    calendar: String(data.appointments.filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid").length),
    dispatch: String(data.jobs.filter((j) => j.status !== "done" && j.status !== "invoiced").length),
    schedule: String(data.jobs.filter((j) => dayKey(j.start) === dayKey()).length),
    jobs: String(data.jobs.length),
    routes: String(data.jobs.filter((j) => j.status === "scheduled" || j.status === "enroute").length),
    estimates: String(data.estimates.length),
    pricebook: String(data.priceBook.length),
    costing: String(data.jobs.filter((j) => j.price > 0).length),
    equipment: String(data.equipment.length),
    permits: String(data.permits.length),
    time: String(data.clocks.filter((c) => !c.outAt).length),
    photos: String(data.jobs.reduce((n, j) => n + j.photos.length, 0)),
    invoices: String(data.invoices.filter((i) => i.status !== "paid").length),
    payments: String(data.payments.length),
    plans: String(data.plans.filter((p) => p.active).length),
    tickets: String(data.tickets.filter((t) => t.status !== "solved").length),
    knowledge: String(data.articles.length),
    surveys: String(data.surveys.length),
    academy: String(data.courses.filter((c) => !c.done).length),
    board: String(data.board.length),
    workflows: String(data.workflows.filter((w) => w.enabled && w.lane === "auto").length),
    agents: String((data.closers ?? []).filter((c) => c.status === "on").length),
    sequences: String(data.workflows.filter((w) => w.lane === "sequence").length),
    closers: String((data.sessions ?? []).filter((s) => s.stage !== "booked" && s.stage !== "optout").length),
    salesforce: String((data.sfLeads ?? []).filter((l) => l.status !== "Converted" && l.status !== "Unqualified").length),
    activity: String(data.activity.length),
    coverage: String(COVERAGE.length),
    team: String(data.staff.length),
    reports: String(data.deals.length),
  };
  return map[id] ?? "Open";
}

function AllTools({ onNav }: { onNav: (m: ModuleId) => void }) {
  const data = useRidge((s) => s.data);
  const autos = data.workflows.filter((w) => w.enabled && w.lane === "auto");
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-xs uppercase tracking-widest text-copper">Already running</p>
        <p className="mt-1 text-sm text-mist">These fire on their own. A new lead, a booked visit, a missed call, a sent estimate, a finished job, a paid invoice, a late invoice.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {autos.map((w) => (
            <button key={w.id} onClick={() => onNav("workflows")} className="min-h-11">
              <Pill hot>{w.name}</Pill>
            </button>
          ))}
        </div>
      </Card>
      {DESKS.map((desk) => (
        <section key={desk.name}>
          <h2 className="font-display text-3xl">{desk.name}</h2>
          <p className="mt-1 text-sm text-mist">{desk.line}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {desk.ids.map((id) => {
              const item = MODULES.find((m) => m.id === id);
              if (!item) return null;
              const Icon = item.icon;
              return (
                <button key={id} onClick={() => onNav(id)} className="card min-h-20 p-3 text-left">
                  <span className="flex items-center gap-2 text-sm text-mist">
                    <Icon className="size-4 text-copper" />
                    {item.label}
                  </span>
                  <span className="mt-2 block font-display text-2xl">{tally(id, data)}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function Overview({ onNav }: { onNav: (m: ModuleId) => void }) {
  const data = useRidge((s) => s.data);
  const addLead = useRidge((s) => s.addLead);
  const toggleTask = useRidge((s) => s.toggleTask);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [work, setWork] = useState("");
  const sessionId = useRidge((s) => s.sessionId);
  const role = useRidge((s) => s.data.staff.find((person) => person.id === sessionId)?.role);
  const simple = role !== "developer";
  const late = data.invoices.filter((i) => i.status === "overdue" || i.status === "sent");
  const cash = data.payments.reduce((sum, p) => {
    const at = new Date(p.at);
    const now = new Date();
    return at.getMonth() === now.getMonth() && at.getFullYear() === now.getFullYear() ? sum + p.amount : sum;
  }, 0);
  const openTasks = data.tasks.filter((t) => !t.done);
  const book = data.contacts.filter((c) => c.status === "lead" || c.tags.includes("lead"));
  return (
    <Page kicker={simple ? "Yard" : "Command"} title={simple ? "Today" : "The yard, right now"} action={simple ? null : <Btn onClick={() => onNav("ask")}>Ask el corral</Btn>}>
      <Card>
        <p className="text-xs uppercase tracking-widest text-copper">Call these</p>
        {book.length === 0 ? (
          <p className="mt-2 text-sm text-mist">Nobody is on the book yet. A form on the site files itself here. If the shop phone rings, write them in below.</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {book.map((person) => {
              const dial = person.phone.replace(/[^\d+]/g, "");
              const task = openTasks.find((t) => t.contactId === person.id);
              return (
                <li key={person.id} className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl">{person.name}</p>
                    <p className="text-sm text-mist">{person.city || "No city yet"} · {person.phone || person.email || "No number"}</p>
                    {task ? <p className="text-sm">{task.title}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dial ? <a className="inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink" href={`tel:${dial}`}>Call</a> : null}
                    {task ? <Btn tone="quiet" onClick={() => toggleTask(task.id)}>Called</Btn> : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <form
          className="mt-4 grid gap-2 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim().length < 2 || phone.trim().length < 7) return;
            addLead({ name: name.trim(), phone: phone.trim(), email: "", address: "", city: city.trim(), service: work.trim() || "Estimate", notes: "Called the shop.", source: "shop phone", visit: "" });
            setName("");
            setPhone("");
            setCity("");
            setWork("");
          }}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" />
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" aria-label="Phone" inputMode="tel" />
          <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" aria-label="City" />
          <Input value={work} onChange={(e) => setWork(e.target.value)} placeholder="What they need dug" aria-label="Work" />
          <Btn type="submit" className="sm:col-span-2">Put them on the book</Btn>
        </form>
      </Card>
      {simple ? null : (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Collected this month" value={money(cash)} hint="Money you already wrote down" />
        <Stat label="Weighted pipeline" value={money(forecast(data))} hint="Open work, not a guess" />
        <Stat label="Estimates booked" value={String(data.appointments.filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid").length)} hint="Visits from the site" />
        <Stat label="Open tasks" value={String(openTasks.length)} hint="Calls still to make" />
      </div>
      )}
      {simple ? (
        <Card>
          <p className="text-sm text-mist">The book files the requests, the follow-ups, and the ads. You call, you price, you get paid.</p>
        </Card>
      ) : (
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <p className="text-xs uppercase tracking-widest text-mist">Needs a human</p>
          <ul className="mt-3 space-y-2">
            {late.slice(0, 4).map((inv) => (
              <li key={inv.id} className="flex items-center justify-between gap-3 text-sm">
                <span>{inv.number} · {data.contacts.find((c) => c.id === inv.contactId)?.name}</span>
                <Pill hot={inv.status === "overdue"}>{inv.status} {money(invoiceDue(data, inv))}</Pill>
              </li>
            ))}
            {openTasks.slice(0, 6).map((task) => (
              <li key={task.id} className="flex items-center justify-between gap-3 text-sm">
                <span>{task.title}</span>
                <button className="min-h-11 text-copper" onClick={() => toggleTask(task.id)}>Done</button>
              </li>
            ))}
            {late.length === 0 && openTasks.length === 0 ? <li className="text-sm text-mist">Nothing waiting.</li> : null}
          </ul>
        </Card>
        <Card className="h-64">
          <p className="text-xs uppercase tracking-widest text-mist">Cash, six months</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthBuckets(data)}>
                <XAxis dataKey="name" stroke="var(--color-mist)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ background: "var(--color-panel)", border: "none", borderRadius: 12, color: "var(--color-bone)" }} />
                <Bar dataKey="cash" fill="var(--color-copper)" radius={6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      )}
      {simple ? null : <AllTools onNav={onNav} />}
    </Page>
  );
}

export function Ask() {
  const data = useRidge((s) => s.data);
  const [q, setQ] = useState("What's the morning brief?");
  const [answer, setAnswer] = useState(() => askRidge(data, "brief"));
  return (
    <Page kicker="El corral" title="Ask el corral">
      <Card>
        <p className="text-sm text-mist">It reads this yard's jobs, cash, and people. No outside model required, so the file still works when you move it.</p>
        <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => { e.preventDefault(); setAnswer(askRidge(useRidge.getState().data, q)); }}>
          <Input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Question" />
          <Btn type="submit">Ask</Btn>
        </form>
        <div className="mt-5">
          <h2 className="font-display text-3xl">{answer.title}</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-mist">{answer.body}</p>
        </div>
      </Card>
    </Page>
  );
}

export function ActivityScreen() {
  const activity = useRidge((s) => s.data.activity);
  return (
    <Page kicker="History" title="Everything that moved">
      <div className="space-y-2">
        {activity.map((item) => (
          <Card key={item.id} className="flex items-start justify-between gap-3">
            <p>{item.text}</p>
            <span className="shrink-0 text-xs text-mist">{when(item.at)} · {item.kind}</span>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Reports() {
  const data = useRidge((s) => s.data);
  const avg = data.reviews.length ? data.reviews.reduce((s, r) => s + r.stars, 0) / data.reviews.length : 0;
  const won = data.deals.filter((d) => d.stage === "Won").length;
  const lost = data.deals.filter((d) => d.stage === "Lost").length;
  return (
    <Page kicker="Insight" title="Reports">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Win rate" value={won + lost ? `${Math.round((won / (won + lost)) * 100)}%` : "—"} hint={`${won} won · ${lost} lost`} />
        <Stat label="Review average" value={avg ? avg.toFixed(1) : "—"} hint={`${data.reviews.length} on file`} />
        <Stat label="Weighted forecast" value={money(forecast(data))} />
      </div>
      <Card className="h-72">
        <p className="mb-2 text-xs uppercase tracking-widest text-mist">Leads by source</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceBuckets(data)}>
              <XAxis dataKey="name" stroke="var(--color-mist)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} stroke="var(--color-mist)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-panel)", border: "none", borderRadius: 12, color: "var(--color-bone)" }} />
              <Bar dataKey="leads" fill="var(--color-copper)" radius={6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </Page>
  );
}

export function Coverage({ onNav }: { onNav: (m: ModuleId) => void }) {
  const sources = ["All", ...Array.from(new Set(COVERAGE.map((row) => row.from)))];
  const [from, setFrom] = useState("All");
  const rows = COVERAGE.filter((row) => from === "All" || row.from === from);
  return (
    <Page kicker="El corral" title="What el corral can do" action={
      <div className="flex flex-wrap gap-2">
        {sources.map((name) => (
          <Btn key={name} tone={from === name ? "primary" : "ghost"} onClick={() => setFrom(name)}>{name}</Btn>
        ))}
      </div>
    }>
      <p className="text-sm text-mist">These are CD Services tools for the work you already do.</p>
      <div className="space-y-2">
        {rows.map((row) => (
          <button key={row.feature} onClick={() => onNav(row.m)} className="card flex w-full flex-col gap-1 p-4 text-left sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="text-xs uppercase tracking-widest text-copper">{row.from} · {row.group}</span>
              <span className="mt-1 block">{row.feature}</span>
            </span>
            <span className="text-sm text-mist">{row.how}</span>
          </button>
        ))}
      </div>
    </Page>
  );
}
