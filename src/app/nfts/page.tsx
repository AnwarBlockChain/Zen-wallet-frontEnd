"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Mock NFT data
const nfts = [
  { id: '1', name: 'Cosmic Voyager #342', collection: 'Cosmic Voyagers', price: '0.45 ETH', creator: 'ArtistX', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+1' },
  { id: '2', name: 'Pixel Punk #789', collection: 'Pixel Punks', price: '0.32 ETH', creator: 'CryptoCreator', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+2' },
  { id: '3', name: 'Digital Dream #56', collection: 'Digital Dreams', price: '0.28 ETH', creator: 'NFTMaster', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+3' },
  { id: '4', name: 'Abstract Realm #123', collection: 'Abstract Realms', price: '0.51 ETH', creator: 'BlockchainArtist', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+4' },
  { id: '5', name: 'Cyber Cat #007', collection: 'Cyber Cats', price: '0.38 ETH', creator: 'DigitalPaws', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+5' },
  { id: '6', name: 'Ethereal Spirit #432', collection: 'Ethereal Spirits', price: '0.65 ETH', creator: 'GhostlyCreator', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+6' },
  { id: '7', name: 'Neon Warrior #211', collection: 'Neon Warriors', price: '0.42 ETH', creator: 'FutureCraft', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+7' },
  { id: '8', name: 'Mystic Owl #99', collection: 'Mystic Owls', price: '0.29 ETH', creator: 'WisdomArt', image: 'https://placehold.co/300x300/1F1F1F/FFFFFF?text=NFT+8' },
];

export default function NFTsPage() {
  return (
    <div className="min-h-screen bg-premium-black">      
      <main className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-premium-white">Explore NFTs</h1>
          <p className="text-light-gray">Discover, collect, and trade unique digital assets</p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search NFTs..."
                className="pl-10 pr-4 py-2 rounded-full border border-medium-gray bg-dark-gray text-premium-white placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-off-white focus:border-transparent w-64"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-gray absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-dark-gray border border-medium-gray text-premium-white rounded-full text-sm font-medium hover:bg-medium-gray transition-colors">
                All NFTs
              </button>
              <button className="px-4 py-2 bg-dark-gray border border-medium-gray text-light-gray rounded-full text-sm font-medium hover:bg-medium-gray transition-colors">
                Art
              </button>
              <button className="px-4 py-2 bg-dark-gray border border-medium-gray text-light-gray rounded-full text-sm font-medium hover:bg-medium-gray transition-colors">
                Collectibles
              </button>
              <button className="px-4 py-2 bg-dark-gray border border-medium-gray text-light-gray rounded-full text-sm font-medium hover:bg-medium-gray transition-colors">
                Gaming
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-dark-gray rounded-xl overflow-hidden shadow-premium border border-medium-gray hover:border-light-gray transition-all duration-300">
              <Link href={`/nfts/${nft.id}`}>
                <div className="relative pb-[100%]">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate text-premium-white">{nft.name}</h3>
                  <p className="text-sm text-light-gray mb-3">{nft.collection}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-light-gray">Price</p>
                      <p className="font-medium text-premium-white">{nft.price}</p>
                    </div>
                    <span className="px-3 py-1.5 bg-off-black hover:bg-medium-gray text-premium-white text-sm rounded-lg border border-medium-gray transition-colors">
                      View
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 