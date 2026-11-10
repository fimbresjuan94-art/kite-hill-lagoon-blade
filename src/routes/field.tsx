import { CorralLang, LangButton } from "@/components/ridge/lang";
import { FieldBook } from "@/components/ridge/close";
import { JobVideos, PhotoPick, Reach } from "@/components/ridge/fieldops";
import { BootLine, Door } from "@/components/ridge/shell";
import { Btn, Card, Pill } from "@/components/ridge/ui";
import { dayKey } from "@/lib/ridge/format";
import { useHydrated, useRidge } from "@/lib/ridge/store";
import { watchPage } from "@/lib/ridge/battalion";
import type { JobStatus } from "@/lib/ridge/types";
import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/field")({ component: FieldPage });

function FieldPage() {
  const hydrated = useHydrated();
  if (!hydrated) return <BootLine />;
  return <FieldLive />;
}

function FieldLive() {
  const sessionId = useRidge((s) => s.sessionId);
  const data = useRidge((s) => s.data);
  const api = useRidge();
  useEffect(() => {
    watchPage("jobs");
    return () => watchPage(null);
  }, []);
  if (!sessionId) return <Door />;
  const today = dayKey();
  const mine = data.jobs.filter((j) => dayKey(j.start) === today || j.crewIds.includes(sessionId));
  const jobs = mine.length ? mine : data.jobs;
  return (
    <CorralLang>
    <main id="corral-root" className="mx-auto max-w-lg px-4 py-6">
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-display text-4xl">Field</h1>
        <Link to="/admin" search={{ m: "overview" }} className="min-h-11 inline-flex items-center text-sm text-mist">Admin</Link>
        <LangButton />
      </div>
      <p className="mt-1 text-sm text-mist"><span data-no-es>{data.staff.find((s) => s.id === sessionId)?.name}</span> · <span>the book handles the rest</span></p>
      <div className="mt-4">
        {(() => {
          const me = data.staff.find((s) => s.id === sessionId);
          const open = data.clocks.find((c) => c.staffId === sessionId && !c.outAt);
          if (!me) return null;
          return (
            <Card className="flex items-center justify-between gap-2">
              <p>{open ? "On the clock" : "Off the clock"}</p>
              {open ? <Btn onClick={() => api.clockOut(me.id)}>Clock out</Btn> : <Btn onClick={() => api.clockIn(me.id)}>Clock in</Btn>}
            </Card>
          );
        })()}
      </div>
      <h2 className="mt-6 font-display text-3xl">Jobs on the truck</h2>
      <div className="mt-4 space-y-3">
        {jobs.map((job) => (
          <Card key={job.id}>
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{job.title}</p>
              <Pill>{job.status}</Pill>
            </div>
            <p className="text-sm text-mist">{job.address}</p>
            <div className="mt-3">
              <Reach name={data.contacts.find((c) => c.id === job.contactId)?.name || "there"} phone={data.contacts.find((c) => c.id === job.contactId)?.phone || ""} />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn onClick={() => api.setJobStatus(job.id, "enroute")}>On my way</Btn>
              <Btn tone="quiet" onClick={() => api.setJobStatus(job.id, "onsite")}>On site</Btn>
              <Btn tone="ghost" onClick={() => api.setJobStatus(job.id, "done" as JobStatus)}>Done</Btn>
            </div>
            <div className="mt-3"><PhotoPick jobId={job.id} /></div>
            {job.photos.length ? (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {job.photos.map((photo, index) => (
                  <img key={index} src={photo.src} alt="" className="h-20 w-full rounded-lg object-cover" />
                ))}
              </div>
            ) : null}
            <JobVideos videos={job.videos} />
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <FieldBook />
      </div>
    </main>
    </CorralLang>
  );
}
