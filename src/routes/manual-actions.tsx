import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/manual-actions")({
  head: () => ({ meta: pageMeta("Manual Action Centre | CareerPilot AI", "Review application steps that require your judgment or direct participation.") }),
  component: () => <CareerPilotShell><WorkspacePage section="manual-actions" /></CareerPilotShell>,
});