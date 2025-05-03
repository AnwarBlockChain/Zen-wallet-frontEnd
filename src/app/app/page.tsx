'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Open the wallet connection modal
    const event = new CustomEvent('openWalletModal');
    document.dispatchEvent(event);
    
    // Redirect to home page after a short delay
    const redirectTimeout = setTimeout(() => {
      router.replace('/');
    }, 300);
    
    return () => clearTimeout(redirectTimeout);
  }, [router]);
  
  return (
    <div className="min-h-screen bg-premium-black flex items-center justify-center">
      <div className="text-premium-white text-xl">Opening ZenWallet...</div>
    </div>
  );
} 