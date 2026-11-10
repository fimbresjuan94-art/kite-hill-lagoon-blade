import { EN_ES, readCorralLang, writeCorralLang } from "@/lib/ridge/es";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";

const ES_EN: Record<string, string> = Object.fromEntries(Object.entries(EN_ES).map(([en, es]) => [es, en]));

const LangCtx = createContext<{ lang: "en" | "es"; set: (lang: "en" | "es") => void }>({
  lang: "es",
  set: () => {},
});

export function CorralLang({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<"en" | "es">("es");
  useEffect(() => {
    setLang(readCorralLang());
  }, []);
  const set = (next: "en" | "es") => {
    writeCorralLang(next);
    setLang(next);
  };
  return <LangCtx.Provider value={{ lang, set }}>{children}</LangCtx.Provider>;
}

export function useT() {
  const { lang } = useContext(LangCtx);
  return (text: string) => (lang === "es" ? EN_ES[text] ?? text : text);
}

export function applyCorralLang(lang: "en" | "es", root: ParentNode) {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || parent.closest("[data-no-es],input,textarea,script,style")) continue;
    const cur = node.nodeValue ?? "";
    const core = cur.trim();
    if (!core) continue;
    const en = EN_ES[core] ? core : ES_EN[core] ?? core;
    const next = lang === "es" ? EN_ES[en] ?? en : en;
    if (next === core) continue;
    const lead = cur.match(/^\s*/)?.[0] ?? "";
    const tail = cur.slice(lead.length + core.length);
    node.nodeValue = lead + next + tail;
  }
  root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input,textarea").forEach((input) => {
    const stored = input.dataset.enPh ?? input.placeholder ?? "";
    if (!input.dataset.enPh) input.dataset.enPh = stored;
    const ph = input.dataset.enPh;
    const nextPh = lang === "es" ? EN_ES[ph] ?? ph : ph;
    if (input.placeholder !== nextPh) input.placeholder = nextPh;
  });
}

export function LangButton() {
  const { lang, set } = useContext(LangCtx);
  useLayoutEffect(() => {
    const root = document.getElementById("corral-root");
    if (root) applyCorralLang(lang, root);
  });
  return (
    <span data-no-es className="inline-flex shrink-0 overflow-hidden rounded-[10px] border border-line">
      <button
        type="button"
        onClick={() => set("en")}
        aria-pressed={lang === "en"}
        className={`min-h-11 px-3 text-sm font-semibold ${lang === "en" ? "bg-copper text-copper-ink" : "text-bone"}`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => set("es")}
        aria-pressed={lang === "es"}
        className={`min-h-11 px-3 text-sm font-semibold ${lang === "es" ? "bg-copper text-copper-ink" : "text-bone"}`}
      >
        Español
      </button>
    </span>
  );
}
