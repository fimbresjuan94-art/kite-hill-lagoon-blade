import type { ModuleId } from "@/lib/ridge/types";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeDollarSign,
  BookOpen,
  Bot,
  Building2,
  Calculator,
  CalendarDays,
  ChartColumn,
  ClipboardList,
  Clock,
  Cloud,
  Columns3,
  Construction,
  FileWarning,
  Funnel,
  Globe,
  GraduationCap,
  Headset,
  Images,
  Inbox,
  LayoutDashboard,
  Library,
  LifeBuoy,
  ListChecks,
  Megaphone,
  MessageSquare,
  PenLine,
  Phone,
  Radio,
  Receipt,
  Repeat,
  Route,
  Settings,
  Share2,
  Shield,
  Sparkles,
  SquareCheck,
  Star,
  Timer,
  Truck,
  Users,
  Wallet,
  Waypoints,
  Workflow,
  Wrench,
} from "lucide-react";

export const NAV: { group: string; items: { id: ModuleId; label: string; icon: LucideIcon }[] }[] = [
  {
    group: "Today",
    items: [
      { id: "overview", label: "Today", icon: LayoutDashboard },
      { id: "jobs", label: "Jobs", icon: Construction },
      { id: "photos", label: "Photos", icon: Images },
      { id: "time", label: "Time clock", icon: Clock },
      { id: "schedule", label: "Schedule", icon: Timer },
      { id: "calls", label: "Calls", icon: Phone },
      { id: "calendar", label: "Estimate book", icon: CalendarDays },
      { id: "inbox", label: "Inbox", icon: Inbox },
      { id: "contacts", label: "Contacts", icon: Users },
      { id: "estimates", label: "Estimates", icon: PenLine },
      { id: "invoices", label: "Invoices", icon: Receipt },
      { id: "payments", label: "Payments", icon: Wallet },
    ],
  },
  {
    group: "Also on the book",
    items: [
      { id: "tasks", label: "Tasks", icon: SquareCheck },
      { id: "dispatch", label: "Dispatch", icon: Radio },
      { id: "pipeline", label: "Pipeline", icon: Columns3 },
      { id: "companies", label: "Companies", icon: Building2 },
      { id: "reviews", label: "Reviews", icon: Star },
      { id: "routes", label: "Routes", icon: Route },
      { id: "pricebook", label: "Price book", icon: BookOpen },
      { id: "equipment", label: "Equipment", icon: Truck },
      { id: "permits", label: "Permits", icon: FileWarning },
      { id: "tickets", label: "Tickets", icon: LifeBuoy },
      { id: "board", label: "Crew board", icon: Wrench },
      { id: "closers", label: "La cuadrilla", icon: Headset },
      { id: "salesforce", label: "Lead desk", icon: Cloud },
      { id: "ask", label: "Ask el corral", icon: Sparkles },
      { id: "activity", label: "Activity", icon: Activity },
      { id: "lists", label: "Smart lists", icon: Funnel },
      { id: "campaigns", label: "Campaigns", icon: Megaphone },
      { id: "funnels", label: "Funnels", icon: Waypoints },
      { id: "forms", label: "Forms", icon: ClipboardList },
      { id: "sites", label: "Pages", icon: Globe },
      { id: "social", label: "Social", icon: Share2 },
      { id: "ads", label: "Ads & links", icon: BadgeDollarSign },
      { id: "costing", label: "Job costing", icon: Calculator },
      { id: "plans", label: "Service plans", icon: Repeat },
      { id: "knowledge", label: "Knowledge", icon: Library },
      { id: "surveys", label: "CSAT / NPS", icon: MessageSquare },
      { id: "academy", label: "Academy", icon: GraduationCap },
      { id: "workflows", label: "Workflows", icon: Workflow },
      { id: "agents", label: "Agents", icon: Bot },
      { id: "sequences", label: "Sequences", icon: Waypoints },
      { id: "reports", label: "Reports", icon: ChartColumn },
      { id: "coverage", label: "Full coverage", icon: ListChecks },
      { id: "team", label: "Team", icon: Shield },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
];

export const MODULES = NAV.flatMap((g) => g.items);

const CREW_WRITE: ModuleId[] = ["jobs", "time", "photos", "schedule"];
const AUTO: ModuleId[] = [
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
  "team",
  "settings",
];

export function navFor(_role?: string) {
  return NAV;
}

export function allowed(_role: string | undefined, id: string) {
  return MODULES.some((item) => item.id === id);
}

export function canWrite(role: string | undefined, id: string) {
  if (role === "developer") return true;
  if (AUTO.includes(id as ModuleId)) return false;
  if (role === "operator") return CREW_WRITE.includes(id as ModuleId);
  return true;
}
