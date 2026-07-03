import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { SunIcon, MoonIcon } from "lucide-react"
import { Menu, X } from "lucide-react"
import Logo from "./components/Logo"
import NombaLogo from "./components/NombaLogo"
import { Repeat, BarChart3, ShieldCheck } from "lucide-react"

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="relative min-h-[300vh] w-full bg-white font-['Space_Grotesk'] text-neutral-900 transition-colors duration-300 dark:bg-[#050505] dark:text-white">
        {/* Interactive Background */}
        <div
          className="pointer-events-auto fixed inset-0 z-0 h-screen w-screen"
          onClick={() => console.log("Debug: Background wrapper clicked")}
        >
          <BackgroundRippleEffect />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="pointer-events-auto fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-lg transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-black dark:text-white dark:hover:bg-neutral-900"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Unified Pill Navbar */}
        <nav className="pointer-events-none fixed top-6 right-0 left-0 z-50 mx-auto flex w-full max-w-5xl justify-center px-6">
          <div
            className={`pointer-events-auto flex w-full items-center justify-between rounded-full border p-2 pl-6 transition-all duration-500 ${
              isScrolled
                ? "border-neutral-200 bg-white/70 shadow-md backdrop-blur-md dark:border-neutral-800 dark:bg-black/70"
                : "border-transparent bg-transparent"
            }`}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo className="size-7 text-primary" />
              <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                Semaphore
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Features
              </a>
              <a
                href="#infrastructure"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Infrastructure
              </a>
              <a
                href="#docs"
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
              >
                Documentation
              </a>
            </div>

            {/* CTA Button & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <Button className="rounded-full bg-neutral-900 px-6 py-5 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                  Get Started
                </Button>
              </div>

              <button
                className="flex items-center justify-center rounded-full p-2 text-neutral-900 transition-colors hover:bg-neutral-100 md:hidden dark:text-white dark:hover:bg-neutral-800"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="pointer-events-auto fixed top-24 right-6 left-6 z-40 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-xl backdrop-blur-lg md:hidden dark:border-neutral-800 dark:bg-black/95">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              Features
            </a>
            <a
              href="#infrastructure"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              Infrastructure
            </a>
            <a
              href="#docs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
            >
              Documentation
            </a>
            <Button className="mt-2 w-full rounded-full bg-neutral-900 py-6 text-lg font-medium text-white dark:bg-white dark:text-black">
              Get Started
            </Button>
          </div>
        )}

        {/* Content Wrapper */}
        <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-start overflow-hidden">
          {/* Hero Section */}
          <main className="flex w-full flex-col items-center justify-center px-6 pt-48 pb-16 text-center">
            <h1 className="pointer-events-auto max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl dark:text-white">
              Subscription Management, Simplified.
            </h1>

            <p className="pointer-events-auto mx-auto mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Simplify your billing. Semaphore automates recurring revenue,
              dunning, and insights so you can focus on your product instead of
              payment infrastructure.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
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

            <div className="pointer-events-auto mt-10">
              <Button className="h-14 rounded-full bg-neutral-900 px-10 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200">
                Get Started
              </Button>
            </div>
          </main>

          {/* Video Dashboard Section */}
          <section className="pointer-events-auto flex w-full flex-col items-center justify-center px-6 pb-20">
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

          {/* Features Section */}
          <section
            id="features"
            className="pointer-events-auto flex w-full flex-col items-center justify-center px-6 py-24"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                  Everything you need to scale
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Feature 1 */}
                <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="mb-4 text-primary">
                    <Repeat className="size-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Automated Dunning
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Intelligently recover failed payments with automated retry
                    schedules and customer notifications.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="mb-4 text-primary">
                    <BarChart3 className="size-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Revenue Intelligence
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Track MRR, churn, and LTV in real-time. Gain actionable
                    insights into your subscriber lifecycle.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col rounded-2xl border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="mb-4 text-primary">
                    <ShieldCheck className="size-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Secure Webhooks
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Stay in sync with your users. Securely receive event data
                    for every subscription lifecycle change.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Infrastructure and Integration Grid */}
          <section
            id="infrastructure"
            className="pointer-events-auto flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
          >
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-white">
                  Built for modern stacks
                </h2>
                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                  Integrate our subscription engine in minutes with our
                  lightweight SDK.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Performance Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 p-12 text-center backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Built for speed
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Small JS library, fast load times, and asset optimization.
                  </p>
                  <div className="mt-12 bg-gradient-to-b from-neutral-900 to-neutral-500 bg-clip-text text-7xl font-bold tracking-tighter text-transparent dark:from-white dark:to-neutral-600">
                    24kb
                  </div>
                </div>

                {/* Installation Card */}
                <div className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white/50 p-10 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Embed on your favorite platform
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                      React, Next.js, Node, or vanilla JavaScript.
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.955 21l-7.703-4.52V7.435L11.955 3l7.703 4.435v9.045L11.955 21zm-6.22-5.41l6.22 3.65 6.22-3.65V8.34l-6.22-3.58-6.22 3.58v7.15z" />
                      </svg>
                      Copy to React
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                      Copy to Next.js
                    </Button>
                  </div>

                  <div className="mt-6 w-full rounded-md bg-neutral-100 p-4 font-mono text-sm text-neutral-800 dark:bg-black dark:text-neutral-300">
                    npm install @semaphore/react
                  </div>
                </div>

                {/* System Architecture Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 p-10 text-center backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Zero dependencies
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Keeps your bundle size strictly clean. No bloated
                    sub-packages.
                  </p>
                </div>

                {/* Webhook Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white/50 p-10 text-center backdrop-blur-sm dark:border-neutral-800 dark:bg-[#0a0a0c]/80">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    Realtime Webhooks
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Events processed and delivered with sub-50ms latency.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Footer */}
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
                <a
                  href="#docs"
                  className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Documentation
                </a>
                <a
                  href="https://github.com"
                  className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="mailto:support@semaphore.com"
                  className="text-sm text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Support
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
