"use client";

import { InfluencerTweet, getMediaUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
    IconTrendingUp,
    IconTrendingDown,
    IconHeart,
    IconRepeat,
    IconMessageCircle,
    IconChartBar,
} from "@tabler/icons-react";
import { InfluencerImage } from "../InfluencerImage";
import { useState } from "react";
import { MediaModal } from "./MediaModal";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface PostCardProps {
    tweet: InfluencerTweet;
    authorAvatar?: string;
}

export const PostCard = ({ tweet, authorAvatar }: PostCardProps) => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
        setIsModalOpen(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className={cn(
            "p-6 rounded-2xl border transition-all duration-300 group",
            tweet.is_financial
                ? "bg-slate-900/40 border-indigo-500/20 hover:border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                : "bg-slate-950/20 border-white/5 opacity-80 hover:opacity-100"
        )}>
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
                <InfluencerImage
                    src={getMediaUrl(authorAvatar || tweet.author.avatar)}
                    alt={tweet.author.username}
                    className="w-10 h-10 rounded-full border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100 truncate">@{tweet.author.username}</span>
                        {tweet.is_financial && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                                Financial
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-slate-500">{formatDate(tweet.created_at)}</span>
                </div>
            </div>

            {/* Content */}
            <p className="text-slate-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                {tweet.text}
            </p>

            {/* Media */}
            {tweet.media && tweet.media.length > 0 && (
                <div className={cn(
                    "mb-4 overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/20",
                    tweet.media.length === 1 ? "flex" : "grid gap-2",
                    tweet.media.length === 2 ? "grid-cols-2 aspect-[16/9]" :
                        tweet.media.length === 3 ? "grid-cols-2 grid-rows-2 aspect-[16/9]" :
                            tweet.media.length >= 4 ? "grid-cols-2 aspect-square" : ""
                )}>
                    {tweet.media.map((item, idx) => {
                        const imageUrl = getMediaUrl(item.url);
                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "relative group/img cursor-zoom-in overflow-hidden",
                                    tweet.media?.length === 3 && idx === 0 ? "row-span-2" : ""
                                )}
                                onClick={() => handleImageClick(imageUrl)}
                            >
                                <InfluencerImage
                                    src={imageUrl}
                                    alt={`Tweet media ${idx + 1}`}
                                    className={cn(
                                        "w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105",
                                        tweet.media?.length === 1 ? "max-h-[500px] w-auto mx-auto object-contain" : ""
                                    )}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors duration-300" />
                            </div>
                        );
                    })}
                </div>
            )}

            <MediaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl={selectedImage || ""}
            />

            {/* AI Analysis Overlay for Financial Tweets */}
            {tweet.is_financial && tweet.analysis && (
                <div className="mb-4 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-indigo-500/10">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                            {t.influencer.ai_analysis_title}
                        </span>
                    </div>

                    {tweet.analysis.entities && tweet.analysis.entities.length > 0 ? (
                        <div className="space-y-3">
                            {tweet.analysis.entities.map((entity, idx) => {
                                const sentiment = entity.sentiment.toUpperCase();
                                return (
                                    <div key={idx} className="flex flex-col gap-1.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-white">${entity.symbol}</span>
                                                <div className={cn(
                                                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border",
                                                    sentiment === "BULLISH"
                                                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/50"
                                                        : sentiment === "BEARISH"
                                                            ? "bg-rose-950/50 text-rose-400 border-rose-900/50"
                                                            : "bg-slate-800 text-slate-400 border-slate-700"
                                                )}>
                                                    {sentiment === "BULLISH" ? <IconTrendingUp size={10} /> : sentiment === "BEARISH" ? <IconTrendingDown size={10} /> : null}
                                                    {sentiment}
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-500">
                                                {t.influencer.performance_score}: {entity.score}%
                                            </span>
                                        </div>
                                        {/* Performance Score Bar */}
                                        <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${entity.score}%` }}
                                                className={cn(
                                                    "h-full",
                                                    sentiment === "BULLISH" ? "bg-emerald-500" : sentiment === "BEARISH" ? "bg-rose-500" : "bg-slate-500"
                                                )}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Fallback for legacy structure */
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                {tweet.analysis.sentiment && (
                                    <div className={cn(
                                        "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                                        tweet.analysis.sentiment === "Bullish"
                                            ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/50"
                                            : tweet.analysis.sentiment === "Bearish"
                                                ? "bg-rose-950/50 text-rose-400 border-rose-900/50"
                                                : "bg-slate-800 text-slate-400 border-slate-700"
                                    )}>
                                        {tweet.analysis.sentiment === "Bullish" ? <IconTrendingUp size={12} /> : tweet.analysis.sentiment === "Bearish" ? <IconTrendingDown size={12} /> : null}
                                        {tweet.analysis.sentiment}
                                    </div>
                                )}
                            </div>
                            {tweet.analysis.asset && (
                                <div className="text-sm font-medium text-slate-300">
                                    Projection for <span className="text-indigo-400 font-bold">${tweet.analysis.asset}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Metrics */}
            <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-rose-400 transition-colors">
                    <IconHeart size={16} />
                    <span className="text-xs font-medium">{tweet.metrics.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-emerald-400 transition-colors">
                    <IconRepeat size={16} />
                    <span className="text-xs font-medium">{tweet.metrics.retweets}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-indigo-400 transition-colors">
                    <IconMessageCircle size={16} />
                    <span className="text-xs font-medium">{tweet.metrics.replies}</span>
                </div>
                {tweet.metrics.views > 0 && (
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <IconChartBar size={16} />
                        <span className="text-xs font-medium">{tweet.metrics.views}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
