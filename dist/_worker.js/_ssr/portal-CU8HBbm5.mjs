import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pill, l as PublicBar, n as Btn, o as Input, r as Card } from "./ui-BWavd5c9.mjs";
import { S as useRidge, _ as phoneKey, l as invoiceDue, p as money, s as estimateTotal, u as invoiceTotal, x as useHydrated } from "./store-DaLMOhq5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portal-CU8HBbm5.js
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
	const [phone, setPhone] = (0, import_react.useState)("638-555-0142");
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
				children: "Try Elena Vargas, 638-555-0142, or Jim Walsh, 638-555-0133."
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
									children: "Approve"
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
								inv.status,
								inv.financing ? " · financing available" : ""
							]
						})] }), inv.status !== "paid" && inv.status !== "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
							onClick: () => api.recordPayment(inv.id, "card"),
							children: ["Pay ", money(invoiceDue(data, inv))]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: inv.status })]
					}, inv.id))
				]
			}) : null
		]
	})] });
}
//#endregion
export { PortalPage as component };
