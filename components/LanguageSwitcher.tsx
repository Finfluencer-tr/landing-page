"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { IconWorld, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
] as const;

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass bg-slate-900/50 hover:bg-slate-800/50 border border-white/10 transition-colors text-white"
                >
                    <IconWorld size={20} className="text-emerald-500" />
                    <span className="uppercase font-semibold text-sm">{language}</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-40 glass-card rounded-xl border border-white/10 overflow-hidden shadow-xl"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full px-4 py-3 flex items-center justify-between text-sm hover:bg-white/5 transition-colors",
                                        language === lang.code ? "text-emerald-500 bg-emerald-500/10" : "text-neutral-300"
                                    )}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{lang.flag}</span>
                                        {lang.label}
                                    </span>
                                    {language === lang.code && <IconCheck size={16} />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
