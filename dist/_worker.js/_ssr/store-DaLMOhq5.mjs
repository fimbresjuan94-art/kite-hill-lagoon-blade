import { i as __toESM } from "../_runtime.mjs";
import { X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DaLMOhq5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function money(n) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(Number.isFinite(n) ? n : 0);
}
function when(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "—";
	return d.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function dayKey(iso) {
	const d = iso ? new Date(iso) : /* @__PURE__ */ new Date();
	if (Number.isNaN(d.getTime())) return "";
	const m = String(d.getMonth() + 1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
	return `${d.getFullYear()}-${m}-${day}`;
}
function dayLabel(offset) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offset);
	return d.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function uid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}
function at(dayOffset, hour) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + dayOffset);
	d.setHours(hour, dayOffset * 13 % 50, 0, 0);
	return d.toISOString();
}
function monthsAgo(n) {
	const d = /* @__PURE__ */ new Date();
	d.setMonth(d.getMonth() - n);
	d.setDate(Math.min(18, d.getDate()));
	d.setHours(11, 0, 0, 0);
	return d.toISOString();
}
function phoneKey(phone) {
	return phone.replace(/\D/g, "").slice(-10);
}
var YARD = {
	lat: 31.3172,
	lng: -113.5284
};
function lineTotal(items, discount = 0) {
	const raw = items.reduce((sum, item) => sum + item.qty * item.price, 0);
	return Math.max(0, raw - discount);
}
function invoiceTotal(inv) {
	return lineTotal(inv.items);
}
function paidToward(db, invoiceId) {
	return db.payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.amount, 0);
}
function invoiceDue(db, inv) {
	return Math.max(0, invoiceTotal(inv) - paidToward(db, inv.id));
}
function estimateTotal(est, optionName) {
	const opt = est.options.find((o) => o.name === (optionName ?? est.chosen)) ?? est.options[0];
	if (!opt) return 0;
	return lineTotal(opt.items, est.discount);
}
function nameOf(db, id) {
	return db.contacts.find((c) => c.id === id)?.name ?? "Unknown";
}
function log(db, text, kind = "log") {
	return {
		...db,
		activity: [{
			id: uid("a"),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			text,
			kind
		}, ...db.activity].slice(0, 250)
	};
}
function fill(db, text, ctx) {
	const contact = db.contacts.find((c) => c.id === ctx.contactId);
	const job = db.jobs.find((j) => j.id === ctx.jobId);
	const crew = job ? job.crewIds.map((id) => db.staff.find((s) => s.id === id)?.name.split(" ")[0]).filter(Boolean).join(" & ") : "the crew";
	const amount = ctx.amount ?? job?.price ?? 0;
	return (text ?? "").replaceAll("{{name}}", contact?.name.split(" ")[0] ?? "there").replaceAll("{{full}}", contact?.name ?? "there").replaceAll("{{job}}", job?.title ?? "your project").replaceAll("{{crew}}", crew || "the crew").replaceAll("{{amount}}", money(amount)).replaceAll("{{link}}", db.settings.reviewUrl).replaceAll("{{company}}", db.settings.company).replaceAll("{{yard}}", db.settings.yard).replaceAll("{{when}}", job ? when(job.start) : "soon");
}
function ensureThread(db, contactId) {
	const found = db.threads.find((t) => t.contactId === contactId);
	if (found) return {
		db,
		thread: found
	};
	const thread = {
		id: uid("th"),
		contactId,
		unread: false,
		messages: []
	};
	return {
		db: {
			...db,
			threads: [thread, ...db.threads]
		},
		thread
	};
}
function pushMessage(db, contactId, dir, channel, body) {
	const ensured = ensureThread(db, contactId);
	const msg = {
		id: uid("m"),
		dir,
		channel,
		body,
		at: (/* @__PURE__ */ new Date()).toISOString()
	};
	const threads = ensured.db.threads.map((t) => t.id === ensured.thread.id ? {
		...t,
		unread: dir === "in",
		messages: [...t.messages, msg]
	} : t);
	return {
		...ensured.db,
		threads
	};
}
function addTask(db, task) {
	const next = {
		id: uid("t"),
		done: false,
		...task
	};
	return {
		...db,
		tasks: [next, ...db.tasks]
	};
}
function touchScore(db, contactId, delta) {
	if (!contactId || !delta) return db;
	return {
		...db,
		contacts: db.contacts.map((c) => c.id === contactId ? {
			...c,
			score: Math.max(0, Math.min(100, c.score + delta))
		} : c)
	};
}
function applyStep(db, step, ctx, actor) {
	const contact = db.contacts.find((c) => c.id === ctx.contactId);
	if (step.minScore != null && (contact?.score ?? 0) < step.minScore) return db;
	if ((step.day ?? 0) > 0) {
		const due = /* @__PURE__ */ new Date();
		due.setDate(due.getDate() + (step.day ?? 0));
		return addTask(log(db, `${actor} queued a day-${step.day} touch`, "workflow"), {
			title: step.title || step.text || "Follow up",
			contactId: ctx.contactId,
			ownerId: contact?.ownerId ?? db.staff[0]?.id ?? "",
			due: due.toISOString(),
			payload: step.text
		});
	}
	if (step.op === "sms" || step.op === "email" || step.op === "review") {
		const channel = step.op === "email" ? "email" : "sms";
		const body = fill(db, step.op === "review" ? "{{name}}, it's {{company}}. The work is done and paid. If we earned it, a review helps more than you know: {{link}}" : step.text || "", ctx);
		if (!ctx.contactId) return db;
		return log(pushMessage(db, ctx.contactId, "out", channel, body), `${actor} sent ${channel} to ${contact?.name ?? "a contact"}`, "workflow");
	}
	if (step.op === "task") return addTask(db, {
		title: fill(db, step.title || step.text || "Follow up", ctx),
		contactId: ctx.contactId,
		ownerId: contact?.ownerId ?? db.staff[0]?.id ?? "",
		due: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (step.op === "tag" && ctx.contactId && step.tag) return {
		...db,
		contacts: db.contacts.map((c) => c.id === ctx.contactId && !c.tags.includes(step.tag) ? {
			...c,
			tags: [...c.tags, step.tag]
		} : c)
	};
	if (step.op === "score") return touchScore(db, ctx.contactId, step.delta ?? 0);
	if (step.op === "dealStage" && step.stage) return {
		...db,
		deals: db.deals.map((d) => d.id === ctx.dealId || !ctx.dealId && d.contactId === ctx.contactId && d.stage !== "Lost" && d.stage !== "Won" ? {
			...d,
			stage: step.stage,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : d)
	};
	if (step.op === "note" && ctx.contactId) {
		const line = fill(db, step.text || "", ctx);
		return {
			...log(db, line, "note"),
			contacts: db.contacts.map((c) => c.id === ctx.contactId ? {
				...c,
				notes: `${c.notes}\n${line}`.trim()
			} : c)
		};
	}
	if (step.op === "invoice" && ctx.jobId) {
		const job = db.jobs.find((j) => j.id === ctx.jobId);
		if (!job) return db;
		if (db.invoices.some((inv) => inv.jobId === job.id && inv.status !== "paid")) return db;
		const inv = {
			id: uid("inv"),
			number: `INV-${1040 + db.invoices.length}`,
			contactId: job.contactId,
			jobId: job.id,
			items: [{
				name: job.title,
				qty: 1,
				price: job.price
			}],
			status: "draft",
			issuedAt: (/* @__PURE__ */ new Date()).toISOString(),
			dueAt: new Date(Date.now() + 6048e5).toISOString(),
			overduePinged: false,
			financing: db.settings.financing
		};
		return log({
			...db,
			invoices: [inv, ...db.invoices]
		}, `${actor} drafted ${inv.number} for ${job.title}`, "workflow");
	}
	return db;
}
function drain(db, actor = "Ridge") {
	let next = db;
	for (let guard = 0; guard < 60; guard += 1) {
		const run = next.runs.find((r) => r.status === "running");
		if (!run) break;
		const wf = next.workflows.find((w) => w.id === run.workflowId);
		const step = wf?.steps[run.cursor];
		if (!wf || !step) {
			next = {
				...next,
				runs: next.runs.map((r) => r.id === run.id ? {
					...r,
					status: "done"
				} : r)
			};
			continue;
		}
		const ctx = {
			contactId: run.contactId,
			jobId: run.jobId,
			dealId: run.dealId
		};
		next = applyStep(next, step, ctx, actor);
		const done = run.cursor + 1 >= wf.steps.length;
		next = {
			...next,
			runs: next.runs.map((r) => r.id === run.id ? {
				...r,
				cursor: r.cursor + 1,
				status: done ? "done" : "running"
			} : r)
		};
	}
	return {
		...next,
		runs: next.runs.slice(0, 200)
	};
}
function fire(db, trigger, ctx, actor = "Ridge") {
	const matched = db.workflows.filter((w) => {
		if (!w.enabled || w.trigger !== trigger) return false;
		if (w.when && ctx.stage && w.when !== ctx.stage) return false;
		return true;
	});
	if (!matched.length) return db;
	let next = db;
	for (const wf of matched) {
		next = {
			...next,
			workflows: next.workflows.map((w) => w.id === wf.id ? {
				...w,
				runs: w.runs + 1
			} : w),
			runs: [{
				id: uid("run"),
				workflowId: wf.id,
				contactId: ctx.contactId,
				jobId: ctx.jobId,
				dealId: ctx.dealId,
				cursor: 0,
				status: "running"
			}, ...next.runs]
		};
		next = log(next, `${wf.name} ran`, "workflow");
	}
	return drain(next, actor);
}
function runOne(db, workflowId, ctx, actor = "Ridge") {
	const wf = db.workflows.find((w) => w.id === workflowId);
	if (!wf) return db;
	return drain(log({
		...db,
		workflows: db.workflows.map((w) => w.id === wf.id ? {
			...w,
			runs: w.runs + 1
		} : w),
		runs: [{
			id: uid("run"),
			workflowId: wf.id,
			contactId: ctx.contactId,
			jobId: ctx.jobId,
			dealId: ctx.dealId,
			cursor: 0,
			status: "running"
		}, ...db.runs]
	}, `${actor} ran ${wf.name}`, "workflow"), actor);
}
function sweep(db) {
	const today = dayKey();
	if (db.settings.sweptOn === today) return drain(db);
	let next = {
		...db,
		settings: {
			...db.settings,
			sweptOn: today
		}
	};
	for (const inv of db.invoices) if ((inv.status === "sent" || inv.status === "partial") && new Date(inv.dueAt).getTime() < Date.now() && !inv.overduePinged) {
		next = {
			...next,
			invoices: next.invoices.map((row) => row.id === inv.id ? {
				...row,
				status: "overdue",
				overduePinged: true
			} : row)
		};
		next = fire(next, "invoice.overdue", {
			contactId: inv.contactId,
			amount: invoiceDue(next, inv)
		}, "Ridge");
	}
	const soon = Date.now() + 12096e5;
	for (const permit of next.permits) {
		const title = `Renew ${permit.type} ${permit.number}`;
		if (new Date(permit.expires).getTime() < soon && !next.tasks.some((t) => t.title === title)) next = addTask(next, {
			title,
			ownerId: next.staff.find((s) => s.role === "office")?.id ?? next.staff[0].id,
			due: permit.expires
		});
	}
	for (const eq of next.equipment) {
		const title = `Service ${eq.name}`;
		if (eq.hours >= eq.nextService - 10 && !next.tasks.some((t) => t.title === title && !t.done)) next = addTask(next, {
			title,
			ownerId: next.staff.find((s) => s.role === "dispatcher")?.id ?? next.staff[0].id,
			due: (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return log(next, "Morning sweep checked overdue cash, permits, and machines", "workflow");
}
function nextOwner(db) {
	const pool = db.staff.filter((s) => s.role === "estimator" || s.role === "dispatcher");
	const open = (id) => db.deals.filter((d) => d.ownerId === id && d.stage !== "Won" && d.stage !== "Lost").length;
	return [...pool].sort((a, b) => open(a.id) - open(b.id))[0]?.id ?? db.staff[0]?.id ?? "";
}
function checklistFor(type) {
	const base = [
		"811 locate is clear",
		"Before photos",
		"Spoil plan confirmed",
		"Grade check",
		"Customer walkthrough",
		"After photos"
	];
	if (type.toLowerCase().includes("septic")) base.splice(1, 0, "Tank and field setbacks checked");
	if (type.toLowerCase().includes("trench")) base.splice(1, 0, "Utility conflict walk");
	return base.map((label) => ({
		id: uid("ck"),
		label,
		done: false
	}));
}
function createLead(db, input, actor = "Site") {
	const existing = db.contacts.find((c) => phoneKey(c.phone) === phoneKey(input.phone) && phoneKey(input.phone));
	let next = db;
	let contactId = existing?.id;
	if (existing) next = {
		...next,
		contacts: next.contacts.map((c) => c.id === existing.id ? {
			...c,
			notes: `${c.notes}\nNew ${input.source} request: ${input.service}. ${input.notes}`.trim(),
			score: Math.min(100, c.score + 8)
		} : c)
	};
	else {
		contactId = uid("c");
		next = {
			...next,
			contacts: [{
				id: contactId,
				name: input.name || "New lead",
				phone: input.phone,
				email: input.email,
				address: input.address,
				city: input.city || "Puerto Peñasco",
				tags: ["lead"],
				score: 40,
				source: input.source,
				ownerId: nextOwner(next),
				status: "lead",
				notes: input.notes,
				gate: "",
				soil: "",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}, ...next.contacts]
		};
	}
	const deal = {
		id: uid("d"),
		title: input.service || "Site visit",
		contactId,
		value: 0,
		stage: "New",
		ownerId: next.contacts.find((c) => c.id === contactId)?.ownerId ?? nextOwner(next),
		source: input.source,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	next = {
		...next,
		deals: [deal, ...next.deals]
	};
	next = log(next, `${actor} captured ${input.name || "a lead"} from ${input.source}`, "lead");
	return fire(next, "lead.created", {
		contactId,
		dealId: deal.id
	}, actor);
}
function packagesFor(db, type) {
	const want = type.toLowerCase();
	const pick = (...ids) => ids.map((id) => db.priceBook.find((p) => p.id === id)).filter((p) => Boolean(p)).map((p) => ({
		name: p.name,
		qty: 1,
		price: p.price
	}));
	if (want.includes("pool")) return [
		{
			name: "Good",
			note: "Dig only. You haul.",
			items: pick("pool")
		},
		{
			name: "Better",
			note: "Dig plus eight spoil loads.",
			items: [...pick("pool"), {
				name: "Spoil load",
				qty: 8,
				price: 185
			}]
		},
		{
			name: "Best",
			note: "Dig, haul, laser finish.",
			items: [
				...pick("pool"),
				{
					name: "Spoil load",
					qty: 8,
					price: 185
				},
				...pick("laser")
			]
		}
	];
	if (want.includes("septic")) return [
		{
			name: "Good",
			note: "Tank set.",
			items: pick("tank")
		},
		{
			name: "Better",
			note: "Tank and field.",
			items: pick("tank", "field")
		},
		{
			name: "Best",
			note: "Tank, field, six loads.",
			items: [...pick("tank", "field"), {
				name: "Spoil load",
				qty: 6,
				price: 185
			}]
		}
	];
	if (want.includes("trench")) return [
		{
			name: "Good",
			note: "Machine hour.",
			items: pick("ex")
		},
		{
			name: "Better",
			note: "Four hours plus haul.",
			items: [{
				name: "Excavator hour",
				qty: 4,
				price: 185
			}, {
				name: "Spoil load",
				qty: 2,
				price: 185
			}]
		},
		{
			name: "Best",
			note: "Day rate, haul, laser.",
			items: [
				{
					name: "Excavator hour",
					qty: 8,
					price: 185
				},
				{
					name: "Spoil load",
					qty: 3,
					price: 185
				},
				...pick("laser")
			]
		}
	];
	return [
		{
			name: "Good",
			note: "Pad cut.",
			items: pick("pad")
		},
		{
			name: "Better",
			note: "Pad plus haul.",
			items: [...pick("pad"), {
				name: "Spoil load",
				qty: 4,
				price: 185
			}]
		},
		{
			name: "Best",
			note: "Pad, haul, laser.",
			items: [
				...pick("pad"),
				{
					name: "Spoil load",
					qty: 4,
					price: 185
				},
				...pick("laser")
			]
		}
	];
}
function miles(a, b) {
	const dy = (a.lat - b.lat) * 69;
	const dx = (a.lng - b.lng) * 54;
	return Math.round(Math.sqrt(dx * dx + dy * dy) * 10) / 10;
}
function optimize(jobs) {
	const open = jobs.filter((j) => j.status !== "done" && j.status !== "invoiced");
	const ordered = [];
	let cursor = YARD;
	const pool = [...open];
	while (pool.length) {
		pool.sort((a, b) => miles(cursor, a) - miles(cursor, b));
		const next = pool.shift();
		ordered.push(next);
		cursor = next;
	}
	return ordered;
}
function duplicateGroups(db) {
	const map = /* @__PURE__ */ new Map();
	for (const c of db.contacts) {
		const key = phoneKey(c.phone);
		if (!key) continue;
		map.set(key, [...map.get(key) ?? [], c.id]);
	}
	return [...map.values()].filter((ids) => ids.length > 1);
}
function mergeContacts(db, keepId, dropId) {
	if (keepId === dropId) return db;
	const drop = db.contacts.find((c) => c.id === dropId);
	const keep = db.contacts.find((c) => c.id === keepId);
	if (!drop || !keep) return db;
	const tags = [.../* @__PURE__ */ new Set([...keep.tags, ...drop.tags])];
	return log({
		...db,
		contacts: db.contacts.filter((c) => c.id !== dropId).map((c) => c.id === keepId ? {
			...c,
			tags,
			notes: `${c.notes}\nMerged ${drop.name}. ${drop.notes}`.trim(),
			score: Math.max(c.score, drop.score)
		} : c),
		deals: db.deals.map((d) => d.contactId === dropId ? {
			...d,
			contactId: keepId
		} : d),
		jobs: db.jobs.map((j) => j.contactId === dropId ? {
			...j,
			contactId: keepId
		} : j),
		estimates: db.estimates.map((e) => e.contactId === dropId ? {
			...e,
			contactId: keepId
		} : e),
		invoices: db.invoices.map((i) => i.contactId === dropId ? {
			...i,
			contactId: keepId
		} : i),
		threads: db.threads.filter((t) => t.contactId !== dropId),
		tasks: db.tasks.map((t) => t.contactId === dropId ? {
			...t,
			contactId: keepId
		} : t),
		reviews: db.reviews.map((r) => r.contactId === dropId ? {
			...r,
			contactId: keepId
		} : r),
		appointments: db.appointments.map((a) => a.contactId === dropId ? {
			...a,
			contactId: keepId
		} : a)
	}, `Merged ${drop.name} into ${keep.name}`, "data");
}
var WEIGHT = {
	New: .1,
	Contacted: .22,
	"Site visit": .4,
	"Estimate sent": .6,
	Won: 1,
	Lost: 0
};
function forecast(db) {
	return db.deals.reduce((sum, d) => sum + d.value * (WEIGHT[d.stage] ?? .15), 0);
}
function monthBuckets(db) {
	const now = /* @__PURE__ */ new Date();
	return Array.from({ length: 6 }, (_, index) => {
		const d = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
		return {
			name: d.toLocaleString("en-US", { month: "short" }),
			cash: db.payments.filter((p) => {
				const at = new Date(p.at);
				return at.getMonth() === d.getMonth() && at.getFullYear() === d.getFullYear();
			}).reduce((sum, p) => sum + p.amount, 0)
		};
	});
}
function sourceBuckets(db) {
	const map = /* @__PURE__ */ new Map();
	for (const c of db.contacts) map.set(c.source, (map.get(c.source) ?? 0) + 1);
	return [...map.entries()].map(([name, leads]) => ({
		name,
		leads
	}));
}
function jobMargin(job) {
	const cost = job.costLabor + job.costMaterials + job.loads * 70;
	return {
		cost,
		margin: job.price - cost,
		pct: job.price ? Math.round((job.price - cost) / job.price * 100) : 0
	};
}
function commissions(db) {
	const rows = /* @__PURE__ */ new Map();
	for (const payment of db.payments) {
		const inv = db.invoices.find((i) => i.id === payment.invoiceId);
		if (!inv) continue;
		const owner = db.deals.find((d) => d.contactId === inv.contactId && d.stage === "Won")?.ownerId ?? db.staff[0]?.id;
		if (!owner) continue;
		rows.set(owner, (rows.get(owner) ?? 0) + payment.amount * db.settings.commissionRate);
	}
	return [...rows.entries()].map(([id, amount]) => ({
		name: db.staff.find((s) => s.id === id)?.name ?? "Crew",
		amount
	}));
}
function askRidge(db, q) {
	const s = q.toLowerCase();
	const openJobs = db.jobs.filter((j) => j.status !== "done" && j.status !== "invoiced");
	const overdue = db.invoices.filter((i) => i.status === "overdue" || i.status === "sent" && new Date(i.dueAt) < /* @__PURE__ */ new Date());
	const waiting = overdue.reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
	if (s.includes("overdue") || s.includes("invoice") || s.includes("cash") || s.includes("owe")) return {
		title: waiting ? `${money(waiting)} is late` : "Cash is current",
		body: overdue.length ? overdue.map((inv) => `${inv.number} · ${nameOf(db, inv.contactId)} · ${money(invoiceDue(db, inv))}`).join("\n") : "No sent invoice is past due.",
		m: "invoices"
	};
	if (s.includes("today") || s.includes("crew") || s.includes("schedule") || s.includes("who")) {
		const today = dayKey();
		const jobs = db.jobs.filter((j) => dayKey(j.start) === today);
		return {
			title: jobs.length ? `${jobs.length} jobs today` : "Nothing on today's board",
			body: jobs.map((j) => {
				const crew = j.crewIds.map((id) => db.staff.find((p) => p.id === id)?.name.split(" ")[0]).join(", ");
				return `${j.title} · ${j.status} · ${crew || "unassigned"}`;
			}).join("\n") || "Open the schedule and drop a job on a crew.",
			m: "schedule"
		};
	}
	if (s.includes("pipeline") || s.includes("forecast") || s.includes("deal")) return {
		title: `${money(forecast(db))} weighted`,
		body: db.deals.filter((d) => d.stage !== "Lost").map((d) => `${d.stage}: ${d.title} · ${money(d.value)}`).join("\n"),
		m: "pipeline"
	};
	if (s.includes("review")) {
		const avg = db.reviews.length ? db.reviews.reduce((sum, r) => sum + r.stars, 0) / db.reviews.length : 0;
		const quiet = db.reviews.filter((r) => !r.reply);
		return {
			title: avg ? `${avg.toFixed(1)} star average` : "No reviews yet",
			body: quiet.length ? `${quiet.length} still need a reply.` : "Every review has a reply.",
			m: "reviews"
		};
	}
	if (s.includes("margin") || s.includes("profit") || s.includes("cost")) {
		const worst = [...db.jobs.map((j) => ({
			j,
			...jobMargin(j)
		}))].sort((a, b) => a.pct - b.pct)[0];
		return {
			title: worst ? `Tightest job is ${worst.pct}%` : "No jobs",
			body: worst ? `${worst.j.title} · price ${money(worst.j.price)} · cost ${money(worst.cost)}` : "",
			m: "costing"
		};
	}
	if (s.includes("permit") || s.includes("811") || s.includes("locate")) return {
		title: `${db.permits.length} locate files`,
		body: db.permits.map((p) => `${p.type} ${p.number} · ${p.status} · exp ${when(p.expires)}`).join("\n"),
		m: "permits"
	};
	const hit = db.contacts.find((c) => s.includes(c.name.toLowerCase().split(" ")[0].toLowerCase()) && s.length > 2);
	if (hit) {
		const jobs = db.jobs.filter((j) => j.contactId === hit.id).length;
		return {
			title: hit.name,
			body: `${hit.city} · score ${hit.score} · ${hit.source}\n${hit.notes || "No notes."}\n${jobs} jobs on file.`,
			m: "contacts"
		};
	}
	const tasks = db.tasks.filter((t) => !t.done).length;
	return {
		title: "Morning brief",
		body: `${openJobs.length} open jobs. ${money(waiting)} late. ${tasks} open tasks. Weighted pipeline ${money(forecast(db))}. Ask about a person, today, cash, reviews, margin, or permits.`,
		m: "overview"
	};
}
function rioDraft(db, contactId) {
	const last = [...db.threads.find((t) => t.contactId === contactId)?.messages ?? []].reverse().find((m) => m.dir === "in");
	const contact = db.contacts.find((c) => c.id === contactId);
	if (!last) return `Hi ${contact?.name.split(" ")[0] ?? "there"}, this is ${db.settings.company}. Want us to walk the site this week?`;
	return `Hi ${contact?.name.split(" ")[0] ?? "there"} — got your note. ${last.body.slice(0, 80)} We can put a time on the board. Reply with a window that works.`;
}
function solDraft(stars, name) {
	const first = name.split(" ")[0];
	if (stars >= 4) return `${first}, thank you. We'll keep the lines straight and the price written before we dig.`;
	return `${first}, thank you for saying it. We want to make this right — call the yard and ask for the owner. We'll walk it with you.`;
}
function writerDraft(db, job) {
	const tone = db.settings.writerTone;
	if (!job) return `${tone} Fresh cuts in ${db.settings.yard}. Written price before the machine starts.`;
	return `${tone} ${job.title} in ${job.address}. ${job.loads} spoil loads, checklist on the job, price locked at ${money(job.price)}.`;
}
function newWorkflow(partial) {
	return {
		id: uid("wf"),
		name: partial.name || "New line",
		trigger: partial.trigger || "lead.created",
		when: partial.when,
		enabled: partial.enabled ?? true,
		lane: partial.lane ?? "auto",
		steps: partial.steps ?? [{
			op: "sms",
			text: "Hi {{name}}, it's {{company}}."
		}],
		runs: 0
	};
}
var WEST = /* @__PURE__ */ new Set([
	"Glendale",
	"Peoria",
	"Goodyear",
	"Avondale",
	"Tolleson",
	"Maricopa"
]);
var BOOKED = [
	[
		"Nora Hale",
		"602-555-2101",
		"nora.hale@example.com",
		"4142 N 16th St",
		"Phoenix",
		"Trenching",
		"Water and electric to a new casita"
	],
	[
		"Andre Williams",
		"480-555-2102",
		"andre.w@example.com",
		"8821 E Shea Blvd",
		"Scottsdale",
		"Pool excavation",
		"Pool shell. Haul the spoil"
	],
	[
		"Priya Shah",
		"480-555-2103",
		"priya.shah@example.com",
		"210 W Baseline Rd",
		"Mesa",
		"Grading",
		"Backyard pad sloped to the alley"
	],
	[
		"Luis Ortega",
		"480-555-2104",
		"luis.ortega@example.com",
		"1550 S Rural Rd",
		"Tempe",
		"Dirt removal",
		"Fill dirt off a driveway cut"
	],
	[
		"Helen Cho",
		"623-555-2105",
		"helen.cho@example.com",
		"6701 W Bell Rd",
		"Glendale",
		"Land clearing",
		"Mesquite and brush before a pad"
	],
	[
		"Marcus Bell",
		"623-555-2106",
		"marcus.bell@example.com",
		"8420 W Thunderbird",
		"Peoria",
		"Footings",
		"Stem wall and four post holes"
	],
	[
		"Sofia Navarro",
		"623-555-2107",
		"sofia.navarro@example.com",
		"1540 N Litchfield Rd",
		"Goodyear",
		"Demolition",
		"Old slab and a shed pad"
	],
	[
		"Jonah Ellis",
		"623-555-2108",
		"jonah.ellis@example.com",
		"11440 W Van Buren",
		"Avondale",
		"Trenching",
		"Irrigation and conduit"
	],
	[
		"Camille Brooks",
		"623-555-2109",
		"camille.brooks@example.com",
		"9801 W Lower Buckeye",
		"Tolleson",
		"Grading",
		"Drainage away from the barn"
	],
	[
		"Diego Alvarez",
		"520-555-2110",
		"diego.alvarez@example.com",
		"44700 W Smith-Enke",
		"Maricopa",
		"Excavation",
		"Building pad, laser checked"
	],
	[
		"Ruth Keene",
		"602-555-2111",
		"ruth.keene@example.com",
		"3310 E McDowell Rd",
		"Phoenix",
		"Tree removal",
		"One stump, haul the wood"
	],
	[
		"Samir Haddad",
		"480-555-2112",
		"samir.haddad@example.com",
		"7600 E Indian School",
		"Scottsdale",
		"Trenching",
		"Sewer lateral, locate first"
	],
	[
		"Imani Brooks",
		"480-555-2113",
		"imani.brooks@example.com",
		"2245 S Val Vista",
		"Mesa",
		"Pool excavation",
		"Shell only. Builder does the steel"
	],
	[
		"Peter Lang",
		"480-555-2114",
		"peter.lang@example.com",
		"909 W University",
		"Tempe",
		"Concrete removal",
		"Driveway tear-out and haul"
	],
	[
		"Grace Kim",
		"623-555-2115",
		"grace.kim@example.com",
		"5120 W Olive Ave",
		"Glendale",
		"Grading",
		"Lot level for a manufactured home"
	],
	[
		"Owen Price",
		"623-555-2116",
		"owen.price@example.com",
		"25555 N Lake Pleasant",
		"Peoria",
		"Dirt removal",
		"Spoils from a neighbor's cut"
	]
];
function territoryOwner(city, luz, mateo) {
	return WEST.has(city) ? mateo : luz;
}
function priceGuess(service) {
	const s = service.toLowerCase();
	if (s.includes("pool")) return 6400;
	if (s.includes("grad")) return 4200;
	if (s.includes("demo") || s.includes("concrete")) return 3100;
	if (s.includes("tree") || s.includes("clear")) return 2800;
	if (s.includes("dirt") || s.includes("haul")) return 1900;
	if (s.includes("foot") || s.includes("post")) return 1600;
	if (s.includes("pad") || s.includes("excav")) return 5400;
	return 2400;
}
function planSlots(count) {
	const hours = [
		8,
		10,
		13,
		15
	];
	const out = [];
	for (let day = 0; day < 21 && out.length < count; day += 1) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + day);
		if (d.getDay() === 0) continue;
		for (const hour of hours) {
			const slot = new Date(d);
			slot.setHours(hour, hour === 13 ? 30 : 0, 0, 0);
			if (slot.getTime() < Date.now() + 12e5) continue;
			out.push(slot.toISOString());
			if (out.length >= count) break;
		}
	}
	return out;
}
function nextSlot(data) {
	const hours = [
		8,
		10,
		13,
		15
	];
	for (let day = 0; day < 21; day += 1) {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + day);
		if (d.getDay() === 0) continue;
		for (const hour of hours) {
			const slot = new Date(d);
			slot.setHours(hour, hour === 13 ? 30 : 0, 0, 0);
			if (slot.getTime() < Date.now() + 12e5) continue;
			if (!data.appointments.some((a) => {
				if (a.kind === "Job") return false;
				return Math.abs(new Date(a.start).getTime() - slot.getTime()) < 27e5;
			})) return slot.toISOString();
		}
	}
	return null;
}
function closers() {
	return [
		{
			id: "cl_mira",
			name: "Mira",
			channel: "phone",
			lang: "English",
			status: "on",
			window: "7a–7p local",
			capPerHour: 8
		},
		{
			id: "cl_luca",
			name: "Luca",
			channel: "chat",
			lang: "English",
			status: "on",
			window: "24/7",
			capPerHour: 20
		},
		{
			id: "cl_vega",
			name: "Vega",
			channel: "sms",
			lang: "Spanish",
			status: "on",
			window: "24/7",
			capPerHour: 12
		},
		{
			id: "cl_noa",
			name: "Noa",
			channel: "video",
			lang: "English",
			status: "on",
			window: "24/7",
			capPerHour: 6
		}
	];
}
function endOf(start) {
	return new Date(new Date(start).getTime() + 45e5).toISOString();
}
function cdigsLayer(luz, mateo, owner) {
	const slots = planSlots(BOOKED.length);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const contacts = [];
	const deals = [];
	const appointments = [];
	const threads = [];
	const sfLeads = [];
	const closerIds = [
		"cl_mira",
		"cl_luca",
		"cl_vega",
		"cl_noa"
	];
	BOOKED.forEach((row, index) => {
		const [name, phone, email, address, city, service, detail] = row;
		const n = String(index + 1).padStart(2, "0");
		const id = `c_cd${n}`;
		const staffId = territoryOwner(city, luz, mateo);
		const closerId = closerIds[index % closerIds.length];
		const start = slots[index] ?? slots[slots.length - 1];
		contacts.push({
			id,
			name,
			phone,
			email,
			address,
			city,
			tags: [
				"estimate",
				"cdigs.bid",
				city.toLowerCase()
			],
			score: 72 + index % 18,
			source: "cdigs.bid",
			ownerId: staffId,
			status: "lead",
			notes: `${detail}. Booked by the closer floor off cdigs.bid. Free estimate visit, not a dig yet.`,
			gate: "",
			soil: "",
			createdAt: now
		});
		deals.push({
			id: `d_cd${n}`,
			title: `${service} — ${city}`,
			contactId: id,
			value: priceGuess(service),
			stage: "Site visit",
			ownerId: staffId,
			source: "cdigs.bid",
			updatedAt: now
		});
		appointments.push({
			id: `ap_cd${n}`,
			title: `Estimate · ${service}`,
			contactId: id,
			staffId,
			start,
			end: endOf(start),
			kind: "Estimate",
			status: "booked",
			source: "cdigs.bid",
			bookedBy: closerId
		});
		const agent = closerId === "cl_vega" ? "Vega" : closerId === "cl_luca" ? "Luca" : closerId === "cl_noa" ? "Noa" : "Mira";
		threads.push({
			id: `th_cd${n}`,
			contactId: id,
			unread: false,
			messages: [{
				id: `m_cd${n}`,
				dir: "out",
				channel: closerId === "cl_vega" ? "sms" : closerId === "cl_luca" ? "webchat" : "sms",
				body: closerId === "cl_vega" ? `${name.split(" ")[0]}, su visita de estimado está en el calendario. CD Services — cdigs.bid. Responda STOP para salir.` : `${name.split(" ")[0]}, your free estimate visit is booked. ${agent} at CD Services. We'll text before we roll. Reply STOP to opt out.`,
				at: now
			}]
		});
		sfLeads.push({
			id: `sf_cd${n}`,
			name,
			company: "Homeowner",
			phone,
			email,
			city,
			source: "cdigs.bid",
			status: "Converted",
			score: 72 + index % 18,
			ownerId: staffId,
			service
		});
	});
	const queue = [
		{
			id: "ses_dana",
			closerId: "cl_mira",
			name: "Dana Okonkwo",
			phone: "623-555-2180",
			email: "dana.okonkwo@example.com",
			city: "Goodyear",
			address: "1680 S Cotton Ln",
			service: "Grading",
			detail: "Side yard holding water after rain",
			channel: "phone",
			intent: 84,
			stage: "booking",
			outcome: "book",
			beat: 2,
			at: now,
			transcript: [
				{
					who: "agent",
					text: "CD Services, this is Mira. You asked for a free estimate on cdigs.bid. What do you need moved?"
				},
				{
					who: "lead",
					text: "The side yard holds water. I need it graded before I pour a patio."
				},
				{
					who: "agent",
					text: "We cover Goodyear. I can put a free estimate visit on the book. I'll lock the next open window."
				}
			]
		},
		{
			id: "ses_chris",
			closerId: "cl_luca",
			name: "Chris Adelman",
			phone: "480-555-2181",
			email: "chris.adelman@example.com",
			city: "Scottsdale",
			address: "10420 E Cactus",
			service: "Pool excavation",
			detail: "Wants the owner on the visit. Access is a side gate.",
			channel: "chat",
			intent: 91,
			stage: "handoff",
			outcome: "handoff",
			beat: 3,
			at: now,
			transcript: [
				{
					who: "agent",
					text: "Luca here, on cdigs.bid. Pool, trench, or a pad?"
				},
				{
					who: "lead",
					text: "Pool shell. I want a person from the company on the walk, not just a text."
				},
				{
					who: "agent",
					text: "You're qualified. I'm putting you in the waiting room so the owner can take the visit."
				}
			]
		},
		{
			id: "ses_rosa",
			closerId: "cl_vega",
			name: "Rosa Ibarra",
			phone: "480-555-2182",
			email: "rosa.ibarra@example.com",
			city: "Mesa",
			address: "640 S Dobson",
			service: "Trenching",
			detail: "Zanja para agua y eléctrico",
			channel: "sms",
			intent: 77,
			stage: "queued",
			outcome: "book",
			beat: 0,
			at: now,
			transcript: []
		},
		{
			id: "ses_evan",
			closerId: "cl_noa",
			name: "Evan Cho",
			phone: "602-555-2183",
			email: "evan.cho@example.com",
			city: "Phoenix",
			address: "1910 W Camelback",
			service: "Demolition",
			detail: "Garage slab. Needs a haul price.",
			channel: "video",
			intent: 80,
			stage: "queued",
			outcome: "book",
			beat: 0,
			at: now,
			transcript: []
		},
		{
			id: "ses_kelly",
			closerId: "cl_mira",
			name: "Kelly Nguyen",
			phone: "480-555-2184",
			email: "kelly.nguyen@example.com",
			city: "Tempe",
			address: "55 W 6th St",
			service: "Footings",
			detail: "No answer expected. Leave a voicemail and a text.",
			channel: "phone",
			intent: 40,
			stage: "queued",
			outcome: "vm",
			beat: 0,
			at: now,
			transcript: []
		},
		{
			id: "ses_paul",
			closerId: "cl_luca",
			name: "Paul Ruiz",
			phone: "623-555-2185",
			email: "paul.ruiz@example.com",
			city: "Avondale",
			address: "1220 N Dysart",
			service: "Land clearing",
			detail: "Asked for a callback after 5.",
			channel: "chat",
			intent: 55,
			stage: "queued",
			outcome: "callback",
			beat: 0,
			at: now,
			transcript: []
		},
		{
			id: "ses_anita",
			closerId: "cl_vega",
			name: "Anita Desai",
			phone: "623-555-2186",
			email: "anita.desai@example.com",
			city: "Tolleson",
			address: "8501 W Van Buren",
			service: "Dirt removal",
			detail: "Pile from a pool dig next door.",
			channel: "sms",
			intent: 73,
			stage: "queued",
			outcome: "book",
			beat: 0,
			at: now,
			transcript: []
		}
	];
	sfLeads.push({
		id: "sf_dana",
		name: "Dana Okonkwo",
		company: "Homeowner",
		phone: "623-555-2180",
		email: "dana.okonkwo@example.com",
		city: "Goodyear",
		source: "cdigs.bid",
		status: "Qualified",
		score: 84,
		ownerId: mateo,
		service: "Grading"
	}, {
		id: "sf_chris",
		name: "Chris Adelman",
		company: "Homeowner",
		phone: "480-555-2181",
		email: "chris.adelman@example.com",
		city: "Scottsdale",
		source: "cdigs.bid",
		status: "Working",
		score: 91,
		ownerId: owner,
		service: "Pool excavation"
	}, {
		id: "sf_rosa",
		name: "Rosa Ibarra",
		company: "Homeowner",
		phone: "480-555-2182",
		email: "rosa.ibarra@example.com",
		city: "Mesa",
		source: "cdigs.bid",
		status: "New",
		score: 77,
		ownerId: luz,
		service: "Trenching"
	}, {
		id: "sf_blake",
		name: "Blake Turner",
		company: "Homeowner",
		phone: "602-555-2199",
		email: "blake.turner@example.com",
		city: "Phoenix",
		source: "cdigs.bid",
		status: "Unqualified",
		score: 12,
		ownerId: owner,
		service: "Something else"
	});
	const chatter = [
		{
			id: "ch1",
			author: "Mira",
			text: "Estimate book is loaded from cdigs.bid. East valley sits with Luz. West valley sits with Mateo.",
			at: now,
			record: "Estimate calendar"
		},
		{
			id: "ch2",
			author: "Luca",
			text: "Chris Adelman is in the waiting room. Pool shell in Scottsdale. He asked for a person, not another text.",
			at: now,
			record: "Chris Adelman"
		},
		{
			id: "ch3",
			author: "Assignment rule",
			text: "cdigs.bid leads: Scottsdale, Mesa, Tempe, Phoenix → Luz Ortega. Glendale, Peoria, Goodyear, Avondale, Tolleson, Maricopa → Mateo Rios. Owner takes waiting-room handoffs.",
			at: now,
			record: "Territories"
		}
	];
	return {
		contacts,
		deals,
		appointments,
		threads,
		closers: closers(),
		sessions: queue,
		sfLeads,
		chatter
	};
}
function inCallingWindow(data, channel) {
	if (channel !== "phone") return true;
	const hour = (/* @__PURE__ */ new Date()).getHours();
	return hour >= (data.settings.callingStart ?? 7) && hour < (data.settings.callingEnd ?? 19);
}
function patchSession(data, id, patch) {
	return {
		...data,
		sessions: data.sessions.map((s) => s.id === id ? {
			...s,
			...patch,
			at: (/* @__PURE__ */ new Date()).toISOString()
		} : s)
	};
}
function logLine(data, text, kind) {
	return {
		...data,
		activity: [{
			id: uid("a"),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			text,
			kind
		}, ...data.activity].slice(0, 200)
	};
}
function bookSession(data, session, actor) {
	if (session.stage === "booked" || session.stage === "optout") return data;
	const slot = nextSlot(data);
	if (!slot) return logLine(patchSession(data, session.id, {
		stage: "callback",
		transcript: [...session.transcript, {
			who: "agent",
			text: "The estimate book is full for this window. I'll hold a callback."
		}]
	}), `${actor} held ${session.name} — no open estimate slot`, "closer");
	const phone = session.phone.replace(/\D/g, "");
	const existing = data.contacts.find((c) => c.phone.replace(/\D/g, "") === phone);
	const contactId = existing?.id ?? uid("c");
	const luz = data.staff.find((s) => s.role === "estimator")?.id ?? data.staff[0]?.id ?? "";
	const mateo = data.staff.find((s) => s.role === "dispatcher")?.id ?? luz;
	const ownerId = territoryOwner(session.city, luz, mateo);
	const closer = data.closers.find((c) => c.id === session.closerId);
	const when = new Date(slot).toLocaleString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
	const confirm = session.closerId === "cl_vega" ? `${session.name.split(" ")[0]}, su visita de estimado quedó para ${when}. CD Services, cdigs.bid. Responda STOP para salir.` : `${session.name.split(" ")[0]}, you're booked for a free estimate ${when}. ${closer?.name ?? "CD Services"} put it on the calendar from cdigs.bid. Reply STOP to opt out.`;
	const contact = existing ?? {
		id: contactId,
		name: session.name,
		phone: session.phone,
		email: session.email,
		address: session.address,
		city: session.city,
		tags: ["estimate", "cdigs.bid"],
		score: session.intent,
		source: "cdigs.bid",
		ownerId,
		status: "lead",
		notes: session.detail,
		gate: "",
		soil: "",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const deal = {
		id: uid("d"),
		title: `${session.service} — ${session.city}`,
		contactId,
		value: priceGuess(session.service),
		stage: "Site visit",
		ownerId,
		source: "cdigs.bid",
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	const appointment = {
		id: uid("ap"),
		title: `Estimate · ${session.service}`,
		contactId,
		staffId: ownerId,
		start: slot,
		end: endOf(slot),
		kind: "Estimate",
		status: "booked",
		source: "cdigs.bid",
		bookedBy: session.closerId
	};
	const thread = {
		id: uid("th"),
		contactId,
		unread: false,
		messages: [{
			id: uid("m"),
			dir: "out",
			channel: session.channel === "chat" ? "webchat" : "sms",
			body: confirm,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}]
	};
	let next = {
		...data,
		contacts: existing ? data.contacts : [contact, ...data.contacts],
		deals: [deal, ...data.deals],
		appointments: [appointment, ...data.appointments],
		threads: existing ? data.threads : [thread, ...data.threads],
		sessions: data.sessions.map((s) => s.id === session.id ? {
			...s,
			stage: "booked",
			contactId,
			appointmentId: appointment.id,
			beat: s.beat + 1,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			transcript: [
				...s.transcript,
				{
					who: "agent",
					text: confirm
				},
				{
					who: "lead",
					text: "Yes. Book it."
				}
			]
		} : s),
		sfLeads: data.sfLeads.map((l) => l.phone === session.phone ? {
			...l,
			status: "Converted",
			score: session.intent
		} : l),
		chatter: [{
			id: uid("ch"),
			author: closer?.name ?? actor,
			text: `Booked ${session.name} — ${session.service} in ${session.city} — ${when}. Source cdigs.bid.`,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			record: session.name
		}, ...data.chatter]
	};
	if (!next.sfLeads.some((l) => l.phone === session.phone)) next = {
		...next,
		sfLeads: [{
			id: uid("sf"),
			name: session.name,
			company: "Homeowner",
			phone: session.phone,
			email: session.email,
			city: session.city,
			source: "cdigs.bid",
			status: "Converted",
			score: session.intent,
			ownerId,
			service: session.service
		}, ...next.sfLeads]
	};
	next = logLine(next, `${closer?.name ?? actor} booked ${session.name} on the estimate calendar`, "closer");
	return fire(next, "appointment.booked", {
		contactId,
		dealId: deal.id
	}, closer?.name ?? actor);
}
function advance(data, session, actor) {
	if (!inCallingWindow(data, session.channel) && session.stage !== "booking") return data;
	const closer = data.closers.find((c) => c.id === session.closerId);
	if (closer?.status === "paused") return data;
	const first = session.name.split(" ")[0];
	if (session.beat <= 0) {
		const ask = session.closerId === "cl_vega" ? `${first}, soy Vega de CD Services. Vi su solicitud en cdigs.bid. ¿Qué hay que excavar o mover?` : `${first}, this is ${closer?.name ?? "CD Services"}. You reached us on cdigs.bid. What do you need dug or hauled?`;
		return patchSession(data, session.id, {
			stage: "qualifying",
			beat: 1,
			transcript: [...session.transcript, {
				who: "agent",
				text: ask
			}]
		});
	}
	if (session.beat === 1) {
		const reply = session.closerId === "cl_vega" ? `${session.detail}. Estoy en ${session.city}.` : `${session.detail}. I'm in ${session.city}.`;
		return patchSession(data, session.id, {
			stage: session.outcome === "vm" ? "voicemail" : "qualifying",
			beat: 2,
			transcript: [...session.transcript, {
				who: "lead",
				text: session.outcome === "vm" ? "(no answer — voicemail)" : reply
			}]
		});
	}
	if (session.outcome === "vm") {
		const text = `${first}, this is ${closer?.name ?? "CD Services"}. We can walk the site for a free estimate. Reply with a day or STOP to opt out.`;
		return logLine(patchSession(data, session.id, {
			stage: "voicemail",
			beat: 3,
			transcript: [...session.transcript, {
				who: "agent",
				text
			}]
		}), `${closer?.name ?? actor} left a voicemail for ${session.name}`, "closer");
	}
	if (session.outcome === "optout") return logLine(patchSession(data, session.id, {
		stage: "optout",
		beat: 3,
		transcript: [...session.transcript, {
			who: "lead",
			text: "Stop calling."
		}]
	}), `${session.name} opted out. Closers will not dial this number.`, "closer");
	if (session.outcome === "handoff") return logLine(patchSession(data, session.id, {
		stage: "handoff",
		beat: 3,
		intent: Math.max(session.intent, 80),
		transcript: [...session.transcript, {
			who: "agent",
			text: "You're ready. A person from CD Services is taking this visit."
		}]
	}), `${closer?.name ?? actor} parked ${session.name} in the waiting room`, "closer");
	if (session.outcome === "callback") return logLine(patchSession(data, session.id, {
		stage: "callback",
		beat: 3,
		transcript: [
			...session.transcript,
			{
				who: "lead",
				text: "Call me after 5."
			},
			{
				who: "agent",
				text: "Callback is on the book. We won't dial again before then."
			}
		]
	}), `${closer?.name ?? actor} set a callback for ${session.name}`, "closer");
	return bookSession(data, session, actor);
}
function stepFloor(data, actor = "Closer") {
	if (!data.settings?.closersLive) return data;
	if (!data.sessions?.length || !data.closers?.length) return data;
	const live = data.sessions.find((s) => s.stage === "dialing" || s.stage === "qualifying" || s.stage === "booking");
	if (live) return advance(data, live, actor);
	const queued = data.sessions.find((s) => s.stage === "queued" && inCallingWindow(data, s.channel) && data.closers.find((c) => c.id === s.closerId)?.status !== "paused");
	if (!queued) return data;
	return advance(data, {
		...queued,
		stage: "dialing"
	}, actor);
}
function handoffToVisit(data, sessionId, actor) {
	const session = data.sessions.find((s) => s.id === sessionId);
	if (!session || session.stage === "booked") return data;
	return bookSession(data, {
		...session,
		outcome: "book",
		stage: "booking"
	}, actor);
}
var checks = (done = 0) => [
	"811 locate is clear",
	"Before photos",
	"Spoil plan confirmed",
	"Grade check",
	"Customer walkthrough",
	"After photos"
].map((label, index) => ({
	id: uid("ck"),
	label,
	done: index < done
}));
function seed() {
	const owner = "s_owner";
	const mateo = "s_mateo";
	const luz = "s_luz";
	const beto = "s_beto";
	const ines = "s_ines";
	const omar = "s_omar";
	const layer = cdigsLayer(luz, mateo, owner);
	return {
		staff: [
			{
				id: owner,
				name: "A. Carranza",
				role: "owner",
				pin: "2580",
				phone: "638-555-0100",
				certs: ["Excavator", "Locator"],
				rate: 0
			},
			{
				id: mateo,
				name: "Mateo Rios",
				role: "dispatcher",
				pin: "2580",
				phone: "638-555-0101",
				certs: ["Locator"],
				rate: 28
			},
			{
				id: luz,
				name: "Luz Ortega",
				role: "estimator",
				pin: "2580",
				phone: "638-555-0102",
				certs: ["Estimator"],
				rate: 32
			},
			{
				id: beto,
				name: "Beto Salas",
				role: "operator",
				pin: "2580",
				phone: "638-555-0103",
				certs: ["Excavator", "CDL"],
				rate: 26
			},
			{
				id: ines,
				name: "Ines Palma",
				role: "operator",
				pin: "2580",
				phone: "638-555-0104",
				certs: ["Excavator"],
				rate: 26
			},
			{
				id: omar,
				name: "Omar Felix",
				role: "office",
				pin: "2580",
				phone: "638-555-0105",
				certs: [],
				rate: 22
			}
		],
		companies: [
			{
				id: "co_norte",
				name: "Norte Build",
				kind: "General contractor",
				phone: "638-555-0188",
				address: "Las Conchas"
			},
			{
				id: "co_hoa",
				name: "Las Conchas HOA",
				kind: "Association",
				phone: "638-555-0170",
				address: "Las Conchas"
			},
			{
				id: "co_hotel",
				name: "Hotel Solmar",
				kind: "Commercial",
				phone: "638-555-0190",
				address: "Sandy Beach"
			}
		],
		contacts: [
			...layer.contacts,
			{
				id: "c_elena",
				name: "Elena Vargas",
				phone: "638-555-0142",
				email: "elena@example.com",
				address: "Sandy Beach lot 18",
				city: "Sandy Beach",
				tags: ["customer", "septic"],
				score: 86,
				source: "Google",
				ownerId: luz,
				status: "customer",
				notes: "Gate code 1944. Dog in the side yard.",
				gate: "1944",
				soil: "Sand over caliche",
				createdAt: at(-12, 9)
			},
			{
				id: "c_diego",
				name: "Diego Paz",
				phone: "638-555-0166",
				email: "diego@norte.example",
				address: "Las Conchas phase 2",
				city: "Las Conchas",
				companyId: "co_norte",
				tags: ["gc", "trench"],
				score: 74,
				source: "Referral",
				ownerId: luz,
				status: "customer",
				notes: "Wants the trench before the electrician lands Thursday.",
				gate: "Call Diego",
				soil: "Mixed fill",
				createdAt: at(-20, 11)
			},
			{
				id: "c_sol",
				name: "Renata Solis",
				phone: "638-555-0191",
				email: "facilities@solmar.example",
				address: "Hotel Solmar service yard",
				city: "Sandy Beach",
				companyId: "co_hotel",
				tags: ["commercial"],
				score: 61,
				source: "Walk-in",
				ownerId: mateo,
				status: "lead",
				notes: "Demo of the old pump pad. Needs night work.",
				gate: "Security",
				soil: "Concrete over sand",
				createdAt: at(-4, 15)
			},
			{
				id: "c_jim",
				name: "Jim Walsh",
				phone: "638-555-0133",
				email: "jim.walsh@example.com",
				address: "La Choya",
				city: "La Choya",
				tags: ["pool", "lead"],
				score: 69,
				source: "Facebook",
				ownerId: luz,
				status: "lead",
				notes: "Wants a shell dig before monsoon.",
				gate: "",
				soil: "Dune sand",
				createdAt: at(-6, 10)
			},
			{
				id: "c_hoa",
				name: "Patricia Nunez",
				phone: "638-555-0171",
				email: "board@lasconchas.example",
				address: "HOA yard",
				city: "Las Conchas",
				companyId: "co_hoa",
				tags: ["hoa"],
				score: 55,
				source: "Phone",
				ownerId: mateo,
				status: "lead",
				notes: "Drainage swale along the east road.",
				gate: "HOA",
				soil: "Caliche",
				createdAt: at(-8, 9)
			},
			{
				id: "c_mari",
				name: "Marisol Chen",
				phone: "638-555-0120",
				email: "marisol@example.com",
				address: "Centro",
				city: "Puerto Peñasco",
				tags: ["utility"],
				score: 48,
				source: "Website",
				ownerId: luz,
				status: "lead",
				notes: "Possible water line conflict. Do not dig blind.",
				gate: "",
				soil: "Unknown",
				createdAt: at(-2, 16)
			},
			{
				id: "c_hale",
				name: "Roberto Hale",
				phone: "638-555-0114",
				email: "rob.hale@example.com",
				address: "Old marina road",
				city: "Puerto Peñasco",
				tags: ["customer", "demo"],
				score: 77,
				source: "Repeat",
				ownerId: luz,
				status: "customer",
				notes: "Slab demo finished. Invoice still open.",
				gate: "None",
				soil: "Slab",
				createdAt: at(-40, 9)
			},
			{
				id: "c_ana",
				name: "Ana Beltran",
				phone: "638-555-0108",
				email: "ana.beltran@example.com",
				address: "Sandy Beach lot 4",
				city: "Sandy Beach",
				tags: ["customer", "plan"],
				score: 91,
				source: "Repeat",
				ownerId: omar,
				status: "customer",
				notes: "Seasonal grade plan. Always pays card.",
				gate: "2201",
				soil: "Sand",
				createdAt: at(-200, 9)
			},
			{
				id: "c_carla",
				name: "Carla Mena",
				phone: "638-555-0199",
				email: "carla@example.com",
				address: "Sonoyta highway turnout",
				city: "Sonoyta",
				tags: ["lost"],
				score: 20,
				source: "Ads",
				ownerId: mateo,
				status: "lost",
				notes: "Went with a cheaper cut. Keep her for the slow season.",
				gate: "",
				soil: "",
				createdAt: at(-30, 12)
			},
			{
				id: "c_luis",
				name: "Luis Mendoza",
				phone: "638-555-0155",
				email: "luis@example.com",
				address: "Ejido lot",
				city: "Puerto Peñasco",
				tags: ["lead"],
				score: 36,
				source: "Referral",
				ownerId: mateo,
				status: "lead",
				notes: "Driveway cut. Waiting on a survey.",
				gate: "",
				soil: "Rock",
				createdAt: at(-1, 8)
			}
		],
		deals: [
			...layer.deals,
			{
				id: "d_elena",
				title: "Septic — Sandy Beach 18",
				contactId: "c_elena",
				value: 6110,
				stage: "Won",
				ownerId: luz,
				source: "Google",
				updatedAt: at(-3, 14)
			},
			{
				id: "d_diego",
				title: "Electrical trench phase 2",
				contactId: "c_diego",
				value: 2400,
				stage: "Won",
				ownerId: luz,
				source: "Referral",
				updatedAt: at(-2, 9)
			},
			{
				id: "d_jim",
				title: "Pool shell — La Choya",
				contactId: "c_jim",
				value: 5680,
				stage: "Estimate sent",
				ownerId: luz,
				source: "Facebook",
				updatedAt: at(-1, 11)
			},
			{
				id: "d_sol",
				title: "Pump pad demo",
				contactId: "c_sol",
				value: 3800,
				stage: "Site visit",
				ownerId: mateo,
				source: "Walk-in",
				updatedAt: at(-1, 15)
			},
			{
				id: "d_hoa",
				title: "East road swale",
				contactId: "c_hoa",
				value: 7200,
				stage: "Contacted",
				ownerId: mateo,
				source: "Phone",
				updatedAt: at(-5, 10)
			},
			{
				id: "d_mari",
				title: "Centro utility trench",
				contactId: "c_mari",
				value: 1600,
				stage: "New",
				ownerId: luz,
				source: "Website",
				updatedAt: at(-2, 16)
			},
			{
				id: "d_hale",
				title: "Marina slab demo",
				contactId: "c_hale",
				value: 2900,
				stage: "Won",
				ownerId: luz,
				source: "Repeat",
				updatedAt: at(-1, 17)
			},
			{
				id: "d_carla",
				title: "Highway turnout",
				contactId: "c_carla",
				value: 1400,
				stage: "Lost",
				ownerId: mateo,
				source: "Ads",
				updatedAt: at(-18, 13)
			},
			{
				id: "d_luis",
				title: "Ejido driveway",
				contactId: "c_luis",
				value: 900,
				stage: "New",
				ownerId: mateo,
				source: "Referral",
				updatedAt: at(-1, 8)
			}
		],
		threads: [
			...layer.threads,
			{
				id: "th_elena",
				contactId: "c_elena",
				unread: false,
				messages: [
					{
						id: "m1",
						dir: "in",
						channel: "sms",
						body: "Can you start the septic tomorrow morning?",
						at: at(-1, 18)
					},
					{
						id: "m2",
						dir: "out",
						channel: "sms",
						body: "Yes. Beto will be on site at 8. Gate code still 1944?",
						at: at(-1, 18)
					},
					{
						id: "m3",
						dir: "in",
						channel: "sms",
						body: "1944. Thank you.",
						at: at(-1, 19)
					}
				]
			},
			{
				id: "th_jim",
				contactId: "c_jim",
				unread: true,
				messages: [{
					id: "m4",
					dir: "out",
					channel: "email",
					body: "Jim — good, better, and best are on your portal. Best includes the laser finish.",
					at: at(-1, 11)
				}, {
					id: "m5",
					dir: "in",
					channel: "email",
					body: "Looking. Is haul included if the sand is wet?",
					at: at(0, 7)
				}]
			},
			{
				id: "th_mari",
				contactId: "c_mari",
				unread: true,
				messages: [{
					id: "m6",
					dir: "in",
					channel: "webchat",
					body: "Need a short trench. There may be a water line.",
					at: at(-2, 16)
				}]
			},
			{
				id: "th_carla",
				contactId: "c_carla",
				unread: false,
				messages: [{
					id: "m7",
					dir: "out",
					channel: "sms",
					body: "Carla, if the other cut goes sideways we're here. No pressure.",
					at: at(-18, 13)
				}]
			}
		],
		jobs: [
			{
				id: "j_elena",
				title: "Septic install",
				type: "Septic",
				contactId: "c_elena",
				address: "Sandy Beach lot 18",
				status: "onsite",
				crewIds: [beto],
				start: at(0, 8),
				hours: 7,
				lat: 31.336,
				lng: -113.552,
				notes: "Tank on the north line. Field toward the wash.",
				checklist: checks(3),
				photos: [{
					src: "/media/trench.jpg",
					caption: "Field trench, morning"
				}],
				price: 6110,
				costLabor: 1400,
				costMaterials: 2100,
				loads: 4,
				dump: "Municipal",
				weatherHold: false,
				routeOrder: 1
			},
			{
				id: "j_diego",
				title: "Electrical trench",
				type: "Trench",
				contactId: "c_diego",
				address: "Las Conchas phase 2",
				status: "enroute",
				crewIds: [ines],
				start: at(0, 10),
				hours: 5,
				lat: 31.305,
				lng: -113.545,
				notes: "36 inch cover. Electrician on Thursday.",
				checklist: checks(1),
				photos: [{
					src: "/media/hero.jpg",
					caption: "Machine staged"
				}],
				price: 2400,
				costLabor: 700,
				costMaterials: 180,
				loads: 2,
				dump: "Norte yard",
				weatherHold: false,
				routeOrder: 2
			},
			{
				id: "j_jim",
				title: "Pool shell dig",
				type: "Pool",
				contactId: "c_jim",
				address: "La Choya",
				status: "scheduled",
				crewIds: [beto, ines],
				start: at(1, 9),
				hours: 9,
				lat: 31.348,
				lng: -113.61,
				notes: "Hold until the estimate is signed. Tentative.",
				checklist: checks(0),
				photos: [],
				price: 5680,
				costLabor: 1600,
				costMaterials: 200,
				loads: 8,
				dump: "La Choya pit",
				weatherHold: false,
				routeOrder: 3
			},
			{
				id: "j_hoa",
				title: "East road swale",
				type: "Grading",
				contactId: "c_hoa",
				address: "Las Conchas east road",
				status: "unscheduled",
				crewIds: [],
				start: at(4, 8),
				hours: 12,
				lat: 31.301,
				lng: -113.538,
				notes: "Waiting on HOA board.",
				checklist: checks(0),
				photos: [],
				price: 7200,
				costLabor: 2200,
				costMaterials: 400,
				loads: 10,
				dump: "HOA stockpile",
				weatherHold: false,
				routeOrder: 4
			},
			{
				id: "j_hale",
				title: "Slab demo",
				type: "Demolition",
				contactId: "c_hale",
				address: "Old marina road",
				status: "done",
				crewIds: [beto],
				start: at(-1, 13),
				hours: 6,
				lat: 31.32,
				lng: -113.56,
				notes: "Slab out. Rebar hauled.",
				checklist: checks(6),
				photos: [{
					src: "/media/hero.jpg",
					caption: "Pad after the break"
				}],
				price: 2900,
				costLabor: 900,
				costMaterials: 150,
				loads: 6,
				dump: "Marina pit",
				weatherHold: false,
				routeOrder: 5
			}
		],
		estimates: [
			{
				id: "e_elena",
				number: "EST-218",
				contactId: "c_elena",
				jobId: "j_elena",
				title: "Septic — Sandy Beach",
				status: "approved",
				chosen: "Best",
				sentAt: at(-9, 10),
				discount: 0,
				options: [
					{
						name: "Good",
						note: "Tank set.",
						items: [{
							name: "Tank set",
							qty: 1,
							price: 2800
						}]
					},
					{
						name: "Better",
						note: "Tank and field.",
						items: [{
							name: "Tank set",
							qty: 1,
							price: 2800
						}, {
							name: "Drain field",
							qty: 1,
							price: 2200
						}]
					},
					{
						name: "Best",
						note: "Tank, field, six loads.",
						items: [
							{
								name: "Tank set",
								qty: 1,
								price: 2800
							},
							{
								name: "Drain field",
								qty: 1,
								price: 2200
							},
							{
								name: "Spoil load",
								qty: 6,
								price: 185
							}
						]
					}
				]
			},
			{
				id: "e_jim",
				number: "EST-221",
				contactId: "c_jim",
				title: "Pool shell — La Choya",
				status: "viewed",
				sentAt: at(-1, 11),
				discount: 0,
				options: [
					{
						name: "Good",
						note: "Dig only. You haul.",
						items: [{
							name: "Pool shell dig",
							qty: 1,
							price: 4200
						}]
					},
					{
						name: "Better",
						note: "Dig plus eight loads.",
						items: [{
							name: "Pool shell dig",
							qty: 1,
							price: 4200
						}, {
							name: "Spoil load",
							qty: 8,
							price: 185
						}]
					},
					{
						name: "Best",
						note: "Dig, haul, laser.",
						items: [
							{
								name: "Pool shell dig",
								qty: 1,
								price: 4200
							},
							{
								name: "Spoil load",
								qty: 8,
								price: 185
							},
							{
								name: "Laser finish",
								qty: 1,
								price: 650
							}
						]
					}
				]
			},
			{
				id: "e_sol",
				number: "EST-222",
				contactId: "c_sol",
				title: "Pump pad demo",
				status: "draft",
				discount: 0,
				options: [
					{
						name: "Good",
						note: "Half day.",
						items: [{
							name: "Demo crew hour",
							qty: 4,
							price: 240
						}]
					},
					{
						name: "Better",
						note: "Full day plus haul.",
						items: [{
							name: "Demo crew hour",
							qty: 8,
							price: 240
						}, {
							name: "Spoil load",
							qty: 3,
							price: 185
						}]
					},
					{
						name: "Best",
						note: "Night crew.",
						items: [{
							name: "Demo crew hour",
							qty: 10,
							price: 240
						}, {
							name: "Spoil load",
							qty: 4,
							price: 185
						}]
					}
				]
			}
		],
		invoices: [
			{
				id: "i_ana",
				number: "INV-1031",
				contactId: "c_ana",
				items: [{
					name: "Seasonal grade",
					qty: 1,
					price: 860
				}],
				status: "paid",
				issuedAt: monthsAgo(0),
				dueAt: monthsAgo(0),
				overduePinged: false,
				financing: false
			},
			{
				id: "i_old",
				number: "INV-1004",
				contactId: "c_ana",
				items: [{
					name: "Driveway dress",
					qty: 1,
					price: 1400
				}],
				status: "paid",
				issuedAt: monthsAgo(2),
				dueAt: monthsAgo(2),
				overduePinged: false,
				financing: false
			},
			{
				id: "i_hale",
				number: "INV-1044",
				contactId: "c_hale",
				jobId: "j_hale",
				items: [{
					name: "Slab demo",
					qty: 1,
					price: 2900
				}],
				status: "sent",
				issuedAt: at(-3, 17),
				dueAt: at(-1, 17),
				overduePinged: false,
				financing: true
			},
			{
				id: "i_may",
				number: "INV-0990",
				contactId: "c_diego",
				items: [{
					name: "Phase 1 trench",
					qty: 1,
					price: 3100
				}],
				status: "paid",
				issuedAt: monthsAgo(1),
				dueAt: monthsAgo(1),
				overduePinged: false,
				financing: false
			},
			{
				id: "i_apr",
				number: "INV-0962",
				contactId: "c_elena",
				items: [{
					name: "Locate and pothole",
					qty: 1,
					price: 480
				}],
				status: "paid",
				issuedAt: monthsAgo(3),
				dueAt: monthsAgo(3),
				overduePinged: false,
				financing: false
			}
		],
		payments: [
			{
				id: "p1",
				invoiceId: "i_ana",
				amount: 860,
				method: "card",
				at: monthsAgo(0)
			},
			{
				id: "p2",
				invoiceId: "i_old",
				amount: 1400,
				method: "ach",
				at: monthsAgo(2)
			},
			{
				id: "p3",
				invoiceId: "i_may",
				amount: 3100,
				method: "check",
				at: monthsAgo(1)
			},
			{
				id: "p4",
				invoiceId: "i_apr",
				amount: 480,
				method: "cash",
				at: monthsAgo(3)
			},
			{
				id: "p5",
				invoiceId: "i_ana",
				amount: 2200,
				method: "card",
				at: monthsAgo(4)
			},
			{
				id: "p6",
				invoiceId: "i_may",
				amount: 1800,
				method: "card",
				at: monthsAgo(5)
			}
		],
		priceBook: [
			{
				id: "trench",
				category: "Trenching",
				name: "Trench per foot",
				unit: "ft",
				price: 18,
				cost: 7
			},
			{
				id: "tank",
				category: "Septic",
				name: "Tank set",
				unit: "ea",
				price: 2800,
				cost: 1400
			},
			{
				id: "field",
				category: "Septic",
				name: "Drain field",
				unit: "ea",
				price: 2200,
				cost: 900
			},
			{
				id: "pad",
				category: "Grading",
				name: "Building pad",
				unit: "ea",
				price: 3500,
				cost: 1200
			},
			{
				id: "load",
				category: "Haul",
				name: "Spoil load",
				unit: "load",
				price: 185,
				cost: 70
			},
			{
				id: "demo",
				category: "Demolition",
				name: "Demo crew hour",
				unit: "hr",
				price: 240,
				cost: 95
			},
			{
				id: "ex",
				category: "Equipment",
				name: "Excavator hour",
				unit: "hr",
				price: 185,
				cost: 55
			},
			{
				id: "pool",
				category: "Pool",
				name: "Pool shell dig",
				unit: "ea",
				price: 4200,
				cost: 1600
			},
			{
				id: "laser",
				category: "Grading",
				name: "Laser finish",
				unit: "ea",
				price: 650,
				cost: 180
			}
		],
		reviews: [
			{
				id: "r1",
				contactId: "c_ana",
				stars: 5,
				text: "They marked every line and the pad was dead level.",
				source: "Google",
				at: at(-6, 12),
				reply: ""
			},
			{
				id: "r2",
				contactId: "c_diego",
				stars: 4,
				text: "Trench was on time. Haul took an extra day.",
				source: "Google",
				at: at(-15, 9),
				reply: "Diego, the extra day was on us. Next phase we stage the trucks the night before."
			},
			{
				id: "r3",
				contactId: "c_hale",
				stars: 2,
				text: "Rebar pile sat on the street longer than I wanted.",
				source: "Facebook",
				at: at(-1, 20),
				reply: ""
			}
		],
		workflows: [
			{
				id: "w_lead",
				name: "New lead, same hour",
				trigger: "lead.created",
				enabled: true,
				lane: "auto",
				runs: 4,
				steps: [
					{
						op: "sms",
						text: "Hi {{name}}, this is {{company}}. We got your note. A person will confirm a site visit shortly."
					},
					{
						op: "tag",
						tag: "new"
					},
					{
						op: "score",
						delta: 10
					},
					{
						op: "task",
						title: "Call {{name}} within 15 minutes"
					}
				]
			},
			{
				id: "w_book",
				name: "Visit confirmation",
				trigger: "appointment.booked",
				enabled: true,
				lane: "auto",
				runs: 2,
				steps: [{
					op: "sms",
					text: "{{name}}, your free estimate visit is on the calendar. We'll text before we roll. Reply STOP to opt out."
				}, {
					op: "task",
					title: "Check 811 before {{name}}'s visit"
				}]
			},
			{
				id: "w_est",
				name: "Estimate sent",
				trigger: "estimate.sent",
				enabled: true,
				lane: "auto",
				runs: 3,
				steps: [
					{
						op: "sms",
						text: "{{name}}, your written price is ready. Good, better, and best — reply if you want us to walk it."
					},
					{
						op: "score",
						delta: 6
					},
					{
						op: "task",
						title: "Follow up {{name}} on the estimate"
					}
				]
			},
			{
				id: "w_ok",
				name: "Estimate approved",
				trigger: "estimate.approved",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [
					{
						op: "dealStage",
						stage: "Won"
					},
					{
						op: "tag",
						tag: "customer"
					},
					{
						op: "sms",
						text: "{{name}}, we're locked in. Dispatch will put a crew on {{job}}."
					},
					{
						op: "task",
						title: "Schedule crew for {{name}}"
					}
				]
			},
			{
				id: "w_miss",
				name: "Missed call text-back",
				trigger: "call.missed",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [{
					op: "sms",
					text: "{{name}}, sorry we missed you. This is {{company}}. Want a site visit this week? Reply YES."
				}, {
					op: "task",
					title: "Return call to {{name}}"
				}]
			},
			{
				id: "w_way",
				name: "On my way",
				trigger: "job.enroute",
				enabled: true,
				lane: "auto",
				runs: 2,
				steps: [{
					op: "sms",
					text: "{{name}}, {{crew}} just left the yard for {{job}}. See you shortly."
				}]
			},
			{
				id: "w_done",
				name: "Job complete",
				trigger: "job.complete",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [{ op: "invoice" }, {
					op: "task",
					title: "Send the invoice for {{job}}"
				}]
			},
			{
				id: "w_paid",
				name: "Paid, ask for the review",
				trigger: "invoice.paid",
				enabled: true,
				lane: "auto",
				runs: 2,
				steps: [{
					op: "sms",
					text: "{{name}}, payment received. Thank you for trusting {{company}}."
				}, { op: "review" }]
			},
			{
				id: "w_low",
				name: "Unhappy review",
				trigger: "review.low",
				enabled: true,
				lane: "auto",
				runs: 0,
				steps: [{
					op: "task",
					title: "Owner call — low review from {{name}}"
				}, {
					op: "note",
					text: "Opened a recovery task for a low review."
				}]
			},
			{
				id: "w_high",
				name: "Happy review",
				trigger: "review.high",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [{
					op: "sms",
					text: "{{name}}, that review means a lot out here. Thank you."
				}]
			},
			{
				id: "w_late",
				name: "Overdue invoice",
				trigger: "invoice.overdue",
				enabled: true,
				lane: "auto",
				runs: 0,
				steps: [{
					op: "sms",
					text: "{{name}}, a reminder that {{amount}} is past due. Reply if you want a card link or a financing note."
				}, {
					op: "task",
					title: "Collect {{amount}} from {{name}}"
				}]
			},
			{
				id: "w_form",
				name: "Form captured",
				trigger: "form.submitted",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [
					{
						op: "tag",
						tag: "form"
					},
					{
						op: "score",
						delta: 8
					},
					{
						op: "task",
						title: "Qualify form lead {{name}}"
					}
				]
			},
			{
				id: "w_lost",
				name: "Lost, stay kind",
				trigger: "deal.stage",
				when: "Lost",
				enabled: true,
				lane: "auto",
				runs: 1,
				steps: [{
					op: "sms",
					text: "{{name}}, thanks for considering {{company}}. If the other plan slips, we're here."
				}, {
					op: "tag",
					tag: "nurture"
				}]
			},
			{
				id: "w_seq",
				name: "Estimate follow-up",
				trigger: "sequence.estimate",
				enabled: true,
				lane: "sequence",
				runs: 0,
				steps: [
					{
						op: "sms",
						text: "{{name}}, circling back on the written price. Questions on good, better, or best?"
					},
					{
						op: "task",
						title: "Day 2 — second touch",
						text: "{{name}}, still holding a crew window for you this week.",
						day: 2
					},
					{
						op: "task",
						title: "Day 4 — last touch",
						text: "{{name}}, we'll release the window tomorrow unless you want it.",
						day: 4
					}
				]
			},
			{
				id: "w_react",
				name: "Quiet list reactivation",
				trigger: "sequence.reactivate",
				enabled: true,
				lane: "sequence",
				runs: 0,
				steps: [{
					op: "sms",
					text: "{{name}}, it's {{company}}. We're booking site visits again. Want us to look at the lot?"
				}, {
					op: "task",
					title: "Day 3 — reactivation",
					text: "{{name}}, one more note from the yard. No rush.",
					day: 3,
					minScore: 30
				}]
			}
		],
		runs: [],
		tasks: [
			{
				id: "t1",
				title: "Confirm electrician for Diego Thursday",
				contactId: "c_diego",
				ownerId: mateo,
				due: at(0, 15),
				done: false
			},
			{
				id: "t2",
				title: "Reply to Jim on wet-sand haul",
				contactId: "c_jim",
				ownerId: luz,
				due: at(0, 12),
				done: false
			},
			{
				id: "t3",
				title: "Send Hale invoice",
				contactId: "c_hale",
				ownerId: omar,
				due: at(-1, 9),
				done: true
			}
		],
		appointments: [
			...layer.appointments,
			{
				id: "a1",
				title: "Site visit — Solmar pad",
				contactId: "c_sol",
				staffId: luz,
				start: at(0, 15),
				end: at(0, 16),
				kind: "Site visit",
				status: "set"
			},
			{
				id: "a2",
				title: "HOA walk",
				contactId: "c_hoa",
				staffId: mateo,
				start: at(2, 9),
				end: at(2, 10),
				kind: "Site visit",
				status: "set"
			},
			{
				id: "a3",
				title: "Elena septic",
				contactId: "c_elena",
				staffId: beto,
				start: at(0, 8),
				end: at(0, 15),
				kind: "Job",
				status: "on site"
			}
		],
		campaigns: [{
			id: "camp1",
			name: "Slow season site visits",
			channel: "sms",
			audience: "lead",
			body: "It's {{company}}. We're opening a few site visits next week. Reply VISIT.",
			status: "draft",
			sent: 0,
			replies: 0
		}, {
			id: "camp2",
			name: "Past customers — grade check",
			channel: "email",
			audience: "customer",
			body: "Your lot settled? We'll walk it and write a price before we touch it.",
			status: "sent",
			sent: 3,
			replies: 1
		}],
		posts: [
			{
				id: "post1",
				network: "Instagram",
				copy: "Sandy Beach, morning cut. Locate marks still on the ground.",
				when: at(0, 12),
				status: "scheduled"
			},
			{
				id: "post2",
				network: "Facebook",
				copy: "Written price. Marked lines. Then the machine.",
				when: at(-2, 9),
				status: "posted"
			},
			{
				id: "post3",
				network: "Google",
				copy: "",
				when: at(1, 9),
				status: "draft"
			}
		],
		forms: [
			{
				id: "f1",
				name: "Site visit request",
				kind: "form",
				fields: [
					"Name",
					"Phone",
					"Address",
					"What do you need dug"
				]
			},
			{
				id: "f2",
				name: "After-job CSAT",
				kind: "survey",
				fields: ["Score", "What should we fix"]
			},
			{
				id: "f3",
				name: "Which package fits",
				kind: "quiz",
				fields: [
					"Job type",
					"Haul or leave spoils",
					"Timeline"
				]
			}
		],
		submissions: [{
			id: "sub1",
			formId: "f1",
			at: at(-2, 16),
			contactId: "c_mari",
			answers: {
				Name: "Marisol Chen",
				Phone: "638-555-0120",
				Address: "Centro",
				"What do you need dug": "Short trench, possible water line"
			}
		}],
		funnels: [{
			id: "fn1",
			name: "Google → visit → estimate",
			steps: [
				{
					name: "Ad or map click",
					visits: 420,
					conversions: 86
				},
				{
					name: "Site visit form",
					visits: 86,
					conversions: 41
				},
				{
					name: "Estimate sent",
					visits: 41,
					conversions: 18
				},
				{
					name: "Approved",
					visits: 18,
					conversions: 11
				}
			]
		}, {
			id: "fn2",
			name: "Missed call recovery",
			steps: [
				{
					name: "Missed call",
					visits: 36,
					conversions: 36
				},
				{
					name: "Text-back",
					visits: 36,
					conversions: 14
				},
				{
					name: "Booked",
					visits: 14,
					conversions: 9
				}
			]
		}],
		ads: [
			{
				id: "ad1",
				name: "Septic — map pack",
				platform: "Google",
				spend: 640,
				leads: 11,
				status: "live"
			},
			{
				id: "ad2",
				name: "Pool digs",
				platform: "Facebook",
				spend: 280,
				leads: 6,
				status: "live"
			},
			{
				id: "ad3",
				name: "Demo night work",
				platform: "Instagram",
				spend: 0,
				leads: 0,
				status: "paused"
			}
		],
		tickets: [{
			id: "tk1",
			contactId: "c_hale",
			subject: "Rebar pile left on the street",
			priority: "high",
			status: "open",
			slaHours: 8,
			openedAt: at(-1, 20)
		}, {
			id: "tk2",
			contactId: "c_ana",
			subject: "Gate code changed",
			priority: "low",
			status: "solved",
			slaHours: 48,
			openedAt: at(-20, 9)
		}],
		articles: [
			{
				id: "kb1",
				kind: "kb",
				category: "Locate",
				title: "811 before the bucket moves",
				body: "No locate, no dig. Photograph the marks. If a mark is missing on a side you will cut, stop and call it in again. Pothole by hand at every crossing."
			},
			{
				id: "kb2",
				kind: "playbook",
				category: "Septic",
				title: "Septic setbacks",
				body: "Tank off the structure, field away from the wash, lid accessible. Write the setbacks on the estimate before you price the best package."
			},
			{
				id: "kb3",
				kind: "playbook",
				category: "Spoil",
				title: "Spoil tickets",
				body: "Count loads out loud. Dump site on the job. Loads times haul cost hit the margin the same day."
			},
			{
				id: "kb4",
				kind: "blog",
				category: "Yard",
				title: "Why the price is written first",
				body: "A verbal number moves. A written good, better, and best does not. The crew should never invent a price in the driveway."
			},
			{
				id: "kb5",
				kind: "kb",
				category: "Field",
				title: "Walkthrough close",
				body: "Customer walks the cut. Photos after. Gate code checked. Then the invoice, not before."
			}
		],
		equipment: [
			{
				id: "eq1",
				name: "CAT 308",
				type: "Excavator",
				hours: 2410,
				nextService: 2450,
				status: "on job"
			},
			{
				id: "eq2",
				name: "Skid 262",
				type: "Skid steer",
				hours: 980,
				nextService: 1e3,
				status: "yard"
			},
			{
				id: "eq3",
				name: "Dump 1",
				type: "Truck",
				hours: 4100,
				nextService: 4300,
				status: "on job"
			}
		],
		permits: [
			{
				id: "pm1",
				jobId: "j_diego",
				type: "811 locate",
				number: "SON-44120",
				status: "clear",
				expires: at(6, 9)
			},
			{
				id: "pm2",
				jobId: "j_elena",
				type: "811 locate",
				number: "SON-44002",
				status: "clear",
				expires: at(2, 9)
			},
			{
				id: "pm3",
				jobId: "j_hoa",
				type: "ROW permit",
				number: "PP-188",
				status: "pending",
				expires: at(10, 9)
			}
		],
		clocks: [{
			id: "cl1",
			staffId: beto,
			jobId: "j_elena",
			inAt: at(0, 7),
			outAt: void 0
		}, {
			id: "cl2",
			staffId: ines,
			jobId: "j_diego",
			inAt: at(0, 9),
			outAt: void 0
		}],
		plans: [{
			id: "pl1",
			contactId: "c_ana",
			name: "Seasonal grade",
			cadence: "Every 4 months",
			price: 860,
			next: at(20, 9),
			active: true
		}, {
			id: "pl2",
			contactId: "c_diego",
			name: "Phase trench retainer",
			cadence: "Monthly",
			price: 0,
			next: at(12, 9),
			active: true
		}],
		courses: [
			{
				id: "crs1",
				title: "811 and locates",
				minutes: 18,
				forRole: "operator",
				done: true
			},
			{
				id: "crs2",
				title: "Reading a bad trench",
				minutes: 12,
				forRole: "operator",
				done: false
			},
			{
				id: "crs3",
				title: "Writing good / better / best",
				minutes: 20,
				forRole: "estimator",
				done: false
			},
			{
				id: "crs4",
				title: "The review ask",
				minutes: 8,
				forRole: "office",
				done: true
			}
		],
		board: [{
			id: "b1",
			authorId: mateo,
			text: "Ines is en route to Las Conchas. Electrician still Thursday.",
			at: at(0, 9)
		}, {
			id: "b2",
			authorId: beto,
			text: "Elena's field is sandier than the estimate. I'll photo it before we go deeper.",
			at: at(0, 8)
		}],
		activity: [
			...layer.chatter.slice(0, 2).map((c) => ({
				id: `act_${c.id}`,
				at: c.at,
				text: c.text,
				kind: "closer"
			})),
			{
				id: "act1",
				at: at(0, 8),
				text: "Beto clocked in on the septic",
				kind: "field"
			},
			{
				id: "act2",
				at: at(0, 7),
				text: "Jim replied about wet-sand haul",
				kind: "inbox"
			},
			{
				id: "act3",
				at: at(-1, 17),
				text: "Hale demo marked done",
				kind: "field"
			}
		],
		pages: [{
			id: "pg1",
			name: "Septic landing",
			slug: "septic",
			headline: "A septic cut with the price written first.",
			headlineB: "Septic work in Puerto Peñasco, marked before we dig.",
			sub: "Tank, field, and haul. You approve one option. Then the crew shows up.",
			offer: "Ask for a site visit",
			published: true,
			visitsA: 128,
			visitsB: 116,
			leads: 14,
			showB: false
		}],
		links: [{
			id: "lk1",
			slug: "septic-map",
			label: "Google septic",
			clicks: 86
		}, {
			id: "lk2",
			slug: "pool-fb",
			label: "Facebook pools",
			clicks: 40
		}],
		calls: [
			{
				id: "call1",
				contactId: "c_hoa",
				direction: "in",
				status: "answered",
				seconds: 420,
				at: at(-5, 10),
				notes: "Wants the swale before the rains. Board meets Friday."
			},
			{
				id: "call2",
				contactId: "c_luis",
				direction: "in",
				status: "missed",
				seconds: 0,
				at: at(-1, 8),
				notes: "Text-back already sent."
			},
			{
				id: "call3",
				contactId: "c_sol",
				direction: "out",
				status: "voicemail",
				seconds: 28,
				at: at(-3, 14),
				notes: "Left the night-work script."
			}
		],
		surveys: [
			{
				id: "sv1",
				contactId: "c_ana",
				kind: "CSAT",
				score: 5,
				comment: "Easy.",
				at: at(-6, 13)
			},
			{
				id: "sv2",
				contactId: "c_diego",
				kind: "NPS",
				score: 8,
				comment: "Would send Norte's next phase.",
				at: at(-14, 10)
			},
			{
				id: "sv3",
				contactId: "c_hale",
				kind: "CSAT",
				score: 2,
				comment: "Haul lingered.",
				at: at(-1, 20)
			}
		],
		pings: [
			{
				staffId: beto,
				place: "Sandy Beach lot 18",
				at: at(0, 8),
				status: "on site"
			},
			{
				staffId: ines,
				place: "North of Las Conchas",
				at: at(0, 10),
				status: "en route"
			},
			{
				staffId: mateo,
				place: "Yard",
				at: at(0, 7),
				status: "office"
			}
		],
		closers: layer.closers,
		sessions: layer.sessions,
		sfLeads: layer.sfLeads,
		chatter: layer.chatter,
		settings: {
			company: "CD Services LLC",
			yard: "Phoenix valley",
			phone: "602-555-0190",
			reviewUrl: "https://cdigs.bid",
			financing: true,
			commissionRate: .03,
			sweptOn: "",
			writerTone: "Straight, local, no hype. English or Spanish.",
			site: "https://cdigs.bid",
			closersLive: true,
			callingStart: 7,
			callingEnd: 19
		}
	};
}
function actorName(data, sessionId) {
	return data.staff.find((s) => s.id === sessionId)?.name ?? "Site";
}
var useRidge = create()(persist((set, get) => {
	const commit = (fn) => set((s) => ({ data: fn(s.data, actorName(s.data, s.sessionId)) }));
	return {
		data: seed(),
		sessionId: null,
		signIn: (id, pin) => {
			const staff = get().data.staff.find((s) => s.id === id);
			if (!staff || staff.pin !== pin.trim()) return false;
			set({ sessionId: id });
			return true;
		},
		signOut: () => set({ sessionId: null }),
		boot: () => set((s) => ({ data: sweep(s.data) })),
		reset: () => set({
			data: seed(),
			sessionId: get().sessionId
		}),
		importData: (data) => set({ data }),
		addLead: (input) => commit((data, actor) => createLead(data, input, actor)),
		saveContact: (contact) => commit((data) => ({
			...data,
			contacts: data.contacts.some((c) => c.id === contact.id) ? data.contacts.map((c) => c.id === contact.id ? contact : c) : [contact, ...data.contacts]
		})),
		addTag: (id, tag) => commit((data) => ({
			...data,
			contacts: data.contacts.map((c) => c.id === id && tag && !c.tags.includes(tag) ? {
				...c,
				tags: [...c.tags, tag]
			} : c)
		})),
		addNote: (id, note) => commit((data, actor) => ({
			...data,
			contacts: data.contacts.map((c) => c.id === id ? {
				...c,
				notes: `${c.notes}\n${note}`.trim()
			} : c),
			activity: [{
				id: uid("a"),
				at: (/* @__PURE__ */ new Date()).toISOString(),
				text: `${actor} noted ${note}`,
				kind: "note"
			}, ...data.activity]
		})),
		merge: (keepId, dropId) => commit((data) => mergeContacts(data, keepId, dropId)),
		importCsv: (text) => {
			const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
			const start = lines[0]?.toLowerCase().includes("name") ? 1 : 0;
			let count = 0;
			commit((data, actor) => {
				let next = data;
				for (const line of lines.slice(start)) {
					const [name, phone, email, address, city, source] = line.split(",").map((p) => p.trim());
					if (!name || !phone) continue;
					if (next.contacts.some((c) => phoneKey(c.phone) === phoneKey(phone))) continue;
					next = createLead(next, {
						name,
						phone,
						email: email ?? "",
						address: address ?? "",
						city: city ?? "",
						service: "Imported lead",
						notes: "CSV import",
						source: source || "Import"
					}, actor);
					count += 1;
				}
				return next;
			});
			return count;
		},
		addCompany: (name, kind, phone) => commit((data) => ({
			...data,
			companies: [{
				id: uid("co"),
				name,
				kind,
				phone,
				address: ""
			}, ...data.companies]
		})),
		moveDeal: (id, stage) => commit((data, actor) => {
			const deal = data.deals.find((d) => d.id === id);
			if (!deal) return data;
			return fire({
				...data,
				deals: data.deals.map((d) => d.id === id ? {
					...d,
					stage,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : d)
			}, "deal.stage", {
				contactId: deal.contactId,
				dealId: id,
				stage
			}, actor);
		}),
		addDeal: (contactId, title, value) => commit((data) => ({
			...data,
			deals: [{
				id: uid("d"),
				title,
				contactId,
				value,
				stage: "New",
				ownerId: data.contacts.find((c) => c.id === contactId)?.ownerId ?? data.staff[0].id,
				source: "Manual",
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, ...data.deals]
		})),
		sendMessage: (contactId, channel, body) => commit((data, actor) => {
			const thread = data.threads.find((t) => t.contactId === contactId);
			const msg = {
				id: uid("m"),
				dir: "out",
				channel,
				body,
				at: (/* @__PURE__ */ new Date()).toISOString()
			};
			const threads = thread ? data.threads.map((t) => t.id === thread.id ? {
				...t,
				unread: false,
				messages: [...t.messages, msg]
			} : t) : [{
				id: uid("th"),
				contactId,
				unread: false,
				messages: [msg]
			}, ...data.threads];
			return {
				...data,
				threads,
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} sent ${channel}`,
					kind: "inbox"
				}, ...data.activity]
			};
		}),
		addCall: (contactId, status, notes) => commit((data, actor) => {
			const next = {
				...data,
				calls: [{
					id: uid("call"),
					contactId,
					direction: "in",
					status,
					seconds: status === "answered" ? 180 : 0,
					at: (/* @__PURE__ */ new Date()).toISOString(),
					notes
				}, ...data.calls]
			};
			if (status === "missed") return fire(next, "call.missed", { contactId }, actor);
			if (status === "voicemail") {
				const thread = next.threads.find((t) => t.contactId === contactId);
				const msg = {
					id: uid("m"),
					dir: "out",
					channel: "voicemail",
					body: notes || "Voicemail drop: we will call you back from the yard.",
					at: (/* @__PURE__ */ new Date()).toISOString()
				};
				return {
					...next,
					threads: thread ? next.threads.map((t) => t.contactId === contactId ? {
						...t,
						messages: [...t.messages, msg]
					} : t) : [{
						id: uid("th"),
						contactId,
						unread: false,
						messages: [msg]
					}, ...next.threads]
				};
			}
			return next;
		}),
		setJobStatus: (id, status) => commit((data, actor) => {
			const job = data.jobs.find((j) => j.id === id);
			if (!job) return data;
			let next = {
				...data,
				jobs: data.jobs.map((j) => j.id === id ? {
					...j,
					status,
					weatherHold: status === "hold"
				} : j),
				pings: data.pings.map((p) => job.crewIds.includes(p.staffId) ? {
					...p,
					status,
					at: (/* @__PURE__ */ new Date()).toISOString(),
					place: job.address
				} : p)
			};
			const ctx = {
				contactId: job.contactId,
				jobId: job.id,
				amount: job.price
			};
			if (status === "enroute") next = fire(next, "job.enroute", ctx, actor);
			if (status === "done") next = fire(next, "job.complete", ctx, actor);
			return {
				...next,
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} set ${job.title} to ${status}`,
					kind: "field"
				}, ...next.activity]
			};
		}),
		assignCrew: (id, crewIds) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === id ? {
				...j,
				crewIds
			} : j)
		})),
		moveJobDay: (id, dayOffset) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => {
				if (j.id !== id) return j;
				const d = /* @__PURE__ */ new Date();
				d.setDate(d.getDate() + dayOffset);
				const prev = new Date(j.start);
				d.setHours(prev.getHours(), prev.getMinutes(), 0, 0);
				return {
					...j,
					start: d.toISOString(),
					status: j.status === "unscheduled" ? "scheduled" : j.status
				};
			})
		})),
		toggleCheck: (jobId, checkId) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === jobId ? {
				...j,
				checklist: j.checklist.map((c) => c.id === checkId ? {
					...c,
					done: !c.done
				} : c)
			} : j)
		})),
		addPhotoNote: (jobId, caption) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === jobId ? {
				...j,
				photos: [...j.photos, {
					src: "/media/trench.jpg",
					caption
				}]
			} : j)
		})),
		setLoads: (jobId, loads, dump) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === jobId ? {
				...j,
				loads,
				dump
			} : j)
		})),
		saveEstimate: (est) => commit((data) => ({
			...data,
			estimates: data.estimates.some((e) => e.id === est.id) ? data.estimates.map((e) => e.id === est.id ? est : e) : [est, ...data.estimates]
		})),
		buildEstimate: (contactId, type) => commit((data, actor) => {
			const options = packagesFor(data, type);
			const est = {
				id: uid("e"),
				number: `EST-${230 + data.estimates.length}`,
				contactId,
				title: type,
				status: "draft",
				options,
				discount: 0
			};
			return {
				...data,
				estimates: [est, ...data.estimates],
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} built ${est.number}`,
					kind: "money"
				}, ...data.activity]
			};
		}),
		sendEstimate: (id) => commit((data, actor) => {
			const est = data.estimates.find((e) => e.id === id);
			if (!est) return data;
			return fire({
				...data,
				estimates: data.estimates.map((e) => e.id === id ? {
					...e,
					status: "sent",
					sentAt: (/* @__PURE__ */ new Date()).toISOString()
				} : e),
				deals: data.deals.map((d) => d.contactId === est.contactId && d.stage !== "Won" && d.stage !== "Lost" ? {
					...d,
					stage: "Estimate sent",
					value: estimateTotal(est, "Best"),
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : d)
			}, "estimate.sent", {
				contactId: est.contactId,
				amount: estimateTotal(est, "Best")
			}, actor);
		}),
		approveEstimate: (id, option) => commit((data, actor) => {
			const est = data.estimates.find((e) => e.id === id);
			if (!est) return data;
			const total = estimateTotal({
				...est,
				chosen: option
			}, option);
			let jobs = data.jobs;
			let jobId = est.jobId;
			if (!jobId) {
				const contact = data.contacts.find((c) => c.id === est.contactId);
				jobId = uid("j");
				jobs = [{
					id: jobId,
					title: est.title,
					type: est.title,
					contactId: est.contactId,
					address: contact?.address || contact?.city || "",
					status: "unscheduled",
					crewIds: [],
					start: (/* @__PURE__ */ new Date()).toISOString(),
					hours: 6,
					lat: 31.32,
					lng: -113.54,
					notes: `Approved ${option}.`,
					checklist: checklistFor(est.title),
					photos: [],
					price: total,
					costLabor: 0,
					costMaterials: 0,
					loads: 0,
					dump: "",
					weatherHold: false,
					routeOrder: jobs.length + 1
				}, ...jobs];
			} else jobs = jobs.map((j) => j.id === jobId ? {
				...j,
				price: total
			} : j);
			const next = {
				...data,
				jobs,
				estimates: data.estimates.map((e) => e.id === id ? {
					...e,
					status: "approved",
					chosen: option,
					jobId
				} : e),
				deals: data.deals.map((d) => d.contactId === est.contactId && d.stage !== "Lost" ? {
					...d,
					stage: "Won",
					value: total,
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : d)
			};
			return fire(next, "estimate.approved", {
				contactId: est.contactId,
				jobId,
				dealId: next.deals.find((d) => d.contactId === est.contactId)?.id,
				amount: total
			}, actor);
		}),
		declineEstimate: (id) => commit((data) => ({
			...data,
			estimates: data.estimates.map((e) => e.id === id ? {
				...e,
				status: "declined"
			} : e)
		})),
		markEstimateViewed: (id) => commit((data) => ({
			...data,
			estimates: data.estimates.map((e) => e.id === id && e.status === "sent" ? {
				...e,
				status: "viewed"
			} : e)
		})),
		makeInvoice: (jobId) => commit((data, actor) => {
			const job = data.jobs.find((j) => j.id === jobId);
			if (!job) return data;
			if (data.invoices.some((i) => i.jobId === jobId && i.status !== "paid")) return data;
			const inv = {
				id: uid("inv"),
				number: `INV-${1100 + data.invoices.length}`,
				contactId: job.contactId,
				jobId,
				items: [{
					name: job.title,
					qty: 1,
					price: job.price
				}],
				status: "draft",
				issuedAt: (/* @__PURE__ */ new Date()).toISOString(),
				dueAt: new Date(Date.now() + 6048e5).toISOString(),
				overduePinged: false,
				financing: data.settings.financing
			};
			return {
				...data,
				invoices: [inv, ...data.invoices],
				jobs: data.jobs.map((j) => j.id === jobId ? {
					...j,
					status: j.status === "done" ? "invoiced" : j.status
				} : j),
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} drafted ${inv.number}`,
					kind: "money"
				}, ...data.activity]
			};
		}),
		sendInvoice: (id) => commit((data, actor) => {
			const inv = data.invoices.find((i) => i.id === id);
			if (!inv) return data;
			const amount = invoiceTotal(inv);
			const body = `${data.contacts.find((c) => c.id === inv.contactId)?.name.split(" ")[0] ?? "Hi"}, invoice ${inv.number} for ${amount.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
				maximumFractionDigits: 0
			})} is ready.`;
			const thread = data.threads.find((t) => t.contactId === inv.contactId);
			const msg = {
				id: uid("m"),
				dir: "out",
				channel: "sms",
				body,
				at: (/* @__PURE__ */ new Date()).toISOString()
			};
			return {
				...data,
				invoices: data.invoices.map((i) => i.id === id ? {
					...i,
					status: "sent"
				} : i),
				threads: thread ? data.threads.map((t) => t.contactId === inv.contactId ? {
					...t,
					messages: [...t.messages, msg]
				} : t) : [{
					id: uid("th"),
					contactId: inv.contactId,
					unread: false,
					messages: [msg]
				}, ...data.threads],
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} sent ${inv.number}`,
					kind: "money"
				}, ...data.activity]
			};
		}),
		recordPayment: (invoiceId, method) => commit((data, actor) => {
			const inv = data.invoices.find((i) => i.id === invoiceId);
			if (!inv) return data;
			const due = invoiceDue(data, inv);
			if (due <= 0) return data;
			return fire({
				...data,
				payments: [{
					id: uid("pay"),
					invoiceId,
					amount: due,
					method,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...data.payments],
				invoices: data.invoices.map((i) => i.id === invoiceId ? {
					...i,
					status: "paid"
				} : i)
			}, "invoice.paid", {
				contactId: inv.contactId,
				jobId: inv.jobId,
				amount: due
			}, actor);
		}),
		toggleWorkflow: (id) => commit((data) => ({
			...data,
			workflows: data.workflows.map((w) => w.id === id ? {
				...w,
				enabled: !w.enabled
			} : w)
		})),
		saveWorkflow: (wf) => commit((data) => ({
			...data,
			workflows: data.workflows.some((w) => w.id === wf.id) ? data.workflows.map((w) => w.id === wf.id ? wf : w) : [wf, ...data.workflows]
		})),
		addStep: (id, step) => commit((data) => ({
			...data,
			workflows: data.workflows.map((w) => w.id === id ? {
				...w,
				steps: [...w.steps, step]
			} : w)
		})),
		runWorkflow: (id, contactId) => commit((data, actor) => runOne(data, id, { contactId }, actor)),
		addTask: (title, contactId, ownerId) => commit((data) => ({
			...data,
			tasks: [{
				id: uid("t"),
				title,
				contactId,
				ownerId,
				due: (/* @__PURE__ */ new Date()).toISOString(),
				done: false
			}, ...data.tasks]
		})),
		toggleTask: (id) => commit((data) => ({
			...data,
			tasks: data.tasks.map((t) => t.id === id ? {
				...t,
				done: !t.done
			} : t)
		})),
		sendPayload: (taskId) => commit((data, actor) => {
			const task = data.tasks.find((t) => t.id === taskId);
			if (!task?.payload || !task.contactId) return data;
			const body = task.payload.replaceAll("{{name}}", data.contacts.find((c) => c.id === task.contactId)?.name.split(" ")[0] ?? "there").replaceAll("{{company}}", data.settings.company);
			const thread = data.threads.find((t) => t.contactId === task.contactId);
			const msg = {
				id: uid("m"),
				dir: "out",
				channel: "sms",
				body,
				at: (/* @__PURE__ */ new Date()).toISOString()
			};
			return {
				...data,
				tasks: data.tasks.map((t) => t.id === taskId ? {
					...t,
					done: true
				} : t),
				threads: thread ? data.threads.map((t) => t.contactId === task.contactId ? {
					...t,
					messages: [...t.messages, msg]
				} : t) : [{
					id: uid("th"),
					contactId: task.contactId,
					unread: false,
					messages: [msg]
				}, ...data.threads],
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} sent a sequence touch`,
					kind: "workflow"
				}, ...data.activity]
			};
		}),
		addAppointment: (contactId, staffId, title, start) => commit((data, actor) => {
			const end = new Date(new Date(start).getTime() + 36e5).toISOString();
			return fire({
				...data,
				appointments: [{
					id: uid("ap"),
					title,
					contactId,
					staffId,
					start,
					end,
					kind: "Site visit",
					status: "set"
				}, ...data.appointments],
				deals: data.deals.map((d) => d.contactId === contactId && (d.stage === "New" || d.stage === "Contacted") ? {
					...d,
					stage: "Site visit",
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				} : d)
			}, "appointment.booked", { contactId }, actor);
		}),
		sendCampaign: (id) => commit((data, actor) => {
			const camp = data.campaigns.find((c) => c.id === id);
			if (!camp) return data;
			const people = data.contacts.filter((c) => camp.audience === "all" || c.tags.includes(camp.audience) || c.status === camp.audience);
			let threads = data.threads;
			for (const person of people) {
				const body = camp.body.replaceAll("{{company}}", data.settings.company).replaceAll("{{name}}", person.name.split(" ")[0]);
				const msg = {
					id: uid("m"),
					dir: "out",
					channel: camp.channel,
					body,
					at: (/* @__PURE__ */ new Date()).toISOString()
				};
				threads = threads.find((t) => t.contactId === person.id) ? threads.map((t) => t.contactId === person.id ? {
					...t,
					messages: [...t.messages, msg]
				} : t) : [{
					id: uid("th"),
					contactId: person.id,
					unread: false,
					messages: [msg]
				}, ...threads];
			}
			return {
				...data,
				threads,
				campaigns: data.campaigns.map((c) => c.id === id ? {
					...c,
					status: "sent",
					sent: people.length
				} : c),
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} sent ${camp.name} to ${people.length}`,
					kind: "marketing"
				}, ...data.activity]
			};
		}),
		saveCampaign: (c) => commit((data) => ({
			...data,
			campaigns: data.campaigns.some((row) => row.id === c.id) ? data.campaigns.map((row) => row.id === c.id ? c : row) : [c, ...data.campaigns]
		})),
		savePost: (p) => commit((data) => ({
			...data,
			posts: data.posts.some((row) => row.id === p.id) ? data.posts.map((row) => row.id === p.id ? p : row) : [p, ...data.posts]
		})),
		writePost: (id, copy) => commit((data) => ({
			...data,
			posts: data.posts.map((p) => p.id === id ? {
				...p,
				copy
			} : p)
		})),
		submitForm: (formId, answers) => commit((data, actor) => {
			const name = answers.Name || answers.name || "Form lead";
			const phone = answers.Phone || answers.phone || "";
			let next = data;
			let contactId = data.contacts.find((c) => phone && phoneKey(c.phone) === phoneKey(phone))?.id;
			if (!contactId && name) {
				next = createLead(next, {
					name,
					phone: phone || "000-000-0000",
					email: answers.Email || "",
					address: answers.Address || "",
					city: answers.City || "Puerto Peñasco",
					service: answers["What do you need dug"] || Object.values(answers)[0] || "Form",
					notes: Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(" · "),
					source: "Form"
				}, actor);
				contactId = next.contacts[0]?.id;
			}
			next = {
				...next,
				submissions: [{
					id: uid("sub"),
					formId,
					at: (/* @__PURE__ */ new Date()).toISOString(),
					answers,
					contactId
				}, ...next.submissions]
			};
			return contactId ? fire(next, "form.submitted", { contactId }, actor) : next;
		}),
		bumpFunnel: (id, index) => commit((data) => ({
			...data,
			funnels: data.funnels.map((f) => f.id === id ? {
				...f,
				steps: f.steps.map((step, i) => i === index ? {
					...step,
					visits: step.visits + 1,
					conversions: step.conversions + (i < f.steps.length - 1 ? 0 : 1)
				} : step)
			} : f)
		})),
		savePage: (page) => commit((data) => ({
			...data,
			pages: data.pages.some((p) => p.id === page.id) ? data.pages.map((p) => p.id === page.id ? page : p) : [page, ...data.pages]
		})),
		visitPage: (slug, variant) => commit((data) => ({
			...data,
			pages: data.pages.map((p) => p.slug === slug ? {
				...p,
				visitsA: p.visitsA + (variant === "A" ? 1 : 0),
				visitsB: p.visitsB + (variant === "B" ? 1 : 0)
			} : p)
		})),
		clickLink: (slug) => commit((data) => ({
			...data,
			links: data.links.map((l) => l.slug === slug ? {
				...l,
				clicks: l.clicks + 1
			} : l)
		})),
		addLink: (label, slug) => commit((data) => ({
			...data,
			links: [{
				id: uid("lk"),
				slug,
				label,
				clicks: 0
			}, ...data.links]
		})),
		replyReview: (id, reply) => commit((data, actor) => ({
			...data,
			reviews: data.reviews.map((r) => r.id === id ? {
				...r,
				reply
			} : r),
			activity: [{
				id: uid("a"),
				at: (/* @__PURE__ */ new Date()).toISOString(),
				text: `${actor} replied to a review`,
				kind: "reputation"
			}, ...data.activity]
		})),
		addReview: (contactId, stars, text, source) => commit((data, actor) => {
			return fire({
				...data,
				reviews: [{
					id: uid("r"),
					contactId,
					stars,
					text,
					source,
					at: (/* @__PURE__ */ new Date()).toISOString(),
					reply: ""
				}, ...data.reviews]
			}, stars <= 3 ? "review.low" : "review.high", { contactId }, actor);
		}),
		setTicket: (id, status) => commit((data) => ({
			...data,
			tickets: data.tickets.map((t) => t.id === id ? {
				...t,
				status
			} : t)
		})),
		addTicket: (contactId, subject, priority) => commit((data) => ({
			...data,
			tickets: [{
				id: uid("tk"),
				contactId,
				subject,
				priority,
				status: "open",
				slaHours: priority === "high" ? 8 : 48,
				openedAt: (/* @__PURE__ */ new Date()).toISOString()
			}, ...data.tickets]
		})),
		toggleCourse: (id) => commit((data) => ({
			...data,
			courses: data.courses.map((c) => c.id === id ? {
				...c,
				done: !c.done
			} : c)
		})),
		addBoard: (text) => {
			const authorId = get().sessionId ?? get().data.staff[0].id;
			commit((data) => ({
				...data,
				board: [{
					id: uid("b"),
					authorId,
					text,
					at: (/* @__PURE__ */ new Date()).toISOString()
				}, ...data.board]
			}));
		},
		clockIn: (staffId, jobId) => commit((data) => {
			if (data.clocks.some((c) => c.staffId === staffId && !c.outAt)) return data;
			return {
				...data,
				clocks: [{
					id: uid("cl"),
					staffId,
					jobId,
					inAt: (/* @__PURE__ */ new Date()).toISOString()
				}, ...data.clocks]
			};
		}),
		clockOut: (staffId) => commit((data) => ({
			...data,
			clocks: data.clocks.map((c) => c.staffId === staffId && !c.outAt ? {
				...c,
				outAt: (/* @__PURE__ */ new Date()).toISOString()
			} : c)
		})),
		addPlan: (contactId, name, price, cadence) => commit((data) => ({
			...data,
			plans: [{
				id: uid("pl"),
				contactId,
				name,
				cadence,
				price,
				next: new Date(Date.now() + 2592e6).toISOString(),
				active: true
			}, ...data.plans]
		})),
		addStaff: (name, role) => commit((data) => ({
			...data,
			staff: [...data.staff, {
				id: uid("s"),
				name,
				role,
				pin: "2580",
				phone: "",
				certs: [],
				rate: 24
			}]
		})),
		updateSettings: (patch) => commit((data) => ({
			...data,
			settings: {
				...data.settings,
				...patch
			}
		})),
		addPrice: (item) => commit((data) => ({
			...data,
			priceBook: [...data.priceBook, {
				...item,
				id: uid("pr")
			}]
		})),
		setRoute: (ids) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => ({
				...j,
				routeOrder: ids.indexOf(j.id) === -1 ? j.routeOrder : ids.indexOf(j.id)
			}))
		})),
		addPermit: (type, number, jobId) => commit((data) => ({
			...data,
			permits: [{
				id: uid("pm"),
				type,
				number,
				jobId,
				status: "pending",
				expires: new Date(Date.now() + 12096e5).toISOString()
			}, ...data.permits]
		})),
		addHours: (id, hours) => commit((data) => ({
			...data,
			equipment: data.equipment.map((e) => e.id === id ? {
				...e,
				hours: e.hours + hours
			} : e)
		})),
		recordSurvey: (input) => commit((data) => ({
			...data,
			surveys: [{
				...input,
				id: uid("sv"),
				at: (/* @__PURE__ */ new Date()).toISOString()
			}, ...data.surveys]
		})),
		enroll: (workflowId, contactId) => commit((data, actor) => runOne(data, workflowId, { contactId }, actor)),
		stepClosers: () => set((s) => ({ data: stepFloor(s.data, actorName(s.data, s.sessionId)) })),
		takeHandoff: (sessionId) => set((s) => ({ data: handoffToVisit(s.data, sessionId, actorName(s.data, s.sessionId)) })),
		toggleCloser: (id) => commit((data) => ({
			...data,
			closers: (data.closers ?? []).map((c) => c.id === id ? {
				...c,
				status: c.status === "on" ? "paused" : "on"
			} : c)
		})),
		convertLead: (id) => commit((data, actor) => {
			const lead = data.sfLeads?.find((l) => l.id === id);
			if (!lead || lead.status === "Converted" || lead.status === "Unqualified") return data;
			const phone = lead.phone.replace(/\D/g, "");
			const existing = data.contacts.find((c) => c.phone.replace(/\D/g, "") === phone);
			const contactId = existing?.id ?? uid("c");
			const contact = existing ?? {
				id: contactId,
				name: lead.name,
				phone: lead.phone,
				email: lead.email,
				address: "",
				city: lead.city,
				tags: ["salesforce", "cdigs.bid"],
				score: lead.score,
				source: lead.source,
				ownerId: lead.ownerId,
				status: "lead",
				notes: `Converted from Salesforce lead. ${lead.service}.`,
				gate: "",
				soil: "",
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			return {
				...data,
				contacts: existing ? data.contacts : [contact, ...data.contacts],
				deals: [{
					id: uid("d"),
					title: `${lead.service} — ${lead.city}`,
					contactId,
					value: 0,
					stage: "New",
					ownerId: lead.ownerId,
					source: "Salesforce",
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				}, ...data.deals],
				sfLeads: data.sfLeads.map((l) => l.id === id ? {
					...l,
					status: "Converted"
				} : l),
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} converted ${lead.name} from a Salesforce lead`,
					kind: "salesforce"
				}, ...data.activity]
			};
		}),
		postChatter: (text) => commit((data, actor) => ({
			...data,
			chatter: [{
				id: uid("ch"),
				author: actor,
				text,
				at: (/* @__PURE__ */ new Date()).toISOString(),
				record: "Chatter"
			}, ...data.chatter ?? []]
		}))
	};
}, {
	name: "carranza-ridge-v1",
	version: 2,
	partialize: (s) => ({
		data: s.data,
		sessionId: s.sessionId
	}),
	migrate: (persisted, version) => {
		const state = persisted;
		if (!state?.data) return persisted;
		const data = state.data;
		if (version >= 2 && data.closers?.length && data.sessions && data.sfLeads && data.settings?.site) return state;
		const layer = cdigsLayer("s_luz", "s_mateo", "s_owner");
		const contactIds = new Set(data.contacts.map((c) => c.id));
		const dealIds = new Set(data.deals.map((d) => d.id));
		const apptIds = new Set(data.appointments.map((a) => a.id));
		const threadIds = new Set(data.threads.map((t) => t.id));
		const company = !data.settings?.company || data.settings.company === "Carranza Dig Services" ? "CD Services LLC" : data.settings.company;
		const yard = !data.settings?.yard || data.settings.yard.includes("Peñasco") || data.settings.yard.includes("Penasco") ? "Phoenix valley" : data.settings.yard;
		return {
			sessionId: state.sessionId ?? null,
			data: {
				...data,
				contacts: [...layer.contacts.filter((c) => !contactIds.has(c.id)), ...data.contacts],
				deals: [...layer.deals.filter((d) => !dealIds.has(d.id)), ...data.deals],
				appointments: [...layer.appointments.filter((a) => !apptIds.has(a.id)), ...data.appointments],
				threads: [...layer.threads.filter((t) => !threadIds.has(t.id)), ...data.threads],
				closers: data.closers?.length ? data.closers : layer.closers,
				sessions: data.sessions?.length ? data.sessions : layer.sessions,
				sfLeads: data.sfLeads?.length ? data.sfLeads : layer.sfLeads,
				chatter: data.chatter?.length ? data.chatter : layer.chatter,
				settings: {
					...data.settings,
					company,
					yard,
					site: data.settings?.site || "https://cdigs.bid",
					closersLive: data.settings?.closersLive ?? true,
					callingStart: data.settings?.callingStart ?? 7,
					callingEnd: data.settings?.callingEnd ?? 19
				}
			}
		};
	}
}));
function useHydrated() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const go = () => setReady(true);
		if (useRidge.persist.hasHydrated()) go();
		return useRidge.persist.onFinishHydration(go);
	}, []);
	return ready;
}
function download(filename, text, type = "application/json") {
	const blob = new Blob([text], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
//#endregion
export { when as C, useRidge as S, phoneKey as _, download as a, sourceBuckets as b, forecast as c, jobMargin as d, miles as f, optimize as g, newWorkflow as h, dayLabel as i, invoiceDue as l, monthBuckets as m, commissions as n, duplicateGroups as o, money as p, dayKey as r, estimateTotal as s, askRidge as t, invoiceTotal as u, rioDraft as v, writerDraft as w, useHydrated as x, solDraft as y };
