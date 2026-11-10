import { Agents, Sequences, Settings, Team, Workflows } from "@/components/ridge/auto";
import { ClosersFloor, SalesforceDesk } from "@/components/ridge/close";
import { Academy, Board, Invoices, Knowledge, Payments, Plans, Surveys, Tickets } from "@/components/ridge/care";
import { ActivityScreen, Ask, Coverage, Overview, Reports } from "@/components/ridge/command";
import { Costing, Dispatch, Equipment, Estimates, Jobs, Permits, Photos, PriceBook, Routes, Schedule, TimeClock } from "@/components/ridge/fieldops";
import { Ads, Forms, Funnels, Sites, Social } from "@/components/ridge/grow";
import { Companies, Contacts, Lists, Pipeline, Tasks } from "@/components/ridge/people";
import { CalendarScreen, Calls, Campaigns, Inbox, Reviews } from "@/components/ridge/talk";
import { watchPage } from "@/lib/ridge/battalion";
import type { ModuleId } from "@/lib/ridge/types";
import { useEffect } from "react";

export function Screen({ id, onNav }: { id: ModuleId; onNav: (m: ModuleId) => void }) {
  useEffect(() => {
    watchPage(id);
    return () => watchPage(null);
  }, [id]);
  switch (id) {
    case "overview": return <Overview onNav={onNav} />;
    case "closers": return <ClosersFloor onNav={onNav} />;
    case "salesforce": return <SalesforceDesk />;
    case "ask": return <Ask />;
    case "activity": return <ActivityScreen />;
    case "contacts": return <Contacts />;
    case "companies": return <Companies />;
    case "pipeline": return <Pipeline />;
    case "lists": return <Lists />;
    case "tasks": return <Tasks />;
    case "inbox": return <Inbox />;
    case "calls": return <Calls />;
    case "campaigns": return <Campaigns />;
    case "funnels": return <Funnels />;
    case "forms": return <Forms />;
    case "sites": return <Sites />;
    case "social": return <Social />;
    case "ads": return <Ads />;
    case "reviews": return <Reviews />;
    case "calendar": return <CalendarScreen />;
    case "dispatch": return <Dispatch />;
    case "schedule": return <Schedule />;
    case "jobs": return <Jobs />;
    case "routes": return <Routes />;
    case "estimates": return <Estimates />;
    case "pricebook": return <PriceBook />;
    case "costing": return <Costing />;
    case "equipment": return <Equipment />;
    case "permits": return <Permits />;
    case "time": return <TimeClock />;
    case "photos": return <Photos />;
    case "invoices": return <Invoices />;
    case "payments": return <Payments />;
    case "plans": return <Plans />;
    case "tickets": return <Tickets />;
    case "knowledge": return <Knowledge />;
    case "surveys": return <Surveys />;
    case "academy": return <Academy />;
    case "board": return <Board />;
    case "workflows": return <Workflows />;
    case "agents": return <Agents />;
    case "sequences": return <Sequences />;
    case "reports": return <Reports />;
    case "coverage": return <Coverage onNav={onNav} />;
    case "team": return <Team />;
    case "settings": return <Settings />;
    default: return <Overview onNav={onNav} />;
  }
}
