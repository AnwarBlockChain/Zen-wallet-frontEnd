"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface TokenData {
  symbol: string;
  name: string;
  balance: string;
  formattedBalance: string;
}

// Mock token data for the selector
const mockTokens: TokenData[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '0.016',
    formattedBalance: '0.016'
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    balance: '0.001',
    formattedBalance: '0.001'
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    balance: '250.75',
    formattedBalance: '250.75'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    balance: '125.50',
    formattedBalance: '125.50'
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    balance: '300.20',
    formattedBalance: '300.20'
  }
];

interface EnhancedTokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: TokenData) => void;
}

export function EnhancedTokenSelector({
  isOpen,
  onClose,
  onSelectToken
}: EnhancedTokenSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTokens = mockTokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Helper function to get token icon path from cryptocurrency-icons
  const getTokenIconPath = (symbol: string) => {
    try {
      // Use icons from the public directory
      return `/icons/crypto/${symbol.toLowerCase()}.svg`;
    } catch (error) {
      // Fallback to a generic icon if the specific one isn't found
      console.error(`Icon not found for ${symbol}`, error);
      return `/icons/crypto/generic.svg`;
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Select a token</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search name or paste address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-2"
            />
          </div>
          
          {/* Common tokens */}
          <div className="flex flex-wrap gap-2">
            {mockTokens.slice(0, 4).map(token => (
              <button
                key={token.symbol}
                onClick={() => onSelectToken(token)}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <div className="relative h-5 w-5 overflow-hidden rounded-full">
                  <Image
                    src={getTokenIconPath(token.symbol)}
                    alt={token.symbol}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{token.symbol}</span>
              </button>
            ))}
          </div>
          
          {/* Token list */}
          <div className="max-h-[300px] overflow-y-auto pr-1 space-y-1">
            {filteredTokens.length > 0 ? (
              <div className="space-y-1">
                {filteredTokens.map((token) => (
                  <button
                    key={token.symbol}
                    className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => onSelectToken(token)}
                  >
                    <div className="relative h-8 w-8 overflow-hidden rounded-full mr-3">
                      <Image
                        src={getTokenIconPath(token.symbol)}
                        alt={token.symbol}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{token.symbol}</span>
                      <span className="text-xs text-gray-500">{token.name}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-medium">{token.formattedBalance}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No tokens found</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 