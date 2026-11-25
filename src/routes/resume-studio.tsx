import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/resume-studio")({
  head: () => ({ meta: pageMeta("Resume Studio | CareerPilot AI", "Manage a master resume and review grounded, job-specific document drafts.") }),
  component: () => <CareerPilotShell><WorkspacePage section="resume-studio" /></CareerPilotShell>,
});