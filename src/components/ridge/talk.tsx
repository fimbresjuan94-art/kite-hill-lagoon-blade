import { EstimateWeek } from "@/components/ridge/close";
import { Area, Btn, Card, Field, Input, Page, Pill, Select, usePlain } from "@/components/ridge/ui";
import { rioDraft } from "@/lib/ridge/engine";
import { money, when } from "@/lib/ridge/format";
import { useRidge } from "@/lib/ridge/store";
import type { Campaign } from "@/lib/ridge/types";
import { useState } from "react";

const PRESETS = [
  { label: "On my way", body: "On the way. The crew just left the yard." },
  { label: "Estimate", body: "Your written price is in the portal. Good, better, and best." },
  { label: "Review", body: "If we earned it, a short review helps the next person find us." },
  { label: "Spanish", body: "Hola, somos Carranza Dig. ¿Quiere que pasemos a ver el terreno esta semana?" },
];

export function Inbox() {
  const data = useRidge((s) => s.data);
  const send = useRidge((s) => s.sendMessage);
  const markRead = useRidge((s) => s.markRead);
  const threads = [...data.threads].sort((a, b) => Number(b.id.startsWith("rpt_")) - Number(a.id.startsWith("rpt_")));
  const [id, setId] = useState(threads.find((t) => t.unread)?.id ?? threads[0]?.id ?? "");
  const [channel, setChannel] = useState("sms");
  const [body, setBody] = useState("");
  const thread = data.threads.find((t) => t.id === id);
  const contact = data.contacts.find((c) => c.id === thread?.contactId);
  const title = thread?.title || contact?.name || "Thread";
  return (
    <Page kicker="Unified inbox" title="Conversations">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-2">
          {threads.map((t) => {
            const person = data.contacts.find((c) => c.id === t.contactId);
            const last = t.messages[t.messages.length - 1];
            return (
              <button key={t.id} onClick={() => { setId(t.id); markRead(t.id); }} className={`card w-full p-3 text-left ${t.id === id ? "ring-1 ring-copper" : ""}`}>
                <span className="flex items-center justify-between"><span>{t.title || person?.name || "Thread"}</span>{t.unread ? <Pill hot>New</Pill> : null}</span>
                <span className="mt-1 block truncate text-sm text-mist">{last?.body}</span>
              </button>
            );
          })}
        </div>
        {thread ? (
          <Card>
            <p className="font-display text-2xl">{title}</p>
            {contact ? <p className="text-sm text-mist">{contact.phone} · {contact.email}</p> : <p className="text-sm text-mist">Filed for the owner. Numbers from the book only.</p>}
            <div className="mt-4 max-h-96 space-y-2 overflow-y-auto">
              {thread.messages.map((m) => (
                <div key={m.id} className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${m.dir === "out" ? "ml-auto bg-copper text-copper-ink" : "bg-panel"}`}>
                  <p className="text-xs opacity-70">{m.channel} · {when(m.at)}</p>
                  <p className="whitespace-pre-wrap">{m.body}</p>
                </div>
              ))}
            </div>
            {contact ? (
              <>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <Btn key={p.label} tone="quiet" onClick={() => setBody(p.body)}>{p.label}</Btn>
                  ))}
                  <Btn tone="ghost" onClick={() => setBody(rioDraft(data, contact.id))}>Rio draft</Btn>
                </div>
                <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); if (!body.trim()) return; send(contact.id, channel, body); setBody(""); }}>
                  <Select value={channel} onChange={(e) => setChannel(e.target.value)} aria-label="Channel">
                    {["sms", "email", "whatsapp", "facebook", "instagram", "webchat", "google"].map((c) => <option key={c}>{c}</option>)}
                  </Select>
                  <Area value={body} onChange={(e) => setBody(e.target.value)} aria-label="Message" />
                  <Btn type="submit">Send</Btn>
                </form>
              </>
            ) : null}
          </Card>
        ) : null}
      </div>
    </Page>
  );
}

export function Calls() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addCall);
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [notes, setNotes] = useState("Voicemail drop: we can walk the site tomorrow.");
  return (
    <Page kicker="Phone" title="Calls">
      <Card className="mb-3 grid gap-2 md:grid-cols-[1fr_1fr_auto_auto_auto] md:items-end">
        <Field label="Who">
          <Select value={contactId} onChange={(e) => setContactId(e.target.value)}>
            {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
        <Field label="Notes or drop script"><Input value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
        <Btn onClick={() => add(contactId, "missed", notes)}>Missed</Btn>
        <Btn tone="quiet" onClick={() => add(contactId, "answered", notes)}>Answered</Btn>
        <Btn tone="ghost" onClick={() => add(contactId, "voicemail", notes)}>Drop VM</Btn>
      </Card>
      <p className="mb-3 text-sm text-mist">A missed call runs the text-back line. A voicemail drop lands in the inbox. The carrier is not connected yet.</p>
      <div className="space-y-2">
        {data.calls.map((call) => (
          <Card key={call.id} className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p>{data.contacts.find((c) => c.id === call.contactId)?.name} · {call.status}</p>
              <p className="text-sm text-mist">{call.notes}</p>
            </div>
            <Pill>{when(call.at)} · {call.seconds}s</Pill>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Campaigns() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const blank: Campaign = { id: "", name: "", channel: "email", audience: "lead", body: "Hi {{name}}, it's {{company}}.", status: "draft", sent: 0, replies: 0 };
  const [draft, setDraft] = useState(blank);
  return (
    <Page kicker="Marketing" title="Email and ads">
      <Card>
        <p className="font-display text-2xl">Letters sitting in Gmail</p>
        <p className="mt-2 text-sm text-mist">Two drafts are in estimates.carranzadig@gmail.com. They are not sent. Open Drafts and send the ones you want.</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Innovative Custom Pools, admin@icpoolsaz.com. Dirt crew for their pool builds.</li>
          <li>Arizona Pool Builders, poolbuilders.az@gmail.com. Excavation help for their pool jobs.</li>
        </ul>
      </Card>
      <Card>
        <p className="font-display text-2xl">Where the ads go</p>
        <p className="mt-2 text-sm text-mist">Written and ready. They do not run until a Google Ads or Meta account is connected and paid. Nothing here is pretending they are live.</p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>Google search, Phoenix valley: excavation phoenix, pool excavation, grading near me, trench for utilities, dirt removal mesa.</li>
          <li>Headline: Excavation in Phoenix. Own machines. Free look.</li>
          <li>Headline: Pool digs and haul-off. Written price first.</li>
          <li>Google Business post: Digging pools, pads, and trenches across the valley. Ask for a look on cdigs.bid.</li>
          <li>Facebook and Instagram, 25 miles around Phoenix, people interested in home construction, pools, and contractors. Same two headlines. Link cdigs.bid.</li>
        </ul>
      </Card>
      <Card className="mb-3 grid gap-2">
        <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Campaign name" aria-label="Campaign name" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Select value={draft.channel} onChange={(e) => setDraft({ ...draft, channel: e.target.value as Campaign["channel"] })} aria-label="Channel">
            <option value="sms">sms</option>
            <option value="email">email</option>
          </Select>
          <Select value={draft.audience} onChange={(e) => setDraft({ ...draft, audience: e.target.value })} aria-label="Audience">
            {["lead", "customer", "all", "nurture", "new"].map((a) => <option key={a}>{a}</option>)}
          </Select>
        </div>
        <Area value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} aria-label="Body" />
        <Btn onClick={() => { if (!draft.name) return; api.saveCampaign({ ...draft, id: draft.id || `camp_${Date.now()}` }); setDraft(blank); }}>Save draft</Btn>
      </Card>
      <div className="space-y-2">
        {data.campaigns.map((c) => (
          <Card key={c.id} className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p>{c.name}</p>
              <p className="text-sm text-mist">{c.channel} · {c.audience} · sent {c.sent}</p>
            </div>
            <Btn onClick={() => api.sendCampaign(c.id)} disabled={c.status === "sent" && c.sent > 0}>File on the book</Btn>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Reviews() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  return (
    <Page kicker="Reputation" title="Reviews">
      <form className="mb-3 grid gap-2 md:grid-cols-[1fr_8rem_1fr_auto] md:items-end" onSubmit={(e) => { e.preventDefault(); api.addReview(contactId, stars, text || "Solid work.", "Google"); setText(""); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Select value={stars} onChange={(e) => setStars(Number(e.target.value))} aria-label="Stars">
          {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
        </Select>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="What they said" aria-label="Review" />
        <Btn type="submit">Log review</Btn>
      </form>
      <div className="space-y-2">
        {data.reviews.map((review) => {
          const name = data.contacts.find((c) => c.id === review.contactId)?.name ?? "";
          return (
            <Card key={review.id}>
              <p className="flex flex-wrap items-center gap-2">{name} <Pill hot={review.stars >= 4}>{review.stars} · {review.source}</Pill></p>
              <p className="mt-2">{review.text}</p>
              {review.reply ? <p className="mt-2 text-sm text-mist">Reply: {review.reply}</p> : (
                <Btn className="mt-3" onClick={() => api.replyReview(review.id, sol(review.stars, name))}>Send Sol's reply</Btn>
              )}
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

function sol(stars: number, name: string) {
  const first = name.split(" ")[0];
  return stars >= 4
    ? `${first}, thank you. We'll keep the lines straight and the price written before we dig.`
    : `${first}, thank you for saying it plain. Call the yard and ask for the owner — we'll walk it with you.`;
}

export function CalendarScreen() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addAppointment);
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [staffId, setStaffId] = useState(data.staff[0]?.id ?? "");
  const [title, setTitle] = useState("Site visit");
  const [start, setStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(9, 0, 0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:00`;
  });
  const plain = usePlain();
  const rows = [...data.appointments].sort((a, b) => a.start.localeCompare(b.start));
  if (plain) {
    return (
      <Page kicker="Yard" title="The book">
        {rows.length === 0 ? <p className="text-sm text-mist">Nothing booked. A request on the site lands here.</p> : null}
        <div className="space-y-2">
          {rows.map((ap) => {
            const person = data.contacts.find((c) => c.id === ap.contactId);
            const dial = person?.phone.replace(/[^\d+]/g, "") ?? "";
            return (
              <Card key={ap.id} className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl">{person?.name ?? ap.title}</p>
                  <p className="text-sm text-mist">{when(ap.start)} · {person?.city || ap.title}</p>
                </div>
                {dial ? <a className="inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink" href={`tel:${dial}`}>Call</a> : null}
              </Card>
            );
          })}
        </div>
      </Page>
    );
  }
  return (
    <Page kicker="cdigs.bid" title="Estimate book">
      <EstimateWeek />
      <p className="text-sm text-mist">Every copper name came off the site. The closers keep filling the next open window. You can still book by hand.</p>
      <form className="mb-3 grid gap-2 md:grid-cols-2" onSubmit={(e) => { e.preventDefault(); add(contactId, staffId, title, new Date(start).toISOString()); }}>
        <Field label="Person">
          <Select value={contactId} onChange={(e) => setContactId(e.target.value)}>
            {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </Field>
        <Field label="With">
          <Select value={staffId} onChange={(e) => setStaffId(e.target.value)}>
            {data.staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
        </Field>
        <Field label="Title"><Input value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="When"><Input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} /></Field>
        <Btn type="submit">Book and confirm</Btn>
      </form>
      <p className="mb-3 text-sm text-mist">Booking fires the visit-confirmation text. Customers can also use the public Book page.</p>
      <div className="space-y-2">
        {[...data.appointments].sort((a, b) => a.start.localeCompare(b.start)).map((ap) => (
          <Card key={ap.id} className="flex flex-wrap justify-between gap-2">
            <div>
              <p>{ap.title}</p>
              <p className="text-sm text-mist">{data.contacts.find((c) => c.id === ap.contactId)?.name} · {data.staff.find((s) => s.id === ap.staffId)?.name}</p>
            </div>
            <Pill>{when(ap.start)} · {ap.status}</Pill>
          </Card>
        ))}
      </div>
    </Page>
  );
}

void money;
