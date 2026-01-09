import { getInfluencerBySlug, MOCK_INFLUENCERS } from "@/lib/mockData";
import { InfluencerContent } from "@/components/influencer/InfluencerContent";

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
    // Next.js 15 requires params to be awaited in async components
    const { slug } = await params;
    const influencer = await getInfluencerBySlug(slug);

    return <InfluencerContent influencer={influencer} />;
}
