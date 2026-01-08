"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export const PageTitleHandler = () => {
    const { t } = useLanguage();

    useEffect(() => {
        const originalTitle = t.metadata.title;
        let timeoutId: NodeJS.Timeout;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // User left the tab
                document.title = t.metadata.focus_lost;
            } else {
                // User returned
                document.title = t.metadata.title;

                // Ensure it stays correct even if t.metadata.title updates later
                timeoutId = setTimeout(() => {
                    document.title = t.metadata.title;
                }, 2000);
            }
        };

        // Set initial title
        document.title = originalTitle;

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearTimeout(timeoutId);
        };
    }, [t]);

    return null;
};
