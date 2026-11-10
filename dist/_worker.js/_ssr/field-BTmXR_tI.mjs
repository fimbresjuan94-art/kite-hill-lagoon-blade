import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useHydrated, N as useRidge, o as dayKey } from "./store-BpwE8ygY.mjs";
import { c as LangButton, i as CorralLang, n as Btn, r as Card, u as Pill } from "./ui-fzYdvoNE.mjs";
import { i as watchPage } from "./router-CRjTaRmh.mjs";
import { a as PhotoPick, i as JobVideos, n as Door, o as Reach, r as FieldBook, t as BootLine } from "./shell-Bacu44M5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/field-BTmXR_tI.js
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
	(0, import_react.useEffect)(() => {
		watchPage("jobs");
		return () => watchPage(null);
	}, []);
	if (!sessionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {});
	const today = dayKey();
	const mine = data.jobs.filter((j) => dayKey(j.start) === today || j.crewIds.includes(sessionId));
	const jobs = mine.length ? mine : data.jobs;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorralLang, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "corral-root",
		className: "mx-auto max-w-lg px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl",
						children: "Field"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						search: { m: "overview" },
						className: "min-h-11 inline-flex items-center text-sm text-mist",
						children: "Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangButton, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-no-es": true,
						children: data.staff.find((s) => s.id === sessionId)?.name
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "the book handles the rest" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: (() => {
					const me = data.staff.find((s) => s.id === sessionId);
					const open = data.clocks.find((c) => c.staffId === sessionId && !c.outAt);
					if (!me) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: open ? "On the clock" : "Off the clock" }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.clockOut(me.id),
							children: "Clock out"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.clockIn(me.id),
							children: "Clock in"
						})]
					});
				})()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 font-display text-3xl",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reach, {
							name: data.contacts.find((c) => c.id === job.contactId)?.name || "there",
							phone: data.contacts.find((c) => c.id === job.contactId)?.phone || ""
						})
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoPick, { jobId: job.id })
					}),
					job.photos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: job.photos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo.src,
							alt: "",
							className: "h-20 w-full rounded-lg object-cover"
						}, index))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobVideos, { videos: job.videos })
				] }, job.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldBook, {})
			})
		]
	}) });
}
//#endregion
export { FieldPage as component };
