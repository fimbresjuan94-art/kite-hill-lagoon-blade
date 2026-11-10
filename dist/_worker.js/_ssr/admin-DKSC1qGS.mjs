import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as useRidge, x as useHydrated } from "./store-DaLMOhq5.mjs";
import { r as Route$5 } from "./router-DAeIK6te.mjs";
import { i as Shell, n as Door, t as BootLine } from "./shell-Cr2zjbqQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DKSC1qGS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	if (!useHydrated()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLine, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLive, {});
}
function AdminLive() {
	const sessionId = useRidge((s) => s.sessionId);
	const boot = useRidge((s) => s.boot);
	const search = Route$5.useSearch();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		boot();
	}, [boot]);
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
