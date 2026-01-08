"use client";

import { Influencer } from "@/lib/mockData";
import { useState } from "react";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface InfluencerFeedProps {
    influencer: Influencer;
}

export const InfluencerFeed = ({ influencer }: InfluencerFeedProps) => {
    const [activeTab, setActiveTab] = useState<"financial" | "all">("financial");

    const filteredPosts = influencer.posts.filter(post =>
        activeTab === "all" ? true : post.isFinancial
    );

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
                    Financial Insights
                    {activeTab === "financial" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("all")}
                    className={cn(
                        "pb-3 text-sm font-medium transition-colors relative",
                        activeTab === "all" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    All Activity
                    {activeTab === "all" && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                    )}
                </button>
            </div>

            {/* Feed */}
            <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <p>No posts found for this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
