"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function GoogleOAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { handleGoogleCallback } = useAuth();
    const { t } = useLanguage();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");

        if (errorParam) {
            setError("Google authentication was cancelled or failed.");
            setIsLoading(false);
            setTimeout(() => {
                router.push("/");
            }, 3000);
            return;
        }

        if (!code) {
            setError("No authorization code received from Google.");
            setIsLoading(false);
            setTimeout(() => {
                router.push("/");
            }, 3000);
            return;
        }

        // Handle the OAuth callback
        handleGoogleCallback(code)
            .then(() => {
                // Success - redirect to home page
                router.push("/");
            })
            .catch((err) => {
                setError(err.message || "Failed to authenticate with Google.");
                setIsLoading(false);
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            });
    }, [searchParams, handleGoogleCallback, router]);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
                {isLoading ? (
                    <>
                        <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <h2 className="text-xl font-bold text-slate-100 mb-2">
                            {t.auth?.authenticating || "Authenticating..."}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {t.auth?.please_wait || "Please wait while we sign you in."}
                        </p>
                    </>
                ) : error ? (
                    <>
                        <div className="text-4xl mb-4">❌</div>
                        <h2 className="text-xl font-bold text-red-400 mb-2">
                            {t.auth?.auth_failed || "Authentication Failed"}
                        </h2>
                        <p className="text-slate-400 text-sm mb-4">{error}</p>
                        <p className="text-slate-500 text-xs">
                            {t.auth?.redirecting || "Redirecting to home page..."}
                        </p>
                    </>
                ) : (
                    <>
                        <div className="text-4xl mb-4">✅</div>
                        <h2 className="text-xl font-bold text-green-400 mb-2">
                            {t.auth?.success || "Success!"}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {t.auth?.redirecting || "Redirecting..."}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
