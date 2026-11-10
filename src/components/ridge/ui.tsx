import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useT } from "@/components/ridge/lang";

export function usePlain() {
  return false;
}

export function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function PublicBar() {
  return (
    <header className="flex items-center justify-between gap-4 bg-ink px-5 py-4 text-bone md:px-10">
      <Link to="/" className="min-h-11 flex items-center gap-3">
        <img src="/brand/img/logo.png" alt="" className="size-10 object-contain" />
        <span className="font-display text-lg leading-none">CD Services</span>
      </Link>
      <nav className="flex items-center gap-1 text-sm">
        <Link to="/book" className="min-h-11 px-3 flex items-center text-mist">Book</Link>
        <Link to="/portal" className="min-h-11 px-3 flex items-center text-mist">Portal</Link>
        <Link to="/admin" search={{ m: "overview" }} className="min-h-11 px-3 flex items-center text-mist">Yard</Link>
      </nav>
    </header>
  );
}

export function Page({ kicker, title, action, children }: { kicker?: string; title: string; action?: ReactNode; children: ReactNode }) {
  const t = useT();
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="mb-3 block h-1 w-11 rounded-sm bg-copper" />
          {kicker ? <p className="text-xs font-bold uppercase tracking-widest text-copper">{t(kicker)}</p> : null}
          <h1 className="font-display text-3xl leading-tight md:text-4xl">{t(title)}</h1>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("card p-4", className)}>{children}</div>;
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  const t = useT();
  return (
    <Card>
      <p className="text-xs uppercase tracking-widest text-mist">{t(label)}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {hint ? <p className="mt-1 text-sm text-mist">{t(hint)}</p> : null}
    </Card>
  );
}

export function Pill({ children, hot }: { children: ReactNode; hot?: boolean }) {
  const t = useT();
  return (
    <span className={cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs", hot ? "bg-copper text-copper-ink" : "bg-panel text-mist")}>
      {typeof children === "string" ? t(children) : children}
    </span>
  );
}

export function Btn({ tone = "primary", className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "primary" | "ghost" | "quiet" }) {
  const t = useT();
  const tones = {
    primary: "bg-copper text-copper-ink",
    ghost: "bg-transparent text-bone ring-1 ring-line",
    quiet: "bg-panel text-bone",
  };
  return (
    <button
      {...props}
      className={cx("inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] px-5 text-base font-extrabold transition-opacity disabled:opacity-40", tones[tone], className)}
    >
      {typeof children === "string" ? t(children) : children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  const t = useT();
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-mist">{t(label)}</span>
      {children}
    </label>
  );
}

const control = "w-full min-h-[52px] rounded-[10px] border-2 border-line bg-ink px-3 text-bone outline-none focus:border-copper";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const t = useT();
  const placeholder = typeof props.placeholder === "string" ? t(props.placeholder) : props.placeholder;
  return <input {...props} placeholder={placeholder} className={cx(control, props.className)} />;
}

export function Area(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const t = useT();
  const placeholder = typeof props.placeholder === "string" ? t(props.placeholder) : props.placeholder;
  return <textarea {...props} placeholder={placeholder} className={cx(control, "min-h-24 py-3", props.className)} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx(control, props.className)} />;
}

export function Empty({ title, body }: { title: string; body: string }) {
  const t = useT();
  return (
    <Card>
      <p className="font-display text-2xl">{t(title)}</p>
      <p className="mt-2 text-sm text-mist">{t(body)}</p>
    </Card>
  );
}
