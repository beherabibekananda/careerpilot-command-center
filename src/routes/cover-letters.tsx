import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/cover-letters")({
  head: () => ({ meta: pageMeta("Cover Letters | CareerPilot AI", "Draft and review cover letters grounded in verified career information.") }),
  component: () => <CareerPilotShell><WorkspacePage section="cover-letters" /></CareerPilotShell>,
});