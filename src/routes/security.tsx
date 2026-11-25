import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/security")({
  head: () => ({ meta: pageMeta("Security Centre | CareerPilot AI", "Review consent, destination permissions, and verified security controls.") }),
  component: () => <CareerPilotShell><WorkspacePage section="security" /></CareerPilotShell>,
});