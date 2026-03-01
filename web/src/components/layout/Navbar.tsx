"use client"

import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"

function Clock() {
    const [time, setTime] = useState("")

    useEffect(() => {
        const update = () => {
            const now = new Date()
            setTime(now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }))
        }
        update()
        const id = setInterval(update, 60000)
        return () => clearInterval(id)
    }, [])

    return (
        <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Sovereign Time</span>
            <span className="text-sm font-display text-white">{time || "00:00 AM"}</span>
        </div>
    )
}

import { VistarLogo } from "@/components/ui/VistarLogo"

export function Navbar() {
    const { scrollY } = useScroll()
    const [isCompact, setIsCompact] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const lastYRef = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentY = scrollY.get()
            const deltaY = currentY - lastYRef.current

            // Become compact after 80px scroll
            setIsCompact(currentY > 80)

            // Hide on scroll down after 200px, show on scroll up
            if (currentY > 200 && deltaY > 10) {
                setIsHidden(true)
            } else if (deltaY < -10 || currentY < 200) {
                setIsHidden(false)
            }

            lastYRef.current = currentY
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [scrollY])

    const navLinks = [
        { name: "Architecture", href: "#architecture" },
        { name: "Method", href: "#method" },
        { name: "Launch", href: "#get-started" },
    ]

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.36, 1] }}
            className={[
                "fixed top-0 left-0 right-0 z-[100] px-10 flex items-center justify-between pointer-events-none",
                "transition-[padding,transform,background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                isCompact
                    ? "py-5 bg-[#020817]/62 backdrop-blur-md border-b border-white/10"
                    : "py-10 mix-blend-difference",
                isHidden ? "-translate-y-[120%]" : "translate-y-0",
            ].join(" ")}
        >
            {/* Left Group: Branding + Nav */}
            <div className="flex items-center gap-24 pointer-events-auto">
                <Link href="/" className="group flex items-center gap-4">
                    <VistarLogo className="w-10 h-10 group-hover:scale-105 transition-transform duration-500" />
                    <span className="text-3xl font-display uppercase tracking-[-0.05em] text-white group-hover:text-primary transition-colors duration-500">VISTAR</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[10px] font-display uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors duration-500"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Right Group: State Indicator */}
            <div className="flex items-center gap-8 pointer-events-auto">
                <Clock />
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-all cursor-pointer">
                    <span className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
                </div>
            </div>
        </motion.header>
    )
}
