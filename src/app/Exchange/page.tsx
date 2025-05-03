'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useWalletInfo } from '../../hooks/useWalletInfo';
import { getTokenList } from '../../services/api';
import TabNavigation from './components/TabNavigation';
import { BuyTab, SendTab, ReceiveTab, LimitTab } from './components/tabs';
import SwapTab from './components/tabs/SwapTab';
import { useSearchParams } from 'next/navigation';

interface ExchangePageProps {
  initialTab?: string | null;
}

const ExchangePage = ({ initialTab }: ExchangePageProps = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const searchParams = useSearchParams();

  // Get wallet information from custom hook
  const {
    address,
    isConnected,
    balance: userBalance,
    symbol: walletSymbol,
    status,
    isLoading: balanceLoading,
  } = useWalletInfo();

  // Prevent hydration mismatch with client-side only features
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'swap' | 'limit' | 'send' | 'buy' | 'receive'>('swap');

  // Add this with your other state variables
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});
  const [tokenPriceDetails, setTokenPriceDetails] = useState<any>({});

  // Set initial tab from prop or URL
  useEffect(() => {
    if (isMounted) {
      // First check initialTab prop
      if (initialTab) {
        const validTab = initialTab as 'swap' | 'limit' | 'send' | 'buy' | 'receive';
        if (['swap', 'limit', 'send', 'buy', 'receive'].includes(validTab)) {
          setActiveTab(validTab);
        }
      } else {
        // Then check URL params
        const tabParam = searchParams.get('tab');
        if (tabParam) {
          const validTab = tabParam as 'swap' | 'limit' | 'send' | 'buy' | 'receive';
          if (['swap', 'limit', 'send', 'buy', 'receive'].includes(validTab)) {
            setActiveTab(validTab);
          }
        }
      }
    }
  }, [searchParams, initialTab, isMounted]);

  // Video background handling
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (video.readyState >= 3) {
        setVideoLoaded(true);
      }

      if (video) {
        video.play()
          .then(() => {
            setVideoLoaded(true);
          })
          .catch(error => {
            console.error('Video play was prevented:', error);
            setVideoLoaded(false);
          });
      }
    }
  }, []);

  // Set isMounted after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="relative z-20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none z-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute top-40 right-40 w-32 h-32 rounded-full bg-medium-gray blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 h-full flex items-center justify-center py-6 md:py-12 pt-0 relative z-20">
          <div className="w-full max-w-lg relative">
            <div className="text-center mb-4 md:mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-premium-white leading-tight mb-2 md:mb-4" suppressHydrationWarning>
                Trade anytime, <br className="hidden sm:block" />anywhere.
              </h1>
              {isMounted && status === 'connecting' && (
                <div className="text-light-gray text-base md:text-lg animate-pulse">Connecting to wallet...</div>
              )}
            </div>

            <TabNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="mb-4 md:mb-6"
            />

            <div className="bg-premium-white/5 backdrop-blur-lg p-4 md:p-6 rounded-3xl border border-medium-gray/30 shadow-xl" suppressHydrationWarning>
              {activeTab === 'swap' && (
                <SwapTab />
              )}

              {activeTab === 'limit' && (
                <LimitTab
                />
              )}

              {activeTab === 'send' && (
                <SendTab
                  isConnected={isConnected}
                  address={address}
                  userBalance={userBalance}
                  balanceLoading={balanceLoading}
                  walletSymbol={walletSymbol}
                />
              )}

              {activeTab === 'buy' && (
                <BuyTab
                  isConnected={isConnected}
                  address={address}
                />
              )}

              {activeTab === 'receive' && (
                <ReceiveTab
                  isConnected={isConnected}
                  address={address}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangePage; 