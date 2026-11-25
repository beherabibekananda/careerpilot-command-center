import { useMemo, useState, type ChangeEvent } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Hand,
  LayoutGrid,
  List,
  LockKeyhole,
  Mail,
  Network,
  Pause,
  Play,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sectionDetails, sampleActions, sampleAgents, sampleApplications, sampleJobs, sampleSources, type CareerPilotSection } from "@/lib/careerpilot-data";

const chartData = [
  { day: "Mon", jobs: 26, apps: 4 }, { day: "Tue", jobs: 34, apps: 6 }, { day: "Wed", jobs: 29, apps: 3 },
  { day: "Thu", jobs: 42, apps: 7 }, { day: "Fri", jobs: 37, apps: 5 }, { day: "Sat", jobs: 48, apps: 8 }, { day: "Sun", jobs: 32, apps: 4 },
];

export function WorkspacePage({ section }: { section: CareerPilotSection }) {
  const details = sectionDetails[section];
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [feedback, setFeedback] = useState("");
  const [letter, setLetter] = useState("Dear Hiring Team,\n\nI’m excited to learn more about this opportunity. My experience in product design and cross-functional collaboration has helped teams turn complex needs into clear, useful experiences.\n\nI’d welcome the chance to share more about my work and learn about your team’s priorities.\n\nBest,\nYour name");
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({ resume: false, email: false, submit: false });

  const filteredJobs = useMemo(
    () => sampleJobs.filter((job) => `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  function showUnavailable(action: string) {
    setFeedback(`${action} isn’t available: the CareerPilot backend is not connected. No server action was performed.`);
  }

  function handleResumeFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const allowed = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".docx");
    if (!allowed) {
      setFileName("Unsupported file. Choose a PDF or DOCX document.");
      return;
    }
    setFileName(`${file.name} selected locally. It has not been uploaded or parsed.`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{details.eyebrow}<span className="text-border">/</span> Preview</div>
          <h1 className="text-2xl font-semibold">{details.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{details.description}</p>
        </div>
        <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">Sample workspace · disconnected</Badge>
      </div>
      <div role="status" className="flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 px-3 py-2.5 text-xs leading-relaxed text-warning">
        <CircleHelp className="mt-0.5 size-4 shrink-0" /> Example records are for interface preview only. No live service state, external message, or completed application is being represented.
      </div>

      {section === "mission-control" && <MissionControl />}
      {section === "source-explorer" && <SourceExplorer view={view} setView={setView} />}
      {section === "job-discovery" && <JobDiscovery jobs={filteredJobs} search={search} setSearch={setSearch} view={view} setView={setView} />}
      {section === "applications" && <Applications view={view} setView={setView} />}
      {section === "manual-actions" && <ManualActions onAction={showUnavailable} feedback={feedback} />}
      {section === "resume-studio" && <ResumeStudio fileName={fileName} onFileChange={handleResumeFile} onAction={showUnavailable} feedback={feedback} />}
      {section === "cover-letters" && <CoverLetters letter={letter} setLetter={setLetter} onAction={showUnavailable} feedback={feedback} />}
      {section === "communications" && <Communications onAction={showUnavailable} feedback={feedback} />}
      {section === "interviews" && <Interviews onAction={showUnavailable} feedback={feedback} />}
      {section === "analytics" && <Analytics />}
      {section === "career-insights" && <CareerInsights />}
      {section === "agent-activity" && <AgentActivity />}
      {section === "integrations" && <Integrations onAction={showUnavailable} feedback={feedback} />}
      {section === "security" && <Security />}
      {section === "usage" && <Usage />}
      {section === "settings" && <Settings preferences={preferences} setPreferences={setPreferences} />}
      {section === "onboarding" && <Onboarding step={step} setStep={setStep} onFileChange={handleResumeFile} fileName={fileName} preferences={preferences} setPreferences={setPreferences} onAction={showUnavailable} feedback={feedback} />}
    </div>
  );
}

function MissionControl() {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sampleAgents.map((agent, index) => (
          <article key={agent.name} className="rounded-md border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-md bg-elevated"><Sparkles className="size-4 text-primary" /></div><div><h2 className="text-sm font-medium">{agent.name} Agent</h2><p className="mt-1 text-[11px] text-muted-foreground">Operational state</p></div></div>
              <Badge variant="outline" className="border-border text-muted-foreground">Unknown</Badge>
            </div>
            <p className="mt-4 min-h-8 text-xs leading-relaxed text-muted-foreground">{agent.task}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[10px] text-muted-foreground">
              <span>Queue <b className="ml-1 font-mono text-foreground">—</b></span><span>Done <b className="ml-1 font-mono text-foreground">—</b></span><span>Errors <b className="ml-1 font-mono text-foreground">—</b></span>
            </div>
            {index === 0 && <p className="mt-3 border-t border-border pt-3 text-[10px] text-warning">Heartbeat and resource use unavailable</p>}
          </article>
        ))}
      </div>
      <div className="rounded-md border border-border bg-card p-4 text-xs text-muted-foreground">Agent start, pause, restart, and configuration controls are unavailable until the API can authorize and confirm the requested action.</div>
    </>
  );
}

function SourceExplorer({ view, setView }: { view: string; setView: (value: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-card p-4">
        <div><h2 className="text-sm font-semibold">Career source network</h2><p className="mt-1 text-xs text-muted-foreground">Example domains are unverified and not being monitored.</p></div>
        <ViewToggle value={view} onChange={setView} options={["network", "table", "cards"]} />
      </div>
      {view === "network" ? (
        <div className="rounded-md border border-border bg-card p-5">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> Sample source</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning" /> Awaiting verification</span><span className="flex items-center gap-1.5"><LockKeyhole className="size-3" /> Submission not authorized</span></div>
          <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
            <NetworkNode name="CareerPilot workspace" kind="Sample profile" tone="primary" />
            <ArrowRight className="mx-auto hidden size-4 text-muted-foreground md:block" />
            <div className="grid gap-3">
              {sampleSources.slice(0, 2).map((source) => <NetworkNode key={source.domain} name={source.name} kind={source.kind} tone="warning" />)}
            </div>
            <ArrowRight className="mx-auto hidden size-4 text-muted-foreground md:block" />
            <div className="grid gap-3">
              {sampleSources.slice(2).map((source) => <NetworkNode key={source.domain} name={source.domain} kind="Example domain" tone="muted" />)}
            </div>
          </div>
          <div className="mt-5 grid gap-2 border-t border-border pt-4 sm:grid-cols-3">
            <Permission label="Discovery" granted={false} /> <Permission label="Monitoring" granted={false} /> <Permission label="Application submission" granted={false} />
          </div>
        </div>
      ) : view === "table" ? <SourcesTable /> : <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{sampleSources.map((source) => <SourceCard key={source.domain} source={source} />)}</div>}
    </div>
  );
}

function NetworkNode({ name, kind, tone }: { name: string; kind: string; tone: string }) {
  return <div className={`rounded-md border p-4 ${tone === "primary" ? "border-primary/40 bg-primary/5" : tone === "warning" ? "border-warning/40 bg-warning/5" : "border-border bg-elevated"}`}><div className="flex items-center gap-2"><Network className={`size-4 ${tone === "primary" ? "text-primary" : tone === "warning" ? "text-warning" : "text-muted-foreground"}`} /><p className="truncate text-xs font-medium">{name}</p></div><p className="mt-2 text-[10px] text-muted-foreground">{kind}</p></div>;
}

function Permission({ label, granted }: { label: string; granted: boolean }) {
  return <div className="flex items-center justify-between rounded-md border border-border px-3 py-2"><span className="text-xs">{label}</span><span className={`text-[10px] ${granted ? "text-primary" : "text-warning"}`}>{granted ? "Authorized" : "Not authorized"}</span></div>;
}

function SourcesTable() {
  return <div className="overflow-x-auto rounded-md border border-border bg-card"><table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-border text-[10px] uppercase tracking-wide text-muted-foreground"><tr>{["Source", "Type", "Jobs found", "Verification", "Permission"].map((heading) => <th key={heading} className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-border">{sampleSources.map((source) => <tr key={source.domain}><td className="px-4 py-3"><p className="font-medium">{source.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{source.domain}</p></td><td className="px-4 py-3 text-muted-foreground">{source.kind}</td><td className="px-4 py-3 font-mono">{source.found}</td><td className="px-4 py-3 text-warning">{source.health}</td><td className="px-4 py-3 text-muted-foreground">None granted</td></tr>)}</tbody></table></div>;
}

function SourceCard({ source }: { source: (typeof sampleSources)[number] }) {
  return <article className="rounded-md border border-border bg-card p-4"><div className="flex items-center justify-between gap-3"><h2 className="text-sm font-medium">{source.name}</h2><Badge variant="outline" className="border-warning/30 text-warning">Unverified</Badge></div><p className="mt-2 truncate font-mono text-[11px] text-muted-foreground">{source.domain}</p><div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-3 text-[10px]"><span className="text-muted-foreground">Category <b className="block pt-1 font-normal text-foreground">{source.kind}</b></span><span className="text-muted-foreground">Sample jobs <b className="block pt-1 font-mono text-foreground">{source.found}</b></span><span className="text-muted-foreground">Last checked <b className="block pt-1 font-normal text-foreground">Not available</b></span><span className="text-muted-foreground">Permissions <b className="block pt-1 font-normal text-warning">None</b></span></div></article>;
}

function JobDiscovery({ jobs, search, setSearch, view, setView }: { jobs: typeof sampleJobs; search: string; setSearch: (value: string) => void; view: string; setView: (value: string) => void }) {
  return <div className="space-y-4">
    <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-card p-3">
      <div className="relative min-w-[220px] flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Search jobs" className="pl-9" placeholder="Search role, company, or location" value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      <Button variant="outline" size="sm" onClick={() => setSearch("")}><Filter /> Clear filters</Button>
      <ViewToggle value={view} onChange={setView} options={["list", "cards"]} />
    </div>
    <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{jobs.length} sample opportunities</span><span>Match score shows skills alignment, not hiring probability.</span></div>
    <div className={view === "cards" ? "grid gap-3 md:grid-cols-2" : "space-y-2"}>
      {jobs.map((job) => <article key={job.company} className="rounded-md border border-border bg-card p-4">
        <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-elevated text-sm font-semibold text-primary">{job.company.slice(0, 1)}</div><div className="min-w-0"><h2 className="text-sm font-semibold">{job.title}</h2><p className="mt-1 text-xs text-muted-foreground">{job.company} · {job.location}</p></div></div><div className="flex items-center gap-2"><Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{job.score}% skills match</Badge><Button variant="ghost" size="icon" aria-label={`Open details for ${job.title}`} onClick={() => {}}><ArrowUpRight /></Button></div></div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3 text-[10px] text-muted-foreground"><span>{job.type}</span><span>{job.salary}</span><span>{job.posted}</span><span>{job.eligibility}</span><span>Source: {job.source}</span></div>
      </article>)}
      {jobs.length === 0 && <div className="rounded-md border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No sample jobs match that search.</div>}
    </div>
  </div>;
}

function Applications({ view, setView }: { view: string; setView: (value: string) => void }) {
  const states = ["Discovered", "In review", "Manual action", "Ready to review"];
  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border bg-card p-3"><div className="flex gap-2"><Button variant="outline" size="sm"><Filter /> Filters</Button><Button variant="outline" size="sm">All sample records <ChevronDown /></Button></div><ViewToggle value={view} onChange={setView} options={["board", "table", "timeline"]} /></div>
    {view === "board" ? <div className="grid gap-3 lg:grid-cols-4">{states.map((state) => <div key={state} className="min-h-56 rounded-md border border-border bg-background/50 p-3"><div className="mb-3 flex items-center justify-between"><h2 className="text-xs font-semibold">{state}</h2><span className="font-mono text-[10px] text-muted-foreground">{sampleApplications.filter((app) => app.status.toLowerCase().includes(state.toLowerCase().split(" ")[0] ?? "")).length}</span></div><div className="space-y-2">{sampleApplications.filter((app) => app.status.toLowerCase().includes(state.toLowerCase().split(" ")[0] ?? "")).map((app) => <ApplicationCard key={app.company} app={app} />)}</div></div>)}</div> : view === "table" ? <div className="overflow-x-auto rounded-md border border-border bg-card"><table className="w-full min-w-[700px] text-left text-xs"><thead className="border-b border-border text-[10px] uppercase text-muted-foreground"><tr>{["Company / role", "State", "Match", "Updated"].map((heading) => <th key={heading} className="px-4 py-3 font-medium">{heading}</th>)}</tr></thead><tbody className="divide-y divide-border">{sampleApplications.map((app) => <tr key={app.company}><td className="px-4 py-3"><p className="font-medium">{app.company}</p><p className="mt-1 text-[10px] text-muted-foreground">{app.role}</p></td><td className="px-4 py-3 text-warning">{app.status}</td><td className="px-4 py-3 font-mono">{app.score}%</td><td className="px-4 py-3 text-muted-foreground">{app.updated}</td></tr>)}</tbody></table></div> : <div className="space-y-3 border-l border-border pl-5">{sampleApplications.map((app) => <div key={app.company} className="relative rounded-md border border-border bg-card p-4"><span className="absolute -left-[25px] top-5 size-2 rounded-full bg-primary" /><ApplicationCard app={app} /></div>)}</div>}
    <p className="text-[11px] text-muted-foreground">Every row is illustrative. Submission status and confirmation evidence require the connected service.</p>
  </div>;
}

function ApplicationCard({ app }: { app: (typeof sampleApplications)[number] }) {
  return <div className="rounded-md border border-border bg-card p-3"><div className="flex items-start justify-between gap-2"><p className="text-xs font-medium">{app.company}</p><span className="font-mono text-[10px] text-primary">{app.score}%</span></div><p className="mt-1 text-[11px] text-muted-foreground">{app.role}</p><div className="mt-3 flex items-center justify-between gap-2 text-[10px]"><Badge variant="outline" className="border-warning/30 text-warning">{app.status}</Badge><span className="text-muted-foreground">{app.updated}</span></div></div>;
}

function ManualActions({ onAction, feedback }: { onAction: (action: string) => void; feedback: string }) {
  return <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]"><div className="space-y-3">{sampleActions.map((action) => <article key={action.company} className="rounded-md border border-border bg-card p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex items-center gap-2"><h2 className="text-sm font-semibold">{action.company}</h2><Badge variant="outline" className="border-warning/30 text-warning">{action.priority}</Badge></div><p className="mt-1 text-xs text-muted-foreground">{action.role}</p></div><span className="flex items-center gap-1 text-[10px] text-warning"><Clock3 className="size-3" />{action.deadline}</span></div><p className="mt-4 text-xs leading-relaxed">{action.reason}</p><div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3"><Button variant="outline" size="sm" onClick={() => onAction("Opening the application link")}><ExternalLink /> Open original</Button><Button variant="outline" size="sm" onClick={() => onAction("Downloading the sample resume")}><Download /> Resume</Button><Button variant="ghost" size="sm" onClick={() => onAction("Marking as manually applied")}><Check /> Mark manually applied</Button></div></article>)}</div><aside className="h-fit rounded-md border border-border bg-card p-4"><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /><h2 className="text-sm font-semibold">Your control stays yours</h2></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Login, CAPTCHA, OTP, consent, and legal declarations must be completed by you. This preview never bypasses access restrictions.</p><div role="status" className="mt-4 text-xs text-warning">{feedback || "No manual action has been sent or completed."}</div></aside></div>;
}

function ResumeStudio({ fileName, onFileChange, onAction, feedback }: { fileName: string; onFileChange: (event: ChangeEvent<HTMLInputElement>) => void; onAction: (action: string) => void; feedback: string }) {
  return <div className="space-y-4"><div className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"><section className="rounded-md border border-border bg-card p-5"><div className="flex items-center gap-2"><FileText className="size-4 text-primary" /><h2 className="text-sm font-semibold">Master resume</h2></div><p className="mt-1 text-xs text-muted-foreground">Your original stays separate from job-specific drafts.</p><label className="mt-5 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-background/50 px-4 text-center"><Upload className="size-5 text-primary" /><span className="mt-3 text-xs font-medium">Choose a PDF or DOCX</span><span className="mt-1 text-[10px] text-muted-foreground">File selection stays in this browser preview</span><input type="file" accept=".pdf,.docx,application/pdf" className="sr-only" onChange={onFileChange} /></label><p role="status" className="mt-3 min-h-5 text-xs text-muted-foreground">{fileName || "No document selected."}</p><Button variant="outline" className="mt-2 w-full" onClick={() => onAction("Parsing the master resume")}><WandSparkles /> Extract verified profile</Button></section><section className="rounded-md border border-border bg-card p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="text-sm font-semibold">Job-specific draft</h2><p className="mt-1 text-xs text-muted-foreground">Northstar Labs · Senior Product Designer · sample</p></div><Badge variant="outline" className="border-warning/30 text-warning">Not generated</Badge></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><ResumeFact title="Relevant skills" text="No verified profile connected" /><ResumeFact title="Experience evidence" text="Requires source resume review" /><ResumeFact title="Change explanation" text="Not available" /><ResumeFact title="ATS validation" text="Not run" /></div><div className="mt-4 rounded-md border border-border bg-background/50 p-4 text-xs leading-relaxed text-muted-foreground">A tailored resume is not available yet. Unsupported skills, dates, and achievements will not be invented.</div><div className="mt-4 flex flex-wrap gap-2"><Button onClick={() => onAction("Generating a job-specific resume")}><WandSparkles /> Generate draft</Button><Button variant="outline" onClick={() => onAction("Downloading the sample resume")}><Download /> Download</Button></div><p role="status" className="mt-3 text-xs text-warning">{feedback || "No document has been generated or uploaded."}</p></section></div><div className="rounded-md border border-border bg-card p-4"><h2 className="text-sm font-semibold">Document history</h2><p className="mt-1 text-xs text-muted-foreground">No verified resume versions are available in this preview.</p></div></div>;
}

function ResumeFact({ title, text }: { title: string; text: string }) { return <div className="rounded-md border border-border p-3"><p className="text-[10px] text-muted-foreground">{title}</p><p className="mt-2 text-xs">{text}</p></div>; }

function CoverLetters({ letter, setLetter, onAction, feedback }: { letter: string; setLetter: (value: string) => void; onAction: (action: string) => void; feedback: string }) {
  return <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]"><section className="rounded-md border border-border bg-card p-4 sm:p-5"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4"><div><h2 className="text-sm font-semibold">Draft editor</h2><p className="mt-1 text-xs text-muted-foreground">Example text · verify every personal claim before use.</p></div><Button variant="outline" size="sm" onClick={() => onAction("Saving this cover letter")}><FileCheck2 /> Save draft</Button></div><Textarea className="mt-4 min-h-[360px] resize-y border-0 bg-transparent p-0 text-sm leading-7 shadow-none focus-visible:ring-0" aria-label="Cover letter draft" value={letter} onChange={(event) => setLetter(event.target.value)} /><div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4"><Button onClick={() => onAction("Generating a cover letter")}><Sparkles /> Generate from verified profile</Button><Button variant="outline" onClick={() => onAction("Downloading the cover letter")}><Download /> Download</Button></div><p role="status" className="mt-3 text-xs text-warning">{feedback || "This draft has not been saved to a service."}</p></section><aside className="h-fit rounded-md border border-border bg-card p-4"><h2 className="text-sm font-semibold">Draft context</h2><div className="mt-4 space-y-3 text-xs"><ContextRow label="Target role" value="Senior Product Designer" /><ContextRow label="Company" value="Northstar Labs" /><ContextRow label="Evidence source" value="Not connected" /><ContextRow label="Claim verification" value="Review required" /></div><div className="mt-4 rounded-md bg-elevated p-3 text-[11px] leading-relaxed text-muted-foreground">Before using this text, confirm that every statement accurately reflects your experience.</div></aside></div>;
}

function ContextRow({ label, value }: { label: string; value: string }) { return <div className="flex items-start justify-between gap-3"><span className="text-muted-foreground">{label}</span><span className="text-right">{value}</span></div>; }

function Communications({ onAction, feedback }: { onAction: (action: string) => void; feedback: string }) {
  return <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]"><aside className="rounded-md border border-border bg-card p-4"><div className="flex items-center gap-2"><Mail className="size-4 text-primary" /><h2 className="text-sm font-semibold">Email connection</h2></div><p className="mt-3 text-xs text-muted-foreground">No email provider is connected.</p><Button className="mt-4 w-full" variant="outline" onClick={() => onAction("Connecting email")}><Mail /> Connect email</Button><p role="status" className="mt-3 text-[11px] text-warning">{feedback || "Delivery status is not available."}</p></aside><section className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><h2 className="text-sm font-semibold">Recruitment inbox</h2><p className="mt-1 text-xs text-muted-foreground">No messages loaded.</p></div><div className="flex min-h-52 flex-col items-center justify-center px-4 text-center"><Mail className="size-6 text-muted-foreground" /><p className="mt-3 text-sm font-medium">Connect an authorized email account</p><p className="mt-1 max-w-sm text-xs text-muted-foreground">Messages and delivery confirmations will appear after a verified provider connection.</p></div></section></div>;
}

function Interviews({ onAction, feedback }: { onAction: (action: string) => void; feedback: string }) {
  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><div className="flex items-center gap-2"><CalendarDays className="size-4 text-primary" /><h2 className="text-sm font-semibold">Interview schedule</h2></div><p className="mt-1 text-xs text-muted-foreground">No confirmed interviews are available.</p></div><div className="flex min-h-56 flex-col items-center justify-center px-5 text-center"><CalendarDays className="size-7 text-muted-foreground" /><p className="mt-3 text-sm font-medium">Your interview calendar is clear</p><p className="mt-1 max-w-sm text-xs text-muted-foreground">Confirmed invitations will appear here when the communication service is connected.</p></div></section><aside className="rounded-md border border-border bg-card p-4"><h2 className="text-sm font-semibold">Practice session</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Prepare answers using facts you have verified in your profile.</p><Button className="mt-4 w-full" variant="outline" onClick={() => onAction("Starting interview practice")}><Play /> Start practice</Button><p role="status" className="mt-3 text-xs text-warning">{feedback || "Practice history is not stored in this preview."}</p></aside></div>;
}

function Analytics() {
  return <div className="space-y-4"><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["Jobs discovered", "—"], ["Applications submitted", "—"], ["Interview conversion", "—"], ["Cost per application", "—"]].map(([label, value]) => <div key={label} className="rounded-md border border-border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-4 font-mono text-2xl font-semibold">{value}</p><p className="mt-1 text-[10px] text-muted-foreground">No connected data</p></div>)}</div><div className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><h2 className="text-sm font-semibold">Activity trend</h2><p className="mt-1 text-xs text-muted-foreground">Illustrative values only · not user performance</p></div><div className="h-[280px] p-4"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 5" /><XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} /><Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--foreground)" }} /><Area dataKey="jobs" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.12} /><Area dataKey="apps" stroke="var(--secondary)" fill="none" /></AreaChart></ResponsiveContainer></div></div><p className="text-xs text-muted-foreground">No conversion rates or causal conclusions are calculated without verified records.</p></div>;
}

function CareerInsights() {
  return <div className="grid gap-3 lg:grid-cols-2">{[{ title: "Map your strengths", body: "Verified profile details can help identify recurring strengths across roles you review.", icon: Sparkles }, { title: "Spot skill gaps", body: "A connected job set can highlight skills to investigate—not guarantees of employer demand.", icon: SlidersHorizontal }, { title: "Compare sources", body: "Source reliability requires enough verified outcomes before a useful comparison is possible.", icon: Network }, { title: "Review patterns carefully", body: "A small number of applications is not enough to establish why a result occurred.", icon: CircleHelp }].map((insight) => <article key={insight.title} className="rounded-md border border-border bg-card p-5"><div className="flex size-9 items-center justify-center rounded-md bg-elevated"><insight.icon className="size-4 text-primary" /></div><h2 className="mt-4 text-sm font-semibold">{insight.title}</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{insight.body}</p><Badge variant="outline" className="mt-4 border-border text-muted-foreground">Needs verified data</Badge></article>)}</div>;
}

function AgentActivity() {
  return <div className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><h2 className="text-sm font-semibold">Activity log</h2><p className="mt-1 text-xs text-muted-foreground">No live event stream is connected.</p></div><div className="divide-y divide-border">{sampleAgents.slice(0, 5).map((agent) => <div key={agent.name} className="flex items-center gap-3 px-4 py-3"><span className="flex size-8 items-center justify-center rounded-md bg-elevated"><Activity className="size-4 text-muted-foreground" /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium">{agent.name} Agent</p><p className="mt-1 text-[11px] text-muted-foreground">No event data received</p></div><span className="text-[10px] text-muted-foreground">Unknown</span></div>)}</div></div>;
}

function Integrations({ onAction, feedback }: { onAction: (action: string) => void; feedback: string }) {
  const integrations = [{ name: "CareerPilot API", purpose: "Jobs, sources, agents, applications", icon: BriefcaseBusiness }, { name: "Email provider", purpose: "Recruiter messages and notices", icon: Mail }, { name: "Document storage", purpose: "Resume and cover letter files", icon: FileText }, { name: "Live event stream", purpose: "Agent and application updates", icon: Activity }];
  return <div className="space-y-3"><div className="grid gap-3 md:grid-cols-2">{integrations.map((integration) => <article key={integration.name} className="rounded-md border border-border bg-card p-4"><div className="flex items-start gap-3"><div className="flex size-9 items-center justify-center rounded-md bg-elevated"><integration.icon className="size-4 text-primary" /></div><div className="min-w-0 flex-1"><h2 className="text-sm font-semibold">{integration.name}</h2><p className="mt-1 text-xs text-muted-foreground">{integration.purpose}</p></div><Badge variant="outline" className="border-warning/30 text-warning">Not connected</Badge></div><Button className="mt-4" variant="outline" size="sm" onClick={() => onAction(`Connecting ${integration.name}`)}>Connection details <ArrowRight /></Button></article>)}</div><p role="status" className="text-xs text-warning">{feedback || "No credentials or connection settings have been entered."}</p></div>;
}

function Security() {
  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><h2 className="text-sm font-semibold">Authorization boundaries</h2><p className="mt-1 text-xs text-muted-foreground">Safety rules applied in this disconnected preview.</p></div><div className="divide-y divide-border">{[{ title: "User approval before submission", text: "Automatic submission is disabled until the user explicitly authorizes it." }, { title: "Platform permission", text: "A discovered site is never treated as an approved submission destination." }, { title: "Restricted steps", text: "CAPTCHA, OTP, login, consent, and legal declarations remain with the user." }, { title: "Verified outcomes", text: "Unknown submission outcomes are never presented as confirmed success." }].map((item) => <div key={item.title} className="flex items-start gap-3 p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /><div><h3 className="text-xs font-medium">{item.title}</h3><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p></div></div>)}</div></section><aside className="h-fit rounded-md border border-border bg-card p-4"><div className="flex items-center gap-2"><LockKeyhole className="size-4 text-primary" /><h2 className="text-sm font-semibold">Connection status</h2></div><p className="mt-3 text-xs text-muted-foreground">No account, session, or backend credentials are configured.</p><Badge variant="outline" className="mt-3 border-warning/30 text-warning">Not connected</Badge></aside></div>;
}

function Usage() {
  return <div className="grid gap-4 lg:grid-cols-2"><div className="rounded-md border border-border bg-card p-5"><h2 className="text-sm font-semibold">Usage reporting</h2><p className="mt-2 text-xs text-muted-foreground">No API calls or cost records are available in this preview.</p><div className="mt-5 grid grid-cols-2 gap-3">{["Requests", "Storage", "Worker time", "Monthly cost"].map((label) => <div key={label} className="rounded-md border border-border p-3"><p className="text-[10px] text-muted-foreground">{label}</p><p className="mt-2 font-mono text-lg">—</p></div>)}</div></div><div className="rounded-md border border-border bg-card p-5"><h2 className="text-sm font-semibold">Budget controls</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Budget limits can be configured after verified usage endpoints are available. No spending or limits are being reported here.</p><div className="mt-4 flex items-start gap-2 rounded-md bg-elevated p-3 text-xs text-muted-foreground"><CircleHelp className="size-4 shrink-0" /> No cost is calculated from illustrative data.</div></div></div>;
}

function Settings({ preferences, setPreferences }: { preferences: { resume: boolean; email: boolean; submit: boolean }; setPreferences: (value: { resume: boolean; email: boolean; submit: boolean }) => void }) {
  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]"><section className="rounded-md border border-border bg-card"><div className="border-b border-border p-4"><h2 className="text-sm font-semibold">Automation preferences</h2><p className="mt-1 text-xs text-muted-foreground">Preview-only toggles; changes are not sent to a service.</p></div><div className="divide-y divide-border">{[{ key: "resume", title: "Prepare document drafts", text: "Keep preparation separate from submission authorization." }, { key: "email", title: "Send manual-action notices", text: "Requires a connected and authorized email provider." }, { key: "submit", title: "Authorize automatic submission", text: "Requires explicit authorization and confirmed platform permission." }].map((item) => <label key={item.key} className="flex cursor-pointer items-start gap-4 p-4"><input type="checkbox" className="mt-0.5 accent-primary" checked={preferences[item.key as keyof typeof preferences]} onChange={(event) => setPreferences({ ...preferences, [item.key]: event.target.checked })} /><span className="flex-1"><span className="block text-xs font-medium">{item.title}</span><span className="mt-1 block text-[11px] text-muted-foreground">{item.text}</span></span><span className="text-[10px] text-muted-foreground">Local only</span></label>)}</div></section><aside className="h-fit rounded-md border border-warning/30 bg-warning/5 p-4"><div className="flex items-center gap-2 text-warning"><ShieldCheck className="size-4" /><h2 className="text-sm font-semibold">Submission remains off</h2></div><p className="mt-3 text-xs leading-relaxed text-muted-foreground">A local preference cannot authorize a real application. Submission requires the API, explicit user permission, and the destination’s allowed access.</p></aside></div>;
}

function Onboarding({ step, setStep, onFileChange, fileName, preferences, setPreferences, onAction, feedback }: { step: number; setStep: (step: number) => void; onFileChange: (event: ChangeEvent<HTMLInputElement>) => void; fileName: string; preferences: { resume: boolean; email: boolean; submit: boolean }; setPreferences: (value: { resume: boolean; email: boolean; submit: boolean }) => void; onAction: (action: string) => void; feedback: string }) {
  const steps = ["Profile", "Resume", "Preferences", "Authorization", "Review"];
  return <div className="mx-auto max-w-3xl rounded-md border border-border bg-card p-5 sm:p-7"><div className="mb-6 flex flex-wrap gap-2">{steps.map((label, index) => <button key={label} className={`rounded-md border px-3 py-2 text-xs ${step === index ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"}`} onClick={() => setStep(index)}>{index + 1}. {label}</button>)}</div><h2 className="text-lg font-semibold">{steps[step] ?? "Profile"}</h2><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step === 0 ? "Account creation requires the connected authentication service." : step === 1 ? "Select a resume for local preview. It will not be uploaded." : step === 2 ? "Career preferences can be added after your profile is verified." : step === 3 ? "Automatic application submission stays disabled until you explicitly authorize it." : "Review setup status before connecting a service."}</p><div className="mt-5">{step === 1 ? <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border p-8 text-center"><Upload className="size-5 text-primary" /><span className="mt-2 text-xs">Choose PDF or DOCX</span><input className="sr-only" type="file" accept=".pdf,.docx,application/pdf" onChange={onFileChange} /></label> : step === 3 ? <div className="space-y-3"><label className="flex items-center gap-3 rounded-md border border-border p-3 text-xs"><input type="checkbox" className="accent-primary" checked={preferences.submit} onChange={(event) => setPreferences({ ...preferences, submit: event.target.checked })} /> I explicitly authorize automatic application submission</label><p className="text-[11px] text-warning">A local check is not sent to or accepted by any service.</p></div> : <div className="rounded-md border border-border bg-background/50 p-4 text-xs text-muted-foreground">{step === 4 ? "Backend: not connected · Resume: " + (fileName || "not selected") + " · Submission: " + (preferences.submit ? "local preference only" : "off") : "Backend connection required to save or verify this step."}</div>}</div><div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4"><Button variant="outline" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</Button><div className="flex items-center gap-2"><span role="status" className="text-[10px] text-warning">{feedback}</span>{step < steps.length - 1 ? <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Continue <ArrowRight /></Button> : <Button variant="outline" onClick={() => onAction("Activating discovery")}><Play /> Activate discovery</Button>}</div></div></div>;
}

function ViewToggle({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: string[] }) {
  return <div className="flex items-center rounded-md border border-border p-0.5">{options.map((option) => <Button key={option} variant={value === option ? "secondary" : "ghost"} size="sm" className="h-8 px-2.5 text-[10px] capitalize" onClick={() => onChange(option)} aria-pressed={value === option}>{option === "cards" || option === "board" || option === "network" ? <LayoutGrid /> : option === "timeline" ? <Clock3 /> : <List />}{option}</Button>)}</div>;
}