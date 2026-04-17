"use client";

import {
  ArrowRight,
  Wallet,
  Tags,
  Lock,
  Sparkles,
  ShieldCheck,
  Zap,
  Check,
  Star,
  Globe,
  PieChart,
  Upload,
  CreditCard,
  Users,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/components/user-button";
import Image from "next/image";

const features = [
  {
    icon: Wallet,
    title: "Unified Accounts",
    desc: "Connect checking, savings, credit cards and wallets. See every balance in one place, updated in real time.",
    points: ["Unlimited accounts", "Real-time balances", "Multi-currency"],
  },
  {
    icon: Tags,
    title: "Smart Categories",
    desc: "Auto-categorize transactions with AI, or define custom tags that match the way you actually spend.",
    points: ["50+ presets", "Custom tags", "AI auto-tagging"],
  },
  {
    icon: LineChart,
    title: "Insight Engine",
    desc: "Beautiful analytics that turn raw spending into decisions — trends, forecasts, and anomaly alerts.",
    points: ["Monthly trends", "Forecast cashflow", "Anomaly alerts"],
  },
  {
    icon: Upload,
    title: "CSV Import",
    desc: "Bring your history from any bank in seconds with our forgiving CSV mapper.",
    points: ["Auto-mapping", "Bulk edits", "Duplicate detection"],
  },
  {
    icon: PieChart,
    title: "Visual Reports",
    desc: "Pie, bar, radar and area charts — pick the lens that tells the story for you.",
    points: ["5 chart types", "Export PDF", "Shareable links"],
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    desc: "End-to-end encryption, SOC 2 controls and zero third-party data resale. Ever.",
    points: ["AES-256 encryption", "SOC 2 Type II", "Zero data resale"],
  },
];

const steps = [
  {
    n: "01",
    title: "Connect your accounts",
    desc: "Link accounts or import a CSV. You're set up in under two minutes.",
  },
  {
    n: "02",
    title: "Let it learn your habits",
    desc: "Smart categorization organizes every transaction — you can correct it once and it learns.",
  },
  {
    n: "03",
    title: "Act on real insights",
    desc: "Dashboards surface what's changed, what's trending, and what you should do next.",
  },
];

const testimonials = [
  {
    quote:
      "Switched from three spreadsheets and a budgeting app. Haven't looked back. The category insights alone saved me roughly $300 a month.",
    name: "Priya S.",
    role: "Product Designer",
  },
  {
    quote:
      "Finally, finance software that doesn't feel like tax prep. The UI is clean and the analytics actually help me make decisions.",
    name: "Marcus L.",
    role: "Freelance Developer",
  },
  {
    quote:
      "I run two small businesses — this handles both without making me choose between personal and business clarity.",
    name: "Elena R.",
    role: "Small Business Owner",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    desc: "Everything to get a real handle on your spending.",
    features: [
      "Up to 2 accounts",
      "500 transactions / mo",
      "Smart categories",
      "Basic reports",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    cadence: "/month",
    desc: "For individuals who want the full picture.",
    features: [
      "Unlimited accounts",
      "Unlimited transactions",
      "Advanced analytics",
      "CSV import & export",
      "Priority email support",
    ],
    cta: "Start 14-day Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$24",
    cadence: "/month",
    desc: "Shared finances for couples and small teams.",
    features: [
      "Everything in Pro",
      "Up to 5 members",
      "Shared categories",
      "Role-based access",
      "Dedicated onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is my financial data safe?",
    a: "Yes. All data is encrypted in transit and at rest with AES-256. We operate under SOC 2 Type II controls and never sell or share your data with advertisers.",
  },
  {
    q: "Can I import data from my bank?",
    a: "Absolutely. You can upload CSV statements from any bank — our mapper auto-detects fields, and you can bulk-edit before import.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes, the Starter plan is free forever with no credit card required. You can upgrade any time.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel in one click from settings — you keep access until the end of the billing period.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center shadow-sm shadow-primary/30 group-hover:shadow-md group-hover:shadow-primary/40 transition-shadow">
              <Wallet className="size-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight">
              Expensify
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how" className="hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32 px-4 sm:px-6 lg:px-8">
        {/* Mesh gradient background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(153,246,228,0.55),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(17,94,89,0.35),transparent_70%)]" />
          <div className="absolute top-40 -left-24 w-[400px] h-[400px] rounded-full bg-teal-300/30 blur-3xl dark:bg-teal-700/20" />
          <div className="absolute top-24 -right-24 w-[400px] h-[400px] rounded-full bg-emerald-300/30 blur-3xl dark:bg-emerald-700/20" />
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Announcement */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 pl-1 pr-4 py-1 rounded-full border border-border bg-card/80 backdrop-blur text-xs sm:text-sm shadow-sm">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold tracking-wide uppercase">
                <Sparkles className="size-3" /> New
              </span>
              <span className="text-muted-foreground">
                AI auto-categorization is here ·
              </span>
              <span className="font-medium">Try it free</span>
              <ArrowRight className="size-3.5 text-muted-foreground" />
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6 text-balance">
              Clarity for every{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-primary via-teal-700 to-emerald-900 bg-clip-text text-transparent">
                  dollar
                </span>
                <svg
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 w-full text-primary/50"
                  fill="none"
                >
                  <path
                    d="M2 8 Q 50 0, 100 6 T 198 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              you earn and spend.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
              One clean workspace for all your accounts, transactions, and
              insights. Built for people who'd rather not think about finance —
              but need to.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/sign-up">
                <Button className="h-12 px-7 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Start Free <ArrowRight className="size-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="h-12 px-6 rounded-full text-base font-medium hover:bg-secondary"
              >
                Watch 90s demo
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Free forever tier
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" /> Cancel anytime
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mt-20">
            <div className="absolute inset-x-10 -bottom-4 h-24 bg-primary/20 blur-3xl -z-10" />
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/10 ring-1 ring-border">
              <div className="aspect-[16/9] relative">
                <Image
                  src="/dboard.png"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS / TRUST STRIP */}
      <section className="border-y border-border/60 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Trusted by teams and individuals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
            {["Acme", "Globex", "Initech", "Umbrella", "Wayne Inc", "Stark"].map(
              (n) => (
                <span
                  key={n}
                  className="text-lg font-semibold tracking-tight text-muted-foreground"
                >
                  {n}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary/40" /> Features{" "}
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5 text-balance">
              Built for people who think in dollars, not dashboards.
            </h2>
            <p className="text-lg text-muted-foreground text-balance">
              Everything you need — nothing you don't. Power underneath,
              calm on top.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="size-11 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {f.desc}
                </p>
                <ul className="space-y-2 text-sm">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span className="size-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="size-2.5 text-primary" />
                      </span>
                      <span className="text-foreground/80">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/40 border-y border-border/60"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <span className="h-px w-8 bg-primary/40" /> How it works{" "}
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5 text-balance">
              Setup in minutes. Clarity for years.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {/* Dotted connector */}
            <div className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-px border-t-2 border-dashed border-primary/30" />

            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto mb-6 size-12 rounded-full bg-card border-2 border-primary text-primary font-semibold flex items-center justify-center shadow-sm shadow-primary/20 relative z-10">
                  {s.n}
                </div>
                <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY SPLIT */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                <ShieldCheck className="size-4" /> Security
              </div>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-balance">
                Your money is private. Period.
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                We treat your financial data the way banks wish they did —
                encrypted, isolated, and never sold. You stay in control of
                exports, deletion, and access.
              </p>
              <ul className="space-y-5">
                {[
                  { icon: Lock, t: "End-to-end encryption", d: "AES-256 at rest, TLS 1.3 in transit." },
                  { icon: ShieldCheck, t: "SOC 2 Type II", d: "Independently audited controls, every year." },
                  { icon: Globe, t: "GDPR & CCPA ready", d: "One-click export, one-click erase." },
                ].map((item) => (
                  <li key={item.t} className="flex items-start gap-4">
                    <div className="size-10 shrink-0 rounded-lg bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                      <item.icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.t}</p>
                      <p className="text-sm text-muted-foreground">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="absolute inset-8 bg-gradient-to-br from-primary/30 to-emerald-500/10 blur-3xl -z-10" />
              <div className="rounded-3xl overflow-hidden aspect-square flex items-center justify-center bg-gradient-to-br from-secondary/50 to-card border border-border">
                <Image
                  src="/security.png"
                  alt="Security"
                  height={720}
                  width={720}
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-primary via-teal-800 to-emerald-900">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_left,white,transparent_50%)]"
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { k: "50K+", v: "Active users" },
              { k: "$500M+", v: "Tracked" },
              { k: "4.9★", v: "App rating" },
              { k: "99.99%", v: "Uptime" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight mb-1 text-white">
                  {s.k}
                </div>
                <p className="text-sm uppercase tracking-wider text-white/80">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <Users className="size-4" /> Loved by users
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
              The finance app people actually open.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-card p-7 flex flex-col justify-between hover:shadow-lg hover:shadow-primary/5 transition-shadow"
              >
                <div>
                  <div className="flex gap-0.5 mb-4 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground/90 leading-relaxed mb-6">
                    "{t.quote}"
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                  <div className="size-9 rounded-full bg-gradient-to-br from-primary to-teal-900 text-white flex items-center justify-center text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/40 border-y border-border/60"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
              <CreditCard className="size-4" /> Pricing
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5 text-balance">
              Simple pricing. No surprises.
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  p.highlighted
                    ? "bg-gradient-to-br from-primary to-teal-900 text-primary-foreground shadow-2xl shadow-primary/25 ring-1 ring-primary"
                    : "bg-card border border-border"
                }`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-card text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/30 shadow-sm">
                    <Sparkles className="size-3" /> Most popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                  <p
                    className={`text-sm ${
                      p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {p.desc}
                  </p>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight">
                    {p.price}
                  </span>
                  <span
                    className={`text-sm ${
                      p.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {p.cadence}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`size-4 mt-0.5 shrink-0 ${
                          p.highlighted ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button
                    className={`w-full h-11 rounded-full font-medium ${
                      p.highlighted
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4 text-balance">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground">
              Can't find what you need?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact us
              </a>
              .
            </p>
          </div>

          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium">{f.q}</span>
                  <span className="size-7 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-open:bg-primary group-open:text-primary-foreground transition-colors">
                    <svg
                      className="size-3.5 transition-transform group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center bg-gradient-to-br from-primary via-teal-800 to-emerald-900 text-white shadow-2xl shadow-primary/30">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,white,transparent_50%)]" />
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-medium mb-6">
                <Zap className="size-3.5" /> Ready in 2 minutes
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-5 text-balance">
                Take back control of your money.
              </h2>
              <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto text-balance">
                Join thousands who've swapped spreadsheet chaos for clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/sign-up">
                  <Button className="h-12 px-7 rounded-full bg-white text-primary hover:bg-white/90 text-base font-semibold">
                    Create free account <ArrowRight className="size-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    variant="outline"
                    className="h-12 px-7 rounded-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white text-base font-medium"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-14 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center">
                  <Wallet className="size-4 text-white" />
                </div>
                <span className="font-semibold text-lg tracking-tight">
                  Expensify
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Smart expense tracking for people who'd rather live their lives.
              </p>
            </div>
            {[
              {
                h: "Product",
                links: ["Features", "Pricing", "Security", "Integrations"],
              },
              { h: "Company", links: ["About", "Blog", "Contact", "Careers"] },
              {
                h: "Legal",
                links: ["Privacy", "Terms", "Cookies", "Compliance"],
              },
            ].map((col) => (
              <div key={col.h}>
                <h4 className="font-semibold mb-4 text-sm">{col.h}</h4>
                <ul className="space-y-2.5 text-sm text-muted-foreground">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hover:text-foreground transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2026 Expensify. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
              All systems operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
