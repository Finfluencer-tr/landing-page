"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBrandLinkedin, IconBrandGithub, IconWorld } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
    id: number;
    name: string;
    image: string;
    gradient: string; // Tailwind classes for gradient
    glowColor: string; // Hex for shadow
    socials?: {
        linkedin?: string;
        github?: string;
        website?: string;
    };
}

const teamData: TeamMember[] = [
    {
        id: 1,
        name: "İbrahim Enes Duran",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=EnesDuran&gender=male&topChance=85&facialHairChance=40",
        gradient: "from-cyan-500 to-blue-500",
        glowColor: "#06b6d4",
    },
    {
        id: 2,
        name: "Baran Adanır",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BaranAdanir&gender=male&topChance=85&facialHairChance=40",
        gradient: "from-purple-500 to-pink-500",
        glowColor: "#d946ef",
    },
];

export const TeamSection = () => {
    const { t } = useLanguage();

    return (
        <section className="relative w-full py-20 overflow-hidden bg-slate-950">
            {/* Background Ambience */}
            <div className="absolute inset-0 w-full h-full bg-slate-950 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        {t.team.header}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-neutral-400 text-lg"
                    >
                        {t.team.subheader}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {teamData.map((member, index) => (
                        <Card key={member.id} member={member} index={index} role={t.team.role} university={t.team.university} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Card = ({ member, index, role, university }: { member: TeamMember; index: number; role: string; university: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative group"
        >
            {/* Glow Effect */}
            <div
                className={cn(
                    "absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-50 blur group-hover:opacity-100 transition duration-500 group-hover:blur-md",
                    member.gradient
                )}
            />

            {/* Card Content - Antigravity Float Animation */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 5 + index, // Staggered float durations
                    ease: "easeInOut",
                    repeatType: "mirror"
                }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="relative h-full glass-card p-8 rounded-2xl flex flex-col items-center text-center backdrop-blur-xl border border-white/10"
            >
                <div className="relative w-32 h-32 mb-6">
                    <div className={cn("absolute inset-0 rounded-full blur-xl opacity-40 bg-gradient-to-tr", member.gradient)} />
                    <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full rounded-full border-2 border-white/10 object-cover bg-slate-900/50"
                    />
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                <p className={cn("text-transparent bg-clip-text bg-gradient-to-r font-medium mb-4", member.gradient)}>
                    {role}
                </p>

                <p className="text-neutral-400 text-sm mb-6">
                    {university}
                </p>

                {/* Social Placeholders */}
                <div className="flex gap-4 mt-auto">
                    <SocialIcon Icon={IconBrandGithub} />
                    <SocialIcon Icon={IconBrandLinkedin} />
                    <SocialIcon Icon={IconWorld} />
                </div>
            </motion.div>
        </motion.div>
    );
};

const SocialIcon = ({ Icon }: { Icon: any }) => (
    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors">
        <Icon size={20} />
    </button>
);
