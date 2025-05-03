'use client';

import React from 'react';

type TabType = 'swap' | 'limit' | 'send' | 'buy' | 'receive';

interface TabNavigationProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    tabs?: TabType[];
    className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    activeTab,
    setActiveTab,
    tabs = ['swap', 'limit', 'send', 'receive'],
    className = '',
}) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <div className="bg-premium-white/5 backdrop-blur-lg rounded-full p-1 md:p-1.5 border border-medium-gray/30 w-full max-w-lg overflow-x-auto">
                <div className="flex w-full min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex-1 ${activeTab === tab
                                ? 'bg-premium-white/20 text-premium-white shadow-sm'
                                : 'text-light-gray hover:text-premium-white hover:bg-premium-white/10'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TabNavigation; 