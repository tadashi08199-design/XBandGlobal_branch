"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Coins, LayoutDashboard, UserCircle, LogOut, ChevronRight,
    ShieldCheck, MessageSquare, Globe, ListChecks,
} from "lucide-react"
import { VistarLogo } from "@/components/ui/VistarLogo"
import { LogoutButton } from "@/components/auth/LogoutButton"

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Messages", href: "/dashboard/leads", icon: MessageSquare },
    { name: "Credits", href: "/dashboard/credits", icon: Coins },
]

const adminNavigation = [
    { name: "Admin Overview", href: "/dashboard/admin", icon: ShieldCheck },
    { name: "Providers", href: "/dashboard/admin/providers", icon: ListChecks },
    { name: "Lead Management", href: "/dashboard/admin/leads", icon: MessageSquare },
    { name: "Jurisdictions", href: "/dashboard/admin/countries", icon: Globe },
]

export function DashboardShell({
    children,
    userEmail,
    userRole,
}: {
    children: ReactNode
    userEmail: string
    userRole?: string
}) {
    const pathname = usePathname()
    const isAdmin = userRole === "admin"

    return (
        <div className="flex min-h-screen bg-[#02040a] text-slate-300">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#040814]/80 backdrop-blur-xl">
                <div className="flex h-16 items-center gap-3 px-6 shadow-sm">
                    <VistarLogo className="h-6 w-6" />
                    <span className="font-display text-lg uppercase tracking-wider text-white">VISTAR</span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                    {/* Standard nav */}
                    <nav className="flex flex-col gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                                        }`}
                                >
                                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-slate-500 group-hover:text-slate-300"}`} />
                                    {item.name}
                                    {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary/50" />}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Admin nav — rendered only for admins */}
                    {isAdmin && (
                        <div>
                            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Admin</p>
                            <nav className="flex flex-col gap-1">
                                {adminNavigation.map((item) => {
                                    const isActive = pathname.startsWith(item.href)
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${isActive
                                                ? "bg-blue-500/10 text-blue-300"
                                                : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
                                                }`}
                                        >
                                            <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"}`} />
                                            {item.name}
                                            {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 text-blue-400/50" />}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                    )}
                </div>

                <div className="border-t border-white/10 p-4">
                    <div className="flex items-center gap-3 rounded-lg bg-white/[0.02] p-3 border border-white/5">
                        <UserCircle className="h-8 w-8 text-primary" />
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-xs font-semibold text-white">{userEmail}</p>
                            <p className="text-[10px] uppercase tracking-widest text-primary/80">{isAdmin ? "Admin" : "Operator"}</p>
                        </div>
                    </div>
                    <div className="mt-3">
                        <LogoutButton variant="ghost" className="w-full justify-start gap-3 px-3 py-2 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400">
                            <LogOut className="h-4 w-4 shrink-0" />
                            Sign out
                        </LogoutButton>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pl-64 relative">
                {/* Background effects for main content area */}
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden pl-64">
                    {/* Dark base */}
                    <div className="absolute inset-0 bg-[#02040a] z-0" />

                    {/* Luminous Glows */}
                    <div className="absolute top-[10%] left-[20%] h-[50%] w-[50%] bg-cyan-500/5 blur-[120px] rounded-full mix-blend-screen z-0" />
                    <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full mix-blend-screen z-0" />

                    {/* Fine grain overlay without external asset requests */}
                    <div
                        className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(45deg, rgba(255,255,255,0.08) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.08) 75%, transparent 75%, transparent)",
                            backgroundSize: "3px 3px",
                        }}
                    />
                </div>

                <div className="relative z-10 w-full px-8 py-8 lg:px-12">
                    {children}
                </div>
            </main>
        </div>
    )
}
