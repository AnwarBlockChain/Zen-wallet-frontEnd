'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface TokensFilterProps {
  onSearchChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onTimeframeChange: (value: string) => void;
  searchValue: string;
  limitValue: number;
  timeframeValue: string;
}

const TokensFilter: React.FC<TokensFilterProps> = ({
  onSearchChange,
  onLimitChange,
  onTimeframeChange,
  searchValue,
  limitValue,
  timeframeValue,
}) => {
  const timeframes = [
    { value: '1h', label: '1H' },
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' },
    { value: '90d', label: '90D' },
  ];

  const limits = [
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 250, label: '250' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
      <div className="relative w-full lg:w-96">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-light-gray" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 rounded-lg border border-medium-gray bg-off-black text-premium-white focus:ring-1 focus:ring-accent focus:border-accent"
          placeholder="Search cryptocurrency..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-4 w-full lg:w-auto">
        <div className="flex items-center">
          <label htmlFor="limit-select" className="mr-2 text-sm text-light-gray whitespace-nowrap">
            Show:
          </label>
          <select
            id="limit-select"
            className="bg-off-black border border-medium-gray text-premium-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent"
            value={limitValue}
            onChange={(e) => onLimitChange(Number(e.target.value))}
          >
            {limits.map((limit) => (
              <option key={limit.value} value={limit.value}>
                {limit.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <label htmlFor="timeframe-select" className="mr-2 text-sm text-light-gray whitespace-nowrap">
            Change:
          </label>
          <select
            id="timeframe-select"
            className="bg-off-black border border-medium-gray text-premium-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-accent focus:border-accent"
            value={timeframeValue}
            onChange={(e) => onTimeframeChange(e.target.value)}
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default TokensFilter; 