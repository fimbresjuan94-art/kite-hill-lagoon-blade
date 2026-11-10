import { Btn, Card, Field, Input, Page, Pill, Select, usePlain } from "@/components/ridge/ui";
import { estimateTotal, jobMargin, miles, optimize } from "@/lib/ridge/engine";
import { dayKey, dayLabel, money } from "@/lib/ridge/format";
import { todayOffset, useRidge } from "@/lib/ridge/store";
import { loadClip, saveClip, smsHref, spanishText, englishText, telHref } from "@/lib/ridge/media";
import type { Job, JobStatus } from "@/lib/ridge/types";
import { useEffect, useState } from "react";

const STATUSES: JobStatus[] = ["unscheduled", "scheduled", "enroute", "onsite", "hold", "done", "invoiced"];

export function Dispatch() {
  const jobs = useRidge((s) => s.data.jobs);
  const setStatus = useRidge((s) => s.setJobStatus);
  return (
    <Page kicker="Field" title="Dispatch">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {STATUSES.map((status) => (
          <div key={status} className="w-56 shrink-0">
            <p className="mb-2 text-xs uppercase tracking-widest text-mist">{status}</p>
            {jobs.filter((j) => j.status === status).map((job) => (
              <Card key={job.id} className="mb-2">
                <p className="font-medium">{job.title}</p>
                <p className="text-xs text-mist">{job.address}</p>
                <Select className="mt-2" value={job.status} aria-label={job.title} onChange={(e) => setStatus(job.id, e.target.value as JobStatus)}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </Select>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Schedule() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const days = [0, 1, 2, 3, 4];
  const crew = data.staff.filter((s) => s.role === "operator" || s.role === "dispatcher");
  return (
    <Page kicker="Field" title="Schedule">
      <div className="space-y-3">
        {days.map((offset) => {
          const key = dayKey(new Date(Date.now() + offset * 86400000).toISOString());
          const jobs = data.jobs.filter((j) => dayKey(j.start) === key);
          return (
            <Card key={key}>
              <p className="font-display text-2xl">{offset === 0 ? "Today" : dayLabel(offset)}</p>
              {jobs.length === 0 ? <p className="text-sm text-mist">Open board.</p> : null}
              <div className="mt-2 space-y-2">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-xl bg-ink p-3">
                    <p>{job.title} · {job.status}</p>
                    <p className="text-xs text-mist">{job.address}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {crew.map((person) => {
                        const on = job.crewIds.includes(person.id);
                        return (
                          <button key={person.id} className={`min-h-11 rounded-full px-3 text-sm ${on ? "bg-copper text-copper-ink" : "bg-panel text-mist"}`} onClick={() => {
                            const crewIds = on ? job.crewIds.filter((id) => id !== person.id) : [...job.crewIds, person.id];
                            api.assignCrew(job.id, crewIds);
                          }}>{person.name.split(" ")[0]}</button>
                        );
                      })}
                      <Select className="max-w-40" value={offset} aria-label="Day" onChange={(e) => api.moveJobDay(job.id, Number(e.target.value))}>
                        {days.map((d) => <option key={d} value={d}>{dayLabel(d)}</option>)}
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

export function Jobs() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [id, setId] = useState(data.jobs[0]?.id ?? "");
  const job = data.jobs.find((j) => j.id === id) ?? data.jobs[0];
  const plain = usePlain();
  if (!job) return <Page kicker="Yard" title="Dirt"><p className="text-sm text-mist">No dirt on the board.</p></Page>;
  if (plain) {
    return (
      <Page kicker="Yard" title="Dirt">
        <div className="space-y-2">
          {data.jobs.map((row) => (
            <Card key={row.id}>
              <p className="font-display text-2xl">{row.title}</p>
              <p className="text-sm text-mist">{data.contacts.find((c) => c.id === row.contactId)?.name} · {row.address}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Btn tone={row.status === "enroute" ? "primary" : "ghost"} onClick={() => api.setJobStatus(row.id, "enroute")}>On the way</Btn>
                <Btn tone={row.status === "onsite" ? "primary" : "ghost"} onClick={() => api.setJobStatus(row.id, "onsite")}>On the dirt</Btn>
                <Btn tone={row.status === "done" ? "primary" : "quiet"} onClick={() => api.setJobStatus(row.id, "done")}>Done</Btn>
              </div>
            </Card>
          ))}
        </div>
      </Page>
    );
  }
  return (
    <Page kicker="Work orders" title="Jobs">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <div className="space-y-2">
          {data.jobs.map((j) => (
            <button key={j.id} onClick={() => setId(j.id)} className={`card w-full p-3 text-left ${j.id === job.id ? "ring-1 ring-copper" : ""}`}>
              <span className="flex justify-between gap-2"><span>{j.title}</span><Pill>{j.status}</Pill></span>
              <span className="text-sm text-mist">{data.contacts.find((c) => c.id === j.contactId)?.name}</span>
            </button>
          ))}
        </div>
        <JobDetail job={job} />
      </div>
    </Page>
  );
}

function JobDetail({ job }: { job: Job }) {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [loads, setLoads] = useState(job.loads);
  const [dump, setDump] = useState(job.dump);
  const contact = data.contacts.find((c) => c.id === job.contactId);
  return (
    <Card className="space-y-3">
      <div>
        <p className="font-display text-3xl">{job.title}</p>
        <p className="text-sm text-mist">{contact?.name} · {job.address} · gate {contact?.gate || "—"} · {contact?.soil || "soil unknown"}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {STATUSES.map((status) => (
          <Btn key={status} tone={job.status === status ? "primary" : "ghost"} onClick={() => api.setJobStatus(job.id, status)}>{status}</Btn>
        ))}
      </div>
      <ul className="space-y-1">
        {job.checklist.map((item) => (
          <li key={item.id}>
            <label className="flex min-h-11 items-center gap-2 text-sm">
              <input type="checkbox" checked={item.done} onChange={() => api.toggleCheck(job.id, item.id)} />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
      <div className="grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
        <Input type="number" value={loads} onChange={(e) => setLoads(Number(e.target.value))} aria-label="Loads" />
        <Input value={dump} onChange={(e) => setDump(e.target.value)} aria-label="Dump" />
        <Btn tone="quiet" onClick={() => api.setLoads(job.id, loads, dump)}>Save spoil</Btn>
      </div>
      <p className="text-sm text-mist">{job.notes}</p>
      <p className="text-sm">{money(job.price)} price · {job.hours} hours planned</p>
    </Card>
  );
}

export function Routes() {
  const data = useRidge((s) => s.data);
  const setRoute = useRidge((s) => s.setRoute);
  const yard = { lat: 31.3172, lng: -113.5284 };
  const ordered = [...data.jobs].sort((a, b) => a.routeOrder - b.routeOrder);
  const drive = ordered.reduce((sum, job, index) => sum + miles(index === 0 ? yard : ordered[index - 1], job), 0);
  return (
    <Page kicker="Map" title="Routes" action={<Btn onClick={() => setRoute(optimize(data.jobs).map((j) => j.id))}>Optimize from the yard</Btn>}>
      <div className="grid gap-3 lg:grid-cols-2">
        <iframe
          title="Phoenix valley"
          className="h-80 w-full rounded-2xl"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-113.70%2C31.25%2C-113.35%2C31.42&layer=mapnik&marker=31.3172%2C-113.5284"
        />
        <div className="space-y-2">
          <Card>
            <p className="font-display text-3xl">{drive} mi</p>
            <p className="text-sm text-mist">Nearest-neighbor from the yard. Not a live traffic feed.</p>
          </Card>
          {data.pings.map((ping) => (
            <Card key={ping.staffId}>
              <p>{data.staff.find((s) => s.id === ping.staffId)?.name}</p>
              <p className="text-sm text-mist">{ping.status} · {ping.place}</p>
            </Card>
          ))}
          <ol className="space-y-2">
            {ordered.map((job, index) => (
              <li key={job.id} className="text-sm">{index + 1}. {job.title} · {miles(index === 0 ? yard : ordered[index - 1], job)} mi</li>
            ))}
          </ol>
        </div>
      </div>
    </Page>
  );
}

export function Estimates() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [contactId, setContactId] = useState(data.contacts[0]?.id ?? "");
  const [type, setType] = useState("Pool shell");
  const [code, setCode] = useState("");
  const plain = usePlain();
  if (plain) {
    return (
      <Page kicker="Yard" title="Prices">
        {data.estimates.length === 0 ? <p className="text-sm text-mist">No prices yet. Write one after you look at the dirt.</p> : null}
        <div className="space-y-2">
          {data.estimates.map((est) => (
            <Card key={est.id} className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{data.contacts.find((c) => c.id === est.contactId)?.name ?? est.title}</p>
                <p className="text-sm text-mist">{est.title} · {money(estimateTotal(est))}</p>
              </div>
              <div className="flex gap-2">
                <Btn onClick={() => api.sendEstimate(est.id)} disabled={est.status === "approved"}>Send</Btn>
                <Btn tone="quiet" onClick={() => api.approveEstimate(est.id, est.chosen || "Best")}>They said yes</Btn>
              </div>
            </Card>
          ))}
        </div>
      </Page>
    );
  }
  return (
    <Page kicker="Quotes" title="Estimates">
      <form className="mb-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); api.buildEstimate(contactId, type); }}>
        <Select value={contactId} onChange={(e) => setContactId(e.target.value)} aria-label="Contact">
          {data.contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
        <Input value={type} onChange={(e) => setType(e.target.value)} aria-label="Type" />
        <Btn type="submit">Build good / better / best</Btn>
      </form>
      <div className="space-y-3">
        {data.estimates.map((est) => (
          <Card key={est.id}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-2xl">{est.number} · {est.title}</p>
              <Pill hot={est.status === "approved"}>{est.status}</Pill>
            </div>
            <p className="text-sm text-mist">{data.contacts.find((c) => c.id === est.contactId)?.name}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {est.options.map((opt) => (
                <div key={opt.name} className="rounded-xl bg-ink p-3">
                  <p className="text-xs uppercase tracking-widest text-copper">{opt.name}</p>
                  <p className="font-display text-2xl">{money(estimateTotal({ ...est, chosen: opt.name }, opt.name))}</p>
                  <p className="text-xs text-mist">{opt.note}</p>
                  <ul className="mt-2 text-sm">{opt.items.map((item) => <li key={item.name}>{item.qty} × {item.name}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn onClick={() => api.sendEstimate(est.id)} disabled={est.status === "approved"}>Send</Btn>
              <Btn tone="quiet" onClick={() => api.approveEstimate(est.id, "Best")}>Approve best</Btn>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code NEIGHBOR" aria-label="Coupon" className="max-w-40" />
              <Btn tone="ghost" onClick={() => { if (code.trim().toUpperCase() === "NEIGHBOR") api.saveEstimate({ ...est, discount: 150 }); }}>Apply $150</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function PriceBook() {
  const book = useRidge((s) => s.data.priceBook);
  const add = useRidge((s) => s.addPrice);
  const [item, setItem] = useState({ category: "Custom", name: "", unit: "ea", price: 0, cost: 0 });
  return (
    <Page kicker="Flat rate" title="Price book">
      <form className="mb-3 grid gap-2 md:grid-cols-5" onSubmit={(e) => { e.preventDefault(); if (!item.name) return; add(item); setItem({ ...item, name: "" }); }}>
        <Input value={item.category} onChange={(e) => setItem({ ...item, category: e.target.value })} aria-label="Category" />
        <Input value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} placeholder="Name" aria-label="Name" />
        <Input value={item.unit} onChange={(e) => setItem({ ...item, unit: e.target.value })} aria-label="Unit" />
        <Input type="number" value={item.price} onChange={(e) => setItem({ ...item, price: Number(e.target.value) })} aria-label="Price" />
        <Btn type="submit">Add</Btn>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-mist"><tr><th className="py-2">Item</th><th>Unit</th><th>Price</th><th>Cost</th><th>Margin</th></tr></thead>
          <tbody>
            {book.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <td className="py-3">{row.category} · {row.name}</td>
                <td>{row.unit}</td>
                <td>{money(row.price)}</td>
                <td>{money(row.cost)}</td>
                <td>{row.price ? Math.round(((row.price - row.cost) / row.price) * 100) : 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

export function Costing() {
  const data = useRidge((s) => s.data);
  return (
    <Page kicker="Margin" title="Job costing">
      <div className="space-y-2">
        {data.jobs.map((job) => {
          const math = jobMargin(job);
          const bid = data.estimates.find((e) => e.jobId === job.id || e.contactId === job.contactId);
          return (
            <Card key={job.id} className="grid gap-2 sm:grid-cols-4">
              <div><p>{job.title}</p><p className="text-xs text-mist">{bid ? `Bid ${bid.number}` : "No bid on file"}</p></div>
              <p className="text-sm">Price {money(job.price)}</p>
              <p className="text-sm">Cost {money(math.cost)}</p>
              <p className="font-display text-2xl">{math.pct}%</p>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

export function Equipment() {
  const gear = useRidge((s) => s.data.equipment);
  const addHours = useRidge((s) => s.addHours);
  const addEquipment = useRidge((s) => s.addEquipment);
  const [name, setName] = useState("");
  const [type, setType] = useState("Machine");
  return (
    <Page kicker="Fleet" title="Equipment">
      <form
        className="mb-3 flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          addEquipment(name.trim(), type.trim() || "Machine");
          setName("");
        }}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Machine" aria-label="Machine" />
        <Input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type" aria-label="Type" />
        <Btn type="submit">Add</Btn>
      </form>
      <div className="grid gap-3 md:grid-cols-3">
        {gear.map((eq) => (
          <Card key={eq.id}>
            <p className="text-xs uppercase tracking-widest text-mist">{eq.type} · {eq.status}</p>
            <p className="font-display text-3xl">{eq.name}</p>
            <p className="mt-2 text-sm">{eq.hours} hrs · service at {eq.nextService}</p>
            <Btn className="mt-3" tone="quiet" onClick={() => addHours(eq.id, 8)}>Log 8 hours</Btn>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Permits() {
  const data = useRidge((s) => s.data);
  const add = useRidge((s) => s.addPermit);
  const [type, setType] = useState("811 locate");
  const [number, setNumber] = useState("");
  const [jobId, setJobId] = useState(data.jobs[0]?.id ?? "");
  return (
    <Page kicker="811" title="Permits">
      <form className="mb-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (!number) return; add(type, number, jobId); setNumber(""); }}>
        <Input value={type} onChange={(e) => setType(e.target.value)} aria-label="Type" />
        <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Number" aria-label="Number" />
        <Select value={jobId} onChange={(e) => setJobId(e.target.value)} aria-label="Job">
          {data.jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </Select>
        <Btn type="submit">File</Btn>
      </form>
      <div className="space-y-2">
        {data.permits.map((permit) => (
          <Card key={permit.id} className="flex flex-wrap justify-between gap-2">
            <div>
              <p>{permit.type} · {permit.number}</p>
              <p className="text-sm text-mist">{data.jobs.find((j) => j.id === permit.jobId)?.title}</p>
            </div>
            <Pill hot={permit.status !== "clear"}>{permit.status}</Pill>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function TimeClock() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  return (
    <Page kicker="Labor" title="Time clock">
      <div className="space-y-2">
        {data.staff.map((person) => {
          const open = data.clocks.find((c) => c.staffId === person.id && !c.outAt);
          return (
            <Card key={person.id} className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p>{person.name}</p>
                <p className="text-sm text-mist">{open ? `On the clock · ${data.jobs.find((j) => j.id === open.jobId)?.title ?? "yard"}` : `${money(person.rate)}/hr`}</p>
              </div>
              {open ? <Btn onClick={() => api.clockOut(person.id)}>Clock out</Btn> : <Btn tone="quiet" onClick={() => api.clockIn(person.id, data.jobs[0]?.id)}>Clock in</Btn>}
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

export function Reach({ name, phone }: { name: string; phone: string }) {
  const call = telHref(phone);
  const es = smsHref(phone, spanishText(name));
  const en = smsHref(phone, englishText(name));
  if (!call) return null;
  const btn = "inline-flex min-h-[52px] items-center rounded-[10px] px-4 font-extrabold";
  return (
    <div className="flex flex-wrap gap-2">
      <a className={`${btn} bg-copper text-copper-ink`} href={call}>Call</a>
      <a className={`${btn} bg-panel text-bone`} href={es}>Text · Spanish</a>
      <a className={`${btn} bg-panel text-bone`} href={en}>Text · English</a>
    </div>
  );
}

export function VideoPick({ jobId }: { jobId: string }) {
  const add = useRidge((s) => s.addVideo);
  return (
    <label className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-panel px-5 font-extrabold text-bone">
      Video
      <input
        type="file"
        accept="video/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.currentTarget.value = "";
          if (!file) return;
          const id = `vid_${Date.now()}`;
          void saveClip(id, file).then(() => add(jobId, id));
        }}
      />
    </label>
  );
}

export function JobVideos({ videos }: { videos?: { id: string }[] }) {
  const [urls, setUrls] = useState<{ id: string; url: string }[]>([]);
  useEffect(() => {
    let dead = false;
    const made: string[] = [];
    void (async () => {
      const next: { id: string; url: string }[] = [];
      for (const clip of videos ?? []) {
        const blob = await loadClip(clip.id);
        if (!blob) continue;
        const url = URL.createObjectURL(blob);
        made.push(url);
        next.push({ id: clip.id, url });
      }
      if (!dead) setUrls(next);
    })();
    return () => {
      dead = true;
      made.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [videos]);
  if (!urls.length) return null;
  return (
    <div className="mt-3 grid gap-2">
      {urls.map((clip) => (
        <video key={clip.id} src={clip.url} controls playsInline className="w-full rounded-lg" />
      ))}
    </div>
  );
}

export function PhotoPick({ jobId }: { jobId: string }) {
  const add = useRidge((s) => s.addPhotoNote);
  async function take(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("photo"));
        el.src = url;
      });
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      add(jobId, "", canvas.toDataURL("image/jpeg", 0.72));
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      <label className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink">
        Camera
        <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => { void take(e.target.files?.[0]); e.currentTarget.value = ""; }} />
      </label>
      <label className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-panel px-5 font-extrabold text-bone">
        Gallery
        <input type="file" accept="image/*" className="sr-only" onChange={(e) => { void take(e.target.files?.[0]); e.currentTarget.value = ""; }} />
      </label>
      <VideoPick jobId={jobId} />
    </div>
  );
}

export function Photos() {
  const data = useRidge((s) => s.data);
  return (
    <Page kicker="Proof" title="Photos">
      <p className="text-sm text-mist">Camera opens the phone camera. Gallery opens the photos already on the phone.</p>
      {data.jobs.length === 0 ? <p className="text-sm text-mist">No jobs on the book yet. A photo needs a job to hang on.</p> : null}
        {data.jobs.map((job) => (
          <Card key={job.id}>
            <p className="font-display text-2xl">{job.title}</p>
            <p className="text-sm text-mist">{job.address}</p>
            <div className="mt-3"><PhotoPick jobId={job.id} /></div>
            <JobVideos videos={job.videos} />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {job.photos.map((photo, index) => (
                <figure key={`${photo.caption}-${index}`}>
                  <img src={photo.src} alt={photo.caption || "Job photo"} className="h-48 w-full rounded-xl object-cover" />
                  <figcaption className="mt-1 text-sm text-mist">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </Card>
        ))}
    </Page>
  );
}

void todayOffset;
void Field;
