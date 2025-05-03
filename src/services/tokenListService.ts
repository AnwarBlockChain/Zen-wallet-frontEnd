import axios from 'axios';

// Hardcoded list of popular tokens across major chains
export const POPULAR_TOKENS = [
    {
        chainId: 1,
        symbol: 'ETH',
        name: 'Ethereum',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
    },
    {
        chainId: 1,
        symbol: 'WETH',
        name: 'Wrapped Ether',
        address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
    },
    {
        chainId: 1,
        symbol: 'USDC',
        name: 'USD Coin',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
        logoURI: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
    },
    {
        chainId: 1,
        symbol: 'USDT',
        name: 'Tether USD',
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        decimals: 6,
        logoURI: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    },
    {
        chainId: 1,
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png',
    },
    {
        chainId: 1,
        symbol: 'WBTC',
        name: 'Wrapped BTC',
        address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
        decimals: 8,
        logoURI: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
    },
    {
        chainId: 1,
        symbol: 'UNI',
        name: 'Uniswap',
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
    },
    {
        chainId: 1,
        symbol: 'LINK',
        name: 'ChainLink Token',
        address: '0x514910771af9ca656af840dff83e8264ecf986ca',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0x514910771af9ca656af840dff83e8264ecf986ca.png',
    },
    {
        chainId: 56, // Binance Smart Chain
        symbol: 'BNB',
        name: 'Binance Coin',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png',
    },
    {
        chainId: 137, // Polygon
        symbol: 'MATIC',
        name: 'Polygon',
        address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
        decimals: 18,
        logoURI: 'https://tokens.1inch.io/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270.png',
    }
];

export interface TokenInfo {
    chainId: number;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
    providers?: string[];
    eip2612?: boolean;
    isFoT?: boolean;
    tags?: string[] | { value: string; provider: string }[];
    rating?: string;
    marketCap?: number;
}

export const fetchTokenList = async (chainId?: number): Promise<TokenInfo[]> => {
    try {
        // Filter the hardcoded list by chainId if provided
        let filteredTokens = chainId
            ? POPULAR_TOKENS.filter(token => token.chainId === chainId)
            : POPULAR_TOKENS;

        // Deduplicate tokens by address (case-insensitive) and chain ID
        const uniqueTokens: TokenInfo[] = [];
        const seenKeys = new Set<string>();

        for (const token of filteredTokens) {
            const key = `${token.chainId}-${token.address.toLowerCase()}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueTokens.push(token);
            }
        }

        return uniqueTokens;
    } catch (error) {
        console.error('Error fetching token list:', error);
        return [];
    }
};

export const searchTokens = async (query: string, chainId?: number): Promise<TokenInfo[]> => {
    if (!query.trim()) return [];

    try {
        // Use our API route instead of calling 1inch directly (to avoid CORS)
        const params: any = { query };
        if (chainId) params.chainId = chainId;

        console.log(`Searching tokens via API route: ${query}`);
        const response = await axios.get('/api/tokens/search', { params });

        let results: TokenInfo[] = [];

        if (response.data && Array.isArray(response.data)) {
            console.log(`Found ${response.data.length} tokens from API`);
            results = response.data;
        } else {
            // If API returns no results, fallback to popular tokens
            console.log('No tokens found from API, falling back to popular tokens');
            const lcQuery = query.toLowerCase();
            results = POPULAR_TOKENS.filter(token =>
                (!chainId || token.chainId === chainId) &&
                (token.symbol.toLowerCase().includes(lcQuery) ||
                    token.name.toLowerCase().includes(lcQuery) ||
                    token.address.toLowerCase().includes(lcQuery))
            );
        }

        // Deduplicate results
        const uniqueResults: TokenInfo[] = [];
        const seenKeys = new Set<string>();

        for (const token of results) {
            const key = `${token.chainId}-${token.address.toLowerCase()}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueResults.push(token);
            }
        }

        return uniqueResults;
    } catch (error) {
        console.error('Error searching tokens:', error);
        // If API call fails, fall back to popular tokens
        const lcQuery = query.toLowerCase();
        const results = POPULAR_TOKENS.filter(token =>
            (!chainId || token.chainId === chainId) &&
            (token.symbol.toLowerCase().includes(lcQuery) ||
                token.name.toLowerCase().includes(lcQuery) ||
                token.address.toLowerCase().includes(lcQuery))
        );

        // Deduplicate results
        const uniqueResults: TokenInfo[] = [];
        const seenKeys = new Set<string>();

        for (const token of results) {
            const key = `${token.chainId}-${token.address.toLowerCase()}`;
            if (!seenKeys.has(key)) {
                seenKeys.add(key);
                uniqueResults.push(token);
            }
        }

        return uniqueResults;
    }
};

export const getTokenBySymbol = (tokenList: TokenInfo[], symbol: string): TokenInfo | undefined => {
    const popularToken = POPULAR_TOKENS.find(token => token.symbol.toUpperCase() === symbol.toUpperCase());
    if (popularToken) return popularToken;

    return tokenList.find(token => token.symbol.toUpperCase() === symbol.toUpperCase());
};

export const getTokenByAddress = (tokenList: TokenInfo[], address: string): TokenInfo | undefined => {
    const popularToken = POPULAR_TOKENS.find(token => token.address.toLowerCase() === address.toLowerCase());
    if (popularToken) return popularToken;

    return tokenList.find(token => token.address.toLowerCase() === address.toLowerCase());
};

// For backward compatibility
export const fetchUniswapTokenList = fetchTokenList; 