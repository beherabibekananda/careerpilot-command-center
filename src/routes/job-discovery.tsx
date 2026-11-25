import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/job-discovery")({
  head: () => ({ meta: pageMeta("Job Discovery | CareerPilot AI", "Search and review job opportunities against your career preferences.") }),
  component: () => <CareerPilotShell><WorkspacePage section="job-discovery" /></CareerPilotShell>,
});