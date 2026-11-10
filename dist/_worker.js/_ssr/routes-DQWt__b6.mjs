import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as PublicBar } from "./ui-BWavd5c9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DQWt__b6.js
var import_jsx_runtime = require_jsx_runtime();
var SERVICES = [
	[
		"01",
		"Site cuts & pads",
		"Laser-checked building pads. The number is written before the machine starts."
	],
	[
		"02",
		"Utility trenches",
		"Cover, spoil, and a locate that is actually clear."
	],
	[
		"03",
		"Septic",
		"Tank, field, setbacks. One option approved, then we dig."
	],
	[
		"04",
		"Demolition & haul",
		"Slabs, pads, and every load counted to a dump site."
	],
	[
		"05",
		"Grading & drainage",
		"Swales and dress work that still looks right after rain."
	],
	[
		"06",
		"Pool shells",
		"The hole, the haul, and a finish the builder can trust."
	]
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid items-end gap-8 px-5 pb-8 md:grid-cols-2 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-copper",
						children: "Puerto Peñasco · Sonora"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl leading-none md:text-7xl",
						children: "We cut the ground so the build can stand."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-lg text-mist",
						children: "Carranza Dig marks the lines, writes the price, and sends a crew that already knows the gate code."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							className: "inline-flex min-h-11 items-center rounded-full bg-copper px-5 font-medium text-copper-ink",
							children: "Book a site visit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/p/$slug",
							params: { slug: "septic" },
							className: "inline-flex min-h-11 items-center rounded-full px-5 ring-1 ring-line",
							children: "Septic work"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/media/hero.jpg",
				alt: "Excavator on a coastal desert lot at golden hour",
				className: "h-80 w-full rounded-3xl object-cover md:h-[32rem]"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-px bg-line md:grid-cols-3",
			children: SERVICES.map(([n, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "bg-ink px-5 py-8 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-copper",
						children: n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-mist",
						children: body
					})
				]
			}, n))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/media/trench.jpg",
				alt: "Utility trench cut through pale desert soil",
				className: "h-80 w-full rounded-3xl object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-copper",
					children: "How a job actually goes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-4 space-y-4 text-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You tell us the lot. We book a walk." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You get good, better, and best in writing." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The crew texts when the truck leaves the yard." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "You approve the cut. Then you pay." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/portal",
					className: "mt-6 inline-flex min-h-11 items-center text-copper",
					children: "Already have a price? Open the portal."
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "flex flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-mist md:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Carranza Dig Services · Puerto Peñasco" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				search: { m: "overview" },
				className: "min-h-11 inline-flex items-center",
				children: "Admin"
			})]
		})
	] });
}
//#endregion
export { Home as component };
