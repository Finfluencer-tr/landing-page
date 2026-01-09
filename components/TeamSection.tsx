"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBrandLinkedin, IconBrandGithub, IconWorld, IconSchool } from "@tabler/icons-react";
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
        scholar?: string;
    };
    roleKey?: string;
}

const founders: TeamMember[] = [
    {
        id: 1,
        name: "İbrahim Enes Duran",
        image: "/team/ibrahim-enes-duran.jpeg",
        gradient: "from-cyan-500 to-blue-500",
        glowColor: "#06b6d4",
        socials: {
            linkedin: "https://www.linkedin.com/in/ibrahimenesduran",
            github: "https://github.com/ibrahimenesduran",
        },
    },
    {
        id: 2,
        name: "Baran Adanır",
        image: "/team/baran-adanir.jpeg",
        gradient: "from-purple-500 to-pink-500",
        glowColor: "#d946ef",
        socials: {
            linkedin: "https://www.linkedin.com/in/baranadanir/",
            github: "https://github.com/BaranAdanir",
        },
    },
];

const advisor: TeamMember = {
    id: 3,
    name: "Assoc. Prof. Dr. Ahmet Cüneyd Tantuğ",
    image: "/team/ahmet-cuneyd-tantug.jpg",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "#f59e0b",
    roleKey: "advisor",
    socials: {
        linkedin: "https://www.linkedin.com/in/cuneydtantug/",
        website: "https://www.tantug.com/",
        scholar: "https://scholar.google.com/citations?user=TTawdWMAAAAJ&hl=tr",
    },
};

export const TeamSection = () => {
    const { t } = useLanguage();

    return (
        <section className="relative w-full py-20 overflow-hidden bg-slate-950">
            {/* Background Ambience */}
            <div className="absolute inset-0 w-full h-full bg-slate-950 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                {/* Founders Section */}
                <div className="mb-24">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
                        {founders.map((member, index) => (
                            <Card key={member.id} member={member} index={index} role={t.team.role} university={t.team.university} />
                        ))}
                    </div>
                </div>

                {/* Advisor Section */}
                <div className="relative">
                    {/* Divider */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-12" />

                    <div className="flex flex-col items-center pt-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-full max-w-md"
                        >
                            <Card
                                member={advisor}
                                index={2}
                                role={t.team.advisor_role}
                                university={t.team.university}
                                isAdvisor={true}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Card = ({ member, index, role, university, isAdvisor = false }: { member: TeamMember; index: number; role: string; university: string, isAdvisor?: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative group w-full"
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
                className={cn(
                    "relative h-full glass-card p-8 rounded-2xl flex flex-col items-center text-center backdrop-blur-xl border border-white/10",
                    isAdvisor && "py-10 bg-slate-900/40"
                )}
            >
                <div className={cn("relative mb-6", isAdvisor ? "w-40 h-40" : "w-32 h-32")}>
                    <div className={cn("absolute inset-0 rounded-full blur-xl opacity-40 bg-gradient-to-tr", member.gradient)} />
                    <img
                        src={member.image}
                        alt={member.name}
                        className="relative w-full h-full rounded-full border-2 border-white/10 object-cover bg-slate-900/50"
                    />
                </div>

                <h3 className={cn("font-bold text-white mb-1", isAdvisor ? "text-3xl" : "text-2xl")}>{member.name}</h3>
                <p className={cn("text-transparent bg-clip-text bg-gradient-to-r font-medium mb-4", member.gradient, isAdvisor ? "text-lg" : "text-base")}>
                    {role}
                </p>

                <p className="text-neutral-400 text-sm mb-6">
                    {university}
                </p>

                {/* Social Placeholders */}
                <div className="flex gap-4 mt-auto">
                    {member.socials?.github && <SocialIcon href={member.socials.github} Icon={IconBrandGithub} />}
                    {member.socials?.linkedin && <SocialIcon href={member.socials.linkedin} Icon={IconBrandLinkedin} />}
                    {member.socials?.website && <SocialIcon href={member.socials.website} Icon={IconWorld} />}
                    {member.socials?.scholar && <SocialIcon href={member.socials.scholar} Icon={IconSchool} />}
                </div>
            </motion.div>
        </motion.div>
    );
};

const SocialIcon = ({ Icon, href }: { Icon: any, href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
    >
        <Icon size={20} />
    </a>
);
