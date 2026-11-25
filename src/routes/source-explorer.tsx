import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/source-explorer")({
  head: () => ({ meta: pageMeta("Source Explorer | CareerPilot AI", "Inspect career websites and feeds, their verification, and separate permissions.") }),
  component: () => <CareerPilotShell><WorkspacePage section="source-explorer" /></CareerPilotShell>,
});