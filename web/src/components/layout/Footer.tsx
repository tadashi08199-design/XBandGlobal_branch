import Link from "next/link";

const VISTAR_FULL_FORM = "Verified Incorporation Setup, Trusted Across Regions.";

export function Footer() {
    return (
        <footer className="py-32 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-16 lg:gap-24">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-3xl">V</div>
                            <span className="text-3xl font-black tracking-tighter text-white uppercase italic">Vistar</span>
                        </div>
                        <p className="max-w-xs text-[9px] md:text-[10px] font-display uppercase tracking-[0.28em] text-slate-500 leading-relaxed">
                            {VISTAR_FULL_FORM}
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">
                        <Link href="/#architecture" className="hover:text-accent transition-colors">Architecture</Link>
                        <Link href="/#method" className="hover:text-accent transition-colors">Method</Link>
                        <Link href="/#get-started" className="hover:text-accent transition-colors">Launch</Link>
                        <Link href="/legal/terms" className="hover:text-accent transition-colors">Terms</Link>
                        <Link href="/legal/privacy" className="hover:text-accent transition-colors">Privacy</Link>
                    </div>

                    <div className="text-right">
                        <p className="text-[10px] font-mono text-slate-700 tracking-[0.2em] uppercase leading-relaxed">
                            &copy; {new Date().getFullYear()} VISTAR GLOBAL PROTOCOL <br />
                            ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Legal Disclaimer ── */}
            <div className="mt-12 border-t border-white/[0.04] pt-8">
                <p className="text-center text-[9px] leading-relaxed text-slate-700 max-w-3xl mx-auto">
                    <span className="text-slate-600 font-semibold">Legal Disclaimer:</span>{" "}
                    VISTAR is not a law firm and does not provide legal, tax, financial, or regulatory advice. All content is for informational purposes only.
                    Users are solely responsible for independent due diligence and should consult qualified professional counsel before acting on any jurisdictional information.
                    Provider listings do not constitute an endorsement or guarantee of services.
                </p>
            </div>
        </footer>
    );
}
