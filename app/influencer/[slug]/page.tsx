import { getInfluencerBySlug, MOCK_INFLUENCERS } from "@/lib/mockData";
import { InfluencerHero } from "@/components/influencer/InfluencerHero";
import { InfluencerFeed } from "@/components/influencer/InfluencerFeed";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export async function generateStaticParams() {
    return MOCK_INFLUENCERS.map((influencer) => ({
        slug: influencer.slug,
    }));
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export default async function InfluencerPage({ params }: PageProps) {
    // Next.js 15 requires params to be awaited in async components, 
    // but in Next.js 14 it's passed as prop. Assuming Next 14 standard behavior here 
    // or adapting if strict dynamic params are enabled. 
    // Safe approach for basic server component:

    const { slug } = await params;
    const influencer = await getInfluencerBySlug(slug);

    if (!influencer) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p className="text-slate-400 mb-8">Influencer not found in our database.</p>
                <Link
                    href="/leaderboard"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors"
                >
                    Back to Leaderboard
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
            {/* Simple Header for Navigation */}
            <div className="container mx-auto px-4 py-6">
                <Link href="/leaderboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <IconArrowLeft size={20} />
                    <span>Back to Leaderboard</span>
                </Link>
            </div>

            <main className="container mx-auto px-4 pb-20 max-w-5xl">
                <InfluencerHero influencer={influencer} />
                <InfluencerFeed influencer={influencer} />
            </main>
        </div>
    );
}
