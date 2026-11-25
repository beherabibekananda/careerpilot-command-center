import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/communications")({
  head: () => ({ meta: pageMeta("Communications | CareerPilot AI", "Review recruitment email and message activity after connecting a provider.") }),
  component: () => <CareerPilotShell><WorkspacePage section="communications" /></CareerPilotShell>,
});