import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { SwapInterface } from '@/components/web3/SwapInterface';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center">
          <SwapInterface />

          <div className="mt-20 max-w-2xl text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Trade crypto and NFTs with confidence
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Buy, sell, and explore tokens and NFTs
            </p>
            <button className="py-3 px-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full text-lg font-medium transition-all">
              Get started
            </button>
            <div className="mt-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-auto">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-semibold">ZenWallet</span>
          </div>
          <div className="text-sm text-gray-500">
            curated by <span className="font-semibold">Mobbin</span>
          </div>
        </div>
      </footer>
    </div>
  );
} 