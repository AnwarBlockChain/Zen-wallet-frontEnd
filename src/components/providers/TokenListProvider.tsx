'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchTokenList, searchTokens, TokenInfo } from '@/services/tokenListService';

interface TokenListContextType {
    tokens: TokenInfo[];
    searchResults: TokenInfo[];
    isLoading: boolean;
    error: Error | null;
    search: (query: string, chainId?: number) => Promise<void>;
    refreshTokens: (chainId?: number) => Promise<TokenInfo[]>;
}

const TokenListContext = createContext<TokenListContextType | undefined>(undefined);

export function TokenListProvider({ children, defaultChainId = 1 }: { children: ReactNode, defaultChainId?: number }) {
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [searchResults, setSearchResults] = useState<TokenInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refreshTokens = async (chainId = defaultChainId) => {
        setIsLoading(true);
        setError(null);
        try {
            const tokenList = await fetchTokenList(chainId);
            setTokens(tokenList);
            return tokenList;
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(err?.message || 'Failed to fetch tokens'));
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const search = async (query: string, chainId = defaultChainId) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const results = await searchTokens(query, chainId);
            setSearchResults(results);
        } catch (err: any) {
            setError(err instanceof Error ? err : new Error(err?.message || 'Failed to search tokens'));
        } finally {
            setIsLoading(false);
        }
    };

    // Load tokens on initial mount
    useEffect(() => {
        refreshTokens();
    }, [defaultChainId]);

    return (
        <TokenListContext.Provider value={{
            tokens,
            searchResults,
            isLoading,
            error,
            search,
            refreshTokens
        }}>
            {children}
        </TokenListContext.Provider>
    );
}

export function useTokenList() {
    const context = useContext(TokenListContext);
    if (context === undefined) {
        throw new Error('useTokenList must be used within a TokenListProvider');
    }
    return context;
} 