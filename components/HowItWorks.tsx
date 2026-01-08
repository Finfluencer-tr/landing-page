"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    IconBrandTwitter,
    IconBrain,
    IconChartCandle,
    IconShieldCheck,
    IconCpu
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export const HowItWorks = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage(); // Initialized t function
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Dynamic steps from translation
    const steps = t.how_it_works.steps.map((step, index) => ({
        ...step,
        icon: [IconBrandTwitter, IconCpu, IconChartCandle, IconShieldCheck][index],
        iconColor: ["text-blue-400", "text-purple-400", "text-amber-400", "text-emerald-400"][index],
        dotColor: ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-emerald-500"][index],
        badges: [
            ["Scraping Bots", "Proxies"],
            ["Transformers", "SpaCy"],
            ["Binance API", "PostgreSQL"],
            ["Redis Caching", "Leaderboard Algorithm"]
        ][index]
    }));

    return (
        <section id="how-it-works" ref={containerRef} className="relative py-24 bg-slate-950 overflow-hidden">

            {/* Section Header */}
            <div className="text-center mb-20 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                >
                    {t.how_it_works.title} <span className="text-purple-500">{t.how_it_works.title_accent}</span> {t.how_it_works.title_end}
                </motion.h2>
                <p className="text-neutral-400 max-w-xl mx-auto">
                    {t.how_it_works.subtitle}
                </p>
            </div>

            {/* Tracing Beam Line (Central) */}
            <div className="absolute left-4 md:left-1/2 top-40 bottom-40 w-1 md:-ml-0.5 bg-neutral-800 z-0">
                <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="w-full h-full bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500"
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-24">
                {steps.map((step, index) => (
                    <PipelineStep key={index} step={step} index={index} />
                ))}
            </div>
        </section>
    );
};

const PipelineStep = ({ step, index }: { step: any, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "relative flex items-center md:justify-between pb-12",
            isEven ? "flex-row" : "flex-row-reverse"
        )}>

            {/* Timeline Dot (Mobile: Left, Desktop: Center) */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-slate-950 border-2 border-white/20 rounded-full z-20 -translate-x-1.5 md:-translate-x-2">
                <div className={cn("w-full h-full rounded-full animate-pulse", step.dotColor)} />
            </div>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 50, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                    "ml-12 md:ml-0 md:w-[45%]",
                    !isEven && "md:text-right"
                )}
            >
                <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-colors group">
                    <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white/5",
                        !isEven && "md:ml-auto"
                    )}>
                        <step.icon className={cn("w-6 h-6", step.iconColor)} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-neutral-400 text-sm mb-4 leading-relaxed">
                        {step.desc}
                    </p>

                    <div className={cn(
                        "flex gap-2 flex-wrap",
                        !isEven && "md:justify-end"
                    )}>
                        {step.badges.map((badge: string, i: number) => (
                            <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Spacer for the other side on desktop */}
            <div className="hidden md:block md:w-[45%]" />

        </div>
    );
};
