import { BootLine, Door } from "@/components/ridge/shell";
import { Btn, Field, Input, PublicBar, Area } from "@/components/ridge/ui";
import { useHydrated, useRidge } from "@/lib/ridge/store";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/book")({ component: BookPage });

function BookPage() {
  const hydrated = useHydrated();
  if (!hydrated) return <BootLine />;
  return <BookForm />;
}

function BookForm() {
  const addLead = useRidge((s) => s.addLead);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Phoenix",
    service: "Site cut",
    notes: "",
    source: "Website",
  });
  return (
    <main>
      <PublicBar />
      <section className="mx-auto max-w-xl px-5 py-10">
        <p className="text-xs uppercase tracking-widest text-copper">Book</p>
        <h1 className="font-display text-5xl leading-none">Tell us the lot.</h1>
        <p className="mt-3 text-mist">A person confirms the walk. This also opens a lead inside Admin.</p>
        {done ? (
          <div className="mt-8 card p-5">
            <p className="font-display text-3xl">You're on the list.</p>
            <p className="mt-2 text-sm text-mist">The yard has the request. Call (480) 989-5802 if you need a person now.</p>
          </div>
        ) : (
          <form
            className="mt-8 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              addLead(form);
              setDone(true);
            }}
          >
            <Field label="Name"><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Phone"><Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="Address"><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field>
            <Field label="What needs digging"><Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} /></Field>
            <Field label="Notes"><Area value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
            <Btn type="submit">Request the visit</Btn>
          </form>
        )}
      </section>
    </main>
  );
}

void Door;
