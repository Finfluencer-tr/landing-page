"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";

export const Hero = () => {
    const { t } = useLanguage();

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full bg-slate-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />

            {/* Grid Pattern or Stars could go here */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 md:px-8">

                {/* Text Content */}
                <div className="flex-1 text-center lg:text-start mb-12 lg:mb-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        {t.hero.title_start} <br />
                        <span className="text-emerald-500">{t.hero.title_end}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="mt-4 text-base md:text-lg text-neutral-300 max-w-lg mx-auto lg:mx-0"
                    >
                        {t.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Link href="/leaderboard" className="px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)]">
                            {t.hero.cta_primary}
                        </Link>
                        <button
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-3 rounded-full glass text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                            {t.hero.cta_secondary}
                        </button>
                    </motion.div>
                </div>

                {/* Floating Visual (Antigravity Card) */}
                <div className="flex-1 w-full max-w-md relative perspective-1000">
                    <motion.div
                        animate={{
                            y: [-10, 10, -10],
                            rotateX: [0, 5, 0],
                            rotateY: [0, -5, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut"
                        }}
                        className="w-full"
                    >
                        <div className="glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-white/20"></div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">@CryptoKing</h3>
                                    <p className="text-emerald-400 text-sm">Top Performer</p>
                                </div>
                                <div className="ml-auto text-emerald-400 font-mono text-xl font-bold">
                                    92.4%
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm text-neutral-400">
                                    <span>{t.hero.floating_card.accuracy}</span>
                                    <span className="text-white">High</span>
                                </div>
                                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "92%" }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-neutral-400 mt-2">
                                    <span>{t.hero.floating_card.trust_score}</span>
                                    <span className="text-white">850/1000</span>
                                </div>
                                <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "85%" }}
                                        transition={{ duration: 1.5, delay: 0.7 }}
                                        className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-neutral-400">
                                <span className="text-blue-400 font-semibold">{t.hero.floating_card.latest_signal}</span> {t.hero.floating_card.signal_text} (Verified)
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating background elements */}
                    <motion.div
                        animate={{ y: [10, -10, 10], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        className="absolute -z-10 top-1/2 -right-12 w-24 h-24 bg-purple-500/30 rounded-full blur-2xl"
                    />
                    <motion.div
                        animate={{ y: [-15, 15, -15], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
                    />
                </div>
            </div>
            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                onClick={() => document.getElementById('bento-grid')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">{t.hero.scroll}</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="p-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm text-slate-400"
                >
                    <IconChevronDown size={20} />
                </motion.div>
            </motion.div>
        </div>
    );
};
