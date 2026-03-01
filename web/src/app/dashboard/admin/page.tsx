import { getPlatformMetrics } from "@/app/actions/admin"
import { adminGetProviders } from "@/app/actions/providers"
import { DashboardShell } from "@/components/dashboard/DashboardShell"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
    Users, Building2, CheckCircle2, Clock, MessageSquare,
    RotateCcw, CreditCard, ShieldCheck, ListChecks, Globe,
    ArrowUpRight,
} from "lucide-react"

export const metadata = { title: "Admin Overview | VISTAR" }

interface StatCardProps {
    label: string
    value: number | string
    icon: LucideIcon
    accent: string
    href?: string
}

function StatCard({ label, value, icon: Icon, accent, href }: StatCardProps) {
    const inner = (
        <div className={`group relative overflow-hidden rounded-2xl border bg-[#060D1E]/60 p-6 backdrop-blur-xl transition-all hover:border-white/20 ${accent}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
                    <p className="mt-2 text-4xl font-bold text-white">{value?.toLocaleString() ?? "—"}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                </div>
            </div>
            {href && (
                <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                    View details <ArrowUpRight className="w-3 h-3" />
                </div>
            )}
        </div>
    )

    return href ? <Link href={href}>{inner}</Link> : inner
}

const QUICK_LINKS = [
    {
        title: "Provider Queue",
        desc: "Review pending applications, verify or suspend providers.",
        href: "/dashboard/admin/providers",
        icon: ShieldCheck,
        accent: "border-blue-500/20 hover:bg-blue-500/5",
    },
    {
        title: "Lead Management",
        desc: "View all leads, issue refunds on disputes.",
        href: "/dashboard/admin/leads",
        icon: ListChecks,
        accent: "border-emerald-500/20 hover:bg-emerald-500/5",
    },
    {
        title: "Jurisdictions",
        desc: "Add or edit countries and their onboarding requirements.",
        href: "/dashboard/admin/countries",
        icon: Globe,
        accent: "border-amber-500/20 hover:bg-amber-500/5",
    },
]

export default async function AdminOverviewPage() {
    // Role gate
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect("/login")

    const { data: profile } = await supabase.from("profiles").select("email, role").eq("id", user.id).single()
    if (profile?.role !== "admin") redirect("/unauthorized")

    // Fetch data
    const [metrics, providers] = await Promise.all([
        getPlatformMetrics(),
        adminGetProviders("pending"),
    ])

    const stats: StatCardProps[] = [
        { label: "Total Users", value: metrics?.total_users ?? 0, icon: Users, accent: "border-white/10" },
        {
            label: "Verified Providers", value: metrics?.verified_providers ?? 0,
            icon: CheckCircle2, accent: "border-emerald-500/10",
        },
        {
            label: "Pending Approvals", value: providers.length,
            icon: Clock, accent: "border-amber-500/10", href: "/dashboard/admin/providers",
        },
        {
            label: "Total Leads", value: metrics?.total_leads ?? 0,
            icon: MessageSquare, accent: "border-white/10", href: "/dashboard/admin/leads",
        },
        {
            label: "Refunded Leads", value: metrics?.refunded_leads ?? 0,
            icon: RotateCcw, accent: "border-purple-500/10",
        },
        {
            label: "Credits Sold", value: metrics?.total_credits_sold ?? 0,
            icon: CreditCard, accent: "border-blue-500/10",
        },
    ]

    return (
        <DashboardShell userEmail={profile?.email ?? ""} userRole="admin">
            <div className="mx-auto w-full max-w-6xl space-y-10">
                {/* Header */}
                <div className="border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-blue-500" />
                        Admin Overview
                    </h1>
                    <p className="mt-2 text-slate-400">Platform metrics and operational controls.</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                    {stats.map((s) => <StatCard key={s.label} {...s} />)}
                </div>

                {/* Quick Nav */}
                <div>
                    <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-4">Operations</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {QUICK_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`group flex flex-col gap-3 rounded-2xl border bg-white/[0.02] p-6 backdrop-blur-xl transition-all ${l.accent}`}
                            >
                                <div className="flex items-center justify-between">
                                    <l.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                    <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{l.title}</p>
                                    <p className="text-sm text-slate-500 mt-0.5">{l.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardShell>
    )
}
