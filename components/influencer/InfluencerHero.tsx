"use client";

import { Influencer } from "@/lib/mockData";
import { motion } from "framer-motion";
import { IconBell, IconBellFilled, IconBrandInstagram, IconBrandTelegram, IconBrandTwitter, IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InfluencerHeroProps {
    influencer: Influencer;
}

export const InfluencerHero = ({ influencer }: InfluencerHeroProps) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAlarmActive, setIsAlarmActive] = useState(false);

    // Determine ring color based on Trust Score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-500 border-emerald-500";
        if (score >= 50) return "text-amber-500 border-amber-500";
        return "text-rose-500 border-rose-500";
    };

    const scoreColorClass = getScoreColor(influencer.credibilityScore);

    const PlatformIcon = {
        twitter: IconBrandTwitter,
        instagram: IconBrandInstagram,
        telegram: IconBrandTelegram,
    }[influencer.platform];

    return (
        <div className="relative w-full glass-card p-6 md:p-8 rounded-3xl border border-white/10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-8">
                {/* Avatar Section */}
                <div className="relative group">
                    <div className={cn("absolute inset-0 rounded-full blur-md opacity-40 transition-opacity group-hover:opacity-60", scoreColorClass.split(" ")[0].replace("text-", "bg-"))} />
                    <div className={cn("relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 p-1", scoreColorClass.split(" ")[1])}>
                        <img
                            src={influencer.avatar}
                            alt={influencer.name}
                            className="w-full h-full rounded-full object-cover bg-slate-900"
                        />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-slate-900 p-2 rounded-full border border-slate-700 text-white">
                        <PlatformIcon size={20} />
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{influencer.name}</h1>
                        <p className="text-slate-400 font-medium text-lg">{influencer.handle}</p>
                    </div>

                    {/* HUD Stats */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
                        <div className="flex flex-col items-center md:items-start p-3 bg-slate-900/50 rounded-xl border border-white/5 min-w-[100px]">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Trust Score</span>
                            <div className="flex items-end gap-1">
                                <span className={cn("text-2xl font-bold", scoreColorClass.split(" ")[0])}>
                                    {influencer.credibilityScore}
                                </span>
                                <span className="text-sm text-slate-500 mb-1">/100</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start p-3 bg-slate-900/50 rounded-xl border border-white/5 min-w-[100px]">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Accuracy</span>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-white">
                                    {influencer.stats.accuracy}%
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-start p-3 bg-slate-900/50 rounded-xl border border-white/5 min-w-[100px]">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Signals</span>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-white">
                                    {influencer.stats.totalSignals}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3">
                    <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg",
                            isFollowing
                                ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                                : "bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-105 hover:shadow-indigo-500/25"
                        )}
                    >
                        <IconUserPlus size={20} />
                        {isFollowing ? "Following" : "Follow"}
                    </button>

                    <button
                        onClick={() => setIsAlarmActive(!isAlarmActive)}
                        className={cn(
                            "flex items-center justify-center gap-2 px-4 py-3 rounded-xl border transition-all",
                            isAlarmActive
                                ? "bg-amber-500/10 border-amber-500/50 text-amber-500"
                                : "bg-slate-900/50 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500"
                        )}
                    >
                        {isAlarmActive ? <IconBellFilled size={20} /> : <IconBell size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
