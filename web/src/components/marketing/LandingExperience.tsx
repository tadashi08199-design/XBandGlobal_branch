"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion"
import { useEffect, useMemo, useRef, useState, useCallback, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react"
import {
    ArrowRight, Orbit, Shield, Compass,
    Search, Users, MessageSquare, Briefcase
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Hero3D } from "./Hero3D"
import { JurisdictionCarousel } from "./JurisdictionCarousel"
import { cn } from "@/lib/utils"

/* --- Types --------------------------------------------------------------- */
type LandingMetrics = { activeCountries: number; verifiedProviders: number; publishedReviews: number }
type StatItem = { value: string; label: string }
type FeatureItem = {
    title: string
    subtitle: string
    desc: string
    image: string
    icon: typeof Orbit
    tone: "field" | "midnight" | "sand"
}

const FEATURES: FeatureItem[] = [
    {
        title: "Jurisdictional Intelligence",
        subtitle: "The Discovery Engine",
        desc: "Access structured cost models and tax treaty data across dozens of jurisdictions. VISTAR eliminates manual research by centralizing regulatory requirements and cost structures in one predictive interface.",
        icon: Orbit,
        image: "/images/discovery.png",
        tone: "field",
    },
    {
        title: "Vetted Provider Network",
        subtitle: "The Trust Surface",
        desc: "Connect with incorporation experts who are individually verified and checked. Our platform is built around immutable audit trails and transparent reviews, so every executive action is protected.",
        icon: Shield,
        image: "/images/trust.png",
        tone: "midnight",
    },
    {
        title: "Institutional Execution",
        subtitle: "Velocity OS",
        desc: "Execute global entity activation with a single workflow. Our secure credit-based contact system connects you directly with qualified operators, targeting a rapid mission-critical activation window.",
        icon: Compass,
        image: "/images/velocity.png",
        tone: "sand",
    }
]

const WORKFLOW = [
    { step: "01", title: "Search & Discover", desc: "Filter 190+ countries by cost, timeline, and complexity.", icon: Search },
    { step: "02", title: "Compare Providers", desc: "Review vetted firms with cryptographically-verified credentials.", icon: Users },
    { step: "03", title: "Secure Contact", desc: "Spend 1 credit to initiate an institutional-grade inquiry.", icon: MessageSquare },
    { step: "04", title: "Accelerated Setup", desc: "Incorporate with full transparency and 48-hour support.", icon: Briefcase },
]

const MARQUEE_TOKENS = [
    "190+ Jurisdictions",
    "Verified Provider Network",
    "Institutional Activation",
    "48hr Launch Support",
    "Immutable Audit Trails",
    "Global Entity Operations",
]

const VISTAR_FULL_FORM = "Verified Incorporation Setup, Trusted Across Regions."

/* --- Main Experience ------------------------------------------------------- */
export function LandingExperience({ metrics }: { metrics: LandingMetrics }) {
    const shouldReduceMotion = useReducedMotion()
    const { scrollYProgress } = useScroll()
    const stats: StatItem[] = [
        { value: `${metrics.activeCountries}+`, label: "Active Countries" },
        { value: `${metrics.verifiedProviders}+`, label: "Verified Providers" },
        { value: `${metrics.publishedReviews}+`, label: "Published Reviews" },
        { value: "48h", label: "Support Window" },
    ]

    return (
        <div className="bg-[#02040a] min-h-screen selection:bg-primary/30 selection:text-white relative">
            <OrganicLoader shouldReduceMotion={Boolean(shouldReduceMotion)} />

            <motion.div
                initial={{ clipPath: shouldReduceMotion ? "circle(150% at 50% 50%)" : "circle(0.1% at 50% 50%)" }}
                animate={{ clipPath: "circle(150% at 50% 50%)" }}
                transition={{ duration: 1.8, ease: [0.85, 0, 0.15, 1], delay: 1.2 }}
                className="bg-background relative min-h-screen z-10"
            >
                <VisualEffects />
                <EnvironmentalBackground scrollYProgress={scrollYProgress} shouldReduceMotion={Boolean(shouldReduceMotion)} />
                <ScrollBreadcrumb />
                <div className="noise-overlay noise-overlay--after-hero" />
                <Cursor shouldReduceMotion={Boolean(shouldReduceMotion)} />

                <HeroPortalTransition stats={stats} shouldReduceMotion={Boolean(shouldReduceMotion)} />
                <MomentumMarquee />

                {/* -- CONTENT REVELATION (Stacked Cards) ----------------------- */}
                <section id="architecture" className="relative bg-background">
                    {FEATURES.map((feature, index) => (
                        <div key={feature.title} className="h-[148vh] relative">
                            <StickySection feature={feature} index={index} shouldReduceMotion={Boolean(shouldReduceMotion)} />
                        </div>
                    ))}
                </section>

                {/* -- JURISDICTION CAROUSEL ------------------------------------- */}
                <JurisdictionCarousel />

                {/* -- THE WORKFLOW --------------------------------------------- */}
                <section id="method" className="py-36 lg:py-52 relative overflow-hidden">
                    {/* Subtle background texture */}
                    <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.04),transparent_60%)] pointer-events-none" />

                    <div className="container mx-auto px-6 lg:px-12 relative z-10">
                        <div className="space-y-20 lg:space-y-28">
                            <div className="max-w-4xl space-y-6">
                                <span className="text-xs text-primary font-display uppercase tracking-[0.6em] block">Operational Protocol</span>
                                <RevealWords
                                    text="How institutional setup flows end-to-end"
                                    className="text-5xl lg:text-8xl tracking-tight leading-[0.88] text-white"
                                    wordClassName="mr-[0.16em]"
                                />
                            </div>

                            {/* VWLab-inspired: step cards with full-bleed step number behind, now with magnetic hover */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
                                {/* Horizontal connector */}
                                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent hidden lg:block" />

                                {WORKFLOW.map((step, i) => (
                                    <MagneticCard key={step.step}>
                                        <motion.article
                                            initial={{ opacity: 0, y: 44 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.4 }}
                                            transition={{ delay: i * 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative rounded-3xl overflow-hidden border border-white/8 bg-white/[0.025] backdrop-blur-xl group hover:border-primary/30 transition-all duration-500 hover:bg-white/[0.04]"
                                        >
                                            {/* Full-bleed step number */}
                                            <div
                                                aria-hidden="true"
                                                className="absolute -top-6 -right-3 text-[8rem] lg:text-[9rem] font-black tracking-tighter leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-primary/[0.09] transition-colors duration-700"
                                            >
                                                {step.step}
                                            </div>
                                            <div className="relative z-10 p-7 lg:p-8 space-y-6">
                                                <step.icon className="w-7 h-7 text-primary/70 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                                                <div className="space-y-3">
                                                    <h4 data-cursor="read" className="text-xl lg:text-2xl font-bold text-white tracking-tight">{step.title}</h4>
                                                    <p className="text-slate-400 font-light leading-relaxed text-sm lg:text-base">{step.desc}</p>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </MagneticCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* -- FINAL CTA ------------------------------------------------- */}
                <section id="get-started" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background py-28 lg:py-36">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,210,255,0.12),transparent_65%)] pointer-events-none" />
                    {/* Geometric background rings */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <div className="w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] rounded-full border border-white/30" />
                        <div className="absolute w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full border border-white/20" />
                        <div className="absolute w-[30vw] h-[30vw] max-w-[340px] max-h-[340px] rounded-full border border-primary/40" />
                    </div>
                    <div className="container mx-auto px-6 text-center space-y-16 lg:space-y-20 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 42 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-8 lg:space-y-10"
                        >
                            <p className="text-xs font-display uppercase tracking-[0.55em] text-primary glow-text">
                                Begin Your Institutional Journey
                            </p>
                            <h2 data-cursor="read" className="text-[14vw] lg:text-[9rem] leading-[0.88] tracking-tighter text-white">
                                READY TO <br />
                                <span className="italic font-serif text-primary lowercase mt-2 block">incorporate.</span>
                            </h2>
                            <p className="max-w-xl mx-auto text-base lg:text-xl text-slate-500 font-light leading-relaxed">
                                Join 3,200+ entities already operating through VISTAR&apos;s institutional standard.
                            </p>
                        </motion.div>

                        <MagneticCTA shouldReduceMotion={Boolean(shouldReduceMotion)} />
                    </div>
                </section>
            </motion.div>
        </div>
    )
}

/* --- Sub-Components -------------------------------------------------------- */
function HeroGlossFlow({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 16% 16%, rgba(34,211,238,0.26) 0%, transparent 40%), radial-gradient(circle at 84% 10%, rgba(245,158,11,0.2) 0%, transparent 34%), linear-gradient(180deg, #030714 0%, #050d1f 44%, #020611 100%)",
                }}
            />

            <motion.div
                className="absolute -left-[22%] -top-[14%] h-[68%] w-[150%]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 28%, transparent 72%)",
                    mixBlendMode: "screen",
                    opacity: 0.66,
                }}
                animate={shouldReduceMotion ? undefined : { x: ["-3%", "5%", "-3%"], y: ["0%", "6%", "0%"], rotate: [-1.4, 1.2, -1.4] }}
                transition={{ duration: 21, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute -left-[16%] top-[24%] h-[58%] w-[140%]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(14,165,233,0.2) 0%, rgba(14,165,233,0.05) 36%, transparent 74%)",
                    opacity: 0.72,
                }}
                animate={shouldReduceMotion ? undefined : { x: ["4%", "-4%", "4%"], y: ["0%", "-4%", "0%"] }}
                transition={{ duration: 18, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute -left-[12%] top-[48%] h-[46%] w-[130%]"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(245,158,11,0.14) 0%, rgba(245,158,11,0.04) 38%, transparent 76%)",
                    opacity: 0.62,
                }}
                animate={shouldReduceMotion ? undefined : { x: ["-1%", "6%", "-1%"], y: ["0%", "5%", "0%"] }}
                transition={{ duration: 23, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute inset-y-0 -left-1/3 w-[170%]"
                style={{
                    background: "linear-gradient(106deg, transparent 44%, rgba(255,255,255,0.2) 50%, transparent 56%)",
                    mixBlendMode: "screen",
                    opacity: 0.2,
                }}
                animate={shouldReduceMotion ? undefined : { x: ["-8%", "12%"] }}
                transition={{ duration: 8.5, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
            />
        </div>
    )
}

function HeroPortalTransition({ stats, shouldReduceMotion }: { stats: StatItem[]; shouldReduceMotion: boolean }) {
    const transitionRef = useRef<HTMLElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: transitionRef,
        offset: ["start start", "end end"],
    })
    const smoothProgress = useSpring(scrollYProgress, shouldReduceMotion
        ? { stiffness: 200, damping: 48, mass: 0.2 }
        : { stiffness: 84, damping: 24, mass: 0.4 }
    )

    const heroScale = useTransform(smoothProgress, [0, 0.74], shouldReduceMotion ? [1, 1] : [1, 1.07])
    const heroOpacity = useTransform(smoothProgress, [0, 0.48, 0.82, 1], shouldReduceMotion ? [1, 1, 0.95, 0.9] : [1, 0.96, 0.72, 0.32])
    const heroY = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, -24] : [0, -150])
    const heroTextY = useTransform(smoothProgress, [0, 0.88], shouldReduceMotion ? [0, -18] : [0, -96])

    const veilOpacity = useTransform(smoothProgress, [0.14, 0.78], shouldReduceMotion ? [0, 0.18] : [0, 0.38])

    const panelY = useTransform(smoothProgress, [0.02, 0.52], shouldReduceMotion ? ["18%", "0%"] : ["112%", "0%"])
    const panelOpacity = useTransform(smoothProgress, [0.04, 0.24, 0.52], shouldReduceMotion ? [0.85, 0.95, 1] : [0, 0.9, 1])
    const panelClipPath = useTransform(
        smoothProgress,
        [0.02, 0.2, 0.52],
        shouldReduceMotion
            ? ["inset(0% 0% 0% 0% round 22% 22% 0 0)", "inset(0% 0% 0% 0% round 10% 10% 0 0)", "inset(0% 0% 0% 0% round 0% 0% 0 0)"]
            : ["inset(0% 0% 0% 0% round 56% 56% 0 0)", "inset(0% 0% 0% 0% round 18% 18% 0 0)", "inset(0% 0% 0% 0% round 0% 0% 0 0)"]
    )
    const panelContentY = useTransform(smoothProgress, [0.14, 0.44], shouldReduceMotion ? [16, 0] : [74, 0])
    const panelContentOpacity = useTransform(smoothProgress, [0.16, 0.44], shouldReduceMotion ? [0.92, 1] : [0, 1])
    const panelContentScale = useTransform(smoothProgress, [0.12, 0.48], shouldReduceMotion ? [1, 1] : [0.98, 1])
    const panelGlowOpacity = useTransform(smoothProgress, [0.14, 0.46], shouldReduceMotion ? [0.32, 0.6] : [0, 1])

    return (
        <section id="hero" ref={transitionRef} className="relative h-[270vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <motion.div style={{ scale: heroScale, opacity: heroOpacity, y: heroY }} className="absolute inset-0">
                    <HeroGlossFlow shouldReduceMotion={shouldReduceMotion} />
                    <Hero3D />

                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-6 bottom-28 z-20 pointer-events-none rounded-full border border-white/16 bg-white/[0.04] px-4 py-2 text-[9px] font-display uppercase tracking-[0.26em] text-white/55 backdrop-blur-sm lg:right-14 lg:bottom-24"
                    >
                        Drag To Rotate
                    </motion.div>

                    {/* --- Unifiers-of-Japan inspired vertical margin labels --- */}
                    <div aria-hidden="true" className="absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-5">
                        <span className="text-[9px] font-display uppercase tracking-[0.38em] text-white/20 [writing-mode:vertical-rl] rotate-180">
                            INCORPORATION MARKETPLACE
                        </span>
                        <span className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                    </div>
                    <div aria-hidden="true" className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-5">
                        <span className="w-px h-16 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                        <span className="text-[9px] font-display uppercase tracking-[0.38em] text-white/20 [writing-mode:vertical-rl]">
                            GLOBAL ENTITY NETWORK
                        </span>
                    </div>

                    {/* â”€â”€ Full hero content overlay â”€â”€ */}
                    <motion.div style={{ y: heroTextY }} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between px-7 lg:px-14 pt-24 pb-10 lg:pt-28 lg:pb-10">

                        {/* TOP: live badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
                            className="flex items-center gap-3"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-display uppercase tracking-[0.45em] text-white/40">
                                Currently in Early Access
                            </span>
                        </motion.div>

                        {/* CENTER: serif + big headline + tagline + CTAs */}
                        <div className="flex flex-col -mt-8">
                            {/* Serif accent */}
                            <motion.div
                                initial={{ opacity: 0, x: -32 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                                className="mb-[-0.08em] pl-1"
                            >
                                <span className="text-[7vw] lg:text-[5.5vw] font-serif italic lowercase text-[#f2c94c] drop-shadow-[0_0_15px_rgba(242,201,76,0.3)] leading-none">
                                    scale.
                                </span>
                            </motion.div>

                            {/* Main headline â€” letters stagger in */}
                            <HeroTitle shouldReduceMotion={shouldReduceMotion} />

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
                                className="mt-3 text-[10px] lg:text-[11px] font-display uppercase tracking-[0.34em] text-white/55"
                            >
                                {VISTAR_FULL_FORM}
                            </motion.p>

                            {/* Tagline + CTAs in a row below the headline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
                                className="mt-8 lg:mt-10 flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-16 pointer-events-auto"
                            >
                                {/* Left: value proposition */}
                                <div className="max-w-sm space-y-1.5">
                                    <p className="text-[10px] font-display uppercase tracking-[0.42em] text-primary/80">
                                        Global Incorporation Marketplace
                                    </p>
                                    <p className="text-sm lg:text-base text-slate-300 leading-relaxed font-light">
                                        Fund, form &amp; operate globally. VISTAR is a platform for discovering and connecting with incorporation experts across the world.
                                    </p>
                                </div>

                                {/* Right: dual CTA buttons */}
                                <div className="flex items-center gap-4 flex-shrink-0">
                                    <Link
                                        href="/signup"
                                        data-cursor="action"
                                        className="group relative inline-flex items-center gap-2.5 h-12 px-7 rounded-full bg-white text-black text-[11px] font-display uppercase tracking-[0.22em] hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(0,210,255,0.3)]"
                                    >
                                        Get Started
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/#architecture"
                                        data-cursor="action"
                                        className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/20 text-white/70 text-[11px] font-display uppercase tracking-[0.22em] hover:border-white/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                    >
                                        Explore Platform
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* BOTTOM: stats bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
                            className="flex items-center gap-0 border-t border-white/[0.08] pt-6"
                        >
                            {stats.map((item, i) => (
                                <div key={item.label} className="flex items-center">
                                    <div className="pr-8 lg:pr-12 space-y-1">
                                        <p className="text-2xl lg:text-3xl font-bold tracking-tight text-white">{item.value}</p>
                                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                                    </div>
                                    {i < stats.length - 1 && (
                                        <div className="h-8 w-px bg-white/10 mr-8 lg:mr-12 flex-shrink-0" />
                                    )}
                                </div>
                            ))}

                            {/* Scroll indicator far right */}
                            <div className="ml-auto flex items-center gap-3">
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 2.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: "easeInOut" }}
                                    className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
                                />
                                <span className="text-[8px] font-display uppercase tracking-[0.38em] text-white/20 hidden lg:block">scroll</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    style={{ opacity: veilOpacity }}
                    className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_bottom,rgba(5,10,22,0.04),rgba(5,10,22,0.42)_72%,rgba(4,8,18,0.76))]"
                />

                <motion.div
                    style={{ y: panelY, opacity: panelOpacity, clipPath: panelClipPath }}
                    className="absolute inset-x-0 bottom-0 z-20 h-screen border-t border-white/10 bg-[#020817]/95 backdrop-blur-md"
                >
                    <motion.div
                        style={{ y: panelContentY, opacity: panelContentOpacity, scale: panelContentScale }}
                        className="container mx-auto flex h-full flex-col justify-between px-6 pb-14 pt-20 lg:px-12 lg:pb-16 lg:pt-24"
                    >
                        <motion.div
                            style={{ opacity: panelGlowOpacity }}
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(0,210,255,0.18),transparent_50%)]"
                        />

                        {/* Centered Manifesto / Vision */}
                        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 relative z-10 pt-8 lg:pt-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                                </span>
                                <span className="text-[10px] font-display uppercase tracking-widest text-primary">In Active Development</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl lg:text-7xl tracking-[-0.04em] leading-[0.9] text-white font-serif italic lowercase">
                                A transparent foundation for global expansion.
                            </h2>

                            <p className="text-base leading-relaxed text-slate-300 sm:text-lg max-w-2xl mx-auto">
                                We are building VISTAR to connect ambitious founders directly with verified incorporation experts worldwide. No hidden markups, no opaque processesâ€”just direct access to the local providers you need to scale.
                            </p>
                        </div>

                        {/* 3-Column Focus Areas (replaces the stats row) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12 mt-16 relative z-10 text-left">
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Search className="w-4 h-4 text-white/70" />
                                </div>
                                <h3 className="text-white font-medium text-lg tracking-tight">Discover Providers</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Browse a curated directory of local legal and tax experts across key global jurisdictions.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-white/70" />
                                </div>
                                <h3 className="text-white font-medium text-lg tracking-tight">Connect Directly</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Bypass expensive middlemen. Communicate directly with verified operators to establish your entity.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-white/70" />
                                </div>
                                <h3 className="text-white font-medium text-lg tracking-tight">Transparent Reviews</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Make informed decisions based on verified reviews from other founders who have successfully scaled.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/* --- OrganicLoader (VWLAB Cinematic Pre-Entrance) ------------------------- */
function OrganicLoader({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    const [done, setDone] = useState(false)

    useEffect(() => {
        // Unmount slightly after the clipPath hits 100%
        const t = setTimeout(() => setDone(true), shouldReduceMotion ? 300 : 2500)
        return () => clearTimeout(t)
    }, [shouldReduceMotion])

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="organic-loader"
                    exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
                    transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
                    className="fixed inset-0 z-[1] flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                        animate={{ scale: [0.8, 1.1, 1], opacity: 1, filter: ["blur(10px)", "blur(0px)", "blur(4px)"] }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                        className="flex flex-col flex-center items-center gap-6"
                    >
                        <div className="relative flex items-center justify-center">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-32 h-32 rounded-full bg-white/10 blur-[30px] absolute"
                            />
                            <Compass className="h-10 w-10 text-white/90 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1} />
                        </div>
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: "0%" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="block text-xs font-serif italic text-white/40 tracking-widest mix-blend-plus-lighter"
                            >
                                Establishing direct link
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* --- HeroTitle (Cinematic Slide Up) --------------------------------------- */
function HeroTitle({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
    const letters = "VISTAR".split("")
    const cinematicEase: [number, number, number, number] = [0.8, 0, 0.1, 1]

    return (
        // Added overflow-hidden and high padding-bottom so the letters slide up from an invisible straight edge
        <h1
            aria-label="VISTAR"
            className="text-[17.5vw] lg:text-[15vw] font-display uppercase leading-[0.82] tracking-[-0.04em] text-white mix-blend-plus-lighter flex overflow-hidden pb-4"
            style={{ textShadow: '0 0 120px rgba(0,210,255,0.18)' }}
        >
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={shouldReduceMotion ? false : { y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={shouldReduceMotion ? undefined : {
                        duration: 1.6,
                        delay: 1.4 + (i * 0.05), // Starts exactly as the clipPath curtain snaps open
                        ease: cinematicEase
                    }}
                    className="inline-block"
                >
                    {letter}
                </motion.span>
            ))}
        </h1>
    )
}

/* --- ScrollBreadcrumb ----------------------------------------------------- */
const BREADCRUMB_SECTIONS = [
    { id: "architecture", label: "ARCHITECTURE", num: "01", total: "04" },
    { id: "jurisdictions", label: "JURISDICTIONS", num: "02", total: "04" },
    { id: "method", label: "METHOD", num: "03", total: "04" },
    { id: "get-started", label: "GET STARTED", num: "04", total: "04" },
]

function ScrollBreadcrumb() {
    const [active, setActive] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        // Show breadcrumb once user has scrolled past the hero
        const heroObs = new IntersectionObserver(
            ([entry]) => setVisible(!entry.isIntersecting),
            { threshold: 0.1 }
        )
        const heroEl = document.getElementById("hero")
        if (heroEl) heroObs.observe(heroEl)
        observers.push(heroObs)

        // Track which section is active
        BREADCRUMB_SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (!el) return
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id)
                },
                { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
            )
            obs.observe(el)
            observers.push(obs)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    const section = BREADCRUMB_SECTIONS.find((s) => s.id === active)

    return (
        <AnimatePresence>
            {visible && section && (
                <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-8 left-7 z-50 hidden lg:flex items-center gap-3 pointer-events-none"
                >
                    <span className="font-display text-[9px] uppercase tracking-[0.35em] text-white/25">
                        {section.num} / {section.total}
                    </span>
                    <span className="h-px w-8 bg-white/15" />
                    <span className="font-display text-[9px] uppercase tracking-[0.35em] text-white/40">
                        {section.label}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function MomentumMarquee() {
    const repeatedTokens = [...MARQUEE_TOKENS, ...MARQUEE_TOKENS]

    return (
        <section className="relative z-30 border-y border-white/10 bg-black/25 backdrop-blur-sm overflow-hidden">
            <div className="vistar-marquee-track py-3 lg:py-4">
                {repeatedTokens.map((token, index) => (
                    <span key={`${token}-${index}`} className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.34em] text-slate-300/90">
                        {token}
                        <span className="mx-7 h-1.5 w-1.5 rounded-full bg-primary/65" />
                    </span>
                ))}
            </div>
        </section>
    )
}

function StickySection({ feature, index, shouldReduceMotion }: { feature: FeatureItem; index: number; shouldReduceMotion: boolean }) {
    const ref = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })
    const smoothProgress = useSpring(scrollYProgress, shouldReduceMotion
        ? { stiffness: 200, damping: 42, mass: 0.2 }
        : { stiffness: 110, damping: 28, mass: 0.45 }
    )

    const yText = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, -30] : [120, -220])
    const yImage = useTransform(smoothProgress, [0, 1], shouldReduceMotion ? [0, -16] : [80, -62])
    const scale = useTransform(smoothProgress, [0.04, 0.52], shouldReduceMotion ? [1, 1] : [0.97, 1])
    const clipProgress = useTransform(smoothProgress, [0.03, 0.22], [index === 0 ? 0 : (shouldReduceMotion ? 8 : 24), 0])
    const clipRadius = index === 0 ? 0 : 78
    const clipPath = useTransform(clipProgress, (p) => `inset(${p}% 0% 0% 0% round ${clipRadius}px ${clipRadius}px 0 0)`)
    const imageStartInset = index === 0
        ? "inset(6% 4% 8% 4% round 52px)"
        : "inset(16% 10% 18% 10% round 52px)"
    const imageReveal = useTransform(
        smoothProgress,
        [0.05, 0.32],
        shouldReduceMotion ? ["inset(0% 0% 0% 0% round 52px)", "inset(0% 0% 0% 0% round 52px)"] : [imageStartInset, "inset(0% 0% 0% 0% round 52px)"]
    )

    const rotateX = useMotionValue(0)
    const rotateY = useMotionValue(0)
    const smoothRotateX = useSpring(rotateX, { stiffness: 110, damping: 18, mass: 0.6 })
    const smoothRotateY = useSpring(rotateY, { stiffness: 110, damping: 18, mass: 0.6 })

    const handleTiltMove = (event: ReactMouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height
        rotateY.set((px - 0.5) * 9)
        rotateX.set((0.5 - py) * 9)
    }

    const resetTilt = () => {
        rotateX.set(0)
        rotateY.set(0)
    }

    const stickyStyle: CSSProperties & { "--card-index": number } = {
        "--card-index": index + 10,
    }
    const toneClass = `sticky-tone-${feature.tone}`

    return (
        <div ref={ref} className="sticky-card" style={stickyStyle}>
            <motion.div
                className={cn("sticky-card-inner", toneClass)}
                style={{
                    scale,
                    opacity: useTransform(smoothProgress, [0, 0.1], shouldReduceMotion ? [1, 1] : [0.86, 1]),
                    clipPath
                }}
            >
                <motion.div
                    style={{ y: yText, opacity: 0.04 }}
                    className="absolute inset-0 flex items-center justify-center whitespace-nowrap pointer-events-none"
                >
                    <span className="text-[33vw] font-bold text-white uppercase tracking-tighter leading-none select-none">
                        {feature.subtitle.split(" ")[1] || feature.subtitle.split(" ")[0]}
                    </span>
                </motion.div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-10 order-2 lg:order-1"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <feature.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                <span className="text-primary font-display uppercase tracking-[0.5em] text-xs font-bold glow-text">
                                    {feature.subtitle}
                                </span>
                            </div>
                            <RevealWords
                                text={feature.title}
                                className="text-5xl lg:text-6xl xl:text-7xl text-white font-display uppercase tracking-[-0.03em] leading-[0.88]"
                                wordClassName="mr-[0.14em]"
                            />
                        </div>
                        <p className="text-base lg:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                            {feature.desc}
                        </p>
                        <Link
                            href="/signup?role=client"
                            data-cursor="action"
                            className="inline-flex items-center gap-4 text-white uppercase tracking-[0.36em] text-[10px] hover:text-primary transition-colors group"
                        >
                            Explore Jurisdictions
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>

                    <motion.div
                        onMouseMove={handleTiltMove}
                        onMouseLeave={resetTilt}
                        style={{
                            y: yImage,
                            scale,
                            rotateX: shouldReduceMotion ? 0 : smoothRotateX,
                            rotateY: shouldReduceMotion ? 0 : smoothRotateY,
                            clipPath: imageReveal,
                            transformPerspective: 1200,
                        }}
                        className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-2xl order-1 lg:order-2 border border-white/8"
                    >
                        <div className={cn(
                            "absolute inset-0 z-10 bg-gradient-to-tr from-accent/20 to-transparent opacity-60",
                            index % 2 === 0 ? "mask-arch" : "mask-pill"
                        )} />
                        <Image
                            src={feature.image}
                            alt={feature.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[3.2s]"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/45 to-transparent z-20 pointer-events-none" />
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

function RevealWords({ text, className, wordClassName = "" }: { text: string; className?: string; wordClassName?: string }) {
    const shouldReduceMotion = useReducedMotion()
    const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text])

    return (
        <span className={className}>
            {words.map((word, index) => (
                <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom mr-[0.12em]">
                    <motion.span
                        initial={shouldReduceMotion ? false : { y: "108%", opacity: 0 }}
                        whileInView={shouldReduceMotion ? undefined : { y: "0%", opacity: 1 }}
                        viewport={{ once: true, amount: 0.45 }}
                        transition={shouldReduceMotion ? undefined : { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
                        className={cn("inline-block", wordClassName)}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

function MagneticCTA({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const smoothX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.5 })
    const smoothY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.5 })

    const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        const offsetX = event.clientX - (bounds.left + bounds.width / 2)
        const offsetY = event.clientY - (bounds.top + bounds.height / 2)
        x.set(offsetX * 0.08)
        y.set(offsetY * 0.08)
    }

    const reset = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div onMouseMove={shouldReduceMotion ? undefined : handleMove} onMouseLeave={shouldReduceMotion ? undefined : reset} style={{ x: shouldReduceMotion ? 0 : smoothX, y: shouldReduceMotion ? 0 : smoothY }} className="inline-flex">
            <Button asChild size="lg" className="h-20 px-12 rounded-full text-xl font-display uppercase tracking-[0.2em] bg-white text-black hover:scale-[1.03] transition-all shadow-[0_0_80px_rgba(255,255,255,0.14)]">
                <Link href="/signup">Get Started Now</Link>
            </Button>
        </motion.div>
    )
}

/* --- MagneticCard ---------------------------------------------------------- */
function MagneticCard({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const smoothX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.5 })
    const smoothY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.5 })

    const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * 0.1)
        y.set((e.clientY - cy) * 0.1)
    }
    const reset = () => { x.set(0); y.set(0) }

    return (
        <motion.div
            onMouseMove={handleMove}
            onMouseLeave={reset}
            style={{ x: smoothX, y: smoothY }}
            data-cursor="action"
        >
            {children}
        </motion.div>
    )
}

function EnvironmentalBackground({ scrollYProgress, shouldReduceMotion }: { scrollYProgress: MotionValue<number>; shouldReduceMotion: boolean }) {
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.45, 0.62, 0.54, 0.4])
    const lineDriftA = useTransform(scrollYProgress, [0, 1], [0, -160])
    const lineDriftB = useTransform(scrollYProgress, [0, 1], [0, 120])

    return (
        <motion.div
            style={{ y: shouldReduceMotion ? 0 : y, opacity: shouldReduceMotion ? 0.16 : opacity }}
            className="fixed inset-0 z-0 pointer-events-none"
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 16% 18%, rgba(34,211,238,0.22) 0%, transparent 38%), radial-gradient(circle at 84% 12%, rgba(245,158,11,0.2) 0%, transparent 34%), radial-gradient(circle at 52% 76%, rgba(14,165,233,0.14) 0%, transparent 44%), linear-gradient(180deg, rgba(2,8,23,0.05) 0%, rgba(2,8,23,0.55) 72%, rgba(2,8,23,0.86) 100%)",
                }}
            />

            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                    opacity: 0.34,
                    maskImage: "radial-gradient(circle at 50% 34%, black 0%, transparent 80%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 34%, black 0%, transparent 80%)",
                }}
            />

            <motion.div
                style={{ x: shouldReduceMotion ? 0 : lineDriftA }}
                className="absolute inset-y-0 -left-1/4 w-[150%]"
            >
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(112deg, rgba(251,191,36,0.12) 0px, rgba(251,191,36,0.12) 1px, transparent 1px, transparent 140px)",
                        opacity: 0.26,
                        maskImage: "linear-gradient(180deg, transparent 0%, black 22%, black 72%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 22%, black 72%, transparent 100%)",
                    }}
                />
            </motion.div>

            <motion.div
                style={{ x: shouldReduceMotion ? 0 : lineDriftB }}
                className="absolute inset-y-0 -left-1/4 w-[150%]"
            >
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(70deg, rgba(56,189,248,0.14) 0px, rgba(56,189,248,0.14) 1px, transparent 1px, transparent 180px)",
                        opacity: 0.18,
                        maskImage: "linear-gradient(180deg, transparent 4%, black 25%, black 74%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(180deg, transparent 4%, black 25%, black 74%, transparent 100%)",
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

function Cursor({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)
    const [cursorType, setCursorType] = useState<"default" | "read" | "action">("default")

    const smoothX = useSpring(mouseX, { damping: 22, stiffness: 260, mass: 0.4 })
    const smoothY = useSpring(mouseY, { damping: 22, stiffness: 260, mass: 0.4 })

    // Use motion values for animated sizes â€” set them in useEffect when cursorType changes
    const ringSizeMV = useMotionValue(12)
    const ringOpacityMV = useMotionValue(0)
    const dotSizeMV = useMotionValue(12)

    const ringSizeSpring = useSpring(ringSizeMV, { damping: 18, stiffness: 200, mass: 0.5 })
    const ringOpacitySpring = useSpring(ringOpacityMV, { damping: 18, stiffness: 200 })
    const dotSizeSpring = useSpring(dotSizeMV, { damping: 18, stiffness: 240, mass: 0.4 })

    useEffect(() => {
        if (cursorType === "read") {
            ringSizeMV.set(64); ringOpacityMV.set(0.28); dotSizeMV.set(4)
        } else if (cursorType === "action") {
            ringSizeMV.set(16); ringOpacityMV.set(0); dotSizeMV.set(32)
        } else {
            ringSizeMV.set(12); ringOpacityMV.set(0); dotSizeMV.set(12)
        }
    }, [cursorType, ringSizeMV, ringOpacityMV, dotSizeMV])

    const handleOnEnter = useCallback((e: Event) => {
        const el = e.currentTarget as HTMLElement
        const type = el.dataset.cursor
        if (type === "read") setCursorType("read")
        else if (type === "action") setCursorType("action")
    }, [])
    const handleOnLeave = useCallback(() => setCursorType("default"), [])

    useEffect(() => {
        if (shouldReduceMotion) return

        const move = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", move)

        const attachListeners = () => {
            document.querySelectorAll("[data-cursor]").forEach((el) => {
                el.addEventListener("mouseenter", handleOnEnter)
                el.addEventListener("mouseleave", handleOnLeave)
            })
        }
        const t = setTimeout(attachListeners, 1500)
        return () => {
            clearTimeout(t)
            window.removeEventListener("mousemove", move)
            document.querySelectorAll("[data-cursor]").forEach((el) => {
                el.removeEventListener("mouseenter", handleOnEnter)
                el.removeEventListener("mouseleave", handleOnLeave)
            })
        }
    }, [mouseX, mouseY, shouldReduceMotion, handleOnEnter, handleOnLeave])

    if (shouldReduceMotion) return null

    return (
        <>
            {/* Hollow ring â€” expands on text hover */}
            <motion.div
                style={{
                    left: smoothX, top: smoothY,
                    width: ringSizeSpring, height: ringSizeSpring,
                    opacity: ringOpacitySpring,
                    x: "-50%", y: "-50%"
                }}
                className="hidden md:block fixed rounded-full border border-white/80 z-[9998] pointer-events-none"
            />
            {/* Solid dot */}
            <motion.div
                style={{
                    left: smoothX, top: smoothY,
                    width: dotSizeSpring, height: dotSizeSpring,
                    x: "-50%", y: "-50%",
                    backgroundColor: cursorType === "action" ? "rgba(0,210,255,0.9)" : "rgba(255,255,255,1)"
                }}
                className="hidden md:block fixed rounded-full z-[9999] pointer-events-none mix-blend-difference"
            />
        </>
    )
}

function VisualEffects() {
    return (
        <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
            <defs>
                <filter id="chromatic-aberration">
                    <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="red" />
                    <feOffset in="red" dx="1.5" dy="0" result="redOffset" />
                    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="green" />
                    <feOffset in="green" dx="-1.5" dy="0" result="greenOffset" />
                    <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="blue" />
                    <feBlend in="redOffset" in2="greenOffset" mode="screen" result="rg" />
                    <feBlend in="rg" in2="blue" mode="screen" />
                </filter>
            </defs>
        </svg>
    )
}

