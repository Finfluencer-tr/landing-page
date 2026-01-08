"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

const tickers = [
    { symbol: "BTC", name: "Bitcoin", sentiment: 85, price: "$98,420" },
    { symbol: "ETH", name: "Ethereum", sentiment: 62, price: "$4,850" },
    { symbol: "SOL", name: "Solana", sentiment: 91, price: "$310" },
    { symbol: "AAPL", name: "Apple", sentiment: 45, price: "$220" },
    { symbol: "NVDA", name: "Nvidia", sentiment: 78, price: "$940" },
    { symbol: "TSLA", name: "Tesla", sentiment: 30, price: "$180" },
];

export const LiveTrends = () => {
    const { t } = useLanguage();
    return (
        <section className="w-full py-24 bg-slate-950 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                >
                    {t.live_trends.title} <span className="text-emerald-500">{t.live_trends.title_accent}</span>
                </motion.h2>
                <p className="text-neutral-400">
                    {t.live_trends.subtitle}
                </p>
            </div>

            <div className="relative h-[400px] w-full overflow-hidden">
                {tickers.map((ticker, index) => (
                    <FloatingTicker key={ticker.symbol} ticker={ticker} index={index} />
                ))}
            </div>
        </section>
    );
};

const FloatingTicker = ({ ticker, index }: { ticker: any, index: number }) => {
    // Random starting positions and drift parameters
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomY = Math.random() * 80 + 10; // 10% to 90%
    const duration = 15 + Math.random() * 10;

    const isBullish = ticker.sentiment >= 50;

    return (
        <motion.div
            initial={{
                x: `${(index % 3) * 30 + 10}%`, // Distribute initially 
                y: `${Math.floor(index / 3) * 40 + 20}%`
            }}
            animate={{
                y: ["-20px", "20px", "-20px"],
                x: ["-10px", "10px", "-10px"],
            }}
            transition={{
                repeat: Infinity,
                duration: 4 + Math.random() * 2,
                ease: "easeInOut",
                delay: Math.random() * 2
            }}
            className="absolute"
            style={{
                left: `${(index % 3) * 30 + 10}%`,
                top: `${Math.floor(index / 3) * 30 + 10}%`
            }}
        >
            <motion.div
                whileHover={{ scale: 1.1, zIndex: 50 }}
                className="glass-card rounded-full p-1 pr-6 cursor-pointer group flex items-center gap-3 border border-white/10 hover:border-emerald-500/50 transition-colors"
            >
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs",
                    isBullish ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                )}>
                    {ticker.symbol}
                </div>

                <div className="flex flex-col items-start min-w-[60px]">
                    <span className="text-white font-bold text-sm">{ticker.price}</span>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        {ticker.name}
                    </span>
                </div>

                {/* Hidden Detail - Reveals on Hover */}
                <div className="w-0 group-hover:w-auto overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2 border-l border-white/10 pl-3">
                    <div className="flex flex-col whitespace-nowrap">
                        <span className={cn(
                            "font-bold text-sm flex items-center gap-1",
                            isBullish ? "text-emerald-400" : "text-red-400"
                        )}>
                            {ticker.sentiment}% {isBullish ? "Bullish" : "Bearish"}
                            {isBullish ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                            Based on 1.2k tweets
                        </span>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};
