"use client";

import { DetailedInfluencer, InfluencerTweet, fetchInfluencerTweets, getMediaUrl } from "@/lib/api";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { IconLoader2, IconGhost } from "@tabler/icons-react";

interface InfluencerFeedProps {
    influencer: DetailedInfluencer;
}

export const InfluencerFeed = ({ influencer }: InfluencerFeedProps) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<"financial" | "all">("all");
    const [tweets, setTweets] = useState<InfluencerTweet[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const observer = useRef<IntersectionObserver | null>(null);

    // Cache the avatar URL to prevent redundant requests
    const cachedAvatarUrl = useMemo(() => {
        return getMediaUrl(influencer.profile.avatar);
    }, [influencer.profile.avatar]);

    const loadTweets = useCallback(async (pageNum: number, isInitial = false) => {
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setIsLoading(true);

        try {
            const isFinancial = activeTab === "financial";
            console.log(`Loading tweets - Page: ${pageNum}, Tab: ${activeTab}, isFinancial: ${isFinancial}`);

            const data = await fetchInfluencerTweets(influencer.profile.username, pageNum, 10, isFinancial);

            console.log('API Response:', data);

            if (data && data.tweets) {
                setTweets(prev => isInitial ? data.tweets : [...prev, ...data.tweets]);
                const hasMore = data.meta.page < data.meta.totalPages;
                console.log(`Pagination - Current: ${data.meta.page}, Total: ${data.meta.totalPages}, HasMore: ${hasMore}`);
                hasMoreRef.current = hasMore;
                setHasMore(hasMore);
            } else {
                console.log('No data or tweets received');
                setHasMore(false);
                hasMoreRef.current = false;
                if (isInitial) setTweets([]);
            }
        } catch (error) {
            console.error("Error loading tweets:", error);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [influencer.profile.username, activeTab]);

    // Initial load and Reset when influencer or tab changes
    useEffect(() => {
        setPage(1);
        setHasMore(true);
        hasMoreRef.current = true;
        loadTweets(1, true);
    }, [influencer.profile.username, activeTab, loadTweets]);

    // Scroll event listener for infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isLoadingRef.current || !hasMoreRef.current) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            // Load more when user is 300px from bottom
            if (scrollTop + clientHeight >= scrollHeight - 300) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    console.log(`Scroll triggered - Loading page ${nextPage}`);
                    loadTweets(nextPage);
                    return nextPage;
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadTweets]);

    return (
        <div className="mt-8">
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-800 mb-8">
                <button
                    onClick={() => setActiveTab("all")}
                    className={cn(
                        "pb-3 text-sm font-medium transition-colors relative",
                        activeTab === "all" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    {t.influencer.all_activity || "All Activity"}
                    {activeTab === "all" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                    )}
                </button>
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

            {/* Tweets List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {tweets.map((tweet, index) => (
                        <motion.div
                            key={tweet.id + "-" + index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PostCard tweet={tweet} authorAvatar={cachedAvatarUrl} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center py-8">
                        <IconLoader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && tweets.length === 0 && (
                    <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-white/5 rounded-3xl">
                        <IconGhost className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">
                            {activeTab === "all"
                                ? (t.influencer.no_posts || "No posts found.")
                                : "No financial signals found for this influencer."}
                        </p>
                    </div>
                )}

                {/* End of results */}
                {!hasMore && tweets.length > 0 && (
                    <div className="text-center py-8 text-slate-600 text-sm font-medium">
                        You've reached the end of the signal.
                    </div>
                )}
            </div>
        </div>
    );
};
