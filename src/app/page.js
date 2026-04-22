"use client";

import Link from "next/link";

const highlights = [
  {
    title: "Fast setup",
    description: "Email and password auth that feels production-ready without a maze of config files.",
  },
  {
    title: "Clear flows",
    description: "Sign up, sign in, and dashboard screens now guide people instead of making them guess.",
  },
  {
    title: "Calmer UX",
    description: "Cleaner spacing, stronger contrast, and friendly copy make the product easier to trust.",
  },
];

const stats = [
  { value: "2 min", label: "Average setup" },
  { value: "99.9%", label: "Session uptime" },
  { value: "24/7", label: "Access control" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(242,109,76,0.18),_transparent_32%),radial-gradient(circle_at_top_right,_rgba(84,181,111,0.18),_transparent_24%),linear-gradient(180deg,_#fffaf4_0%,_#fff_48%,_#f4f7f3_100%)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(28,38,24,0.06),transparent)]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="glass-panel flex items-center justify-between rounded-full px-5 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1f5c3f,#f26d4c)] text-sm font-semibold text-white shadow-[0_12px_30px_rgba(31,92,63,0.28)]">
              BA
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-[var(--accent-strong)] uppercase">
                BetterAuth
              </p>
              <p className="text-sm text-[var(--muted)]">Authentication that feels polished from day one.</p>
            </div>
          </div>

          <nav className="hidden items-center gap-3 md:flex">
            <Link href="/auth/signin" className="ghost-button">
              Sign in
            </Link>
            <Link href="/auth/signup" className="brand-button">
              Create account
            </Link>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm text-[var(--accent-strong)] shadow-[0_10px_30px_rgba(33,53,39,0.08)] backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
              User-friendly auth for modern Next.js apps
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-[-0.06em] text-[var(--foreground)] sm:text-6xl">
                Safer sign-in, smoother onboarding, and a UI people actually enjoy using.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                BetterAuth now welcomes people with clearer calls to action, friendlier forms, and a
                dashboard that feels crisp instead of cluttered.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/auth/signup" className="brand-button justify-center px-6 py-4 text-base">
                Start free
              </Link>
              <Link href="/auth/signin" className="ghost-button justify-center px-6 py-4 text-base">
                I already have an account
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-panel rounded-3xl px-5 py-4">
                  <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">{stat.value}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[rgba(242,109,76,0.2)] blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[rgba(84,181,111,0.22)] blur-3xl" />

            <div className="glass-panel relative rounded-[2rem] p-5 shadow-[0_35px_90px_rgba(27,44,33,0.12)]">
              <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#173127_0%,#111d18_100%)] p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">Preview</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em]">Clean auth experience</h2>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">Live</span>
                </div>

                <div className="mt-6 space-y-4 rounded-[1.5rem] bg-white/6 p-5 backdrop-blur">
                  <div className="flex items-center justify-between rounded-2xl bg-white/8 px-4 py-3">
                    <div>
                      <p className="text-sm text-white/60">Conversion</p>
                      <p className="text-xl font-semibold">+18.4%</p>
                    </div>
                    <div className="rounded-2xl bg-[rgba(255,255,255,0.12)] px-3 py-2 text-sm text-white/80">
                      This week
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {highlights.map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[var(--brand-soft)]">
                            0{index + 1}
                          </span>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-white/65">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
