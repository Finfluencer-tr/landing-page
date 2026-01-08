"use client";

import { Post } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { IconArrowUpRight, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    return (
        <div className={cn(
            "p-5 rounded-2xl border transition-all",
            post.isFinancial
                ? "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                : "bg-slate-950/20 border-white/5 opacity-70 hover:opacity-100"
        )}>
            <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-slate-500 font-medium">{post.date}</span>
                {post.isFinancial && (
                    <div className="flex gap-2">
                        {post.aiAnalysis?.asset && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-900">
                                ${post.aiAnalysis.asset}
                            </span>
                        )}
                        {post.aiAnalysis?.sentiment && (
                            <span className={cn(
                                "px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1",
                                post.aiAnalysis.sentiment === "Bullish"
                                    ? "bg-emerald-950/50 text-emerald-400 border-emerald-900/50"
                                    : post.aiAnalysis.sentiment === "Bearish"
                                        ? "bg-rose-950/50 text-rose-400 border-rose-900/50"
                                        : "bg-slate-800 text-slate-400 border-slate-700"
                            )}>
                                {post.aiAnalysis.sentiment === "Bullish" ? <IconTrendingUp size={12} /> : post.aiAnalysis.sentiment === "Bearish" ? <IconTrendingDown size={12} /> : null}
                                {post.aiAnalysis.sentiment}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <p className="text-slate-200 text-sm leading-relaxed mb-3">
                {post.content}
            </p>

            {post.isFinancial && post.aiAnalysis?.outcome && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-xs font-semibold text-emerald-400">{post.aiAnalysis.outcome}</span>
                </div>
            )}
        </div>
    );
};
