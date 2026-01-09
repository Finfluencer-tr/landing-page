"use client";

import React from "react";
import { Influencer } from "@/lib/mockData";
import { InfluencerHero } from "./InfluencerHero";
import { InfluencerFeed } from "./InfluencerFeed";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface InfluencerContentProps {
    influencer: Influencer | null;
}

export const InfluencerContent = ({ influencer }: InfluencerContentProps) => {
    const { t } = useLanguage();

    if (!influencer) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold text-white mb-4">{t.influencer.not_found_title}</h1>
                <p className="text-slate-400 mb-8">{t.influencer.not_found_desc}</p>
                <Link
                    href="/leaderboard"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
                >
                    {t.influencer.back_to_leaderboard}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
            {/* Simple Header for Navigation */}
            <div className="container mx-auto px-4 py-6">
                <Link href="/leaderboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <IconArrowLeft size={20} />
                    <span>{t.influencer.back_to_leaderboard}</span>
                </Link>
            </div>

            <main className="container mx-auto px-4 pb-20 max-w-5xl">
                <InfluencerHero influencer={influencer} />
                <InfluencerFeed influencer={influencer} />
            </main>
        </div>
    );
};
