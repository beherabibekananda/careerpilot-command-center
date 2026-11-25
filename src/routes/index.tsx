import { createFileRoute } from "@tanstack/react-router";

import { CareerPilotShell } from "@/components/careerpilot/app-shell";
import { DashboardPage } from "@/components/careerpilot/dashboard";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () => ({ meta: pageMeta("CareerPilot AI — Career Command Centre", "Your Career. Our Intelligence. Always Applying. Review your job discovery and application workspace.") }),
  component: OverviewRoute,
});

function OverviewRoute() {
  return <CareerPilotShell><DashboardPage /></CareerPilotShell>;
}