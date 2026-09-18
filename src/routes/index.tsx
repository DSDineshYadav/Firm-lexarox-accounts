/**
 * Dynamic White-Label Architecture for Accountancy Firm Landing Page
 * 
 * DESIGNED FOR END-CLIENTS OF THE FIRM:
 * Showcases the firm's modern accounting services, digital onboarding,
 * automated bookkeeping, and compliance review so prospective clients sign up.
 * 
 * FUTURE-PROOF DYNAMIC INTEGRATION:
 * When Super-Admin creates/edits a firm (logo, primary/secondary colors, firm name,
 * contact details, and feature copy), the developer simply passes that configuration into
 * `firmConfig` (e.g. via route loader or context). All components dynamically render from it.
 */

import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  HelpCircle,
  ListChecks,
  MessageSquare,
  Phone,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                     WHITE-LABEL FIRM CONFIGURATION TYPE                     */
/* -------------------------------------------------------------------------- */

export interface FirmLandingConfig {
  firm: {
    name: string;
    tagline: string;
    subTagline: string;
    logo: string;
    footerLogo?: string;
    brandIcon: string;
    phone: string;
    email: string;
    officeAddress: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    primaryHover: string;
  };
  hero: {
    badgeText: string;
    headlinePart1: string;
    headlineGradient: string;
    description: string;
    ctaButtonText: string;
    secondaryButtonText: string;
    trustPills: string[];
  };
  kpis: Array<{
    id: string;
    value: string;
    label: string;
    support: string;
    trend: string;
    up: boolean;
    color: string;
    icon: "clients" | "accuracy" | "taxSaved" | "turnaround" | "compliance";
  }>;
  features: Array<{
    id: string;
    title: string;
    description: string;
    color: string;
    highlight: boolean;
    icon: "crm" | "docs" | "onboarding" | "tax" | "advisory" | "messaging" | "security" | "payroll";
  }>;
  aiWorkflows: Array<{
    title: string;
    description: string;
    completed: string;
    status: "Active" | "Optimised";
  }>;
  liveFeed: Array<{
    workflow: string;
    action: string;
    time: string;
    verified: boolean;
  }>;
  pipelineStages: Array<{
    stage: string;
    count: number;
    completionRate: string;
  }>;
  steps: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  consultationHighlights: Array<{
    title: string;
    description: string;
    color: string;
  }>;
  businessTypes: Array<{
    value: string;
    label: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                        DEFAULT WHITE-LABEL CONFIG                          */
/* -------------------------------------------------------------------------- */

export const defaultFirmConfig: FirmLandingConfig = {
  firm: {
    name: "LexaRox Accounts",
    tagline: "Modern Accounting & Advisory for Growing Businesses",
    subTagline: "Certified accountants with smart automation — clients, documents, bookkeeping and taxes in one calm portal.",
    logo: "/logo_black.png",
    footerLogo: "/logo.png",
    brandIcon: "/brand-icon.png",
    phone: "+44 20 7946 0812",
    email: "clientcare@lexaroxaccounts.co.uk",
    officeAddress: "London & Nationwide Services",
  },
  theme: {
    primaryColor: "#3cadf1",
    secondaryColor: "#50b546",
    accentColor: "#e2008e",
    primaryHover: "#35a3e3",
  },
  hero: {
    badgeText: "Accredited Accounting & Tax Advisory",
    headlinePart1: "Focus on your business.",
    headlineGradient: "We handle your accounts & taxes.",
    description:
      "Experience calm, modern accountancy. We combine dedicated certified accountants with smart digital onboarding, automated bookkeeping, and real-time tax forecasting for limited companies and entrepreneurs.",
    ctaButtonText: "Book free consultation",
    secondaryButtonText: "Explore accounting services",
    trustPills: ["HMRC & MTD Compliant", "Dedicated Senior Accountant", "Digital Document Portal"],
  },
  kpis: [
    {
      id: "accuracy",
      value: "99.8%",
      label: "HMRC Filing Accuracy",
      support: "Zero compliance penalties",
      trend: "100% on time",
      up: true,
      color: "#3cadf1",
      icon: "accuracy",
    },
    {
      id: "onboarding",
      value: "48 hrs",
      label: "Digital Client Onboarding",
      support: "Paperless verification & setup",
      trend: "Fast track",
      up: true,
      color: "#50b546",
      icon: "turnaround",
    },
    {
      id: "taxSaved",
      value: "£4,250",
      label: "Avg. Tax Relief Claimed",
      support: "Per client through proactive planning",
      trend: "+18% vs avg",
      up: true,
      color: "#e2008e",
      icon: "taxSaved",
    },
    {
      id: "timeSaved",
      value: "16 hrs",
      label: "Monthly Time Saved",
      support: "Automated receipts & bank feeds",
      trend: "No shoeboxes",
      up: true,
      color: "#3cadf1",
      icon: "compliance",
    },
    {
      id: "satisfaction",
      value: "98.7%",
      label: "Client Satisfaction",
      support: "5-star responsive support",
      trend: "Direct advisor",
      up: true,
      color: "#50b546",
      icon: "clients",
    },
  ],
  features: [
    {
      id: "portal",
      title: "Client Portal",
      description:
        "View and respond to document requests from your accountant, securely upload statements, and keep all your business records up-to-date in one place.",
      color: "#3cadf1",
      highlight: true,
      icon: "crm",
    },
    {
      id: "receipts",
      title: "Automated Bookkeeping",
      description:
        "Snap invoices and receipts from your phone. Our smart system extracts transactions and reconciles bank feeds seamlessly.",
      color: "#e2008e",
      highlight: true,
      icon: "docs",
    },
    {
      id: "onboarding",
      title: "Instant Digital Onboarding",
      description:
        "Switching accountants or starting fresh is effortless. Guided paperless KYC, company registration, and historical data transfer in 48 hours.",
      color: "#50b546",
      highlight: false,
      icon: "onboarding",
    },
    {
      id: "vat",
      title: "VAT & Year-End Accounts",
      description:
        "Never miss an HMRC deadline. Quarterly VAT returns, Corporation Tax (CT600), and annual accounts submitted with zero friction.",
      color: "#3cadf1",
      highlight: false,
      icon: "tax",
    },
    {
      id: "advisory",
      title: "Strategic Tax Planning",
      description:
        "Proactive advice on dividend structuring, allowable expenses, and R&D credits to keep your business financially efficient.",
      color: "#50b546",
      highlight: false,
      icon: "advisory",
    },
    {
      id: "advisors",
      title: "Direct Senior Accountant",
      description:
        "You always have a dedicated chartered accountant assigned to your business. Real answers from qualified professionals when you need them.",
      color: "#e2008e",
      highlight: false,
      icon: "messaging",
    },
    {
      id: "payroll",
      title: "Payroll & Pension Compliance",
      description:
        "Full payroll bureau services for your staff and directors. Automated payslips, auto-enrolment pensions, and PAYE submissions.",
      color: "#3cadf1",
      highlight: false,
      icon: "payroll",
    },
    {
      id: "security",
      title: "Bank-Grade Data Security",
      description:
        "Your business records are protected with 256-bit SSL encryption, ISO-compliant data centres, and full GDPR compliance.",
      color: "#50b546",
      highlight: false,
      icon: "security",
    },
  ],
  aiWorkflows: [
    {
      title: "Transaction Categorisation",
      description: "Daily bank feeds matched and auto-tagged to appropriate expense categories.",
      completed: "1,240 receipts processed this month",
      status: "Active",
    },
    {
      title: "VAT & Tax Estimation",
      description: "Real-time tax liability updated dynamically after every reconciled transaction.",
      completed: "Live quarterly calculations",
      status: "Active",
    },
    {
      title: "Compliance Anomaly Audit",
      description: "Pre-checks every filing against current HMRC rules to flag potential exceptions.",
      completed: "100% pre-submission audit pass",
      status: "Active",
    },
    {
      title: "Client Document Assistant",
      description: "Friendly reminders and multi-lingual upload prompts for missing receipts.",
      completed: "Zero late filing penalties",
      status: "Optimised",
    },
  ],
  liveFeed: [
    {
      workflow: "Smart Bookkeeper",
      action: "Categorised 14 business expense receipts from Monzo feed",
      time: "4 minutes ago",
      verified: true,
    },
    {
      workflow: "Senior Accountant Review",
      action: "Signed off Q2 VAT return draft for Brightside Consulting Ltd",
      time: "18 minutes ago",
      verified: true,
    },
    {
      workflow: "Tax Planning Engine",
      action: "Identified £840 allowable capital expense deduction",
      time: "1 hour ago",
      verified: true,
    },
    {
      workflow: "Onboarding Assistant",
      action: "Verified Companies House filing history and UTR records",
      time: "2 hours ago",
      verified: true,
    },
  ],
  pipelineStages: [
    { stage: "Initial Inquiry & Consultation", count: 85, completionRate: "100%" },
    { stage: "Digital KYC & Document Upload", count: 74, completionRate: "87%" },
    { stage: "Bank Feed & Historical Reconcile", count: 68, completionRate: "80%" },
    { stage: "Account Manager Strategy Call", count: 62, completionRate: "73%" },
    { stage: "Full Active Accountancy & Advisory", count: 58, completionRate: "68%" },
  ],
  steps: [
    {
      step: "01",
      title: "Free Initial Consultation",
      description: "Tell us about your business structure, turnover, and accounting requirements. We suggest the ideal package.",
    },
    {
      step: "02",
      title: "Fast Digital Setup",
      description: "Connect your bank feed and upload previous accounts securely in under 48 hours with guidance.",
    },
    {
      step: "03",
      title: "Total Financial Peace of Mind",
      description: "We handle your bookkeeping, prepare filings, and give you ongoing tax advice so you can scale with confidence.",
    },
  ],
  consultationHighlights: [
    {
      title: "Tailored Package & Quote",
      description: "Transparent fixed monthly fees. No surprise hourly charges or hidden costs.",
      color: "#50b546",
    },
    {
      title: "Chartered Accountant Strategy Call",
      description: "Discuss dividend optimisation, business expense structure, and upcoming deadlines.",
      color: "#3cadf1",
    },
    {
      title: "Hassle-Free Accountant Switch",
      description: "We contact your former accountant and handle professional clearance on your behalf.",
      color: "#e2008e",
    },
  ],
  businessTypes: [
    { value: "ltd", label: "Limited Company (Ltd)" },
    { value: "sole-trader", label: "Sole Trader / Self-Employed" },
    { value: "partnership", label: "Partnership / LLP" },
    { value: "contractor", label: "Contractor / Freelancer" },
    { value: "startup", label: "New Business Formation" },
  ],
};

/* -------------------------------------------------------------------------- */
/*                             ROUTE DEFINITION                               */
/* -------------------------------------------------------------------------- */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${defaultFirmConfig.firm.name} — ${defaultFirmConfig.firm.tagline}` },
      {
        name: "description",
        content: defaultFirmConfig.firm.subTagline,
      },
      { property: "og:title", content: `${defaultFirmConfig.firm.name} — Modern Accounting for Businesses` },
      {
        property: "og:description",
        content: "Automate your bookkeeping, stay 100% tax compliant, and get direct guidance from accredited accountants.",
      },
    ],
  }),
  component: FirmLandingPage,
});

/* -------------------------------------------------------------------------- */
/*                            SUBCOMPONENTS & FORMS                           */
/* -------------------------------------------------------------------------- */

function SectionLabel({ children, color = "#3cadf1" }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color }}>
      {children}
    </p>
  );
}

type ClientInquiryFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const initialClientForm: ClientInquiryFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

function ClientConsultationForm({ config }: { config: FirmLandingConfig }) {
  const [form, setForm] = useState<ClientInquiryFormState>(initialClientForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof ClientInquiryFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      toast.success("Message received! Our team will contact you within 24 hours.", {
        description: `Confirmation email sent to ${form.email}. Thank you, ${form.firstName}!`,
      });
      setForm(initialClientForm);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client-first-name" className="text-[0.7rem] font-bold uppercase tracking-wide text-[#2c2a35]/55">
            First Name <span className="text-[#e2008e]">*</span>
          </Label>
          <Input
            id="client-first-name"
            value={form.firstName || ""}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="Sarah"
            required
            className="h-11 rounded-2xl border-[#2c2a35]/10 bg-white shadow-sm focus-visible:border-[#3cadf1]/45 focus-visible:ring-[#3cadf1]/15"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="client-last-name" className="text-[0.7rem] font-bold uppercase tracking-wide text-[#2c2a35]/55">
            Last Name <span className="text-[#e2008e]">*</span>
          </Label>
          <Input
            id="client-last-name"
            value={form.lastName || ""}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Jenkins"
            required
            className="h-11 rounded-2xl border-[#2c2a35]/10 bg-white shadow-sm focus-visible:border-[#3cadf1]/45 focus-visible:ring-[#3cadf1]/15"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="client-email" className="text-[0.7rem] font-bold uppercase tracking-wide text-[#2c2a35]/55">
            Email <span className="text-[#e2008e]">*</span>
          </Label>
          <Input
            id="client-email"
            type="email"
            value={form.email || ""}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="sarah@yourbusiness.co.uk"
            required
            className="h-11 rounded-2xl border-[#2c2a35]/10 bg-white shadow-sm focus-visible:border-[#3cadf1]/45 focus-visible:ring-[#3cadf1]/15"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="client-phone" className="text-[0.7rem] font-bold uppercase tracking-wide text-[#2c2a35]/55">
            Phone <span className="text-[#e2008e]">*</span>
          </Label>
          <Input
            id="client-phone"
            type="tel"
            value={form.phone || ""}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+44 7700 900123"
            required
            className="h-11 rounded-2xl border-[#2c2a35]/10 bg-white shadow-sm focus-visible:border-[#3cadf1]/45 focus-visible:ring-[#3cadf1]/15"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="client-message" className="text-[0.7rem] font-bold uppercase tracking-wide text-[#2c2a35]/55">
          Message <span className="text-[#e2008e]">*</span>
        </Label>
        <Textarea
          id="client-message"
          value={form.message || ""}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="e.g. Need annual accounts, VAT returns, looking to switch from current accountant..."
          rows={3}
          required
          className="min-h-[5.5rem] resize-none rounded-2xl border-[#2c2a35]/10 bg-white shadow-sm focus-visible:border-[#3cadf1]/45 focus-visible:ring-[#3cadf1]/15"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-[#3cadf1] text-sm font-bold tracking-wide shadow-[0_10px_24px_-8px_rgba(60,173,241,0.65)] transition-all hover:bg-[#35a3e3] hover:shadow-[0_14px_28px_-8px_rgba(60,173,241,0.7)] active:scale-[0.99] disabled:opacity-70"
      >
        {isSubmitting ? "Submitting request…" : "Book my free consultation"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-[#2c2a35]/50">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#50b546]" />
        100% confidential. No commitment required. We strictly respect your privacy.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                         MAIN FIRM LANDING PAGE                             */
/* -------------------------------------------------------------------------- */

function FirmLandingPage() {
  // Driven by centralized config (ready for dynamic API hook / Super-Admin props)
  const config = defaultFirmConfig;

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Automated Workflows", href: "#workflows" },
    { label: "Client Performance", href: "#performance" },
    { label: "How it works", href: "#how-it-works" },
  ];

  return (
    <div className="min-h-[100dvh] scroll-smooth bg-[#eef1f6] text-[#2c2a35]">
      {/* ------------------------------- HEADER ------------------------------- */}
      <header className="sticky top-0 z-50 border-b border-[#2c2a35]/6 bg-white">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <img src={config.firm.logo} alt={config.firm.name} className="h-8 w-auto sm:h-8" />
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#2c2a35]/8 bg-[#f8f9fb] p-1 md:flex">
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#2c2a35]/65 transition-all hover:bg-white hover:text-[#3cadf1] hover:shadow-sm"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-[#2c2a35]/12 bg-white px-5 font-semibold text-[#2c2a35] hover:bg-[#f4f6f9]"
            >
              <a href="#consultation">Free Consultation</a>
            </Button>

            <Button
              asChild
              className="rounded-full bg-[#3cadf1] px-5 font-bold text-white shadow-[0_8px_22px_-6px_rgba(60,173,241,0.6)] hover:bg-[#35a3e3]"
            >
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* -------------------------------- HERO -------------------------------- */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(60,173,241,0.2),transparent_42%),radial-gradient(circle_at_88%_12%,rgba(80,181,70,0.14),transparent_38%),radial-gradient(circle_at_72%_88%,rgba(226,0,142,0.1),transparent_36%)]"
        />

        {/* Subtle Brand Icon background accent with low opacity */}
        <img
          src={config.firm.brandIcon}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-12 top-20 h-72 w-72 select-none object-contain opacity-20 lg:h-60 lg:w-60"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-24">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#3cadf1]/30 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0284c7] shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#50b546] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#50b546]" />
              </span>
              {config.hero.badgeText}
            </span>

            <h1 className="mt-7 max-w-2xl text-[2.15rem] font-bold leading-[1.08] tracking-tight sm:text-[2.85rem] lg:text-[3.15rem]">
              {config.hero.headlinePart1}
              <span className="mt-2 block bg-gradient-to-r from-[#3cadf1] via-[#50b546] to-[#e2008e] bg-clip-text text-transparent">
                {config.hero.headlineGradient}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-[#2c2a35]/68">
              {config.hero.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#3cadf1] px-8 font-bold shadow-[0_12px_28px_-8px_rgba(60,173,241,0.7)] hover:bg-[#35a3e3]"
              >
                <a href="#consultation">
                  {config.hero.ctaButtonText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="h-12 rounded-full px-7 font-semibold text-[#2c2a35]/70 hover:bg-white/60 hover:text-[#3cadf1]"
              >
                <a href="#services">{config.hero.secondaryButtonText}</a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#2c2a35]/55">
              {config.hero.trustPills.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#50b546]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-[#3cadf1]/25 via-transparent to-[#e2008e]/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 shadow-[0_32px_80px_-24px_rgba(44,42,53,0.35)]">
              <img
                src="/login-hero.png"
                alt="Accountancy professional advising client"
                className="aspect-[4/5] w-full object-cover object-[center_18%] lg:aspect-[5/6]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a35]/85 via-[#2c2a35]/20 to-transparent" />

              {/* Floating Client Operations Card */}
              <div className="absolute left-4 right-4 top-4 rounded-3xl border border-white/25 bg-white/12 p-4 backdrop-blur-xl sm:left-6 sm:right-auto sm:max-w-[260px]">
                <div className="flex items-center gap-2">
                  <div className="rounded-xl bg-white/95 px-2 py-1">
                    <img src={config.firm.logo} alt="" className="h-4 w-auto" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Client Portal Live</p>
                    <p className="text-[0.65rem] text-white/65">All accounts reconciled</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-white/10 px-2.5 py-2">
                    <p className="text-sm font-bold tabular-nums text-white">£142.8k</p>
                    <p className="text-[0.6rem] leading-tight text-white/70">YTD Revenue</p>
                  </div>
                  <div className="rounded-xl bg-white/10 px-2.5 py-2">
                    <p className="text-sm font-bold tabular-nums text-[#50b546]">0 Pending</p>
                    <p className="text-[0.6rem] leading-tight text-white/70">HMRC Deadlines</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4">
                  <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
                    <p className="flex items-center gap-1.5 text-sm font-bold text-white">
                      <Sparkles className="h-4 w-4 text-[#3cadf1]" />
                      Direct Senior Accountant
                    </p>
                    <p className="mt-1 text-xs text-white/75">Full advisory & review included</p>
                  </div>
                  <div className="hidden rounded-full bg-[#50b546] px-4 py-2 text-right sm:block">
                    <p className="text-lg font-bold text-white">100%</p>
                    <p className="text-[0.65rem] font-semibold text-white/85">Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ SERVICES ------------------------------ */}
      <section id="services" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel color="#3cadf1">Complete Accounting Services</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2c2a35] sm:text-[2.5rem]">
              Everything your business needs to stay compliant & scale
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#2c2a35]/65">
              From daily bookkeeping and receipt reconciliation to year-end accounts and strategic corporation tax planning.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-12">
            {config.features.map(({ id, title, description, color, highlight }) => (
              <article
                key={id}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-[#2c2a35]/8 bg-[#fafbfd] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_-20px_rgba(60,173,241,0.35)]",
                  highlight ? "lg:col-span-6 lg:p-8" : "lg:col-span-3",
                )}
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl shadow-sm"
                  style={{ backgroundColor: `${color}16`, color }}
                >
                  {id === "portal" && <FileText className="h-5 w-5" />}
                  {id === "receipts" && <Receipt className="h-5 w-5" />}
                  {id === "onboarding" && <UserPlus className="h-5 w-5" />}
                  {id === "vat" && <FileText className="h-5 w-5" />}
                  {id === "advisory" && <TrendingUp className="h-5 w-5" />}
                  {id === "advisors" && <Users className="h-5 w-5" />}
                  {id === "payroll" && <CreditCard className="h-5 w-5" />}
                  {id === "security" && <ShieldCheck className="h-5 w-5" />}
                </span>
                <h3 className={cn("mt-5 font-bold", highlight ? "text-xl" : "text-base")}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2c2a35]/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------ AUTOMATED WORKFLOWS ------------------------ */}
      <section id="workflows" className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,#2c2a35_0%,#1a1824_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 xl:grid-cols-[0.85fr_1.15fr]">
            <div className="text-white">
              <SectionLabel color="#3cadf1">Seamless Client Experience</SectionLabel>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.5rem]">
                Smart technology doing the heavy lifting
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                You never have to worry about manual data entry, missing receipts, or missed deadlines. Our automated pipelines handle routine tasks with certified accountant sign-off.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Receipt capture via mobile & web upload",
                  "Automated bank feed reconciliation",
                  "Real-time tax liability updates",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-white/85">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6fdb65]" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {config.aiWorkflows.map((workflow) => (
                  <article
                    key={workflow.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:bg-white/[0.09]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#3cadf1]/20 text-[#3cadf1]">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <span className="rounded-full bg-[#50b546]/20 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide text-[#6fdb65]">
                        {workflow.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-white">{workflow.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/55">{workflow.description}</p>
                    <p className="mt-2 text-xs font-semibold text-[#3cadf1]">{workflow.completed}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Live activity feed */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-white">Live Operations Feed</p>
                  <p className="text-xs text-white/50">Real-time automation behind your client portal</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#50b546]/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#6fdb65]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6fdb65]" />
                  Active 24/7
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {config.liveFeed.map((item, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-white/8 bg-[#2c2a35]/60 p-4 transition-colors hover:border-[#3cadf1]/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#3cadf1]">{item.workflow}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/85">{item.action}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-[#50b546]/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-[#6fdb65]">
                        Verified
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-[0.65rem] text-white/45">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- PERFORMANCE --------------------------- */}
      <section id="performance" className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(60,173,241,0.06),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(226,0,142,0.05),transparent_38%)]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel color="#e2008e">Proven Client Results</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2c2a35] sm:text-[2.5rem]">
              Delivering measurable financial value
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#2c2a35]/65">
              Our clients spend less time on administration, pay less in unnecessary taxes, and never worry about compliance deadlines.
            </p>
          </div>

          {/* KPI cards */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {config.kpis.map((kpi) => (
              <article
                key={kpi.id}
                className="group relative overflow-hidden rounded-3xl border border-[#2c2a35]/8 bg-[#fafbfd] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_rgba(60,173,241,0.28)]"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${kpi.color}, transparent)` }}
                />
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl"
                  style={{ backgroundColor: `${kpi.color}14`, color: kpi.color }}
                >
                  {kpi.icon === "accuracy" && <ShieldCheck className="h-5 w-5" />}
                  {kpi.icon === "turnaround" && <Clock className="h-5 w-5" />}
                  {kpi.icon === "taxSaved" && <TrendingUp className="h-5 w-5" />}
                  {kpi.icon === "compliance" && <ListChecks className="h-5 w-5" />}
                  {kpi.icon === "clients" && <Users className="h-5 w-5" />}
                </span>
                <p className="mt-4 text-2xl font-bold tabular-nums text-[#2c2a35]">{kpi.value}</p>
                <p className="mt-1 text-xs font-semibold leading-snug text-[#2c2a35]/75">{kpi.label}</p>
                <p className="mt-2 text-[0.68rem] leading-relaxed text-[#2c2a35]/50">{kpi.support}</p>
                <p className="mt-2 text-xs font-bold text-[#2a8323]">{kpi.trend}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            {/* Split */}
            <div className="rounded-3xl border border-[#2c2a35]/8 bg-gradient-to-br from-white to-[#f4f8fc] p-7 shadow-[0_12px_40px_-20px_rgba(44,42,53,0.15)] lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#3cadf1]/12 text-[#3cadf1]">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Service Delivery Model</h3>
                  <p className="text-sm text-[#2c2a35]/55">Smart automation + Human expertise</p>
                </div>
              </div>

              <div className="relative mx-auto mt-8 grid h-44 w-44 place-items-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(#3cadf1 0 78%, #50b546 78% 98%, #e2008e 98% 100%)",
                  }}
                />
                <div className="absolute inset-[14%] rounded-full bg-[#fafbfd] shadow-inner" />
                <div className="relative text-center">
                  <p className="text-2xl font-bold tabular-nums text-[#2c2a35]">85%</p>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-[#2c2a35]/50">
                    Auto-Reconciled
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {[
                  { name: "Automated Bookkeeping & Reconciliation", value: "78%", color: "#3cadf1" },
                  { name: "Senior Accountant Review & Verification", value: "20%", color: "#50b546" },
                  { name: "Proactive Tax Advisory & Planning", value: "2%", color: "#e2008e" },
                ].map((m) => (
                  <li
                    key={m.name}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#2c2a35]/6 bg-white/80 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: m.color }} />
                      <span className="truncate text-sm font-medium text-[#2c2a35]/80">{m.name}</span>
                    </div>
                    <span className="text-sm font-bold tabular-nums">{m.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Client Journey Pipeline */}
            <div className="rounded-3xl border border-[#2c2a35]/8 bg-gradient-to-br from-white to-[#f4fbf4] p-7 shadow-[0_12px_40px_-20px_rgba(44,42,53,0.15)] lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#50b546]/12 text-[#50b546]">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Client Onboarding Flow</h3>
                  <p className="text-sm text-[#2c2a35]/55">From intake to full active accounts in 48 hours</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {config.pipelineStages.map((stage, i) => (
                  <div key={stage.stage} className="flex items-center gap-4">
                    <div
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                      style={{
                        background: "linear-gradient(135deg, #3cadf1, #50b546)",
                        opacity: 1 - i * 0.1,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                        <span className="font-semibold text-[#2c2a35]/85">{stage.stage}</span>
                        <span className="font-bold tabular-nums text-[#3cadf1]">{stage.completionRate}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-[#eef1f6]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: stage.completionRate,
                            background: "linear-gradient(90deg, #3cadf1, #50b546)",
                            opacity: 1 - i * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 rounded-2xl border border-[#50b546]/20 bg-[#50b546]/8 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#50b546]" />
                <p className="text-sm text-[#2c2a35]/70">
                  <span className="font-bold text-[#2a8323]">Fast & Seamless:</span> Average client setup completed in less than 48 hours with full historical data imported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------- HOW IT WORKS ------------------------- */}
      <section id="how-it-works" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <SectionLabel color="#50b546">How It Works</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2c2a35] sm:text-[2.5rem]">
              Getting started takes three simple steps
            </h2>
          </div>

          <div className="relative mt-14 grid gap-8 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-[16.67%] right-[16.67%] top-10 hidden h-0.5 bg-gradient-to-r from-[#3cadf1] via-[#50b546] to-[#e2008e] md:block"
            />
            {config.steps.map(({ step, title, description }) => (
              <article
                key={step}
                className="relative rounded-3xl border border-[#2c2a35]/8 bg-[#fafbfd] p-7 text-center shadow-sm"
              >
                <span className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#3cadf1] to-[#50b546] text-lg font-bold text-white shadow-lg">
                  {step}
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2c2a35]/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------- CONSULTATION ------------------------- */}
      <section id="consultation" className="relative overflow-hidden py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_20%,rgba(80,181,70,0.12),transparent_40%),radial-gradient(circle_at_92%_80%,rgba(60,173,241,0.1),transparent_38%),linear-gradient(180deg,#eef1f6_0%,#f8fafc_100%)]"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
            {/* Left */}
            <div>
              <SectionLabel color="#50b546">Client Consultation</SectionLabel>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#2c2a35] sm:text-[2.5rem]">
                Schedule a free 30-minute consultation with our senior accountant
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-[#2c2a35]/65">
                We'll review your current accounting structure, uncover eligible tax reliefs, and explain how our modern client portal eliminates administrative stress.
              </p>

              <ul className="mt-8 space-y-5">
                {config.consultationHighlights.map(({ title, description, color }) => (
                  <li key={title} className="flex gap-4">
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl shadow-sm"
                      style={{ backgroundColor: `${color}14`, color }}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-bold text-[#2c2a35]">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#2c2a35]/60">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#2c2a35]/8 bg-white/80 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#3cadf1]">
                    <Calendar className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-wide">Quick Response</p>
                  </div>
                  <p className="mt-2 text-2xl font-bold tabular-nums text-[#2c2a35]">Within 24 hrs</p>
                  <p className="mt-1 text-xs text-[#2c2a35]/55">Calendar invite sent to your inbox</p>
                </div>
                <div className="rounded-3xl border border-[#2c2a35]/8 bg-white/80 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#50b546]">
                    <Clock className="h-4 w-4" />
                    <p className="text-xs font-bold uppercase tracking-wide">Meeting Duration</p>
                  </div>
                  <p className="mt-2 text-2xl font-bold tabular-nums text-[#2c2a35]">30 min</p>
                  <p className="mt-1 text-xs text-[#2c2a35]/55">Video call or phone consultation</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl border border-[#50b546]/20 bg-[#50b546]/8 px-5 py-4">
                <Building2 className="h-5 w-5 shrink-0 text-[#50b546]" />
                <p className="text-sm text-[#2c2a35]/75">
                  Trusted by businesses managing over{" "}
                  <span className="font-bold text-[#2a8323]">£50M+ in annual revenue</span> through our firm.
                </p>
              </div>
            </div>

            {/* Right form card */}
            <div className="overflow-hidden rounded-[2.25rem] border border-[#2c2a35]/8 bg-white shadow-[0_24px_64px_-28px_rgba(44,42,53,0.2)]">
              <div
                aria-hidden
                className="h-1.5 bg-gradient-to-r from-[#50b546] via-[#3cadf1] to-[#e2008e]"
              />

              <div className="p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3cadf1]">
                      Client Intake
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#2c2a35]">Get started with our firm</h3>
                    <p className="mt-1.5 text-sm text-[#2c2a35]/55">
                      Tell us about your business and we'll prepare a tailored service package.
                    </p>
                  </div>
                  <span className="hidden shrink-0 rounded-full border border-[#50b546]/25 bg-[#50b546]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-[#2a8323] sm:inline-flex">
                    Free Consultation
                  </span>
                </div>

                <div className="mt-7">
                  <ClientConsultationForm config={config} />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-5 border-t border-[#2c2a35]/6 pt-6 text-xs font-semibold text-[#2c2a35]/45">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    Prefer a direct call? We'll ring you
                  </span>
                  <span className="hidden h-3 w-px bg-[#2c2a35]/12 sm:block" aria-hidden />
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#50b546]" />
                    GDPR & HMRC Compliant
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------- FINAL CTA ----------------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f7fb] to-white py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(60,173,241,0.1),transparent_42%),radial-gradient(circle_at_85%_40%,rgba(80,181,70,0.08),transparent_40%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <div className="overflow-hidden rounded-[2.5rem] border border-[#2c2a35]/8 bg-white shadow-[0_24px_64px_-28px_rgba(44,42,53,0.18)]">
            <div
              aria-hidden
              className="h-1.5 bg-gradient-to-r from-[#3cadf1] via-[#50b546] to-[#e2008e]"
            />

            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
              <div>
                <img src={config.firm.logo} alt={config.firm.name} className="h-11 w-auto sm:h-12" />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#2c2a35] sm:text-[2.35rem]">
                  Ready to experience calmer accountancy?
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-[#2c2a35]/65 sm:text-lg">
                  Join hundreds of growing businesses who trust {config.firm.name} for bookkeeping, VAT, and strategic tax advisory.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-[#3cadf1] px-8 font-bold text-white shadow-[0_10px_24px_-8px_rgba(60,173,241,0.55)] hover:bg-[#35a3e3]"
                  >
                    <a href="#consultation">
                      Book Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-3xl border border-[#2c2a35]/8 bg-[#fafbfd] p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3cadf1]">
                  What you get with our firm
                </p>
                <ul className="mt-5 space-y-4">
                  {[
                    { label: "Dedicated Chartered Accountant", value: "Direct email & phone" },
                    { label: "24/7 Digital Client Portal", value: "Document requests & secure uploads" },
                    { label: "Full HMRC & VAT Filings", value: "100% on-time guarantee" },
                    { label: "Automated Bookkeeping", value: "Instant receipt uploads" },
                  ].map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center justify-between gap-4 border-b border-[#2c2a35]/6 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#50b546]" />
                        <span className="text-sm font-semibold text-[#2c2a35]/85">{item.label}</span>
                      </div>
                      <span className="text-right text-xs font-medium text-[#2c2a35]/50">{item.value}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#3cadf1]/10 to-[#50b546]/10 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#2c2a35]/80">
                    <ShieldCheck className="h-4 w-4 text-[#3cadf1]" />
                    Full Professional Indemnity Insurance & HMRC Authorised
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- FOOTER ------------------------------- */}
      <footer className="border-t border-[#2c2a35]/8 bg-[#2c2a35] py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <img src={config.firm.footerLogo || "/logo.png"} alt={config.firm.name} className="h-8 w-auto sm:h-9 object-contain" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                {config.firm.tagline}. Certified accountants combining deep advisory with smart automated bookkeeping.
              </p>
              <div className="mt-5 space-y-1 text-xs text-white/50">
                <p>📞 {config.firm.phone}</p>
                <p>✉️ {config.firm.email}</p>
                <p>📍 {config.firm.officeAddress}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#3cadf1]">Services</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                <li><a href="#services" className="transition-colors hover:text-white">Bookkeeping</a></li>
                <li><a href="#services" className="transition-colors hover:text-white">VAT Returns</a></li>
                <li><a href="#services" className="transition-colors hover:text-white">Year-End Accounts</a></li>
                <li><a href="#services" className="transition-colors hover:text-white">Corporation Tax</a></li>
                <li><a href="#consultation" className="transition-colors hover:text-white">Book Consultation</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#50b546]">Access</p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/65">
                <li>
                  <a href="#consultation" className="transition-colors hover:text-white">
                    Free Consultation
                  </a>
                </li>
                <li>
                  <Link to="/login" className="transition-colors hover:text-white">
                    Client Portal Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="transition-colors hover:text-white">
                    Firm Workspace
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-white/45">
              © {new Date().getFullYear()} {config.firm.name}. All rights reserved.
            </p>
            <p className="text-xs text-white/35">HMRC Authorised & Regulated Practice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
