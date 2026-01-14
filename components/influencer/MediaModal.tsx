"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconDownload } from "@tabler/icons-react";

interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

export const MediaModal = ({ isOpen, onClose, imageUrl }: MediaModalProps) => {
    // Prevent scroll when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md cursor-zoom-out"
                    />

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-5xl max-h-full flex flex-col items-center"
                    >
                        {/* Actions */}
                        <div className="absolute -top-12 right-0 flex items-center gap-4">
                            <a
                                href={imageUrl}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-white/5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <IconDownload size={20} />
                            </a>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-white/5"
                            >
                                <IconX size={20} />
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 shadow-2xl">
                            <img
                                src={imageUrl}
                                alt="Enlarged media"
                                className="max-w-full max-h-[85vh] object-contain select-none"
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
