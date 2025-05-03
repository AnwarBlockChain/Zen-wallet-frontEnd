import axios from 'axios';

// Types for CoinMarketCap API responses
export interface CMCCoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  last_updated: string;
  date_added: string;
  tags: string[];
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  };
}

export interface CMCApiResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: CMCCoin[];
}

export interface CMCCoinDetails {
  id: number;
  name: string;
  symbol: string;
  category: string;
  description: string;
  slug: string;
  logo: string;
  subreddit: string;
  notice: string;
  tags: string[];
  cmc_rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  urls: {
    website: string[];
    twitter: string[];
    message_board: string[];
    chat: string[];
    explorer: string[];
    reddit: string[];
    technical_doc: string[];
    source_code: string[];
    announcement: string[];
  };
  platform: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  } | null;
  date_added: string;
  twitter_username: string;
  is_hidden: number;
  date_launched: string | null;
  contract_address: string[];
  self_reported_circulating_supply: number | null;
  self_reported_tags: string[] | null;
  self_reported_market_cap: number | null;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      volume_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_90d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
      last_updated: string;
    };
  };
}

export interface CMCMetadataResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
    elapsed: number;
    credit_count: number;
    notice: string | null;
  };
  data: {
    [key: string]: CMCCoinDetails;
  };
}

/**
 * Get latest listings with market data
 * @param limit Number of results to return
 * @param start Start position (pagination)
 * @returns Promise with coin listing data
 */
export const getLatestListings = async (limit = 100, start = 1): Promise<CMCCoin[]> => {
  try {
    const response = await axios.get<CMCApiResponse>('/api/crypto/listings', {
      params: {
        limit,
        start,
      },
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest listings:', error);
    return [];
  }
};

/**
 * Get detailed information for a specific coin
 * @param id CoinMarketCap ID of the coin
 * @returns Promise with coin details
 */
export const getCoinDetails = async (id: string | number): Promise<CMCCoinDetails | null> => {
  try {
    const response = await axios.get<CMCMetadataResponse>('/api/crypto/info', {
      params: {
        id,
      },
    });
    
    return response.data.data[id.toString()] || null;
  } catch (error) {
    console.error(`Error fetching coin details for ID ${id}:`, error);
    return null;
  }
};

/**
 * Get historical data for a specific coin
 * @param id CoinMarketCap ID of the coin
 * @param timeRange Time range for historical data ('1d', '7d', '30d', '90d', etc.)
 * @returns Promise with historical price data
 */
export const getHistoricalData = async (id: string | number, timeRange = '30d') => {
  try {
    // Due to API limitations, we'll use the TradingView for historical data
    // This function is kept for future implementation if needed
    return null;
  } catch (error) {
    console.error(`Error fetching historical data for ID ${id}:`, error);
    return null;
  }
}; 