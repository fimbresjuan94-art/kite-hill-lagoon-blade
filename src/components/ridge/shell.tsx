import { CorralLang, LangButton, useT } from "@/components/ridge/lang";
import { allowed, canWrite, navFor } from "@/components/ridge/nav";
import { Screen } from "@/components/ridge/screen";
import { Btn, Input } from "@/components/ridge/ui";
import { useRidge } from "@/lib/ridge/store";
import type { ModuleId } from "@/lib/ridge/types";
import { Link } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export function Door() {
  return (
    <CorralLang>
      <DoorForm />
    </CorralLang>
  );
}

function DoorForm() {
  const t = useT();
  const staff = useRidge((s) => s.data.staff);
  const company = useRidge((s) => s.data.settings.company);
  const signIn = useRidge((s) => s.signIn);
  const people = [...staff].sort((a, b) => (a.role === "developer" ? 1 : 0) - (b.role === "developer" ? 1 : 0));
  const [id, setId] = useState(people.find((p) => p.role === "owner")?.id ?? people[0]?.id ?? "");
  const [pin, setPin] = useState("");
  const [bad, setBad] = useState(false);

  return (
    <main id="corral-root" className="relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-10">
      <img src="/brand/img/estrella.jpg" alt="" className="pointer-events-none absolute inset-x-0 top-0 -z-10 w-full h-auto" />
      <img src="/brand/img/logo.png" alt="" className="size-14 object-contain" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-widest text-copper">El corral</p>
        <LangButton />
      </div>
      <h1 className="mt-2 font-display text-5xl leading-none">CD Services</h1>
      <p className="mt-3 text-mist">
        <span data-no-es>{company}. </span>
        <span>{t("Crew door, not the public site. PIN 2580.")}</span>
      </p>
      <form
        className="mt-8 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          const ok = signIn(id, pin);
          setBad(!ok);
          if (!ok) setPin("");
        }}
      >
        <div className="grid gap-2">
          {people.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => setId(person.id)}
              className={`min-h-11 rounded-2xl px-4 text-left ring-1 ${id === person.id ? "bg-panel ring-copper" : "ring-line"}`}
            >
              <span className="block">{person.name}</span>
              <span className="text-xs uppercase tracking-widest text-mist">{t(person.role)}</span>
            </button>
          ))}
        </div>
        <Input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" placeholder="PIN" aria-label="PIN" />
        {bad ? <p className="text-sm text-copper">{t("That PIN does not match.")}</p> : null}
        <Btn type="submit" className="w-full">{t("Enter")}</Btn>
      </form>
      <Link to="/" className="mt-6 min-h-11 text-sm text-mist">{t("Back to the public site")}</Link>
    </main>
  );
}

export function Shell({ module, onNav }: { module: string; onNav: (m: ModuleId) => void }) {
  return (
    <CorralLang>
      <ShellBody module={module} onNav={onNav} />
    </CorralLang>
  );
}

function ShellBody({ module, onNav }: { module: string; onNav: (m: ModuleId) => void }) {
  const t = useT();
  const data = useRidge((s) => s.data);
  const sessionId = useRidge((s) => s.sessionId);
  const signOut = useRidge((s) => s.signOut);
  const me = data.staff.find((s) => s.id === sessionId);
  const menu = navFor(me?.role);
  const active = allowed(me?.role, module) ? (module as ModuleId) : "overview";
  const write = canWrite(me?.role, active);
  const stepClosers = useRidge((s) => s.stepClosers);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const mods = menu.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query)).slice(0, 4);
    const people = data.contacts.filter((c) => c.name.toLowerCase().includes(query)).slice(0, 4);
    return { mods, people };
  }, [q, data.contacts, menu]);

  useEffect(() => {
    const first = window.setTimeout(() => stepClosers(), 900);
    const id = window.setInterval(() => stepClosers(), 8000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [stepClosers]);

  const nav = (
    <div className="flex h-full flex-col bg-soil">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <img src="/brand/img/logo.png" alt="" className="size-10 object-contain" />
          <div>
            <p className="font-display text-xl leading-none">CD Services</p>
            <p className="text-xs text-mist">El corral</p>
          </div>
        </div>
        <button className="grid size-11 place-items-center md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X />
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-2 pb-6">
        {menu.map((group) => (
          <div key={group.group}>
            <p className="px-3 pb-1 text-xs uppercase tracking-widest text-mist">{t(group.group)}</p>
            {group.items.map((item) => {
              const Icon = item.icon;
              const on = item.id === active;
              return (
                <button
                  key={item.id}
                  data-guide={item.id}
                  onClick={() => {
                    onNav(item.id);
                    setOpen(false);
                  }}
                  className={`flex min-h-11 w-full items-center gap-2 rounded-[10px] px-3 text-left text-sm font-semibold ${on ? "bg-copper text-copper-ink" : "text-mist"}`}
                >
                  <Icon className="size-4" />
                  {t(item.label)}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div id="corral-root" className="relative min-h-screen bg-ink md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <img src="/brand/img/estrella.jpg" alt="" className="pointer-events-none fixed inset-x-0 top-0 -z-10 w-full h-auto" />
      <aside className="sticky top-0 hidden h-screen md:block">{nav}</aside>
      {open ? <div className="fixed inset-0 z-30 md:hidden">{nav}</div> : null}
      <div className="min-w-0 bg-ink/80">
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-ink/95 px-3 py-2 backdrop-blur">
          <button className="grid size-11 place-items-center md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu />
          </button>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-3 size-4 text-mist" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people or tools" aria-label="Search" className="pl-9" />
            {q && hits && "mods" in hits ? (
              <div className="absolute z-20 mt-1 w-full card p-2">
                {hits.mods.map((item) => (
                  <button key={item.id} className="block min-h-11 w-full rounded-lg px-3 text-left" onClick={() => { onNav(item.id); setQ(""); }}>
                    {t(item.label)}
                  </button>
                ))}
                {hits.people.map((person) => (
                  <button key={person.id} className="block min-h-11 w-full rounded-lg px-3 text-left" onClick={() => { onNav("contacts"); setQ(""); }}>
                    {person.name}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Link to="/" className="hidden min-h-11 items-center px-2 text-sm text-mist sm:flex">{t("Site")}</Link>
          {me?.role === "developer" ? <Link to="/field" className="hidden min-h-11 items-center px-2 text-sm text-mist sm:flex">Field</Link> : null}
          <LangButton />
          <span className="hidden text-sm text-mist lg:inline">{me?.name}</span>
          <button className="min-h-11 px-2 text-sm text-mist" onClick={signOut}>{t("Sign out")}</button>
        </header>
        <p className="border-b border-line px-4 py-2 text-sm text-mist">
          {write ? t("You can change this.") : me?.role === "operator" ? t("You can see this. The owner handles changes here.") : t("You can see this. The developer runs this part.")}
        </p>
        <div className={`px-4 py-5 md:px-6 ${write ? "" : "pointer-events-none select-none"}`}>
          <Screen id={active} onNav={onNav} />
        </div>
        {me?.role === "developer" ? <Guide onNav={onNav} /> : null}
      </div>
    </div>
  );
}

const LESSONS: { id: ModuleId; text: string }[] = [
  { id: "overview", text: "Overview is the yard. What is open, and what is on the book." },
  { id: "closers", text: "La cuadrilla is the floor. Phone, chat, and text." },
  { id: "salesforce", text: "Lead desk holds a request until you confirm it." },
  { id: "inbox", text: "Inbox is every conversation in one place." },
  { id: "calendar", text: "Estimate book is the visits." },
];

function Guide({ onNav }: { onNav: (m: ModuleId) => void }) {
  const navRef = useRef(onNav);
  navRef.current = onNav;
  const [mode, setMode] = useState<"teach" | "ask" | "greet" | "off">("off");
  const [step, setStep] = useState(0);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let taught = false;
    try {
      taught = localStorage.getItem("cds-corral-taught") === "1";
    } catch {
      taught = false;
    }
    setMode(taught ? "greet" : "teach");
  }, []);

  useEffect(() => {
    if (mode !== "greet") return;
    const t = window.setTimeout(() => setMode("off"), 2200);
    return () => window.clearTimeout(t);
  }, [mode]);

  useEffect(() => {
    if (mode !== "teach") return;
    const lesson = LESSONS[step];
    if (!lesson) {
      setMode("ask");
      return;
    }
    navRef.current(lesson.id);
    const mark = window.setTimeout(() => {
      const btn = document.querySelector(`[data-guide="${lesson.id}"]`);
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      setSpot({ x: r.left + 18, y: r.top + r.height / 2 });
    }, 40);
    const next = window.setTimeout(() => setStep((n) => n + 1), 2400);
    return () => {
      window.clearTimeout(mark);
      window.clearTimeout(next);
    };
  }, [mode, step]);

  if (mode === "off") return null;
  if (mode === "greet") {
    return (
      <div className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center gap-3" aria-hidden="true">
        <span className="guide-bug bg-[#ff8614]" />
        <span className="guide-bug bg-[#f4efe4]" />
        <span className="guide-bug bg-[#e36a4d]" />
      </div>
    );
  }
  const lesson = LESSONS[step];
  return (
    <>
      {spot && mode === "teach" ? (
        <span className="pointer-events-none fixed z-40 size-3 rounded-full bg-[#ff8614] shadow-[0_0_0_6px_rgba(246,185,26,.25)] transition-[left,top] duration-700 ease-out" style={{ left: spot.x, top: spot.y }} />
      ) : null}
      <div className="fixed bottom-4 left-4 z-40 max-w-sm rounded-[10px] border border-copper/70 bg-ink/90 p-4 text-bone">
        <p className="font-display text-xl">{mode === "ask" ? "Was that enough?" : lesson?.text}</p>
        {mode === "ask" ? (
          <div className="mt-3 flex gap-2">
            <button
              className="min-h-11 rounded-[10px] bg-copper px-4 font-extrabold text-copper-ink"
              onClick={() => {
                try { localStorage.setItem("cds-corral-taught", "1"); } catch { /* keep going */ }
                setMode("greet");
              }}
            >
              Good
            </button>
            <button
              className="min-h-11 rounded-[10px] px-4 font-extrabold text-bone ring-1 ring-line"
              onClick={() => {
                setStep(0);
                setMode("teach");
              }}
            >
              Show me again
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-mist">First time only. Then they just say hello and leave.</p>
        )}
      </div>
    </>
  );
}

export function BootLine() {
  return (
    <main className="grid min-h-screen place-items-center">
      <p className="font-display text-3xl">Opening el corral…</p>
    </main>
  );
}

export function SignOutButton() {
  return null;
}

void Btn;
