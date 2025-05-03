"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowDownIcon, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccount } from 'wagmi';
import { EnhancedTokenSelector } from './EnhancedTokenSelector';

interface TokenData {
  symbol: string;
  name: string;
  balance: string;
  formattedBalance: string;
}

export function SwapInterface() {
  const { isConnected } = useAccount();
  // const [activeTab, setActiveTab] = useState('swap');
  const [activeTab, setActiveTab] = useState('receive');
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [showTokenSelectorFor, setShowTokenSelectorFor] = useState<'input' | 'output' | null>(null);

  // Mock tokens for demonstration
  const [inputToken, setInputToken] = useState<TokenData>({
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '0.016',
    formattedBalance: '0.016'
  });

  const [outputToken, setOutputToken] = useState<TokenData | null>(null);

  const handleSelectToken = (token: TokenData) => {
    if (showTokenSelectorFor === 'input') {
      setInputToken(token);
    } else if (showTokenSelectorFor === 'output') {
      setOutputToken(token);
    }
    setShowTokenSelectorFor(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputAmount(value);
    // In a real app, this would calculate the output amount based on price
    if (value) {
      const calculated = (parseFloat(value) * 0.95).toString();
      setOutputAmount(calculated);
    } else {
      setOutputAmount('');
    }
  };

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
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-white shadow-lg border-gray-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Tabs defaultValue="swap" className="w-[200px]" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="swap">Swap</TabsTrigger>
                <TabsTrigger value="buy">Buy</TabsTrigger>
              </TabsList>
            </Tabs>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Input Token Section */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="text-sm text-gray-500 mb-1">You pay</div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={inputAmount}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-transparent text-3xl w-full outline-none"
                />
                <button
                  onClick={() => setShowTokenSelectorFor('input')}
                  className="flex items-center gap-2 py-1 px-2 rounded-full bg-white border border-gray-200 hover:border-gray-300"
                >
                  {inputToken && (
                    <>
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={getTokenIconPath(inputToken.symbol)}
                          alt={inputToken.symbol}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{inputToken.symbol}</span>
                      <ArrowDownIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {inputToken && isConnected && (
                <div className="text-xs text-right text-gray-500 mt-1">
                  Balance: {inputToken.formattedBalance} {inputToken.symbol}
                </div>
              )}
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="p-1 rounded-full bg-gray-100">
                <ArrowDownIcon className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Output Token Section */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <div className="text-sm text-gray-500 mb-1">You receive</div>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={outputAmount}
                  placeholder="0"
                  readOnly
                  className="bg-transparent text-3xl w-full outline-none"
                />
                <button
                  onClick={() => setShowTokenSelectorFor('output')}
                  className="flex items-center gap-2 py-1 px-2 rounded-full bg-white border border-gray-200 hover:border-gray-300"
                >
                  {outputToken ? (
                    <>
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <Image
                          src={getTokenIconPath(outputToken.symbol)}
                          alt={outputToken.symbol}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{outputToken.symbol}</span>
                      <ArrowDownIcon className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Select token</span>
                      <ArrowDownIcon className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              {outputToken && isConnected && (
                <div className="text-xs text-right text-gray-500 mt-1">
                  Balance: {outputToken.formattedBalance} {outputToken.symbol}
                </div>
              )}
            </div>

            {/* Connect Wallet Button or Swap Button */}
            <Button
              className="w-full py-6 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
            >
              {isConnected ? (
                outputToken ? "Swap" : "Select a token"
              ) : (
                "Connect wallet"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Token Selector Modal */}
      {showTokenSelectorFor && (
        <EnhancedTokenSelector
          isOpen={showTokenSelectorFor !== null}
          onClose={() => setShowTokenSelectorFor(null)}
          onSelectToken={handleSelectToken}
        />
      )}
    </div>
  );
} 