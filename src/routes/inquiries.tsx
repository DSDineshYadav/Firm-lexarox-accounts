import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { EmptyState, KpiCard, StatusBadge } from "@/components/kit";
import { FormDialog } from "@/components/form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clientInquiries,
  clientInquiryCategories,
  type ClientInquiry,
  type ClientInquiryPriority,
} from "@/lib/data";
import { toast } from "sonner";

export const Route = createFileRoute("/inquiries")({
  head: () => ({
    meta: [
      { title: "Inquiry Management — LexaRox Accounts" },
      {
        name: "description",
        content: "Manage client inquiries — document requests, service queries and account questions.",
      },
    ],
  }),
  component: InquiriesPage,
});

function priorityTone(priority: ClientInquiryPriority) {
  switch (priority) {
    case "Urgent":
    case "High":
      return "danger";
    case "Medium":
      return "warning";
    default:
      return "info";
  }
}

function inquiryStatusTone(status: ClientInquiry["status"]) {
  switch (status) {
    case "Resolved":
      return "success";
    case "In Progress":
      return "info";
    default:
      return "warning";
  }
}

function InquiriesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<ClientInquiry | null>(null);

  const openCount = clientInquiries.filter((i) => i.status !== "Resolved").length;
  const urgentCount = clientInquiries.filter((i) => i.priority === "Urgent").length;
  const inProgressCount = clientInquiries.filter((i) => i.status === "In Progress").length;
  const resolvedCount = clientInquiries.filter((i) => i.status === "Resolved").length;

  const rows = useMemo(
    () =>
      clientInquiries.filter((inquiry) => {
        const matchesCategory = category === "all" || inquiry.category === category;
        const matchesStatus = status === "all" || inquiry.status === status;
        const q = query.toLowerCase();
        const matchesQuery =
          !q ||
          inquiry.reference.toLowerCase().includes(q) ||
          inquiry.subject.toLowerCase().includes(q) ||
          inquiry.client.toLowerCase().includes(q) ||
          inquiry.contactName.toLowerCase().includes(q) ||
          inquiry.contactEmail.toLowerCase().includes(q);

        return matchesCategory && matchesStatus && matchesQuery;
      }),
    [category, query, status],
  );

  return (
    <AppShell>
      <PageHeader
        title="Inquiry Management"
        subtitle="Manage client inquiries — document requests, service queries and account questions."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Open Inquiries"
          value={String(openCount)}
          trend={`${urgentCount} urgent`}
          up={urgentCount === 0}
          support="Needs response"
          icon={<MessageSquare className="h-5 w-5" />}
          variant="cyan"
        />
        <KpiCard
          label="Urgent"
          value={String(urgentCount)}
          trend="Priority queue"
          up={urgentCount === 0}
          support="Immediate attention"
          icon={<AlertCircle className="h-5 w-5" />}
          variant="amber"
        />
        <KpiCard
          label="In Progress"
          value={String(inProgressCount)}
          trend="Assigned"
          up={true}
          support="Being handled"
          icon={<Clock className="h-5 w-5" />}
          variant="purple"
        />
        <KpiCard
          label="Resolved"
          value={String(resolvedCount)}
          trend="This month"
          up={true}
          support="Closed inquiries"
          icon={<CheckCircle2 className="h-5 w-5" />}
          variant="green"
        />
      </div>

      <div className="card-soft overflow-hidden">
        <div className="grid gap-2 border-b p-3 sm:flex sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search inquiries, contacts or clients…"
              className="h-9 border-transparent bg-muted pl-9"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-9 w-full sm:w-44">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {clientInquiryCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-9 w-full sm:w-44">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {["New", "In Progress", "Resolved"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {rows.length === 0 ? (
          <EmptyState title="No inquiries match your filters" description="Try a different search term or clear the filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Reference</th>
                  <th className="px-4 py-2.5 font-medium">Subject</th>
                  <th className="px-4 py-2.5 font-medium">Category</th>
                  <th className="px-4 py-2.5 font-medium">Priority</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Contact</th>
                  <th className="px-4 py-2.5 font-medium">Received</th>
                  <th className="px-4 py-2.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((inquiry) => (
                  <tr key={inquiry.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3 font-medium text-muted-foreground">{inquiry.reference}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{inquiry.subject}</p>
                      <Link
                        to="/clients/$clientId"
                        params={{ clientId: inquiry.clientId }}
                        className="text-xs text-muted-foreground hover:text-[#3cadf1]"
                      >
                        {inquiry.client}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge tone="neutral">{inquiry.category}</StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={priorityTone(inquiry.priority)} dot>
                        {inquiry.priority}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge tone={inquiryStatusTone(inquiry.status)}>{inquiry.status}</StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{inquiry.contactName}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.contactEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{inquiry.received}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" className="text-xs" onClick={() => setSelected(inquiry)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FormDialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title={selected ? selected.reference : "Inquiry details"}
        description={selected?.subject}
        saveLabel="Mark in progress"
        onSave={() => {
          toast.success(`${selected?.reference} marked as in progress`);
          setSelected(null);
        }}
      >
        {selected && (
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Client</Label>
                <p className="text-sm font-medium">{selected.client}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">Category</Label>
                <StatusBadge tone="neutral">{selected.category}</StatusBadge>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">Priority</Label>
                <StatusBadge tone={priorityTone(selected.priority)} dot>
                  {selected.priority}
                </StatusBadge>
              </div>
              <div className="space-y-1">
                <Label className="text-muted-foreground">Status</Label>
                <StatusBadge tone={inquiryStatusTone(selected.status)}>{selected.status}</StatusBadge>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Contact</Label>
              <p className="text-sm font-medium">{selected.contactName}</p>
              <p className="text-xs text-muted-foreground">{selected.contactEmail}</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inquiry-message">Client message</Label>
              <Textarea id="inquiry-message" rows={4} defaultValue={selected.message} readOnly className="resize-none bg-muted/30" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inquiry-response">Your response</Label>
              <Textarea id="inquiry-response" rows={3} placeholder="Draft a reply to the client…" />
            </div>
          </div>
        )}
      </FormDialog>
    </AppShell>
  );
}
