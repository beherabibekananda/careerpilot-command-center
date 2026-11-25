import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/mission-control")({
  head: () => ({ meta: pageMeta("AI Mission Control | CareerPilot AI", "Inspect the CareerPilot AI agent workspace and verified operational state.") }),
  component: () => <CareerPilotShell><WorkspacePage section="mission-control" /></CareerPilotShell>,
});