"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Mock NFT data
const nfts = [
  {
    id: '1', name: 'Cosmic Voyager #342', collection: 'Cosmic Voyagers', price: '0.45 ETH', creator: 'ArtistX', owner: '0x1a2b...3c4d', description: 'A unique digital explorer traversing the cosmic realms of the blockchain universe. This NFT represents the spirit of discovery in the digital frontier.', image: 'https://placehold.co/600x600/1F1F1F/FFFFFF?text=NFT+1', attributes: [
      { trait: 'Background', value: 'Deep Space' },
      { trait: 'Suit', value: 'Nebula Armor' },
      { trait: 'Helmet', value: 'Quantum Visor' },
      { trait: 'Accessory', value: 'Plasma Shield' },
      { trait: 'Rarity', value: 'Legendary' }
    ]
  },
  {
    id: '2', name: 'Pixel Punk #789', collection: 'Pixel Punks', price: '0.32 ETH', creator: 'CryptoCreator', owner: '0x5e6f...7g8h', description: 'A pixelated rebel from the digital underground. This character embodies the punk ethos of the early crypto movement with a modern twist.', image: 'https://placehold.co/600x600/1F1F1F/FFFFFF?text=NFT+2', attributes: [
      { trait: 'Background', value: 'Neon City' },
      { trait: 'Hair', value: 'Mohawk' },
      { trait: 'Eyes', value: 'Cybernetic' },
      { trait: 'Mouth', value: 'Cigarette' },
      { trait: 'Rarity', value: 'Rare' }
    ]
  },
  {
    id: '3', name: 'Digital Dream #56', collection: 'Digital Dreams', price: '0.28 ETH', creator: 'NFTMaster', owner: '0x9i0j...1k2l', description: 'A surreal landscape born from the imagination of AI and human collaboration. This piece blurs the line between reality and digital fantasy.', image: 'https://placehold.co/600x600/1F1F1F/FFFFFF?text=NFT+3', attributes: [
      { trait: 'Style', value: 'Surrealism' },
      { trait: 'Colors', value: 'Pastel' },
      { trait: 'Complexity', value: 'High' },
      { trait: 'Mood', value: 'Ethereal' },
      { trait: 'Rarity', value: 'Uncommon' }
    ]
  },
];

export default function NFTDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Find the NFT with the matching ID
  const nft = nfts.find(nft => nft.id === id) || nfts[0];

  return (
    <div className="min-h-screen bg-premium-black">
      <main className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Link href="/nfts" className="flex items-center text-premium-white hover:text-light-gray transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to NFTs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* NFT Image */}
          <div className="bg-dark-gray rounded-xl overflow-hidden shadow-premium border border-medium-gray">
            <div className="relative pb-[100%]">
              <img
                src={nft.image}
                alt={nft.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-light-gray font-medium mb-1">{nft.collection}</p>
              <h1 className="text-3xl font-bold mb-2 text-premium-white">{nft.name}</h1>
              <div className="flex items-center text-light-gray text-sm">
                <span>Owned by</span>
                <a href="#" className="ml-1 text-premium-white hover:text-light-gray transition-colors">{nft.owner}</a>
              </div>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 shadow-premium border border-medium-gray">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-light-gray">Current Price</p>
                  <p className="text-2xl font-bold text-premium-white">{nft.price}</p>
                </div>
                <button className="px-6 py-3 bg-off-black hover:bg-medium-gray text-premium-white rounded-xl font-medium border border-medium-gray transition-colors">
                  Buy Now
                </button>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 border border-medium-gray rounded-lg text-premium-white hover:bg-medium-gray transition-colors">
                  Make Offer
                </button>
                <button className="flex items-center justify-center p-2 border border-medium-gray rounded-lg text-premium-white hover:bg-medium-gray transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <button className="flex items-center justify-center p-2 border border-medium-gray rounded-lg text-premium-white hover:bg-medium-gray transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 shadow-premium border border-medium-gray">
              <h2 className="text-lg font-semibold mb-4 text-premium-white">Description</h2>
              <p className="text-light-gray">{nft.description}</p>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 shadow-premium border border-medium-gray">
              <h2 className="text-lg font-semibold mb-4 text-premium-white">Properties</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {nft.attributes.map((attr, index) => (
                  <div key={index} className="bg-off-black border border-medium-gray rounded-lg p-3 text-center">
                    <p className="text-xs text-light-gray font-medium uppercase">{attr.trait}</p>
                    <p className="text-sm font-medium truncate text-premium-white">{attr.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-dark-gray rounded-xl p-6 shadow-premium border border-medium-gray">
              <h2 className="text-lg font-semibold mb-4 text-premium-white">Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-light-gray">Contract Address</span>
                  <a href="#" className="text-premium-white hover:text-light-gray transition-colors truncate">0x1234...5678</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">Token ID</span>
                  <span className="text-premium-white">{nft.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">Token Standard</span>
                  <span className="text-premium-white">ERC-721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">Blockchain</span>
                  <span className="text-premium-white">Ethereum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-gray">Creator</span>
                  <a href="#" className="text-premium-white hover:text-light-gray transition-colors">{nft.creator}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 