import { i as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, X as require_react, b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { l as PublicBar, n as Btn } from "./_ssr/ui-BWavd5c9.mjs";
import { S as useRidge, x as useHydrated } from "./_ssr/store-DaLMOhq5.mjs";
import { n as Route$1 } from "./_ssr/router-DAeIK6te.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CfwWrKJi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LandingPage() {
	const hydrated = useHydrated();
	const { slug } = Route$1.useParams();
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "p-8",
		children: "Loading page…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Live, { slug });
}
function Live({ slug }) {
	const page = useRidge((s) => s.data.pages.find((p) => p.slug === slug));
	const visit = useRidge((s) => s.visitPage);
	const [seen, setSeen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (page && !seen) {
			visit(slug, page.showB ? "B" : "A");
			setSeen(true);
		}
	}, [
		page,
		seen,
		slug,
		visit
	]);
	if (!page || !page.published) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-5 py-16 font-display text-4xl",
		children: "That page is not published."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl px-5 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-copper",
				children: "Carranza Dig"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl leading-none",
				children: page.showB ? page.headlineB : page.headline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-mist",
				children: page.sub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => void navigate({ to: "/book" }),
					children: page.offer
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 inline-flex min-h-11 items-center text-sm text-mist",
				children: "All services"
			})
		]
	})] });
}
//#endregion
export { LandingPage as component };
