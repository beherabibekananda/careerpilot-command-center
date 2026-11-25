import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CircleCheck,
  Clock3,
  FileText,
  Hand,
  Link2,
  Network,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UsersRound,
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
import { Switch } from "@/components/ui/switch";
import { sampleActivity, sampleMetrics } from "@/lib/careerpilot-data";

const trendData = [
  { day: "Mon", discovered: 26, matches: 8 },
  { day: "Tue", discovered: 34, matches: 13 },
  { day: "Wed", discovered: 29, matches: 10 },
  { day: "Thu", discovered: 42, matches: 17 },
  { day: "Fri", discovered: 37, matches: 14 },
  { day: "Sat", discovered: 48, matches: 19 },
  { day: "Sun", discovered: 32, matches: 12 },
];

const metricIcons = [BriefcaseBusiness, Sparkles, FileText, Hand];

export function DashboardPage() {
  const [url, setUrl] = useState("");
  const [monitor, setMonitor] = useState(false);
  const [feedback, setFeedback] = useState("");

  function handleDiscover(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback("");
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        setFeedback("Use an http or https address.");
        return;
      }
      setFeedback("Address looks valid. No website was contacted because the CareerPilot backend is not connected.");
    } catch {
      setFeedback("Enter a complete website address, such as https://careers.example.com/jobs");
    }
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">COMMAND CENTRE</Badge>
            <Badge variant="outline" className="border-warning/30 bg-warning/10 text-warning">SAMPLE WORKSPACE</Badge>
          </div>
          <h1 className="max-w-3xl text-2xl font-semibold leading-tight sm:text-3xl">Your career is moving forward, even while you&apos;re away.</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Your career command centre is ready to connect. This preview uses illustrative records—not live jobs, agent activity, or application results.</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-warning/30 bg-warning/10 px-3 py-2 text-xs text-warning">
          <span className="size-2 rounded-full bg-warning" /> Backend not connected
        </div>
      </div>

      <section aria-label="Sample metrics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {sampleMetrics.map((metric, index) => {
          const Icon = metricIcons[index] ?? Activity;
          return (
            <div key={metric.label} className="rounded-md border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">{metric.label}</span>
                <Icon className="size-4 text-muted-foreground" />
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="font-mono text-2xl font-semibold tabular-nums">{metric.value}</span>
                <span className="text-[11px] text-muted-foreground">{metric.change}</span>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.9fr)]">
        <div className="rounded-md border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-sm font-semibold">Discovery activity</h2>
              <p className="mt-1 text-xs text-muted-foreground">Illustrative weekly trend · not live data</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> Jobs found</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-secondary" /> Strong matches</span>
            </div>
          </div>
          <div className="h-[245px] px-2 pb-3 pt-4 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: -18, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="jobsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} strokeDasharray="3 5" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, color: "var(--foreground)" }} />
                <Area type="monotone" dataKey="discovered" stroke="var(--primary)" strokeWidth={2} fill="url(#jobsFill)" />
                <Area type="monotone" dataKey="matches" stroke="var(--secondary)" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-4 sm:px-5">
            <div className="flex items-center gap-2">
              <Network className="size-4 text-primary" />
              <h2 className="text-sm font-semibold">Add a career source</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Validate an address before sending it to a connected service.</p>
          </div>
          <form className="space-y-3 p-4 sm:p-5" onSubmit={handleDiscover}>
            <label className="text-xs font-medium" htmlFor="source-url">Website or job listing</label>
            <div className="flex gap-2">
              <Input id="source-url" type="url" inputMode="url" placeholder="https://careers.company.com/jobs" value={url} onChange={(event) => setUrl(event.target.value)} aria-describedby="source-feedback" />
              <Button type="submit" size="icon" aria-label="Validate website address"><Search /></Button>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5">
              <div>
                <p className="text-xs font-medium">Monitor continuously</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">Preference only in this preview</p>
              </div>
              <Switch checked={monitor} onCheckedChange={setMonitor} aria-label="Monitor continuously in preview" />
            </div>
            <p id="source-feedback" role="status" className={`min-h-5 text-xs ${feedback.startsWith("Address looks") ? "text-warning" : "text-muted-foreground"}`}>
              {feedback || "No site is contacted in this disconnected preview."}
            </p>
          </form>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.8fr)]">
        <div className="rounded-md border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-sm font-semibold">Recent activity</h2>
              <p className="mt-1 text-xs text-muted-foreground">Sample events for layout preview</p>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild><Link to="/agent-activity">View activity <ArrowRight /></Link></Button>
          </div>
          <div className="divide-y divide-border">
            {sampleActivity.map((item) => (
              <div key={item.title} className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
                <ActivityIcon kind={item.kind} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{item.title}</p>
                  <p className="mt-1 truncate text-[11px] text-muted-foreground">{item.detail}</p>
                </div>
                <span className="whitespace-nowrap text-[10px] text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-4 sm:px-5">
            <h2 className="text-sm font-semibold">Workspace readiness</h2>
            <p className="mt-1 text-xs text-muted-foreground">Connect services before enabling automation.</p>
          </div>
          <div className="space-y-1 p-3">
            <ReadinessRow icon={Link2} label="CareerPilot API" status="Not connected" tone="warning" />
            <ReadinessRow icon={FileText} label="Verified master resume" status="Not added" tone="muted" />
            <ReadinessRow icon={ShieldAlert} label="Application authorization" status="Not granted" tone="muted" />
            <ReadinessRow icon={Clock3} label="Background workers" status="Not confirmed" tone="muted" />
          </div>
          <div className="mx-4 mb-4 flex items-start gap-2 rounded-md bg-elevated p-3 text-[11px] leading-relaxed text-muted-foreground sm:mx-5">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" />
            Automatic application submission remains unavailable until you authorize it and the service confirms permission.
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><CircleCheck className="size-3.5 text-primary" /> Sample data is labeled</span>
        <span className="flex items-center gap-1.5"><ShieldAlert className="size-3.5 text-warning" /> No application was submitted</span>
        <span className="flex items-center gap-1.5"><UsersRound className="size-3.5" /> No agents are confirmed active</span>
      </div>
    </div>
  );
}

function ActivityIcon({ kind }: { kind: string }) {
  const Icon = kind === "source" ? Network : kind === "job" ? BriefcaseBusiness : kind === "manual" ? Hand : FileText;
  return <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-elevated text-muted-foreground"><Icon className="size-4" /></div>;
}

function ReadinessRow({ icon: Icon, label, status, tone }: { icon: typeof Link2; label: string; status: string; tone: "warning" | "muted" }) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-2.5">
      <Icon className="size-4 text-muted-foreground" />
      <span className="flex-1 text-xs">{label}</span>
      <span className={`text-[10px] ${tone === "warning" ? "text-warning" : "text-muted-foreground"}`}>{status}</span>
    </div>
  );
}