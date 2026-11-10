import { PublicBar, Btn } from "@/components/ridge/ui";
import { useHydrated, useRidge } from "@/lib/ridge/store";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/p/$slug")({ component: LandingPage });

function LandingPage() {
  const hydrated = useHydrated();
  const { slug } = Route.useParams();
  if (!hydrated) return <main className="p-8">Loading page…</main>;
  return <Live slug={slug} />;
}

function Live({ slug }: { slug: string }) {
  const page = useRidge((s) => s.data.pages.find((p) => p.slug === slug));
  const visit = useRidge((s) => s.visitPage);
  const [seen, setSeen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (page && !seen) {
      visit(slug, page.showB ? "B" : "A");
      setSeen(true);
    }
  }, [page, seen, slug, visit]);
  if (!page || !page.published) {
    return (
      <main>
        <PublicBar />
        <p className="px-5 py-16 font-display text-4xl">That page is not published.</p>
      </main>
    );
  }
  return (
    <main>
      <PublicBar />
      <section className="mx-auto max-w-2xl px-5 py-16">
        <p className="text-xs uppercase tracking-widest text-copper">Carranza Dig</p>
        <h1 className="mt-3 font-display text-5xl leading-none">{page.showB ? page.headlineB : page.headline}</h1>
        <p className="mt-4 text-lg text-mist">{page.sub}</p>
        <div className="mt-8">
          <Btn onClick={() => void navigate({ to: "/book" })}>{page.offer}</Btn>
        </div>
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center text-sm text-mist">All services</Link>
      </section>
    </main>
  );
}
