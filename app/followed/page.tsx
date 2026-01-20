"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { getFollowedInfluencers, unfollowInfluencer, toggleNotifications, FollowedInfluencer } from "@/lib/api";
import { Header } from "@/components/Header";
import { AuthModal } from "@/components/AuthModal";
import { InfluencerImage } from "@/components/InfluencerImage";
import { getMediaUrl } from "@/lib/api";
import { IconUserMinus, IconArrowLeft, IconBell, IconBellFilled } from "@tabler/icons-react";
import Link from "next/link";
import { showToast } from "@/components/Toast";
import { cn } from "@/lib/utils";

export default function FollowedPage() {
    const { user, token } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [followedInfluencers, setFollowedInfluencers] = useState<FollowedInfluencer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [unfollowing, setUnfollowing] = useState<string | null>(null);
    const [togglingNotifications, setTogglingNotifications] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !token) {
            setIsAuthModalOpen(true);
            return;
        }

        loadFollowedInfluencers();
    }, [user, token]);

    const loadFollowedInfluencers = async () => {
        if (!token) return;
        
        try {
            setIsLoading(true);
            const data = await getFollowedInfluencers(token);
            setFollowedInfluencers(data.influencers);
        } catch (error) {
            console.error("Failed to load followed influencers:", error);
            showToast("Failed to load followed influencers", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUnfollow = async (username: string) => {
        if (!token) return;

        try {
            setUnfollowing(username);
            await unfollowInfluencer(username, token);
            setFollowedInfluencers(prev => prev.filter(inf => inf.username !== username));
            showToast(`Unfollowed ${username}`, "success");
        } catch (error) {
            console.error("Failed to unfollow:", error);
            showToast("Failed to unfollow influencer", "error");
        } finally {
            setUnfollowing(null);
        }
    };

    const handleToggleNotifications = async (username: string) => {
        if (!token) return;

        try {
            setTogglingNotifications(username);
            const result = await toggleNotifications(username, token);
            
            // Update the influencer's notification status in the list
            setFollowedInfluencers(prev => 
                prev.map(inf => 
                    inf.username === username 
                        ? { ...inf, notifications_enabled: result.notifications_enabled }
                        : inf
                )
            );
            
            showToast(
                result.notifications_enabled 
                    ? `Notifications enabled for @${username}` 
                    : `Notifications disabled for @${username}`,
                "success"
            );
        } catch (error) {
            console.error("Failed to toggle notifications:", error);
            showToast("Failed to toggle notifications", "error");
        } finally {
            setTogglingNotifications(null);
        }
    };

    if (!user) {
        return (
            <>
                <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />
                <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            <Header onOpenAuthModal={() => setIsAuthModalOpen(true)} />
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            <div className="container mx-auto px-4 py-6 sm:py-8">
                <div className="mb-4 sm:mb-6">
                    <Link 
                        href="/leaderboard"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-3 sm:mb-4 text-sm sm:text-base"
                    >
                        <IconArrowLeft size={18} className="sm:w-5 sm:h-5" />
                        <span>{t.influencer.back_to_leaderboard}</span>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {t.auth.followed_influencers || "Takip Edilenler"}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400">
                        {followedInfluencers.length} {t.influencer.signals || "influencer"}
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : followedInfluencers.length === 0 ? (
                    <div className="text-center py-20">
                        <IconUserMinus size={64} className="mx-auto text-slate-600 mb-4" />
                        <h2 className="text-xl font-bold text-slate-300 mb-2">{t.auth.no_followed_influencers || "No followed influencers"}</h2>
                        <p className="text-slate-500 mb-6">{t.auth.start_following || "Start following influencers to see them here."}</p>
                        <Link
                            href="/leaderboard"
                            className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                        >
                            {t.influencer.back_to_leaderboard}
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {followedInfluencers.map((influencer) => (
                            <div
                                key={influencer.username}
                                className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/40 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <Link
                                        href={`/influencer/${influencer.username}`}
                                        className="flex items-center gap-3 flex-1"
                                    >
                                        <InfluencerImage
                                            src={getMediaUrl(influencer.avatar)}
                                            alt={influencer.username}
                                            className="w-12 h-12 rounded-full border border-slate-700"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white truncate">@{influencer.username}</h3>
                                            <p className="text-sm text-slate-400 truncate">{influencer.name}</p>
                                        </div>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleNotifications(influencer.username)}
                                            disabled={togglingNotifications === influencer.username}
                                            className={cn(
                                                "p-2 rounded-lg transition-colors disabled:opacity-50",
                                                influencer.notifications_enabled
                                                    ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40"
                                                    : "bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400"
                                            )}
                                        >
                                            {influencer.notifications_enabled ? (
                                                <IconBellFilled size={18} />
                                            ) : (
                                                <IconBell size={18} />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleUnfollow(influencer.username)}
                                            disabled={unfollowing === influencer.username}
                                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
                                        >
                                            <IconUserMinus size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase mb-1">{t.influencer.trust_score}</div>
                                        <div className="text-lg font-bold text-white">{influencer.score.toFixed(1)}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase mb-1">{t.influencer.followers_label}</div>
                                        <div className="text-lg font-bold text-white">{influencer.followers.toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <div className="text-xs text-slate-500 uppercase mb-1">{t.leaderboard.top_asset_label}</div>
                                    <div className="text-sm font-semibold text-indigo-400">${influencer.top_asset}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
