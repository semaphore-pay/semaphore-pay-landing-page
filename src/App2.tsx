import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import CloudflareLogo from "./components/CloudflareLogo"
import {
  SunIcon,
  MoonIcon,
  Menu,
  X,
  ArrowRight,
  Check,
  Zap,
  ShieldCheck,
  BarChart3,
  Repeat,
  GitBranch,
  Database,
  Cpu,
  Lock,
} from "lucide-react"
import Logo from "./components/Logo"
import NombaLogo from "./components/NombaLogo"
import NodeJsLogo from "./components/NodeJsLogo"
import BunLogo from "./components/BunLogo"
import PostgresLogo from "./components/PostgresLogo"
import SQLiteLogo from "./components/SqliteLogo"

const BetterAuthLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="4"
      fill="#1a1a1a"
      stroke="#333"
      strokeWidth="1"
    />
    <path
      d="M7 8h4.5c1.4 0 2.5 1.1 2.5 2.5S12.9 13 11.5 13H7V8z"
      fill="white"
    />
    <path
      d="M7 13h5c1.4 0 2.5 1.1 2.5 2.5S13.4 18 12 18H7v-5z"
      fill="white"
      opacity="0.7"
    />
    <line
      x1="17"
      y1="8"
      x2="17"
      y2="18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

// ─── Code Snippet Component ──────────────────────────────────────────────────

const CodeBlock = ({
  code,
  language = "typescript",
}: {
  code: string
  language?: string
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0c]">
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
        </div>
        <span className="text-xs font-medium tracking-wider text-neutral-600 uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code
          className="font-mono text-neutral-300"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </pre>
    </div>
  )
}

// ─── Highlight helper ────────────────────────────────────────────────────────
const hl = {
  keyword: (s: string) => `<span style="color:#c792ea">${s}</span>`,
  fn: (s: string) => `<span style="color:#82aaff">${s}</span>`,
  str: (s: string) => `<span style="color:#c3e88d">${s}</span>`,
  comment: (s: string) =>
    `<span style="color:#546e7a;font-style:italic">${s}</span>`,
  prop: (s: string) => `<span style="color:#f78c6c">${s}</span>`,
  type: (s: string) => `<span style="color:#ffcb6b">${s}</span>`,
}

const authBridgeSnippet = [
  `${hl.comment("// Better Auth integration — zero provisioning code")}`,
  `${hl.keyword("import")} { semaphore } ${hl.keyword("from")} ${hl.str('"@semaphore/core"')}`,
  ``,
  `${hl.keyword("export const")} auth = ${hl.fn("betterAuth")}({`,
  `  ${hl.prop("database")}: db,`,
  `  ${hl.prop("plugins")}: [`,
  `    ${hl.fn("semaphore")}({`,
  `      ${hl.prop("defaultPlan")}: ${hl.str('"free"')},`,
  `      ${hl.prop("gateway")}: ${hl.str('"nomba"')},`,
  `      ${hl.comment("// Billing profile auto-provisioned on signup")}`,
  `    })`,
  `  ]`,
  `})`,
].join("\n")

const entitlementSnippet = [
  `${hl.comment("// Check and consume an entitlement in one call")}`,
  `${hl.keyword("const")} result = ${hl.keyword("await")} semaphore.${hl.fn("check")}({`,
  `  ${hl.prop("userId")}: session.${hl.prop("userId")},`,
  `  ${hl.prop("feature")}: ${hl.str('"api_calls"')},`,
  `  ${hl.prop("consume")}: ${hl.type("1")},`,
  `})`,
  ``,
  `${hl.keyword("if")} (!result.${hl.prop("allowed")}) {`,
  `  ${hl.keyword("return")} ${hl.fn("json")}({ ${hl.prop("error")}: ${hl.str('"Limit reached"')} }, { ${hl.prop("status")}: ${hl.type("429")} })`,
  `}`,
  ``,
  `${hl.comment("// result.remaining → 94 | result.resetAt → <timestamp>")}`,
].join("\n")

// ─── Main App ────────────────────────────────────────────────────────────────

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="relative w-full bg-white font-['Space_Grotesk'] text-neutral-900 transition-colors duration-300 dark:bg-[#050505] dark:text-white">
        {/* Interactive Background — only covers the hero viewport */}
        <div className="pointer-events-auto fixed inset-0 z-0 h-screen w-screen">
          <BackgroundRippleEffect />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="pointer-events-auto fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-lg transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunIcon className="size-4" />
          ) : (
            <MoonIcon className="size-4" />
          )}
        </button>

        {/* ── Navbar ── */}
        <nav className="pointer-events-none fixed top-6 right-0 left-0 z-50 mx-auto flex w-full max-w-5xl justify-center px-6">
          <div
            className={`pointer-events-auto flex w-full items-center justify-between rounded-full border p-2 pl-6 transition-all duration-500 ${
              isScrolled
                ? "border-neutral-200 bg-white/70 shadow-md backdrop-blur-md dark:border-neutral-800 dark:bg-black/70"
                : "border-transparent bg-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Logo className="size-7 text-primary" />
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Semaphore
              </span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              {["Features", "Infrastructure", "Documentation"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Button className="rounded-full bg-neutral-900 px-6 py-5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                  Get Started
                </Button>
              </div>
              <button
                className="flex items-center justify-center rounded-full p-2 text-neutral-900 hover:bg-neutral-100 md:hidden dark:text-white dark:hover:bg-neutral-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="pointer-events-auto fixed top-24 right-6 left-6 z-40 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-xl backdrop-blur-lg md:hidden dark:border-neutral-800 dark:bg-black/95">
            {["Features", "Infrastructure", "Documentation"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-900 dark:text-white"
              >
                {item}
              </a>
            ))}
            <Button className="mt-2 w-full rounded-full bg-neutral-900 py-6 text-lg font-medium text-white dark:bg-white dark:text-black">
              Get Started
            </Button>
          </div>
        )}

        {/* ── Content ── */}
        <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-start overflow-hidden">
          {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
          <main className="flex w-full flex-col items-center justify-center px-6 pt-48 pb-16 text-center">
            <div className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-sm dark:border-neutral-700 dark:bg-white/5 dark:text-neutral-400">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Now in public beta · Powered by Nomba
            </div>

            <h1 className="pointer-events-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl dark:text-white">
              Subscription Management,{" "}
              <span className="relative">
                <span className="relative z-10">Simplified.</span>
              </span>
            </h1>

            <p className="pointer-events-auto mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              A portable billing engine that sits beside your auth provider,
              handles entitlements automatically, and speaks every database
              dialect — without pulling you into a SaaS black box.
            </p>

            <div className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button className="h-14 rounded-full bg-neutral-900 px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Get Started
              </Button>
              <a
                href="#features"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Read the docs <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="pointer-events-auto mt-8 flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-600">
              <Check className="size-4 text-green-500" /> Edge-compatible
              <span className="mx-3 h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <Check className="size-4 text-green-500" /> Self-hostable
            </div>
          </main>

          {/* ── Video / Dashboard ── */}
          <section className="pointer-events-auto flex w-full flex-col items-center justify-center px-6 pb-24">
            <div className="flex w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
              <video
                src="/dashboard.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-full object-cover"
              />
            </div>
          </section>

          {/* ═══ FEATURES ════════════════════════════════════════════════════ */}
          <section
            id="features"
            className="pointer-events-auto w-full px-6 py-24"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-16 text-center">
                <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Capabilities
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                  Everything you need to scale
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    icon: <Repeat className="size-5" />,
                    title: "Automated Dunning",
                    desc: "Intelligently recover failed payments with automated retry schedules and smart customer notifications.",
                  },
                  {
                    icon: <BarChart3 className="size-5" />,
                    title: "Revenue Intelligence",
                    desc: "Track MRR, churn, and LTV in real-time. Actionable insights into your entire subscriber lifecycle.",
                  },
                  {
                    icon: <ShieldCheck className="size-5" />,
                    title: "Webhook Integrity",
                    desc: "Built-in signature verification and idempotency keys. Race conditions and double-processing are impossible.",
                  },
                  {
                    icon: <GitBranch className="size-5" />,
                    title: "Multi-Dialect SQL",
                    desc: "Postgres, SQLite, or D1 — write one query, run anywhere. No ORMs, no migrations, no surprises.",
                  },
                  {
                    icon: <Zap className="size-5" />,
                    title: "Sub-ms Entitlements",
                    desc: "Check, consume, and reset feature usage quotas in a single atomic database transaction.",
                  },
                  {
                    icon: <Lock className="size-5" />,
                    title: "Auth Bridge",
                    desc: "Hooks that provision billing profiles the moment a user registers. Zero sync code, ever.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="group flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-7 backdrop-blur-sm transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#0a0a0c]/80 dark:hover:border-neutral-700"
                  >
                    <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      {icon}
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ INFRASTRUCTURE ══════════════════════════════════════════════ */}
          <section
            id="infrastructure"
            className="pointer-events-auto w-full px-6 py-24"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-16 text-center">
                <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Infrastructure
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                  Your stack. Your rules.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
                  Semaphore is a library, not a SaaS cage. Deploy it anywhere
                  your code runs.
                </p>
              </div>

              {/* Runtime Row */}
              <div className="mb-6">
                <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Runtimes
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      logo: <BunLogo className="size-9" />,
                      name: "Bun",
                      label: "Native runtime support",
                      detail:
                        "First-class Bun compatibility. Runs at startup with zero overhead.",
                    },
                    {
                      logo: <NodeJsLogo className="size-9" />,
                      name: "Node.js",
                      label: "LTS 18+",
                      detail:
                        "Drops into any existing Node.js server. ESM and CJS both supported.",
                    },
                    {
                      logo: <CloudflareLogo className="size-9" />,
                      name: "Cloudflare Workers",
                      label: "Edge-native",
                      detail:
                        "Runs natively at the edge with D1 bindings. Sub-millisecond global latency.",
                    },
                  ].map(({ logo, name, label, detail }) => (
                    <div
                      key={name}
                      className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80"
                    >
                      <div className="flex items-center gap-3">
                        {logo}
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {name}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-600">
                            {label}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Row */}
              <div className="mb-6">
                <p className="mb-4 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Databases
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[
                    {
                      logo: <PostgresLogo className="size-9" />,
                      name: "PostgreSQL",
                      label: "DigitalOcean · Supabase · Neon",
                      detail:
                        "High-concurrency workloads. Full ACID compliance with connection pooling.",
                    },
                    {
                      logo: <SQLiteLogo className="size-9" />,
                      name: "SQLite",
                      label: "Local · Turso · Embedded",
                      detail:
                        "Zero-latency reads for single-tenant apps. Ideal for self-hosted deployments.",
                    },
                    {
                      logo: <CloudflareLogo className="size-9" />,
                      name: "Cloudflare D1",
                      label: "Serverless SQLite at the edge",
                      detail:
                        "D1 bindings are first-class. The dialect adapter handles all translation.",
                    },
                  ].map(({ logo, name, label, detail }) => (
                    <div
                      key={name}
                      className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80"
                    >
                      <div className="flex items-center gap-3">
                        {logo}
                        <div>
                          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            {name}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-600">
                            {label}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats strip */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { stat: "24kb", label: "gzipped bundle" },
                  { stat: "<1ms", label: "entitlement check" },
                  { stat: "0", label: "peer dependencies" },
                  { stat: "3", label: "supported dialects" },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 py-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80"
                  >
                    <span className="bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text text-4xl font-bold tracking-tighter text-transparent dark:from-white dark:to-neutral-600">
                      {stat}
                    </span>
                    <span className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-600">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ AUTH BRIDGE ═════════════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                    Auth Bridge
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                    Sign up happens once.
                    <br />
                    Billing just follows.
                  </h2>
                  <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Drop the Semaphore plugin into your Better Auth config. From
                    that point forward, every new user registration
                    automatically creates a billing profile, assigns a default
                    plan, and wires up to Nomba — without a single line of sync
                    code.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Auto-provision billing profiles on signup",
                      "Assign plans and entitlements instantly",
                      "Works with any Better Auth strategy — OAuth, magic link, passkey",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                    <BetterAuthLogo className="size-6 shrink-0" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Better Auth
                    </span>
                    <span className="ml-auto rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                    <Logo className="size-6 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Semaphore
                    </span>
                    <span className="ml-auto rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                      Billing Engine
                    </span>
                  </div>
                  <div className="flex items-center justify-center py-1">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white/50 px-4 py-3 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                    <NombaLogo className="w-14 text-primary" />
                    <span className="ml-auto rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                      Payment Gateway
                    </span>
                  </div>
                  <CodeBlock code={authBridgeSnippet} language="TypeScript" />
                </div>
              </div>
            </div>
          </section>

          {/* ═══ ENTITLEMENT ENGINE ══════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                {/* Code first on desktop */}
                <div className="order-2 lg:order-1">
                  <CodeBlock code={entitlementSnippet} language="TypeScript" />
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "API Calls",
                        used: 6,
                        total: 100,
                        color: "bg-blue-500",
                      },
                      {
                        label: "Seats",
                        used: 3,
                        total: 5,
                        color: "bg-purple-500",
                      },
                      {
                        label: "Storage",
                        used: 8,
                        total: 10,
                        color: "bg-amber-500",
                      },
                    ].map(({ label, used, total, color }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-neutral-200 bg-white/50 p-4 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80"
                      >
                        <p className="text-xs font-medium text-neutral-900 dark:text-white">
                          {label}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {used} / {total}
                        </p>
                        <div className="mt-2.5 h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
                          <div
                            className={`h-1.5 rounded-full ${color}`}
                            style={{ width: `${(used / total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                    Entitlement Engine
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                    Feature limits that
                    <br />
                    just work.
                  </h2>
                  <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Define entitlements once against a plan. Semaphore tracks
                    usage, enforces limits, and performs lazy resets
                    automatically — all within a single atomic transaction. No
                    cron jobs. No eventual-consistency bugs.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Atomic check-and-consume in one round-trip",
                      "Lazy balance resets tied to billing cycles",
                      "Per-feature limits with remaining balance returned",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-400"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ INSTALL CTA ═════════════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white/50 px-8 py-16 text-center backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                {/* Background glow */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="h-64 w-64 rounded-full bg-neutral-300/20 blur-3xl dark:bg-white/5" />
                </div>
                <p className="relative mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Get started in minutes
                </p>
                <h2 className="relative text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                  One install. Full billing stack.
                </h2>
                <p className="relative mx-auto mt-4 max-w-lg text-neutral-600 dark:text-neutral-400">
                  No credit card. No ops work. Run locally during development,
                  deploy anywhere in production.
                </p>
                <div className="relative mt-8 inline-flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-4 font-mono text-sm text-neutral-800 dark:border-neutral-700 dark:bg-black dark:text-neutral-300">
                  <span className="text-neutral-400 select-none">$</span>
                  <span>npm install @semaphore/core</span>
                </div>
                <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button className="h-14 rounded-full bg-neutral-900 px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                    Get Started Free
                  </Button>
                  <a
                    href="#docs"
                    className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    View the docs <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ FOOTER ══════════════════════════════════════════════════════ */}
          <footer className="pointer-events-auto w-full border-t border-neutral-200 bg-white/50 px-6 py-12 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#050505]/50">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex flex-col items-center gap-2 md:items-start">
                <div className="flex items-center gap-2">
                  <Logo className="size-5 text-primary" />
                  <span className="font-bold text-neutral-900 dark:text-white">
                    Semaphore
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  © 2026 Treffen Labs. All rights reserved.
                </p>
              </div>
              <div className="flex gap-8">
                {[
                  { label: "Documentation", href: "#docs" },
                  { label: "GitHub", href: "https://github.com" },
                  { label: "Support", href: "mailto:support@semaphore.com" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
