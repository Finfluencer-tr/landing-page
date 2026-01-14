const BASE_URL = "https://api.finfluencer.tr";

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

export interface InfluencerLeaderboardStats {
    accuracy: number;
    totalSignals: string;
}

export interface Influencer {
    id: string;
    rank: number;
    name: string;
    handle: string;
    avatar: string;
    platform: "twitter" | "instagram" | "telegram";
    slug: string;
    
    // Leaderboard specific
    credibilityScore: number;
    trend: number[];
    topAsset: {
        symbol: string;
        icon: string; 
    };
    lastPrediction: "hit" | "miss";
    followers: string;

    // Profile specific (legacy/mixed)
    stats: InfluencerLeaderboardStats;
    posts: Post[];
}

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

export interface TweetAuthor {
  username: string;
  avatar: string;
}

export interface TweetMedia {
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface TweetMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

export interface InfluencerTweet {
  id: string;
  text: string;
  created_at: string;
  is_financial: boolean;
  metrics: TweetMetrics;
  media?: TweetMedia[];
  analysis: {
    entities: any[];
    sentiment?: "Bullish" | "Bearish" | "Neutral";
    asset?: string;
  };
  author: TweetAuthor;
}

export interface TweetMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InfluencerTweetsResponse {
  tweets: InfluencerTweet[];
  meta: TweetMeta;
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
    const data = await res.json();
    
    // Handle { success: false, message: "..." } or similar
    if (data.success === false) {
      console.error("API returned success: false", data.message);
      return null;
    }

    // If the data is nested under a key, handle it (though current mock shows direct)
    // Based on previous screenshots, it was direct.
    
    // Defensive check: ensure critical fields exist
    if (!data || !data.profile || !data.metrics || !data.stats) {
      console.error("API returned incomplete data for influencer", username, data);
      return null;
    }

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

export const fetchInfluencerTweets = async (
  username: string,
  page: number = 1,
  limit: number = 10,
  isFinancial?: boolean
): Promise<InfluencerTweetsResponse | null> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (isFinancial !== undefined) {
      queryParams.append("is_financial", isFinancial.toString());
    }

    const res = await fetch(`${BASE_URL}/influencers/${username}/tweets?${queryParams.toString()}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    const data: InfluencerTweetsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch influencer tweets:", error);
    return null;
  }
};
