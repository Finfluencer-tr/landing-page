"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { OHLCData } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { formatDateTime, getLocale } from "@/lib/utils";

interface ChartModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: OHLCData[];
    symbol: string;
    tweetDate: string;
    sentiment?: "BULLISH" | "BEARISH" | "NEUTRAL";
}

export const ChartModal = ({
    isOpen,
    onClose,
    data,
    symbol,
    tweetDate,
    sentiment
}: ChartModalProps) => {
    const { t, language } = useLanguage();
    const locale = getLocale(language);
    
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const sentimentColor = sentiment === "BULLISH" ? "#10b981" : sentiment === "BEARISH" ? "#ef4444" : "#64748b";

    // Calculate metrics from data
    const tweetTime = new Date(tweetDate).getTime();
    const tweetCandle = data.find(d => tweetTime >= d.openTime && tweetTime <= d.closeTime);
    const tweetPrice = tweetCandle?.close;
    const currentPrice = data.length > 0 ? data[data.length - 1].close : undefined;
    const maxPrice = Math.max(...data.map(d => d.high));
    const minPrice = Math.min(...data.map(d => d.low));
    const priceChange = tweetPrice && currentPrice ? ((currentPrice - tweetPrice) / tweetPrice) * 100 : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-pointer"
                    />

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-6xl bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-2xl font-bold text-white">${symbol}</h2>
                                <p className="text-sm text-slate-400 mt-1">{t.influencer.price_performance_analysis}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-white/5"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/50">
                            {tweetPrice && (
                                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                    <span className="text-xs text-indigo-400 font-medium uppercase">{t.influencer.tweet_price}</span>
                                    <div className="text-lg font-bold text-white mt-1">${tweetPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            )}
                            {currentPrice && (
                                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                                    <span className="text-xs text-slate-400 font-medium uppercase">{t.influencer.current_price}</span>
                                    <div className="text-lg font-bold text-white mt-1">${currentPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                </div>
                            )}
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400 font-medium uppercase">{t.influencer.max_price}</span>
                                <div className="text-lg font-bold text-white mt-1">${maxPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                                <span className="text-xs text-rose-400 font-medium uppercase">{t.influencer.min_price}</span>
                                <div className="text-lg font-bold text-white mt-1">${minPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="p-6">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis
                                        dataKey="openTime"
                                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                                        tickFormatter={(value) => {
                                            return formatDateTime(new Date(value).toISOString(), language);
                                        }}
                                        stroke="#475569"
                                    />
                                    <YAxis
                                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                                        domain={['auto', 'auto']}
                                        stroke="#475569"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#1e293b",
                                            border: "1px solid #475569",
                                            borderRadius: "12px",
                                            padding: "12px"
                                        }}
                                        labelStyle={{ color: "#cbd5e1", marginBottom: "8px" }}
                                        itemStyle={{ color: "#e2e8f0" }}
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleString(locale);
                                        }}
                                    />
                                    {tweetPrice && (
                                        <ReferenceLine
                                            y={tweetPrice}
                                            stroke="#6366f1"
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                            label={{
                                                value: `${t.influencer.tweet_price}: $${tweetPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                                                position: "right",
                                                fill: "#6366f1",
                                                fontSize: 12,
                                                fontWeight: 600
                                            }}
                                        />
                                    )}
                                    <Line
                                        type="monotone"
                                        dataKey="close"
                                        stroke={sentimentColor}
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, fill: sentimentColor }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* Performance Summary */}
                            {tweetPrice && currentPrice && (
                                <div className="mt-6 p-4 rounded-xl bg-slate-800/30 border border-white/5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-400">{t.influencer.performance_since_tweet}</span>
                                        <span className={`text-lg font-bold ${priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {priceChange >= 0 ? '+' : ''}{priceChange.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
