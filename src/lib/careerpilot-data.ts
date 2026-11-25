export type CareerPilotSection =
  | "mission-control"
  | "job-discovery"
  | "source-explorer"
  | "applications"
  | "manual-actions"
  | "resume-studio"
  | "cover-letters"
  | "communications"
  | "interviews"
  | "analytics"
  | "career-insights"
  | "agent-activity"
  | "integrations"
  | "security"
  | "usage"
  | "settings"
  | "onboarding";

export type NavItem = {
  label: string;
  to: string;
  icon: string;
  badge?: string;
};

export const navigationGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", to: "/", icon: "overview" },
      { label: "AI Mission Control", to: "/mission-control", icon: "agents" },
      { label: "Job Discovery", to: "/job-discovery", icon: "jobs" },
      { label: "Source Explorer", to: "/source-explorer", icon: "sources" },
    ],
  },
  {
    label: "Applications",
    items: [
      { label: "Applications", to: "/applications", icon: "applications" },
      { label: "Manual Action Centre", to: "/manual-actions", icon: "manual", badge: "3" },
      { label: "Resume Studio", to: "/resume-studio", icon: "resume" },
      { label: "Cover Letters", to: "/cover-letters", icon: "letters" },
    ],
  },
  {
    label: "Career intelligence",
    items: [
      { label: "Communications", to: "/communications", icon: "communications" },
      { label: "Interviews", to: "/interviews", icon: "interviews" },
      { label: "Analytics", to: "/analytics", icon: "analytics" },
      { label: "Career Insights", to: "/career-insights", icon: "insights" },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Agent Activity", to: "/agent-activity", icon: "activity" },
      { label: "Integrations", to: "/integrations", icon: "integrations" },
      { label: "Security Centre", to: "/security", icon: "security" },
      { label: "Usage & Costs", to: "/usage", icon: "usage" },
      { label: "Workspace setup", to: "/onboarding", icon: "settings" },
      { label: "Settings", to: "/settings", icon: "settings" },
    ],
  },
];

export const sampleMetrics = [
  { label: "Jobs discovered", value: "248", change: "+18", icon: "jobs" },
  { label: "Strong matches", value: "32", change: "82%+ match", icon: "match" },
  { label: "Applications", value: "14", change: "Demo records", icon: "applications" },
  { label: "Needs your attention", value: "3", change: "Demo queue", icon: "manual" },
];

export const sampleAgents = [
  "Source Discovery",
  "Web Exploration",
  "Company Verification",
  "Job Extraction",
  "Eligibility",
  "Semantic Matching",
  "Resume Intelligence",
  "ATS Validation",
  "Cover Letter",
  "Application",
  "Permission",
  "Notification",
  "Communication Tracking",
  "Security",
  "Recovery",
].map((name) => ({ name, state: "Unknown", task: "Waiting for a verified backend connection" }));

export const sampleJobs = [
  {
    title: "Senior Product Designer",
    company: "Northstar Labs",
    location: "Remote · US",
    type: "Full-time",
    posted: "2h ago",
    score: 94,
    salary: "$145k–$175k",
    source: "Northstar careers",
    eligibility: "Meets listed requirements",
    status: "New match",
  },
  {
    title: "Product Design Lead",
    company: "Aperture Systems",
    location: "New York, NY · Hybrid",
    type: "Full-time",
    posted: "Yesterday",
    score: 89,
    salary: "$160k–$195k",
    source: "Aperture careers",
    eligibility: "Review required",
    status: "Review",
  },
  {
    title: "Staff UX Designer",
    company: "Morrow Health",
    location: "Remote · US",
    type: "Full-time",
    posted: "2 days ago",
    score: 86,
    salary: "Not listed",
    source: "Morrow careers",
    eligibility: "Meets listed requirements",
    status: "New match",
  },
  {
    title: "Design Systems Manager",
    company: "Brightline Finance",
    location: "Boston, MA · Hybrid",
    type: "Full-time",
    posted: "3 days ago",
    score: 78,
    salary: "$138k–$165k",
    source: "Brightline careers",
    eligibility: "Review required",
    status: "Saved",
  },
];

export const sampleSources = [
  { name: "Northstar Labs", domain: "careers.northstar.example", kind: "Company careers", found: 12, health: "Unverified" },
  { name: "Aperture Systems", domain: "jobs.aperture.example", kind: "ATS-hosted careers", found: 8, health: "Unverified" },
  { name: "Morrow Health", domain: "morrow.example/careers", kind: "Company careers", found: 5, health: "Unverified" },
  { name: "Brightline Finance", domain: "brightline.example/jobs", kind: "Company careers", found: 3, health: "Unverified" },
];

export const sampleApplications = [
  { company: "Northstar Labs", role: "Senior Product Designer", status: "Ready to review", updated: "Today · 10:42 AM", score: 94 },
  { company: "Aperture Systems", role: "Product Design Lead", status: "Manual action required", updated: "Yesterday · 4:18 PM", score: 89 },
  { company: "Morrow Health", role: "Staff UX Designer", status: "Resume preparing", updated: "Yesterday · 1:05 PM", score: 86 },
  { company: "Brightline Finance", role: "Design Systems Manager", status: "Discovered", updated: "Mon · 9:31 AM", score: 78 },
];

export const sampleActions = [
  { company: "Aperture Systems", role: "Product Design Lead", reason: "A required screening question needs your verified answer.", priority: "Due soon", deadline: "Due in 1 day" },
  { company: "Redwood Robotics", role: "Senior UX Designer", reason: "The application site requires an account sign-in.", priority: "Review", deadline: "Due in 3 days" },
  { company: "Morrow Health", role: "Staff UX Designer", reason: "Review the final resume before continuing.", priority: "Review", deadline: "No deadline listed" },
];

export const sampleActivity = [
  { title: "New career source recorded", detail: "Northstar Labs · sample source", time: "Today · 10:42 AM", kind: "source" },
  { title: "Job match added to review", detail: "Senior Product Designer · 94% skills match", time: "Today · 10:18 AM", kind: "job" },
  { title: "Manual review requested", detail: "Aperture Systems · screening answer", time: "Yesterday · 4:18 PM", kind: "manual" },
  { title: "Resume draft prepared", detail: "Morrow Health · sample document", time: "Yesterday · 1:05 PM", kind: "resume" },
];

export const sectionDetails: Record<CareerPilotSection, { title: string; description: string; eyebrow: string }> = {
  "mission-control": { title: "AI Mission Control", description: "Visibility into the agents that support your career workflow.", eyebrow: "Workspace" },
  "job-discovery": { title: "Job Discovery", description: "Review opportunities against your verified career preferences.", eyebrow: "Workspace" },
  "source-explorer": { title: "Source Explorer", description: "Inspect career sites and feeds before monitoring is authorized.", eyebrow: "Workspace" },
  applications: { title: "Applications", description: "Follow each opportunity through its review and application lifecycle.", eyebrow: "Applications" },
  "manual-actions": { title: "Manual Action Centre", description: "Handle the steps that require your judgment or direct participation.", eyebrow: "Applications" },
  "resume-studio": { title: "Resume Studio", description: "Manage your source resume and review job-specific document drafts.", eyebrow: "Applications" },
  "cover-letters": { title: "Cover Letters", description: "Draft and review tailored letters grounded in your verified experience.", eyebrow: "Applications" },
  communications: { title: "Communications", description: "Recruiter messages and email activity appear here when connected.", eyebrow: "Career intelligence" },
  interviews: { title: "Interviews", description: "Keep interview preparation and scheduling details together.", eyebrow: "Career intelligence" },
  analytics: { title: "Analytics", description: "Understand career pipeline activity without mistaking examples for live results.", eyebrow: "Career intelligence" },
  "career-insights": { title: "Career Insights", description: "Grounded observations for your next career decision.", eyebrow: "Career intelligence" },
  "agent-activity": { title: "Agent Activity", description: "Review a traceable activity stream when an agent service is connected.", eyebrow: "System" },
  integrations: { title: "Integrations", description: "Manage service connections and check their verified status.", eyebrow: "System" },
  security: { title: "Security Centre", description: "Review authorization boundaries, privacy, and safety controls.", eyebrow: "System" },
  usage: { title: "Usage & Costs", description: "Usage reporting becomes available after a verified service connection.", eyebrow: "System" },
  settings: { title: "Settings", description: "Control local preferences and review account-level settings.", eyebrow: "System" },
  onboarding: { title: "Set up your career workspace", description: "Review the setup steps before connecting personal career data.", eyebrow: "Getting started" },
};

export function canSubmitApplication(input: {
  backendConnected: boolean;
  userAuthorized: boolean;
  platformPermitted: boolean;
}): boolean {
  return input.backendConnected && input.userAuthorized && input.platformPermitted;
}