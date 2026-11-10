import { i as __toESM } from "../_runtime.mjs";
import { X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BpwE8ygY.js
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
function phoneKey(phone) {
	return phone.replace(/\D/g, "").slice(-10);
}
var DB = "cd-clips";
function db() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB, 1);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains("clips")) req.result.createObjectStore("clips");
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function saveClip(id, blob) {
	const base = await db();
	await new Promise((resolve, reject) => {
		const tx = base.transaction("clips", "readwrite");
		tx.objectStore("clips").put(blob, id);
		tx.oncomplete = () => resolve();
		tx.onerror = () => reject(tx.error);
	});
	base.close();
}
async function loadClip(id) {
	const base = await db();
	const blob = await new Promise((resolve, reject) => {
		const req = base.transaction("clips", "readonly").objectStore("clips").get(id);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
	base.close();
	return blob;
}
function phoneDigits(phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.length === 10) return `+1${digits}`;
	if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
	if (digits.length >= 7) return `+${digits}`;
	return "";
}
function telHref(phone) {
	const n = phoneDigits(phone);
	return n ? `tel:${n}` : "";
}
function smsHref(phone, body) {
	const n = phoneDigits(phone);
	return n ? `sms:${n}?&body=${encodeURIComponent(body)}` : "";
}
function spanishText(name) {
	return `Hola ${name.split(" ")[0] || ""}, somos CD Services. Podemos ver el terreno esta semana. ¿Mañana o tarde?`;
}
function englishText(name) {
	return `Hi ${name.split(" ")[0] || ""}, this is CD Services. We can walk the site this week. Morning or afternoon?`;
}
/** Exact English from the yard, Mexican Spanish for the owner. */
var EN_ES = {
	"Command": "Mando",
	"Overview": "Resumen",
	"Lead desk": "Mesa de solicitudes",
	"Ask el corral": "Pregunte a el corral",
	"Activity": "Actividad",
	"Relationships": "Gente",
	"Contacts": "Contactos",
	"Companies": "Compañías",
	"Pipeline": "Tablero",
	"Smart lists": "Listas",
	"Tasks": "Tareas",
	"Conversations": "Conversaciones",
	"Inbox": "Bandeja",
	"Calls": "Llamadas",
	"Campaigns": "Campañas",
	"Growth": "Crecimiento",
	"Funnels": "Embudos",
	"Forms": "Formularios",
	"Pages": "Páginas",
	"Social": "Redes",
	"Ads & links": "Anuncios y enlaces",
	"Reviews": "Reseñas",
	"Estimate book": "Libro de visitas",
	"Field": "Campo",
	"Dispatch": "Despacho",
	"Schedule": "Horario",
	"Jobs": "Trabajos",
	"Routes": "Rutas",
	"Estimates": "Cotizaciones",
	"Price book": "Lista de precios",
	"Job costing": "Costo del trabajo",
	"Equipment": "Equipo",
	"Permits": "Permisos",
	"Time clock": "Reloj",
	"Photo reports": "Fotos",
	"Money & care": "Dinero y cuidado",
	"Invoices": "Facturas",
	"Payments": "Pagos",
	"Service plans": "Planes",
	"Tickets": "Tickets",
	"Knowledge": "Conocimiento",
	"CSAT / NPS": "Encuestas",
	"Academy": "Academia",
	"Crew board": "Tablero de la cuadrilla",
	"Automation": "Automático",
	"Workflows": "Flujos",
	"Agents": "Agentes",
	"Sequences": "Seguimientos",
	"Reports": "Reportes",
	"Full coverage": "Cobertura",
	"Team": "Equipo",
	"Settings": "Ajustes",
	"Site": "Sitio",
	"Sign out": "Salir",
	"Search people or tools": "Buscar gente o herramientas",
	"Search": "Buscar",
	"Open menu": "Abrir menú",
	"Close menu": "Cerrar menú",
	"You can change this.": "Puede cambiar esto.",
	"You can see this. The owner handles changes here.": "Puede ver esto. El dueño hace los cambios aquí.",
	"You can see this. The developer runs this part.": "Puede ver esto. El desarrollador maneja esta parte.",
	"Back to the public site": "Volver al sitio",
	"Enter": "Entrar",
	"PIN": "PIN",
	"That PIN does not match.": "Ese PIN no coincide.",
	"Sign in with your email. The password is not listed here.": "Inicie sesión con su correo. La contraseña no está escrita aquí.",
	"That sign-in does not match.": "Ese acceso no coincide.",
	"Password": "Contraseña",
	"developer": "desarrollador",
	"owner": "dueño",
	"operator": "cuadrilla",
	"dispatcher": "despacho",
	"estimator": "estimador",
	"office": "oficina",
	"Call": "Llamar",
	"Called": "Llamado",
	"Call these": "Llame a estos",
	"Put them on the book": "Póngalos en el libro",
	"Name": "Nombre",
	"Phone": "Teléfono",
	"City": "Ciudad",
	"What they need dug": "Qué hay que cavar",
	"Nobody is on the book yet. A form on the site files itself here. If the shop phone rings, write them in below.": "Nadie en el libro todavía. Un formulario del sitio se archiva aquí. Si suena el teléfono del taller, anótelo abajo.",
	"The book files the requests, the follow-ups, and the ads. You call, you price, you get paid.": "El libro archiva las solicitudes, los seguimientos y los anuncios. Usted llama, cotiza y cobra.",
	"Needs a human": "Necesita una persona",
	"Nothing waiting.": "Nada pendiente.",
	"Done": "Hecho",
	"Collected this month": "Cobrado este mes",
	"Money you already wrote down": "Dinero que ya anotó",
	"Weighted pipeline": "Trabajo abierto",
	"Open work, not a guess": "Trabajo abierto, no un cálculo",
	"Estimates booked": "Visitas apuntadas",
	"Visits from the site": "Visitas del sitio",
	"Open tasks": "Tareas abiertas",
	"Calls still to make": "Llamadas por hacer",
	"Cash, six months": "Efectivo, seis meses",
	"The yard, right now": "El patio, ahora",
	"Today": "Hoy",
	"Also on the book": "También en el libro",
	"Photos": "Fotos",
	"Camera": "Cámara",
	"Gallery": "Galería",
	"Video": "Video",
	"Text · Spanish": "Texto · Español",
	"Text · English": "Texto · Inglés",
	"Jobs on the truck": "Trabajos en el camión",
	"Yard": "Patio",
	"Ask": "Preguntar",
	"Add": "Agregar",
	"Send": "Enviar",
	"Save": "Guardar",
	"Paid": "Pagado",
	"Send draft": "Enviar borrador",
	"Save draft": "Guardar borrador",
	"Save page": "Guardar página",
	"New page": "Página nueva",
	"New line": "Línea nueva",
	"Run now": "Correr ahora",
	"Add step": "Agregar paso",
	"Pause": "Pausar",
	"Enable": "Activar",
	"Enroll": "Inscribir",
	"Post reply": "Publicar respuesta",
	"Clock in": "Entrar",
	"Clock out": "Salir del reloj",
	"On the clock": "En el reloj",
	"Off the clock": "Fuera del reloj",
	"On my way": "En camino",
	"On the way": "En camino",
	"On the dirt": "En el terreno",
	"On site": "En el sitio",
	"They said yes": "Dijeron que sí",
	"Invoice the job": "Facturar el trabajo",
	"Export CSV": "Exportar CSV",
	"Mark paid": "Marcar pagado",
	"Add plan": "Agregar plan",
	"Open": "Abrir",
	"Log review": "Anotar reseña",
	"Book and confirm": "Apuntar y confirmar",
	"File on the book": "Archivar en el libro",
	"Advance": "Avanzar",
	"Submit test": "Enviar prueba",
	"Write from latest job": "Escribir del último trabajo",
	"Post": "Publicar",
	"Search contacts": "Buscar contactos",
	"Search the yard": "Buscar en el patio",
	"Search knowledge": "Buscar conocimiento",
	"What has to happen": "Qué hay que hacer",
	"What broke": "Qué falló",
	"What they said": "Qué dijeron",
	"Campaign name": "Nombre de la campaña",
	"The post": "La publicación",
	"Tell the yard": "Dígale al patio",
	"Comment": "Comentario",
	"Company": "Compañía",
	"Deal": "Trato",
	"Add tag": "Agregar etiqueta",
	"Add note": "Agregar nota",
	"What the crew should know": "Qué debe saber la cuadrilla",
	"No contact": "Sin contacto",
	"No dirt on the board.": "No hay tierra en el tablero.",
	"No prices yet. Write one after you look at the dirt.": "Todavía no hay precios. Escriba uno después de ver el terreno.",
	"Nothing booked. A request on the site lands here.": "Nada apuntado. Una solicitud del sitio llega aquí.",
	"No calls. The book adds one when somebody asks for a look.": "No hay llamadas. El libro agrega una cuando piden una visita.",
	"Nobody owes. Finished dirt shows up here.": "Nadie debe. La tierra terminada aparece aquí.",
	"Filed for the owner. Numbers from the book only.": "Archivado para el dueño. Solo números del libro.",
	"Unified inbox": "Bandeja",
	"Cash": "Efectivo",
	"Ledger": "Libro de pagos",
	"Write down money already collected on a job. Cash or check.": "Anote el dinero ya cobrado en un trabajo. Efectivo o cheque.",
	"Recurring": "Recurrente",
	"Service": "Servicio",
	"Reputation": "Reputación",
	"Marketing": "Mercadeo",
	"Email and ads": "Correo y anuncios",
	"Quotes": "Cotizaciones",
	"Work orders": "Órdenes",
	"Labor": "Mano de obra",
	"Proof": "Prueba",
	"Capture": "Captura",
	"Content": "Contenido",
	"Acquisition": "Anuncios",
	"Ads and links": "Anuncios y enlaces",
	"Trackable links": "Enlaces",
	"Follow-up": "Seguimiento",
	"Day 0 sends now. Later days become tasks. Open Tasks and hit “Send this touch” when the day arrives.": "El día 0 se envía ahora. Los días después se vuelven tareas. Abra Tareas y toque “Enviar este toque” cuando llegue el día.",
	"Send this touch": "Enviar este toque",
	"The crew on the book": "La cuadrilla en el libro",
	"People": "Gente",
	"Yard file": "Archivo del patio",
	"Insight": "Reportes",
	"History": "Historial",
	"Everything that moved": "Todo lo que se movió",
	"Leads by source": "Solicitudes por origen",
	"Win rate": "Trabajos ganados",
	"Review average": "Promedio de reseñas",
	"Weighted forecast": "Trabajo por cobrar",
	"cdigs.bid": "cdigs.bid",
	"The book": "El libro",
	"Every copper name came off the site. The closers keep filling the next open window. You can still book by hand.": "Cada nombre en cobre salió del sitio. La cuadrilla sigue llenando el siguiente hueco. Todavía puede apuntar a mano.",
	"Booking fires the visit-confirmation text. Customers can also use the public Book page.": "Apuntar prepara el texto de confirmación. El cliente también puede usar la página pública.",
	"Person": "Persona",
	"With": "Con",
	"Title": "Título",
	"When": "Cuándo",
	"Who": "Quién",
	"Missed": "Perdida",
	"Answered": "Contestada",
	"Drop VM": "Dejar recado",
	"A missed call runs the text-back line. A voicemail drop lands in the inbox. The carrier is not connected yet.": "Una llamada perdida prepara el texto de regreso. El recado queda en la bandeja. La línea telefónica todavía no está conectada.",
	"Notes or drop script": "Notas o recado",
	"Build good / better / best": "Armar bueno / mejor / el mejor",
	"Approve best": "Aprobar el mejor",
	"Apply $150": "Aplicar $150",
	"Code NEIGHBOR": "Código NEIGHBOR",
	"Save spoil": "Guardar la tierra",
	"Optimize from the yard": "Ordenar desde el patio",
	"Nearest-neighbor from the yard. Not a live traffic feed.": "El camino más corto desde el patio. No es tráfico en vivo.",
	"Phoenix valley": "Valle de Phoenix",
	"Map": "Mapa",
	"Flat rate": "Precio fijo",
	"Fleet": "Flota",
	"Add trench note": "Agregar nota de zanja",
	"Log 8 hours": "Anotar 8 horas",
	"Gate": "Portón",
	"Dump": "Tiro",
	"Loads": "Viajes",
	"Estimate": "Cotización",
	"Review": "Reseña",
	"Spanish": "Español",
	"Rio draft": "Borrador de Neto",
	"Message": "Mensaje",
	"Channel": "Canal",
	"Audience": "Audiencia",
	"Body": "Texto",
	"Network": "Red",
	"Label": "Etiqueta",
	"Slug": "Enlace corto",
	"slug": "enlace",
	"Which form": "Cuál formulario",
	"Forms, surveys, quizzes": "Formularios y encuestas",
	"Headline A": "Titular A",
	"Headline B": "Titular B",
	"Sub": "Subtítulo",
	"Offer": "Oferta",
	"Published": "Publicada",
	"Serve headline B": "Mostrar titular B",
	"Open live page": "Abrir la página",
	"Planner": "Plan",
	"Status": "Estado",
	"Role": "Puesto",
	"Subject": "Asunto",
	"Plan": "Plan",
	"Price": "Precio",
	"Type": "Tipo",
	"Number": "Número",
	"Job": "Trabajo",
	"Contact": "Contacto",
	"About": "Sobre",
	"Task": "Tarea",
	"Note": "Nota",
	"Tag": "Etiqueta",
	"Address": "Dirección",
	"Email": "Correo",
	"Soil": "Tierra",
	"Score": "Puntaje",
	"Value": "Valor",
	"Kind": "Tipo",
	"Category": "Categoría",
	"Unit": "Unidad",
	"Cost": "Costo",
	"Item": "Partida",
	"Caption": "Pie de foto",
	"Question": "Pregunta",
	"Stars": "Estrellas",
	"Day": "Día",
	"Trigger": "Disparador",
	"Step": "Paso",
	"Step text": "Texto del paso",
	"Only when stage is (optional)": "Solo si la etapa es (opcional)",
	"Run for": "Correr para",
	"New": "Nuevo",
	"Lost": "Perdido",
	"Convert": "Confirmar",
	"Book this visit": "Apuntar esta visita",
	"Take the visit and book it": "Tomar la visita y apuntarla",
	"Open requests": "Solicitudes abiertas",
	"Waiting room": "Sala de espera",
	"Queue is clear. The book already holds the visits they closed.": "La fila está limpia. El libro ya tiene las visitas que cerraron.",
	"No buyer is asking for a human.": "Nadie está pidiendo una persona.",
	"Chatter": "Notas del equipo",
	"Post to the record": "Publicar en el archivo",
	"What should the crew see?": "Qué debe ver la cuadrilla?",
	"Live conversation": "Conversación en vivo",
	"Open the estimate book": "Abrir el libro de visitas",
	"Estimate book · cdigs.bid": "Libro de visitas · cdigs.bid",
	"The closers filled this. Walk the ones on your name. Take anyone sitting in the waiting room.": "La cuadrilla llenó esto. Camine los que están a su nombre. Tome a quien esté en la sala de espera.",
	"Opening el corral…": "Abriendo el corral…",
	"First time only. Then they just say hello and leave.": "Solo la primera vez. Después saludan y se van.",
	"Clear the corral file": "Borrar el archivo del corral",
	"Export JSON": "Exportar archivo",
	"Import": "Importar",
	"Take the file with you": "Llévese el archivo",
	"The corral file stays in this browser. Export it before you clear it.": "El archivo se queda en este navegador. Expórtelo antes de borrarlo.",
	"Commission rate": "Comisión",
	"Review link": "Enlace de reseña",
	"Writer tone": "Tono",
	"These fire on their own. A new lead, a booked visit, a missed call, a sent estimate, a finished job, a paid invoice, a late invoice.": "Estos corren solos. Una solicitud nueva, una visita apuntada, una llamada perdida, una cotización enviada, un trabajo terminado, una factura pagada, una factura tarde.",
	"These are CD Services tools for the work you already do.": "Estas son herramientas de CD Services para el trabajo que ya hace.",
	"What el corral can do": "Qué puede hacer el corral",
	"It reads this yard's jobs, cash, and people. No outside model required, so the file still works when you move it.": "Lee los trabajos, el dinero y la gente de este patio. No necesita un modelo de afuera, así que el archivo sigue funcionando si lo mueve.",
	"Morning brief": "Resumen de la mañana",
	"Neto · conversations": "Neto · conversaciones",
	"Dispatch · voice": "Despacho · voz",
	"Lalo · reviews": "Lalo · reseñas",
	"Simulate missed call": "Simular llamada perdida",
	"If they don't pick up: “This is Carranza Dig. We can walk the site this week. We'll text you now.”": "Si no contestan: “Habla CD Services. Podemos ver el terreno esta semana. Le mandamos un texto ahora.”",
	"Letters sitting in Gmail": "Cartas en Gmail",
	"Where the ads go": "Dónde van los anuncios",
	"Written and ready. They do not run until a Google Ads or Meta account is connected and paid. Nothing here is pretending they are live.": "Escritos y listos. No corren hasta que una cuenta de Google Ads o Meta esté conectada y pagada. Nada aquí pretende que ya están vivos.",
	"Two drafts are in estimates.carranzadig@gmail.com. They are not sent. Open Drafts and send the ones you want.": "Hay dos borradores en estimates.carranzadig@gmail.com. No están enviados. Abra Borradores y mande los que quiera.",
	"cash": "efectivo",
	"check": "cheque",
	"draft": "borrador",
	"sent": "enviado",
	"paid": "pagado",
	"overdue": "atrasado",
	"partial": "parcial",
	"open": "abierto",
	"pending": "pendiente",
	"solved": "resuelto",
	"live": "activo",
	"off": "apagado",
	"paused": "en pausa",
	"on": "activo",
	"sms": "texto",
	"email": "correo",
	"report": "reporte",
	"Lead": "Solicitud",
	"Customer": "Cliente",
	"All": "Todos",
	"Work": "Trabajo",
	"Record": "Archivo",
	"Sales": "Ventas",
	"File": "Archivo",
	"Playbooks": "Guías",
	"Lessons": "Lecciones",
	"Crew academy": "Academia de la cuadrilla",
	"Mark done": "Marcar hecho",
	"Completed": "Completado",
	"Board": "Tablero",
	"Crew": "Cuadrilla",
	"Public site": "Sitio público",
	"Book": "Reservar",
	"Portal": "Portal",
	"the book handles the rest": "el libro hace el resto",
	"Admin": "Oficina",
	"Whole office": "Toda la oficina",
	"Good": "Bien",
	"Show me again": "Muéstremelo otra vez",
	"Was that enough?": "¿Fue suficiente?",
	"Reopen": "Reabrir",
	"Merge into the first": "Juntar con el primero",
	"Duplicate phones": "Teléfonos repetidos",
	"No shared numbers. Import a repeat and it will land here.": "No hay números repetidos. Si importa uno repetido, cae aquí.",
	"CSV import. Header optional.": "Importar CSV. El encabezado es opcional.",
	"Save record": "Guardar archivo",
	"Already running": "Ya está corriendo",
	"No one yet": "Todavía nadie",
	"No linked people yet. Set the company on the contact when you import.": "Todavía no hay gente ligada. Ponga la compañía en el contacto al importar.",
	"Open board.": "Tablero abierto.",
	"Voice of customer": "Voz del cliente",
	"CSAT": "CSAT",
	"NPS": "NPS",
	"CRM": "Archivo",
	"Segments": "Segmentos",
	"Deals": "Tratos",
	"Leads": "Solicitudes",
	"Margin": "Margen"
};
function readCorralLang() {
	try {
		const saved = localStorage.getItem("cds-lang");
		if (saved === "en" || saved === "es") return saved;
	} catch {}
	return "es";
}
function writeCorralLang(lang) {
	try {
		localStorage.setItem("cds-lang", lang);
	} catch {}
	document.documentElement.lang = lang;
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
function drain(db, actor = "Bajada") {
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
function fire(db, trigger, ctx, actor = "Bajada") {
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
function runOne(db, workflowId, ctx, actor = "Bajada") {
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
function lighten(db) {
	const clip = (rows, n) => rows && rows.length > n ? rows.slice(0, n) : rows;
	return {
		...db,
		activity: clip(db.activity, 80) ?? [],
		calls: clip(db.calls, 40) ?? [],
		sessions: clip(db.sessions, 24) ?? [],
		chatter: clip(db.chatter, 40) ?? [],
		runs: clip(db.runs, 30) ?? [],
		threads: db.threads.map((thread) => thread.messages.length > 40 ? {
			...thread,
			messages: thread.messages.slice(-40)
		} : thread),
		jobs: db.jobs.map((job) => {
			const photos = job.photos.length > 8 ? job.photos.slice(-8) : job.photos;
			const videos = (job.videos ?? []).length > 4 ? job.videos.slice(-4) : job.videos;
			return photos === job.photos && videos === job.videos ? job : {
				...job,
				photos,
				videos
			};
		})
	};
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
		}, "Bajada");
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
				city: input.city || "",
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
	if (input.visit) {
		const start = new Date(input.visit);
		if (!Number.isNaN(start.getTime())) {
			const end = new Date(start.getTime() + 36e5);
			next = {
				...next,
				appointments: [{
					id: uid("ap"),
					title: `${input.service || "Estimate"} visit`,
					contactId,
					staffId: next.staff[0]?.id ?? "",
					start: start.toISOString(),
					end: end.toISOString(),
					kind: "Estimate",
					status: "requested",
					source: input.source,
					bookedBy: "cdigs.bid"
				}, ...next.appointments]
			};
		}
	}
	next = log(next, `${actor} captured ${input.name || "a lead"} from ${input.source}`, "lead");
	next = crewDesk(next, contactId);
	return fire(next, "lead.created", {
		contactId,
		dealId: deal.id
	}, actor);
}
function crewDesk(db, contactId) {
	const person = db.contacts.find((c) => c.id === contactId);
	if (!person) return db;
	const already = db.tasks.some((t) => t.contactId === contactId && t.title.startsWith("Call "));
	let next = db;
	if (!already) next = addTask(next, {
		title: `Call ${person.name}`,
		contactId,
		ownerId: person.ownerId,
		due: (/* @__PURE__ */ new Date()).toISOString(),
		payload: person.phone
	});
	if (!next.threads.find((t) => t.contactId === contactId)?.messages.some((m) => m.body.toLowerCase().includes("podemos ver el terreno")) && person.phone) {
		next = pushMessage(next, contactId, "out", "sms", spanishText(person.name));
		next = pushMessage(next, contactId, "out", "sms", englishText(person.name));
	}
	return next;
}
function bringEstimates(db) {
	const open = db.deals.filter((deal) => deal.stage !== "Won" && deal.stage !== "Lost" && !db.estimates.some((est) => est.contactId === deal.contactId && est.title === deal.title));
	if (!open.length) return db;
	let estimates = db.estimates;
	let activity = db.activity;
	const crew = [
		"Chente",
		"Chayo",
		"Neto",
		"Tavo"
	];
	open.forEach((deal, index) => {
		const who = crew[index % crew.length];
		const est = {
			id: uid("e"),
			number: `EST-${230 + estimates.length}`,
			contactId: deal.contactId,
			title: deal.title || "Site visit",
			status: "draft",
			options: packagesFor(db, deal.title || ""),
			discount: 0
		};
		estimates = [est, ...estimates];
		const person = db.contacts.find((c) => c.id === deal.contactId);
		activity = [{
			id: uid("a"),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			text: `${who} wrote ${est.number} for ${person?.name || "a request"}`,
			kind: "money"
		}, ...activity];
	});
	return {
		...db,
		estimates,
		activity
	};
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
function fileMonthlyReports(db) {
	const now = /* @__PURE__ */ new Date();
	let threads = db.threads;
	for (let back = 0; back < 3; back++) {
		const start = new Date(now.getFullYear(), now.getMonth() - back, 1);
		const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
		const id = `rpt_${start.getFullYear()}_${start.getMonth() + 1}`;
		const closed = back > 0;
		const existing = threads.find((t) => t.id === id);
		if (closed && existing) continue;
		const inside = (iso) => {
			if (!iso) return false;
			const t = new Date(iso).getTime();
			return t >= start.getTime() && t < end.getTime();
		};
		const collected = db.payments.filter((p) => inside(p.at)).reduce((sum, p) => sum + p.amount, 0);
		const billed = db.invoices.filter((inv) => inside(inv.issuedAt)).reduce((sum, inv) => sum + invoiceTotal(inv), 0);
		const owed = db.invoices.filter((inv) => inv.status !== "paid" && inv.status !== "draft").reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
		const requests = db.contacts.filter((c) => inside(c.createdAt)).length;
		const looks = db.appointments.filter((a) => inside(a.start)).length;
		const finished = db.jobs.filter((j) => j.status === "done" || j.status === "invoiced").filter((j) => inside(j.start)).length;
		const calls = db.tasks.filter((t) => !t.done).length;
		const label = start.toLocaleDateString(readCorralLang() === "es" ? "es-MX" : "en-US", {
			month: "long",
			year: "numeric"
		});
		const es = readCorralLang() === "es";
		const owedNow = back === 0 ? owed : db.invoices.filter((inv) => inside(inv.issuedAt) && inv.status !== "paid").reduce((sum, inv) => sum + invoiceDue(db, inv), 0);
		const body = es ? [
			label,
			`Cobrado ${money(collected)}`,
			`Facturado ${money(billed)}`,
			`Todavía deben ${money(owedNow)}`,
			`Solicitudes nuevas ${requests}`,
			`Visitas apuntadas ${looks}`,
			`Trabajos terminados ${finished}`,
			back === 0 ? `Llamadas abiertas ${calls}` : "Mes cerrado",
			"Solo números del libro."
		].join("\n") : [
			label,
			`Collected ${money(collected)}`,
			`Billed ${money(billed)}`,
			`Still owed ${money(owedNow)}`,
			`New requests ${requests}`,
			`Looks booked ${looks}`,
			`Jobs finished ${finished}`,
			back === 0 ? `Calls still open ${calls}` : "Month closed",
			"Numbers from the book only."
		].join("\n");
		const msg = {
			id: `${id}_m`,
			dir: "in",
			channel: "report",
			body,
			at: (closed ? end : now).toISOString()
		};
		const thread = {
			id,
			contactId: "",
			unread: existing?.unread ?? true,
			messages: [msg],
			title: `${label} report`
		};
		threads = existing ? threads.map((t) => t.id === id ? {
			...thread,
			unread: t.unread
		} : t) : [thread, ...threads];
	}
	return {
		...db,
		threads
	};
}
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
function endOf(start) {
	return new Date(new Date(start).getTime() + 45e5).toISOString();
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
var owner = "s_owner";
/** Live yard. No sample customers, no sample jobs. */
function seed() {
	return {
		staff: [
			{
				id: "s_dev",
				name: "JP",
				role: "developer",
				email: "jpshadowcraft@cdigs.bid",
				pin: "K7m-Shadow-4Q",
				phone: "",
				certs: [],
				rate: 0
			},
			{
				id: owner,
				name: "Owner",
				role: "owner",
				email: "jdurazo@cdigs.bid",
				pin: "R2v-Yard-9L",
				phone: "",
				certs: [],
				rate: 0
			},
			{
				id: "s_mgr",
				name: "Adrian",
				role: "manager",
				email: "adrian.man@cdigs.bid",
				pin: "H5t-Field-8W",
				phone: "",
				certs: [],
				rate: 0
			},
			{
				id: "s_crew",
				name: "Crew",
				role: "operator",
				email: "crew@cdigs.bid",
				pin: "N3p-Truck-1C",
				phone: "",
				certs: [],
				rate: 0
			}
		],
		companies: [],
		contacts: [],
		deals: [],
		threads: [],
		jobs: [],
		estimates: [],
		invoices: [],
		payments: [],
		priceBook: [
			{
				id: "pb_ex",
				category: "Dirt",
				name: "Excavation",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_gr",
				category: "Dirt",
				name: "Grading",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_tr",
				category: "Dirt",
				name: "Trenching",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_ft",
				category: "Dirt",
				name: "Footings and post holes",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_dm",
				category: "Dirt",
				name: "Demolition and concrete removal",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_tree",
				category: "Dirt",
				name: "Tree removal",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_cl",
				category: "Dirt",
				name: "Land clearing",
				unit: "quote",
				price: 0,
				cost: 0
			},
			{
				id: "pb_ha",
				category: "Dirt",
				name: "Dirt removal",
				unit: "quote",
				price: 0,
				cost: 0
			}
		],
		reviews: [],
		workflows: [{
			id: "w_call",
			name: "Call the new request",
			trigger: "lead.created",
			enabled: true,
			lane: "auto",
			runs: 0,
			steps: [
				{
					op: "task",
					title: "Call this estimate request today"
				},
				{
					op: "note",
					text: "If they don't pick up, text: This is CD Services. We got your estimate request on cdigs.bid. What do you need dug or hauled, and what day can we walk it?"
				},
				{
					op: "tag",
					tag: "cdigs.bid"
				},
				{
					op: "task",
					title: "Call again if they have not answered",
					day: 1
				}
			]
		}, {
			id: "w_seq",
			name: "After the look",
			trigger: "appointment.booked",
			enabled: true,
			lane: "sequence",
			runs: 0,
			steps: [{
				op: "sms",
				text: "This is CD Services. We have you down for a look. Text if the day needs to move.",
				day: 0
			}, {
				op: "task",
				title: "Send the written price if the look is done",
				day: 1
			}]
		}],
		runs: [],
		tasks: [],
		appointments: [],
		campaigns: [],
		posts: [],
		forms: [{
			id: "f_est",
			name: "Estimate request",
			kind: "form",
			fields: [
				"Name",
				"Phone",
				"City",
				"What do you need dug"
			]
		}],
		submissions: [],
		funnels: [{
			id: "fn_site",
			name: "cdigs.bid",
			steps: [
				{
					name: "Page",
					visits: 0,
					conversions: 0
				},
				{
					name: "Dirt tools",
					visits: 0,
					conversions: 0
				},
				{
					name: "Estimate form",
					visits: 0,
					conversions: 0
				},
				{
					name: "Booked look",
					visits: 0,
					conversions: 0
				}
			]
		}],
		ads: [{
			id: "ad_g",
			name: "Phoenix search",
			platform: "Google",
			spend: 0,
			leads: 0,
			status: "written, not running"
		}, {
			id: "ad_m",
			name: "Valley feed",
			platform: "Meta",
			spend: 0,
			leads: 0,
			status: "written, not running"
		}],
		tickets: [],
		articles: [{
			id: "kb_811",
			title: "Call 811 before the first bucket",
			category: "Locate",
			kind: "playbook",
			body: "No digging until the locate is clear. Write the ticket number on the job before the machine moves."
		}],
		equipment: [
			{
				id: "eq_deere",
				name: "Deere loader backhoe",
				type: "Backhoe",
				hours: 0,
				nextService: 250,
				status: "ready"
			},
			{
				id: "eq_cat",
				name: "Cat mini excavator",
				type: "Excavator",
				hours: 0,
				nextService: 250,
				status: "ready"
			},
			{
				id: "eq_trailer",
				name: "Trailer",
				type: "Haul",
				hours: 0,
				nextService: 250,
				status: "ready"
			}
		],
		permits: [],
		clocks: [],
		plans: [],
		courses: [
			{
				id: "c_811",
				title: "Call 811 before the first bucket",
				minutes: 8,
				forRole: "operator",
				done: false
			},
			{
				id: "c_look",
				title: "Walk the site before you price it",
				minutes: 10,
				forRole: "estimator",
				done: false
			},
			{
				id: "c_haul",
				title: "Count the trucks before you leave the cut",
				minutes: 6,
				forRole: "operator",
				done: false
			}
		],
		pages: [{
			id: "pg_home",
			name: "CD Services",
			slug: "dig",
			headline: "Excavation in the Phoenix valley",
			headlineB: "Pool digs, pads, and trenches",
			sub: "Own machines. We look at the dirt before we price it.",
			offer: "Free look",
			published: true,
			visitsA: 0,
			visitsB: 0,
			leads: 0,
			showB: false
		}],
		board: [],
		activity: [],
		links: [],
		calls: [],
		surveys: [],
		pings: [],
		closers: [
			{
				id: "cl_mira",
				name: "Chente",
				channel: "phone",
				lang: "en",
				status: "paused",
				window: "7a–7p",
				capPerHour: 8
			},
			{
				id: "cl_luca",
				name: "Neto",
				channel: "chat",
				lang: "en",
				status: "paused",
				window: "24h",
				capPerHour: 20
			},
			{
				id: "cl_vega",
				name: "Chayo",
				channel: "sms",
				lang: "es",
				status: "paused",
				window: "24h",
				capPerHour: 20
			},
			{
				id: "cl_noa",
				name: "Tavo",
				channel: "video",
				lang: "en",
				status: "paused",
				window: "24h",
				capPerHour: 6
			}
		],
		sessions: [],
		sfLeads: [],
		chatter: [],
		settings: {
			company: "CD Services LLC",
			yard: "Phoenix, Arizona",
			phone: "(480) 989-5802",
			reviewUrl: "https://cdigs.bid",
			financing: false,
			commissionRate: 0,
			sweptOn: "",
			writerTone: "Straight. English or Spanish. No invented jobs.",
			site: "https://cdigs.bid",
			closersLive: false,
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
		signIn: (email, pin) => {
			const staff = get().data.staff.find((s) => s.email.toLowerCase() === email.trim().toLowerCase());
			if (!staff || staff.pin !== pin) return false;
			set({ sessionId: staff.id });
			return true;
		},
		signOut: () => set({ sessionId: null }),
		boot: () => set((s) => {
			const doors = seed().staff;
			const staff = s.data.staff.map((person) => {
				const fixed = doors.find((row) => row.id === person.id);
				return fixed ? {
					...person,
					email: fixed.email
				} : person;
			});
			return { data: fileMonthlyReports(sweep(lighten(staff === s.data.staff ? s.data : {
				...s.data,
				staff
			}))) };
		}),
		tidy: () => set((s) => ({ data: lighten(s.data) })),
		markRead: (id) => commit((data) => ({
			...data,
			threads: data.threads.map((t) => t.id === id ? {
				...t,
				unread: false
			} : t)
		})),
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
		addPhotoNote: (jobId, caption, src) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === jobId ? {
				...j,
				photos: [...j.photos, {
					src,
					caption: caption || "Job photo"
				}]
			} : j)
		})),
		addVideo: (jobId, id) => commit((data) => ({
			...data,
			jobs: data.jobs.map((j) => j.id === jobId ? {
				...j,
				videos: [...j.videos ?? [], {
					id,
					caption: "Job video"
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
					city: answers.City || "",
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
		addStaff: (name, role, email, pin) => commit((data) => ({
			...data,
			staff: [...data.staff, {
				id: uid("s"),
				name,
				role,
				email: email.trim().toLowerCase(),
				pin,
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
		addEquipment: (name, type) => commit((data) => ({
			...data,
			equipment: [...data.equipment, {
				id: uid("eq"),
				name,
				type: type || "Machine",
				hours: 0,
				nextService: 250,
				status: "ready"
			}]
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
				notes: `Confirmed request. ${lead.service}.`,
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
					source: "Request",
					updatedAt: (/* @__PURE__ */ new Date()).toISOString()
				}, ...data.deals],
				sfLeads: data.sfLeads.map((l) => l.id === id ? {
					...l,
					status: "Converted"
				} : l),
				activity: [{
					id: uid("a"),
					at: (/* @__PURE__ */ new Date()).toISOString(),
					text: `${actor} confirmed ${lead.name}`,
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
	version: 10,
	partialize: (s) => ({
		data: s.data,
		sessionId: s.sessionId
	}),
	migrate: (persisted, version) => {
		if (version < 3) return {
			data: seed(),
			sessionId: null
		};
		const saved = persisted;
		if (version < 4 && saved?.data?.closers) {
			const names = {
				cl_mira: "Chente",
				cl_luca: "Neto",
				cl_vega: "Chayo",
				cl_noa: "Tavo"
			};
			saved.data.closers = saved.data.closers.map((c) => names[c.id] ? {
				...c,
				name: names[c.id]
			} : c);
		}
		if (version < 5 && saved?.data?.workflows) {
			const steps = [
				{
					op: "task",
					title: "Call this estimate request today"
				},
				{
					op: "note",
					text: "If they don't pick up, text: This is CD Services. We got your estimate request on cdigs.bid. What do you need dug or hauled, and what day can we walk it?"
				},
				{
					op: "tag",
					tag: "cdigs.bid"
				},
				{
					op: "task",
					title: "Call again if they have not answered",
					day: 1
				}
			];
			const has = saved.data.workflows.some((w) => w.id === "w_call");
			saved.data.workflows = has ? saved.data.workflows.map((w) => w.id === "w_call" ? {
				...w,
				enabled: true,
				steps
			} : w) : [{
				id: "w_call",
				name: "Call the new request",
				trigger: "lead.created",
				enabled: true,
				lane: "auto",
				runs: 0,
				steps
			}, ...saved.data.workflows];
		}
		if (version < 6 && saved?.data?.staff) {
			saved.data.staff = saved.data.staff.map((s) => s.id === "s_owner" ? {
				...s,
				name: "Owner",
				role: "owner"
			} : s);
			if (!saved.data.staff.some((s) => s.id === "s_crew")) saved.data.staff.push({
				id: "s_crew",
				name: "Crew",
				role: "operator",
				email: "",
				pin: "2580",
				phone: "(480) 989-5802",
				certs: [],
				rate: 0
			});
		}
		if (version < 7 && saved?.data) {
			const fresh = seed();
			const d = saved.data;
			if (!d.forms?.length) d.forms = fresh.forms;
			if (!d.funnels?.length) d.funnels = fresh.funnels;
			if (!d.ads?.length) d.ads = fresh.ads;
			if (!d.pages?.length) d.pages = fresh.pages;
			if (!d.courses?.length) d.courses = fresh.courses;
			if (!d.workflows?.some((w) => w.lane === "sequence")) d.workflows = [...d.workflows, ...fresh.workflows.filter((w) => w.lane === "sequence")];
		}
		if (version < 8 && saved?.data?.staff && !saved.data.staff.some((s) => s.role === "developer")) saved.data.staff.unshift({
			id: "s_dev",
			name: "Developer",
			role: "developer",
			email: "",
			pin: "2580",
			phone: "(480) 989-5802",
			certs: [],
			rate: 0
		});
		if (version < 9 && saved?.data) {
			const fresh = seed().staff;
			const extra = saved.data.staff.filter((s) => !fresh.some((row) => row.id === s.id));
			saved.data.staff = [...fresh, ...extra.map((s) => ({
				...s,
				email: s.email || ""
			}))];
			saved.sessionId = null;
		}
		if (version < 10 && saved?.data?.staff) {
			const fresh = seed().staff;
			saved.data.staff = saved.data.staff.map((person) => {
				const fixed = fresh.find((row) => row.id === person.id);
				return fixed ? {
					...person,
					email: fixed.email,
					name: fixed.name,
					role: fixed.role
				} : person;
			});
			for (const row of fresh) if (!saved.data.staff.some((person) => person.id === row.id)) saved.data.staff.push(row);
		}
		return saved;
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
export { spanishText as A, phoneKey as C, smsHref as D, saveClip as E, writeCorralLang as F, writerDraft as I, useHydrated as M, useRidge as N, solDraft as O, when as P, optimize as S, rioDraft as T, loadClip as _, createLead as a, monthBuckets as b, download as c, estimateTotal as d, forecast as f, lighten as g, jobMargin as h, commissions as i, telHref as j, sourceBuckets as k, duplicateGroups as l, invoiceTotal as m, askRidge as n, dayKey as o, invoiceDue as p, bringEstimates as r, dayLabel as s, EN_ES as t, englishText as u, miles as v, readCorralLang as w, newWorkflow as x, money as y };
