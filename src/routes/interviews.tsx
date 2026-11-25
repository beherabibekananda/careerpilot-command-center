import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/interviews")({
  head: () => ({ meta: pageMeta("Interviews | CareerPilot AI", "Keep verified interview invitations, preparation, and scheduling in one place.") }),
  component: () => <CareerPilotShell><WorkspacePage section="interviews" /></CareerPilotShell>,
});