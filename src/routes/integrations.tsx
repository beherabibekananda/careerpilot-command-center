import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: pageMeta("Integrations | CareerPilot AI", "Check API, email, document, and live-event service connection status.") }),
  component: () => <CareerPilotShell><WorkspacePage section="integrations" /></CareerPilotShell>,
});