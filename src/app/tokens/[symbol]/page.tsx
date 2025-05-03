'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Info, 
  Globe, 
  Twitter, 
  Book, 
  Code, 
  Star, 
  Copy, 
  Share2, 
  DollarSign,
  BarChart3,
  Percent,
  Bookmark,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  Search,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import TradingViewChart from '@/components/ui/TradingViewChart';
import PriceChange from '@/components/ui/PriceChange';
import CurrencyValue from '@/components/ui/CurrencyValue';
import axios from 'axios';

export default function CoinDetailPage() {
  const params = useParams();
  const symbol = typeof params.symbol === 'string' ? params.symbol : Array.isArray(params.symbol) ? params.symbol[0] : '';
  const router = useRouter();
  const [coin, setCoin] = useState<any>(null);
  const [coinId, setCoinId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chartTimeframe, setChartTimeframe] = useState('1D');
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [convertAmount, setConvertAmount] = useState<string>('1');

  // Fetch coin details directly
  useEffect(() => {
    const fetchCoinDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (symbol) {
          // Get coin data by symbol
          const response = await axios.get(`/api/crypto/symbol?symbol=${symbol}`);
          
          if (response.data.error) {
            setError(response.data.error);
            setIsLoading(false);
            return;
          }
          
          // Extract the coin ID from the data
          const coinId = response.data.market_data.id.toString();
          setCoinId(coinId);
          
          // Get the coin info from the response data
          const coinInfo = response.data.data[coinId];
          
          if (!coinInfo) {
            setError('Coin data not found');
            setIsLoading(false);
            return;
          }
          
          // Combine the metadata with the price data
          setCoin({
            ...coinInfo,
            quote: response.data.market_data.quote,
            circulating_supply: response.data.market_data.circulating_supply,
            total_supply: response.data.market_data.total_supply,
            max_supply: response.data.market_data.max_supply,
            cmc_rank: response.data.market_data.cmc_rank
          });
        }
      } catch (error) {
        console.error('Error fetching coin details:', error);
        setError('Failed to load coin data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoinDetails();
  }, [symbol]);

  // Navigate back to tokens list
  const handleBack = () => {
    router.push('/tokens');
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add toast notification here
  };

  const renderSkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 rounded-full bg-medium-gray mr-4"></div>
        <div className="flex-1">
          <div className="h-8 bg-medium-gray rounded w-40 mb-2"></div>
          <div className="h-4 bg-medium-gray rounded w-20"></div>
        </div>
      </div>
      
      <div className="bg-dark-gray rounded-xl p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-10 bg-medium-gray rounded w-full mb-4"></div>
            <div className="h-8 bg-medium-gray rounded w-2/3 mb-2"></div>
            <div className="h-6 bg-medium-gray rounded w-1/2"></div>
          </div>
          <div>
            <div className="h-40 bg-medium-gray rounded w-full"></div>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-gray rounded-xl p-4 mb-8">
        <div className="h-8 bg-medium-gray rounded w-40 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-24 bg-medium-gray rounded"></div>
          <div className="h-24 bg-medium-gray rounded"></div>
          <div className="h-24 bg-medium-gray rounded"></div>
        </div>
      </div>
      
      <div className="bg-dark-gray rounded-xl p-4 h-[500px] mb-8"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-premium-black">
        <main className="container mx-auto py-10 px-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-light-gray hover:text-premium-white mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tokens
          </button>
          
          {renderSkeletonLoader()}
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen bg-premium-black">
        <main className="container mx-auto py-10 px-4 text-center">
          <button 
            onClick={handleBack}
            className="flex items-center text-light-gray hover:text-premium-white mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tokens
          </button>
          
          <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-8">
            <h2 className="text-2xl font-bold text-premium-white mb-4">Coin Not Found</h2>
            <p className="text-light-gray mb-6">{error || "The requested cryptocurrency could not be found."}</p>
            <button
              onClick={handleBack}
              className="bg-accent hover:bg-medium-gray text-premium-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Return to Tokens List
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Chart timeframe options
  const timeframes = [
    { value: '1D', label: '1D' },
    { value: '1W', label: '1W' },
    { value: '1M', label: '1M' },
    { value: '3M', label: '3M' },
    { value: '1Y', label: '1Y' },
    { value: 'ALL', label: 'ALL' },
  ];

  // Safety check for accessing nested properties
  const price = coin.quote?.USD?.price || 0;
  const percentChange24h = coin.quote?.USD?.percent_change_24h || 0;
  const percentChange7d = coin.quote?.USD?.percent_change_7d || 0;
  const percentChange30d = coin.quote?.USD?.percent_change_30d || 0;
  const marketCap = coin.quote?.USD?.market_cap || 0;
  const volume24h = coin.quote?.USD?.volume_24h || 0;
  const fullyDilutedMarketCap = coin.quote?.USD?.fully_diluted_market_cap || 0;

  // Calculate USD value based on conversion amount
  const calculateUsdValue = () => {
    const amount = parseFloat(convertAmount) || 0;
    return (amount * price).toFixed(2);
  };

  // Calculate token value based on USD
  const calculateTokenValue = (usdAmount: string) => {
    const amount = parseFloat(usdAmount) || 0;
    return price > 0 ? (amount / price).toFixed(price < 1 ? 8 : 6) : '0';
  };

  return (
    <div className="min-h-screen bg-premium-black">
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={handleBack}
            className="flex items-center text-light-gray hover:text-premium-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tokens
          </button>
          
          <div className="flex items-center space-x-3">
            <button className="text-light-gray hover:text-premium-white p-2 rounded-full hover:bg-dark-gray">
              <Star className="h-5 w-5" />
            </button>
            <button 
              className="text-light-gray hover:text-premium-white p-2 rounded-full hover:bg-dark-gray"
              onClick={() => copyToClipboard(window.location.href)}
            >
              <Copy className="h-5 w-5" />
            </button>
            <button className="text-light-gray hover:text-premium-white p-2 rounded-full hover:bg-dark-gray">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Coin Header */}
        <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 flex-shrink-0 rounded-full overflow-hidden bg-medium-gray mr-4">
                  <Image
                    src={coin.logo || `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                    alt={coin.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-premium-white mr-2">{coin.name}</h1>
                    <span className="text-sm px-2 py-1 bg-medium-gray text-light-gray rounded-full">
                      {coin.symbol}
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-xs px-2 py-1 bg-accent text-premium-white rounded-full mr-2">
                      Rank #{coin.cmc_rank || 'N/A'}
                    </span>
                    <span className="text-xs text-light-gray">
                      {coin.category || 'Cryptocurrency'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-premium-white mr-2">
                    <CurrencyValue value={price} decimals={price < 1 ? 8 : 2} />
                  </span>
                  <PriceChange value={percentChange24h} timeframe="24h" className="text-base" />
                </div>
                
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-light-gray">1h</span>
                    <PriceChange value={coin.quote?.USD?.percent_change_1h || 0} showIcon={true} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-light-gray">24h</span>
                    <PriceChange value={percentChange24h} showIcon={true} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-light-gray">7d</span>
                    <PriceChange value={percentChange7d} showIcon={true} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Converter */}
            <div className="bg-off-black rounded-xl p-4">
              <h3 className="text-sm text-light-gray uppercase mb-4">
                {coin.symbol} to USD Converter
              </h3>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden bg-medium-gray mr-2">
                    <Image
                      src={coin.logo || `https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                      alt={coin.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    className="bg-dark-gray border border-medium-gray text-premium-white px-3 py-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-accent"
                    placeholder={`Enter ${coin.symbol} amount`}
                  />
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 flex-shrink-0 rounded-full overflow-hidden bg-medium-gray mr-2 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-premium-white" />
                  </div>
                  <input
                    type="text"
                    value={calculateUsdValue()}
                    readOnly
                    className="bg-dark-gray border border-medium-gray text-premium-white px-3 py-2 rounded w-full focus:outline-none"
                    placeholder="USD value"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-medium-gray">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-premium-white border-b-2 border-accent'
                  : 'text-light-gray hover:text-premium-white'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'markets'
                  ? 'text-premium-white border-b-2 border-accent'
                  : 'text-light-gray hover:text-premium-white'
              }`}
              onClick={() => setActiveTab('markets')}
            >
              Markets
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-premium-white border-b-2 border-accent'
                  : 'text-light-gray hover:text-premium-white'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
          </div>
        </div>
        
        {/* Overview Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Key Statistics */}
            <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 mb-8">
              <h2 className="text-lg font-bold text-premium-white mb-6">{coin.name} Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray flex items-center">
                      Market Cap
                      <Info className="h-3 w-3 ml-1 text-light-gray" />
                    </span>
                    <span className="text-sm font-medium text-premium-white">
                      <CurrencyValue value={marketCap} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-light-gray">24h Volume / Market Cap</span>
                    <span className="text-xs text-light-gray">
                      {marketCap > 0 ? ((volume24h / marketCap) * 100).toFixed(2) : 0}%
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray flex items-center">
                      24h Trading Vol
                      <Info className="h-3 w-3 ml-1 text-light-gray" />
                    </span>
                    <span className="text-sm font-medium text-premium-white">
                      <CurrencyValue value={volume24h} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-light-gray">Volume Change</span>
                    <span className="text-xs text-light-gray">
                      <PriceChange value={coin.quote?.USD?.volume_change_24h || 0} showIcon={false} />
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray flex items-center">
                      Fully Diluted Market Cap
                      <Info className="h-3 w-3 ml-1 text-light-gray" />
                    </span>
                    <span className="text-sm font-medium text-premium-white">
                      <CurrencyValue value={fullyDilutedMarketCap} />
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray flex items-center">
                      Circulating Supply
                      <Info className="h-3 w-3 ml-1 text-light-gray" />
                    </span>
                    <span className="text-sm font-medium text-premium-white">
                      {(coin.circulating_supply || 0).toLocaleString()} {coin.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-light-gray">Max Supply</span>
                    <span className="text-xs text-light-gray">
                      {coin.max_supply ? coin.max_supply.toLocaleString() + ' ' + coin.symbol : 'Unlimited'}
                    </span>
                  </div>
                </div>
                
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray flex items-center">
                      Total Supply
                      <Info className="h-3 w-3 ml-1 text-light-gray" />
                    </span>
                    <span className="text-sm font-medium text-premium-white">
                      {(coin.total_supply || 0).toLocaleString()} {coin.symbol}
                    </span>
                  </div>
                  {coin.max_supply && (
                    <div className="flex justify-between">
                      <span className="text-xs text-light-gray">% of Max Supply</span>
                      <span className="text-xs text-light-gray">
                        {((coin.circulating_supply / coin.max_supply) * 100).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="border-b border-medium-gray pb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-gray">All-Time High</span>
                    <span className="text-sm font-medium text-premium-white">
                      ${coin.high_24h || '$109,114.88'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-light-gray">Date</span>
                    <span className="text-xs text-light-gray">
                      Jan 20, 2025 (2 months ago)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Price Chart */}
            <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-premium-white mb-3 md:mb-0">{coin.name} to USD Chart</h2>
                <div className="flex flex-wrap gap-2">
                  {timeframes.map((tf) => (
                    <button
                      key={tf.value}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        chartTimeframe === tf.value
                          ? 'bg-accent text-premium-white'
                          : 'bg-off-black text-light-gray hover:text-premium-white'
                      }`}
                      onClick={() => setChartTimeframe(tf.value)}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>
              <TradingViewChart 
                symbol={coin.symbol} 
                interval={chartTimeframe}
                height={500}
              />
            </div>
            
            {/* Trade CTAs */}
            <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 text-center mb-8">
              <h2 className="text-lg font-bold text-premium-white mb-4">Trade {coin.symbol} on ZenWallet</h2>
              <p className="text-light-gray mb-6">Experience fast, secure trading with low fees and maximum protection.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href={`/swap?token=${coin.symbol}`}
                  className="bg-accent hover:bg-medium-gray text-premium-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Buy {coin.symbol}
                </Link>
                <Link 
                  href="/dashboard"
                  className="border border-accent hover:border-medium-gray text-premium-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Go to Wallet
                </Link>
              </div>
            </div>
          </>
        )}
        
        {/* Markets Tab Content */}
        {activeTab === 'markets' && (
          <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-premium-white mb-6">{coin.name} Markets</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-off-black text-left">
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Exchange</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Pair</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Volume (24h)</th>
                    <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-medium-gray">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <tr key={index} className="hover:bg-off-black transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">{index}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 flex-shrink-0 rounded-full bg-medium-gray flex items-center justify-center">
                            <span className="text-sm font-medium text-premium-white">B</span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-premium-white">Binance</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-premium-white">{coin.symbol}/USDT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-premium-white">
                        <CurrencyValue value={price * (0.95 + Math.random() * 0.1)} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">
                        <CurrencyValue value={(volume24h * (0.1 + Math.random() * 0.2))} abbreviate={true} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900 text-green-300">
                          High
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* About Tab Content */}
        {activeTab === 'about' && (
          <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-premium-white mb-6">About {coin.name}</h2>
            
            <div className="mb-8">
              <h3 className="text-md font-medium text-premium-white mb-4">What is {coin.name}?</h3>
              <p className="text-light-gray mb-4 leading-relaxed">
                {coin.description || `${coin.name} (${coin.symbol}) is a cryptocurrency listed on CoinMarketCap.`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-md font-medium text-premium-white mb-4">Resources</h3>
                <div className="space-y-3">
                  {coin.urls?.website && coin.urls.website.length > 0 && (
                    <a 
                      href={coin.urls.website[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <Globe className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Official Website</span>
                        <span className="text-sm text-light-gray">{coin.urls.website[0]}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.technical_doc && coin.urls.technical_doc.length > 0 && (
                    <a 
                      href={coin.urls.technical_doc[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <Book className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Whitepaper</span>
                        <span className="text-sm text-light-gray">Technical documentation</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.explorer && coin.urls.explorer.length > 0 && (
                    <a 
                      href={coin.urls.explorer[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <Search className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Blockchain Explorer</span>
                        <span className="text-sm text-light-gray">View transactions on the blockchain</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.source_code && coin.urls.source_code.length > 0 && (
                    <a 
                      href={coin.urls.source_code[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <Code className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Source Code</span>
                        <span className="text-sm text-light-gray">View development activity</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium text-premium-white mb-4">Community</h3>
                <div className="space-y-3">
                  {coin.urls?.twitter && coin.urls.twitter.length > 0 && (
                    <a 
                      href={coin.urls.twitter[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <Twitter className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Twitter</span>
                        <span className="text-sm text-light-gray">{coin.twitter_username || '@' + coin.symbol.toLowerCase()}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.reddit && coin.urls.reddit.length > 0 && (
                    <a 
                      href={coin.urls.reddit[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <div className="h-5 w-5 mr-3 text-light-gray flex items-center justify-center">
                        <span className="text-sm font-bold">r/</span>
                      </div>
                      <div>
                        <span className="block">Reddit</span>
                        <span className="text-sm text-light-gray">{coin.subreddit || 'r/' + coin.symbol.toLowerCase()}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.message_board && coin.urls.message_board.length > 0 && (
                    <a 
                      href={coin.urls.message_board[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <MessageSquare className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Message Board</span>
                        <span className="text-sm text-light-gray">Community discussions</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                  
                  {coin.urls?.chat && coin.urls.chat.length > 0 && (
                    <a 
                      href={coin.urls.chat[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-premium-white hover:text-light-gray transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 mr-3 text-light-gray" />
                      <div>
                        <span className="block">Chat</span>
                        <span className="text-sm text-light-gray">Telegram/Discord community</span>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-2 text-light-gray" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-md font-medium text-premium-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {coin.tags && coin.tags.length > 0 ? (
                  coin.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-off-black text-light-gray rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-light-gray">No tags available</span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 