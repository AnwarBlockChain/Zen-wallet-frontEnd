import { NextResponse } from 'next/server';
import axios from 'axios';
import { POPULAR_TOKENS } from '@/services/tokenListService';

const ONEINCH_API_BASE_URL = 'https://api.1inch.dev/token/v1.2';
const ONEINCH_API_KEY = '8CwPyetmvdoWQuRRPLbGKLWGcsKFEpER';

// Simple in-memory cache with TTL
let searchCache: Record<string, { data: any[], timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes for search results

export async function GET(request: Request) {
  try {
    // Set CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle OPTIONS request for CORS preflight
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers: corsHeaders });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const chainId = searchParams.get('chainId');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // First check if we have matching popular tokens
    const lcQuery = query.toLowerCase();
    const matchingPopularTokens = POPULAR_TOKENS.filter(token =>
      (!chainId || token.chainId === parseInt(chainId as string)) &&
      (token.symbol.toLowerCase().includes(lcQuery) ||
        token.name.toLowerCase().includes(lcQuery) ||
        token.address.toLowerCase().includes(lcQuery))
    );

    console.log(`Found ${matchingPopularTokens.length} matching popular tokens for query: ${query}`);

    // Create cache key
    const cacheKey = `${query}-${chainId || 'all'}`;
    const now = Date.now();

    // Return from cache if valid
    if (searchCache[cacheKey] && (now - searchCache[cacheKey].timestamp < CACHE_TTL)) {
      console.log('Using cached search results for:', query);
      const allResults = [...matchingPopularTokens, ...searchCache[cacheKey].data];
      return NextResponse.json(allResults, { headers: corsHeaders });
    }

    // Call 1inch API
    console.log(`Searching tokens with 1inch API: ${query}, chainId: ${chainId || 'all'}`);

    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${ONEINCH_API_KEY}`
        },
        params: {
          "query": query,
          "only_positive_rating": "true"
        }
      };

      const response = await axios.get(`${ONEINCH_API_BASE_URL}/search`, config);

      if (response.data && Array.isArray(response.data)) {
        let tokens = response.data;

        if (chainId) {
          tokens = tokens.filter(token => token.chainId === parseInt(chainId as string));
        }

        // Update cache
        searchCache[cacheKey] = {
          data: tokens,
          timestamp: now
        };

        // Clean up old cache entries periodically
        if (Object.keys(searchCache).length > 50) {
          const now = Date.now();
          Object.keys(searchCache).forEach(key => {
            if (now - searchCache[key].timestamp > CACHE_TTL) {
              delete searchCache[key];
            }
          });
        }

        // Combine popular tokens with API results
        const allResults = [...matchingPopularTokens, ...tokens];
        console.log(`Found ${allResults.length} tokens matching query`);
        return NextResponse.json(allResults, { headers: corsHeaders });
      }
    } catch (error: any) {
      console.error('1inch API search error:', error.message);
      // On API error, we'll fall back to just returning popular tokens
    }

    // If we got here, API call failed or no results - return popular tokens
    return NextResponse.json(matchingPopularTokens, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error searching tokens:', error.message);

    return NextResponse.json(
      { error: error.message || 'Failed to search tokens' },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
} 