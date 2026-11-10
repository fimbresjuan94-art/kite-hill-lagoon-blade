import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as writeCorralLang, t as EN_ES, w as readCorralLang } from "./store-BpwE8ygY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-fzYdvoNE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ES_EN = Object.fromEntries(Object.entries(EN_ES).map(([en, es]) => [es, en]));
var LangCtx = (0, import_react.createContext)({
	lang: "es",
	set: () => {}
});
function CorralLang({ children }) {
	const [lang, setLang] = (0, import_react.useState)("es");
	(0, import_react.useEffect)(() => {
		setLang(readCorralLang());
	}, []);
	const set = (next) => {
		writeCorralLang(next);
		setLang(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangCtx.Provider, {
		value: {
			lang,
			set
		},
		children
	});
}
function useT() {
	const { lang } = (0, import_react.useContext)(LangCtx);
	return (text) => lang === "es" ? EN_ES[text] ?? text : text;
}
function applyCorralLang(lang, root) {
	const nodes = [];
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	let current = walker.nextNode();
	while (current) {
		nodes.push(current);
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
	root.querySelectorAll("input,textarea").forEach((input) => {
		const stored = input.dataset.enPh ?? input.placeholder ?? "";
		if (!input.dataset.enPh) input.dataset.enPh = stored;
		const ph = input.dataset.enPh;
		const nextPh = lang === "es" ? EN_ES[ph] ?? ph : ph;
		if (input.placeholder !== nextPh) input.placeholder = nextPh;
	});
}
function LangButton() {
	const { lang, set } = (0, import_react.useContext)(LangCtx);
	(0, import_react.useLayoutEffect)(() => {
		const root = document.getElementById("corral-root");
		if (root) applyCorralLang(lang, root);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		"data-no-es": true,
		className: "inline-flex shrink-0 overflow-hidden rounded-[10px] border border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => set("en"),
			"aria-pressed": lang === "en",
			className: `min-h-11 px-3 text-sm font-semibold ${lang === "en" ? "bg-copper text-copper-ink" : "text-bone"}`,
			children: "English"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => set("es"),
			"aria-pressed": lang === "es",
			className: `min-h-11 px-3 text-sm font-semibold ${lang === "es" ? "bg-copper text-copper-ink" : "text-bone"}`,
			children: "Español"
		})]
	});
}
function usePlain() {
	return false;
}
function cx(...parts) {
	return parts.filter(Boolean).join(" ");
}
function PublicBar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex items-center justify-between gap-4 bg-ink px-5 py-4 text-bone md:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "min-h-11 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/img/logo.png",
				alt: "",
				className: "size-10 object-contain"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-lg leading-none",
				children: "CD Services"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex items-center gap-1 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/book",
					className: "min-h-11 px-3 flex items-center text-mist",
					children: "Book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal",
					className: "min-h-11 px-3 flex items-center text-mist",
					children: "Portal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					search: { m: "overview" },
					className: "min-h-11 px-3 flex items-center text-mist",
					children: "Yard"
				})
			]
		})]
	});
}
function Page({ kicker, title, action, children }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mb-3 block h-1 w-11 rounded-sm bg-copper" }),
				kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-copper",
					children: t(kicker)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl leading-tight md:text-4xl",
					children: t(title)
				})
			] }), action]
		}), children]
	});
}
function Card({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cx("card p-4", className),
		children
	});
}
function Stat({ label, value, hint }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-widest text-mist",
			children: t(label)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl",
			children: value
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-mist",
			children: t(hint)
		}) : null
	] });
}
function Pill({ children, hot }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cx("inline-flex items-center rounded-full px-2.5 py-1 text-xs", hot ? "bg-copper text-copper-ink" : "bg-panel text-mist"),
		children: typeof children === "string" ? t(children) : children
	});
}
function Btn({ tone = "primary", className, children, ...props }) {
	const t = useT();
	const tones = {
		primary: "bg-copper text-copper-ink",
		ghost: "bg-transparent text-bone ring-1 ring-line",
		quiet: "bg-panel text-bone"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: cx("inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[10px] px-5 text-base font-extrabold transition-opacity disabled:opacity-40", tones[tone], className),
		children: typeof children === "string" ? t(children) : children
	});
}
function Field({ label, children }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-mist",
			children: t(label)
		}), children]
	});
}
var control = "w-full min-h-[52px] rounded-[10px] border-2 border-line bg-ink px-3 text-bone outline-none focus:border-copper";
function Input(props) {
	const t = useT();
	const placeholder = typeof props.placeholder === "string" ? t(props.placeholder) : props.placeholder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		placeholder,
		className: cx(control, props.className)
	});
}
function Area(props) {
	const t = useT();
	const placeholder = typeof props.placeholder === "string" ? t(props.placeholder) : props.placeholder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		placeholder,
		className: cx(control, "min-h-24 py-3", props.className)
	});
}
function Select(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: cx(control, props.className)
	});
}
function Empty({ title, body }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-2xl",
		children: t(title)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-mist",
		children: t(body)
	})] });
}
//#endregion
export { Empty as a, LangButton as c, PublicBar as d, Select as f, useT as h, CorralLang as i, Page as l, usePlain as m, Btn as n, Field as o, Stat as p, Card as r, Input as s, Area as t, Pill as u };
