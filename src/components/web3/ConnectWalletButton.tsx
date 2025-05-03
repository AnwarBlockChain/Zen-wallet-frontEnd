"use client";

import React from 'react';
import { useAccount } from 'wagmi';

interface ConnectWalletButtonProps {
  className?: string;
}

export function ConnectWalletButton({ className }: ConnectWalletButtonProps) {
  const { isConnected, address } = useAccount();
  
  // Format the wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  // Super defensive button click handler to prevent any navigation
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    // Stop everything to prevent navigation
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    
    // Dispatch custom event to open wallet modal
    console.log("Dispatching openWalletModal event");
    const event = new CustomEvent('openWalletModal');
    document.dispatchEvent(event);
    
    // Return false to prevent default in older browsers
    return false;
  };
  
  return (
    <button 
      onClick={handleButtonClick}
      type="button"
      className={`bg-dark-gray hover:bg-medium-gray border border-medium-gray text-premium-white px-4 py-2 rounded-md ${className || ''}`}
      // Additional defensive attributes to prevent navigation
      data-no-navigation="true"
    >
      {isConnected ? (
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          {formatAddress(address as string)}
        </span>
      ) : (
        "Launch dApp"
      )}
    </button>
  );
} 