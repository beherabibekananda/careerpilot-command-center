import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Command,
  FileText,
  Hand,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Menu,
  Moon,
  Network,
  Search,
  Settings2,
  ShieldCheck,
  Sun,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { navigationGroups } from "@/lib/careerpilot-data";

const iconMap = {
  overview: LayoutDashboard,
  agents: UsersRound,
  jobs: BriefcaseBusiness,
  sources: Network,
  applications: FileText,
  manual: Hand,
  resume: FileText,
  letters: FileText,
  communications: Mail,
  interviews: BriefcaseBusiness,
  analytics: Activity,
  insights: Lightbulb,
  activity: Activity,
  integrations: Zap,
  security: ShieldCheck,
  usage: Activity,
  settings: Settings2,
} as const;

type Props = { children: ReactNode };

export function CareerPilotShell({ children }: Props) {
  const location = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [commandOpen, setCommandOpen] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const current = useMemo(
    () => navigationGroups.flatMap((group) => group.items).find((item) => item.to === location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("careerpilot-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    window.localStorage.setItem("careerpilot-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredItems = navigationGroups
    .flatMap((group) => group.items)
    .filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {mobileNavOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-border bg-sidebar transition-transform duration-200 lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-[68px] items-center gap-3 border-b border-border px-5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">CareerPilot <span className="text-primary">AI</span></p>
            <p className="text-[10px] text-muted-foreground">CAREER COMMAND CENTRE</p>
          </div>
          <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation">
            <X />
          </Button>
        </div>
        <div className="px-4 pt-4">
          <div className="rounded-md border border-border bg-background/60 px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="size-2 rounded-full bg-warning" />
              Preview workspace
            </div>
            <p className="mt-1 pl-4 text-[11px] text-muted-foreground">Backend not connected</p>
          </div>
        </div>
        <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-5">
            {navigationGroups.map((group) => (
              <div key={group.label}>
                <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{group.label}</p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ArrowRight;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileNavOpen(false)}
                        activeOptions={{ exact: true }}
                        activeProps={{ className: "bg-elevated text-foreground" }}
                        inactiveProps={{ className: "text-muted-foreground hover:bg-elevated/70 hover:text-foreground" }}
                        className="flex h-9 items-center gap-2.5 rounded-md px-2 text-xs transition-colors"
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        {item.badge && <span className="rounded bg-warning/10 px-1.5 py-0.5 text-[10px] text-warning">{item.badge}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 rounded-md px-2 py-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-elevated text-xs font-semibold">BB</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">Workspace preview</p>
              <p className="truncate text-[11px] text-muted-foreground">Sample profile</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8" asChild aria-label="Open settings"><Link to="/settings"><Settings2 /></Link></Button>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[68px] items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6">
          <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation">
            <Menu />
          </Button>
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
            <span className="hidden text-muted-foreground sm:inline">Workspace</span>
            <span className="hidden text-border sm:inline">/</span>
            <span className="truncate font-medium">{current?.label ?? "Overview"}</span>
          </div>
          <Button variant="outline" className="hidden h-9 w-[240px] justify-start gap-2 text-muted-foreground md:flex" onClick={() => setCommandOpen(true)} aria-label="Open search and commands">
            <Search className="size-4" />
            <span className="flex-1 text-left text-xs">Search anything</span>
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
          </Button>
          <Button className="md:hidden" variant="ghost" size="icon" onClick={() => setCommandOpen(true)} aria-label="Search">
            <Search />
          </Button>
          <Badge variant="outline" className="hidden border-warning/30 bg-warning/10 text-warning sm:inline-flex">
            <span className="mr-1.5 size-1.5 rounded-full bg-warning" /> Offline
          </Badge>
          <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => setCommandOpen(true)}>
            <Bell />
          </Button>
          <Button variant="ghost" size="icon" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button variant="outline" className="hidden h-9 border-destructive/40 text-destructive hover:bg-destructive/10 sm:inline-flex" onClick={() => setStopOpen(true)}>
            <Zap className="size-4" /> Emergency stop
          </Button>
          <Button className="sm:hidden" variant="ghost" size="icon" onClick={() => setStopOpen(true)} aria-label="Emergency stop">
            <Zap className="text-destructive" />
          </Button>
        </header>
        <main className="mx-auto min-h-[calc(100vh-68px)] w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
        <DialogContent className="top-[18%] max-w-xl translate-y-0 p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Search CareerPilot</DialogTitle>
            <DialogDescription>Find a workspace page or command.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Command className="size-4 text-muted-foreground" />
            <Input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 border-0 px-0 shadow-none focus-visible:ring-0" placeholder="Search pages and commands…" />
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</kbd>
          </div>
          <div className="max-h-[360px] overflow-y-auto p-2">
            <p className="px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Pages</p>
            {filteredItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? ArrowRight;
              return (
                <Link key={item.to} to={item.to} onClick={() => setCommandOpen(false)} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-elevated hover:text-foreground">
                  <Icon className="size-4" /> {item.label}
                </Link>
              );
            })}
            {filteredItems.length === 0 && <p className="px-2 py-5 text-center text-sm text-muted-foreground">No matching pages.</p>}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={stopOpen} onOpenChange={setStopOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emergency stop unavailable</DialogTitle>
            <DialogDescription>
              No agent service is connected, so no stop request was sent. Connect the verified CareerPilot API before using this control.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-warning/30 bg-warning/10 p-3 text-sm text-warning">
            Current state: unknown. This screen has not stopped or changed any background work.
          </div>
          <Button variant="outline" onClick={() => setStopOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}