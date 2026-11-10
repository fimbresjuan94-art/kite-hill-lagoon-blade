import { fire } from "./engine";
import { uid } from "./format";
import type { Appointment, Chatter, Closer, CloserSession, Contact, Deal, RidgeData, SfLead, Thread } from "./types";

const WEST = new Set(["Glendale", "Peoria", "Goodyear", "Avondale", "Tolleson", "Maricopa"]);

const BOOKED: [string, string, string, string, string, string, string][] = [];

export function territoryOwner(city: string, luz: string, mateo: string) {
  return WEST.has(city) ? mateo : luz;
}

export function priceGuess(service: string) {
  const s = service.toLowerCase();
  if (s.includes("pool")) return 6400;
  if (s.includes("grad")) return 4200;
  if (s.includes("demo") || s.includes("concrete")) return 3100;
  if (s.includes("tree") || s.includes("clear")) return 2800;
  if (s.includes("dirt") || s.includes("haul")) return 1900;
  if (s.includes("foot") || s.includes("post")) return 1600;
  if (s.includes("pad") || s.includes("excav")) return 5400;
  return 2400;
}

export function planSlots(count: number) {
  const hours = [8, 10, 13, 15];
  const out: string[] = [];
  for (let day = 0; day < 21 && out.length < count; day += 1) {
    const d = new Date();
    d.setDate(d.getDate() + day);
    if (d.getDay() === 0) continue;
    for (const hour of hours) {
      const slot = new Date(d);
      slot.setHours(hour, hour === 13 ? 30 : 0, 0, 0);
      if (slot.getTime() < Date.now() + 20 * 60 * 1000) continue;
      out.push(slot.toISOString());
      if (out.length >= count) break;
    }
  }
  return out;
}

export function nextSlot(data: RidgeData) {
  const hours = [8, 10, 13, 15];
  for (let day = 0; day < 21; day += 1) {
    const d = new Date();
    d.setDate(d.getDate() + day);
    if (d.getDay() === 0) continue;
    for (const hour of hours) {
      const slot = new Date(d);
      slot.setHours(hour, hour === 13 ? 30 : 0, 0, 0);
      if (slot.getTime() < Date.now() + 20 * 60 * 1000) continue;
      const taken = data.appointments.some((a) => {
        if (a.kind === "Job") return false;
        return Math.abs(new Date(a.start).getTime() - slot.getTime()) < 45 * 60 * 1000;
      });
      if (!taken) return slot.toISOString();
    }
  }
  return null;
}

function closers(): Closer[] {
  return [
    { id: "cl_mira", name: "Mira", channel: "phone", lang: "English", status: "on", window: "7a–7p local", capPerHour: 8 },
    { id: "cl_luca", name: "Luca", channel: "chat", lang: "English", status: "on", window: "24/7", capPerHour: 20 },
    { id: "cl_vega", name: "Vega", channel: "sms", lang: "Spanish", status: "on", window: "24/7", capPerHour: 12 },
    { id: "cl_noa", name: "Noa", channel: "video", lang: "English", status: "on", window: "24/7", capPerHour: 6 },
  ];
}

function endOf(start: string) {
  return new Date(new Date(start).getTime() + 75 * 60 * 1000).toISOString();
}

export function cdigsLayer(luz: string, mateo: string, owner: string) {
  const slots = planSlots(BOOKED.length);
  const now = new Date().toISOString();
  const contacts: Contact[] = [];
  const deals: Deal[] = [];
  const appointments: Appointment[] = [];
  const threads: Thread[] = [];
  const sfLeads: SfLead[] = [];
  const closerIds = ["cl_mira", "cl_luca", "cl_vega", "cl_noa"];

  BOOKED.forEach((row, index) => {
    const [name, phone, email, address, city, service, detail] = row;
    const n = String(index + 1).padStart(2, "0");
    const id = `c_cd${n}`;
    const staffId = territoryOwner(city, luz, mateo);
    const closerId = closerIds[index % closerIds.length];
    const start = slots[index] ?? slots[slots.length - 1];
    contacts.push({
      id,
      name,
      phone,
      email,
      address,
      city,
      tags: ["estimate", "cdigs.bid", city.toLowerCase()],
      score: 72 + (index % 18),
      source: "cdigs.bid",
      ownerId: staffId,
      status: "lead",
      notes: `${detail}. Booked by the closer floor off cdigs.bid. Free estimate visit, not a dig yet.`,
      gate: "",
      soil: "",
      createdAt: now,
    });
    deals.push({
      id: `d_cd${n}`,
      title: `${service} — ${city}`,
      contactId: id,
      value: priceGuess(service),
      stage: "Site visit",
      ownerId: staffId,
      source: "cdigs.bid",
      updatedAt: now,
    });
    appointments.push({
      id: `ap_cd${n}`,
      title: `Estimate · ${service}`,
      contactId: id,
      staffId,
      start,
      end: endOf(start),
      kind: "Estimate",
      status: "booked",
      source: "cdigs.bid",
      bookedBy: closerId,
    });
    const agent = closerId === "cl_vega" ? "Vega" : closerId === "cl_luca" ? "Luca" : closerId === "cl_noa" ? "Noa" : "Mira";
    threads.push({
      id: `th_cd${n}`,
      contactId: id,
      unread: false,
      messages: [
        {
          id: `m_cd${n}`,
          dir: "out",
          channel: closerId === "cl_vega" ? "sms" : closerId === "cl_luca" ? "webchat" : "sms",
          body:
            closerId === "cl_vega"
              ? `${name.split(" ")[0]}, su visita de estimado está en el calendario. CD Services — cdigs.bid. Responda STOP para salir.`
              : `${name.split(" ")[0]}, your free estimate visit is booked. ${agent} at CD Services. We'll text before we roll. Reply STOP to opt out.`,
          at: now,
        },
      ],
    });
    sfLeads.push({
      id: `sf_cd${n}`,
      name,
      company: "Homeowner",
      phone,
      email,
      city,
      source: "cdigs.bid",
      status: "Converted",
      score: 72 + (index % 18),
      ownerId: staffId,
      service,
    });
  });

  const queue: CloserSession[] = [
    {
      id: "ses_dana",
      closerId: "cl_mira",
      name: "Dana Okonkwo",
      phone: "623-555-2180",
      email: "dana.okonkwo@example.com",
      city: "Goodyear",
      address: "1680 S Cotton Ln",
      service: "Grading",
      detail: "Side yard holding water after rain",
      channel: "phone",
      intent: 84,
      stage: "booking",
      outcome: "book",
      beat: 2,
      at: now,
      transcript: [
        { who: "agent", text: "CD Services, this is Mira. You asked for a free estimate on cdigs.bid. What do you need moved?" },
        { who: "lead", text: "The side yard holds water. I need it graded before I pour a patio." },
        { who: "agent", text: "We cover Goodyear. I can put a free estimate visit on the book. I'll lock the next open window." },
      ],
    },
    {
      id: "ses_chris",
      closerId: "cl_luca",
      name: "Chris Adelman",
      phone: "480-555-2181",
      email: "chris.adelman@example.com",
      city: "Scottsdale",
      address: "10420 E Cactus",
      service: "Pool excavation",
      detail: "Wants the owner on the visit. Access is a side gate.",
      channel: "chat",
      intent: 91,
      stage: "handoff",
      outcome: "handoff",
      beat: 3,
      at: now,
      transcript: [
        { who: "agent", text: "Luca here, on cdigs.bid. Pool, trench, or a pad?" },
        { who: "lead", text: "Pool shell. I want a person from the company on the walk, not just a text." },
        { who: "agent", text: "You're qualified. I'm putting you in the waiting room so the owner can take the visit." },
      ],
    },
    {
      id: "ses_rosa",
      closerId: "cl_vega",
      name: "Rosa Ibarra",
      phone: "480-555-2182",
      email: "rosa.ibarra@example.com",
      city: "Mesa",
      address: "640 S Dobson",
      service: "Trenching",
      detail: "Zanja para agua y eléctrico",
      channel: "sms",
      intent: 77,
      stage: "queued",
      outcome: "book",
      beat: 0,
      at: now,
      transcript: [],
    },
    {
      id: "ses_evan",
      closerId: "cl_noa",
      name: "Evan Cho",
      phone: "602-555-2183",
      email: "evan.cho@example.com",
      city: "Phoenix",
      address: "1910 W Camelback",
      service: "Demolition",
      detail: "Garage slab. Needs a haul price.",
      channel: "video",
      intent: 80,
      stage: "queued",
      outcome: "book",
      beat: 0,
      at: now,
      transcript: [],
    },
    {
      id: "ses_kelly",
      closerId: "cl_mira",
      name: "Kelly Nguyen",
      phone: "480-555-2184",
      email: "kelly.nguyen@example.com",
      city: "Tempe",
      address: "55 W 6th St",
      service: "Footings",
      detail: "No answer expected. Leave a voicemail and a text.",
      channel: "phone",
      intent: 40,
      stage: "queued",
      outcome: "vm",
      beat: 0,
      at: now,
      transcript: [],
    },
    {
      id: "ses_paul",
      closerId: "cl_luca",
      name: "Paul Ruiz",
      phone: "623-555-2185",
      email: "paul.ruiz@example.com",
      city: "Avondale",
      address: "1220 N Dysart",
      service: "Land clearing",
      detail: "Asked for a callback after 5.",
      channel: "chat",
      intent: 55,
      stage: "queued",
      outcome: "callback",
      beat: 0,
      at: now,
      transcript: [],
    },
    {
      id: "ses_anita",
      closerId: "cl_vega",
      name: "Anita Desai",
      phone: "623-555-2186",
      email: "anita.desai@example.com",
      city: "Tolleson",
      address: "8501 W Van Buren",
      service: "Dirt removal",
      detail: "Pile from a pool dig next door.",
      channel: "sms",
      intent: 73,
      stage: "queued",
      outcome: "book",
      beat: 0,
      at: now,
      transcript: [],
    },
  ];

  sfLeads.push(
    {
      id: "sf_dana",
      name: "Dana Okonkwo",
      company: "Homeowner",
      phone: "623-555-2180",
      email: "dana.okonkwo@example.com",
      city: "Goodyear",
      source: "cdigs.bid",
      status: "Qualified",
      score: 84,
      ownerId: mateo,
      service: "Grading",
    },
    {
      id: "sf_chris",
      name: "Chris Adelman",
      company: "Homeowner",
      phone: "480-555-2181",
      email: "chris.adelman@example.com",
      city: "Scottsdale",
      source: "cdigs.bid",
      status: "Working",
      score: 91,
      ownerId: owner,
      service: "Pool excavation",
    },
    {
      id: "sf_rosa",
      name: "Rosa Ibarra",
      company: "Homeowner",
      phone: "480-555-2182",
      email: "rosa.ibarra@example.com",
      city: "Mesa",
      source: "cdigs.bid",
      status: "New",
      score: 77,
      ownerId: luz,
      service: "Trenching",
    },
    {
      id: "sf_blake",
      name: "Blake Turner",
      company: "Homeowner",
      phone: "602-555-2199",
      email: "blake.turner@example.com",
      city: "Phoenix",
      source: "cdigs.bid",
      status: "Unqualified",
      score: 12,
      ownerId: owner,
      service: "Something else",
    },
  );

  const chatter: Chatter[] = [
    {
      id: "ch1",
      author: "Mira",
      text: "Estimate book is loaded from cdigs.bid. East valley sits with Luz. West valley sits with Mateo.",
      at: now,
      record: "Estimate calendar",
    },
    {
      id: "ch2",
      author: "Luca",
      text: "Chris Adelman is in the waiting room. Pool shell in Scottsdale. He asked for a person, not another text.",
      at: now,
      record: "Chris Adelman",
    },
    {
      id: "ch3",
      author: "Assignment rule",
      text: "cdigs.bid leads: Scottsdale, Mesa, Tempe, Phoenix → Luz Ortega. Glendale, Peoria, Goodyear, Avondale, Tolleson, Maricopa → Mateo Rios. Owner takes waiting-room handoffs.",
      at: now,
      record: "Territories",
    },
  ];

  return {
    contacts,
    deals,
    appointments,
    threads,
    closers: closers(),
    sessions: queue,
    sfLeads,
    chatter,
  };
}

function inCallingWindow(data: RidgeData, channel: CloserSession["channel"]) {
  if (channel !== "phone") return true;
  const hour = new Date().getHours();
  return hour >= (data.settings.callingStart ?? 7) && hour < (data.settings.callingEnd ?? 19);
}

function patchSession(data: RidgeData, id: string, patch: Partial<CloserSession>) {
  return {
    ...data,
    sessions: data.sessions.map((s) => (s.id === id ? { ...s, ...patch, at: new Date().toISOString() } : s)),
  };
}

function logLine(data: RidgeData, text: string, kind: string) {
  return {
    ...data,
    activity: [{ id: uid("a"), at: new Date().toISOString(), text, kind }, ...data.activity].slice(0, 200),
  };
}

export function bookSession(data: RidgeData, session: CloserSession, actor: string): RidgeData {
  if (session.stage === "booked" || session.stage === "optout") return data;
  const slot = nextSlot(data);
  if (!slot) {
    return logLine(
      patchSession(data, session.id, {
        stage: "callback",
        transcript: [...session.transcript, { who: "agent", text: "The estimate book is full for this window. I'll hold a callback." }],
      }),
      `${actor} held ${session.name} — no open estimate slot`,
      "closer",
    );
  }
  const phone = session.phone.replace(/\D/g, "");
  const existing = data.contacts.find((c) => c.phone.replace(/\D/g, "") === phone);
  const contactId = existing?.id ?? uid("c");
  const luz = data.staff.find((s) => s.role === "estimator")?.id ?? data.staff[0]?.id ?? "";
  const mateo = data.staff.find((s) => s.role === "dispatcher")?.id ?? luz;
  const ownerId = territoryOwner(session.city, luz, mateo);
  const closer = data.closers.find((c) => c.id === session.closerId);
  const when = new Date(slot).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  const confirm =
    session.closerId === "cl_vega"
      ? `${session.name.split(" ")[0]}, su visita de estimado quedó para ${when}. CD Services, cdigs.bid. Responda STOP para salir.`
      : `${session.name.split(" ")[0]}, you're booked for a free estimate ${when}. ${closer?.name ?? "CD Services"} put it on the calendar from cdigs.bid. Reply STOP to opt out.`;
  const contact: Contact = existing ?? {
    id: contactId,
    name: session.name,
    phone: session.phone,
    email: session.email,
    address: session.address,
    city: session.city,
    tags: ["estimate", "cdigs.bid"],
    score: session.intent,
    source: "cdigs.bid",
    ownerId,
    status: "lead",
    notes: session.detail,
    gate: "",
    soil: "",
    createdAt: new Date().toISOString(),
  };
  const deal: Deal = {
    id: uid("d"),
    title: `${session.service} — ${session.city}`,
    contactId,
    value: priceGuess(session.service),
    stage: "Site visit",
    ownerId,
    source: "cdigs.bid",
    updatedAt: new Date().toISOString(),
  };
  const appointment: Appointment = {
    id: uid("ap"),
    title: `Estimate · ${session.service}`,
    contactId,
    staffId: ownerId,
    start: slot,
    end: endOf(slot),
    kind: "Estimate",
    status: "booked",
    source: "cdigs.bid",
    bookedBy: session.closerId,
  };
  const thread: Thread = {
    id: uid("th"),
    contactId,
    unread: false,
    messages: [{ id: uid("m"), dir: "out", channel: session.channel === "chat" ? "webchat" : "sms", body: confirm, at: new Date().toISOString() }],
  };
  let next: RidgeData = {
    ...data,
    contacts: existing ? data.contacts : [contact, ...data.contacts],
    deals: [deal, ...data.deals],
    appointments: [appointment, ...data.appointments],
    threads: existing ? data.threads : [thread, ...data.threads],
    sessions: data.sessions.map((s) =>
      s.id === session.id
        ? {
            ...s,
            stage: "booked" as const,
            contactId,
            appointmentId: appointment.id,
            beat: s.beat + 1,
            at: new Date().toISOString(),
            transcript: [...s.transcript, { who: "agent" as const, text: confirm }, { who: "lead" as const, text: "Yes. Book it." }],
          }
        : s,
    ),
    sfLeads: data.sfLeads.map((l) => (l.phone === session.phone ? { ...l, status: "Converted" as const, score: session.intent } : l)),
    chatter: [
      {
        id: uid("ch"),
        author: closer?.name ?? actor,
        text: `Booked ${session.name} — ${session.service} in ${session.city} — ${when}. Source cdigs.bid.`,
        at: new Date().toISOString(),
        record: session.name,
      },
      ...data.chatter,
    ],
  };
  if (!next.sfLeads.some((l) => l.phone === session.phone)) {
    next = {
      ...next,
      sfLeads: [
        {
          id: uid("sf"),
          name: session.name,
          company: "Homeowner",
          phone: session.phone,
          email: session.email,
          city: session.city,
          source: "cdigs.bid",
          status: "Converted",
          score: session.intent,
          ownerId,
          service: session.service,
        },
        ...next.sfLeads,
      ],
    };
  }
  next = logLine(next, `${closer?.name ?? actor} booked ${session.name} on the estimate calendar`, "closer");
  return fire(next, "appointment.booked", { contactId, dealId: deal.id }, closer?.name ?? actor);
}

function advance(data: RidgeData, session: CloserSession, actor: string): RidgeData {
  if (!inCallingWindow(data, session.channel) && session.stage !== "booking") {
    return data;
  }
  const closer = data.closers.find((c) => c.id === session.closerId);
  if (closer?.status === "paused") return data;
  const first = session.name.split(" ")[0];
  if (session.beat <= 0) {
    const ask =
      session.closerId === "cl_vega"
        ? `${first}, soy Vega de CD Services. Vi su solicitud en cdigs.bid. ¿Qué hay que excavar o mover?`
        : `${first}, this is ${closer?.name ?? "CD Services"}. You reached us on cdigs.bid. What do you need dug or hauled?`;
    return patchSession(data, session.id, {
      stage: "qualifying",
      beat: 1,
      transcript: [...session.transcript, { who: "agent", text: ask }],
    });
  }
  if (session.beat === 1) {
    const reply =
      session.closerId === "cl_vega"
        ? `${session.detail}. Estoy en ${session.city}.`
        : `${session.detail}. I'm in ${session.city}.`;
    return patchSession(data, session.id, {
      stage: session.outcome === "vm" ? "voicemail" : "qualifying",
      beat: 2,
      transcript: [
        ...session.transcript,
        {
          who: "lead",
          text: session.outcome === "vm" ? "(no answer — voicemail)" : reply,
        },
      ],
    });
  }
  if (session.outcome === "vm") {
    const text = `${first}, this is ${closer?.name ?? "CD Services"}. We can walk the site for a free estimate. Reply with a day or STOP to opt out.`;
    return logLine(
      patchSession(data, session.id, {
        stage: "voicemail",
        beat: 3,
        transcript: [...session.transcript, { who: "agent", text: text }],
      }),
      `${closer?.name ?? actor} left a voicemail for ${session.name}`,
      "closer",
    );
  }
  if (session.outcome === "optout") {
    return logLine(
      patchSession(data, session.id, {
        stage: "optout",
        beat: 3,
        transcript: [...session.transcript, { who: "lead", text: "Stop calling." }],
      }),
      `${session.name} opted out. Closers will not dial this number.`,
      "closer",
    );
  }
  if (session.outcome === "handoff") {
    return logLine(
      patchSession(data, session.id, {
        stage: "handoff",
        beat: 3,
        intent: Math.max(session.intent, 80),
        transcript: [...session.transcript, { who: "agent", text: "You're ready. A person from CD Services is taking this visit." }],
      }),
      `${closer?.name ?? actor} parked ${session.name} in the waiting room`,
      "closer",
    );
  }
  if (session.outcome === "callback") {
    return logLine(
      patchSession(data, session.id, {
        stage: "callback",
        beat: 3,
        transcript: [...session.transcript, { who: "lead", text: "Call me after 5." }, { who: "agent", text: "Callback is on the book. We won't dial again before then." }],
      }),
      `${closer?.name ?? actor} set a callback for ${session.name}`,
      "closer",
    );
  }
  return bookSession(data, session, actor);
}

export function stepFloor(data: RidgeData, actor = "Closer"): RidgeData {
  if (!data.settings?.closersLive) return data;
  if (!data.sessions?.length || !data.closers?.length) return data;
  const live = data.sessions.find((s) => s.stage === "dialing" || s.stage === "qualifying" || s.stage === "booking");
  if (live) return advance(data, live, actor);
  const queued = data.sessions.find((s) => s.stage === "queued" && inCallingWindow(data, s.channel) && data.closers.find((c) => c.id === s.closerId)?.status !== "paused");
  if (!queued) return data;
  return advance(data, { ...queued, stage: "dialing" }, actor);
}

export function handoffToVisit(data: RidgeData, sessionId: string, actor: string) {
  const session = data.sessions.find((s) => s.id === sessionId);
  if (!session || session.stage === "booked") return data;
  return bookSession(data, { ...session, outcome: "book", stage: "booking" }, actor);
}
