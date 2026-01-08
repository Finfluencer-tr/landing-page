"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    IconBrandNextjs,
    IconBrandReact,
    IconBrandTailwind,
    IconDatabase,
    IconServer,
    IconBrandNodejs,
    IconBrandPython
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

const technologies = [
    { name: "Next.js 14", icon: IconBrandNextjs },
    { name: "React", icon: IconBrandReact },
    { name: "Tailwind CSS", icon: IconBrandTailwind },
    { name: "Node.js", icon: IconBrandNodejs },
    { name: "Python", icon: IconBrandPython },
    { name: "PostgreSQL", icon: IconDatabase },
    { name: "RabbitMQ", icon: IconServer },
    { name: "Redis", icon: IconDatabase },
];

export const TechArchitecture = () => {
    const { t } = useLanguage();

    return (
        <section className="py-20 bg-slate-950 border-t border-white/5 overflow-hidden">
            <div className="text-center mb-10">
                <p className="text-sm font-mono text-emerald-500 uppercase tracking-widest">
                    {t.tech.caption}
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 text-neutral-500 hover:text-white transition-colors">
                            <tech.icon size={32} />
                            <span className="text-xl font-bold">{tech.name}</span>
                        </div>
                    ))}
                </div>

                {/* Duplicate for seamless loop - CSS animation needed in globals or tailwind config */}
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-12 items-center ml-12">
                    {/* Rendered twice above in single loop technique or handled via CSS */}
                </div>
            </div>

            {/* Fade Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent"></div>
        </section>
    );
};
