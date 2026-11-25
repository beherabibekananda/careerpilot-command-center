import { createFileRoute } from "@tanstack/react-router";
import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { WorkspacePage } from "@/components/careerpilot/workspace-page";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/career-insights")({
  head: () => ({ meta: pageMeta("Career Insights | CareerPilot AI", "Explore careful, evidence-based career insights and skill patterns.") }),
  component: () => <CareerPilotShell><WorkspacePage section="career-insights" /></CareerPilotShell>,
});