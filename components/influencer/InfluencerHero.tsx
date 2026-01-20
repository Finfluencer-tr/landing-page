import { DetailedInfluencer, getMediaUrl } from "@/lib/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { InfluencerImage } from "../InfluencerImage";
import {
    IconBell,
    IconBellFilled,
    IconUserPlus,
    IconCheck,
    IconCalendar,
    IconMapPin,
    IconLink,
    IconUsers,
    IconExternalLink
} from "@tabler/icons-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/lib/utils";

interface InfluencerHeroProps {
    influencer: DetailedInfluencer;
}

export const InfluencerHero = ({ influencer }: InfluencerHeroProps) => {
    const { t, language } = useLanguage();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isAlarmActive, setIsAlarmActive] = useState(false);
    const locale = getLocale(language);

    const { profile, metrics, stats } = influencer;

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400 border-emerald-500/50 bg-emerald-500/10";
        if (score >= 50) return "text-amber-400 border-amber-500/50 bg-amber-500/10";
        return "text-rose-400 border-rose-500/50 bg-rose-500/10";
    };

    const scoreStyle = getScoreColor(metrics.score);
    const bannerUrl = getMediaUrl(profile.banner);
    const avatarUrl = getMediaUrl(profile.avatar);

    return (
        <div className="relative w-full rounded-3xl border border-white/10 overflow-hidden bg-slate-900/50">
            {/* Banner Section */}
            <div className="h-48 md:h-64 relative overflow-hidden bg-slate-800">
                {bannerUrl ? (
                    <InfluencerImage
                        src={bannerUrl}
                        alt={t.influencer.banner}
                        className="w-full h-full object-cover"
                        fallback="https://api.placeholder.com/1200/400"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-r from-indigo-900 to-indigo-700 opacity-50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            <div className="relative px-6 md:px-10 pb-10">
                {/* Profile Picture & Actions Row */}
                <div className="flex flex-col md:flex-row items-end justify-between -mt-16 md:-mt-20 gap-6">
                    <div className="relative group">
                        <div className="absolute inset-0 rounded-full bg-indigo-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-950 bg-slate-900 p-1 flex-shrink-0">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <InfluencerImage
                                    src={avatarUrl}
                                    alt={profile.name}
                                    className="w-full h-full object-cover"
                                    fallback={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                                />
                            </div>
                            {profile.verified && (
                                <div className="absolute bottom-1 right-1 bg-indigo-500 text-white p-1.5 rounded-full border-4 border-slate-950 shadow-lg z-10" title={t.influencer.verified}>
                                    <IconCheck size={16} strokeWidth={3} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={`https://twitter.com/${profile.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all hover:scale-105 active:scale-95 font-bold group/profile"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                            <span>{t.influencer.view_profile}</span>
                            <IconExternalLink size={16} className="opacity-0 group-hover/profile:opacity-100 transition-opacity" />
                        </a>
                        <button
                            onClick={() => setIsAlarmActive(!isAlarmActive)}
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-2xl border transition-all hover:scale-105 active:scale-95",
                                isAlarmActive
                                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                                    : "bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white"
                            )}
                        >
                            {isAlarmActive ? <IconBellFilled size={22} /> : <IconBell size={22} />}
                        </button>

                        <button
                            onClick={() => setIsFollowing(!isFollowing)}
                            className={cn(
                                "flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg",
                                isFollowing
                                    ? "bg-slate-800 text-slate-300 border border-slate-700"
                                    : "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-indigo-500/20"
                            )}
                        >
                            <IconUserPlus size={20} />
                            {isFollowing ? t.influencer.following : t.influencer.follow}
                        </button>
                    </div>
                </div>

                {/* Info & Description */}
                <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:items-start">
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-3xl md:text-4xl font-black text-white">{profile.name}</h1>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 flex-shrink-0">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </div>
                            <p className="text-xl text-slate-400 font-medium">@{profile.username}</p>
                        </div>

                        {profile.description && (
                            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                                {profile.description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm font-medium pt-2">
                            {profile.location && (
                                <div className="flex items-center gap-1.5">
                                    <IconMapPin size={16} />
                                    {profile.location}
                                </div>
                            )}
                            {profile.url && (
                                <Link href={profile.url} target="_blank" className="flex items-center gap-1.5 text-indigo-400 hover:underline">
                                    <IconLink size={16} />
                                    {profile.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                </Link>
                            )}
                            <div className="flex items-center gap-1.5">
                                <IconCalendar size={16} />
                                {new Date(profile.joined_at).toLocaleDateString(locale, { year: 'numeric' })}
                            </div>
                        </div>

                        <div className="flex gap-6 pt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">{profile.followers.toLocaleString(locale)}</span>
                                <span className="text-slate-500 uppercase tracking-tighter text-xs font-bold">{t.influencer.followers_label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold">{profile.following.toLocaleString(locale)}</span>
                                <span className="text-slate-500 uppercase tracking-tighter text-xs font-bold">{t.influencer.following_label}</span>
                            </div>
                        </div>
                    </div>

                    {/* Trust Score Card */}
                    <div className={cn("lg:w-72 p-6 rounded-3xl border text-center space-y-3 shadow-xl", scoreStyle)}>
                        <div className="text-sm font-black uppercase tracking-[0.2em] opacity-80">{t.influencer.trust_score}</div>
                        <div className="text-6xl font-black tracking-tight">{metrics.score}</div>
                        <div className="text-xs font-bold opacity-60 uppercase">{t.influencer.rank_label} #{metrics.rank || "N/A"}</div>
                        <div className="pt-2">
                            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metrics.score}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-current"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
