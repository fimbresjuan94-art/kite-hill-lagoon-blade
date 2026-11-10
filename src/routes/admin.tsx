import { BootLine, Door, Shell } from "@/components/ridge/shell";
import { useHydrated, useRidge } from "@/lib/ridge/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import type { ModuleId } from "@/lib/ridge/types";

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>) => ({
    m: typeof search.m === "string" && search.m ? search.m : "overview",
  }),
  component: AdminPage,
});

function AdminPage() {
  const hydrated = useHydrated();
  if (!hydrated) return <BootLine />;
  return <AdminLive />;
}

function AdminLive() {
  const sessionId = useRidge((s) => s.sessionId);
  const boot = useRidge((s) => s.boot);
  const addLead = useRidge((s) => s.addLead);
  const search = Route.useSearch();
  const navigate = useNavigate();
  useEffect(() => {
    boot();
    try {
      const raw = localStorage.getItem("cds-pending-leads");
      if (!raw) return;
      localStorage.removeItem("cds-pending-leads");
      const rows = JSON.parse(raw) as Array<{ name?: string; phone?: string; email?: string; city?: string; service?: string; notes?: string; source?: string; visit?: string }>;
      if (!Array.isArray(rows)) return;
      for (const lead of rows) {
        if (!lead?.name) continue;
        addLead({
          name: lead.name,
          phone: lead.phone ?? "",
          email: lead.email ?? "",
          address: "",
          city: lead.city ?? "",
          service: lead.service || "Estimate",
          notes: lead.notes ?? "",
          source: lead.source || "cdigs.bid",
          visit: lead.visit || "",
        });
      }
    } catch {
      /* a bad stash should not block the door */
    }
  }, [boot, addLead]);
  if (!sessionId) return <Door />;
  return (
    <Shell
      module={search.m}
      onNav={(m: ModuleId) => {
        void navigate({ to: "/admin", search: { m } });
      }}
    />
  );
}
