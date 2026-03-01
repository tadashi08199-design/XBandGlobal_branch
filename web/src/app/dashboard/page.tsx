import { redirect } from "next/navigation"
import { BadgeCheck, Coins, Layers3, Sparkles, UserRound } from "lucide-react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { DashboardShell } from "@/components/dashboard/DashboardShell"

export default async function DashboardPage() {
    const supabase = await createServerSupabaseClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

    if (!profile) {
        return (
            <DashboardShell userEmail={user.email ?? ""}>
                <div className="flex h-[60vh] items-center justify-center">
                    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#060d1f]/40 p-8 text-center backdrop-blur-md">
                        <h1 className="text-2xl font-bold text-white">Profile not found</h1>
                        <p className="mt-2 text-slate-400">
                            We could not load your account profile. Please contact support.
                        </p>
                    </div>
                </div>
            </DashboardShell>
        )
    }

    // If the user is a provider without a submitted application, send them to onboarding
    if (profile.role === "provider") {
        const { data: providerRow } = await supabase
            .from("providers")
            .select("id")
            .eq("profile_id", user.id)
            .maybeSingle()

        if (!providerRow) {
            redirect("/dashboard/onboarding")
        }
    }


    const cards = [
        {
            title: "Account role",
            value: profile.role,
            icon: UserRound,
            tone: "from-blue-600 to-blue-800",
            subtle: "glass-card border-white/50",
        },
        {
            title: "Available credits",
            value: String(profile.credits ?? 0),
            icon: Coins,
            tone: "from-amber-500 to-amber-700",
            subtle: "glass-card border-white/50",
        },
    ]

    return (
        <DashboardShell userEmail={user.email ?? ""}>
            <div className="mx-auto w-full max-w-6xl space-y-8">
                <section className="rounded-[2rem] border border-white/10 bg-[#060d1f]/40 p-6 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.8)] sm:p-8 relative overflow-hidden rise-in">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.05] to-transparent mix-blend-overlay" />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-3">
                            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-display uppercase tracking-[0.3em] text-primary backdrop-blur-md">
                                Control Center
                            </span>
                            <div>
                                <h1 className="text-3xl font-bold text-white sm:text-4xl">Platform Overview</h1>
                                <p className="mt-1 text-sm text-slate-300 sm:text-base">Welcome back to your workspace</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2">
                    {cards.map((item, idx) => (
                        <article key={item.title} className={`rise-in ${idx === 1 ? "rise-delay-1" : ""} rounded-[2rem] border border-white/10 bg-[#060d1f]/40 p-6 backdrop-blur-3xl shadow-xl relative overflow-hidden`}>
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent mix-blend-overlay" />
                            <div className="relative flex items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-display uppercase tracking-[0.2em] text-slate-400">{item.title}</p>
                                    <p className="text-3xl font-medium capitalize text-white">{item.value}</p>
                                </div>
                                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white ${item.tone}`}>
                                    <item.icon className="h-5 w-5" />
                                </span>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="rounded-[2rem] border border-white/10 bg-white/[0.015] p-6 backdrop-blur-3xl shadow-xl sm:p-8 relative overflow-hidden rise-in rise-delay-2">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent mix-blend-overlay" />
                    <div className="relative mb-6 flex items-center gap-3">
                        <Layers3 className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-medium text-white tracking-tight">What is next</h2>
                    </div>
                    <div className="relative grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
                            <p className="text-sm font-medium text-white tracking-tight">Country discovery</p>
                            <p className="mt-2 text-xs leading-relaxed text-slate-400">Find suitable jurisdictions by timeline and budget.</p>
                        </div>
                        <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
                            <p className="text-sm font-medium text-white tracking-tight">Provider shortlist</p>
                            <p className="mt-2 text-xs leading-relaxed text-slate-400">Compare vetted experts and service quality signals.</p>
                        </div>
                        <div className="rounded-2xl border border-white/12 bg-black/20 p-5">
                            <p className="text-sm font-medium text-white tracking-tight">Lead handoff</p>
                            <p className="mt-2 text-xs leading-relaxed text-slate-400">Use credits to unlock direct provider engagement.</p>
                        </div>
                    </div>
                </section>

                <section className="rounded-[2rem] border border-primary/20 bg-primary/[0.03] p-6 text-white sm:p-8 relative overflow-hidden rise-in rise-delay-3">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,210,255,0.1),transparent_50%)]" />
                    <div className="relative">
                        <p className="inline-flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.2em] text-primary">
                            <Sparkles className="h-3.5 w-3.5" /> upcoming capabilities
                        </p>
                        <h2 className="mt-4 text-2xl font-medium tracking-tight text-white sm:text-3xl">More power for upcoming epics</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            Additional dashboards, provider workflows, and admin tools will appear here as new product epics ship.
                        </p>
                        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[11px] font-display uppercase tracking-[0.15em] text-primary">
                            <BadgeCheck className="h-4 w-4" /> Foundation ready
                        </div>
                    </div>
                </section>
            </div>
        </DashboardShell>
    )
}
