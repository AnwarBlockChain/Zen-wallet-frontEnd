'use client';

import { useEffect, useState } from 'react';
import SwapTab from '../components/tabs/SwapTab';
import TabNavigation from '../components/TabNavigation';
import { useWalletInfo } from '../../../hooks/useWalletInfo';

const SwapPage = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { status } = useWalletInfo();

    // Set isMounted after component mounts on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            <div className="relative z-20">
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
                            activeTab="swap"
                            setActiveTab={() => { }}
                            className="mb-4 md:mb-6"
                        />

                        <div className="bg-premium-white/5 backdrop-blur-lg p-4 md:p-6 rounded-3xl border border-medium-gray/30 shadow-xl" suppressHydrationWarning>
                            <SwapTab />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SwapPage; 