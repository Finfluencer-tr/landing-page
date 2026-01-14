"use client";

import React from "react";
import { DetailedInfluencer } from "@/lib/api";
import { InfluencerHero } from "./InfluencerHero";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "../Header";
import { AuthModal } from "../AuthModal";
import { useState } from "react";

import { InfluencerFeed } from "./InfluencerFeed";

interface InfluencerContentProps {
    influencer: DetailedInfluencer | null;
}

export const InfluencerContent = ({ influencer }: InfluencerContentProps) => {
    const { t } = useLanguage();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    if (!influencer) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white mb-4">{t.influencer.not_found_title}</h1>
                    <p className="text-slate-400 mb-8">{t.influencer.not_found_desc}</p>
                    <Link
                        href="/leaderboard"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
                    >
                        {t.influencer.back_to_leaderboard}
                    </Link>
                </div>
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

            <main className="relative">
                {/* Dynamic Background */}
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-500/10 via-slate-950/50 to-slate-950 pointer-events-none" />

                <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
                    <Link href="/leaderboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
                        <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">{t.influencer.back_to_leaderboard}</span>
                    </Link>

                    <div className="space-y-8">
                        <InfluencerHero influencer={influencer} />

                        {/* Summary Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/40">
                                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t.influencer.total_analyzed}</span>
                                <div className="text-3xl font-bold text-white mt-1">{influencer.stats?.total_analyzed || 0}</div>
                            </div>
                            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-slate-900/40">
                                <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">{t.influencer.financial_count}</span>
                                <div className="text-3xl font-bold text-white mt-1">{influencer.stats?.financial_count || 0}</div>
                            </div>
                        </div>

                        {/* Influencer Feed with Infinite Scroll */}
                        <InfluencerFeed influencer={influencer} />
                    </div>
                </div>
            </main>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};
