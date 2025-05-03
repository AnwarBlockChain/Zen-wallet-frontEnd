import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="border-t border-dark-gray bg-premium-black mt-auto py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="space-y-6">
            {/* ZenWallet Logo - Matching Navbar */}
            <Link href="/" className="inline-block">
              <div className="flex items-center">
                <div className="mr-2.5 h-9 w-9 rounded-full bg-gradient-to-br from-gray-500 to-gray-800 flex items-center justify-center shadow-inner border border-gray-700/50">
                  <svg className="h-5 w-5 text-premium-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11L16 13.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11L8 13.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-premium-white">
                    <span className="text-gray-300 font-light">Zen</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Wallet</span>
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-light-gray text-sm leading-relaxed">
              The world's most elegant decentralized wallet experience
            </p>
            
            <div className="flex space-x-5">
              <a href="#" className="text-light-gray hover:text-premium-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-light-gray hover:text-premium-white transition-colors">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-light-gray hover:text-premium-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-light-gray hover:text-premium-white transition-colors">
                <FaFacebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-lg font-medium text-premium-white mb-6">Products</h3>
            <ul className="space-y-4">
              <li><Link href="/swap" className="text-light-gray hover:text-premium-white transition-colors">Swap</Link></li>
              <li><Link href="/tokens" className="text-light-gray hover:text-premium-white transition-colors">Tokens</Link></li>
              <li><Link href="/nfts" className="text-light-gray hover:text-premium-white transition-colors">NFTs</Link></li>
              <li><Link href="/pools" className="text-light-gray hover:text-premium-white transition-colors">Pools</Link></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-lg font-medium text-premium-white mb-6">Resources</h3>
            <ul className="space-y-4">
              <li><Link href="/documentation" className="text-light-gray hover:text-premium-white transition-colors">Documentation</Link></li>
              <li><Link href="/api-reference" className="text-light-gray hover:text-premium-white transition-colors">API Reference</Link></li>
              <li><Link href="/blog" className="text-light-gray hover:text-premium-white transition-colors">Blog</Link></li>
              <li><Link href="/community" className="text-light-gray hover:text-premium-white transition-colors">Community</Link></li>
            </ul>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-lg font-medium text-premium-white mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-light-gray hover:text-premium-white transition-colors">About</Link></li>
              <li><Link href="/careers" className="text-light-gray hover:text-premium-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-lg font-medium text-premium-white mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-light-gray hover:text-premium-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-light-gray hover:text-premium-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-dark-gray/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-light-gray mb-4 md:mb-0">
            © {new Date().getFullYear()} ZenWallet. All rights reserved.
          </div>
          <div className="text-sm text-light-gray">
            Designed by <a href="https://webbuddy.agency" target="_blank" rel="noopener noreferrer" className="font-medium text-premium-white hover:text-gray-300 transition-colors">WebBuddy</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 