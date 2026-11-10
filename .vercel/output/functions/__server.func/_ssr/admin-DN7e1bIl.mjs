import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as useHydrated, P as useRidge } from "./store-C5SuoI-Y.mjs";
import { r as Route$5 } from "./router-DmUmKezC.mjs";
import { i as Shell, n as Door, t as BootLine } from "./shell-C9VwbCr4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DN7e1bIl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLine, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLive, {});
}
function AdminLive() {
	const sessionId = useRidge((s) => s.sessionId);
	const boot = useRidge((s) => s.boot);
	const addLead = useRidge((s) => s.addLead);
	const search = Route$5.useSearch();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		boot();
		try {
			const raw = localStorage.getItem("cds-pending-leads");
			if (!raw) return;
			localStorage.removeItem("cds-pending-leads");
			const rows = JSON.parse(raw);
			if (!Array.isArray(rows)) return;
			for (const lead of rows) {
				if (!lead?.name) continue;
				addLead({
					name: lead.name,
					phone: lead.phone ?? "",
					email: lead.email ?? "",
					address: "",
					city: lead.city ?? "",
					service: lead.service || "Estimate",
					notes: lead.notes ?? "",
					source: lead.source || "cdigs.bid",
					visit: lead.visit || ""
				});
			}
		} catch {}
	}, [boot, addLead]);
	if (!sessionId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Door, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		module: search.m,
		onNav: (m) => {
			navigate({
				to: "/admin",
				search: { m }
			});
		}
	});
}
//#endregion
export { AdminPage as component };
