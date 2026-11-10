import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "CD Services LLC" }] }),
  component: Home,
});

function Home() {
  useEffect(() => {
    window.location.replace("/brand/index.html");
  }, []);
  return (
    <main className="grid min-h-dvh place-items-center bg-[#0E1013] px-6 text-center text-[#F2F4F6]">
      <a href="/brand/index.html" className="inline-flex min-h-[52px] items-center rounded-[10px] bg-[#F6B91A] px-6 font-extrabold text-[#14110A]">
        Open CD Services
      </a>
    </main>
  );
}