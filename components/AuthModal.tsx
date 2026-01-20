"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconBrandGoogle, IconMail, IconLock } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const { login, register, isLoading, error } = useAuth();
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (isRegister) {
            // Validation for register
            if (!fullName.trim()) {
                setLocalError(t.auth.full_name_required);
                return;
            }
            if (password.length < 6) {
                setLocalError(t.auth.password_min_length);
                return;
            }
            if (password !== confirmPassword) {
                setLocalError(t.auth.passwords_no_match);
                return;
            }

            try {
                await register(email, password, fullName);
                onClose();
                // Reset form
                setEmail("");
                setPassword("");
                setFullName("");
                setConfirmPassword("");
            } catch (error) {
                // Error is handled by AuthContext
            }
        } else {
            // Login
            if (!email || !password) {
                setLocalError(t.auth.email_password_required);
                return;
            }

            try {
                await login(email, password);
                onClose();
                // Reset form
                setEmail("");
                setPassword("");
            } catch (error) {
                // Error is handled by AuthContext
            }
        }
    };

    const handleToggleMode = () => {
        setIsRegister(!isRegister);
        setLocalError(null);
        setPassword("");
        setConfirmPassword("");
        setFullName("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl z-[101] max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors z-10"
                        >
                            <IconX size={18} className="sm:w-5 sm:h-5" />
                        </button>

                        <div className="flex flex-col items-center mb-6 sm:mb-8">
                            <h2 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 text-center">
                                {isRegister ? t.auth.join_beta : t.auth.welcome_back}
                            </h2>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1 text-center px-2">
                                {isRegister ? t.auth.start_tracking : t.auth.sign_in_text}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                            {(error || localError) && (
                                <div className="p-2.5 sm:p-3 bg-red-950/50 border border-red-800 rounded-xl text-red-400 text-xs sm:text-sm">
                                    {error || localError}
                                </div>
                            )}

                            <AnimatePresence>
                                {isRegister && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">{t.auth.full_name}</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Satoshi Nakamoto"
                                            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                            required={isRegister}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">{t.auth.email}</label>
                                <div className="relative">
                                    <IconMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="bruce@wayne.com"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">{t.auth.password}</label>
                                <div className="relative">
                                    <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        required
                                        minLength={isRegister ? 6 : undefined}
                                    />
                                </div>
                            </div>

                            <AnimatePresence>
                                {isRegister && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5 ml-1">{t.auth.confirm_password}</label>
                                        <div className="relative">
                                            <IconLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                                required={isRegister}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {isRegister && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex gap-2 text-[10px] text-slate-500 mt-2">
                                            <input type="checkbox" required id="terms" className="mt-0.5" />
                                            <label htmlFor="terms">{t.auth.terms}</label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? t.auth.processing : (isRegister ? t.auth.create_account : t.auth.sign_in)}
                            </button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-slate-900 px-2 text-slate-500">{t.auth.continue_with}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                // Redirect to Google OAuth
                                const clientId = "963968052338-t2kvp84l2o0lhibm5525j1rts6jjnjua.apps.googleusercontent.com";
                                const redirectUri = encodeURIComponent("https://finfluencer.tr/oauth/google");
                                const scope = encodeURIComponent("openid email profile");
                                const responseType = "code";
                                const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=consent`;
                                window.location.href = googleAuthUrl;
                            }}
                            className="w-full flex items-center justify-center gap-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium border border-slate-700 transition-colors"
                        >
                            <IconBrandGoogle size={18} />
                            Google
                        </button>

                        <div className="mt-6 text-center text-sm">
                            <span className="text-slate-500">
                                {isRegister ? t.auth.already_have_account : t.auth.dont_have_account}
                            </span>
                            <button
                                type="button"
                                onClick={handleToggleMode}
                                className="ml-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                {isRegister ? t.auth.sign_in : t.auth.register}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
