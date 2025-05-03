'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { POPULAR_TOKENS } from '@/services/tokenListService';
import { useTokenBalances } from '@/hooks/useTokenBalances';

interface Token {
    chainId: number;
    symbol: string;
    name: string;
    address: string;
    decimals: number;
    logoURI?: string;
    providers?: string[];
    eip2612?: boolean;
    isFoT?: boolean;
    tags?: string[] | { value: string; provider: string }[];
}

interface TokenListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectToken: (token: Token) => void;
    type: 'from' | 'to';
}

const TokenListModal = ({
    isOpen,
    onClose,
    onSelectToken,
    type
}: TokenListModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
    const [tokens, setTokens] = useState<Token[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Calculate token addresses for balance tracking
    const tokenAddresses = useMemo(() => {
        if (!isOpen) return [];
        return tokens.map(token => token.address);
    }, [tokens, isOpen]);

    // Get token balances
    const { getBalance, isLoading: isLoadingBalances } = useTokenBalances(tokenAddresses);

    // Format balance
    const formatBalance = (address: string): string => {
        const balance = getBalance(address);
        if (!balance?.formattedBalance) return '0';

        const formattedBalance = Number(balance.formattedBalance);
        if (formattedBalance < 0.001) return '< 0.001';
        if (formattedBalance < 1) return formattedBalance.toFixed(4);
        return formattedBalance.toFixed(2);
    };

    // Scroll to top when modal opens or tokens change
    useEffect(() => {
        if (isOpen && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [isOpen, tokens]);

    // Use debounced query for API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Load tokens when modal opens or debounced query changes
    useEffect(() => {
        if (!isOpen) return;

        if (!debouncedQuery) {
            // Load popular tokens when no search query
            setTokens(POPULAR_TOKENS);
            return;
        }

        const fetchTokens = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Use our API route instead of calling 1inch directly
                const params: any = { query: debouncedQuery };

                console.log(`Searching tokens via API route: ${debouncedQuery}`);
                const response = await axios.get('/api/tokens/search', { params });

                if (response.data && Array.isArray(response.data)) {
                    setTokens(response.data);
                    console.log(`Found ${response.data.length} tokens from API`);

                    if (response.data.length === 0) {
                        setError('No tokens found. Try a different search term.');
                    }
                } else {
                    // Fallback to popular tokens that match the search
                    const filteredTokens = POPULAR_TOKENS.filter(token =>
                        token.symbol.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                        token.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                        token.address.toLowerCase().includes(debouncedQuery.toLowerCase())
                    );

                    setTokens(filteredTokens);

                    if (filteredTokens.length === 0) {
                        setError('No tokens found. Try a different search term.');
                    }
                }
            } catch (err) {
                console.error('Error searching tokens:', err);
                setError('Failed to search tokens. Please try again.');

                // Fallback to popular tokens that match the search
                const filteredTokens = POPULAR_TOKENS.filter(token =>
                    token.symbol.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                    token.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                    token.address.toLowerCase().includes(debouncedQuery.toLowerCase())
                );

                setTokens(filteredTokens);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTokens();
    }, [isOpen, debouncedQuery]);

    // Helper function to truncate addresses
    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Helper function to truncate long text with ellipsis
    const truncateText = (text: string, maxLength: number) => {
        if (!text || text.length <= maxLength) return text;
        return `${text.slice(0, maxLength)}...`;
    };

    // Copy to clipboard with visual feedback
    const copyToClipboard = (text: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent token selection when clicking copy

        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedAddress(text);
                // Reset copied state after 2 seconds
                setTimeout(() => setCopiedAddress(null), 2000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // Clear error message when typing
        if (error) setError(null);
    };

    // Clear search query
    const clearSearch = () => {
        setSearchQuery('');
        setDebouncedQuery('');
        setError(null);
        setTokens(POPULAR_TOKENS);
    };

    // Load initial tokens when modal opens
    useEffect(() => {
        if (isOpen && !debouncedQuery) {
            setTokens(POPULAR_TOKENS);
            setIsLoading(false);
        }
    }, [isOpen]);

    // Handle token selection
    const handleSelectToken = (token: Token) => {
        onSelectToken(token);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-3 md:p-4 bg-premium-black/60 backdrop-blur-2xl transition-all duration-300 pt-20">
            <div className="w-full max-w-md bg-premium-black border border-medium-gray/30 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-3 md:p-4 border-b border-medium-gray/30">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg md:text-xl font-bold text-premium-white">
                            Select {type === 'from' ? 'Sell' : 'Buy'} Token
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-light-gray hover:text-premium-white"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-3 md:mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search name, symbol, or address"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full bg-premium-white/10 text-premium-white border border-medium-gray/30 rounded-lg p-2 md:p-3 pl-8 md:pl-10 focus:outline-none focus:ring-2 focus:ring-medium-gray/50 text-sm md:text-base"
                                autoFocus
                            />
                            <svg className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-light-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>

                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-premium-white p-1 rounded-full"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {isLoading && (
                            <div className="text-xs text-light-gray mt-1 ml-2">
                                Searching tokens...
                            </div>
                        )}
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="h-64 md:h-96 overflow-y-auto"
                    style={{ minHeight: '320px' }}
                >
                    {isLoading || isLoadingBalances ? (
                        <div className="flex h-full min-h-64 justify-center items-center p-6 md:p-8">
                            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-medium-gray"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 md:p-8 text-center text-red-400 text-sm md:text-base min-h-64">
                            {error}
                        </div>
                    ) : tokens.length === 0 ? (
                        <div className="p-6 md:p-8 text-center text-light-gray text-sm md:text-base min-h-64">No tokens found matching your search</div>
                    ) : (
                        <ul className="divide-y divide-medium-gray/20">
                            {tokens.map((token, index) => (
                                <li
                                    key={`${token.chainId}-${token.address}-${index}`}
                                    onClick={() => handleSelectToken(token)}
                                    className="p-3 md:p-4 hover:bg-premium-white/5 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-medium-gray/30 rounded-full overflow-hidden mr-2 md:mr-3 flex-shrink-0">
                                            {token.logoURI ? (
                                                <img
                                                    src={token.logoURI}
                                                    alt={token.symbol}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        // Replace broken image with fallback
                                                        (e.target as HTMLImageElement).src = `data:image/svg+xml,<svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="#555555"/><text x="18" y="18" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">${token.symbol.charAt(0)}</text></svg>`;
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-premium-white">
                                                    {token.symbol.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <div className="font-medium text-sm md:text-base text-premium-white truncate max-w-[60%]" title={token.symbol}>
                                                    {token.symbol.length > 12 ? (
                                                        <span className="inline-block">
                                                            {truncateText(token.symbol, 10)}
                                                        </span>
                                                    ) : (
                                                        token.symbol
                                                    )}
                                                </div>
                                                <div className="text-sm font-medium text-blue-400">
                                                    {formatBalance(token.address)} {token.symbol}
                                                </div>
                                            </div>
                                            <div
                                                className="text-xs md:text-sm text-light-gray truncate"
                                                title={token.name}
                                            >
                                                {truncateText(token.name, 30)}
                                            </div>

                                            {/* Address display with copy functionality */}
                                            <div className="flex items-center mt-1 relative">
                                                <div className="text-xs text-light-gray opacity-60">
                                                    {truncateAddress(token.address)}
                                                </div>
                                                <button
                                                    className="ml-2 p-0.5 md:p-1 text-light-gray hover:text-premium-white rounded-full hover:bg-premium-white/10 transition-colors"
                                                    onClick={(e) => copyToClipboard(token.address, e)}
                                                >
                                                    {copiedAddress === token.address ? (
                                                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    )}
                                                </button>

                                                {/* Show tooltip when address is copied */}
                                                {copiedAddress === token.address && (
                                                    <div className="absolute -top-6 md:-top-8 left-12 md:left-16 bg-medium-gray text-premium-white text-xs px-2 py-1 rounded pointer-events-none">
                                                        Copied!
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TokenListModal; 