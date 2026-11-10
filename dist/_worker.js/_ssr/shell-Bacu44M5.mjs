import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as spanishText, D as smsHref, E as saveClip, I as writerDraft, N as useRidge, O as solDraft, P as when, S as optimize, T as rioDraft, _ as loadClip, b as monthBuckets, c as download, d as estimateTotal, f as forecast, h as jobMargin, i as commissions, j as telHref, k as sourceBuckets, l as duplicateGroups, m as invoiceTotal, n as askRidge, o as dayKey, p as invoiceDue, s as dayLabel, u as englishText, v as miles, x as newWorkflow, y as money } from "./store-BpwE8ygY.mjs";
import { a as Empty, c as LangButton, f as Select, h as useT, i as CorralLang, l as Page, m as usePlain, n as Btn, o as Field, p as Stat, r as Card, s as Input, t as Area, u as Pill } from "./ui-fzYdvoNE.mjs";
import { A as Inbox, B as Clock, C as MessageSquare, D as LifeBuoy, E as ListChecks, F as Funnel, G as Building2, H as ChartColumn, I as FileWarning, J as BadgeDollarSign, K as Bot, L as Construction, M as Headset, N as GraduationCap, O as Library, P as Globe, R as Columns3, S as PenLine, T as Megaphone, U as CalendarDays, V as ClipboardList, W as Calculator, Y as Activity, _ as Route, a as Wallet, b as Radio, d as SquareCheck, f as Sparkles, g as Search, h as Settings, i as Waypoints, j as Images, k as LayoutDashboard, l as Timer, m as Share2, n as Wrench, o as Users, p as Shield, q as BookOpen, r as Workflow, s as Truck, t as X, u as Star, v as Repeat, w as Menu, x as Phone, y as Receipt, z as Cloud } from "../_libs/lucide-react.mjs";
import { i as watchPage } from "./router-CRjTaRmh.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-Bacu44M5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [{
	group: "Today",
	items: [
		{
			id: "overview",
			label: "Today",
			icon: LayoutDashboard
		},
		{
			id: "jobs",
			label: "Jobs",
			icon: Construction
		},
		{
			id: "photos",
			label: "Photos",
			icon: Images
		},
		{
			id: "time",
			label: "Time clock",
			icon: Clock
		},
		{
			id: "schedule",
			label: "Schedule",
			icon: Timer
		},
		{
			id: "calls",
			label: "Calls",
			icon: Phone
		},
		{
			id: "calendar",
			label: "Estimate book",
			icon: CalendarDays
		},
		{
			id: "inbox",
			label: "Inbox",
			icon: Inbox
		},
		{
			id: "contacts",
			label: "Contacts",
			icon: Users
		},
		{
			id: "estimates",
			label: "Estimates",
			icon: PenLine
		},
		{
			id: "invoices",
			label: "Invoices",
			icon: Receipt
		},
		{
			id: "payments",
			label: "Payments",
			icon: Wallet
		}
	]
}, {
	group: "Also on the book",
	items: [
		{
			id: "tasks",
			label: "Tasks",
			icon: SquareCheck
		},
		{
			id: "dispatch",
			label: "Dispatch",
			icon: Radio
		},
		{
			id: "pipeline",
			label: "Pipeline",
			icon: Columns3
		},
		{
			id: "companies",
			label: "Companies",
			icon: Building2
		},
		{
			id: "reviews",
			label: "Reviews",
			icon: Star
		},
		{
			id: "routes",
			label: "Routes",
			icon: Route
		},
		{
			id: "pricebook",
			label: "Price book",
			icon: BookOpen
		},
		{
			id: "equipment",
			label: "Equipment",
			icon: Truck
		},
		{
			id: "permits",
			label: "Permits",
			icon: FileWarning
		},
		{
			id: "tickets",
			label: "Tickets",
			icon: LifeBuoy
		},
		{
			id: "board",
			label: "Crew board",
			icon: Wrench
		},
		{
			id: "closers",
			label: "La cuadrilla",
			icon: Headset
		},
		{
			id: "salesforce",
			label: "Lead desk",
			icon: Cloud
		},
		{
			id: "ask",
			label: "Ask el corral",
			icon: Sparkles
		},
		{
			id: "activity",
			label: "Activity",
			icon: Activity
		},
		{
			id: "lists",
			label: "Smart lists",
			icon: Funnel
		},
		{
			id: "campaigns",
			label: "Campaigns",
			icon: Megaphone
		},
		{
			id: "funnels",
			label: "Funnels",
			icon: Waypoints
		},
		{
			id: "forms",
			label: "Forms",
			icon: ClipboardList
		},
		{
			id: "sites",
			label: "Pages",
			icon: Globe
		},
		{
			id: "social",
			label: "Social",
			icon: Share2
		},
		{
			id: "ads",
			label: "Ads & links",
			icon: BadgeDollarSign
		},
		{
			id: "costing",
			label: "Job costing",
			icon: Calculator
		},
		{
			id: "plans",
			label: "Service plans",
			icon: Repeat
		},
		{
			id: "knowledge",
			label: "Knowledge",
			icon: Library
		},
		{
			id: "surveys",
			label: "CSAT / NPS",
			icon: MessageSquare
		},
		{
			id: "academy",
			label: "Academy",
			icon: GraduationCap
		},
		{
			id: "workflows",
			label: "Workflows",
			icon: Workflow
		},
		{
			id: "agents",
			label: "Agents",
			icon: Bot
		},
		{
			id: "sequences",
			label: "Sequences",
			icon: Waypoints
		},
		{
			id: "reports",
			label: "Reports",
			icon: ChartColumn
		},
		{
			id: "coverage",
			label: "Full coverage",
			icon: ListChecks
		},
		{
			id: "team",
			label: "Team",
			icon: Shield
		},
		{
			id: "settings",
			label: "Settings",
			icon: Settings
		}
	]
}];
var MODULES = NAV.flatMap((g) => g.items);
var CREW_WRITE = [
	"jobs",
	"time",
	"photos",
	"schedule"
];
var AUTO = [
	"closers",
	"ask",
	"activity",
	"campaigns",
	"funnels",
	"forms",
	"sites",
	"social",
	"ads",
	"routes",
	"costing",
	"equipment",
	"plans",
	"knowledge",
	"surveys",
	"academy",
	"workflows",
	"agents",
	"sequences",
	"reports",
	"coverage",
	"settings"
];
function navFor(_role) {
	return NAV;
}
function allowed(_role, id) {
	return MODULES.some((item) => item.id === id);
}
function canWrite(role, id) {
	if (role === "developer") return true;
	if (id === "team") return role === "owner" || role === "manager";
	if (AUTO.includes(id)) return false;
	if (role === "operator") return CREW_WRITE.includes(id);
	if (role === "owner" || role === "manager") return true;
	return false;
}
var TRIGGERS = [
	"lead.created",
	"appointment.booked",
	"estimate.sent",
	"estimate.approved",
	"call.missed",
	"job.enroute",
	"job.complete",
	"invoice.paid",
	"invoice.overdue",
	"review.low",
	"review.high",
	"form.submitted",
	"deal.stage"
];
function Workflows() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const autos = data.workflows.filter((w) => w.lane === "auto");
	const [id, setId] = (0, import_react.useState)(autos[0]?.id ?? "");
	const wf = data.workflows.find((w) => w.id === id) ?? autos[0];
	const [step, setStep] = (0, import_react.useState)({
		op: "sms",
		text: "Hi {{name}}."
	});
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Automation",
		title: "Workflows",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => {
				const wf = newWorkflow({ name: "New line" });
				api.saveWorkflow(wf);
				setId(wf.id);
			},
			children: "New line"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: autos.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setId(row.id),
					className: `card w-full p-3 text-left ${row.id === wf?.id ? "ring-1 ring-copper" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							hot: row.enabled,
							children: row.enabled ? "live" : "off"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-mist",
						children: [
							row.trigger,
							" · ",
							row.runs,
							" runs"
						]
					})]
				}, row.id))
			}), wf ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: wf.name,
							onChange: (e) => api.saveWorkflow({
								...wf,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Trigger",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: wf.trigger,
							onChange: (e) => api.saveWorkflow({
								...wf,
								trigger: e.target.value
							}),
							children: TRIGGERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Only when stage is (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: wf.when ?? "",
							onChange: (e) => api.saveWorkflow({
								...wf,
								when: e.target.value || void 0
							}),
							placeholder: "Lost"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2 text-sm",
						children: wf.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-ink p-3",
							children: [
								i + 1,
								". ",
								s.op,
								" ",
								s.text || s.title || s.tag || s.stage || "",
								" ",
								s.minScore ? `if score ≥ ${s.minScore}` : "",
								" ",
								s.day ? `day ${s.day}` : ""
							]
						}, `${s.op}${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: step.op,
							onChange: (e) => setStep({
								...step,
								op: e.target.value
							}),
							"aria-label": "Step",
							children: [
								"sms",
								"email",
								"task",
								"tag",
								"score",
								"note",
								"review",
								"invoice"
							].map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: op }, op))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: step.text ?? "",
							onChange: (e) => setStep({
								...step,
								text: e.target.value,
								title: e.target.value
							}),
							"aria-label": "Step text"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "quiet",
							onClick: () => api.addStep(wf.id, step),
							children: "Add step"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ghost",
							onClick: () => api.toggleWorkflow(wf.id),
							children: wf.enabled ? "Pause" : "Enable"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: contactId,
							onChange: (e) => setContactId(e.target.value),
							"aria-label": "Run for",
							children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.runWorkflow(wf.id, contactId),
							children: "Run now"
						})]
					})
				]
			}) : null]
		})
	});
}
function Sequences() {
	const data = useRidge((s) => s.data);
	const enroll = useRidge((s) => s.enroll);
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const rows = data.workflows.filter((w) => w.lane === "sequence");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Follow-up",
		title: "Sequences",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "Day 0 sends now. Later days become tasks. Open Tasks and hit “Send this touch” when the day arrives."
		}), rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: row.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-2 text-sm text-mist",
					children: row.steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						s.day ? `Day ${s.day}` : "Now",
						" — ",
						s.text || s.title
					] }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: contactId,
						onChange: (e) => setContactId(e.target.value),
						"aria-label": "Enroll",
						children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => enroll(row.id, contactId),
						children: "Enroll"
					})]
				})
			]
		}, row.id))]
	});
}
function Agents() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [contactId, setContactId] = (0, import_react.useState)(data.threads[0]?.contactId ?? data.contacts[0]?.id ?? "");
	const brief = askRidge(data, "brief");
	const review = data.reviews.find((r) => !r.reply);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "La cuadrilla",
		title: "The crew on the book",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-copper",
						children: "Neto · conversations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: rioDraft(data, contactId)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: contactId,
							onChange: (e) => setContactId(e.target.value),
							"aria-label": "Rio contact",
							children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.sendMessage(contactId, "sms", rioDraft(useRidge.getState().data, contactId)),
							children: "Send draft"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-copper",
						children: "Dispatch · voice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: "If they don't pick up: “This is Carranza Dig. We can walk the site this week. We'll text you now.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3",
						onClick: () => api.addCall(contactId, "missed", "Voice agent simulated a missed call."),
						children: "Simulate missed call"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-copper",
						children: "Lalo · reviews"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: review ? solDraft(review.stars, data.contacts.find((c) => c.id === review.contactId)?.name ?? "") : "Every review has a reply."
					}),
					review ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3",
						onClick: () => api.replyReview(review.id, solDraft(review.stars, data.contacts.find((c) => c.id === review.contactId)?.name ?? "")),
						children: "Post reply"
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Morning brief"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm",
					children: brief.body
				})] })
			]
		})
	});
}
function Team() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addStaff);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("operator");
	const [made, setMade] = (0, import_react.useState)("");
	const rows = commissions(data);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "People",
		title: "Team",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-3 flex flex-wrap gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!name || !email) return;
					const pin = Math.random().toString(36).slice(2, 6) + "-" + Math.random().toString(36).slice(2, 6);
					add(name, role, email, pin);
					setMade(`${email.trim().toLowerCase()} · ${pin}`);
					setName("");
					setEmail("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Name",
						"aria-label": "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "Email",
						"aria-label": "Email",
						type: "email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: role,
						onChange: (e) => setRole(e.target.value),
						"aria-label": "Role",
						children: [
							"operator",
							"manager",
							"owner"
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r,
							children: r
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Add"
					})
				]
			}),
			made ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-sm text-copper",
				children: ["Give this once, then it leaves this screen. ", made]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: data.staff.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: person.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: person.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: person.certs.length ? person.certs.join(" · ") : "No certs on file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-copper",
						children: ["Commission pool ", money(rows.find((r) => r.name === person.name)?.amount ?? 0)]
					})
				] }, person.id))
			})
		]
	});
}
function Settings$1() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const s = data.settings;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Yard file",
		title: "Settings",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "grid gap-3 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Company",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.company,
						onChange: (e) => api.updateSettings({ company: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Yard",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.yard,
						onChange: (e) => api.updateSettings({ yard: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Phone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.phone,
						onChange: (e) => api.updateSettings({ phone: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Review link",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.reviewUrl,
						onChange: (e) => api.updateSettings({ reviewUrl: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Commission rate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: "0.01",
						value: s.commissionRate,
						onChange: (e) => api.updateSettings({ commissionRate: Number(e.target.value) })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Public site",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.site ?? "",
						onChange: (e) => api.updateSettings({ site: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Writer tone",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: s.writerTone,
						onChange: (e) => api.updateSettings({ writerTone: e.target.value })
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Take the file with you"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: "The corral file stays in this browser. Export it before you clear it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => download("bajada.json", JSON.stringify(data, null, 2)),
						children: "Export JSON"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => api.reset(),
						children: "Clear the corral file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex min-h-11 cursor-pointer items-center rounded-full bg-panel px-4 text-sm",
						children: ["Import JSON", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "application/json",
							className: "sr-only",
							onChange: async (e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								const text = await file.text();
								api.importData(JSON.parse(text));
							}
						})]
					})
				]
			})
		] })]
	});
}
var WEIGHT = {
	New: {
		p: .1,
		cat: "Pipeline"
	},
	Contacted: {
		p: .22,
		cat: "Pipeline"
	},
	"Site visit": {
		p: .4,
		cat: "Best case"
	},
	"Estimate sent": {
		p: .6,
		cat: "Commit"
	},
	Won: {
		p: 1,
		cat: "Closed"
	},
	Lost: {
		p: 0,
		cat: "Omitted"
	}
};
function weekDays() {
	const start = /* @__PURE__ */ new Date();
	start.setHours(0, 0, 0, 0);
	const monday = start.getDay() === 0 ? -6 : 1 - start.getDay();
	start.setDate(start.getDate() + monday);
	return Array.from({ length: 6 }, (_, i) => {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		return d;
	});
}
function EstimateWeek() {
	const data = useRidge((s) => s.data);
	const days = weekDays();
	const estimates = data.appointments.filter((a) => a.kind !== "Job");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2 overflow-x-auto pb-1",
		children: days.map((day) => {
			const key = dayKey(day.toISOString());
			const rows = estimates.filter((a) => dayKey(a.start) === key).sort((a, b) => a.start.localeCompare(b.start));
			const today = key === dayKey();
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `w-44 shrink-0 rounded-2xl p-2 ring-1 ${today ? "bg-panel ring-copper" : "ring-line"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-1 text-xs uppercase tracking-widest text-mist",
					children: day.toLocaleDateString("en-US", {
						weekday: "short",
						month: "short",
						day: "numeric"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 space-y-2",
					children: [rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-1 py-3 text-sm text-mist",
						children: "Open"
					}) : null, rows.map((ap) => {
						const person = data.contacts.find((c) => c.id === ap.contactId);
						const who = data.staff.find((s) => s.id === ap.staffId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-ink p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium leading-5",
									children: person?.name ?? ap.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-mist",
									children: [
										new Date(ap.start).toLocaleTimeString("en-US", {
											hour: "numeric",
											minute: "2-digit"
										}),
										" · ",
										person?.city
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-mist",
									children: ap.title.replace("Estimate · ", "")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-copper",
									children: [who?.name?.split(" ")[0], ap.source === "cdigs.bid" ? " · cdigs.bid" : ""]
								})
							]
						}, ap.id);
					})]
				})]
			}, key);
		})
	});
}
function ClosersFloor({ onNav }) {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const sessions = data.sessions ?? [];
	const closers = data.closers ?? [];
	const live = sessions.find((s) => s.stage === "dialing" || s.stage === "qualifying" || s.stage === "booking") ?? sessions.find((s) => s.stage === "handoff");
	const waiting = sessions.filter((s) => s.stage === "handoff");
	const queued = sessions.filter((s) => s.stage === "queued").length;
	const booked = (data.appointments ?? []).filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "La cuadrilla",
		title: "Chente, Neto, Chayo, Tavo",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => api.stepClosers(),
			children: data.settings.closersLive ? "Work the next lead" : "Floor is paused"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Chente is the call button. Chayo is the Spanish text. Neto is the English text. Tavo is the video on the job. Each one opens the phone you are holding. A new request also leaves their words in the inbox."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: closers.map((c) => {
					const mine = booked.filter((a) => a.bookedBy === c.id).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								hot: c.status === "on",
								children: c.status === "on" ? "live" : "paused"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: c.channel === "phone" ? "Opens the phone dialer." : c.channel === "sms" ? "Opens Messages in Spanish." : c.channel === "video" ? "Records on the job from the phone camera." : "Opens Messages in English."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm",
							children: [
								mine,
								" estimates on the book · cap ",
								c.capPerHour,
								"/hr"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "mt-3",
							tone: "quiet",
							onClick: () => api.toggleCloser(c.id),
							children: c.status === "on" ? "Pause" : "Wake"
						})
					] }, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Live conversation"
				}), live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl",
						children: live.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							live.city,
							" · ",
							live.service,
							" · intent ",
							live.intent,
							" · ",
							live.stage,
							" · ",
							queued,
							" still in queue"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2",
						children: live.transcript.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `rounded-xl px-3 py-2 text-sm ${line.who === "agent" ? "bg-ink" : "bg-soil"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs uppercase tracking-widest text-copper",
								children: line.who === "agent" ? closers.find((c) => c.id === live.closerId)?.name : live.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block",
								children: line.text
							})]
						}, i))
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-mist",
					children: "Queue is clear. The book already holds the visits they closed."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-copper",
							children: "Waiting room"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
							hot: waiting.length > 0,
							children: [waiting.length, " for a person"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-3",
						children: [waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: "No buyer is asking for a human."
						}) : null, waiting.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-ink p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-mist",
									children: [
										s.service,
										" · ",
										s.city,
										" · intent ",
										s.intent
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: s.detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									className: "mt-3",
									onClick: () => api.takeHandoff(s.id),
									children: "Take the visit and book it"
								})
							]
						}, s.id))]
					}),
					onNav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-4",
						tone: "ghost",
						onClick: () => onNav("calendar"),
						children: "Open the estimate book"
					}) : null
				] })]
			})
		]
	});
}
function SalesforceDesk() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [note, setNote] = (0, import_react.useState)("");
	const leads = data.sfLeads ?? [];
	const buckets = [
		"Pipeline",
		"Best case",
		"Commit",
		"Closed"
	].map((cat) => {
		const rows = data.deals.filter((d) => (WEIGHT[d.stage]?.cat ?? "Pipeline") === cat);
		return {
			cat,
			raw: rows.reduce((sum, d) => sum + d.value, 0),
			weighted: rows.reduce((sum, d) => sum + d.value * (WEIGHT[d.stage]?.p ?? 0), 0),
			count: rows.length
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Lead desk",
		title: "Open requests",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "A request stays a request until you confirm it. This screen does not assign a salesperson who is not on your crew, and it does not contact the customer."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: buckets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-mist",
						children: b.cat
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-3xl",
						children: money(b.weighted)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							b.count,
							" deals · ",
							money(b.raw),
							" raw"
						]
					})
				] }, b.cat))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-copper",
				children: "Leads"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: leads.map((lead) => {
					const owner = data.staff.find((s) => s.id === lead.ownerId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 rounded-xl bg-ink px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							lead.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-mist",
								children: ["· ", lead.city]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-mist",
							children: [
								lead.service,
								" · ",
								lead.source,
								" · score ",
								lead.score,
								" · ",
								owner?.name
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								hot: lead.status === "Converted" || lead.status === "Qualified",
								children: lead.status
							}), lead.status !== "Converted" && lead.status !== "Unqualified" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								tone: "quiet",
								onClick: () => api.convertLead(lead.id),
								children: "Convert"
							}) : null]
						})]
					}, lead.id);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Chatter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 flex flex-col gap-2 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						if (!note.trim()) return;
						api.postChatter(note.trim());
						setNote("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Post to the record",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "What should the crew see?"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Post"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: (data.chatter ?? []).slice(0, 12).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-copper",
									children: post.author
								}),
								" · ",
								post.record
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.text }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-mist",
							children: when(post.at)
						})
					] }, post.id))
				})
			] })
		]
	});
}
function FieldBook() {
	const data = useRidge((s) => s.data);
	const take = useRidge((s) => s.takeHandoff);
	const visits = [...data.appointments].filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid").sort((a, b) => a.start.localeCompare(b.start));
	const waiting = (data.sessions ?? []).filter((s) => s.stage === "handoff");
	const soon = visits.slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Estimate book · cdigs.bid"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-3xl",
					children: [visits.length, " clients booked"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "The closers filled this. Walk the ones on your name. Take anyone sitting in the waiting room."
				})
			] }),
			waiting.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Waiting room"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [
						s.name,
						" · ",
						s.city
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [
						s.service,
						". ",
						s.detail
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3",
					onClick: () => take(s.id),
					children: "Book this visit"
				})
			] }, s.id)),
			soon.map((ap) => {
				const person = data.contacts.find((c) => c.id === ap.contactId);
				const who = data.staff.find((s) => s.id === ap.staffId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: person?.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: ap.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: ap.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							when(ap.start),
							" · ",
							person?.city,
							" · ",
							person?.phone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: person?.address
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-copper",
						children: ["With ", who?.name]
					})
				] }, ap.id);
			})
		]
	});
}
function Invoices() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [jobId, setJobId] = (0, import_react.useState)(data.jobs.find((j) => j.status === "done")?.id ?? data.jobs[0]?.id ?? "");
	if (usePlain()) {
		const owed = data.invoices.filter((inv) => inv.status !== "paid");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
			kicker: "Yard",
			title: "Money",
			children: [owed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Nobody owes. Finished dirt shows up here."
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: owed.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: data.contacts.find((c) => c.id === inv.contactId)?.name ?? inv.number
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							money(invoiceDue(data, inv)),
							" · ",
							inv.status
						]
					})] }), inv.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.sendInvoice(inv.id),
						children: "Send"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.recordPayment(inv.id, "cash"),
						children: "Paid"
					})]
				}, inv.id))
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Cash",
		title: "Invoices",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: jobId,
					onChange: (e) => setJobId(e.target.value),
					"aria-label": "Job",
					children: data.jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: j.id,
						children: j.title
					}, j.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => api.makeInvoice(jobId),
					children: "Invoice the job"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					onClick: () => {
						const header = "number,customer,status,total,due\n";
						const body = data.invoices.map((inv) => [
							inv.number,
							data.contacts.find((c) => c.id === inv.contactId)?.name,
							inv.status,
							invoiceTotal(inv),
							inv.dueAt
						].join(",")).join("\n");
						download("cd-services-invoices.csv", header + body, "text/csv");
					},
					children: "Export CSV"
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					inv.number,
					" · ",
					data.contacts.find((c) => c.id === inv.contactId)?.name
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [
						money(invoiceTotal(inv)),
						" · due ",
						when(inv.dueAt)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							hot: inv.status === "overdue" || inv.status === "paid",
							children: inv.status
						}),
						inv.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.sendInvoice(inv.id),
							children: "Send"
						}) : null,
						inv.status !== "paid" && inv.status !== "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "quiet",
							onClick: () => api.recordPayment(inv.id, "cash"),
							children: "Mark paid"
						}) : null
					]
				})]
			}, inv.id))
		})
	});
}
function Payments() {
	const data = useRidge((s) => s.data);
	const pay = useRidge((s) => s.recordPayment);
	const open = data.invoices.filter((i) => i.status !== "paid" && i.status !== "draft");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Ledger",
		title: "Payments",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Write down money already collected on a job. Cash or check."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: open.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "w-full",
						children: [
							inv.number,
							" · ",
							money(invoiceDue(data, inv))
						]
					}), ["cash", "check"].map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => pay(inv.id, method),
						children: method
					}, method))]
				}, inv.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-2",
				children: data.payments.map((p) => {
					const inv = data.invoices.find((i) => i.id === p.invoiceId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							inv?.number,
							" · ",
							p.method
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: money(p.amount) })]
					}, p.id);
				})
			})
		]
	});
}
function Plans() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addPlan);
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [name, setName] = (0, import_react.useState)("Seasonal check");
	const [price, setPrice] = (0, import_react.useState)(450);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Recurring",
		title: "Service plans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				add(contactId, name, price, "Quarterly");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "Contact",
					children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					"aria-label": "Plan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: price,
					onChange: (e) => setPrice(Number(e.target.value)),
					"aria-label": "Price",
					className: "max-w-28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Add plan"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: data.plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: plan.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: data.contacts.find((c) => c.id === plan.contactId)?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2",
					children: [
						money(plan.price),
						" · ",
						plan.cadence
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: ["Next ", when(plan.next)]
				})
			] }, plan.id))
		})]
	});
}
function Tickets() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [subject, setSubject] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Service",
		title: "Tickets",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!subject) return;
				api.addTicket(contactId, subject, "normal");
				setSubject("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "Contact",
					children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: subject,
					onChange: (e) => setSubject(e.target.value),
					placeholder: "What broke",
					"aria-label": "Subject"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Open"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.tickets.map((ticket) => {
				const age = Math.max(0, Math.round((Date.now() - new Date(ticket.openedAt).getTime()) / 36e5));
				const late = ticket.status !== "solved" && age > ticket.slaHours;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ticket.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							data.contacts.find((c) => c.id === ticket.contactId)?.name,
							" · ",
							age,
							"h open · SLA ",
							ticket.slaHours,
							"h"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							hot: late,
							children: late ? "SLA blown" : ticket.status
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: ticket.status,
							"aria-label": "Status",
							onChange: (e) => api.setTicket(ticket.id, e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "open",
									children: "open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pending",
									children: "pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "solved",
									children: "solved"
								})
							]
						})]
					})]
				}, ticket.id);
			})
		})]
	});
}
function Knowledge() {
	const articles = useRidge((s) => s.data.articles);
	const [q, setQ] = (0, import_react.useState)("");
	const [id, setId] = (0, import_react.useState)(articles[0]?.id ?? "");
	const rows = articles.filter((a) => `${a.title} ${a.body} ${a.category}`.toLowerCase().includes(q.toLowerCase()));
	const article = articles.find((a) => a.id === id) ?? rows[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Playbooks",
		title: "Knowledge",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search the yard",
			"aria-label": "Search knowledge"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setId(a.id),
					className: "card w-full p-3 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs uppercase tracking-widest text-copper",
						children: [
							a.kind,
							" · ",
							a.category
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block",
						children: a.title
					})]
				}, a.id))
			}), article ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: article.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 leading-6",
				children: article.body
			})] }) : null]
		})]
	});
}
function Surveys() {
	const data = useRidge((s) => s.data);
	const record = useRidge((s) => s.recordSurvey);
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [kind, setKind] = (0, import_react.useState)("CSAT");
	const [score, setScore] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	const csat = data.surveys.filter((s) => s.kind === "CSAT");
	const avg = csat.length ? csat.reduce((s, r) => s + r.score, 0) / csat.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Voice of customer",
		title: "CSAT and NPS",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mist",
				children: [
					"CSAT average ",
					avg ? avg.toFixed(1) : "—",
					" on ",
					csat.length,
					" scores."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 grid gap-2 md:grid-cols-4",
				onSubmit: (e) => {
					e.preventDefault();
					record({
						contactId,
						kind,
						score,
						comment
					});
					setComment("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: contactId,
						onChange: (e) => setContactId(e.target.value),
						"aria-label": "Contact",
						children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onChange: (e) => setKind(e.target.value),
						"aria-label": "Kind",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "CSAT",
							children: "CSAT"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "NPS",
							children: "NPS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: score,
						onChange: (e) => setScore(Number(e.target.value)),
						"aria-label": "Score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Record"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						className: "md:col-span-4",
						value: comment,
						onChange: (e) => setComment(e.target.value),
						placeholder: "Comment",
						"aria-label": "Comment"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-2",
				children: data.surveys.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					s.kind,
					" ",
					s.score,
					" · ",
					data.contacts.find((c) => c.id === s.contactId)?.name
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: s.comment
				})] }, s.id))
			})
		]
	});
}
function Academy() {
	const courses = useRidge((s) => s.data.courses);
	const toggle = useRidge((s) => s.toggleCourse);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Crew academy",
		title: "Lessons",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: [
						course.forRole,
						" · ",
						course.minutes,
						" min"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: course.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3",
					tone: course.done ? "quiet" : "primary",
					onClick: () => toggle(course.id),
					children: course.done ? "Completed" : "Mark done"
				})
			] }, course.id))
		})
	});
}
function Board() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addBoard);
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Crew",
		title: "Board",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!text.trim()) return;
				add(text);
				setText("");
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Tell the yard",
				"aria-label": "Post"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				type: "submit",
				children: "Post"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.board.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-mist",
				children: [
					data.staff.find((s) => s.id === post.authorId)?.name,
					" · ",
					when(post.at)
				]
			})] }, post.id))
		})]
	});
}
var COVERAGE = [
	[
		"Floor",
		"Agents",
		"24/7 phone, chat, text, and video closers",
		"closers",
		"Mira, Luca, Vega, and Noa work the cdigs.bid book"
	],
	[
		"Floor",
		"Agents",
		"Qualifies, then books the estimate",
		"calendar",
		"A yes writes a visit on the estimate calendar"
	],
	[
		"Floor",
		"Agents",
		"Live buying intent",
		"closers",
		"Intent sits on the open conversation"
	],
	[
		"Floor",
		"Agents",
		"Human handoff and waiting room",
		"closers",
		"Take the visit books the person who asked for a human"
	],
	[
		"Floor",
		"Agents",
		"Voicemail, callback, and opt-out",
		"closers",
		"No answer, call-me-later, and STOP all stick"
	],
	[
		"Floor",
		"Agents",
		"Calling hours and caps",
		"closers",
		"Phone is 7a–7p. Chat and text never sleep. Each closer has an hourly cap"
	],
	[
		"Floor",
		"Agents",
		"Spanish closer",
		"closers",
		"Vega books in Spanish off the same calendar"
	],
	[
		"Floor",
		"Agents",
		"Transcripts on the record",
		"inbox",
		"The confirmation text lands in the thread"
	],
	[
		"Requests",
		"Leads",
		"Lead queue and conversion",
		"salesforce",
		"Convert makes a contact and an opportunity"
	],
	[
		"Requests",
		"Leads",
		"Assignment rules and territories",
		"salesforce",
		"East valley Luz, west valley Mateo"
	],
	[
		"Requests",
		"Sales",
		"Forecast categories",
		"salesforce",
		"Pipeline, best case, commit, closed"
	],
	[
		"Requests",
		"Sales",
		"Opportunity stages",
		"pipeline",
		"Same stages the digs already move through"
	],
	[
		"Requests",
		"Collab",
		"Chatter",
		"salesforce",
		"Closers post when they book. You can post too"
	],
	[
		"Requests",
		"Service",
		"Cases",
		"tickets",
		"Tickets stay the case file"
	],
	[
		"Requests",
		"Data",
		"Activity history",
		"activity",
		"Every book and conversion is on the timeline"
	],
	[
		"Follow-up",
		"CRM",
		"Contacts, tags, notes, custom fields",
		"contacts",
		"Gate code, soil, source, score, owner"
	],
	[
		"Follow-up",
		"CRM",
		"Companies and contact roles",
		"companies",
		"GC, HOA, and commercial accounts"
	],
	[
		"Follow-up",
		"CRM",
		"Opportunities and pipelines",
		"pipeline",
		"Move a dig from new lead to won or lost"
	],
	[
		"Follow-up",
		"CRM",
		"Smart lists",
		"lists",
		"Hot, customers, neighborhood, quiet leads"
	],
	[
		"Follow-up",
		"CRM",
		"Lead scoring",
		"contacts",
		"Score moves when workflows and stages run"
	],
	[
		"Follow-up",
		"CRM",
		"Tasks",
		"tasks",
		"Due work, with one-tap send on follow-ups"
	],
	[
		"Follow-up",
		"CRM",
		"Activity timeline",
		"activity",
		"Every automation and staff action"
	],
	[
		"Follow-up",
		"CRM",
		"Custom objects",
		"jobs",
		"Jobsites, equipment, and permits are real records"
	],
	[
		"Follow-up",
		"Inbox",
		"SMS, email, social, web chat, WhatsApp",
		"inbox",
		"One thread per person, channel stamped on each message"
	],
	[
		"Follow-up",
		"Inbox",
		"Missed-call text-back",
		"calls",
		"A missed call fires the text-back line"
	],
	[
		"Follow-up",
		"Inbox",
		"Voicemail drop scripts",
		"calls",
		"Drop a saved script into the thread"
	],
	[
		"Follow-up",
		"Inbox",
		"Call logging",
		"calls",
		"Inbound, outbound, answered, missed"
	],
	[
		"Follow-up",
		"Marketing",
		"Email campaigns",
		"campaigns",
		"Send to a tag or everyone"
	],
	[
		"Follow-up",
		"Marketing",
		"SMS campaigns",
		"campaigns",
		"Same send, lands in the inbox"
	],
	[
		"Follow-up",
		"Marketing",
		"Workflows and triggers",
		"workflows",
		"Lines that actually run on your data"
	],
	[
		"Follow-up",
		"Marketing",
		"Score branches",
		"workflows",
		"A step can require a minimum score"
	],
	[
		"Follow-up",
		"Marketing",
		"Calendars",
		"calendar",
		"Site visits and crew blocks"
	],
	[
		"Follow-up",
		"Marketing",
		"Online booking",
		"calendar",
		"Public book page creates the lead"
	],
	[
		"Follow-up",
		"Marketing",
		"Forms",
		"forms",
		"Test submit creates a contact"
	],
	[
		"Follow-up",
		"Marketing",
		"Surveys and quizzes",
		"forms",
		"Same capture, different kind"
	],
	[
		"Follow-up",
		"Marketing",
		"Funnels and step math",
		"funnels",
		"Visits and conversions you can bump"
	],
	[
		"Follow-up",
		"Marketing",
		"Landing pages",
		"sites",
		"Publish a page on your site"
	],
	[
		"Follow-up",
		"Marketing",
		"A/B headlines",
		"sites",
		"Two headlines, visits tallied"
	],
	[
		"Follow-up",
		"Marketing",
		"Social planner",
		"social",
		"Draft, schedule, mark posted"
	],
	[
		"Follow-up",
		"Marketing",
		"Content writer",
		"social",
		"A draft from a real job"
	],
	[
		"Follow-up",
		"Marketing",
		"Ad manager",
		"ads",
		"Spend, leads, cost per lead"
	],
	[
		"Follow-up",
		"Marketing",
		"Trackable links",
		"ads",
		"Slug clicks, no third-party pixel required"
	],
	[
		"Follow-up",
		"Reputation",
		"Review requests",
		"reviews",
		"Fires after a paid invoice"
	],
	[
		"Follow-up",
		"Reputation",
		"Review inbox and replies",
		"reviews",
		"Sol writes the reply, you send it"
	],
	[
		"Follow-up",
		"Reputation",
		"Reviews widget numbers",
		"reports",
		"Average, count, and source mix"
	],
	[
		"Follow-up",
		"Money",
		"Invoices",
		"invoices",
		"From the job, with reminders"
	],
	[
		"Follow-up",
		"Money",
		"Estimates and proposals",
		"estimates",
		"Good, better, best"
	],
	[
		"Follow-up",
		"Money",
		"Coupons",
		"estimates",
		"Neighbor cut comes off the total"
	],
	[
		"Follow-up",
		"Money",
		"Recurring plans",
		"plans",
		"Seasonal grade and septic checks"
	],
	[
		"Follow-up",
		"Product",
		"Courses",
		"academy",
		"Crew academy, mark a lesson done"
	],
	[
		"Follow-up",
		"Product",
		"Community",
		"board",
		"Internal crew board"
	],
	[
		"Follow-up",
		"Product",
		"Client portal",
		"estimates",
		"Customers approve and pay from Portal"
	],
	[
		"Follow-up",
		"Product",
		"Snapshots",
		"settings",
		"Export and import the whole file"
	],
	[
		"Follow-up",
		"Product",
		"White label",
		"settings",
		"Company name, yard, and phone skin the app"
	],
	[
		"Follow-up",
		"AI",
		"Conversation agent",
		"agents",
		"Rio drafts the next text from the thread"
	],
	[
		"Follow-up",
		"AI",
		"Voice agent",
		"agents",
		"Dispatch script plus a live call simulator"
	],
	[
		"Follow-up",
		"AI",
		"Ask copilot",
		"ask",
		"Answers from jobs, cash, and pipeline"
	],
	[
		"Follow-up",
		"Reporting",
		"Dashboards",
		"reports",
		"Cash, pipeline, margin, sources"
	],
	[
		"Field",
		"Schedule",
		"Crew calendar",
		"schedule",
		"Move a job across days and people"
	],
	[
		"Field",
		"Schedule",
		"Dispatch board",
		"dispatch",
		"Unscheduled through invoiced"
	],
	[
		"Field",
		"Schedule",
		"Job status in the field",
		"jobs",
		"En route, on site, hold, done"
	],
	[
		"Field",
		"Schedule",
		"On-my-way text",
		"jobs",
		"Status change sends the text"
	],
	[
		"Field",
		"Schedule",
		"Online booking",
		"calendar",
		"Same-day request form"
	],
	[
		"Field",
		"Schedule",
		"Skills-based assign",
		"team",
		"CDL, excavator, locator certs"
	],
	[
		"Field",
		"Money",
		"Estimates to jobs",
		"estimates",
		"Approval schedules the work"
	],
	[
		"Field",
		"Money",
		"Good / better / best",
		"estimates",
		"Three options, one signature"
	],
	[
		"Field",
		"Money",
		"Invoices from the job",
		"invoices",
		"One tap from a finished cut"
	],
	[
		"Field",
		"Money",
		"Cash and check",
		"payments",
		"The book records what was paid. No card and no loan."
	],
	[
		"Field",
		"Money",
		"Payment reminders",
		"workflows",
		"Overdue sweep texts and tasks"
	],
	[
		"Field",
		"Money",
		"Price book and flat rate",
		"pricebook",
		"Unit, price, and cost"
	],
	[
		"Field",
		"Money",
		"Job costing",
		"costing",
		"Labor, materials, spoil, margin"
	],
	[
		"Field",
		"Money",
		"Commissions",
		"reports",
		"Percent of cash collected"
	],
	[
		"Field",
		"Field",
		"Checklists",
		"jobs",
		"Locate, photos, grade, walkthrough"
	],
	[
		"Field",
		"Field",
		"Photo reports",
		"photos",
		"Before and after on the job"
	],
	[
		"Field",
		"Field",
		"GPS last ping and live map",
		"routes",
		"Yard map plus crew pings"
	],
	[
		"Field",
		"Field",
		"Routes and optimize",
		"routes",
		"Nearest-neighbor from the yard"
	],
	[
		"Field",
		"Field",
		"Time clock",
		"time",
		"Clock on a job, labor hits the cost"
	],
	[
		"Field",
		"Field",
		"Field mode",
		"jobs",
		"A truck view at /field"
	],
	[
		"Field",
		"Field",
		"Recurring service plans",
		"plans",
		"Next visit already on the calendar"
	],
	[
		"Field",
		"Field",
		"Customer history",
		"contacts",
		"Deals, jobs, invoices, thread"
	],
	[
		"Field",
		"Field",
		"Review after payment",
		"reviews",
		"Automatic ask when cash lands"
	],
	[
		"Field",
		"Books",
		"QuickBooks-ready export",
		"invoices",
		"CSV download, no sync until you connect"
	],
	[
		"Field",
		"Books",
		"Invoice file",
		"invoices",
		"Download the invoices when the books need them"
	],
	[
		"Records",
		"Marketing",
		"Source attribution",
		"reports",
		"Every contact remembers where it came from"
	],
	[
		"Records",
		"Sales",
		"Weighted forecast",
		"reports",
		"Stage weights, not a vanity total"
	],
	[
		"Records",
		"Sales",
		"Sequences",
		"sequences",
		"Day 0 sends, later touches become tasks"
	],
	[
		"Records",
		"Sales",
		"Meeting scheduler",
		"calendar",
		"Book against a person"
	],
	[
		"Records",
		"Sales",
		"Quotes",
		"estimates",
		"The estimate is the quote"
	],
	[
		"Records",
		"Sales",
		"Playbooks",
		"knowledge",
		"811, septic, spoil, walkthrough"
	],
	[
		"Records",
		"Sales",
		"Call notes",
		"calls",
		"Conversation notes stay on the call"
	],
	[
		"Records",
		"Service",
		"Tickets and SLA",
		"tickets",
		"Clock starts when the ticket opens"
	],
	[
		"Records",
		"Service",
		"Knowledge base",
		"knowledge",
		"Searchable crew answers"
	],
	[
		"Records",
		"Service",
		"CSAT and NPS",
		"surveys",
		"Scores roll into the report"
	],
	[
		"Records",
		"Service",
		"Customer portal",
		"estimates",
		"Phone lookup, approve, pay"
	],
	[
		"Records",
		"Content",
		"Pages and blog",
		"knowledge",
		"Articles plus landing pages"
	],
	[
		"Records",
		"Content",
		"SEO checklist",
		"sites",
		"Title, offer, proof, and a single ask"
	],
	[
		"Records",
		"Data",
		"Duplicate finder and merge",
		"lists",
		"Same phone, one record"
	],
	[
		"Records",
		"Data",
		"CSV import",
		"contacts",
		"Name, phone, email, address, city, source"
	],
	[
		"Records",
		"Data",
		"Calculated margin",
		"costing",
		"Price minus labor, material, haul"
	],
	[
		"Records",
		"Data",
		"Property history",
		"activity",
		"The timeline is the history"
	],
	[
		"Records",
		"Commerce",
		"Products",
		"pricebook",
		"The book is the catalog"
	],
	[
		"Records",
		"Commerce",
		"Subscriptions",
		"plans",
		"Recurring cuts and checks"
	],
	[
		"Records",
		"AI",
		"Agent hub",
		"agents",
		"Rio, Sol, Dispatch, Cut, and the morning brief"
	],
	[
		"Ridge",
		"Dig",
		"811 and locate permits",
		"permits",
		"Ticket number and expiry"
	],
	[
		"Ridge",
		"Dig",
		"Spoil loads and dump site",
		"jobs",
		"Loads roll into job cost"
	],
	[
		"Ridge",
		"Dig",
		"Equipment hours and service",
		"equipment",
		"Service-due task on boot"
	],
	[
		"Ridge",
		"Dig",
		"Soil notes and gate codes",
		"contacts",
		"On the record before the truck rolls"
	],
	[
		"Ridge",
		"Dig",
		"Weather hold",
		"dispatch",
		"Hold status, no fake progress"
	],
	[
		"Ridge",
		"Dig",
		"Bid versus actual",
		"costing",
		"Estimate total against job cost"
	],
	[
		"Ridge",
		"Dig",
		"Bilingual customer scripts",
		"inbox",
		"Spanish presets in the composer"
	],
	[
		"Ridge",
		"Dig",
		"Works offline in the browser",
		"settings",
		"The file lives on this device until you connect"
	]
].map(([from, group, feature, m, how]) => ({
	from,
	group,
	feature,
	m,
	how
}));
var DESKS = [
	{
		name: "People and follow-up",
		line: "Contacts, the inbox, and the lines that remind you to call.",
		ids: [
			"contacts",
			"pipeline",
			"inbox",
			"calls",
			"campaigns",
			"workflows",
			"calendar",
			"forms",
			"funnels",
			"sites",
			"social",
			"ads",
			"reviews",
			"sequences",
			"academy",
			"board"
		]
	},
	{
		name: "Jobs and money",
		line: "Dispatch, the written price, the truck, and what was collected.",
		ids: [
			"dispatch",
			"schedule",
			"jobs",
			"estimates",
			"invoices",
			"payments",
			"pricebook",
			"costing",
			"routes",
			"time",
			"photos",
			"equipment",
			"permits",
			"plans"
		]
	},
	{
		name: "Records",
		line: "Accounts, the forecast, and the history of each request.",
		ids: [
			"companies",
			"lists",
			"tasks",
			"tickets",
			"knowledge",
			"surveys",
			"reports",
			"activity",
			"agents"
		]
	},
	{
		name: "Requests",
		line: "Real requests from cdigs.bid.",
		ids: [
			"closers",
			"salesforce",
			"ask",
			"coverage",
			"team",
			"settings"
		]
	}
];
function tally(id, data) {
	const openDeals = data.deals.filter((d) => d.stage !== "Won" && d.stage !== "Lost").length;
	return {
		contacts: String(data.contacts.length),
		companies: String(data.companies.length),
		pipeline: String(openDeals),
		lists: String(new Set(data.contacts.flatMap((c) => c.tags)).size),
		tasks: String(data.tasks.filter((t) => !t.done).length),
		inbox: String(data.threads.filter((t) => t.unread).length),
		calls: String(data.calls.length),
		campaigns: String(data.campaigns.length),
		funnels: String(data.funnels.length),
		forms: String(data.submissions.length),
		sites: String(data.pages.length),
		social: String(data.posts.length),
		ads: String(data.ads.length),
		reviews: String(data.reviews.length),
		calendar: String(data.appointments.filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid").length),
		dispatch: String(data.jobs.filter((j) => j.status !== "done" && j.status !== "invoiced").length),
		schedule: String(data.jobs.filter((j) => dayKey(j.start) === dayKey()).length),
		jobs: String(data.jobs.length),
		routes: String(data.jobs.filter((j) => j.status === "scheduled" || j.status === "enroute").length),
		estimates: String(data.estimates.length),
		pricebook: String(data.priceBook.length),
		costing: String(data.jobs.filter((j) => j.price > 0).length),
		equipment: String(data.equipment.length),
		permits: String(data.permits.length),
		time: String(data.clocks.filter((c) => !c.outAt).length),
		photos: String(data.jobs.reduce((n, j) => n + j.photos.length, 0)),
		invoices: String(data.invoices.filter((i) => i.status !== "paid").length),
		payments: String(data.payments.length),
		plans: String(data.plans.filter((p) => p.active).length),
		tickets: String(data.tickets.filter((t) => t.status !== "solved").length),
		knowledge: String(data.articles.length),
		surveys: String(data.surveys.length),
		academy: String(data.courses.filter((c) => !c.done).length),
		board: String(data.board.length),
		workflows: String(data.workflows.filter((w) => w.enabled && w.lane === "auto").length),
		agents: String((data.closers ?? []).filter((c) => c.status === "on").length),
		sequences: String(data.workflows.filter((w) => w.lane === "sequence").length),
		closers: String((data.sessions ?? []).filter((s) => s.stage !== "booked" && s.stage !== "optout").length),
		salesforce: String((data.sfLeads ?? []).filter((l) => l.status !== "Converted" && l.status !== "Unqualified").length),
		activity: String(data.activity.length),
		coverage: String(COVERAGE.length),
		team: String(data.staff.length),
		reports: String(data.deals.length)
	}[id] ?? "Open";
}
function AllTools({ onNav }) {
	const data = useRidge((s) => s.data);
	const autos = data.workflows.filter((w) => w.enabled && w.lane === "auto");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-copper",
				children: "Already running"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: "These fire on their own. A new lead, a booked visit, a missed call, a sent estimate, a finished job, a paid invoice, a late invoice."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: autos.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => onNav("workflows"),
					className: "min-h-11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						hot: true,
						children: w.name
					})
				}, w.id))
			})
		] }), DESKS.map((desk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl",
				children: desk.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-mist",
				children: desk.line
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4",
				children: desk.ids.map((id) => {
					const item = MODULES.find((m) => m.id === id);
					if (!item) return null;
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onNav(id),
						className: "card min-h-20 p-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-sm text-mist",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-copper" }), item.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block font-display text-2xl",
							children: tally(id, data)
						})]
					}, id);
				})
			})
		] }, desk.name))]
	});
}
function Overview({ onNav }) {
	const data = useRidge((s) => s.data);
	const addLead = useRidge((s) => s.addLead);
	const toggleTask = useRidge((s) => s.toggleTask);
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [work, setWork] = (0, import_react.useState)("");
	const sessionId = useRidge((s) => s.sessionId);
	const simple = useRidge((s) => s.data.staff.find((person) => person.id === sessionId)?.role) !== "developer";
	const late = data.invoices.filter((i) => i.status === "overdue" || i.status === "sent");
	const cash = data.payments.reduce((sum, p) => {
		const at = new Date(p.at);
		const now = /* @__PURE__ */ new Date();
		return at.getMonth() === now.getMonth() && at.getFullYear() === now.getFullYear() ? sum + p.amount : sum;
	}, 0);
	const openTasks = data.tasks.filter((t) => !t.done);
	const book = data.contacts.filter((c) => c.status === "lead" || c.tags.includes("lead"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: simple ? "Yard" : "Command",
		title: simple ? "Today" : "The yard, right now",
		action: simple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => onNav("ask"),
			children: "Ask el corral"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "Call these"
				}),
				book.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "Nobody is on the book yet. A form on the site files itself here. If the shop phone rings, write them in below."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: book.map((person) => {
						const dial = person.phone.replace(/[^\d+]/g, "");
						const task = openTasks.find((t) => t.contactId === person.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl",
									children: person.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-mist",
									children: [
										person.city || "No city yet",
										" · ",
										person.phone || person.email || "No number"
									]
								}),
								task ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: task.title
								}) : null
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [dial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink",
									href: `tel:${dial}`,
									children: "Call"
								}) : null, task ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									tone: "quiet",
									onClick: () => toggleTask(task.id),
									children: "Called"
								}) : null]
							})]
						}, person.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (name.trim().length < 2 || phone.trim().length < 7) return;
						addLead({
							name: name.trim(),
							phone: phone.trim(),
							email: "",
							address: "",
							city: city.trim(),
							service: work.trim() || "Estimate",
							notes: "Called the shop.",
							source: "shop phone",
							visit: ""
						});
						setName("");
						setPhone("");
						setCity("");
						setWork("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Name",
							"aria-label": "Name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: phone,
							onChange: (e) => setPhone(e.target.value),
							placeholder: "Phone",
							"aria-label": "Phone",
							inputMode: "tel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: city,
							onChange: (e) => setCity(e.target.value),
							placeholder: "City",
							"aria-label": "City"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: work,
							onChange: (e) => setWork(e.target.value),
							placeholder: "What they need dug",
							"aria-label": "Work"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							className: "sm:col-span-2",
							children: "Put them on the book"
						})
					]
				})
			] }),
			simple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Collected this month",
						value: money(cash),
						hint: "Money you already wrote down"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Weighted pipeline",
						value: money(forecast(data)),
						hint: "Open work, not a guess"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Estimates booked",
						value: String(data.appointments.filter((a) => a.kind === "Estimate" || a.source === "cdigs.bid").length),
						hint: "Visits from the site"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open tasks",
						value: String(openTasks.length),
						hint: "Calls still to make"
					})
				]
			}),
			simple ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "The book files the requests, the follow-ups, and the ads. You call, you price, you get paid."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: "Needs a human"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2",
					children: [
						late.slice(0, 4).map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								inv.number,
								" · ",
								data.contacts.find((c) => c.id === inv.contactId)?.name
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								hot: inv.status === "overdue",
								children: [
									inv.status,
									" ",
									money(invoiceDue(data, inv))
								]
							})]
						}, inv.id)),
						openTasks.slice(0, 6).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: task.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "min-h-11 text-copper",
								onClick: () => toggleTask(task.id),
								children: "Done"
							})]
						}, task.id)),
						late.length === 0 && openTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-mist",
							children: "Nothing waiting."
						}) : null
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-mist",
						children: "Cash, six months"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: monthBuckets(data),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										stroke: "var(--color-mist)",
										fontSize: 12,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "transparent" },
										contentStyle: {
											background: "var(--color-panel)",
											border: "none",
											borderRadius: 12,
											color: "var(--color-bone)"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "cash",
										fill: "var(--color-copper)",
										radius: 6
									})
								]
							})
						})
					})]
				})]
			}),
			simple ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AllTools, { onNav })
		]
	});
}
function Ask() {
	const data = useRidge((s) => s.data);
	const [q, setQ] = (0, import_react.useState)("What's the morning brief?");
	const [answer, setAnswer] = (0, import_react.useState)(() => askRidge(data, "brief"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "El corral",
		title: "Ask el corral",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "It reads this yard's jobs, cash, and people. No outside model required, so the file still works when you move it."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				onSubmit: (e) => {
					e.preventDefault();
					setAnswer(askRidge(useRidge.getState().data, q));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					"aria-label": "Question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Ask"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: answer.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 whitespace-pre-wrap text-sm leading-6 text-mist",
					children: answer.body
				})]
			})
		] })
	});
}
function ActivityScreen() {
	const activity = useRidge((s) => s.data.activity);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "History",
		title: "Everything that moved",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: activity.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-xs text-mist",
					children: [
						when(item.at),
						" · ",
						item.kind
					]
				})]
			}, item.id))
		})
	});
}
function Reports() {
	const data = useRidge((s) => s.data);
	const avg = data.reviews.length ? data.reviews.reduce((s, r) => s + r.stars, 0) / data.reviews.length : 0;
	const won = data.deals.filter((d) => d.stage === "Won").length;
	const lost = data.deals.filter((d) => d.stage === "Lost").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Insight",
		title: "Reports",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Win rate",
					value: won + lost ? `${Math.round(won / (won + lost) * 100)}%` : "—",
					hint: `${won} won · ${lost} lost`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Review average",
					value: avg ? avg.toFixed(1) : "—",
					hint: `${data.reviews.length} on file`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Weighted forecast",
					value: money(forecast(data))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "h-72",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs uppercase tracking-widest text-mist",
				children: "Leads by source"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-56",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: sourceBuckets(data),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								stroke: "var(--color-mist)",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								stroke: "var(--color-mist)",
								fontSize: 12,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--color-panel)",
								border: "none",
								borderRadius: 12,
								color: "var(--color-bone)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "leads",
								fill: "var(--color-copper)",
								radius: 6
							})
						]
					})
				})
			})]
		})]
	});
}
function Coverage({ onNav }) {
	const sources = ["All", ...Array.from(new Set(COVERAGE.map((row) => row.from)))];
	const [from, setFrom] = (0, import_react.useState)("All");
	const rows = COVERAGE.filter((row) => from === "All" || row.from === from);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "El corral",
		title: "What el corral can do",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: sources.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				tone: from === name ? "primary" : "ghost",
				onClick: () => setFrom(name),
				children: name
			}, name))
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "These are CD Services tools for the work you already do."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onNav(row.m),
				className: "card flex w-full flex-col gap-1 p-4 text-left sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: [
						row.from,
						" · ",
						row.group
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block",
					children: row.feature
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-mist",
					children: row.how
				})]
			}, row.feature))
		})]
	});
}
var STATUSES = [
	"unscheduled",
	"scheduled",
	"enroute",
	"onsite",
	"hold",
	"done",
	"invoiced"
];
function Dispatch() {
	const jobs = useRidge((s) => s.data.jobs);
	const setStatus = useRidge((s) => s.setJobStatus);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Field",
		title: "Dispatch",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-2",
			children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-56 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs uppercase tracking-widest text-mist",
					children: status
				}), jobs.filter((j) => j.status === status).map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: job.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-mist",
							children: job.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							className: "mt-2",
							value: job.status,
							"aria-label": job.title,
							onChange: (e) => setStatus(job.id, e.target.value),
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
						})
					]
				}, job.id))]
			}, status))
		})
	});
}
function Schedule() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const days = [
		0,
		1,
		2,
		3,
		4
	];
	const crew = data.staff.filter((s) => s.role === "operator" || s.role === "dispatcher");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Field",
		title: "Schedule",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: days.map((offset) => {
				const key = dayKey(new Date(Date.now() + offset * 864e5).toISOString());
				const jobs = data.jobs.filter((j) => dayKey(j.start) === key);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: offset === 0 ? "Today" : dayLabel(offset)
					}),
					jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Open board."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-ink p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									job.title,
									" · ",
									job.status
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-mist",
									children: job.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [crew.map((person) => {
										const on = job.crewIds.includes(person.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: `min-h-11 rounded-full px-3 text-sm ${on ? "bg-copper text-copper-ink" : "bg-panel text-mist"}`,
											onClick: () => {
												const crewIds = on ? job.crewIds.filter((id) => id !== person.id) : [...job.crewIds, person.id];
												api.assignCrew(job.id, crewIds);
											},
											children: person.name.split(" ")[0]
										}, person.id);
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										className: "max-w-40",
										value: offset,
										"aria-label": "Day",
										onChange: (e) => api.moveJobDay(job.id, Number(e.target.value)),
										children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: d,
											children: dayLabel(d)
										}, d))
									})]
								})
							]
						}, job.id))
					})
				] }, key);
			})
		})
	});
}
function Jobs() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [id, setId] = (0, import_react.useState)(data.jobs[0]?.id ?? "");
	const job = data.jobs.find((j) => j.id === id) ?? data.jobs[0];
	const plain = usePlain();
	if (!job) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Yard",
		title: "Dirt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "No dirt on the board."
		})
	});
	if (plain) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Yard",
		title: "Dirt",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.jobs.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: row.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [
						data.contacts.find((c) => c.id === row.contactId)?.name,
						" · ",
						row.address
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: row.status === "enroute" ? "primary" : "ghost",
							onClick: () => api.setJobStatus(row.id, "enroute"),
							children: "On the way"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: row.status === "onsite" ? "primary" : "ghost",
							onClick: () => api.setJobStatus(row.id, "onsite"),
							children: "On the dirt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: row.status === "done" ? "primary" : "quiet",
							onClick: () => api.setJobStatus(row.id, "done"),
							children: "Done"
						})
					]
				})
			] }, row.id))
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Work orders",
		title: "Jobs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: data.jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setId(j.id),
					className: `card w-full p-3 text-left ${j.id === job.id ? "ring-1 ring-copper" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: j.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: j.status })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-mist",
						children: data.contacts.find((c) => c.id === j.contactId)?.name
					})]
				}, j.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobDetail, { job })]
		})
	});
}
function JobDetail({ job }) {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [loads, setLoads] = (0, import_react.useState)(job.loads);
	const [dump, setDump] = (0, import_react.useState)(job.dump);
	const contact = data.contacts.find((c) => c.id === job.contactId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: job.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-mist",
				children: [
					contact?.name,
					" · ",
					job.address,
					" · gate ",
					contact?.gate || "—",
					" · ",
					contact?.soil || "soil unknown"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: job.status === status ? "primary" : "ghost",
					onClick: () => api.setJobStatus(job.id, status),
					children: status
				}, status))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: job.checklist.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-h-11 items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: item.done,
						onChange: () => api.toggleCheck(job.id, item.id)
					}), item.label]
				}) }, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-[8rem_1fr_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: loads,
						onChange: (e) => setLoads(Number(e.target.value)),
						"aria-label": "Loads"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: dump,
						onChange: (e) => setDump(e.target.value),
						"aria-label": "Dump"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => api.setLoads(job.id, loads, dump),
						children: "Save spoil"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: job.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [
					money(job.price),
					" price · ",
					job.hours,
					" hours planned"
				]
			})
		]
	});
}
function Routes() {
	const data = useRidge((s) => s.data);
	const setRoute = useRidge((s) => s.setRoute);
	const yard = {
		lat: 31.3172,
		lng: -113.5284
	};
	const ordered = [...data.jobs].sort((a, b) => a.routeOrder - b.routeOrder);
	const drive = ordered.reduce((sum, job, index) => sum + miles(index === 0 ? yard : ordered[index - 1], job), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Map",
		title: "Routes",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => setRoute(optimize(data.jobs).map((j) => j.id)),
			children: "Optimize from the yard"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Phoenix valley",
				className: "h-80 w-full rounded-2xl",
				src: "https://www.openstreetmap.org/export/embed.html?bbox=-113.70%2C31.25%2C-113.35%2C31.42&layer=mapnik&marker=31.3172%2C-113.5284"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl",
						children: [drive, " mi"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: "Nearest-neighbor from the yard. Not a live traffic feed."
					})] }),
					data.pings.map((ping) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.staff.find((s) => s.id === ping.staffId)?.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							ping.status,
							" · ",
							ping.place
						]
					})] }, ping.staffId)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-2",
						children: ordered.map((job, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-sm",
							children: [
								index + 1,
								". ",
								job.title,
								" · ",
								miles(index === 0 ? yard : ordered[index - 1], job),
								" mi"
							]
						}, job.id))
					})
				]
			})]
		})
	});
}
function Estimates() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [type, setType] = (0, import_react.useState)("Pool shell");
	const [code, setCode] = (0, import_react.useState)("");
	if (usePlain()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Yard",
		title: "Prices",
		children: [data.estimates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "No prices yet. Write one after you look at the dirt."
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.estimates.map((est) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: data.contacts.find((c) => c.id === est.contactId)?.name ?? est.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [
						est.title,
						" · ",
						money(estimateTotal(est))
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.sendEstimate(est.id),
						disabled: est.status === "approved",
						children: "Send"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => api.approveEstimate(est.id, est.chosen || "Best"),
						children: "They said yes"
					})]
				})]
			}, est.id))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Quotes",
		title: "Estimates",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				api.buildEstimate(contactId, type);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "Contact",
					children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: type,
					onChange: (e) => setType(e.target.value),
					"aria-label": "Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Build good / better / best"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: data.estimates.map((est) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl",
						children: [
							est.number,
							" · ",
							est.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						hot: est.status === "approved",
						children: est.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: data.contacts.find((c) => c.id === est.contactId)?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 md:grid-cols-3",
					children: est.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-ink p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-copper",
								children: opt.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl",
								children: money(estimateTotal({
									...est,
									chosen: opt.name
								}, opt.name))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-mist",
								children: opt.note
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 text-sm",
								children: opt.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									item.qty,
									" × ",
									item.name
								] }, item.name))
							})
						]
					}, opt.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => api.sendEstimate(est.id),
							disabled: est.status === "approved",
							children: "Send"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "quiet",
							onClick: () => api.approveEstimate(est.id, "Best"),
							children: "Approve best"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: code,
							onChange: (e) => setCode(e.target.value),
							placeholder: "Code NEIGHBOR",
							"aria-label": "Coupon",
							className: "max-w-40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "ghost",
							onClick: () => {
								if (code.trim().toUpperCase() === "NEIGHBOR") api.saveEstimate({
									...est,
									discount: 150
								});
							},
							children: "Apply $150"
						})
					]
				})
			] }, est.id))
		})]
	});
}
function PriceBook() {
	const book = useRidge((s) => s.data.priceBook);
	const add = useRidge((s) => s.addPrice);
	const [item, setItem] = (0, import_react.useState)({
		category: "Custom",
		name: "",
		unit: "ea",
		price: 0,
		cost: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Flat rate",
		title: "Price book",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 grid gap-2 md:grid-cols-5",
			onSubmit: (e) => {
				e.preventDefault();
				if (!item.name) return;
				add(item);
				setItem({
					...item,
					name: ""
				});
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: item.category,
					onChange: (e) => setItem({
						...item,
						category: e.target.value
					}),
					"aria-label": "Category"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: item.name,
					onChange: (e) => setItem({
						...item,
						name: e.target.value
					}),
					placeholder: "Name",
					"aria-label": "Name"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: item.unit,
					onChange: (e) => setItem({
						...item,
						unit: e.target.value
					}),
					"aria-label": "Unit"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: item.price,
					onChange: (e) => setItem({
						...item,
						price: Number(e.target.value)
					}),
					"aria-label": "Price"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Add"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-mist",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "Item"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Unit" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Price" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Cost" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Margin" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: book.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3",
							children: [
								row.category,
								" · ",
								row.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: row.unit }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(row.price) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: money(row.cost) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [row.price ? Math.round((row.price - row.cost) / row.price * 100) : 0, "%"] })
					]
				}, row.id)) })]
			})
		})]
	});
}
function Costing() {
	const data = useRidge((s) => s.data);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Margin",
		title: "Job costing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.jobs.map((job) => {
				const math = jobMargin(job);
				const bid = data.estimates.find((e) => e.jobId === job.id || e.contactId === job.contactId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "grid gap-2 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: job.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-mist",
							children: bid ? `Bid ${bid.number}` : "No bid on file"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Price ", money(job.price)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Cost ", money(math.cost)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl",
							children: [math.pct, "%"]
						})
					]
				}, job.id);
			})
		})
	});
}
function Equipment() {
	const gear = useRidge((s) => s.data.equipment);
	const addHours = useRidge((s) => s.addHours);
	const addEquipment = useRidge((s) => s.addEquipment);
	const [name, setName] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Machine");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Fleet",
		title: "Equipment",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!name.trim()) return;
				addEquipment(name.trim(), type.trim() || "Machine");
				setName("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "Machine",
					"aria-label": "Machine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: type,
					onChange: (e) => setType(e.target.value),
					placeholder: "Type",
					"aria-label": "Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Add"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: gear.map((eq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: [
						eq.type,
						" · ",
						eq.status
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: eq.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [
						eq.hours,
						" hrs · service at ",
						eq.nextService
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-3",
					tone: "quiet",
					onClick: () => addHours(eq.id, 8),
					children: "Log 8 hours"
				})
			] }, eq.id))
		})]
	});
}
function Permits() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addPermit);
	const [type, setType] = (0, import_react.useState)("811 locate");
	const [number, setNumber] = (0, import_react.useState)("");
	const [jobId, setJobId] = (0, import_react.useState)(data.jobs[0]?.id ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "811",
		title: "Permits",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				if (!number) return;
				add(type, number, jobId);
				setNumber("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: type,
					onChange: (e) => setType(e.target.value),
					"aria-label": "Type"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: number,
					onChange: (e) => setNumber(e.target.value),
					placeholder: "Number",
					"aria-label": "Number"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: jobId,
					onChange: (e) => setJobId(e.target.value),
					"aria-label": "Job",
					children: data.jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: j.id,
						children: j.title
					}, j.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "File"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.permits.map((permit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					permit.type,
					" · ",
					permit.number
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: data.jobs.find((j) => j.id === permit.jobId)?.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
					hot: permit.status !== "clear",
					children: permit.status
				})]
			}, permit.id))
		})]
	});
}
function TimeClock() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Labor",
		title: "Time clock",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.staff.map((person) => {
				const open = data.clocks.find((c) => c.staffId === person.id && !c.outAt);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: person.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: open ? `On the clock · ${data.jobs.find((j) => j.id === open.jobId)?.title ?? "yard"}` : `${money(person.rate)}/hr`
					})] }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.clockOut(person.id),
						children: "Clock out"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => api.clockIn(person.id, data.jobs[0]?.id),
						children: "Clock in"
					})]
				}, person.id);
			})
		})
	});
}
function Reach({ name, phone }) {
	const call = telHref(phone);
	const es = smsHref(phone, spanishText(name));
	const en = smsHref(phone, englishText(name));
	if (!call) return null;
	const btn = "inline-flex min-h-[52px] items-center rounded-[10px] px-4 font-extrabold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: `${btn} bg-copper text-copper-ink`,
				href: call,
				children: "Call"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: `${btn} bg-panel text-bone`,
				href: es,
				children: "Text · Spanish"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: `${btn} bg-panel text-bone`,
				href: en,
				children: "Text · English"
			})
		]
	});
}
function VideoPick({ jobId }) {
	const add = useRidge((s) => s.addVideo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-panel px-5 font-extrabold text-bone",
		children: ["Video", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			accept: "video/*",
			capture: "environment",
			className: "sr-only",
			onChange: (e) => {
				const file = e.target.files?.[0];
				e.currentTarget.value = "";
				if (!file) return;
				const id = `vid_${Date.now()}`;
				saveClip(id, file).then(() => add(jobId, id));
			}
		})]
	});
}
function JobVideos({ videos }) {
	const [urls, setUrls] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let dead = false;
		const made = [];
		(async () => {
			const next = [];
			for (const clip of videos ?? []) {
				const blob = await loadClip(clip.id);
				if (!blob) continue;
				const url = URL.createObjectURL(blob);
				made.push(url);
				next.push({
					id: clip.id,
					url
				});
			}
			if (!dead) setUrls(next);
		})();
		return () => {
			dead = true;
			made.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [videos]);
	if (!urls.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 grid gap-2",
		children: urls.map((clip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: clip.url,
			controls: true,
			playsInline: true,
			className: "w-full rounded-lg"
		}, clip.id))
	});
}
function PhotoPick({ jobId }) {
	const add = useRidge((s) => s.addPhotoNote);
	async function take(file) {
		if (!file) return;
		const url = URL.createObjectURL(file);
		try {
			const img = await new Promise((resolve, reject) => {
				const el = new Image();
				el.onload = () => resolve(el);
				el.onerror = () => reject(/* @__PURE__ */ new Error("photo"));
				el.src = url;
			});
			const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
			add(jobId, "", canvas.toDataURL("image/jpeg", .72));
		} finally {
			URL.revokeObjectURL(url);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink",
				children: ["Camera", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					capture: "environment",
					className: "sr-only",
					onChange: (e) => {
						take(e.target.files?.[0]);
						e.currentTarget.value = "";
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "inline-flex min-h-[52px] cursor-pointer items-center rounded-[10px] bg-panel px-5 font-extrabold text-bone",
				children: ["Gallery", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "sr-only",
					onChange: (e) => {
						take(e.target.files?.[0]);
						e.currentTarget.value = "";
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoPick, { jobId })
		]
	});
}
function Photos() {
	const data = useRidge((s) => s.data);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Proof",
		title: "Photos",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Camera opens the phone camera. Gallery opens the photos already on the phone."
			}),
			data.jobs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "No jobs on the book yet. A photo needs a job to hang on."
			}) : null,
			data.jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: job.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: job.address
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoPick, { jobId: job.id })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobVideos, { videos: job.videos }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-3 sm:grid-cols-2",
					children: job.photos.map((photo, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo.src,
						alt: photo.caption || "Job photo",
						className: "h-48 w-full rounded-xl object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-1 text-sm text-mist",
						children: photo.caption
					})] }, `${photo.caption}-${index}`))
				})
			] }, job.id))
		]
	});
}
function Funnels() {
	const funnels = useRidge((s) => s.data.funnels);
	const bump = useRidge((s) => s.bumpFunnel);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Growth",
		title: "Funnels",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: funnels.map((funnel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: funnel.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 md:grid-cols-4",
				children: funnel.steps.map((step, index) => {
					const rate = step.visits ? Math.round(step.conversions / step.visits * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => bump(funnel.id, index),
						className: "rounded-2xl bg-ink p-3 text-left ring-1 ring-line",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-mist",
								children: step.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-3xl",
								children: step.visits
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-copper",
								children: [rate, "% through"]
							})
						]
					}, step.name);
				})
			})] }, funnel.id))
		})
	});
}
function Forms() {
	const data = useRidge((s) => s.data);
	const submit = useRidge((s) => s.submitForm);
	const [formId, setFormId] = (0, import_react.useState)(data.forms[0]?.id ?? "");
	const form = data.forms.find((f) => f.id === formId);
	const [answers, setAnswers] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Capture",
		title: "Forms, surveys, quizzes",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Which form",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: formId,
					onChange: (e) => {
						setFormId(e.target.value);
						setAnswers({});
					},
					children: data.forms.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: f.id,
						children: [
							f.kind,
							" · ",
							f.name
						]
					}, f.id))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 space-y-2",
				onSubmit: (e) => {
					e.preventDefault();
					submit(formId, answers);
					setAnswers({});
				},
				children: [form?.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: field,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: answers[field] ?? "",
						onChange: (e) => setAnswers({
							...answers,
							[field]: e.target.value
						})
					})
				}, field)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Submit test"
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: data.submissions.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: data.forms.find((f) => f.id === sub.formId)?.name
				}), Object.entries(sub.answers).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						k,
						": ",
						v
					]
				}, k))] }, sub.id))
			})]
		})
	});
}
function Sites() {
	const pages = useRidge((s) => s.data.pages);
	const save = useRidge((s) => s.savePage);
	const blank = {
		id: "",
		name: "New page",
		slug: "look",
		headline: "Excavation in the Phoenix valley",
		headlineB: "Pool digs, pads, and trenches",
		sub: "Own machines. We look at the dirt before we price it.",
		offer: "Free look",
		published: false,
		visitsA: 0,
		visitsB: 0,
		leads: 0,
		showB: false
	};
	const [page, setPage] = (0, import_react.useState)(pages[0] ?? null);
	if (!page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Content",
		title: "Pages",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => {
				const next = {
					...blank,
					id: `pg_${Date.now()}`
				};
				save(next);
				setPage(next);
			},
			children: "New page"
		})
	});
	const seo = [
		page.headline.length > 12,
		page.sub.length > 20,
		page.offer.length > 3,
		page.published
	].filter(Boolean).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Content",
		title: "Pages",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/p/$slug",
			params: { slug: page.slug },
			className: "min-h-11 rounded-full bg-panel px-4 flex items-center text-sm",
			children: "Open live page"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: page.name,
							onChange: (e) => setPage({
								...page,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Slug",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: page.slug,
							onChange: (e) => setPage({
								...page,
								slug: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Headline A",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: page.headline,
							onChange: (e) => setPage({
								...page,
								headline: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Headline B",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: page.headlineB,
							onChange: (e) => setPage({
								...page,
								headlineB: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Sub",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							value: page.sub,
							onChange: (e) => setPage({
								...page,
								sub: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Offer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: page.offer,
							onChange: (e) => setPage({
								...page,
								offer: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: page.published,
							onChange: (e) => setPage({
								...page,
								published: e.target.checked
							})
						}), " Published"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: page.showB,
							onChange: (e) => setPage({
								...page,
								showB: e.target.checked
							})
						}), " Serve headline B"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => save(page),
						children: "Save page"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl",
					children: page.showB ? page.headlineB : page.headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-mist",
					children: page.sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-copper",
					children: page.offer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-mist",
					children: [
						"A ",
						page.visitsA,
						" visits · B ",
						page.visitsB,
						" visits · ",
						page.leads,
						" leads"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [
						"SEO checklist ",
						seo,
						"/4 — headline, proof, offer, published."
					]
				})
			] })]
		})
	});
}
function Social() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [copy, setCopy] = (0, import_react.useState)("");
	const [network, setNetwork] = (0, import_react.useState)("Instagram");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Social",
		title: "Planner",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-3 space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: network,
					onChange: (e) => setNetwork(e.target.value),
					"aria-label": "Network",
					children: [
						"Instagram",
						"Facebook",
						"Google",
						"TikTok"
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: n }, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					value: copy,
					onChange: (e) => setCopy(e.target.value),
					placeholder: "The post",
					"aria-label": "Post"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => setCopy(writerDraft(data, data.jobs[0])),
						children: "Write from latest job"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => {
							api.savePost({
								id: `post_${Date.now()}`,
								network,
								copy: copy || writerDraft(data),
								when: (/* @__PURE__ */ new Date()).toISOString(),
								status: "draft"
							});
							setCopy("");
						},
						children: "Save draft"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: post.network
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: post.copy || "Empty draft" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: post.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => api.savePost({
							...post,
							status: nextStatus(post.status)
						}),
						children: "Advance"
					})]
				})]
			}, post.id))
		})]
	});
}
function nextStatus(status) {
	if (status === "draft") return "scheduled";
	if (status === "scheduled") return "posted";
	return "draft";
}
function Ads() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [label, setLabel] = (0, import_react.useState)("");
	const [slug, setSlug] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Acquisition",
		title: "Ads and links",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-3",
			children: data.ads.map((ad) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: [
						ad.platform,
						" · ",
						ad.status
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: ad.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-mist",
					children: [
						money(ad.spend),
						" spend · ",
						ad.leads,
						" leads"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-copper",
					children: [ad.leads ? money(ad.spend / ad.leads) : "—", " / lead"]
				})
			] }, ad.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Trackable links"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-wrap gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					if (!slug) return;
					api.addLink(label || slug, slug);
					setLabel("");
					setSlug("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: label,
						onChange: (e) => setLabel(e.target.value),
						placeholder: "Label",
						"aria-label": "Label"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: slug,
						onChange: (e) => setSlug(e.target.value),
						placeholder: "slug",
						"aria-label": "Slug"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Add"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: data.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"/",
						link.slug,
						" · ",
						link.label
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
						tone: "ghost",
						onClick: () => api.clickLink(link.slug),
						children: [link.clicks, " clicks"]
					})]
				}, link.id))
			})
		] })]
	});
}
var STAGES = [
	"New",
	"Contacted",
	"Site visit",
	"Estimate sent",
	"Won",
	"Lost"
];
function Contacts() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [id, setId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [q, setQ] = (0, import_react.useState)("");
	const [csv, setCsv] = (0, import_react.useState)("Name,Phone,Email,Address,City,Source");
	const rows = data.contacts.filter((c) => `${c.name} ${c.city} ${c.tags.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
	const contact = data.contacts.find((c) => c.id === id) ?? rows[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "CRM",
		title: "Contacts",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search",
						"aria-label": "Search contacts"
					}),
					rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setId(c.id),
						className: `card w-full p-4 text-left ${contact?.id === c.id ? "ring-1 ring-copper" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								hot: c.score >= 70,
								children: c.score
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-mist",
							children: [
								c.city,
								" · ",
								c.source
							]
						})]
					}, c.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-mist",
							children: "CSV import. Header optional."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							className: "mt-2",
							value: csv,
							onChange: (e) => setCsv(e.target.value),
							"aria-label": "CSV"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							className: "mt-2",
							onClick: () => api.importCsv(csv),
							children: "Import"
						})
					] })
				]
			}), contact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, { contact }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No one yet",
				body: "Book a visit or import a list."
			})]
		})
	});
}
function ContactCard({ contact }) {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [draft, setDraft] = (0, import_react.useState)(contact);
	const [tag, setTag] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => setDraft(contact), [contact]);
	const deals = data.deals.filter((d) => d.contactId === contact.id);
	const jobs = data.jobs.filter((j) => j.contactId === contact.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.phone,
							onChange: (e) => setDraft({
								...draft,
								phone: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.email,
							onChange: (e) => setDraft({
								...draft,
								email: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "City",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.city,
							onChange: (e) => setDraft({
								...draft,
								city: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Address",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.address,
							onChange: (e) => setDraft({
								...draft,
								address: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Gate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.gate,
							onChange: (e) => setDraft({
								...draft,
								gate: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Soil",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.soil,
							onChange: (e) => setDraft({
								...draft,
								soil: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Score",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: draft.score,
							onChange: (e) => setDraft({
								...draft,
								score: Number(e.target.value)
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: draft.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: t }, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: tag,
						onChange: (e) => setTag(e.target.value),
						placeholder: "Add tag",
						"aria-label": "Tag",
						className: "max-w-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => {
							api.addTag(contact.id, tag);
							setTag("");
						},
						children: "Tag"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.saveContact(draft),
						children: "Save record"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Note",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "What the crew should know"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				tone: "ghost",
				onClick: () => {
					if (note) {
						api.addNote(contact.id, note);
						setNote("");
					}
				},
				children: "Add note"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap text-sm text-mist",
				children: contact.notes
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: "Deals"
				}), deals.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						d.title,
						" · ",
						d.stage,
						" · ",
						money(d.value)
					]
				}, d.id))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-mist",
					children: "Jobs"
				}), jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						j.title,
						" · ",
						j.status
					]
				}, j.id))] })]
			})
		]
	});
}
function Companies() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addCompany);
	const [name, setName] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("General contractor");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "CRM",
		title: "Companies",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => {
				if (name) {
					add(name, kind, "");
					setName("");
				}
			},
			children: "Add"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 grid gap-2 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: name,
				onChange: (e) => setName(e.target.value),
				placeholder: "Company",
				"aria-label": "Company"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: kind,
				onChange: (e) => setKind(e.target.value),
				"aria-label": "Kind"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: data.companies.map((co) => {
				const people = data.contacts.filter((c) => c.companyId === co.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: co.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							co.kind,
							" · ",
							co.phone
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-1 text-sm",
						children: [people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							p.name,
							" · ",
							p.status
						] }, p.id)), !people.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-mist",
							children: "No linked people yet. Set the company on the contact when you import."
						}) : null]
					})
				] }, co.id);
			})
		})]
	});
}
function Pipeline() {
	const data = useRidge((s) => s.data);
	const move = useRidge((s) => s.moveDeal);
	const add = useRidge((s) => s.addDeal);
	const [title, setTitle] = (0, import_react.useState)("");
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [value, setValue] = (0, import_react.useState)(1500);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Sales",
		title: "Pipeline",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				add(contactId, title || "New dig", value);
				setTitle("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "Contact",
					children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Deal",
					"aria-label": "Deal",
					className: "max-w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value,
					onChange: (e) => setValue(Number(e.target.value)),
					"aria-label": "Value",
					className: "max-w-28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Add"
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-2",
			children: STAGES.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-64 shrink-0",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					const id = e.dataTransfer.getData("deal");
					if (id) move(id, stage);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs uppercase tracking-widest text-mist",
					children: stage
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: data.deals.filter((d) => d.stage === stage).map((deal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						draggable: true,
						onDragStart: (e) => e.dataTransfer.setData("deal", deal.id),
						className: "card p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: deal.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-mist",
								children: data.contacts.find((c) => c.id === deal.contactId)?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: money(deal.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								className: "mt-2",
								value: deal.stage,
								"aria-label": `Move ${deal.title}`,
								onChange: (e) => move(deal.id, e.target.value),
								children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
							})
						]
					}, deal.id))
				})]
			}, stage))
		})
	});
}
function Lists() {
	const data = useRidge((s) => s.data);
	const merge = useRidge((s) => s.merge);
	const rules = [
		{
			name: "Hot leads",
			rows: data.contacts.filter((c) => c.score >= 70 && c.status !== "customer")
		},
		{
			name: "Customers",
			rows: data.contacts.filter((c) => c.tags.includes("customer"))
		},
		{
			name: "Sandy Beach",
			rows: data.contacts.filter((c) => c.city.includes("Sandy"))
		},
		{
			name: "Quiet or lost",
			rows: data.contacts.filter((c) => c.tags.includes("lost") || c.tags.includes("nurture") || c.score < 30)
		}
	];
	const dupes = duplicateGroups(data);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Segments",
		title: "Smart lists",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: rules.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl",
					children: rule.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: rule.rows.length })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-sm",
				children: rule.rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					c.name,
					" · ",
					c.score,
					" · ",
					c.source
				] }, c.id))
			})] }, rule.name))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: "Duplicate phones"
			}),
			dupes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-mist",
				children: "No shared numbers. Import a repeat and it will land here."
			}) : null,
			dupes.map((ids) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { children: data.contacts.find((c) => c.id === id)?.name }, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "ghost",
					onClick: () => merge(ids[0], ids[1]),
					children: "Merge into the first"
				})]
			}, ids.join()))
		] })]
	});
}
function Tasks() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [title, setTitle] = (0, import_react.useState)("");
	const [contactId, setContactId] = (0, import_react.useState)("");
	const plain = usePlain();
	const open = data.tasks.filter((task) => plain ? !task.done : true);
	if (plain) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Yard",
		title: "Calls",
		children: [open.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "No calls. The book adds one when somebody asks for a look."
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: open.map((task) => {
				const person = data.contacts.find((c) => c.id === task.contactId);
				const dial = person?.phone.replace(/[^\d+]/g, "") ?? "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: person?.name ?? task.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: person?.phone || task.title
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [dial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink",
							href: `tel:${dial}`,
							children: "Call"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							tone: "quiet",
							onClick: () => api.toggleTask(task.id),
							children: "Called"
						})]
					})]
				}, task.id);
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Work",
		title: "Tasks",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 flex flex-wrap gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				api.addTask(title, contactId || void 0, api.sessionId ?? data.staff[0].id);
				setTitle("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "What has to happen",
					"aria-label": "Task"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "About",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "No contact"
					}), data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Add"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.tasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: task.done ? "text-mist line-through" : "",
					children: task.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-mist",
					children: [
						when(task.due),
						" · ",
						data.staff.find((s) => s.id === task.ownerId)?.name
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [task.payload && !task.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.sendPayload(task.id),
						children: "Send this touch"
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => api.toggleTask(task.id),
						children: task.done ? "Reopen" : "Done"
					})]
				})]
			}, task.id))
		})]
	});
}
var PRESETS = [
	{
		label: "On my way",
		body: "On the way. The crew just left the yard."
	},
	{
		label: "Estimate",
		body: "Your written price is in the portal. Good, better, and best."
	},
	{
		label: "Review",
		body: "If we earned it, a short review helps the next person find us."
	},
	{
		label: "Spanish",
		body: "Hola, somos Carranza Dig. ¿Quiere que pasemos a ver el terreno esta semana?"
	}
];
function Inbox$1() {
	const data = useRidge((s) => s.data);
	const send = useRidge((s) => s.sendMessage);
	const markRead = useRidge((s) => s.markRead);
	const threads = [...data.threads].sort((a, b) => Number(b.id.startsWith("rpt_")) - Number(a.id.startsWith("rpt_")));
	const [id, setId] = (0, import_react.useState)(threads.find((t) => t.unread)?.id ?? threads[0]?.id ?? "");
	const [channel, setChannel] = (0, import_react.useState)("sms");
	const [body, setBody] = (0, import_react.useState)("");
	const thread = data.threads.find((t) => t.id === id);
	const contact = data.contacts.find((c) => c.id === thread?.contactId);
	const title = thread?.title || contact?.name || "Thread";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, {
		kicker: "Unified inbox",
		title: "Conversations",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: threads.map((t) => {
					const person = data.contacts.find((c) => c.id === t.contactId);
					const last = t.messages[t.messages.length - 1];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setId(t.id);
							markRead(t.id);
						},
						className: `card w-full p-3 text-left ${t.id === id ? "ring-1 ring-copper" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.title || person?.name || "Thread" }), t.unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
								hot: true,
								children: "New"
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block truncate text-sm text-mist",
							children: last?.body
						})]
					}, t.id);
				})
			}), thread ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: title
				}),
				contact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-mist",
					children: [
						contact.phone,
						" · ",
						contact.email
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-mist",
					children: "Filed for the owner. Numbers from the book only."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-h-96 space-y-2 overflow-y-auto",
					children: thread.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `max-w-[90%] rounded-2xl px-3 py-2 text-sm ${m.dir === "out" ? "ml-auto bg-copper text-copper-ink" : "bg-panel"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs opacity-70",
							children: [
								m.channel,
								" · ",
								when(m.at)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: m.body
						})]
					}, m.id))
				}),
				contact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => setBody(p.body),
						children: p.label
					}, p.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => setBody(rioDraft(data, contact.id)),
						children: "Rio draft"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-3 space-y-2",
					onSubmit: (e) => {
						e.preventDefault();
						if (!body.trim()) return;
						send(contact.id, channel, body);
						setBody("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: channel,
							onChange: (e) => setChannel(e.target.value),
							"aria-label": "Channel",
							children: [
								"sms",
								"email",
								"whatsapp",
								"facebook",
								"instagram",
								"webchat",
								"google"
							].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							value: body,
							onChange: (e) => setBody(e.target.value),
							"aria-label": "Message"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							type: "submit",
							children: "Send"
						})
					]
				})] }) : null
			] }) : null]
		})
	});
}
function Calls() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addCall);
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [notes, setNotes] = (0, import_react.useState)("Voicemail drop: we can walk the site tomorrow.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Phone",
		title: "Calls",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-3 grid gap-2 md:grid-cols-[1fr_1fr_auto_auto_auto] md:items-end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Who",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: contactId,
							onChange: (e) => setContactId(e.target.value),
							children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notes or drop script",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => add(contactId, "missed", notes),
						children: "Missed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "quiet",
						onClick: () => add(contactId, "answered", notes),
						children: "Answered"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						tone: "ghost",
						onClick: () => add(contactId, "voicemail", notes),
						children: "Drop VM"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-mist",
				children: "Call opens the phone. Text opens Messages with the words already written. Spanish is Chayo. English is Neto. Chente is the call."
			}),
			data.contacts.find((c) => c.id === contactId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reach, {
					name: data.contacts.find((c) => c.id === contactId)?.name || "",
					phone: data.contacts.find((c) => c.id === contactId)?.phone || ""
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: data.calls.map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						data.contacts.find((c) => c.id === call.contactId)?.name,
						" · ",
						call.status
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-mist",
						children: call.notes
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: [
						when(call.at),
						" · ",
						call.seconds,
						"s"
					] })]
				}, call.id))
			})
		]
	});
}
function Campaigns() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const blank = {
		id: "",
		name: "",
		channel: "email",
		audience: "lead",
		body: "Hi {{name}}, it's {{company}}.",
		status: "draft",
		sent: 0,
		replies: 0
	};
	const [draft, setDraft] = (0, import_react.useState)(blank);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Marketing",
		title: "Email and ads",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Letters sitting in Gmail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "Two drafts are in estimates.carranzadig@gmail.com. They are not sent. Open Drafts and send the ones you want."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Innovative Custom Pools, admin@icpoolsaz.com. Dirt crew for their pool builds." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Arizona Pool Builders, poolbuilders.az@gmail.com. Excavation help for their pool jobs." })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl",
					children: "Where the ads go"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-mist",
					children: "Written and ready. They do not run until a Google Ads or Meta account is connected and paid. Nothing here is pretending they are live."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Google search, Phoenix valley: excavation phoenix, pool excavation, grading near me, trench for utilities, dirt removal mesa." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Headline: Excavation in Phoenix. Own machines. Free look." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Headline: Pool digs and haul-off. Written price first." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Google Business post: Digging pools, pads, and trenches across the valley. Ask for a look on cdigs.bid." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Facebook and Instagram, 25 miles around Phoenix, people interested in home construction, pools, and contractors. Same two headlines. Link cdigs.bid." })
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mb-3 grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.name,
						onChange: (e) => setDraft({
							...draft,
							name: e.target.value
						}),
						placeholder: "Campaign name",
						"aria-label": "Campaign name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: draft.channel,
							onChange: (e) => setDraft({
								...draft,
								channel: e.target.value
							}),
							"aria-label": "Channel",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "sms",
								children: "sms"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "email",
								children: "email"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: draft.audience,
							onChange: (e) => setDraft({
								...draft,
								audience: e.target.value
							}),
							"aria-label": "Audience",
							children: [
								"lead",
								"customer",
								"all",
								"nurture",
								"new"
							].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: a }, a))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						value: draft.body,
						onChange: (e) => setDraft({
							...draft,
							body: e.target.value
						}),
						"aria-label": "Body"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => {
							if (!draft.name) return;
							api.saveCampaign({
								...draft,
								id: draft.id || `camp_${Date.now()}`
							});
							setDraft(blank);
						},
						children: "Save draft"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: data.campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							c.channel,
							" · ",
							c.audience,
							" · sent ",
							c.sent
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => api.sendCampaign(c.id),
						disabled: c.status === "sent" && c.sent > 0,
						children: "File on the book"
					})]
				}, c.id))
			})
		]
	});
}
function Reviews() {
	const data = useRidge((s) => s.data);
	const api = useRidge();
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [stars, setStars] = (0, import_react.useState)(5);
	const [text, setText] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Reputation",
		title: "Reviews",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mb-3 grid gap-2 md:grid-cols-[1fr_8rem_1fr_auto] md:items-end",
			onSubmit: (e) => {
				e.preventDefault();
				api.addReview(contactId, stars, text || "Solid work.", "Google");
				setText("");
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: contactId,
					onChange: (e) => setContactId(e.target.value),
					"aria-label": "Contact",
					children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: stars,
					onChange: (e) => setStars(Number(e.target.value)),
					"aria-label": "Stars",
					children: [
						5,
						4,
						3,
						2,
						1
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: n,
						children: [n, " stars"]
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "What they said",
					"aria-label": "Review"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					type: "submit",
					children: "Log review"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: data.reviews.map((review) => {
				const name = data.contacts.find((c) => c.id === review.contactId)?.name ?? "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
								hot: review.stars >= 4,
								children: [
									review.stars,
									" · ",
									review.source
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: review.text
					}),
					review.reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-mist",
						children: ["Reply: ", review.reply]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						className: "mt-3",
						onClick: () => api.replyReview(review.id, sol(review.stars, name)),
						children: "Send Sol's reply"
					})
				] }, review.id);
			})
		})]
	});
}
function sol(stars, name) {
	const first = name.split(" ")[0];
	return stars >= 4 ? `${first}, thank you. We'll keep the lines straight and the price written before we dig.` : `${first}, thank you for saying it plain. Call the yard and ask for the owner — we'll walk it with you.`;
}
function CalendarScreen() {
	const data = useRidge((s) => s.data);
	const add = useRidge((s) => s.addAppointment);
	const [contactId, setContactId] = (0, import_react.useState)(data.contacts[0]?.id ?? "");
	const [staffId, setStaffId] = (0, import_react.useState)(data.staff[0]?.id ?? "");
	const [title, setTitle] = (0, import_react.useState)("Site visit");
	const [start, setStart] = (0, import_react.useState)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + 1);
		d.setHours(9, 0, 0, 0);
		const pad = (n) => String(n).padStart(2, "0");
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:00`;
	});
	const plain = usePlain();
	const rows = [...data.appointments].sort((a, b) => a.start.localeCompare(b.start));
	if (plain) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "Yard",
		title: "The book",
		children: [rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-mist",
			children: "Nothing booked. A request on the site lands here."
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: rows.map((ap) => {
				const person = data.contacts.find((c) => c.id === ap.contactId);
				const dial = person?.phone.replace(/[^\d+]/g, "") ?? "";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl",
						children: person?.name ?? ap.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							when(ap.start),
							" · ",
							person?.city || ap.title
						]
					})] }), dial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "inline-flex min-h-[52px] items-center rounded-[10px] bg-copper px-5 font-extrabold text-copper-ink",
						href: `tel:${dial}`,
						children: "Call"
					}) : null]
				}, ap.id);
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		kicker: "cdigs.bid",
		title: "Estimate book",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EstimateWeek, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-mist",
				children: "Every copper name came off the site. The closers keep filling the next open window. You can still book by hand."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mb-3 grid gap-2 md:grid-cols-2",
				onSubmit: (e) => {
					e.preventDefault();
					add(contactId, staffId, title, new Date(start).toISOString());
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Person",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: contactId,
							onChange: (e) => setContactId(e.target.value),
							children: data.contacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.id,
								children: c.name
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "With",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: staffId,
							onChange: (e) => setStaffId(e.target.value),
							children: data.staff.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.name
							}, s.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "When",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "datetime-local",
							value: start,
							onChange: (e) => setStart(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						children: "Book and confirm"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-mist",
				children: "Booking fires the visit-confirmation text. Customers can also use the public Book page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [...data.appointments].sort((a, b) => a.start.localeCompare(b.start)).map((ap) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-wrap justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ap.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-mist",
						children: [
							data.contacts.find((c) => c.id === ap.contactId)?.name,
							" · ",
							data.staff.find((s) => s.id === ap.staffId)?.name
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, { children: [
						when(ap.start),
						" · ",
						ap.status
					] })]
				}, ap.id))
			})
		]
	});
}
function Screen({ id, onNav }) {
	(0, import_react.useEffect)(() => {
		watchPage(id);
		return () => watchPage(null);
	}, [id]);
	switch (id) {
		case "overview": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { onNav });
		case "closers": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosersFloor, { onNav });
		case "salesforce": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SalesforceDesk, {});
		case "ask": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ask, {});
		case "activity": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityScreen, {});
		case "contacts": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contacts, {});
		case "companies": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Companies, {});
		case "pipeline": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {});
		case "lists": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lists, {});
		case "tasks": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tasks, {});
		case "inbox": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox$1, {});
		case "calls": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calls, {});
		case "campaigns": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campaigns, {});
		case "funnels": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnels, {});
		case "forms": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Forms, {});
		case "sites": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sites, {});
		case "social": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Social, {});
		case "ads": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ads, {});
		case "reviews": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {});
		case "calendar": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarScreen, {});
		case "dispatch": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dispatch, {});
		case "schedule": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Schedule, {});
		case "jobs": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jobs, {});
		case "routes": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Routes, {});
		case "estimates": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Estimates, {});
		case "pricebook": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBook, {});
		case "costing": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Costing, {});
		case "equipment": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Equipment, {});
		case "permits": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Permits, {});
		case "time": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeClock, {});
		case "photos": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Photos, {});
		case "invoices": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Invoices, {});
		case "payments": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Payments, {});
		case "plans": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plans, {});
		case "tickets": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tickets, {});
		case "knowledge": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knowledge, {});
		case "surveys": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Surveys, {});
		case "academy": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Academy, {});
		case "board": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {});
		case "workflows": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflows, {});
		case "agents": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agents, {});
		case "sequences": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequences, {});
		case "reports": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reports, {});
		case "coverage": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coverage, { onNav });
		case "team": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Team, {});
		case "settings": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings$1, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { onNav });
	}
}
function Door() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorralLang, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoorForm, {}) });
}
function DoorForm() {
	const t = useT();
	const company = useRidge((s) => s.data.settings.company);
	const signIn = useRidge((s) => s.signIn);
	const tidy = useRidge((s) => s.tidy);
	const [email, setEmail] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const [bad, setBad] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		id: "corral-root",
		className: "relative mx-auto flex min-h-screen max-w-lg flex-col justify-center px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/img/estrella.jpg",
				alt: "",
				className: "pointer-events-none absolute inset-x-0 top-0 -z-10 w-full h-auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/img/logo.png",
				alt: "",
				className: "size-14 object-contain"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-copper",
					onPointerDown: () => {
						const id = window.setTimeout(() => tidy(), 800);
						const up = () => {
							window.clearTimeout(id);
							window.removeEventListener("pointerup", up);
						};
						window.addEventListener("pointerup", up);
					},
					children: "El corral"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangButton, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-5xl leading-none",
				children: "CD Services"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-mist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					"data-no-es": true,
					children: [company, ". "]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("Sign in with your email. The password is not listed here.") })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					const ok = signIn(email, pin);
					setBad(!ok);
					if (!ok) setPin("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: email,
						onChange: (e) => setEmail(e.target.value),
						type: "email",
						autoComplete: "username",
						placeholder: "Email",
						"aria-label": "Email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: pin,
						onChange: (e) => setPin(e.target.value),
						type: "password",
						autoComplete: "current-password",
						placeholder: "Password",
						"aria-label": "Password"
					}),
					bad ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-copper",
						children: t("That sign-in does not match.")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						className: "w-full",
						children: t("Enter")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 min-h-11 text-sm text-mist",
				children: t("Back to the public site")
			})
		]
	});
}
function Shell({ module, onNav }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorralLang, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellBody, {
		module,
		onNav
	}) });
}
function ShellBody({ module, onNav }) {
	const t = useT();
	const staff = useRidge((s) => s.data.staff);
	const contacts = useRidge((s) => s.data.contacts);
	const sessionId = useRidge((s) => s.sessionId);
	const signOut = useRidge((s) => s.signOut);
	const me = staff.find((s) => s.id === sessionId);
	const menu = navFor(me?.role);
	const active = allowed(me?.role, module) ? module : "overview";
	const write = canWrite(me?.role, active);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const hits = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		if (!query) return [];
		return {
			mods: menu.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query)).slice(0, 4),
			people: contacts.filter((c) => c.name.toLowerCase().includes(query)).slice(0, 4)
		};
	}, [
		q,
		contacts,
		menu
	]);
	const nav = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-soil",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/brand/img/logo.png",
					alt: "",
					className: "size-10 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl leading-none",
					children: "CD Services"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-mist",
					children: "El corral"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "grid size-11 place-items-center md:hidden",
				onClick: () => setOpen(false),
				"aria-label": "Close menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 space-y-4 overflow-y-auto px-2 pb-6",
			children: menu.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-3 pb-1 text-xs uppercase tracking-widest text-mist",
				children: t(group.group)
			}), group.items.map((item) => {
				const Icon = item.icon;
				const on = item.id === active;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"data-guide": item.id,
					onClick: () => {
						onNav(item.id);
						setOpen(false);
					},
					className: `flex min-h-11 w-full items-center gap-2 rounded-[10px] px-3 text-left text-sm font-semibold ${on ? "bg-copper text-copper-ink" : "text-mist"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), t(item.label)]
				}, item.id);
			})] }, group.group))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "corral-root",
		className: "relative min-h-screen bg-ink md:grid md:grid-cols-[15rem_minmax(0,1fr)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/img/estrella.jpg",
				alt: "",
				className: "pointer-events-none fixed inset-x-0 top-0 -z-10 w-full h-auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "sticky top-0 hidden h-screen md:block",
				children: nav
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-30 md:hidden",
				children: nav
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 bg-ink/80",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-20 flex items-center gap-2 border-b border-line bg-ink/95 px-3 py-2 backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "grid size-11 place-items-center md:hidden",
								onClick: () => setOpen(true),
								"aria-label": "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-3 size-4 text-mist" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Search people or tools",
										"aria-label": "Search",
										className: "pl-9"
									}),
									q && hits && "mods" in hits ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute z-20 mt-1 w-full card p-2",
										children: [hits.mods.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "block min-h-11 w-full rounded-lg px-3 text-left",
											onClick: () => {
												onNav(item.id);
												setQ("");
											},
											children: t(item.label)
										}, item.id)), hits.people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "block min-h-11 w-full rounded-lg px-3 text-left",
											onClick: () => {
												onNav("contacts");
												setQ("");
											},
											children: person.name
										}, person.id))]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hidden min-h-11 items-center px-2 text-sm text-mist sm:flex",
								children: t("Site")
							}),
							me?.role === "developer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/field",
								className: "hidden min-h-11 items-center px-2 text-sm text-mist sm:flex",
								children: "Field"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-sm text-mist lg:inline",
								children: me?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "min-h-11 px-2 text-sm text-mist",
								onClick: signOut,
								children: t("Sign out")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-b border-line px-4 py-2 text-sm text-mist",
						children: write ? t("You can change this.") : me?.role === "operator" ? t("You can see this. The owner handles changes here.") : t("You can see this. The developer runs this part.")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `px-4 py-5 md:px-6 ${write ? "" : "pointer-events-none select-none"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
							id: active,
							onNav
						})
					}),
					me?.role === "developer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, { onNav }) : null
				]
			})
		]
	});
}
var LESSONS = [
	{
		id: "overview",
		text: "Overview is the yard. What is open, and what is on the book."
	},
	{
		id: "closers",
		text: "La cuadrilla is the floor. Phone, chat, and text."
	},
	{
		id: "salesforce",
		text: "Lead desk holds a request until you confirm it."
	},
	{
		id: "inbox",
		text: "Inbox is every conversation in one place."
	},
	{
		id: "calendar",
		text: "Estimate book is the visits."
	}
];
function Guide({ onNav }) {
	const navRef = (0, import_react.useRef)(onNav);
	navRef.current = onNav;
	const [mode, setMode] = (0, import_react.useState)("off");
	const [step, setStep] = (0, import_react.useState)(0);
	const [spot, setSpot] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let taught = false;
		try {
			taught = localStorage.getItem("cds-corral-taught") === "1";
		} catch {
			taught = false;
		}
		setMode(taught ? "greet" : "teach");
	}, []);
	(0, import_react.useEffect)(() => {
		if (mode !== "greet") return;
		const t = window.setTimeout(() => setMode("off"), 2200);
		return () => window.clearTimeout(t);
	}, [mode]);
	(0, import_react.useEffect)(() => {
		if (mode !== "teach") return;
		const lesson = LESSONS[step];
		if (!lesson) {
			setMode("ask");
			return;
		}
		navRef.current(lesson.id);
		const mark = window.setTimeout(() => {
			const btn = document.querySelector(`[data-guide="${lesson.id}"]`);
			if (!btn) return;
			const r = btn.getBoundingClientRect();
			setSpot({
				x: r.left + 18,
				y: r.top + r.height / 2
			});
		}, 40);
		const next = window.setTimeout(() => setStep((n) => n + 1), 2400);
		return () => {
			window.clearTimeout(mark);
			window.clearTimeout(next);
		};
	}, [mode, step]);
	if (mode === "off") return null;
	if (mode === "greet") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center gap-3",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "guide-bug bg-[#ff8614]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "guide-bug bg-[#f4efe4]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "guide-bug bg-[#e36a4d]" })
		]
	});
	const lesson = LESSONS[step];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [spot && mode === "teach" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pointer-events-none fixed z-40 size-3 rounded-full bg-[#ff8614] shadow-[0_0_0_6px_rgba(246,185,26,.25)] transition-[left,top] duration-700 ease-out",
		style: {
			left: spot.x,
			top: spot.y
		}
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-4 left-4 z-40 max-w-sm rounded-[10px] border border-copper/70 bg-ink/90 p-4 text-bone",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl",
			children: mode === "ask" ? "Was that enough?" : lesson?.text
		}), mode === "ask" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "min-h-11 rounded-[10px] bg-copper px-4 font-extrabold text-copper-ink",
				onClick: () => {
					try {
						localStorage.setItem("cds-corral-taught", "1");
					} catch {}
					setMode("greet");
				},
				children: "Good"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "min-h-11 rounded-[10px] px-4 font-extrabold text-bone ring-1 ring-line",
				onClick: () => {
					setStep(0);
					setMode("teach");
				},
				children: "Show me again"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-mist",
			children: "First time only. Then they just say hello and leave."
		})]
	})] });
}
function BootLine() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-3xl",
			children: "Opening el corral…"
		})
	});
}
//#endregion
export { PhotoPick as a, JobVideos as i, Door as n, Reach as o, FieldBook as r, Shell as s, BootLine as t };
