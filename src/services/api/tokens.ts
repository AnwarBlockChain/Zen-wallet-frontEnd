import axios from 'axios';

// Token interface matching what's used in TokenListModal
export interface Token {
    chainId: number;
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI: string;
    providers?: string[];
    eip2612?: boolean;
    isFoT?: boolean;
    tags?: string[];
}

/**
 * Fetches token list from various sources, prioritizing Uniswap token list
 * @param query Optional search query to filter tokens
 * @returns Promise with array of tokens
 */
export async function getTokenList(query?: string): Promise<Token[]> {
    try {
        // Default to Uniswap token list
        const response = await axios.get('https://gateway.ipfs.io/ipns/tokens.uniswap.org');

        if (!response.data || !response.data.tokens) {
            throw new Error('Invalid token list format');
        }

        let tokens = response.data.tokens as Token[];

        // Filter by query if provided
        if (query) {
            const lowerQuery = query.toLowerCase();
            tokens = tokens.filter(token =>
                token.name.toLowerCase().includes(lowerQuery) ||
                token.symbol.toLowerCase().includes(lowerQuery) ||
                token.address.toLowerCase().includes(lowerQuery)
            );
        }

        // Limit to a reasonable number
        return tokens.slice(0, 100);
    } catch (error) {
        console.error('Error fetching token list:', error);
        return [];
    }
} 