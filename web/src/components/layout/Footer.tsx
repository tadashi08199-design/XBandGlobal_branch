import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { XbandLogo } from "@/components/ui/XbandLogo";

const XBAND_FULL_FORM = "X-Border Activation Network & Digital Global Protocol.";

export function Footer() {
    return (
        <footer className="py-32 border-t border-white/5 bg-black">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-16 lg:gap-24">
                    <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                        <div className="flex items-center gap-6">
                            <XbandLogo className="w-12 h-12" />
                            <span className="text-3xl font-medium tracking-[-0.03em] text-white">XBandGlobal</span>
                        </div>
                        <p className="max-w-xs text-[9px] md:text-[10px] font-display uppercase tracking-[0.28em] text-slate-500 leading-relaxed">
                            {XBAND_FULL_FORM}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">
                        <Link href="/#architecture" className="hover:text-accent transition-colors">Architecture</Link>
                        <Link href="/#method" className="hover:text-accent transition-colors">Method</Link>
                        <Link href="/pricing" className="hover:text-accent transition-colors">Pricing</Link>
                        <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
                        <Link href="/#get-started" className="hover:text-accent transition-colors">Launch</Link>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-slate-600">
                        <a href="mailto:xbandglobal@gmail.com" className="hover:text-white transition-colors">xbandglobal@gmail.com</a>
                        <a href="tel:+918341727278" className="hover:text-white transition-colors">+91 83417 27278</a>
                        <span>Hyderabad, India</span>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-[10px] font-mono text-slate-700 tracking-[0.2em] uppercase leading-relaxed">
                            &copy; {new Date().getFullYear()} XBAND GLOBAL PROTOCOL <br />
                            ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Legal Disclaimer ── */}
            <div className="mt-12 border-t border-white/[0.04] pt-8 px-6 lg:px-12">
                <p className="text-center text-[9px] leading-relaxed text-slate-700 max-w-3xl mx-auto">
                    <span className="text-slate-600 font-semibold">Legal Disclaimer:</span>{" "}
                    XbandGlobal is not a law firm and does not provide legal, tax, financial, or regulatory advice. All content is for informational purposes only.
                    Users are solely responsible for independent due diligence and should consult qualified professional counsel before acting on any jurisdictional information.
                    Provider listings do not constitute an endorsement or guarantee of services.
                </p>
            </div>
        </footer>
    );
}
