"use client";

import React, { useState, useMemo, useEffect } from "react";
import { fetchInfluencers, Influencer } from "@/lib/api";
import { LeaderboardItem } from "./LeaderboardItem";
import { IconSearch, IconFilter, IconUserCircle } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Header } from "./Header";

export const Leaderboard = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [platformFilter, setPlatformFilter] = useState<"all" | "twitter" | "instagram" | "telegram">("all");
    const [sortConfig, setSortConfig] = useState<{ key: "rank" | "score" | "name" | "trend7d" | "topAsset"; direction: "asc" | "desc" }>({ key: "rank", direction: "asc" });
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // API State
    const [influencers, setInfluencers] = useState<Influencer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch Data
    useEffect(() => {
        let ismounted = true;
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Determine API sort param
                // API supports 'score' and 'rank'. For other UI sort keys, we might fetch default (rank) and sort client-side, 
                // or just pass 'rank' as default for now if client-side sort isn't fully implemented.
                const apiSortBy = (sortConfig.key === "rank" || sortConfig.key === "score") ? sortConfig.key : "rank";

                const data = await fetchInfluencers({
                    search: searchTerm,
                    sortBy: apiSortBy,
                    // If API doesn't support explicit direction, we rely on its default.
                });

                if (ismounted) {
                    setInfluencers(data);
                }
            } catch (err) {
                console.error("Failed to load leaderboard", err);
            } finally {
                if (ismounted) setIsLoading(false);
            }
        };

        // Debounce search
        const timeoutId = setTimeout(loadData, 300);
        return () => {
            ismounted = false;
            clearTimeout(timeoutId);
        };
    }, [searchTerm, sortConfig.key]); // Dependencies for API fetch

    // Client-side filtering for platform (since API doesn't seem to support it yet)
    // AND Client-side sorting for direction if API doesn't support direction (API docs didn't show order param)
    const processedInfluencers = useMemo(() => {
        let result = [...influencers];

        // Platform Filter
        if (platformFilter !== "all") {
            result = result.filter(inf => inf.platform === platformFilter);
        }

        // Client-side sort direction handling (if needed) or tertiary sorting
        // If API returns sorted by 'score', we might want to reverse it if user wants ASC.
        // For now, let's assume API returns DESC for score and ASC for rank by default.
        // We can manually reverse if direction mismatches common expectation or user selection.
        if (sortConfig.key === "rank") {
            result.sort((a, b) => sortConfig.direction === "asc" ? a.rank - b.rank : b.rank - a.rank);
        } else if (sortConfig.key === "score") { // credibilityScore
            result.sort((a, b) => sortConfig.direction === "desc" ? b.credibilityScore - a.credibilityScore : a.credibilityScore - b.credibilityScore);
        }

        return result;
    }, [influencers, platformFilter, sortConfig]);

    const handleSort = (key: string) => {
        let stateKey = key as any;
        if (key === "credibilityScore") stateKey = "score";

        let direction: "asc" | "desc" = "desc";
        if (stateKey === "rank") direction = "asc";

        if (sortConfig.key === stateKey) {
            direction = sortConfig.direction === "asc" ? "desc" : "asc";
        }
        setSortConfig({ key: stateKey, direction });
    };

    const SortIcon = ({ active, direction }: { active: boolean; direction: "asc" | "desc" }) => {
        if (!active) return <motion.span className="text-slate-700 ml-1">⇅</motion.span>;
        return <motion.span className="text-indigo-400 ml-1">{direction === "asc" ? "↑" : "↓"}</motion.span>;
    };

    const handleCommentClick = () => {
        if (!user) {
            setIsAuthModalOpen(true);
        } else {
            console.log("Open comment dialog (to be implemented)");
            // In a real app, this would open a specific comment thread or modal
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
            {/* Header / Nav */}
            <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />

            <main className="container mx-auto px-4 py-12">
                {/* Hero Section of Leaderboard */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                        {t.leaderboard.title}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t.leaderboard.subtitle}
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 z-40 p-2 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 shadow-xl">
                    <div className="relative flex-1">
                        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder={t.leaderboard.search_placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {(["all", "twitter", "instagram", "telegram"] as const).map((platform) => {
                            const isDisabled = platform === "instagram" || platform === "telegram";
                            // Map platform to translation key
                            const label = t.leaderboard.filters[platform];

                            return (
                                <button
                                    key={platform}
                                    onClick={() => !isDisabled && setPlatformFilter(platform)}
                                    disabled={isDisabled}
                                    className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all border ${platformFilter === platform
                                        ? "bg-slate-800 text-white border-slate-700 shadow-lg scale-105"
                                        : isDisabled
                                            ? "bg-slate-950/50 text-slate-600 border-slate-800/50 cursor-not-allowed opacity-60"
                                            : "bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900 hover:text-slate-200"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        {label}
                                        {isDisabled && <span className="text-[10px] bg-slate-800 px-1 rounded text-slate-500">{t.leaderboard.filters.soon}</span>}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* List Header (Sortable) */}
                <div className="hidden md:flex items-center px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    <button onClick={() => handleSort("rank")} className="w-12 text-center hover:text-slate-300 flex items-center justify-center cursor-pointer">
                        {t.leaderboard.columns.rank} <SortIcon active={sortConfig.key === "rank"} direction={sortConfig.direction} />
                    </button>
                    <button onClick={() => handleSort("name")} className="flex-1 text-left hover:text-slate-300 flex items-center cursor-pointer">
                        {t.leaderboard.columns.influencer} <SortIcon active={sortConfig.key === "name"} direction={sortConfig.direction} />
                    </button>
                    <button onClick={() => handleSort("credibilityScore")} className="w-24 text-center hover:text-slate-300 flex items-center justify-center cursor-pointer">
                        {t.leaderboard.columns.score} <SortIcon active={sortConfig.key === "score"} direction={sortConfig.direction} />
                    </button>
                    <button onClick={() => handleSort("trend7d")} className="w-32 mx-4 text-left hover:text-slate-300 flex items-center cursor-pointer">
                        {t.leaderboard.columns.trend} <SortIcon active={sortConfig.key === "trend7d"} direction={sortConfig.direction} />
                    </button>
                    <button onClick={() => handleSort("topAsset")} className="w-24 text-center hover:text-slate-300 flex items-center justify-center cursor-pointer">
                        {t.leaderboard.columns.asset} <SortIcon active={sortConfig.key === "topAsset"} direction={sortConfig.direction} />
                    </button>
                    <div className="w-24 text-center">{t.leaderboard.columns.prediction}</div>
                    <div className="w-16"></div>
                </div>

                {/* List Items */}
                <div className="space-y-2">
                    {isLoading ? (
                        <div className="py-20 text-center text-slate-500">
                            <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                            Loading influencers...
                        </div>
                    ) : (
                        <>
                            {processedInfluencers.map((influencer, index) => (
                                <LeaderboardItem
                                    key={influencer.id}
                                    influencer={influencer}
                                    index={index}
                                    onCommentClick={handleCommentClick}
                                />
                            ))}

                            {processedInfluencers.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="text-4xl mb-4">🛸</div>
                                    <h3 className="text-xl font-bold text-slate-300">{t.leaderboard.empty_state.title}</h3>
                                    <p className="text-slate-500">{t.leaderboard.empty_state.desc}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};
