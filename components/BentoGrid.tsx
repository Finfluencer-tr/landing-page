"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBrandTwitter, IconBrain, IconCheck, IconChartBar, IconAlertTriangle, IconDatabase } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export const BentoGrid = () => {
    const { t } = useLanguage();

    return (
        <section className="py-24 bg-slate-950 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-500 mb-4"
                    >
                        {t.bento.header} <span className="text-emerald-500">{t.bento.header_accent}</span>
                    </motion.h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        {t.bento.subheader}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">

                    {/* Card 1: The Problem (Noise) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        whileHover={{ y: -10 }}
                        className="md:col-span-1 glass-card rounded-3xl p-8 flex flex-col justify-between border-t border-white/10 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors duration-500" />

                        {/* Chaotic Background Animation */}
                        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: Math.random() * 200, y: Math.random() * 300, opacity: 0 }}
                                    animate={{
                                        x: [Math.random() * 200, Math.random() * -200, Math.random() * 200],
                                        y: [Math.random() * 300, Math.random() * -300, Math.random() * 300],
                                        opacity: [0, 0.8, 0],
                                        scale: [0.5, 1.2, 0.5]
                                    }}
                                    transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear" }}
                                    className="absolute text-xs font-mono text-red-500 font-bold"
                                    style={{ left: "50%", top: "50%" }}
                                >
                                    {["BUY!", "SCAM", "MOON", "RUG", "100x"][i % 5]}
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative z-10 w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-4">
                            <IconAlertTriangle size={24} />
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-2xl font-bold text-white mb-2">{t.bento.card_problem.title}</h3>
                            <p className="text-neutral-400">
                                {t.bento.card_problem.desc}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: The Solution (Pipeline) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ y: -10 }}
                        className="md:col-span-1 glass-card rounded-3xl p-8 flex flex-col justify-between border-t border-white/10 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />

                        {/* Pipeline Animation */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 opacity-50">
                            <IconBrandTwitter className="text-blue-400 animate-pulse" />
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                            />
                            <IconBrain className="text-purple-400 animate-pulse" />
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                                className="w-10 h-0.5 bg-gradient-to-r from-purple-400 to-emerald-400"
                            />
                            <IconDatabase className="text-emerald-400 animate-pulse" />
                        </div>

                        <div className="relative z-10 w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mb-4">
                            <IconBrain size={24} />
                        </div>

                        <div className="relative z-10 mt-auto">
                            <h3 className="text-2xl font-bold text-white mb-2">{t.bento.card_solution.title}</h3>
                            <p className="text-neutral-400">
                                {t.bento.card_solution.desc}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: The Output (Score) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -10 }}
                        className="md:col-span-1 glass-card rounded-3xl p-8 flex flex-col justify-between border-t border-white/10 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />

                        {/* Gauge Animation */}
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#333" strokeWidth="8" />
                                <motion.circle
                                    cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8"
                                    strokeDasharray="283"
                                    strokeDashoffset="283"
                                    initial={{ strokeDashoffset: 283 }}
                                    whileInView={{ strokeDashoffset: 28 }} // ~90%
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    transform="rotate(-90 50 50)"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-3xl font-bold text-white">92</span>
                                <span className="text-xs text-emerald-500">TRUST SCORE</span>
                            </div>
                        </div>

                        <div className="relative z-10 w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 mt-auto">
                            <IconChartBar size={24} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">{t.bento.card_output.title}</h3>
                            <p className="text-neutral-400">
                                {t.bento.card_output.desc}
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
