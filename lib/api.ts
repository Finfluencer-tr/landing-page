import { Influencer } from "./mockData";

const BASE_URL = "https://api.finfluencer.tr";

export interface ApiInfluencer {
  id: number;
  username: string;
  rank: number;
  score: number;
  top_asset: string;
  trend_7d: number[];
  followers: number;
  latest_prediction?: string;
  avatar?: string;
  name?: string;
}

export interface InfluencerProfile {
  username: string;
  name: string;
  description: string;
  followers: number;
  following: number;
  statuses: number;
  location: string;
  url: string;
  avatar: string;
  banner: string;
  verified: boolean;
  joined_at: string;
}

export interface InfluencerMetrics {
  score: number;
  rank: number;
  top_asset: string;
  trend_7d: number[];
  latest_prediction: string | null;
}

export interface InfluencerStats {
  total_analyzed: number;
  financial_count: number;
  avg_performance: string;
}

export interface DetailedInfluencer {
  profile: InfluencerProfile;
  metrics: InfluencerMetrics;
  stats: InfluencerStats;
}

export const getMediaUrl = (key: string): string => {
  if (!key) return "";
  if (key.startsWith("http") || key.startsWith("data:")) return key;
  const normalizedKey = key.startsWith("/") ? key : `/${key}`;
  return `${BASE_URL}/media?key=${normalizedKey}`;
};

// Map DetailedInfluencer to compat Influencer (optional, for backwards compat if needed)
// But we will likely use DetailedInfluencer in the new page.

export interface ApiResponse {
  influencers: ApiInfluencer[];
  meta: any;
}

export interface FetchInfluencersParams {
  page?: number;
  limit?: number;
  sortBy?: "score" | "rank";
  search?: string;
}

export const fetchInfluencers = async (params: FetchInfluencersParams = {}): Promise<Influencer[]> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());
  if (params.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params.search) queryParams.append("search", params.search);

  try {
    const res = await fetch(`${BASE_URL}/influencers?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data: ApiResponse = await res.json();

    return data.influencers.map(mapApiInfluencerToInfluencer);
  } catch (error) {
    console.error("Failed to fetch influencers:", error);
    return [];
  }
};

const mapApiInfluencerToInfluencer = (apiInf: ApiInfluencer): Influencer => {
  return {
    id: apiInf.id.toString(),
    rank: apiInf.rank,
    name: apiInf.name || apiInf.username, 
    handle: `@${apiInf.username}`,
    slug: apiInf.username.toLowerCase().replace(/\s+/g, '-'),
    
    // Mapped fields
    credibilityScore: apiInf.score,
    trend: apiInf.trend_7d,
    topAsset: {
      symbol: apiInf.top_asset,
      icon: getAssetIcon(apiInf.top_asset),
    },

    avatar: apiInf.avatar ? `${BASE_URL}/media?key=/${apiInf.avatar}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiInf.username}`,
    platform: "twitter", // Default
    lastPrediction: (apiInf.latest_prediction?.toLowerCase().includes("hit") ? "hit" : "miss") as "hit" | "miss", // Heuristic
    followers: formatFollowers(apiInf.followers),
    stats: {
      accuracy: 0, // Not in response
      totalSignals: "0",
    },
    posts: [],
  };
};

const formatFollowers = (count: number): string => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
    if (count >= 1000) return (count / 1000).toFixed(1) + "K";
    return count.toString();
};

const getAssetIcon = (symbol: string): string => {
  const icons: Record<string, string> = {
    BTC: "₿",
    ETH: "Ξ",
    SOL: "◎",
    AVAX: "🔺",
    APE: "🦍",
    DOGE: "Ð",
    BNB: "🔶",
    EURUSD: "💶",
    SHIB: "🐕",
  };
  return icons[symbol.toUpperCase()] || "💰";
};

export const fetchInfluencerDetails = async (username: string): Promise<DetailedInfluencer | null> => {
  try {
    const res = await fetch(`${BASE_URL}/influencers/${username}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`API error: ${res.status}`);
    }
    const data: DetailedInfluencer = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch influencer details:", error);
    return null;
  }
};

export const getInfluencerBySlug = async (slug: string): Promise<DetailedInfluencer | null> => {
    // Slug is assumed to be username
    return await fetchInfluencerDetails(slug);
};
