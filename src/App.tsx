import { useState, useEffect } from "react"
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
  Repeat,
  GitBranch,
  Lock,
  Server,
  Layers,
  Percent,
} from "lucide-react"
import Logo from "./components/Logo"
import NombaLogo from "./components/NombaLogo"
import NodeJsLogo from "./components/NodeJsLogo"
import BunLogo from "./components/BunLogo"
import PostgresLogo from "./components/PostgresLogo"
import SQLiteLogo from "./components/SqliteLogo"
import { useTheme } from "@/components/theme-provider"

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
      <pre className="p-5 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
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

const serverInitSnippet = [
  `${hl.comment("// Initialize Semaphore Pay engine")}`,
  `${hl.keyword("import")} { createSemaphoreEngine, createSemaphorePayRouter } ${hl.keyword("from")} ${hl.str('"@semaphore-pay/server"')}`,
  ``,
  `${hl.keyword("const")} engine = createSemaphoreEngine({`,
  `  ${hl.prop("db")}: db,`,
  `  ${hl.prop("nomba")}: {`,
  `    ${hl.prop("clientId")}: ${hl.str('"..."')},`,
  `    ${hl.prop("clientSecret")}: ${hl.str('"..."')},`,
  `    ${hl.prop("accountId")}: ${hl.str('"..."')},`,
  `    ${hl.prop("callbackUrl")}: ${hl.str('"https://yourapp.com/billing/callback"')},`,
  `  },`,
  `  ${hl.prop("webhookSecret")}: ${hl.str('"whsec_..."')},`,
  `})`,
  ``,
  `${hl.keyword("const")} router = createSemaphorePayRouter(engine)`,
].join("\n")

const clientSnippet = [
  `${hl.comment("// Client-side entitlement check (public key)")}`,
  `${hl.keyword("import")} { SemaphorePayClient } ${hl.keyword("from")} ${hl.str('"@semaphore-pay/client"')}`,
  ``,
  `${hl.keyword("const")} semaphore = ${hl.keyword("new")} SemaphorePayClient({`,
  `  ${hl.prop("baseUrl")}: ${hl.str('"https://api.yourapp.com"')},`,
  `  ${hl.prop("apiKey")}: ${hl.str('"pk_live_..."')},`,
  `  ${hl.prop("collectionId")}: ${hl.str('"col_..."')},`,
  `})`,
  ``,
  `${hl.keyword("const")} result = ${hl.keyword("await")} semaphore.${hl.fn("checkEntitlement")}({`,
  `  ${hl.prop("customerId")}: ${hl.str('"cust_..."')},`,
  `  ${hl.prop("featureId")}: ${hl.str('"api_calls"')},`,
  `  ${hl.prop("required")}: ${hl.type("1")},`,
  `})`,
  ``,
  `${hl.keyword("if")} (!result.${hl.prop("allowed")}) {`,
  `  ${hl.keyword("return")} ${hl.fn("json")}({ ${hl.prop("error")}: ${hl.str('"Limit reached"')} }, { ${hl.prop("status")}: ${hl.type("429")} })`,
  `}`,
].join("\n")

const entitlementSnippet = [
  `${hl.comment("// Report metered usage (atomic check-and-consume)")}`,
  `${hl.keyword("import")} { SemaphorePayClient } ${hl.keyword("from")} ${hl.str('"@semaphore-pay/client"')}`,
  ``,
  `${hl.keyword("const")} semaphore = ${hl.keyword("new")} SemaphorePayClient({`,
  `  ${hl.prop("baseUrl")}: ${hl.str('"https://api.yourapp.com"')},`,
  `  ${hl.prop("apiKey")}: ${hl.str('"pk_live_..."')},`,
  `  ${hl.prop("collectionId")}: ${hl.str('"col_..."')},`,
  `})`,
  ``,
  `${hl.keyword("const")} result = await semaphore.${hl.fn("reportEntitlement")}({`,
  `  ${hl.prop("customerId")}: ${hl.str('"cust_..."')},`,
  `  ${hl.prop("featureId")}: ${hl.str('"api_calls"')},`,
  `  ${hl.prop("amount")}: ${hl.type("1")},`,
  `})`,
  ``,
  `${hl.keyword("if")} (!result.${hl.prop("success")}) {`,
  `  ${hl.keyword("return")} ${hl.fn("json")}({ ${hl.prop("error")}: ${hl.str('"Quota exceeded"')} }, { ${hl.prop("status")}: ${hl.type("429")} })`,
  `}`,
  ``,
  `${hl.comment("// result.balance → { limit, remaining, resetAt, unlimited }")}`,
].join("\n")

// ─── Main App ────────────────────────────────────────────────────────────────

export function App() {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const goToDashboard = () => {
    window.location.href = "https://dash.semaphorepay.tech"
  }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="relative w-full bg-white font-['Space_Grotesk'] text-neutral-900 transition-colors duration-300 dark:bg-[#050505] dark:text-white">
        {/* Interactive Background — only covers the hero viewport */}
        <div className="pointer-events-auto fixed inset-0 z-0 h-screen w-screen">
          <BackgroundRippleEffect />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
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
              {[
                { label: "Features", href: "#features" },
                { label: "Infrastructure", href: "#infrastructure" },
                { label: "Dashboard", href: "https://dash.semaphorepay.tech" },
                {
                  label: "Documentation",
                  href: "https://docs.semaphorepay.tech",
                },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Button
                  onClick={goToDashboard}
                  className="h-11 rounded-full bg-neutral-900 px-7 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Create Account
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
            {[
              { label: "Features", href: "#features" },
              { label: "Infrastructure", href: "#infrastructure" },
              { label: "Dashboard", href: "https://dash.semaphorepay.tech" },
              {
                label: "Documentation",
                href: "https://docs.semaphorepay.tech",
              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-900 dark:text-white"
              >
                {label}
              </a>
            ))}
            <Button
              onClick={goToDashboard}
              className="mt-2 h-14 w-full rounded-full bg-neutral-900 text-base font-semibold text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              Create Account
            </Button>
          </div>
        )}

        {/* ── Content ── */}
        <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-start overflow-hidden">
          {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
          <main className="flex w-full flex-col items-center justify-center px-6 pt-48 pb-16 text-center">
            <div className="mt-4 mb-2 flex items-center justify-center gap-3">
              <span className="pointer-events-auto text-lg text-neutral-600 dark:text-neutral-400">
                Powered by
              </span>
              <a
                href="https://nomba.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto flex cursor-pointer items-center justify-center transition-all duration-300 hover:brightness-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                aria-label="Visit Nomba website"
              >
                <NombaLogo className="w-20 text-primary" />
              </a>
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
              <Button
                onClick={goToDashboard}
                className="h-14 rounded-full bg-neutral-900 px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                Create Account
              </Button>
              <a
                href="https://semaphorepay-demo.pages.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Try the demo <ArrowRight className="size-4" />
              </a>
              <a
                href="https://docs.semaphorepay.tech"
                className="flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Read the docs <ArrowRight className="size-4" />
              </a>
            </div>
          </main>

          {/* ── Image / Dashboard ── */}
          <section className="pointer-events-auto flex w-full flex-col items-center justify-center px-6 pb-24">
            <div className="flex w-full max-w-5xl flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
              <img
                src="/dashboard.png"
                alt="Dashboard preview"
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
                  Billing engine, not a billing platform
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    icon: <Repeat className="size-5" />,
                    title: "Subscriptions & Plans",
                    desc: "Create plans with trial periods, monthly/yearly billing, and per-feature entitlements. Nomba checkout with card, bank transfer, USSD, QR, and more. Supports NGN, CDF, and USD.",
                  },
                  {
                    icon: <Percent className="size-5" />,
                    title: "Entitlement Engine",
                    desc: "Boolean flags and metered quotas with atomic check-and-consume. Lazy resets tied to billing cycles — no cron needed.",
                  },
                  {
                    icon: <ShieldCheck className="size-5" />,
                    title: "Webhook Integrity",
                    desc: "Built-in signature verification and idempotency keys. Race conditions and double-processing are impossible.",
                  },
                  {
                    icon: <GitBranch className="size-5" />,
                    title: "Multi-Dialect SQL",
                    desc: "Postgres, SQLite, or D1 — write one query, run anywhere. Drizzle ORM with zero migration overhead.",
                  },
                  {
                    icon: <Zap className="size-5" />,
                    title: "Sub-ms Entitlements",
                    desc: "Check, consume, and reset feature usage quotas in a single atomic database transaction.",
                  },
                  {
                    icon: <Lock className="size-5" />,
                    title: "Auth Bridge",
                    desc: "Better Auth plugin provisions billing profiles on signup. Zero sync code, ever.",
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
                  { stat: "~60kb", label: "server bundle" },
                  { stat: "<1ms", label: "entitlement check" },
                  { stat: "4", label: "deps (server)" },
                  { stat: "3", label: "SQL dialects" },
                ].map(({ stat, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 py-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80"
                  >
                    <span className="bg-linear-to-b from-neutral-900 to-neutral-500 bg-clip-text text-4xl font-bold tracking-tighter text-transparent dark:from-white dark:to-neutral-600">
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

          {/* ═══ SERVER SETUP ═══════════════════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                    Server Setup
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                    Initialize in seconds.
                    <br />
                    Own your billing stack.
                  </h2>
                  <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    Drop Semaphore Pay into any Hono app. Configure your
                    database, connect Nomba, and you have a complete billing
                    engine — subscriptions, entitlements, dunning, webhooks —
                    running on your infrastructure.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "SQLite, PostgreSQL, or Cloudflare D1 — same API",
                      "Hono router mounts at /billing with zero config",
                      "Better Auth plugin auto-creates billing profiles",
                      "Cron jobs handle dunning, renewals, and cancellations",
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
                  <CodeBlock code={serverInitSnippet} language="TypeScript" />
                </div>
              </div>
            </div>
          </section>

          {/* ═══ CLIENT USAGE ══════════════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                {/* Code first on desktop */}
                <div className="order-2 lg:order-1">
                  <CodeBlock code={clientSnippet} language="TypeScript" />
                </div>
                <div className="order-1 lg:order-2">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                    Client SDK
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl dark:text-white">
                    Check entitlements
                    <br />
                    in one call.
                  </h2>
                  <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
                    The client SDK is tiny (~2KB gzipped) and works in any
                    environment — React, React Native, Vue, Svelte, or vanilla
                    JS. Call checkEntitlement once and get the remaining balance,
                    reset timestamp, and whether the action is allowed.
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {[
                      "Atomic check-and-consume in one round-trip",
                      "Lazy balance resets tied to billing cycles",
                      "Per-feature limits with remaining balance returned",
                      "React Native Paywall and EntitlementGuard components",
                      "Works in React, Vue, Svelte, and edge runtimes",
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

          {/* ═══ ENTITLEMENT ENGINE ══════════════════════════════════════════ */}
          <section className="pointer-events-auto w-full px-6 py-24">
            <div className="mx-auto w-full max-w-5xl">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                {/* Code first on desktop */}
                <div className="order-2 lg:order-1">
                  <CodeBlock code={entitlementSnippet} language="TypeScript" />
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

          {/* ═══ PRICING ═══════════════════════════════════════════════════════ */}
          <section
            id="pricing"
            className="pointer-events-auto w-full px-6 py-24"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-16 text-center">
                <p className="mb-3 text-xs font-semibold tracking-widest text-neutral-500 uppercase dark:text-neutral-600">
                  Pricing
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                  Self-host free. Or let us run it.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
                  Two ways to use Semaphore — same engine, different ops burden.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Self-hosted */}
                <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                      <Server className="size-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Self-Hosted
                    </h3>
                  </div>
                  <div className="mb-6 text-4xl font-bold text-neutral-900 dark:text-white">
                    $0
                  </div>
                  <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                    Run on your infrastructure. Full source, no limits.
                  </p>
                  <ul className="mb-8 space-y-2.5">
                    {[
                      "Unlimited subscriptions & customers",
                      "All SQL dialects (Postgres, SQLite, D1)",
                      "Better Auth plugin included",
                      "Nomba gateway built-in",
                      "You handle ops, scaling, uptime",
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
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-full border-neutral-300 bg-transparent px-7 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-900"
                  >
                    <a href="https://github.com/semaphore-pay">
                      View on GitHub
                    </a>
                  </Button>
                </div>

                {/* Hosted */}
                <div className="relative flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-medium text-primary-foreground">
                      Popular
                    </span>
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Layers className="size-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Semaphore Cloud
                    </h3>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                      1.35%
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {" "}
                      per successful transaction
                    </span>
                  </div>
                  <p className="mb-6 text-neutral-600 dark:text-neutral-400">
                    We run it, you build. No monthly fees, no hidden costs.
                  </p>
                  <ul className="mb-8 space-y-2.5">
                    {[
                      "Fully managed infrastructure",
                      "Automatic scaling & HA",
                      "Dashboard & analytics included",
                      "Email support (SLA available)",
                      "You focus on product, not ops",
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
                  <Button
                    onClick={goToDashboard}
                    className="h-12 w-full rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
                  >
                    Create Account
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ INSTALL CTA ═══════════════════════════════════════════════════════ */}
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
                  <span>npm install @semaphore-pay/server</span>
                </div>
                <div className="relative mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button
                    onClick={goToDashboard}
                    className="h-14 rounded-full bg-neutral-900 px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                  >
                    Create Account
                  </Button>
                  <a
                    href="https://semaphorepay-demo.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    Try the demo <ArrowRight className="size-4" />
                  </a>
                  <a
                    href="https://docs.semaphorepay.tech"
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
                  {
                    label: "Documentation",
                    href: "https://docs.semaphorepay.tech",
                  },
                  { label: "Dashboard", href: "https://dash.semaphorepay.tech" },
                  { label: "GitHub", href: "https://github.com/semaphore-pay" },
                  {
                    label: "Support",
                    href: "mailto:support@semaphorepay.tech",
                  },
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
