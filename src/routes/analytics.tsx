import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: pageMeta("Analytics | CareerPilot AI", "Review career workflow activity and verified application outcomes.") }),
  component: () => <CareerPilotShell><WorkspacePage section="analytics" /></CareerPilotShell>,
});