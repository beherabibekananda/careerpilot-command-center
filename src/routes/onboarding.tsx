import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: pageMeta("Career Workspace Setup | CareerPilot AI", "Review the setup steps for a CareerPilot AI career workspace.") }),
  component: () => <CareerPilotShell><WorkspacePage section="onboarding" /></CareerPilotShell>,
});