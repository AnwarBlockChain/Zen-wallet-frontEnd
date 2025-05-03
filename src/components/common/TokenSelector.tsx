'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchTokenList, searchTokens, TokenInfo } from '@/services/tokenListService';
import { useTokenBalances } from '@/hooks/useTokenBalances';
import { Search, X, Check, Copy } from 'lucide-react';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: TokenInfo) => void;
  chainId?: number;
  showBalances?: boolean;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  chainId = 1,
  showBalances = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Only fetch tokens when modal is open
  useEffect(() => {
    if (isOpen) {
      loadTokens();
    }
  }, [isOpen, chainId]);

  // Memoize token addresses to prevent unnecessary API calls
  const tokenAddresses = useMemo(() => {
    // Only return addresses if modal is open and balances should be shown
    if (!isOpen || !showBalances || tokens.length === 0) {
      return [];
    }
    return tokens.map(token => token.address);
  }, [tokens, isOpen, showBalances]);

  // Fetch token balances if showBalances is true
  const { getBalance, isLoading: isLoadingBalances } = useTokenBalances(tokenAddresses);

  // Handle search with debounce
  useEffect(() => {
    if (!isOpen) return;

    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        // Only reload tokens if we don't already have them
        if (tokens.length === 0) {
          loadTokens();
        }
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, isOpen]);

  // Load popular token list
  const loadTokens = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const tokenList = await fetchTokenList(chainId);
      setTokens(tokenList);
    } catch (err) {
      console.error('Failed to load tokens:', err);
      setError('Failed to load token list');
    } finally {
      setIsLoading(false);
    }
  };

  // Search for tokens
  const handleSearch = async () => {
    if (!searchQuery.trim() || !isOpen) return;
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await searchTokens(searchQuery, chainId);
      setTokens(results);

      if (results.length === 0) {
        setError('No tokens found matching your search');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search tokens. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with immediate feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear error when user types
    if (error) setError(null);
  };

  const handleCopyAddress = (address: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  // Format address display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format token balance - memoized to prevent recalculation
  const formatBalance = (token: TokenInfo) => {
    if (!showBalances) return null;

    const balance = getBalance(token.address);
    if (!balance?.formattedBalance) return '0';

    try {
      const formatted = parseFloat(balance.formattedBalance);
      if (formatted < 0.001) return '< 0.001';
      if (formatted < 1) return formatted.toFixed(4);
      return formatted.toFixed(2);
    } catch (error) {
      console.error('Error formatting balance:', error);
      return '0';
    }
  };

  // Don't render anything if modal is closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-black/80 border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-white">Select Token</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10">
              <X size={20} />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search name or paste address"
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full px-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isLoading || isLoadingBalances ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : tokens.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              {error || (searchQuery ? 'No tokens found matching your search' : 'No tokens available')}
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {tokens.map((token, index) => (
                <li
                  key={`${token.chainId}-${token.address}-${index}`}
                  onClick={() => onSelect(token)}
                  className="p-3 hover:bg-white/5 cursor-pointer transition-colors flex items-center"
                >
                  <div className="h-9 w-9 flex-shrink-0 rounded-full bg-white/10 overflow-hidden mr-3">
                    {token.logoURI ? (
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'%3E%3C/path%3E%3C/svg%3E`;
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-white font-medium">
                        {token.symbol.slice(0, 3)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-white font-medium">{token.symbol}</span>
                      {showBalances && (
                        <span className="text-sm text-gray-300">
                          {formatBalance(token)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 truncate">{token.name}</div>

                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {formatAddress(token.address)}
                      </span>
                      <button
                        onClick={(e) => handleCopyAddress(token.address, e)}
                        className="ml-1 p-0.5 text-gray-400 hover:text-white"
                      >
                        {copiedAddress === token.address ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
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

export default TokenSelector; 