import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/usage")({
  head: () => ({ meta: pageMeta("Usage & Costs | CareerPilot AI", "Review verified API, storage, worker, and cost data for your workspace.") }),
  component: () => <CareerPilotShell><WorkspacePage section="usage" /></CareerPilotShell>,
});