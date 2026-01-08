export interface AIAnalysis {
    asset: string;
    sentiment: "Bullish" | "Bearish" | "Neutral";
    outcome?: string; // e.g., "✅ +5.4% Profit"
}

export interface Post {
    id: string;
    content: string;
    date: string;
    isFinancial: boolean;
    aiAnalysis?: AIAnalysis;
}

export interface InfluencerStats {
    accuracy: number;
    totalSignals: string; // e.g. "1.2k"
}

export interface Influencer {
    id: string;
    rank: number;
    name: string;
    handle: string;
    avatar: string;
    platform: "twitter" | "instagram" | "telegram";
    slug: string; // NEW
    
    // Leaderboard specific
    credibilityScore: number; // This is the "Trust Score"
    trend: number[]; // Last 7 days scores
    topAsset: {
        symbol: string;
        icon: string; 
    };
    lastPrediction: "hit" | "miss";
    followers: string;

    // Profile specific
    stats: InfluencerStats;
    posts: Post[];
}

export const MOCK_INFLUENCERS: Influencer[] = [
    {
        id: "1",
        rank: 1,
        slug: "cryptowiz",
        name: "CryptoWizard",
        handle: "@cryptowiz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoWizard",
        platform: "twitter",
        credibilityScore: 92,
        trend: [85, 88, 87, 89, 90, 91, 92],
        topAsset: {
            symbol: "BTC",
            icon: "₿"
        },
        lastPrediction: "hit",
        followers: "1.2M",
        stats: {
            accuracy: 88,
            totalSignals: "2.1k",
        },
        posts: [
            {
                id: "p1",
                content: "#BTC breaking resistance at $65k. Next stop $72k! 🚀",
                date: "2h ago",
                isFinancial: true,
                aiAnalysis: {
                    asset: "BTC",
                    sentiment: "Bullish",
                    outcome: "Pending",
                },
            },
            {
                id: "p2",
                content: "Just had the best sushi in Tokyo 🍣",
                date: "5h ago",
                isFinancial: false,
            },
            {
                id: "p3",
                content: "Ethereum L2s are the future. Loading up on $OP.",
                date: "1d ago",
                isFinancial: true,
                aiAnalysis: {
                    asset: "OP",
                    sentiment: "Bullish",
                    outcome: "✅ +5.4% Profit",
                },
            },
        ]
    },
    {
        id: "2",
        rank: 2,
        slug: "altcoin-queen",
        name: "Altcoin Queen",
        handle: "@altqueen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AltcoinQueen",
        platform: "instagram",
        credibilityScore: 88,
        trend: [82, 83, 85, 84, 86, 87, 88],
        topAsset: {
            symbol: "ETH",
            icon: "Ξ"
        },
        lastPrediction: "hit",
        followers: "850K",
        stats: {
            accuracy: 82,
            totalSignals: "1.5k",
        },
        posts: [
            {
                id: "p1",
                content: "ETH to $4k soon! 💎🙌",
                date: "3h ago",
                isFinancial: true,
                aiAnalysis: {
                    asset: "ETH",
                    sentiment: "Bullish",
                    outcome: "Pending",
                },
            },
        ]
    },
    {
        id: "3",
        rank: 3,
        slug: "bearhunter",
        name: "BearHunter",
        handle: "@bearhunter_tg",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BearHunter",
        platform: "telegram",
        credibilityScore: 85,
        trend: [88, 87, 86, 84, 85, 84, 85],
        topAsset: {
            symbol: "SOL",
            icon: "◎"
        },
        lastPrediction: "miss",
        followers: "200K",
        stats: {
            accuracy: 75,
            totalSignals: "900",
        },
        posts: []
    },
    {
        id: "4",
        rank: 4,
        slug: "satoshis-disciple",
        name: "Satoshi's Disciple",
        handle: "@satoshis_d",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Satoshi",
        platform: "twitter",
        credibilityScore: 81,
        trend: [75, 78, 80, 79, 80, 81, 81],
        topAsset: {
            symbol: "BTC",
            icon: "₿"
        },
        lastPrediction: "hit",
        followers: "500K",
        stats: {
            accuracy: 70,
            totalSignals: "1.2k",
        },
        posts: []
    },
    {
        id: "5",
        rank: 5,
        slug: "chart-master",
        name: "Chart Master",
        handle: "@chartmaster",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChartMaster",
        platform: "twitter",
        credibilityScore: 78,
        trend: [80, 79, 78, 77, 78, 79, 78],
        topAsset: {
            symbol: "AVAX",
            icon: "🔺"
        },
        lastPrediction: "miss",
        followers: "320K",
        stats: {
            accuracy: 65,
            totalSignals: "800",
        },
        posts: []
    },
    {
        id: "6",
        rank: 6,
        slug: "nft-flipper",
        name: "NFT Flipper",
        handle: "@nftflip",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NFTFlipper",
        platform: "instagram",
        credibilityScore: 74,
        trend: [65, 68, 70, 72, 71, 73, 74],
        topAsset: {
            symbol: "APE",
            icon: "🦍"
        },
        lastPrediction: "hit",
        followers: "150K",
        stats: {
            accuracy: 60,
            totalSignals: "300",
        },
        posts: []
    },
    {
        id: "7",
        rank: 7,
        slug: "doge-fan",
        name: "DogeFather Fan",
        handle: "@dogelover",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Doge",
        platform: "twitter",
        credibilityScore: 68,
        trend: [70, 69, 68, 65, 66, 67, 68],
        topAsset: {
            symbol: "DOGE",
            icon: "Ð"
        },
        lastPrediction: "miss",
        followers: "2.5M",
        stats: {
            accuracy: 55,
            totalSignals: "5k",
        },
        posts: []
    },
    {
        id: "8",
        rank: 8,
        slug: "safemoon-hodler",
        name: "SafeMoon HODLer",
        handle: "@safemoonarmy",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SafeMoon",
        platform: "telegram",
        credibilityScore: 45,
        trend: [50, 48, 47, 46, 45, 44, 45],
        topAsset: {
            symbol: "BNB",
            icon: "🔶"
        },
        lastPrediction: "miss",
        followers: "50K",
        stats: {
            accuracy: 30,
            totalSignals: "200",
        },
        posts: []
    },
    {
        id: "9",
        rank: 9,
        slug: "forex-guru",
        name: "Forex Guru",
        handle: "@forexguru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Forex",
        platform: "instagram",
        credibilityScore: 42,
        trend: [40, 41, 42, 41, 40, 42, 42],
        topAsset: {
            symbol: "EURUSD",
            icon: "💶"
        },
        lastPrediction: "hit",
        followers: "100K",
        stats: {
            accuracy: 42,
            totalSignals: "150",
        },
        posts: []
    },
    {
        id: "10",
        rank: 10,
        slug: "scam-alerts",
        name: "Scam Alerts",
        handle: "@scamalerts",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Scam",
        platform: "twitter",
        credibilityScore: 30,
        trend: [35, 34, 33, 32, 31, 30, 30],
        topAsset: {
            symbol: "SHIB",
            icon: "🐕"
        },
        lastPrediction: "miss",
        followers: "10K",
        stats: {
            accuracy: 25,
            totalSignals: "50",
        },
        posts: []
    }
];

export const getInfluencerBySlug = async (slug: string): Promise<Influencer | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_INFLUENCERS.find((inf) => inf.slug === slug) || null;
};
