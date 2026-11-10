import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useHydrated, O as phoneKey, P as useRidge, c as Pill, l as PublicBar, n as Btn, o as Input, r as Card, v as estimateTotal, w as money, x as invoiceTotal } from "./store-C5SuoI-Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-BaZDXYNx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PortalPage() {
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "p-8",
		children: "Opening the portal…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {});
}
function Portal() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [phone, setPhone] = (0, import_react.useState)("");
	const [found, setFound] = (0, import_react.useState)(null);
	const contact = data.contacts.find((c) => c.id === found);
	const estimates = data.estimates.filter((e) => e.contactId === found);
	const invoices = data.invoices.filter((i) => i.contactId === found);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-copper",
				children: "Customer portal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-5xl leading-none",
				children: "Your price, in writing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-mist",
				children: "Use the phone number from the request. Choosing a price asks CD Services to confirm the job."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					const hit = data.contacts.find((c) => phoneKey(c.phone) === phoneKey(phone));
					setFound(hit?.id ?? "missing");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					"aria-label": "Phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Look up"
				})]
			}),
			found === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm",
				children: "No file under that number."
			}) : null,
			contact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: contact.name
					}),
					estimates.map((est) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: est.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: est.status })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-3",
						children: est.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-ink p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-copper",
									children: opt.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: money(estimateTotal(est, opt.name))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-mist",
									children: opt.note
								}),
								est.status !== "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "mt-2",
									onClick: () => {
										api.markEstimateViewed(est.id);
										api.approveEstimate(est.id, opt.name);
									},
									children: "Ask to confirm"
								}) : est.chosen === opt.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-copper",
									children: "Chosen"
								}) : null
							]
						}, opt.name))
					})] }, est.id)),
					invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex flex-wrap items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: inv.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-mist",
							children: [
								money(invoiceTotal(inv)),
								" · ",
								inv.status
							]
						})] }), inv.status !== "paid" && inv.status !== "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "inline-flex min-h-[52px] items-center font-extrabold text-copper",
							href: "tel:4809895802",
							children: "Call (480) 989-5802 to pay"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: inv.status })]
					}, inv.id))
				]
			}) : null
		]
	})] });
}
//#endregion
export { PortalPage as component };
