import { Btn, Card, Field, Input, Page, Pill, Select, Area, usePlain } from "@/components/ridge/ui";
import { invoiceDue, invoiceTotal } from "@/lib/ridge/engine";
import { download, useRidge } from "@/lib/ridge/store";
import { money, when } from "@/lib/ridge/format";
import { useState } from "react";

export function Invoices() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [jobId, setJobId] = useState(data.jobs.find((j) => j.status === "done")?.id ?? data.jobs[0]?.id ?? "");
  const plain = usePlain();
  if (plain) {
    const owed = data.invoices.filter((inv) => inv.status !== "paid");
    return (
      <Page kicker="Yard" title="Money">
        {owed.length === 0 ? <p className="text-sm text-mist">Nobody owes. Finished dirt shows up here.</p> : null}
        <div className="space-y-2">
          {owed.map((inv) => (
            <Card key={inv.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{data.contacts.find((c) => c.id === inv.contactId)?.name ?? inv.number}</p>
                <p className="text-sm text-mist">{money(invoiceDue(data, inv))} · {inv.status}</p>
              </div>
              {inv.status === "draft" ? <Btn onClick={() => api.sendInvoice(inv.id)}>Send</Btn> : <Btn onClick={() => api.recordPayment(inv.id, "cash")}>Paid</Btn>}
            </Card>
          ))}
        </div>
      </Page>
    );
  }
  return (
    <Page kicker="Cash" title="Invoices" action={
      <div className="flex flex-wrap gap-2">
        <Select value={jobId} onChange={(e) => setJobId(e.target.value)} aria-label="Job">
          {data.jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </Select>
        <Btn onClick={() => api.makeInvoice(jobId)}>Invoice the job</Btn>
        <Btn tone="ghost" onClick={() => {
          const header = "number,customer,status,total,due\n";
          const body = data.invoices.map((inv) => [inv.number, data.contacts.find((c) => c.id === inv.contactId)?.name, inv.status, invoiceTotal(inv), inv.dueAt].join(",")).join("\n");
          download("cd-services-invoices.csv", header + body, "text/csv");
        }}>Export CSV</Btn>
      </div>
    }>
      <div className="space-y-2">
        {data.invoices.map((inv) => (
          <Card key={inv.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p>{inv.number} · {data.contacts.find((c) => c.id === inv.contactId)?.name}</p>
              <p className="text-sm text-mist">{money(invoiceTotal(inv))} · due {when(inv.dueAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill hot={inv.status === "overdue" || inv.status === "paid"}>{inv.status}</Pill>
              {inv.status === "draft" ? <Btn onClick={() => api.sendInvoice(inv.id)}>Send</Btn> : null}
              {inv.status !== "paid" && inv.status !== "draft" ? <Btn tone="quiet" onClick={() => api.recordPayment(inv.id, "cash")}>Mark paid</Btn> : null}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Payments() {
  const data = useRidge((s) => s.data);
  const pay = useRidge((s) => s.recordPayment);
  const open = data.invoices.filter((i) => i.status !== "paid" && i.status !== "draft");
  return (
    <Page kicker="Ledger" title="Payments">
      <p className="text-sm text-mist">Write down money already collected on a job. Cash or check.</p>
      <div className="mt-3 space-y-2">
        {open.map((inv) => (
          <Card key={inv.id} className="flex flex-wrap gap-2">
            <p className="w-full">{inv.number} · {money(invoiceDue(data, inv))}</p>
            {["cash", "check"].map((method) => (
              <Btn key={method} tone="quiet" onClick={() => pay(inv.id, method)}>{method}</Btn>
            ))}
          </Card>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {data.payments.map((p) => {
          const inv = data.invoices.find((i) => i.id === p.invoiceId);
          return <Card key={p.id} className="flex justify-between"><span>{inv?.number} · {p.method}</span><span>{money(p.amount)}</span></Card>;
        })}
      </div>
    </Page>
  );
}

export function Plans() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addPlan);
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [name, setName] = useState("Seasonal check");
  const [price, setPrice] = useState(450);
  return (
    <Page kicker="Recurring" title="Service plans">
      <form className="mb-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); add(contactId, name, price, "Quarterly"); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Input value={name} onChange={(e) => setName(e.target.value)} aria-label="Plan" />
        <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} aria-label="Price" className="max-w-28" />
        <Btn type="submit">Add plan</Btn>
      </form>
      <div className="grid gap-3 md:grid-cols-2">
        {data.plans.map((plan) => (
          <Card key={plan.id}>
            <p className="font-display text-2xl">{plan.name}</p>
            <p className="text-sm text-mist">{data.contacts.find((c) => c.id === plan.contactId)?.name}</p>
            <p className="mt-2">{money(plan.price)} · {plan.cadence}</p>
            <p className="text-sm text-mist">Next {when(plan.next)}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Tickets() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [subject, setSubject] = useState("");
  return (
    <Page kicker="Service" title="Tickets">
      <form className="mb-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (!subject) return; api.addTicket(contactId, subject, "normal"); setSubject(""); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What broke" aria-label="Subject" />
        <Btn type="submit">Open</Btn>
      </form>
      <div className="space-y-2">
        {data.tickets.map((ticket) => {
          const age = Math.max(0, Math.round((Date.now() - new Date(ticket.openedAt).getTime()) / 36e5));
          const late = ticket.status !== "solved" && age > ticket.slaHours;
          return (
            <Card key={ticket.id} className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p>{ticket.subject}</p>
                <p className="text-sm text-mist">{data.contacts.find((c) => c.id === ticket.contactId)?.name} · {age}h open · SLA {ticket.slaHours}h</p>
              </div>
              <div className="flex gap-2">
                <Pill hot={late}>{late ? "SLA blown" : ticket.status}</Pill>
                <Select value={ticket.status} aria-label="Status" onChange={(e) => api.setTicket(ticket.id, e.target.value as "open" | "pending" | "solved")}>
                  <option value="open">open</option>
                  <option value="pending">pending</option>
                  <option value="solved">solved</option>
                </Select>
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

export function Knowledge() {
  const articles = useRidge((s) => s.data.articles);
  const [q, setQ] = useState("");
  const [id, setId] = useState(articles[0]?.id ?? "");
  const rows = articles.filter((a) => `${a.title} ${a.body} ${a.category}`.toLowerCase().includes(q.toLowerCase()));
  const article = articles.find((a) => a.id === id) ?? rows[0];
  return (
    <Page kicker="Playbooks" title="Knowledge">
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the yard" aria-label="Search knowledge" />
      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-2">
          {rows.map((a) => (
            <button key={a.id} onClick={() => setId(a.id)} className="card w-full p-3 text-left">
              <span className="text-xs uppercase tracking-widest text-copper">{a.kind} · {a.category}</span>
              <span className="block">{a.title}</span>
            </button>
          ))}
        </div>
        {article ? <Card><p className="font-display text-3xl">{article.title}</p><p className="mt-3 leading-6">{article.body}</p></Card> : null}
      </div>
    </Page>
  );
}

export function Surveys() {
  const data = useRidge((s) => s.data);
  const record = useRidge((s) => s.recordSurvey);
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [kind, setKind] = useState<"CSAT" | "NPS">("CSAT");
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");
  const csat = data.surveys.filter((s) => s.kind === "CSAT");
  const avg = csat.length ? csat.reduce((s, r) => s + r.score, 0) / csat.length : 0;
  return (
    <Page kicker="Voice of customer" title="CSAT and NPS">
      <p className="text-sm text-mist">CSAT average {avg ? avg.toFixed(1) : "—"} on {csat.length} scores.</p>
      <form className="mt-3 grid gap-2 md:grid-cols-4" onSubmit={(e) => { e.preventDefault(); record({ contactId, kind, score, comment }); setComment(""); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Select value={kind} onChange={(e) => setKind(e.target.value as "CSAT" | "NPS")} aria-label="Kind">
          <option value="CSAT">CSAT</option>
          <option value="NPS">NPS</option>
        </Select>
        <Input type="number" value={score} onChange={(e) => setScore(Number(e.target.value))} aria-label="Score" />
        <Btn type="submit">Record</Btn>
        <Area className="md:col-span-4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment" aria-label="Comment" />
      </form>
      <div className="mt-3 space-y-2">
        {data.surveys.map((s) => (
          <Card key={s.id}><p>{s.kind} {s.score} · {data.contacts.find((c) => c.id === s.contactId)?.name}</p><p className="text-sm text-mist">{s.comment}</p></Card>
        ))}
      </div>
    </Page>
  );
}

export function Academy() {
  const courses = useRidge((s) => s.data.courses);
  const toggle = useRidge((s) => s.toggleCourse);
  return (
    <Page kicker="Crew academy" title="Lessons">
      <div className="grid gap-3 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id}>
            <p className="text-xs uppercase tracking-widest text-mist">{course.forRole} · {course.minutes} min</p>
            <p className="font-display text-2xl">{course.title}</p>
            <Btn className="mt-3" tone={course.done ? "quiet" : "primary"} onClick={() => toggle(course.id)}>{course.done ? "Completed" : "Mark done"}</Btn>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Board() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addBoard);
  const [text, setText] = useState("");
  return (
    <Page kicker="Crew" title="Board">
      <form className="mb-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; add(text); setText(""); }}>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tell the yard" aria-label="Post" />
        <Btn type="submit">Post</Btn>
      </form>
      <div className="space-y-2">
        {data.board.map((post) => (
          <Card key={post.id}>
            <p>{post.text}</p>
            <p className="mt-1 text-xs text-mist">{data.staff.find((s) => s.id === post.authorId)?.name} · {when(post.at)}</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

void Field;
