"use client"

import { useRef } from "react"
import {
    motion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion"
import Image from "next/image"

/* ── Jurisdiction data with unique per-card accent tints ─────────────────── */
const JURISDICTIONS = [
    {
        id: "sg",
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
        type: "Global Holding & APAC Hub",
        metrics: { tax: "17%", time: "2 Days", privacy: "Standard" },
        desc: "The premier gateway to Asian markets with robust legal frameworks, extensive tax treaties, and a highly favorable corporate structure.",
        tint: "rgba(0, 200, 180, 0.12)",
        accentColor: "rgba(0, 200, 180, 0.7)",
    },
    {
        id: "de",
        name: "Delaware, US",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        type: "Tech & Venture Capital Target",
        metrics: { tax: "Variable", time: "24 Hours", privacy: "High" },
        desc: "The gold standard for venture-backed startups, offering the specialized Court of Chancery and unmatched corporate flexibility.",
        tint: "rgba(59, 130, 246, 0.14)",
        accentColor: "rgba(99, 160, 255, 0.75)",
    },
    {
        id: "cy",
        name: "Cayman Islands",
        image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=2000&auto=format&fit=crop",
        type: "Funds & Web3 Structuring",
        metrics: { tax: "0%", time: "3–5 Days", privacy: "Maximum" },
        desc: "Leading global jurisdiction for institutional fund structuring, foundation-based token generation, and tax-neutral operations.",
        tint: "rgba(234, 179, 8, 0.10)",
        accentColor: "rgba(234, 197, 80, 0.75)",
    },
    {
        id: "uk",
        name: "London, UK",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
        type: "Fintech & European Hub",
        metrics: { tax: "25%", time: "24 Hours", privacy: "Standard" },
        desc: "A globally recognized financial center with deep specialized talent and a progressive regulatory environment for fintech.",
        tint: "rgba(100, 116, 139, 0.13)",
        accentColor: "rgba(148, 163, 184, 0.75)",
    },
    {
        id: "ae",
        name: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop",
        type: "Global Freezones",
        metrics: { tax: "9%", time: "4–7 Days", privacy: "High" },
        desc: "A strategic bridge between East and West offering 100% foreign ownership and specialized regulatory sandboxes within economic freezones.",
        tint: "rgba(249, 115, 22, 0.10)",
        accentColor: "rgba(251, 146, 60, 0.75)",
    },
]

const TOTAL = JURISDICTIONS.length
const SLOT = 1 / TOTAL

export function JurisdictionCarousel() {
    const sectionRef = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    })

    return (
        <section id="jurisdictions" ref={sectionRef} className="relative h-[900vh] bg-background">
            {/* overflow-x-clip: hides horz overflow but keeps vertical sticky working */}
            <div className="sticky top-0 h-screen overflow-x-clip flex flex-col items-center justify-center">

                {/* Ambient glow */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.04),transparent_65%)]" />

                {/* Section header */}
                <div className="absolute top-16 lg:top-20 z-50 text-center space-y-2 px-6">
                    <p className="text-[10px] font-display uppercase tracking-[0.5em] text-primary glow-text">
                        Global Reach
                    </p>
                    <h2 className="text-4xl lg:text-6xl font-serif italic lowercase text-white mix-blend-plus-lighter leading-none">
                        190+ Jurisdictions
                    </h2>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto font-light hidden lg:block">
                        Scroll to explore the world&apos;s premier incorporation destinations
                    </p>
                </div>

                {/* VWLab-style pagination indicator */}
                <PaginationIndicator progress={scrollYProgress} total={TOTAL} />

                {/* Cards stage */}
                <div className="relative w-full h-[58vh] flex items-center justify-center">
                    {JURISDICTIONS.map((jurisdiction, i) => (
                        <JurisdictionCard
                            key={jurisdiction.id}
                            jurisdiction={jurisdiction}
                            index={i}
                            total={TOTAL}
                            progress={scrollYProgress}
                        />
                    ))}
                </div>

                {/* Floor line */}
                <div className="absolute bottom-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

                {/* Scroll hint */}
                <motion.p
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 text-[9px] uppercase tracking-[0.4em] text-white/25 font-display"
                >
                    scroll to explore
                </motion.p>
            </div>
        </section>
    )
}

/* ── Pagination dots ─────────────────────────────────────────────────────── */
function PaginationIndicator({ progress, total }: { progress: MotionValue<number>; total: number }) {
    return (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5">
            {JURISDICTIONS.map((_, i) => (
                <PaginationDot key={i} index={i} total={total} progress={progress} />
            ))}
        </div>
    )
}

function PaginationDot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
    const isActive = useTransform(progress, (p): number => {
        const idx = Math.min(total - 1, Math.max(0, Math.round(p * total - 0.5)))
        return idx === index ? 1 : 0
    })
    const width = useTransform(isActive, [0, 1], ["8px", "28px"])
    const opacity = useTransform(isActive, [0, 1], [0.3, 1])
    return <motion.span style={{ width, opacity }} className="h-[3px] rounded-full bg-white" />
}

/* ── Individual card ─────────────────────────────────────────────────────── */
function JurisdictionCard({
    jurisdiction,
    index,
    total,
    progress,
}: {
    jurisdiction: (typeof JURISDICTIONS)[0]
    index: number
    total: number
    progress: MotionValue<number>
}) {
    const slotCenter = (index + 0.5) / total

    const focusStart = Math.max(0, slotCenter - SLOT * 1.4)
    const focusPeak = slotCenter
    const focusEnd = Math.min(1, slotCenter + SLOT * 1.4)

    const focus = useTransform(
        progress,
        [focusStart, focusPeak, focusEnd],
        [0, 1, 0],
        { clamp: true }
    )

    // Scale: 0.44 unfocused → 1.0 focused
    const scale = useTransform(focus, [0, 1], [0.44, 1])

    // z-index
    const zIndex = useTransform(focus, (f) => Math.round(1 + f * 100))

    // Opacity
    const opacity = useTransform(focus, [0, 0.2, 1], [0.08, 0.55, 1])

    // Filter: desaturate + dim when unfocused (cleaner than sepia)
    const filter = useTransform(focus, (f) => {
        const blur = (1 - f) * 5
        const saturation = 15 + f * 85
        const brightness = 0.52 + f * 0.48
        return `blur(${blur.toFixed(1)}px) saturate(${saturation.toFixed(0)}%) brightness(${brightness.toFixed(2)})`
    })

    // Fan-out X: (1 - focus) fan
    const offsetMultiplier = index - (total - 1) / 2
    const SPREAD_VW = 26

    const x = useTransform(focus, (f) => {
        const spread = offsetMultiplier * SPREAD_VW * (1 - f)
        return `${spread}vw`
    })

    // Vertical lift when focused
    const y = useTransform(focus, [0, 1], [28, 0])

    // Per-card accent tint
    const tintOpacity = useTransform(focus, [0, 0.6, 1], [0, 0, 1])

    // Data panel reveal
    const panelOpacity = useTransform(focus, [0.68, 1], [0, 1])
    const panelY = useTransform(focus, [0.68, 1], [18, 0])
    const panelScale = useTransform(focus, [0.68, 1], [0.96, 1])

    // Pagination label
    const numOpacity = useTransform(focus, [0.6, 1], [0, 1])

    return (
        <motion.div
            style={{ x, y, scale, zIndex, filter, opacity }}
            className="absolute flex flex-col items-end justify-end w-[88vw] lg:w-[44vw] max-w-[760px] aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.65)] border border-white/10"
        >
            {/* Photo */}
            <Image
                src={jurisdiction.image}
                alt={jurisdiction.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 88vw, 44vw"
                priority={index < 2}
            />

            {/* Per-card accent tint overlay */}
            <motion.div
                style={{ opacity: tintOpacity, backgroundColor: jurisdiction.tint }}
                className="absolute inset-0 mix-blend-screen pointer-events-none"
            />

            {/* Gradient veil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

            {/* Pagination number */}
            <motion.div style={{ opacity: numOpacity }} className="absolute top-5 left-6 z-20">
                <span className="text-[10px] font-display uppercase tracking-[0.35em] text-white/35">
                    0{index + 1} / 0{total}
                </span>
            </motion.div>

            {/* Data panel */}
            <motion.div
                style={{ opacity: panelOpacity, y: panelY, scale: panelScale }}
                className="relative z-10 m-4 lg:m-5 p-5 lg:p-6 rounded-2xl bg-[#020817]/75 backdrop-blur-xl border border-white/10 origin-bottom"
            >
                <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4 lg:gap-8 items-end">
                    {/* Left: name + desc */}
                    <div className="space-y-2.5">
                        <div>
                            <h3
                                className="text-2xl lg:text-4xl font-display uppercase tracking-[0.06em] text-white leading-none"
                                style={{ textShadow: `0 0 40px ${jurisdiction.accentColor}` }}
                            >
                                {jurisdiction.name}
                            </h3>
                            <p
                                className="mt-1 text-[9px] lg:text-[10px] uppercase tracking-[0.22em] font-semibold"
                                style={{ color: jurisdiction.accentColor }}
                            >
                                {jurisdiction.type}
                            </p>
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed font-light hidden lg:block max-w-xs">
                            {jurisdiction.desc}
                        </p>
                    </div>

                    {/* Right: metrics */}
                    <div className="grid grid-cols-2 gap-x-5 gap-y-3.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        <div className="space-y-0.5">
                            <div className="text-[7px] uppercase tracking-[0.22em] text-slate-400 font-bold">Corp Tax</div>
                            <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">{jurisdiction.metrics.tax}</div>
                        </div>
                        <div className="space-y-0.5">
                            <div className="text-[7px] uppercase tracking-[0.22em] text-slate-400 font-bold">Setup Time</div>
                            <div className="text-xl lg:text-2xl font-bold text-white tracking-tight">{jurisdiction.metrics.time}</div>
                        </div>
                        <div className="col-span-2 space-y-1">
                            <div className="text-[7px] uppercase tracking-[0.22em] text-slate-400 font-bold">Privacy Level</div>
                            <span
                                className="inline-block text-[10px] px-2.5 py-0.5 rounded-full border border-white/10 font-medium text-white/80"
                                style={{ backgroundColor: jurisdiction.tint }}
                            >
                                {jurisdiction.metrics.privacy}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
