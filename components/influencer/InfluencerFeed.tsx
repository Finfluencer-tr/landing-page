"use client";

import { DetailedInfluencer, InfluencerTweet, fetchInfluencerTweets } from "@/lib/api";
import { useState, useEffect, useRef, useCallback } from "react";
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
    const observer = useRef<IntersectionObserver | null>(null);

    const loadTweets = useCallback(async (pageNum: number) => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const data = await fetchInfluencerTweets(influencer.profile.username, pageNum);
            if (data) {
                if (data.tweets.length === 0) {
                    setHasMore(false);
                } else {
                    setTweets(prev => [...prev, ...data.tweets]);
                    if (data.meta.page >= data.meta.totalPages) {
                        setHasMore(false);
                    }
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading tweets:", error);
        } finally {
            setIsLoading(false);
        }
    }, [influencer.profile.username, isLoading, hasMore]);

    // Reset and Initial load when influencer changes
    useEffect(() => {
        setTweets([]);
        setPage(1);
        setHasMore(true);
        setIsLoading(false);

        // Initial load for new influencer
        const initialLoad = async () => {
            setIsLoading(true);
            try {
                const data = await fetchInfluencerTweets(influencer.profile.username, 1);
                if (data) {
                    setTweets(data.tweets);
                    if (data.meta.page >= data.meta.totalPages || data.tweets.length === 0) {
                        setHasMore(false);
                    }
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error loading tweets:", error);
            } finally {
                setIsLoading(false);
            }
        };
        initialLoad();
    }, [influencer.profile.username]);

    const lastTweetRef = useCallback((node: HTMLDivElement | null) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => {
                    const nextPage = prevPage + 1;
                    loadTweets(nextPage);
                    return nextPage;
                });
            }
        });

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, loadTweets]);

    const filteredTweets = activeTab === "all"
        ? tweets
        : tweets.filter(tweet => tweet.is_financial);

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
                    {filteredTweets.map((tweet, index) => (
                        <motion.div
                            key={tweet.id + "-" + index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            ref={index === filteredTweets.length - 1 ? lastTweetRef : null}
                        >
                            <PostCard tweet={tweet} />
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
                {!isLoading && filteredTweets.length === 0 && (
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
                {!hasMore && filteredTweets.length > 0 && (
                    <div className="text-center py-8 text-slate-600 text-sm font-medium">
                        You've reached the end of the signal.
                    </div>
                )}
            </div>
        </div>
    );
};
