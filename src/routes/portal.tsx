import { Btn, Card, Input, PublicBar, Pill } from "@/components/ridge/ui";
import { estimateTotal, invoiceDue, invoiceTotal } from "@/lib/ridge/engine";
import { money, phoneKey } from "@/lib/ridge/format";
import { useHydrated, useRidge } from "@/lib/ridge/store";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal")({ component: PortalPage });

function PortalPage() {
  const hydrated = useHydrated();
  if (!hydrated) return <main className="p-8">Opening the portal…</main>;
  return <Portal />;
}

function Portal() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [phone, setPhone] = useState("");
  const [found, setFound] = useState<string | null>(null);
  const contact = data.contacts.find((c) => c.id === found);
  const estimates = data.estimates.filter((e) => e.contactId === found);
  const invoices = data.invoices.filter((i) => i.contactId === found);
  return (
    <main>
      <PublicBar />
      <section className="mx-auto max-w-2xl px-5 py-10">
        <p className="text-xs uppercase tracking-widest text-copper">Customer portal</p>
        <h1 className="font-display text-5xl leading-none">Your price, in writing.</h1>
        <p className="mt-3 text-sm text-mist">Use the phone number from the request. Choosing a price asks CD Services to confirm the job.</p>
        <form className="mt-6 flex gap-2" onSubmit={(e) => {
          e.preventDefault();
          const hit = data.contacts.find((c) => phoneKey(c.phone) === phoneKey(phone));
          setFound(hit?.id ?? "missing");
        }}>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Phone" />
          <Btn type="submit">Look up</Btn>
        </form>
        {found === "missing" ? <p className="mt-4 text-sm">No file under that number.</p> : null}
        {contact ? (
          <div className="mt-6 space-y-3">
            <h2 className="font-display text-3xl">{contact.name}</h2>
            {estimates.map((est) => (
              <Card key={est.id}>
                <div className="flex items-center justify-between"><p>{est.number}</p><Pill>{est.status}</Pill></div>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {est.options.map((opt) => (
                    <div key={opt.name} className="rounded-xl bg-ink p-3">
                      <p className="text-xs uppercase tracking-widest text-copper">{opt.name}</p>
                      <p className="font-display text-2xl">{money(estimateTotal(est, opt.name))}</p>
                      <p className="text-xs text-mist">{opt.note}</p>
                      {est.status !== "approved" ? (
                        <Btn className="mt-2" onClick={() => { api.markEstimateViewed(est.id); api.approveEstimate(est.id, opt.name); }}>Ask to confirm</Btn>
                      ) : est.chosen === opt.name ? <p className="mt-2 text-sm text-copper">Chosen</p> : null}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
            {invoices.map((inv) => (
              <Card key={inv.id} className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p>{inv.number}</p>
                  <p className="text-sm text-mist">{money(invoiceTotal(inv))} · {inv.status}</p>
                </div>
                {inv.status !== "paid" && inv.status !== "draft" ? (
                  <a className="inline-flex min-h-[52px] items-center font-extrabold text-copper" href="tel:4809895802">Call (480) 989-5802 to pay</a>
                ) : <Pill>{inv.status}</Pill>}
              </Card>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}
