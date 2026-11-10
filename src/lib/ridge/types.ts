export type Role = "developer" | "owner" | "dispatcher" | "estimator" | "operator" | "office";

export type ModuleId =
  | "overview"
  | "ask"
  | "activity"
  | "contacts"
  | "companies"
  | "pipeline"
  | "lists"
  | "tasks"
  | "inbox"
  | "calls"
  | "campaigns"
  | "funnels"
  | "forms"
  | "sites"
  | "social"
  | "ads"
  | "reviews"
  | "calendar"
  | "dispatch"
  | "schedule"
  | "jobs"
  | "routes"
  | "estimates"
  | "pricebook"
  | "costing"
  | "equipment"
  | "permits"
  | "time"
  | "photos"
  | "invoices"
  | "payments"
  | "plans"
  | "tickets"
  | "knowledge"
  | "surveys"
  | "academy"
  | "board"
  | "workflows"
  | "agents"
  | "sequences"
  | "reports"
  | "coverage"
  | "team"
  | "settings"
  | "closers"
  | "salesforce";

export type Staff = {
  id: string;
  name: string;
  role: Role;
  pin: string;
  phone: string;
  certs: string[];
  rate: number;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  companyId?: string;
  tags: string[];
  score: number;
  source: string;
  ownerId: string;
  status: string;
  notes: string;
  gate: string;
  soil: string;
  createdAt: string;
};

export type Company = {
  id: string;
  name: string;
  kind: string;
  phone: string;
  address: string;
};

export type Deal = {
  id: string;
  title: string;
  contactId: string;
  value: number;
  stage: string;
  ownerId: string;
  source: string;
  updatedAt: string;
};

export const STAGES = ["New", "Contacted", "Site visit", "Estimate sent", "Won", "Lost"] as const;

export type Msg = {
  id: string;
  dir: "in" | "out";
  channel: string;
  body: string;
  at: string;
};

export type Thread = {
  id: string;
  contactId: string;
  unread: boolean;
  messages: Msg[];
  title?: string;
};

export type JobStatus = "unscheduled" | "scheduled" | "enroute" | "onsite" | "hold" | "done" | "invoiced";

export type CheckItem = { id: string; label: string; done: boolean };

export type Job = {
  id: string;
  title: string;
  type: string;
  contactId: string;
  address: string;
  status: JobStatus;
  crewIds: string[];
  start: string;
  hours: number;
  lat: number;
  lng: number;
  notes: string;
  checklist: CheckItem[];
  photos: { src: string; caption: string }[];
  price: number;
  costLabor: number;
  costMaterials: number;
  loads: number;
  dump: string;
  weatherHold: boolean;
  routeOrder: number;
};

export type Line = { name: string; qty: number; price: number };

export type Estimate = {
  id: string;
  number: string;
  contactId: string;
  jobId?: string;
  title: string;
  status: "draft" | "sent" | "viewed" | "approved" | "declined";
  options: { name: string; items: Line[]; note: string }[];
  chosen?: string;
  sentAt?: string;
  discount: number;
};

export type Invoice = {
  id: string;
  number: string;
  contactId: string;
  jobId?: string;
  items: Line[];
  status: "draft" | "sent" | "partial" | "paid" | "overdue";
  issuedAt: string;
  dueAt: string;
  overduePinged: boolean;
  financing: boolean;
};

export type Payment = {
  id: string;
  invoiceId: string;
  amount: number;
  method: string;
  at: string;
};

export type PriceItem = {
  id: string;
  category: string;
  name: string;
  unit: string;
  price: number;
  cost: number;
};

export type Review = {
  id: string;
  contactId: string;
  stars: number;
  text: string;
  source: string;
  at: string;
  reply: string;
};

export type WStep = {
  op: "sms" | "email" | "task" | "tag" | "score" | "dealStage" | "review" | "invoice" | "note";
  text?: string;
  subject?: string;
  title?: string;
  tag?: string;
  delta?: number;
  stage?: string;
  minScore?: number;
  day?: number;
};

export type Workflow = {
  id: string;
  name: string;
  trigger: string;
  when?: string;
  enabled: boolean;
  lane: "auto" | "sequence";
  steps: WStep[];
  runs: number;
};

export type Run = {
  id: string;
  workflowId: string;
  contactId?: string;
  jobId?: string;
  dealId?: string;
  cursor: number;
  status: "running" | "done";
};

export type Task = {
  id: string;
  title: string;
  contactId?: string;
  ownerId: string;
  due: string;
  done: boolean;
  payload?: string;
};

export type Appointment = {
  id: string;
  title: string;
  contactId: string;
  staffId: string;
  start: string;
  end: string;
  kind: string;
  status: string;
  source?: string;
  bookedBy?: string;
};

export type Campaign = {
  id: string;
  name: string;
  channel: "email" | "sms";
  audience: string;
  body: string;
  status: "draft" | "sent";
  sent: number;
  replies: number;
};

export type SocialPost = {
  id: string;
  network: string;
  copy: string;
  when: string;
  status: "draft" | "scheduled" | "posted";
};

export type FormDef = {
  id: string;
  name: string;
  kind: "form" | "survey" | "quiz";
  fields: string[];
};

export type Submission = {
  id: string;
  formId: string;
  at: string;
  answers: Record<string, string>;
  contactId?: string;
};

export type Funnel = {
  id: string;
  name: string;
  steps: { name: string; visits: number; conversions: number }[];
};

export type Ad = {
  id: string;
  name: string;
  platform: string;
  spend: number;
  leads: number;
  status: string;
};

export type Ticket = {
  id: string;
  contactId: string;
  subject: string;
  priority: "low" | "normal" | "high";
  status: "open" | "pending" | "solved";
  slaHours: number;
  openedAt: string;
};

export type Article = {
  id: string;
  title: string;
  category: string;
  body: string;
  kind: "kb" | "blog" | "playbook";
};

export type Equipment = {
  id: string;
  name: string;
  type: string;
  hours: number;
  nextService: number;
  status: string;
};

export type Permit = {
  id: string;
  jobId?: string;
  type: string;
  number: string;
  status: string;
  expires: string;
};

export type Clock = {
  id: string;
  staffId: string;
  jobId?: string;
  inAt: string;
  outAt?: string;
};

export type Plan = {
  id: string;
  contactId: string;
  name: string;
  cadence: string;
  price: number;
  next: string;
  active: boolean;
};

export type Course = {
  id: string;
  title: string;
  minutes: number;
  forRole: string;
  done: boolean;
};

export type BoardPost = {
  id: string;
  authorId: string;
  text: string;
  at: string;
};

export type ActivityItem = {
  id: string;
  at: string;
  text: string;
  kind: string;
};

export type Landing = {
  id: string;
  name: string;
  slug: string;
  headline: string;
  headlineB: string;
  sub: string;
  offer: string;
  published: boolean;
  visitsA: number;
  visitsB: number;
  leads: number;
  showB: boolean;
};

export type TrackLink = {
  id: string;
  slug: string;
  label: string;
  clicks: number;
};

export type Call = {
  id: string;
  contactId: string;
  direction: "in" | "out";
  status: "answered" | "missed" | "voicemail";
  seconds: number;
  at: string;
  notes: string;
};

export type Survey = {
  id: string;
  contactId: string;
  kind: "CSAT" | "NPS";
  score: number;
  comment: string;
  at: string;
};

export type Ping = {
  staffId: string;
  place: string;
  at: string;
  status: string;
};

export type Settings = {
  company: string;
  yard: string;
  phone: string;
  reviewUrl: string;
  financing: boolean;
  commissionRate: number;
  sweptOn: string;
  writerTone: string;
  site: string;
  closersLive: boolean;
  callingStart: number;
  callingEnd: number;
};

export type CloserChannel = "phone" | "chat" | "sms" | "video";

export type Closer = {
  id: string;
  name: string;
  channel: CloserChannel;
  lang: string;
  status: "on" | "paused";
  window: string;
  capPerHour: number;
};

export type CloserLine = { who: "agent" | "lead"; text: string };

export type CloserStage = "queued" | "dialing" | "qualifying" | "booking" | "booked" | "handoff" | "voicemail" | "callback" | "optout";

export type CloserSession = {
  id: string;
  closerId: string;
  contactId?: string;
  appointmentId?: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  service: string;
  detail: string;
  channel: CloserChannel;
  intent: number;
  stage: CloserStage;
  outcome: "book" | "handoff" | "vm" | "callback" | "optout";
  beat: number;
  transcript: CloserLine[];
  at: string;
};

export type SfStatus = "New" | "Working" | "Qualified" | "Converted" | "Unqualified";

export type SfLead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  source: string;
  status: SfStatus;
  score: number;
  ownerId: string;
  service: string;
};

export type Chatter = {
  id: string;
  author: string;
  text: string;
  at: string;
  record: string;
};

export type RidgeData = {
  staff: Staff[];
  contacts: Contact[];
  companies: Company[];
  deals: Deal[];
  threads: Thread[];
  jobs: Job[];
  estimates: Estimate[];
  invoices: Invoice[];
  payments: Payment[];
  priceBook: PriceItem[];
  reviews: Review[];
  workflows: Workflow[];
  runs: Run[];
  tasks: Task[];
  appointments: Appointment[];
  campaigns: Campaign[];
  posts: SocialPost[];
  forms: FormDef[];
  submissions: Submission[];
  funnels: Funnel[];
  ads: Ad[];
  tickets: Ticket[];
  articles: Article[];
  equipment: Equipment[];
  permits: Permit[];
  clocks: Clock[];
  plans: Plan[];
  courses: Course[];
  board: BoardPost[];
  activity: ActivityItem[];
  pages: Landing[];
  links: TrackLink[];
  calls: Call[];
  surveys: Survey[];
  pings: Ping[];
  closers: Closer[];
  sessions: CloserSession[];
  sfLeads: SfLead[];
  chatter: Chatter[];
  settings: Settings;
};

export type Ctx = {
  contactId?: string;
  jobId?: string;
  dealId?: string;
  stage?: string;
  amount?: number;
};

export type LeadInput = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  service: string;
  notes: string;
  source: string;
  visit?: string;
};
