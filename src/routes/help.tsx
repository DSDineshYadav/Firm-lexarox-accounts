import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Inbox, MessageSquare, Send } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — LexaRox Accounts" },
      {
        name: "description",
        content: "Submit a query or track responses from your account manager.",
      },
    ],
  }),
  component: HelpSupportPage,
});

type QueryStatus = "Submitted" | "In Progress" | "Resolved";

type SupportQuery = {
  id: string;
  title: string;
  status: QueryStatus;
  category: string;
  snippet: string;
  submittedAt: string;
  updatedAt: string;
};

const supportCategories = [
  "Documents",
  "Service Requests",
  "Account Management",
  "Billing",
  "Technical Issue",
  "Other",
] as const;

const submittedQueries: SupportQuery[] = [
  {
    id: "HQ-2026-0089",
    title: "Cannot upload bank statement",
    status: "In Progress",
    category: "Documents",
    snippet: "Uploaded PDF keeps failing validation on page 3...",
    submittedAt: "2 Sep 2026",
    updatedAt: "3 Sep 2026",
  },
  {
    id: "HQ-2026-0085",
    title: "Annual accounts deadline query",
    status: "Resolved",
    category: "Service Requests",
    snippet: "Need confirmation on filing deadline for ABC Trading Ltd...",
    submittedAt: "28 Aug 2026",
    updatedAt: "29 Aug 2026",
  },
  {
    id: "HQ-2026-0091",
    title: "Add new staff member",
    status: "Submitted",
    category: "Account Management",
    snippet: "Please enable access for our new bookkeeper starting Monday...",
    submittedAt: "4 Sep 2026",
    updatedAt: "4 Sep 2026",
  },
];

const statusTone: Record<QueryStatus, "info" | "success" | "warning"> = {
  "In Progress": "info",
  Resolved: "success",
  Submitted: "warning",
};

function SupportCard({
  accent,
  icon,
  title,
  description,
  children,
  className,
}: {
  accent: "cyan" | "green";
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  const accentColor = accent === "cyan" ? "#3cadf1" : "#50b546";
  const iconBg = accent === "cyan" ? "bg-[#3cadf1]/15 text-[#3cadf1]" : "bg-[#50b546]/15 text-[#50b546]";

  return (
    <section className={cn("card-soft flex flex-col overflow-hidden rounded-xl border bg-card", className)}>
      <div className="h-1 shrink-0" style={{ backgroundColor: accentColor }} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start gap-3">
          <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg", iconBg)}>{icon}</span>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function QueryItem({ query }: { query: SupportQuery }) {
  return (
    <article className="rounded-xl border bg-muted/20 p-4 transition-colors hover:border-border/80">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{query.title}</p>
        <StatusBadge tone={statusTone[query.status]} className="shrink-0">
          {query.status}
        </StatusBadge>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">{query.id}</span>
        <StatusBadge tone="neutral" className="text-[10px]">
          {query.category}
        </StatusBadge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{query.snippet}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          Submitted {query.submittedAt}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Inbox className="h-3.5 w-3.5" />
          Updated {query.updatedAt}
        </span>
      </div>
    </article>
  );
}

function HelpSupportPage() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState(submittedQueries);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!subject.trim() || !category || !message.trim()) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const nextId = `HQ-2026-${String(92 + queries.length).padStart(4, "0")}`;
    const today = "4 Sep 2026";

    setQueries((prev) => [
      {
        id: nextId,
        title: subject.trim(),
        status: "Submitted",
        category,
        snippet: `${message.trim().slice(0, 60)}${message.trim().length > 60 ? "..." : ""}`,
        submittedAt: today,
        updatedAt: today,
      },
      ...prev,
    ]);

    setSubject("");
    setCategory("");
    setMessage("");
    toast.success(`Query submitted — reference ${nextId}`);
  };

  return (
    <AppShell>
      <PageHeader
        title="Help & Support"
        subtitle="Submit a query or track responses from your account manager."
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <SupportCard
          accent="cyan"
          icon={<MessageSquare className="h-5 w-5" />}
          title="Contact form"
          description="Send a message to LexaRox support or your account manager."
        >
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your query"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {supportCategories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Describe your question or issue in detail..."
                className="min-h-[140px] resize-none"
              />
            </div>

            <div className="mt-auto flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">Typical response within 4 business hours</p>
              <Button type="submit" className="gap-2 bg-[#3cadf1] font-semibold hover:bg-[#3cadf1]/90">
                <Send className="h-4 w-4" />
                Submit query
              </Button>
            </div>
          </form>
        </SupportCard>

        <SupportCard
          accent="green"
          icon={<Inbox className="h-5 w-5" />}
          title="Submitted queries"
          description="Track the status of your support requests."
          className="lg:max-h-[calc(100vh-12rem)]"
        >
          <ScrollArea className="h-[min(520px,calc(100vh-16rem))] pr-3">
            <div className="space-y-3">
              {queries.map((query) => (
                <QueryItem key={query.id} query={query} />
              ))}
            </div>
          </ScrollArea>
        </SupportCard>
      </div>
    </AppShell>
  );
}
