"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { CircleLoader, PacmanLoader } from "react-spinners";

const summaryCards = [
  { label: "Weekly sign-ins", value: "12,480", detail: "+14% from last week", tone: "warm" },
  { label: "New accounts", value: "1,248", detail: "+8% after the redesign", tone: "green" },
  { label: "Completion rate", value: "93%", detail: "Fewer people drop during onboarding", tone: "blue" },
];

const activityFeed = [
  { title: "New team invite accepted", detail: "Design Ops joined the workspace 3 minutes ago." },
  { title: "Security check completed", detail: "Password policy and session settings are up to date." },
  { title: "Welcome email sent", detail: "Three new users received their onboarding sequence." },
];

const checklist = [
  { title: "Invite your first teammate", status: "Recommended next step" },
  { title: "Review password policy", status: "Looks good" },
  { title: "Open analytics report", status: "Ready to explore" },
];

const traffic = [
  { label: "Organic", value: 72 },
  { label: "Direct", value: 54 },
  { label: "Referral", value: 38 },
  { label: "Social", value: 29 },
];

function toneClasses(tone) {
  if (tone === "green") {
    return "from-[#1f5c3f] to-[#54b56f]";
  }
  if (tone === "blue") {
    return "from-[#315f7d] to-[#67b7d8]";
  }
  return "from-[#b34f37] to-[#f26d4c]";
}

export default function DashboardPage() {
  const { data, isPending } = useSession();


  return (
    isPending ? (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-[var(--muted)]"><CircleLoader /></p>
      </div>
    ) : (
       <DashboardContent user={data?.user} />
    )
  );
}

function DashboardContent({ user }) {
  console.log(user);
  
  return (

    <main className="min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="glass-panel flex flex-col gap-6 rounded-[2rem] p-6 sm:p-8 lg:items-end lg:flex-row 
         lg:justify-between">
          <div>
            <p className="eyebrow">Dashboard  </p>
            <h2>Welcome back, {user?.name} 👋 </h2>
            <h2>{user?.email}</h2>
            <h2>{user === undefined ? "Not signed in" : "Signed in"}</h2>
            <h1 className="display-title mt-3 text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
              A cleaner control center for your auth flows.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
              This page now feels lighter, more readable, and easier to navigate, with quick summaries,
              clear actions, and a calmer visual rhythm.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            <div>
              <Link href="/auth/signup" className="brand-button justify-center px-6 py-4 text-base">
                Add another account
              </Link>
              <Link href="/auth/signin" className="ghost-button justify-center px-6 py-4 text-base">
                Switch user
              </Link>
            </div>
            <Link href="/" onClick={() => { signOut() }} className="ghost-button justify-center px-6 py-4 text-base">
              Sign Out
            </Link>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          {summaryCards.map((card) => (
            <article
              key={card.label}
              className="glass-panel overflow-hidden rounded-[1.75rem] p-5"
            >
              <div className={`h-1.5 rounded-full bg-gradient-to-r ${toneClasses(card.tone)}`} />
              <p className="mt-5 text-sm text-[var(--muted)]">{card.label}</p>
              <p className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-[var(--accent-strong)]">{card.detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--accent-strong)]">Experience overview</p>
                <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
                  Your onboarding flow is trending in the right direction.
                </h2>
              </div>
              <span className="rounded-full bg-[rgba(84,181,111,0.14)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]">
                7-day snapshot
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[68, 82, 91].map((height, index) => (
                <div key={height} className="rounded-[1.5rem] bg-white/70 p-4 shadow-[0_12px_30px_rgba(23,49,39,0.06)]">
                  <div className="flex h-44 items-end gap-3">
                    {[height - 24, height - 8, height].map((value) => (
                      <div
                        key={value}
                        className="flex-1 rounded-t-[1rem] bg-[linear-gradient(180deg,rgba(31,92,63,0.18),rgba(242,109,76,0.8))]"
                        style={{ height: `${value}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-medium text-[var(--foreground)]">Stage 0{index + 1}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {index === 0 && "Discovery and first impression"}
                    {index === 1 && "Account creation and verification"}
                    {index === 2 && "Return visits and dashboard usage"}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--accent-strong)]">Traffic mix</p>
            <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
              Where people arrive from
            </h2>

            <div className="mt-8 space-y-5">
              {traffic.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]">
                    <span>{item.label}</span>
                    <span className="font-medium text-[var(--foreground)]">{item.value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-[rgba(27,36,29,0.08)]">
                    <div
                      className="h-3 rounded-full bg-[linear-gradient(90deg,#1f5c3f,#54b56f,#f4a26f)]"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--accent-strong)]">Next steps</p>
            <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
              Friendly guidance for new admins
            </h2>

            <div className="mt-8 space-y-4">
              {checklist.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-white/80 bg-white/70 px-5 py-4 shadow-[0_12px_30px_rgba(23,49,39,0.06)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(242,109,76,0.16)] text-sm font-semibold text-[var(--brand)]">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-base font-medium text-[var(--foreground)]">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--accent-strong)]">Recent activity</p>
            <h2 className="display-title mt-2 text-3xl font-semibold text-[var(--foreground)]">
              Useful updates without the noise
            </h2>

            <div className="mt-8 space-y-4">
              {activityFeed.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/80 bg-white/70 px-5 py-5 shadow-[0_12px_30px_rgba(23,49,39,0.06)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-medium text-[var(--foreground)]">{item.title}</p>
                    <span className="rounded-full bg-[rgba(31,92,63,0.12)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]">
                      Updated
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
