import { Area, Btn, Card, Field, Input, Page, Pill, Select } from "@/components/ridge/ui";
import { writerDraft } from "@/lib/ridge/engine";
import { money } from "@/lib/ridge/format";
import { useRidge } from "@/lib/ridge/store";
import type { Landing, SocialPost } from "@/lib/ridge/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Funnels() {
  const funnels = useRidge((s) => s.data.funnels);
  const bump = useRidge((s) => s.bumpFunnel);
  return (
    <Page kicker="Growth" title="Funnels">
      <div className="space-y-4">
        {funnels.map((funnel) => (
          <Card key={funnel.id}>
            <p className="font-display text-2xl">{funnel.name}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-4">
              {funnel.steps.map((step, index) => {
                const rate = step.visits ? Math.round((step.conversions / step.visits) * 100) : 0;
                return (
                  <button key={step.name} onClick={() => bump(funnel.id, index)} className="rounded-2xl bg-ink p-3 text-left ring-1 ring-line">
                    <p className="text-xs uppercase tracking-widest text-mist">{step.name}</p>
                    <p className="font-display text-3xl">{step.visits}</p>
                    <p className="text-sm text-copper">{rate}% through</p>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

export function Forms() {
  const data = useRidge((s) => s.data);
  const submit = useRidge((s) => s.submitForm);
  const [formId, setFormId] = useState(data.forms[0]?.id ?? "");
  const form = data.forms.find((f) => f.id === formId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  return (
    <Page kicker="Capture" title="Forms, surveys, quizzes">
      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <Field label="Which form">
            <Select value={formId} onChange={(e) => { setFormId(e.target.value); setAnswers({}); }}>
              {data.forms.map((f) => <option key={f.id} value={f.id}>{f.kind} · {f.name}</option>)}
            </Select>
          </Field>
          <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); submit(formId, answers); setAnswers({}); }}>
            {form?.fields.map((field) => (
              <Field key={field} label={field}>
                <Input value={answers[field] ?? ""} onChange={(e) => setAnswers({ ...answers, [field]: e.target.value })} />
              </Field>
            ))}
            <Btn type="submit">Submit test</Btn>
          </form>
        </Card>
        <div className="space-y-2">
          {data.submissions.map((sub) => (
            <Card key={sub.id}>
              <p className="text-xs uppercase tracking-widest text-mist">{data.forms.find((f) => f.id === sub.formId)?.name}</p>
              {Object.entries(sub.answers).map(([k, v]) => <p key={k} className="text-sm">{k}: {v}</p>)}
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}

export function Sites() {
  const pages = useRidge((s) => s.data.pages);
  const save = useRidge((s) => s.savePage);
  const blank: Landing = { id: "", name: "New page", slug: "look", headline: "Excavation in the Phoenix valley", headlineB: "Pool digs, pads, and trenches", sub: "Own machines. We look at the dirt before we price it.", offer: "Free look", published: false, visitsA: 0, visitsB: 0, leads: 0, showB: false };
  const [page, setPage] = useState<Landing | null>(pages[0] ?? null);
  if (!page) {
    return (
      <Page kicker="Content" title="Pages">
        <Btn onClick={() => { const next = { ...blank, id: `pg_${Date.now()}` }; save(next); setPage(next); }}>New page</Btn>
      </Page>
    );
  }
  const seo = [
    page.headline.length > 12,
    page.sub.length > 20,
    page.offer.length > 3,
    page.published,
  ].filter(Boolean).length;
  return (
    <Page kicker="Content" title="Pages" action={<Link to="/p/$slug" params={{ slug: page.slug }} className="min-h-11 rounded-full bg-panel px-4 flex items-center text-sm">Open live page</Link>}>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="space-y-2">
          <Field label="Name"><Input value={page.name} onChange={(e) => setPage({ ...page, name: e.target.value })} /></Field>
          <Field label="Slug"><Input value={page.slug} onChange={(e) => setPage({ ...page, slug: e.target.value })} /></Field>
          <Field label="Headline A"><Input value={page.headline} onChange={(e) => setPage({ ...page, headline: e.target.value })} /></Field>
          <Field label="Headline B"><Input value={page.headlineB} onChange={(e) => setPage({ ...page, headlineB: e.target.value })} /></Field>
          <Field label="Sub"><Area value={page.sub} onChange={(e) => setPage({ ...page, sub: e.target.value })} /></Field>
          <Field label="Offer"><Input value={page.offer} onChange={(e) => setPage({ ...page, offer: e.target.value })} /></Field>
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={page.published} onChange={(e) => setPage({ ...page, published: e.target.checked })} /> Published</label>
          <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={page.showB} onChange={(e) => setPage({ ...page, showB: e.target.checked })} /> Serve headline B</label>
          <Btn onClick={() => save(page)}>Save page</Btn>
        </Card>
        <Card>
          <p className="font-display text-3xl">{page.showB ? page.headlineB : page.headline}</p>
          <p className="mt-2 text-mist">{page.sub}</p>
          <p className="mt-4 text-copper">{page.offer}</p>
          <p className="mt-6 text-sm text-mist">A {page.visitsA} visits · B {page.visitsB} visits · {page.leads} leads</p>
          <p className="mt-2 text-sm">SEO checklist {seo}/4 — headline, proof, offer, published.</p>
        </Card>
      </div>
    </Page>
  );
}

export function Social() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [copy, setCopy] = useState("");
  const [network, setNetwork] = useState("Instagram");
  return (
    <Page kicker="Social" title="Planner">
      <Card className="mb-3 space-y-2">
        <Select value={network} onChange={(e) => setNetwork(e.target.value)} aria-label="Network">
          {["Instagram", "Facebook", "Google", "TikTok"].map((n) => <option key={n}>{n}</option>)}
        </Select>
        <Area value={copy} onChange={(e) => setCopy(e.target.value)} placeholder="The post" aria-label="Post" />
        <div className="flex flex-wrap gap-2">
          <Btn tone="ghost" onClick={() => setCopy(writerDraft(data, data.jobs[0]))}>Write from latest job</Btn>
          <Btn onClick={() => { api.savePost({ id: `post_${Date.now()}`, network, copy: copy || writerDraft(data), when: new Date().toISOString(), status: "draft" }); setCopy(""); }}>Save draft</Btn>
        </div>
      </Card>
      <div className="space-y-2">
        {data.posts.map((post) => (
          <Card key={post.id} className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-copper">{post.network}</p>
              <p>{post.copy || "Empty draft"}</p>
            </div>
            <div className="flex gap-2">
              <Pill>{post.status}</Pill>
              <Btn tone="quiet" onClick={() => api.savePost({ ...post, status: nextStatus(post.status) })}>Advance</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function nextStatus(status: SocialPost["status"]): SocialPost["status"] {
  if (status === "draft") return "scheduled";
  if (status === "scheduled") return "posted";
  return "draft";
}

export function Ads() {
  const data = useRidge((s) => s.data);
  const api = useRidge();
  const [label, setLabel] = useState("");
  const [slug, setSlug] = useState("");
  return (
    <Page kicker="Acquisition" title="Ads and links">
      <div className="grid gap-3 md:grid-cols-3">
        {data.ads.map((ad) => (
          <Card key={ad.id}>
            <p className="text-xs uppercase tracking-widest text-mist">{ad.platform} · {ad.status}</p>
            <p className="font-display text-2xl">{ad.name}</p>
            <p className="mt-2 text-sm text-mist">{money(ad.spend)} spend · {ad.leads} leads</p>
            <p className="text-copper">{ad.leads ? money(ad.spend / ad.leads) : "—"} / lead</p>
          </Card>
        ))}
      </div>
      <Card>
        <p className="font-display text-2xl">Trackable links</p>
        <form className="mt-3 flex flex-wrap gap-2" onSubmit={(e) => { e.preventDefault(); if (!slug) return; api.addLink(label || slug, slug); setLabel(""); setSlug(""); }}>
          <Input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" aria-label="Label" />
          <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="slug" aria-label="Slug" />
          <Btn type="submit">Add</Btn>
        </form>
        <ul className="mt-3 space-y-2">
          {data.links.map((link) => (
            <li key={link.id} className="flex items-center justify-between gap-2 text-sm">
              <span>/{link.slug} · {link.label}</span>
              <Btn tone="ghost" onClick={() => api.clickLink(link.slug)}>{link.clicks} clicks</Btn>
            </li>
          ))}
        </ul>
      </Card>
    </Page>
  );
}
