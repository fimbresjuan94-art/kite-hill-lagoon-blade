import { Area, Btn, Card, Field, Input, Page, Pill, Select } from "@/components/ridge/ui";
import { askRidge, commissions, newWorkflow, rioDraft, solDraft } from "@/lib/ridge/engine";
import { download, useRidge } from "@/lib/ridge/store";
import { money } from "@/lib/ridge/format";
import type { Role, WStep } from "@/lib/ridge/types";
import { useState } from "react";

const TRIGGERS = ["lead.created", "appointment.booked", "estimate.sent", "estimate.approved", "call.missed", "job.enroute", "job.complete", "invoice.paid", "invoice.overdue", "review.low", "review.high", "form.submitted", "deal.stage"];

export function Workflows() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const autos = data.workflows.filter((w) => w.lane === "auto");
  const [id, setId] = useState(autos[0]?.id ?? "");
  const wf = data.workflows.find((w) => w.id === id) ?? autos[0];
  const [step, setStep] = useState<WStep>({ op: "sms", text: "Hi {{name}}." });
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  return (
    <Page kicker="Automation" title="Workflows" action={<Btn onClick={() => { const wf = newWorkflow({ name: "New line" }); api.saveWorkflow(wf); setId(wf.id); }}>New line</Btn>}>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          {autos.map((row) => (
            <button key={row.id} onClick={() => setId(row.id)} className={`card w-full p-3 text-left ${row.id === wf?.id ? "ring-1 ring-copper" : ""}`}>
              <span className="flex items-center justify-between gap-2"><span>{row.name}</span><Pill hot={row.enabled}>{row.enabled ? "live" : "off"}</Pill></span>
              <span className="text-xs text-mist">{row.trigger} · {row.runs} runs</span>
            </button>
          ))}
        </div>
        {wf ? (
          <Card className="space-y-3">
            <Field label="Name"><Input value={wf.name} onChange={(e) => api.saveWorkflow({ ...wf, name: e.target.value })} /></Field>
            <Field label="Trigger">
              <Select value={wf.trigger} onChange={(e) => api.saveWorkflow({ ...wf, trigger: e.target.value })}>
                {TRIGGERS.map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Only when stage is (optional)"><Input value={wf.when ?? ""} onChange={(e) => api.saveWorkflow({ ...wf, when: e.target.value || undefined })} placeholder="Lost" /></Field>
            <ol className="space-y-2 text-sm">
              {wf.steps.map((s, i) => <li key={`${s.op}${i}`} className="rounded-xl bg-ink p-3">{i + 1}. {s.op} {s.text || s.title || s.tag || s.stage || ""} {s.minScore ? `if score ≥ ${s.minScore}` : ""} {s.day ? `day ${s.day}` : ""}</li>)}
            </ol>
            <div className="grid gap-2 sm:grid-cols-2">
              <Select value={step.op} onChange={(e) => setStep({ ...step, op: e.target.value as WStep["op"] })} aria-label="Step">
                {["sms", "email", "task", "tag", "score", "note", "review", "invoice"].map((op) => <option key={op}>{op}</option>)}
              </Select>
              <Input value={step.text ?? ""} onChange={(e) => setStep({ ...step, text: e.target.value, title: e.target.value })} aria-label="Step text" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn tone="quiet" onClick={() => api.addStep(wf.id, step)}>Add step</Btn>
              <Btn tone="ghost" onClick={() => api.toggleWorkflow(wf.id)}>{wf.enabled ? "Pause" : "Enable"}</Btn>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Run for">
                {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Btn onClick={() => api.runWorkflow(wf.id, contactId)}>Run now</Btn>
            </div>
          </Card>
        ) : null}
      </div>
    </Page>
  );
}

export function Sequences() {
  const data = useRidge((s) => s.data);
  const enroll = useRidge((s) => s.enroll);
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const rows = data.workflows.filter((w) => w.lane === "sequence");
  return (
    <Page kicker="Follow-up" title="Sequences">
      <p className="text-sm text-mist">Day 0 sends now. Later days become tasks. Open Tasks and hit “Send this touch” when the day arrives.</p>
      {rows.map((row) => (
        <Card key={row.id} className="mt-3">
          <p className="font-display text-2xl">{row.name}</p>
          <ol className="mt-2 text-sm text-mist">{row.steps.map((s, i) => <li key={i}>{s.day ? `Day ${s.day}` : "Now"} — {s.text || s.title}</li>)}</ol>
          <div className="mt-3 flex flex-wrap gap-2">
            <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Enroll">
              {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Btn onClick={() => enroll(row.id, contactId)}>Enroll</Btn>
          </div>
        </Card>
      ))}
    </Page>
  );
}

export function Agents() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [contactId, setContactId] = useState(data.threads[0]?.contactId ?? data.contacts[0]?.id ?? "");
  const brief = askRidge(data, "brief");
  const review = data.reviews.find((r) => !r.reply);
  return (
    <Page kicker="La cuadrilla" title="The crew on the book">
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <p className="text-xs uppercase tracking-widest text-copper">Neto · conversations</p>
          <p className="mt-2 text-sm">{rioDraft(data, contactId)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Rio contact">
              {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Btn onClick={() => api.sendMessage(contactId, "sms", rioDraft(useRidge.getState().data, contactId))}>Send draft</Btn>
          </div>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-copper">Dispatch · voice</p>
          <p className="mt-2 text-sm">If they don't pick up: “This is Carranza Dig. We can walk the site this week. We'll text you now.”</p>
          <Btn className="mt-3" onClick={() => api.addCall(contactId, "missed", "Voice agent simulated a missed call.")}>Simulate missed call</Btn>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-copper">Lalo · reviews</p>
          <p className="mt-2 text-sm">{review ? solDraft(review.stars, data.contacts.find((c) => c.id === review.contactId)?.name ?? "") : "Every review has a reply."}</p>
          {review ? <Btn className="mt-3" onClick={() => api.replyReview(review.id, solDraft(review.stars, data.contacts.find((c) => c.id === review.contactId)?.name ?? ""))}>Post reply</Btn> : null}
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-widest text-copper">Morning brief</p>
          <p className="mt-2 whitespace-pre-wrap text-sm">{brief.body}</p>
        </Card>
      </div>
    </Page>
  );
}

export function Team() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addStaff);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("operator");
  const [made, setMade] = useState("");
  const rows = commissions(data);
  return (
    <Page kicker="People" title="Team">
      <form
        className="mb-3 flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name || !email) return;
          const pin = Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 6);
          add(name, role, email, pin);
          setMade(`${email.trim().toLowerCase()} · ${pin}`);
          setName("");
          setEmail("");
        }}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" type="email" />
        <Select value={role} onChange={(e) => setRole(e.target.value as Role)} aria-label="Role">
          {["operator", "manager", "owner"].map((r) => <option key={r} value={r}>{r}</option>)}
        </Select>
        <Btn type="submit">Add</Btn>
      </form>
      {made ? <p className="mb-3 text-sm text-copper">Give this once, then it leaves this screen. {made}</p> : null}
      <div className="grid gap-3 md:grid-cols-2">
        {data.staff.map((person) => (
          <Card key={person.id}>
            <p className="font-display text-2xl">{person.name}</p>
            <p className="text-sm text-mist">{person.role}</p>
            <p className="mt-2 text-sm">{person.certs.length ? person.certs.join(" · ") : "No certs on file"}</p>
            <p className="text-sm text-copper">Commission pool {money(rows.find((r) => r.name === person.name)?.amount ?? 0)}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Settings() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const s = data.settings;
  return (
    <Page kicker="Yard file" title="Settings">
      <Card className="grid gap-3 md:grid-cols-2">
        <Field label="Company"><Input value={s.company} onChange={(e) => api.updateSettings({ company: e.target.value })} /></Field>
        <Field label="Yard"><Input value={s.yard} onChange={(e) => api.updateSettings({ yard: e.target.value })} /></Field>
        <Field label="Phone"><Input value={s.phone} onChange={(e) => api.updateSettings({ phone: e.target.value })} /></Field>
        <Field label="Review link"><Input value={s.reviewUrl} onChange={(e) => api.updateSettings({ reviewUrl: e.target.value })} /></Field>
        <Field label="Commission rate"><Input type="number" step="0.01" value={s.commissionRate} onChange={(e) => api.updateSettings({ commissionRate: Number(e.target.value) })} /></Field>
        <Field label="Public site"><Input value={s.site ?? ""} onChange={(e) => api.updateSettings({ site: e.target.value })} /></Field>
        <Field label="Writer tone"><Input value={s.writerTone} onChange={(e) => api.updateSettings({ writerTone: e.target.value })} /></Field>
      </Card>
      <Card>
        <p className="font-display text-2xl">Take the file with you</p>
        <p className="mt-2 text-sm text-mist">The corral file stays in this browser. Export it before you clear it.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Btn onClick={() => download("bajada.json", JSON.stringify(data, null, 2))}>Export JSON</Btn>
          <Btn tone="ghost" onClick={() => api.reset()}>Clear the corral file</Btn>
          <label className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-panel px-4 text-sm">
            Import JSON
            <input type="file" accept="application/json" className="sr-only" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const text = await file.text();
              api.importData(JSON.parse(text));
            }} />
          </label>
        </div>
      </Card>
    </Page>
  );
}

void Area;
