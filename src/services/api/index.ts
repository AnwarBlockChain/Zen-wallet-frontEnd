import Moralis from 'moralis';


export interface Token {
    symbol: string;
    name: string;
    iconUrl?: string;
    balance: string;
    value: string;
    address: string;
    decimals: number;
    type: string;
    price: number;
}

export interface TokenPrice {
    usd: number;
    usd_24h_change?: number;
}

// Add this at the top of the file (outside any functions)
let moralisStarted = false;

async function ensureMoralisStarted() {
    if (!moralisStarted) {
        try {
            await Moralis.start({
                apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY || '',
            });
            moralisStarted = true;
        } catch (error) {
            if (error.message && error.message.includes("Modules are started already")) {
                moralisStarted = true;
            } else {
                console.error("Failed to initialize Moralis:", error);
                throw error;
            }
        }
    }
}

export const fetchTokens = async (address: string, chainIdHex: string): Promise<Token[]> => {
    if (!address || !chainIdHex) return [];

    try {
        // Ensure Moralis is initialized only once
        await ensureMoralisStarted();

        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            chain: chainIdHex, // Use the hex chain ID directly
            excludeSpam: true,
            address: address
        });
        const tokens: Token[] = response.raw.map((token: any) => {
            const isNative = token.token_address === "0x0000000000000000000000000000000000000000";

            return {
                symbol: token.symbol || '',
                name: token.name || '',
                iconUrl: token.logo || '',
                balance: token.balance || '0',
                value: token.percentage_relative_to_total_supply ?
                    (parseFloat(token.balance) * token.percentage_relative_to_total_supply * 100).toString() : '0',
                address: token.token_address,
                decimals: parseInt(token.decimals || '18'),
                type: isNative ? 'native' : 'erc20',
                price: token.security_score ? parseFloat(token.security_score) / 100 : 0
            };
        });

        return tokens;
    } catch (error) {
        console.error('Error fetching token balances from Moralis:', error);
        throw error;
    }
};

export const fetchTokenPrice = async (tokenAddress: string, chainId: string): Promise<TokenPrice | null> => {
    // Helper to convert chainId to Coingecko chain ID format
    const getCoingeckoChainId = (chainIdHex: string): string => {
        switch (chainIdHex) {
            case '0x1': return 'ethereum';
            case '0x89': return 'polygon-pos';
            case '0x2105': return 'base';
            case '0xa': return 'optimistic-ethereum';
            case '0x38': return 'binance-smart-chain';
            case '0xa86a': return 'avalanche';
            case '0xa4b1': return 'arbitrum-one';
            default: return 'ethereum';
        }
    };
    try {
        // You can replace this with your preferred price API
        // Examples: CoinGecko, Moralis, DefiLlama, etc.
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/${getCoingeckoChainId(chainId)}?contract_addresses=${tokenAddress}&vs_currencies=usd&include_24hr_change=true`);

        if (!response.ok) {
            throw new Error('Failed to fetch token price');
        }

        const data = await response.json();
        return data[tokenAddress.toLowerCase()] || null;
    } catch (error) {
        console.error('Error fetching token price:', error);
        return null;
    }
};

// Add export from tokens.ts
export { getTokenList } from './tokens';

// Add exports from swap.ts
export {
    swapApproval,
    getSwapQuote,
    classicSwapQuote,
    swapTransaction,
    getLiveTokenPrices,
    getFusionQuote,
    executeFusionSwap
} from './swap';

