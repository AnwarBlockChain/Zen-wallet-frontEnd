'use client';

import { useEffect, useState, useMemo } from 'react';
import { ethers } from 'ethers';
import { Token } from '../../../hooks/useWalletTokens';

interface SendTransactionTokenListProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectToken: (token: Token) => void;
    tokens: Token[];
    isLoading: boolean;
    error: Error | null;
    refetchTokens: () => void;
    selectedToken: Token | null;
}

const SendTransactionTokenList = ({
    isOpen,
    onClose,
    onSelectToken,
    tokens,
    isLoading,
    error,
    refetchTokens,
    selectedToken
}: SendTransactionTokenListProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

    // Filter tokens based on search query
    const filteredTokens = useMemo(() => {
        if (!searchQuery.trim()) return tokens;

        const lowerCaseQuery = searchQuery.toLowerCase();
        return tokens.filter(token =>
            token.name.toLowerCase().includes(lowerCaseQuery) ||
            token.symbol.toLowerCase().includes(lowerCaseQuery) ||
            token.address.toLowerCase().includes(lowerCaseQuery)
        );
    }, [tokens, searchQuery]);

    // Helper function to truncate addresses
    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Format balance with 3 decimal places
    const formatBalance = (balance: string | null | undefined) => {
        if (!balance) return '0.000';

        try {
            const numericBalance = parseFloat(balance);
            return numericBalance.toFixed(3);
        } catch (error) {
            return '0.000';
        }
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
        setSearchQuery(e.target.value);
    };

    // Reset search when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-premium-black/60 backdrop-blur-2xl transition-all duration-300"
            style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
            }}
        >
            <div
                className="w-full max-w-md bg-premium-black/90 border border-premium-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
                style={{
                    boxShadow: '0 0 50px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.05)',
                    animation: 'fadeIn 0.2s ease-out, scaleIn 0.2s ease-out'
                }}
            >
                <div className="p-3 md:p-4 border-b border-premium-white/10 flex items-center justify-between">
                    <h3 className="text-premium-white text-base md:text-lg font-medium">Select Token</h3>
                    <button
                        onClick={onClose}
                        className="text-light-gray hover:text-premium-white p-1 rounded-full hover:bg-premium-white/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <style jsx global>{`
                    @keyframes scaleIn {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.2);
                    }
                `}</style>

                <div className="relative p-3 md:p-4 border-b border-premium-white/5">
                    <input
                        type="text"
                        placeholder="Search token by name or address"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full bg-premium-white/5 text-premium-white border border-premium-white/10 rounded-lg p-2 md:p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
                    />
                    <div className="absolute top-1/2 left-5 transform -translate-y-1/2 text-light-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                        <div className="flex min-h-64 justify-center items-center p-6">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mb-2"></div>
                        </div>
                    ) : error ? (
                        <div className="p-6 text-center">
                            <div className="bg-red-500/10 p-3 rounded-lg mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-red-400 text-sm">Failed to load tokens</p>
                            <button
                                className="mt-3 text-xs bg-premium-white/10 hover:bg-premium-white/20 px-3 py-1.5 rounded-lg text-light-gray transition-colors"
                                onClick={refetchTokens}
                            >
                                Retry
                            </button>
                        </div>
                    ) : filteredTokens.length === 0 ? (
                        <div className="p-6 text-center">
                            <div className="bg-premium-white/5 p-3 rounded-lg mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-gray mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <p className="text-light-gray text-sm">
                                {searchQuery ? 'No tokens matching your search' : 'No tokens found in your wallet'}
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-premium-white/5">
                            {filteredTokens.map((token, index) => (
                                <li
                                    key={token.address + index}
                                    className={`p-4 hover:bg-premium-white/5 cursor-pointer transition-colors ${selectedToken?.address === token.address ? 'bg-premium-white/10' : ''}`}
                                    onClick={() => {
                                        onSelectToken(token);
                                        onClose();
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 mr-3">
                                                {token.iconUrl ? (
                                                    <img
                                                        src={token.iconUrl}
                                                        alt={token.symbol}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                const span = document.createElement('span');
                                                                span.className = "text-blue-400 text-sm font-medium";
                                                                span.textContent = token.symbol.substring(0, 2);
                                                                parent.appendChild(span);
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-blue-400 text-sm font-medium">{token.symbol.substring(0, 2)}</span>
                                                )}
                                            </div>
                                            <div className="text-left">
                                                <div className="flex items-center">
                                                    <span className="text-premium-white font-medium text-base">{token.symbol}</span>
                                                </div>
                                                <div className="text-light-gray text-sm truncate max-w-[180px]">{token.name}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-premium-white text-base font-medium">
                                                <span> {formatBalance(ethers.formatUnits(token.balance, token.decimals))}</span> <span className='text-light-gray'>{token.symbol}</span>
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

export default SendTransactionTokenList; 