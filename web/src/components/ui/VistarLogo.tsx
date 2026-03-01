import React from 'react';

export function VistarLogo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <defs>
                <linearGradient id="vistarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9DF9F" />
                    <stop offset="30%" stopColor="#E2BD6D" />
                    <stop offset="70%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#997A15" />
                </linearGradient>
                <filter id="goldDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
                </filter>
            </defs>
            <g filter="url(#goldDropShadow)">
                {/* Main Star Body with Inner Cutout */}
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="
                        M 50 18 
                        L 42 38 
                        L 16 50 
                        L 42 62 
                        L 50 90 
                        L 58 62 
                        L 84 50 
                        L 58 38 
                        Z
                        M 50 35
                        L 54 45
                        L 68 50
                        L 54 55
                        L 50 68
                        L 46 55
                        L 32 50
                        L 46 45
                        Z
                    "
                    fill="url(#vistarGold)"
                />

                {/* Top Left Floating Block */}
                <path
                    d="M 17 30 L 31 30 L 37 40 L 23 40 Z"
                    fill="url(#vistarGold)"
                />

                {/* Top Right Floating Block */}
                <path
                    d="M 83 30 L 69 30 L 63 40 L 77 40 Z"
                    fill="url(#vistarGold)"
                />
            </g>
        </svg>
    )
}
