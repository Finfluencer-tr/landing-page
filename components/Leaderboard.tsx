"use client";

import React, { useState, useMemo } from "react";
import { MOCK_INFLUENCERS } from "@/lib/mockData";
import { LeaderboardItem } from "./LeaderboardItem";
import { IconSearch, IconFilter, IconUserCircle } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Leaderboard = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [platformFilter, setPlatformFilter] = useState<"all" | "twitter" | "instagram" | "telegram">("all");
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof MOCK_INFLUENCERS[0] | "trend7d"; direction: "asc" | "desc" }>({ key: "rank", direction: "asc" });
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    // Filter & Sort Logic
    const processedInfluencers = useMemo(() => {
        let result = MOCK_INFLUENCERS.filter((inf) => {
            const matchesSearch = inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inf.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inf.topAsset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPlatform = platformFilter === "all" || inf.platform === platformFilter;
            return matchesSearch && matchesPlatform;
        });

        // Sorting
        result.sort((a, b) => {
            let aValue: any = a[sortConfig.key as keyof typeof a];
            let bValue: any = b[sortConfig.key as keyof typeof b];

            if (sortConfig.key === "trend7d") {
                // Sort by latest trend value
                aValue = a.trend[a.trend.length - 1];
                bValue = b.trend[b.trend.length - 1];
            } else if (sortConfig.key === "topAsset") {
                aValue = a.topAsset.symbol;
                bValue = b.topAsset.symbol;
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return result;
    }, [searchTerm, platformFilter, sortConfig]);

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "desc";
        // Default to asc for Rank, desc for everything else
        if (key === "rank") direction = "asc";

        if (sortConfig.key === key) {
            direction = sortConfig.direction === "asc" ? "desc" : "asc";
        }
        setSortConfig({ key: key as any, direction });
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
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                                <img src="/logo/logo.png" alt="Finfluencer Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:opacity-80 transition-opacity">
                                Finfluencer
                            </span>
                        </Link>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">BETA</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher className="relative top-0 right-0 hidden sm:block" />

                        {user ? (
                            <>
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium">{user.name}</div>
                                    <div className="text-xs text-slate-500">{t.leaderboard.pro} Member</div>
                                </div>
                                <button onClick={logout} className="relative group">
                                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border border-slate-700" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                            >
                                {t.auth.join_beta}
                            </button>
                        )}
                    </div>
                </div>
            </header>

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
                        {t.leaderboard.columns.score} <SortIcon active={sortConfig.key === "credibilityScore"} direction={sortConfig.direction} />
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
                </div>
            </main>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </div>
    );
};
