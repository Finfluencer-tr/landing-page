"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import { showToast } from "./Toast";

interface HeaderProps {
    onOpenAuthModal: () => void;
}

export const Header = ({ onOpenAuthModal }: HeaderProps) => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        showToast(t.auth.logout_success, "success");
    };

    return (
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 group"
                            >
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium">{user.name}</div>
                                    <div className="text-xs text-slate-500">{t.leaderboard.pro} {t.auth.member}</div>
                                </div>
                                <div className="relative">
                                    <img 
                                        src={user.avatar} 
                                        alt={user.name} 
                                        className="w-9 h-9 rounded-full border border-slate-700 group-hover:border-indigo-500 transition-colors" 
                                    />
                                    <IconChevronDown 
                                        size={12} 
                                        className={`absolute -bottom-1 -right-1 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
                                    <div className="px-4 py-3 border-b border-slate-800">
                                        <div className="text-sm font-medium text-slate-100">{user.name}</div>
                                        <div className="text-xs text-slate-400 truncate">{user.email}</div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2"
                                    >
                                        <IconLogout size={16} />
                                        {t.auth.logout}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={onOpenAuthModal}
                            className="px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                        >
                            {t.auth.join_beta}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
