"use client";

import { DetailedInfluencer } from "@/lib/api";
import { useState } from "react";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface InfluencerFeedProps {
    influencer: DetailedInfluencer;
}

export const InfluencerFeed = ({ influencer }: InfluencerFeedProps) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"financial" | "all">("financial");

    return (
        <div className="mt-8">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-800 mb-6">
                <button
                    onClick={() => setActiveTab("financial")}
                    className={cn(
                        "pb-3 text-sm font-medium transition-colors relative",
                        activeTab === "financial" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    {t.influencer.financial_insights}
                    {activeTab === "financial" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                    )}
                </button>
            </div>

            {/* Feed Empty State */}
            <div className="space-y-4">
                <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-white/5 rounded-3xl">
                    <p className="text-slate-500 font-medium">{t.influencer.posts_coming_soon || "Post Analysis Coming Soon"}</p>
                </div>
            </div>
        </div>
    );
};
