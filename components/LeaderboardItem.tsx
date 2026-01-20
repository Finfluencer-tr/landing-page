"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Influencer, getMediaUrl } from "@/lib/api";
import {
    IconBrandTwitter,
    IconBrandInstagram,
    IconBrandTelegram,
    IconMessageCircle,
    IconTrendingUp,
    IconTrendingDown,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { InfluencerImage } from "./InfluencerImage";
import { useLanguage } from "@/context/LanguageContext";

interface LeaderboardItemProps {
    influencer: Influencer;
    index: number;
    onCommentClick: () => void;
}

export const LeaderboardItem = ({ influencer, index, onCommentClick }: LeaderboardItemProps) => {
    const router = useRouter();
    const { t } = useLanguage();

    // 1. Determine Platform Icon
    const PlatformIcon = {
        twitter: IconBrandTwitter,
        instagram: IconBrandInstagram,
        telegram: IconBrandTelegram,
    }[influencer.platform];

    // 2. Determine Color based on Score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
        if (score >= 50) return "text-amber-400 border-amber-500/20 bg-amber-500/10";
        return "text-rose-400 border-rose-500/20 bg-rose-500/10";
    };

    const scoreColorClass = getScoreColor(influencer.credibilityScore);

    // 3. Prepare Sparkline Data
    const sparklineData = influencer.trend.map((val, i) => ({ i, val }));
    const isTrendingUp = influencer.trend[influencer.trend.length - 1] >= influencer.trend[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -4, scale: 1.01 }}
            onClick={() => router.push(`/influencer/${influencer.slug}`)}
            className="group relative flex items-center justify-between p-4 mb-3 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-indigo-500/30 hover:shadow-[0_0_20px_-10px_rgba(99,102,241,0.3)] transition-all duration-300 cursor-pointer"
        >
            {/* Rank */}
            <div className="w-12 flex-shrink-0 text-center">
                <span className={cn(
                    "text-xl font-bold font-mono",
                    index === 0 ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" :
                        index === 1 ? "text-slate-300" :
                            index === 2 ? "text-orange-400" :
                                "text-slate-500"
                )}>
                    #{influencer.rank}
                </span>
            </div>

            {/* Influencer Info */}
            <div className="flex-1 flex items-center gap-4 min-w-[200px]">
                <div className="relative">
                    <InfluencerImage
                        src={getMediaUrl(influencer.avatar)}
                        alt={influencer.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-800 group-hover:border-slate-600 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5 border border-slate-700">
                        {PlatformIcon && <PlatformIcon size={14} className="text-slate-400" />}
                    </div>
                </div>
                <div>
                    <Link href={`/influencer/${influencer.slug}`} className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors block">
                        {influencer.name}
                    </Link>
                    <a
                        href={`https://${influencer.platform}.com/${influencer.handle.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-500 hover:text-slate-400 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {influencer.handle}
                    </a>
                </div>
            </div>
            {/* Credibility Score */}
            <div className="w-24 flex-shrink-0 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Background Circle */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                            className="text-slate-800"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        {/* Progress Circle */}
                        <motion.path
                            className={cn(
                                influencer.credibilityScore >= 80 ? "text-emerald-500" :
                                    influencer.credibilityScore >= 50 ? "text-amber-500" : "text-rose-500"
                            )}
                            strokeDasharray={`${influencer.credibilityScore}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                        />
                    </svg>

                    <div className="flex flex-col items-center justify-center z-10">
                        <span className="text-lg font-bold text-white leading-none mb-0.5">{influencer.credibilityScore}</span>
                        <span className={cn(
                            "text-[8px] font-medium tracking-wider",
                            influencer.credibilityScore >= 80 ? "text-emerald-400" :
                                influencer.credibilityScore >= 50 ? "text-amber-400" : "text-rose-400"
                        )}>{t.leaderboard.score_label}</span>
                    </div>
                </div>
            </div>

            {/* Trend Sparkline (Desktop Only) */}
            <div className="hidden md:block w-32 h-12 mx-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}>
                        <Line
                            type="monotone"
                            dataKey="val"
                            stroke={isTrendingUp ? "#10b981" : "#f43f5e"} // Emerald or Rose
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                    {isTrendingUp ? (
                        <IconTrendingUp size={12} className="text-emerald-500" />
                    ) : (
                        <IconTrendingDown size={12} className="text-rose-500" />
                    )}
                    {t.leaderboard.last_days}
                </div>
            </div>

            {/* Top Asset */}
            <div className="hidden sm:block w-24 text-center">
                <div className="text-xs text-slate-500 mb-1">{t.leaderboard.top_asset_label}</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                    <span className="text-sm">{influencer.topAsset.icon}</span>
                    <span className="text-xs font-bold text-slate-300">{influencer.topAsset.symbol}</span>
                </div>
            </div>

            {/* Last Prediction */}
            <div className="hidden lg:block w-24 text-center">
                <div className="text-xs text-slate-500 mb-1">{t.leaderboard.latest}</div>
                <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border",
                    influencer.lastPrediction === "hit"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                )}>
                    {influencer.lastPrediction === "hit" ? t.leaderboard.hit : t.leaderboard.miss}
                </span>
            </div>

            {/* Action */}
            <div className="w-16 flex justify-end">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCommentClick();
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    <IconMessageCircle size={20} />
                </button>
            </div>
        </motion.div>
    );
};
