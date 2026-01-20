"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconSend, IconTrash, IconUser } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getComments, createComment, deleteComment, Comment } from "@/lib/api";
import { formatDate, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    influencerUsername: string;
    influencerName: string;
}

export const CommentModal = ({ isOpen, onClose, influencerUsername, influencerName }: CommentModalProps) => {
    const { user, token } = useAuth();
    const { t, language } = useLanguage();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const commentsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && influencerUsername) {
            loadComments();
        }
    }, [isOpen, influencerUsername]);

    useEffect(() => {
        if (commentsEndRef.current) {
            commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments]);

    const loadComments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getComments(influencerUsername);
            setComments(data.comments);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load comments");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePostComment = async () => {
        if (!user || !token) {
            setError("Please login to comment");
            return;
        }

        if (!commentText.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        if (commentText.length > 2000) {
            setError("Comment cannot exceed 2000 characters");
            return;
        }

        setIsPosting(true);
        setError(null);

        try {
            const newComment = await createComment(
                {
                    influencer_username: influencerUsername,
                    content: commentText.trim()
                },
                token
            );

            setComments(prev => [newComment, ...prev]);
            setCommentText("");
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : t.leaderboard.comment_failed);
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!token) return;

        try {
            await deleteComment(commentId, token);
            setComments(prev => prev.filter(c => c.id !== commentId));
        } catch (err) {
            setError(err instanceof Error ? err.message : t.leaderboard.delete_failed);
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[90vh] h-full sm:h-auto bg-slate-900 rounded-none sm:rounded-2xl border-0 sm:border border-slate-800 shadow-2xl flex flex-col overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-800">
                        <div className="min-w-0 flex-1 pr-2">
                            <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{t.leaderboard.comments}</h2>
                            <p className="text-xs sm:text-sm text-slate-400 mt-1 truncate">
                                {influencerName} (@{influencerUsername})
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                        >
                            <IconX size={20} className="sm:w-6 sm:h-6" />
                        </button>
                    </div>

                    {/* Comments List */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                                <span className="ml-3 text-slate-400">{t.leaderboard.loading_comments}</span>
                            </div>
                        ) : error && !comments.length ? (
                            <div className="text-center py-12">
                                <p className="text-rose-400">{error}</p>
                                <button
                                    onClick={loadComments}
                                    className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="text-center py-12">
                                <IconUser size={48} className="mx-auto text-slate-600 mb-4" />
                                <p className="text-slate-400">{t.leaderboard.no_comments}</p>
                            </div>
                        ) : (
                            comments.map((comment) => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-slate-700/50 hover:border-slate-600 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                                                    {comment.user.full_name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-semibold text-white text-xs sm:text-sm truncate">
                                                        {comment.user.full_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {formatDateTime(comment.created_at, language)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                                                {comment.content}
                                            </p>
                                        </div>
                                        {user && user.id === comment.user.id && (
                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                className="p-1.5 sm:p-2 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors flex-shrink-0"
                                                title={t.leaderboard.delete_comment}
                                            >
                                                <IconTrash size={16} className="sm:w-[18px] sm:h-[18px]" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                        <div ref={commentsEndRef} />
                    </div>

                    {/* Comment Input */}
                    {user && token && (
                        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/50">
                            {error && comments.length > 0 && (
                                <div className="mb-3 p-2 sm:p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs sm:text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="flex-1">
                                    <textarea
                                        ref={textareaRef}
                                        value={commentText}
                                        onChange={handleTextareaChange}
                                        placeholder={t.leaderboard.comment_placeholder}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none max-h-[200px] transition-all"
                                        rows={3}
                                        maxLength={2000}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-slate-500">
                                            {commentText.length}/2000
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePostComment}
                                    disabled={isPosting || !commentText.trim()}
                                    className={cn(
                                        "px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base",
                                        !isPosting && "hover:shadow-lg hover:shadow-indigo-500/50"
                                    )}
                                >
                                    {isPosting ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            <span className="hidden sm:inline">{t.auth.loading}</span>
                                        </>
                                    ) : (
                                        <>
                                            <IconSend size={18} />
                                            <span className="hidden sm:inline">{t.leaderboard.post_comment}</span>
                                            <span className="sm:hidden">{t.leaderboard.post_comment}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {!user && (
                        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-900/50 text-center">
                            <p className="text-slate-400 text-xs sm:text-sm">
                                {t.auth.sign_in_text}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
