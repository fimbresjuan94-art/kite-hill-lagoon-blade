import { Btn, Card, Field, Input, Page, Pill } from "@/components/ridge/ui";
import { dayKey, money, when } from "@/lib/ridge/format";
import { useRidge } from "@/lib/ridge/store";
import type { ModuleId } from "@/lib/ridge/types";
import { useState } from "react";

const WEIGHT: Record<string, { p: number; cat: string }> = {
  New: { p: 0.1, cat: "Pipeline" },
  Contacted: { p: 0.22, cat: "Pipeline" },
  "Site visit": { p: 0.4, cat: "Best case" },
  "Estimate sent": { p: 0.6, cat: "Commit" },
  Won: { p: 1, cat: "Closed" },
  Lost: { p: 0, cat: "Omitted" },
};

function weekDays() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const monday = start.getDay() === 0 ? -6 : 1 - start.getDay();
  start.setDate(start.getDate() + monday);
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function EstimateWeek() {
  const data = useRidge((s) => s.data);
  const days = weekDays();
  const estimates = data.appointments.filter((a) => a.kind !== "Job");
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {days.map((day) => {
        const key = dayKey(day.toISOString());
        const rows = estimates.filter((a) => dayKey(a.start) === key).sort((a, b) => a.start.localeCompare(b.start));
        const today = key === dayKey();
        return (
          <div key={key} className={`w-44 shrink-0 rounded-2xl p-2 ring-1 ${today ? "bg-panel ring-copper" : "ring-line"}`}>
            <p className="px-1 text-xs uppercase tracking-widest text-mist">
              {day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </p>
            <div className="mt-2 space-y-2">
              {rows.length === 0 ? <p className="px-1 py-3 text-sm text-mist">Open</p> : null}
              {rows.map((ap) => {
                const person = data.contacts.find((c) => c.id === ap.contactId);
                const who = data.staff.find((s) => s.id === ap.staffId);
                return (
                  <div key={ap.id} className="rounded-xl bg-ink p-2">
                    <p className="text-sm font-medium leading-5">{person?.name ?? ap.title}</p>
                    <p className="text-xs text-mist">{new Date(ap.start).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} · {person?.city}</p>
                    <p className="text-xs text-mist">{ap.title.replace("Estimate · ", "")}</p>
                    <p className="mt-1 text-xs text-copper">{who?.name?.split(" ")[0]}{ap.source === "cdigs.bid" ? " · cdigs.bid" : ""}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ClosersFloor({ onNav }: { onNav?: (m: ModuleId) => void }) {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const sessions = data.sessions ?? [];
  const closers = data.closers ?? [];
  const live = sessions.find((s) => s.stage === "dialing" || s.stage === "qualifying" || s.stage === "booking") ?? sessions.find((s) => s.stage === "handoff");
  const waiting = sessions.filter((s) => s.stage === "handoff");
  const queued = sessions.filter((s) => s.stage === "queued").length;
  const booked = (data.appointments ?? []).filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid");
  return (
    <Page
      kicker="La cuadrilla"
      title="Chente, Neto, Chayo, Tavo"
      action={<Btn onClick={() => api.stepClosers()}>{data.settings.closersLive ? "Work the next lead" : "Floor is paused"}</Btn>}
    >
      <p className="text-sm text-mist">
        Chente is the call button. Chayo is the Spanish text. Neto is the English text. Tavo is the video on the job. Each one opens the phone you are holding. A new request also leaves their words in the inbox.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {closers.map((c) => {
          const mine = booked.filter((a) => a.bookedBy === c.id).length;
          return (
            <Card key={c.id}>
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-2xl">{c.name}</p>
                <Pill hot={c.status === "on"}>{c.status === "on" ? "live" : "paused"}</Pill>
              </div>
              <p className="text-sm text-mist">
                {c.channel === "phone" ? "Opens the phone dialer." : c.channel === "sms" ? "Opens Messages in Spanish." : c.channel === "video" ? "Records on the job from the phone camera." : "Opens Messages in English."}
              </p>
              <p className="mt-2 text-sm">{mine} estimates on the book · cap {c.capPerHour}/hr</p>
              <Btn className="mt-3" tone="quiet" onClick={() => api.toggleCloser(c.id)}>{c.status === "on" ? "Pause" : "Wake"}</Btn>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card>
          <p className="text-xs uppercase tracking-widest text-copper">Live conversation</p>
          {live ? (
            <>
              <p className="mt-2 font-display text-3xl">{live.name}</p>
              <p className="text-sm text-mist">{live.city} · {live.service} · intent {live.intent} · {live.stage} · {queued} still in queue</p>
              <ol className="mt-3 space-y-2">
                {live.transcript.map((line, i) => (
                  <li key={i} className={`rounded-xl px-3 py-2 text-sm ${line.who === "agent" ? "bg-ink" : "bg-soil"}`}>
                    <span className="text-xs uppercase tracking-widest text-copper">{line.who === "agent" ? closers.find((c) => c.id === live.closerId)?.name : live.name}</span>
                    <span className="mt-1 block">{line.text}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="mt-3 text-sm text-mist">Queue is clear. The book already holds the visits they closed.</p>
          )}
        </Card>
        <Card>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-widest text-copper">Waiting room</p>
            <Pill hot={waiting.length > 0}>{waiting.length} for a person</Pill>
          </div>
          <div className="mt-3 space-y-3">
            {waiting.length === 0 ? <p className="text-sm text-mist">No buyer is asking for a human.</p> : null}
            {waiting.map((s) => (
              <div key={s.id} className="rounded-xl bg-ink p-3">
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-mist">{s.service} · {s.city} · intent {s.intent}</p>
                <p className="mt-1 text-sm">{s.detail}</p>
                <Btn className="mt-3" onClick={() => api.takeHandoff(s.id)}>Take the visit and book it</Btn>
              </div>
            ))}
          </div>
          {onNav ? <Btn className="mt-4" tone="ghost" onClick={() => onNav("calendar")}>Open the estimate book</Btn> : null}
        </Card>
      </div>
    </Page>
  );
}

export function SalesforceDesk() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [note, setNote] = useState("");
  const leads = data.sfLeads ?? [];
  const cats = ["Pipeline", "Best case", "Commit", "Closed"];
  const buckets = cats.map((cat) => {
    const rows = data.deals.filter((d) => (WEIGHT[d.stage]?.cat ?? "Pipeline") === cat);
    const raw = rows.reduce((sum, d) => sum + d.value, 0);
    const weighted = rows.reduce((sum, d) => sum + d.value * (WEIGHT[d.stage]?.p ?? 0), 0);
    return { cat, raw, weighted, count: rows.length };
  });
  return (
    <Page kicker="Lead desk" title="Open requests">
      <p className="text-sm text-mist">
        A request stays a request until you confirm it. This screen does not assign a salesperson who is not on your crew, and it does not contact the customer.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {buckets.map((b) => (
          <Card key={b.cat}>
            <p className="text-xs uppercase tracking-widest text-mist">{b.cat}</p>
            <p className="mt-1 font-display text-3xl">{money(b.weighted)}</p>
            <p className="text-sm text-mist">{b.count} deals · {money(b.raw)} raw</p>
          </Card>
        ))}
      </div>
      <Card>
        <p className="text-xs uppercase tracking-widest text-copper">Leads</p>
        <div className="mt-3 space-y-2">
          {leads.map((lead) => {
            const owner = data.staff.find((s) => s.id === lead.ownerId);
            return (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-ink px-3 py-2">
                <div>
                  <p>{lead.name} <span className="text-mist">· {lead.city}</span></p>
                  <p className="text-sm text-mist">{lead.service} · {lead.source} · score {lead.score} · {owner?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Pill hot={lead.status === "Converted" || lead.status === "Qualified"}>{lead.status}</Pill>
                  {lead.status !== "Converted" && lead.status !== "Unqualified" ? (
                    <Btn tone="quiet" onClick={() => api.convertLead(lead.id)}>Convert</Btn>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card>
        <p className="text-xs uppercase tracking-widest text-copper">Chatter</p>
        <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => { e.preventDefault(); if (!note.trim()) return; api.postChatter(note.trim()); setNote(""); }}>
          <Field label="Post to the record">
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What should the crew see?" />
          </Field>
          <Btn type="submit">Post</Btn>
        </form>
        <ul className="mt-4 space-y-3">
          {(data.chatter ?? []).slice(0, 12).map((post) => (
            <li key={post.id}>
              <p className="text-sm"><span className="text-copper">{post.author}</span> · {post.record}</p>
              <p>{post.text}</p>
              <p className="text-xs text-mist">{when(post.at)}</p>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}

export function FieldBook() {
  const data = useRidge((s) => s.data);
  const take = useRidge((s) => s.takeHandoff);
  const visits = [...data.appointments]
    .filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid")
    .sort((a, b) => a.start.localeCompare(b.start));
  const waiting = (data.sessions ?? []).filter((s) => s.stage === "handoff");
  const soon = visits.slice(0, 8);
  return (
    <div className="space-y-3">
      <Card>
        <p className="text-xs uppercase tracking-widest text-copper">Estimate book · cdigs.bid</p>
        <p className="mt-1 font-display text-3xl">{visits.length} clients booked</p>
        <p className="text-sm text-mist">The closers filled this. Walk the ones on your name. Take anyone sitting in the waiting room.</p>
      </Card>
      {waiting.map((s) => (
        <Card key={s.id}>
          <p className="text-xs uppercase tracking-widest text-copper">Waiting room</p>
          <p className="font-medium">{s.name} · {s.city}</p>
          <p className="text-sm text-mist">{s.service}. {s.detail}</p>
          <Btn className="mt-3" onClick={() => take(s.id)}>Book this visit</Btn>
        </Card>
      ))}
      {soon.map((ap) => {
        const person = data.contacts.find((c) => c.id === ap.contactId);
        const who = data.staff.find((s) => s.id === ap.staffId);
        return (
          <Card key={ap.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{person?.name}</p>
              <Pill>{ap.status}</Pill>
            </div>
            <p className="text-sm">{ap.title}</p>
            <p className="text-sm text-mist">{when(ap.start)} · {person?.city} · {person?.phone}</p>
            <p className="text-sm text-mist">{person?.address}</p>
            <p className="text-sm text-copper">With {who?.name}</p>
          </Card>
        );
      })}
    </div>
  );
}
