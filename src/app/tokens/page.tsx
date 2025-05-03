"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getLatestListings, CMCCoin } from '@/services/cmcService';
import TokenSkeleton from '@/components/ui/TokenSkeleton';
import TokensFilter from '@/components/ui/TokensFilter';
import PriceChange from '@/components/ui/PriceChange';
import CurrencyValue from '@/components/ui/CurrencyValue';
import { useRouter } from 'next/navigation';

export default function TokensPage() {
  const [tokens, setTokens] = useState<CMCCoin[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<CMCCoin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(50);
  const [timeframe, setTimeframe] = useState('24h');
  const router = useRouter();

  // Fetch token data from CoinMarketCap API
  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const data = await getLatestListings(250, 1);
        setTokens(data);
        setFilteredTokens(data.slice(0, limit));
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    if (tokens.length === 0) return;

    // Filter tokens based on search term
    let filtered = tokens;
    if (search) {
      filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply limit
    setFilteredTokens(filtered.slice(0, limit));
  }, [tokens, search, limit, timeframe]);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  // Handle limit change
  const handleLimitChange = (value: number) => {
    setLimit(value);
  };

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
  };

  // Get percent change value based on selected timeframe
  const getPercentChange = (token: CMCCoin) => {
    switch (timeframe) {
      case '1h':
        return token.quote.USD.percent_change_1h;
      case '7d':
        return token.quote.USD.percent_change_7d;
      case '30d':
        return token.quote.USD.percent_change_30d;
      case '90d':
        return token.quote.USD.percent_change_90d;
      case '24h':
      default:
        return token.quote.USD.percent_change_24h;
    }
  };

  // Navigate to coin detail page
  const handleCoinClick = (coin: CMCCoin) => {
    router.push(`/tokens/${coin.symbol.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-premium-black">
      <Navbar />
      <main className="container mx-auto py-10 px-4 pt-28">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-premium-white">Top Tokens</h1>
          <p className="text-light-gray">Explore the most popular cryptocurrencies by market cap</p>
        </div>

        <TokensFilter
          onSearchChange={handleSearchChange}
          onLimitChange={handleLimitChange}
          onTimeframeChange={handleTimeframeChange}
          searchValue={search}
          limitValue={limit}
          timeframeValue={timeframe}
        />

        {isLoading ? (
          <TokenSkeleton rows={limit} />
        ) : (
          <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-off-black text-left">
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">
                      {timeframe} Change
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Market Cap</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Volume (24h)</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-medium-gray">
                  {filteredTokens.map((token) => (
                    <tr 
                      key={token.id} 
                      className="hover:bg-off-black transition-colors cursor-pointer"
                      onClick={() => handleCoinClick(token)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">{token.cmc_rank}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-medium-gray">
                            <Image
                              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`}
                              alt={token.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-premium-white">{token.name}</div>
                            <div className="text-sm text-light-gray">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-premium-white">
                        <CurrencyValue value={token.quote.USD.price} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <PriceChange value={getPercentChange(token)} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">
                        <CurrencyValue value={token.quote.USD.market_cap} abbreviate={true} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">
                        <CurrencyValue value={token.quote.USD.volume_24h} abbreviate={true} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link 
                          href={`/swap?token=${token.symbol}`}
                          className="text-premium-white bg-accent hover:bg-medium-gray px-4 py-2 rounded-lg font-medium transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Trade
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
} 