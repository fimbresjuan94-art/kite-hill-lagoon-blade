import { Btn, Card, Empty, Field, Input, Page, Pill, Select, Area, usePlain } from "@/components/ridge/ui";
import { duplicateGroups } from "@/lib/ridge/engine";
import { money, when } from "@/lib/ridge/format";
import { useRidge } from "@/lib/ridge/store";
import { STAGES, type Contact } from "@/lib/ridge/types";
import { useEffect, useState } from "react";

export function Contacts() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [id, setId] = useState(data.contacts[0]?.id ?? "");
  const [q, setQ] = useState("");
  const [csv, setCsv] = useState("Name,Phone,Email,Address,City,Source");
  const rows = data.contacts.filter((c) => `${c.name} ${c.city} ${c.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
  const contact = data.contacts.find((c) => c.id === id) ?? rows[0];
  return (
    <Page kicker="CRM" title="Contacts">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search contacts" />
          {rows.map((c) => (
            <button key={c.id} onClick={() => setId(c.id)} className={`card w-full p-4 text-left ${contact?.id === c.id ? "ring-1 ring-copper" : ""}`}>
              <span className="flex items-center justify-between gap-2">
                <span>{c.name}</span>
                <Pill hot={c.score >= 70}>{c.score}</Pill>
              </span>
              <span className="mt-1 block text-sm text-mist">{c.city} · {c.source}</span>
            </button>
          ))}
          <Card>
            <p className="text-sm text-mist">CSV import. Header optional.</p>
            <Area className="mt-2" value={csv} onChange={(e) => setCsv(e.target.value)} aria-label="CSV" />
            <Btn className="mt-2" onClick={() => api.importCsv(csv)}>Import</Btn>
          </Card>
        </div>
        {contact ? <ContactCard contact={contact} /> : <Empty title="No one yet" body="Book a visit or import a list." />}
      </div>
    </Page>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [draft, setDraft] = useState(contact);
  const [tag, setTag] = useState("");
  const [note, setNote] = useState("");
  useEffect(() => setDraft(contact), [contact]);
  const deals = data.deals.filter((d) => d.contactId === contact.id);
  const jobs = data.jobs.filter((j) => j.contactId === contact.id);
  return (
    <Card className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name"><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
        <Field label="Phone"><Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></Field>
        <Field label="Email"><Input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
        <Field label="City"><Input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} /></Field>
        <Field label="Address"><Input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} /></Field>
        <Field label="Gate"><Input value={draft.gate} onChange={(e) => setDraft({ ...draft, gate: e.target.value })} /></Field>
        <Field label="Soil"><Input value={draft.soil} onChange={(e) => setDraft({ ...draft, soil: e.target.value })} /></Field>
        <Field label="Score"><Input type="number" value={draft.score} onChange={(e) => setDraft({ ...draft, score: Number(e.target.value) })} /></Field>
      </div>
      <div className="flex flex-wrap gap-2">
        {draft.tags.map((t) => <Pill key={t}>{t}</Pill>)}
      </div>
      <div className="flex flex-wrap gap-2">
        <Input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Add tag" aria-label="Tag" className="max-w-48" />
        <Btn tone="quiet" onClick={() => { api.addTag(contact.id, tag); setTag(""); }}>Tag</Btn>
        <Btn onClick={() => api.saveContact(draft)}>Save record</Btn>
      </div>
      <Field label="Note">
        <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What the crew should know" />
      </Field>
      <Btn tone="ghost" onClick={() => { if (note) { api.addNote(contact.id, note); setNote(""); } }}>Add note</Btn>
      <p className="whitespace-pre-wrap text-sm text-mist">{contact.notes}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Deals</p>
          {deals.map((d) => <p key={d.id} className="text-sm">{d.title} · {d.stage} · {money(d.value)}</p>)}
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Jobs</p>
          {jobs.map((j) => <p key={j.id} className="text-sm">{j.title} · {j.status}</p>)}
        </div>
      </div>
    </Card>
  );
}

export function Companies() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addCompany);
  const [name, setName] = useState("");
  const [kind, setKind] = useState("General contractor");
  return (
    <Page kicker="CRM" title="Companies" action={<Btn onClick={() => { if (name) { add(name, kind, ""); setName(""); } }}>Add</Btn>}>
      <div className="mb-3 grid gap-2 sm:grid-cols-2">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Company" aria-label="Company" />
        <Input value={kind} onChange={(e) => setKind(e.target.value)} aria-label="Kind" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {data.companies.map((co) => {
          const people = data.contacts.filter((c) => c.companyId === co.id);
          return (
            <Card key={co.id}>
              <p className="font-display text-2xl">{co.name}</p>
              <p className="text-sm text-mist">{co.kind} · {co.phone}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {people.map((p) => <li key={p.id}>{p.name} · {p.status}</li>)}
                {!people.length ? <li className="text-mist">No linked people yet. Set the company on the contact when you import.</li> : null}
              </ul>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

export function Pipeline() {
  const data = useRidge((s) => s.data);
  const move = useRidge((s) => s.moveDeal);
  const add = useRidge((s) => s.addDeal);
  const [title, setTitle] = useState("");
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [value, setValue] = useState(1500);
  return (
    <Page kicker="Sales" title="Pipeline" action={
      <form className="flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); add(contactId, title || "New dig", value); setTitle(""); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Deal" aria-label="Deal" className="max-w-48" />
        <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="Value" className="max-w-28" />
        <Btn type="submit">Add</Btn>
      </form>
    }>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="w-64 shrink-0"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("deal");
              if (id) move(id, stage);
            }}
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-mist">{stage}</p>
            <div className="space-y-2">
              {data.deals.filter((d) => d.stage === stage).map((deal) => (
                <article key={deal.id} draggable onDragStart={(e) => e.dataTransfer.setData("deal", deal.id)} className="card p-3">
                  <p className="font-medium">{deal.title}</p>
                  <p className="text-sm text-mist">{data.contacts.find((c) => c.id === deal.contactId)?.name}</p>
                  <p className="mt-2 font-display text-2xl">{money(deal.value)}</p>
                  <Select className="mt-2" value={deal.stage} aria-label={`Move ${deal.title}`} onChange={(e) => move(deal.id, e.target.value)}>
                    {STAGES.map((s) => <option key={s}>{s}</option>)}
                  </Select>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Lists() {
  const data = useRidge((s) => s.data);
  const merge = useRidge((s) => s.merge);
  const rules = [
    { name: "Hot leads", rows: data.contacts.filter((c) => c.score >= 70 && c.status !== "customer") },
    { name: "Customers", rows: data.contacts.filter((c) => c.tags.includes("customer")) },
    { name: "Sandy Beach", rows: data.contacts.filter((c) => c.city.includes("Sandy")) },
    { name: "Quiet or lost", rows: data.contacts.filter((c) => c.tags.includes("lost") || c.tags.includes("nurture") || c.score < 30) },
  ];
  const dupes = duplicateGroups(data);
  return (
    <Page kicker="Segments" title="Smart lists">
      <div className="grid gap-3 md:grid-cols-2">
        {rules.map((rule) => (
          <Card key={rule.name}>
            <p className="flex items-center justify-between"><span className="font-display text-2xl">{rule.name}</span><Pill>{rule.rows.length}</Pill></p>
            <ul className="mt-3 space-y-1 text-sm">
              {rule.rows.map((c) => <li key={c.id}>{c.name} · {c.score} · {c.source}</li>)}
            </ul>
          </Card>
        ))}
      </div>
      <Card>
        <p className="font-display text-2xl">Duplicate phones</p>
        {dupes.length === 0 ? <p className="mt-2 text-sm text-mist">No shared numbers. Import a repeat and it will land here.</p> : null}
        {dupes.map((ids) => (
          <div key={ids.join()} className="mt-3 flex flex-wrap items-center gap-2">
            {ids.map((id) => <Pill key={id}>{data.contacts.find((c) => c.id === id)?.name}</Pill>)}
            <Btn tone="ghost" onClick={() => merge(ids[0], ids[1])}>Merge into the first</Btn>
          </div>
        ))}
      </Card>
    </Page>
  );
}

export function Tasks() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [title, setTitle] = useState("");
  const [contactId, setContactId] = useState("");
  const plain = usePlain();
  const open = data.tasks.filter((task) => (plain ? !task.done : true));
  if (plain) {
    return (
      <Page kicker="Yard" title="Calls">
        {open.length === 0 ? <p className="text-sm text-mist">No calls. The book adds one when somebody asks for a look.</p> : null}
        <div className="space-y-2">
          {open.map((task) => {
            const person = data.contacts.find((c) => c.id === task.contactId);
            const dial = person?.phone.replace(/[^\d+]/g, "") ?? "";
            return (
              <Card key={task.id} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl">{person?.name ?? task.title}</p>
                  <p className="text-sm text-mist">{person?.phone || task.title}</p>
                </div>
                <div className="flex gap-2">
                  {dial ? <a className="inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink" href={`tel:${dial}`}>Call</a> : null}
                  <Btn tone="quiet" onClick={() => api.toggleTask(task.id)}>Called</Btn>
                </div>
              </Card>
            );
          })}
        </div>
      </Page>
    );
  }
  return (
    <Page kicker="Work" title="Tasks">
      <form className="mb-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); api.addTask(title, contactId || undefined, api.sessionId ?? data.staff[0].id); setTitle(""); }}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What has to happen" aria-label="Task" />
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="About">
          <option value="">No contact</option>
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Btn type="submit">Add</Btn>
      </form>
      <div className="space-y-2">
        {data.tasks.map((task) => (
          <Card key={task.id} className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className={task.done ? "text-mist line-through" : ""}>{task.title}</p>
              <p className="text-xs text-mist">{when(task.due)} · {data.staff.find((s) => s.id === task.ownerId)?.name}</p>
            </div>
            <div className="flex gap-2">
              {task.payload && !task.done ? <Btn onClick={() => api.sendPayload(task.id)}>Send this touch</Btn> : null}
              <Btn tone="ghost" onClick={() => api.toggleTask(task.id)}>{task.done ? "Reopen" : "Done"}</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}
