"use client";

import React from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full py-8 bg-slate-950 border-t border-white/10 text-center md:text-left">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

                <div className="mb-4 md:mb-0">
                    <h4 className="text-lg font-bold text-white">Finfluencer Leaderboard</h4>
                    <p className="text-sm text-neutral-500">
                        {t.footer.rights}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-neutral-400">
                    <a href="https://github.com/ibrahimenesduran" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        İbrahim Enes Duran
                    </a>
                    <span className="hidden md:inline text-neutral-700">|</span>
                    <a href="https://github.com/BaranAdanir" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        Baran Adanır
                    </a>

                    <a href="https://github.com/Finfluencer-tr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors ml-4">
                        <IconBrandGithub size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};
