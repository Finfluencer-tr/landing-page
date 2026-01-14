"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { IconArrowLeft, IconAlertTriangle } from "@tabler/icons-react";
import { Header } from "@/components/Header";
import { AuthModal } from "@/components/AuthModal";

export default function NotFound() {
    const { t } = useLanguage();
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Try to go back, or go to leaderboard if no history
                    if (window.history.length > 1) {
                        router.back();
                    } else {
                        router.push("/leaderboard");
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col font-sans">
            <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] animae-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />

            <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl w-full"
                >
                    {/* Icon & 404 Label */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-8"
                    >
                        <IconAlertTriangle size={48} className="text-indigo-400" strokeWidth={1.5} />
                    </motion.div>

                    <div className="relative mb-6">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[14rem] font-black text-indigo-500 pointer-events-none select-none"
                        >
                            404
                        </motion.h2>
                        <h1 className="relative text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                            {t.error404.title}
                        </h1>
                    </div>

                    <p className="text-slate-400 text-lg md:text-xl font-medium mb-12 max-w-md mx-auto leading-relaxed">
                        {t.error404.subtitle}
                    </p>

                    <div className="flex flex-col items-center gap-10">
                        {/* Go Back Button */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => router.back()}
                                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-indigo-600/20 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <IconArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
                                <span>{t.error404.go_back}</span>
                            </motion.button>
                        </div>

                        {/* Countdown UI */}
                        <div className="flex flex-col items-center gap-4 py-6 px-10 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-6">
                                <div className="relative w-16 h-16 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]">
                                        <circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="transparent"
                                            className="text-slate-800"
                                        />
                                        <motion.circle
                                            cx="32"
                                            cy="32"
                                            r="28"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="transparent"
                                            strokeDasharray="175.9"
                                            animate={{ strokeDashoffset: 175.9 - (175.9 * countdown) / 10 }}
                                            transition={{ duration: 1, ease: "linear" }}
                                            className="text-indigo-500"
                                        />
                                    </svg>
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={countdown}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute inset-0 flex items-center justify-center text-xl font-black font-mono text-indigo-400"
                                        >
                                            {countdown}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <div className="text-left">
                                    <p className="text-slate-300 font-bold">
                                        {t.error404.redirecting.split('{seconds}')[0]}
                                        <span className="text-indigo-400 italic mx-1">{countdown}s</span>
                                        {t.error404.redirecting.split('{seconds}')[1]}
                                    </p>
                                    <p className="text-slate-500 text-sm mt-0.5">Automated safety protocol</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer Subtle Text */}
            <div className="p-8 text-center">
                <p className="text-slate-600 text-xs font-medium tracking-widest uppercase">
                    Protocol 404 - Signal Interrupted
                </p>
            </div>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main>
    );
}
