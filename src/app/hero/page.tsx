"use client";

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { useEffect, useRef, useState } from 'react';
import SwapPage from '../Exchange/page';
import { useSearchParams } from 'next/navigation';
import ExchangeFeatureSection from './ExchangeFeatureSection';
import FinancialToolSection from './FinancialToolSection';
import JoinUsSection from './JoinUsSection';
import MultichainDexSection from './MultichainDexSection';
import PartnersSection from './PartnersSection';
import PlatformStats from './PlatformStats';
import ProductsSection from './ProductsSection';
import SecurityCompliance from './SecurityCompliance';
import UXandSecuritySection from './UXandSecuritySection';
import WalletInfraSection from './WalletInfraSection';
import ZenWalletSection from './ZenWalletSection';


// Custom CSS for animations
const animationStyles = `
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes chart-line-draw {
      0% { stroke-dashoffset: 500; }
      100% { stroke-dashoffset: 0; }
    }
    .chart-line {
      stroke-dasharray: 500;
      stroke-dashoffset: 0;
      animation: chart-line-draw 3s ease-in-out;
    }
    
    /* Flow animation for mockup screens */
    @keyframes slide-screens {
      0%, 28% { transform: translateX(0); }
      33%, 61% { transform: translateX(-33.33%); }
      66%, 94% { transform: translateX(-66.66%); }
      99%, 100% { transform: translateX(0); }
    }
    .animate-flow {
      animation: slide-screens 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      will-change: transform;
      transform: translateZ(0);
    }
    `;


const HeroSection = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const searchParams = useSearchParams();
    const [swapTab, setSwapTab] = useState<string | null>(null);

    // Handle video load event
    const handleVideoLoaded = () => {
        setVideoLoaded(true);
    };

    // Get the tab parameter from the URL
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam) {
            setSwapTab(tabParam);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-premium-black relative">
            <style jsx global>{animationStyles}</style>
            <div className="relative z-50">
                <Navbar />
            </div>
            {/* <div className="h-24 md:h-28 lg:h-32"></div> */}

            <section className="relative min-h-screen w-full overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                    {/* <video
                        ref={videoRef}
                        onLoadedData={handleVideoLoaded}
                        className={`min-w-full min-h-full object-cover ${videoLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                        autoPlay
                        playsInline
                        muted
                        loop
                    >
                        <source src="/videos/hero-background.mp4" type="video/mp4" />
                    </video> */}

                    <div className="absolute inset-0 bg-premium-black/70 z-0"></div>
                </div>

                {/* Content */}
                <div className="container relative z-10 mx-auto px-4 pt-24 md:pt-24 lg:pt-24">
                    <SwapPage initialTab={swapTab} />
                </div>
            </section>

            <PlatformStats />
            <MultichainDexSection />
            <ProductsSection />
            <WalletInfraSection />
            <ExchangeFeatureSection />
            <FinancialToolSection />
            <UXandSecuritySection />
            <ZenWalletSection />
            <SecurityCompliance />
            <PartnersSection />
            <JoinUsSection />
            <Footer />
        </div>
    )
}

export default HeroSection