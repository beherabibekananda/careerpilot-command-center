import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: pageMeta("Applications | CareerPilot AI", "Review application records, statuses, and timeline in your career workspace.") }),
  component: () => <CareerPilotShell><WorkspacePage section="applications" /></CareerPilotShell>,
});