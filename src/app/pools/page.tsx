"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Mock pools data
const pools = [
  { id: 1, name: 'ETH / USDC', tvl: '$45.7M', volume24h: '$12.3M', apr: '4.2%', token1: 'ETH', token2: 'USDC', isHot: true },
  { id: 2, name: 'BTC / ETH', tvl: '$32.1M', volume24h: '$8.5M', apr: '3.8%', token1: 'BTC', token2: 'ETH', isHot: true },
  { id: 3, name: 'SOL / USDC', tvl: '$18.9M', volume24h: '$5.2M', apr: '5.1%', token1: 'SOL', token2: 'USDC', isHot: false },
  { id: 4, name: 'ETH / DAI', tvl: '$15.3M', volume24h: '$3.7M', apr: '3.5%', token1: 'ETH', token2: 'DAI', isHot: false },
  { id: 5, name: 'LINK / ETH', tvl: '$9.8M', volume24h: '$2.1M', apr: '4.7%', token1: 'LINK', token2: 'ETH', isHot: false },
  { id: 6, name: 'AVAX / USDC', tvl: '$7.5M', volume24h: '$1.8M', apr: '5.3%', token1: 'AVAX', token2: 'USDC', isHot: false },
  { id: 7, name: 'UNI / ETH', tvl: '$6.2M', volume24h: '$1.5M', apr: '4.9%', token1: 'UNI', token2: 'ETH', isHot: false },
  { id: 8, name: 'MATIC / USDC', tvl: '$5.4M', volume24h: '$1.2M', apr: '5.5%', token1: 'MATIC', token2: 'USDC', isHot: false },
];

export default function PoolsPage() {
  return (
    <div className="min-h-screen bg-premium-black">      
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-premium-white">Liquidity Pools</h1>
          <p className="text-light-gray">Provide liquidity and earn rewards from trading fees</p>
        </div>
        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-4 py-2 bg-dark-gray text-premium-white rounded-full text-sm font-medium hover:bg-medium-gray transition-colors border border-medium-gray">
              All Pools
            </button>
            <button className="px-4 py-2 bg-off-black border border-medium-gray rounded-full text-sm font-medium text-light-gray hover:bg-medium-gray transition-colors">
              My Positions
            </button>
            <button className="px-4 py-2 bg-off-black border border-medium-gray rounded-full text-sm font-medium text-light-gray hover:bg-medium-gray transition-colors">
              Top APR
            </button>
          </div>
          
          <button className="px-4 py-2 bg-dark-gray hover:bg-medium-gray text-premium-white rounded-full flex items-center gap-2 border border-medium-gray transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Pool
          </button>
        </div>
        
        <div className="bg-dark-gray shadow-premium border border-medium-gray rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-off-black text-left">
                  <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Pool</th>
                  <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">TVL</th>
                  <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Volume (24h)</th>
                  <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">APR</th>
                  <th className="px-6 py-3 text-xs font-medium text-light-gray uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-medium-gray">
                {pools.map((pool) => (
                  <tr key={pool.id} className="hover:bg-off-black transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-medium-gray flex items-center justify-center border-2 border-dark-gray z-10">
                            <span className="text-xs font-medium text-premium-white">{pool.token1.substring(0, 1)}</span>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-medium-gray flex items-center justify-center border-2 border-dark-gray">
                            <span className="text-xs font-medium text-premium-white">{pool.token2.substring(0, 1)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <span className="font-medium text-premium-white">{pool.name}</span>
                            {pool.isHot && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-off-black text-light-gray rounded-full border border-medium-gray">
                                Hot
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-premium-white">{pool.tvl}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light-gray">{pool.volume24h}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 font-medium">{pool.apr}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-medium-gray text-premium-white rounded-lg hover:bg-dark-gray transition-colors">
                          Add
                        </button>
                        <button className="px-3 py-1 bg-off-black text-light-gray rounded-lg hover:bg-medium-gray hover:text-premium-white transition-colors">
                          Swap
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 