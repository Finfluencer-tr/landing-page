import { getInfluencerBySlug } from "@/lib/api";
import { InfluencerContent } from "@/components/influencer/InfluencerContent";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export default async function InfluencerPage({ params }: PageProps) {
    const { slug } = await params;
    const influencer = await getInfluencerBySlug(slug);

    if (!influencer) {
        notFound();
    }

    return <InfluencerContent influencer={influencer} />;
}
