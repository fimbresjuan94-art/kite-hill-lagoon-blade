import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pill, n as Btn, r as Card } from "./ui-BWavd5c9.mjs";
import { S as useRidge, r as dayKey, x as useHydrated } from "./store-DaLMOhq5.mjs";
import { n as Door, r as FieldBook, t as BootLine } from "./shell-Cr2zjbqQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-Feo_Av9E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FieldPage() {
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLine, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLive, {});
}
function FieldLive() {
	const sessionId = useRidge((s) => s.sessionId);
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const step = useRidge((s) => s.stepClosers);
	(0, import_react.useEffect)(() => {
		const first = window.setTimeout(() => step(), 900);
		const id = window.setInterval(() => step(), 8e3);
		return () => {
			window.clearTimeout(first);
			window.clearInterval(id);
		};
	}, [step]);
	if (!sessionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {});
	const today = dayKey();
	const mine = data.jobs.filter((j) => dayKey(j.start) === today || j.crewIds.includes(sessionId));
	const jobs = mine.length ? mine : data.jobs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl",
					children: "Field"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					search: { m: "overview" },
					className: "min-h-11 inline-flex items-center text-sm text-mist",
					children: "Admin"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-mist",
				children: [data.staff.find((s) => s.id === sessionId)?.name, " · crew"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: [
					["overview", "Whole office"],
					["inbox", "Inbox"],
					["estimates", "Estimates"],
					["invoices", "Invoices"],
					["dispatch", "Dispatch"],
					["photos", "Photos"],
					["time", "Time clock"],
					["workflows", "Automations"]
				].map(([m, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					search: { m },
					className: "card flex min-h-11 items-center px-3 text-sm",
					children: label
				}, m))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldBook, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 font-display text-3xl",
				children: "Jobs on the truck"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: job.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: job.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: job.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: ["Gate ", data.contacts.find((c) => c.id === job.contactId)?.gate || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => api.setJobStatus(job.id, "enroute"),
								children: "On my way"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "quiet",
								onClick: () => api.setJobStatus(job.id, "onsite"),
								children: "On site"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "ghost",
								onClick: () => api.setJobStatus(job.id, "done"),
								children: "Done"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3",
						children: job.checklist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: item.done,
								onChange: () => api.toggleCheck(job.id, item.id)
							}), item.label]
						}) }, item.id))
					})
				] }, job.id))
			})
		]
	});
}
//#endregion
export { FieldPage as component };
