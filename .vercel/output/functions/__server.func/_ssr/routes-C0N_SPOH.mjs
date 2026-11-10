import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C0N_SPOH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	(0, import_react.useEffect)(() => {
		window.location.replace("/brand/index.html");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-[#0E1013] px-6 text-center text-[#F2F4F6]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/brand/index.html",
			className: "inline-flex min-h-[52px] items-center rounded-[10px] bg-[#F6B91A] px-6 font-extrabold text-[#14110A]",
			children: "Open CD Services"
		})
	});
}
//#endregion
export { Home as component };
