"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconX } from "@tabler/icons-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toastId = 0;
const toasts: Toast[] = [];
const listeners: Array<() => void> = [];

const notify = () => {
    listeners.forEach((listener) => listener());
};

export const showToast = (message: string, type: ToastType = "success") => {
    const id = `toast-${toastId++}`;
    toasts.push({ id, message, type });
    notify();
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        removeToast(id);
    }, 3000);
};

export const removeToast = (id: string) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index > -1) {
        toasts.splice(index, 1);
        notify();
    }
};

export const ToastContainer = () => {
    const [toastList, setToastList] = useState<Toast[]>([]);

    useEffect(() => {
        const updateToasts = () => {
            setToastList([...toasts]);
        };
        
        listeners.push(updateToasts);
        updateToasts();

        return () => {
            const index = listeners.indexOf(updateToasts);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, []);

    return (
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toastList.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto"
                    >
                        <div
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md min-w-[300px] max-w-[400px] ${
                                toast.type === "success"
                                    ? "bg-green-950/90 border-green-800/50 text-green-100"
                                    : toast.type === "error"
                                    ? "bg-red-950/90 border-red-800/50 text-red-100"
                                    : "bg-blue-950/90 border-blue-800/50 text-blue-100"
                            }`}
                        >
                            {toast.type === "success" && (
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                    <IconCheck size={12} className="text-white" />
                                </div>
                            )}
                            {toast.type === "error" && (
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                                    <IconX size={12} className="text-white" />
                                </div>
                            )}
                            {toast.type === "info" && (
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                                    <IconX size={12} className="text-white rotate-45" />
                                </div>
                            )}
                            <p className="flex-1 text-sm font-medium">{toast.message}</p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                <IconX size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
