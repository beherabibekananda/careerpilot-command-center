import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/agent-activity")({
  head: () => ({ meta: pageMeta("Agent Activity | CareerPilot AI", "Inspect traceable agent events and verified task activity.") }),
  component: () => <CareerPilotShell><WorkspacePage section="agent-activity" /></CareerPilotShell>,
});