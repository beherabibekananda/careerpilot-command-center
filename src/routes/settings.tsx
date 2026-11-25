import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: pageMeta("Settings | CareerPilot AI", "Review career workflow settings, notification choices, and authorization status.") }),
  component: () => <CareerPilotShell><WorkspacePage section="settings" /></CareerPilotShell>,
});