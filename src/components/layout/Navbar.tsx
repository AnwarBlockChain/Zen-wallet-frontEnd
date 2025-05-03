"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, RefreshCw, Wallet, LineChart, Zap, Shield, Globe, ArrowDownUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { ConnectButton } from '../reown/ConnectButton';

// Language data for the dropdown
const languages = [
  { code: 'EN', name: 'English', flag: '🇺🇸' },
  { code: 'ZH', name: '简体中文', flag: '🇨🇳' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'JA', name: '日本語', flag: '🇯🇵' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'KO', name: '한국어', flag: '🇰🇷' },
  { code: 'ID', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'UK', name: 'Українська', flag: '🇺🇦' },
  { code: 'PT', name: 'Português', flag: '🇵🇹' },
  { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Toggle dropdown function
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Handle language change
  const changeLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setLanguageDropdownOpen(false);
    // Here you would typically update the app's locale/language
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full pt-4 px-4">
      <div className="container max-w-6xl mx-auto flex h-16 items-center justify-between px-6 rounded-full border border-dark-gray/30 bg-premium-black/95 backdrop-blur-lg shadow-xl">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-300"></div>
              <div className="relative flex items-center">
                <div className="mr-2.5 h-9 w-9 md:h-10 md:w-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-800 flex items-center justify-center shadow-inner border border-gray-700/50">
                  <svg className="h-5 w-5 md:h-6 md:w-6 text-premium-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11L16 13.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11L8 13.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-premium-white">
                    <span className="text-gray-300 font-light">Zen</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Wallet</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {/* Products Dropdown - Temporarily disabled */}
              <li className="relative">
                <button
                  className={`flex items-center space-x-1 ${activeDropdown === 'products' ? 'text-premium-white' : 'text-light-gray hover:text-premium-white'} focus:outline-none transition-colors`}
                  onClick={() => toggleDropdown('products')}
                >
                  <span>Products</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
                </button>
              </li>


              {/* Developers Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center space-x-1 ${activeDropdown === 'developers' ? 'text-premium-white' : 'text-light-gray hover:text-premium-white'} focus:outline-none transition-colors`}
                  onClick={() => toggleDropdown('developers')}
                >
                  <span>Developers</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'developers' ? 'rotate-180' : ''}`} />
                </button>
              </li>

              {/* About Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center space-x-1 ${activeDropdown === 'about' ? 'text-premium-white' : 'text-light-gray hover:text-premium-white'} focus:outline-none transition-colors`}
                  onClick={() => toggleDropdown('about')}
                >
                  <span>About</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
              </li>

              {/* Governance Dropdown */}
              <li className="relative">
                <button
                  className={`flex items-center space-x-1 ${activeDropdown === 'governance' ? 'text-premium-white' : 'text-light-gray hover:text-premium-white'} focus:outline-none transition-colors`}
                  onClick={() => toggleDropdown('governance')}
                >
                  <span>Governance</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'governance' ? 'rotate-180' : ''}`} />
                </button>
              </li>

              {/* Blog Link */}
              <li>
                <Link
                  href="/blog"
                  className="flex items-center space-x-1 text-light-gray hover:text-premium-white transition-colors"
                >
                  <span>Blog</span>
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="hidden md:block relative" ref={languageDropdownRef}>
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="flex items-center space-x-2 text-light-gray hover:text-premium-white cursor-pointer rounded-full px-2 py-1 hover:bg-dark-gray/20 transition-all"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{currentLanguage.code}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Language Dropdown */}
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-dark-gray/50 bg-off-black shadow-xl backdrop-blur-md z-[100] overflow-hidden">
                <div className="p-4 border-b border-dark-gray/50">
                  <h3 className="text-premium-white font-medium">Change language</h3>
                </div>
                <div className="max-h-96 overflow-y-auto py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`flex items-center w-full px-4 py-3 hover:bg-dark-gray/20 transition-colors ${currentLanguage.code === language.code ? 'bg-dark-gray/30' : ''
                        }`}
                      onClick={() => changeLanguage(language)}
                    >
                      <span className="text-xl mr-3">{language.flag}</span>
                      <span className="text-premium-white font-medium">{language.name}</span>
                      <span className="ml-auto text-light-gray">{language.code}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ConnectButton />

          {/* Mobile Menu Button */}
          <button
            className="flex lg:hidden items-center justify-center rounded-md p-2 text-light-gray hover:bg-dark-gray hover:text-premium-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdowns */}
      {/* Products Dropdown - Temporarily disabled */}
      {activeDropdown === 'products' && (
        <div ref={dropdownRef} className="absolute left-0 right-0 mt-2 mx-auto max-w-6xl rounded-2xl bg-gradient-to-b from-[#080816] to-[#040410] border border-dark-gray/30 shadow-xl backdrop-blur-md overflow-hidden z-[100]">
          <div className="container mx-auto py-8 px-4">
            <div className="flex">
              <div className="flex-1 mr-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-premium-white font-medium mb-4">Apps</h3>
                    <div className="grid gap-5">
                      <Link href="/?tab=swap" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                        <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                          <RefreshCw className="h-6 w-6 text-premium-white" />
                        </div>
                        <div>
                          <h4 className="text-premium-white font-medium group-hover:text-premium-white">Swap</h4>
                          <p className="text-sm text-light-gray">Swap any tokens at the best rates</p>
                        </div>
                      </Link>

                      <Link href="/?tab=limit" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                        <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                          <ArrowDownUp className="h-6 w-6 text-premium-white" />
                        </div>
                        <div>
                          <h4 className="text-premium-white font-medium group-hover:text-premium-white">Limit</h4>
                          <p className="text-sm text-light-gray">Set limit orders for your trades</p>
                        </div>
                      </Link>

                      <Link href="/?tab=send" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                        <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                          <ArrowUpCircle className="h-6 w-6 text-premium-white" />
                        </div>
                        <div>
                          <h4 className="text-premium-white font-medium group-hover:text-premium-white">Send</h4>
                          <p className="text-sm text-light-gray">Send tokens to any address</p>
                        </div>
                      </Link>

                      <Link href="/?tab=receive" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                        <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                          <ArrowDownCircle className="h-6 w-6 text-premium-white" />
                        </div>
                        <div>
                          <h4 className="text-premium-white font-medium group-hover:text-premium-white">Receive</h4>
                          <p className="text-sm text-light-gray">Receive tokens from others</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* <div>
                    <h3 className="text-premium-white font-medium mb-4">Physical</h3>
                    <Link href="/products/card" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                      <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                        <svg className="h-6 w-6 text-premium-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-premium-white font-medium group-hover:text-premium-white">Card</h4>
                        <p className="text-sm text-light-gray">Pay with crypto anywhere</p>
                      </div>
                    </Link>
                  </div> */}
                </div>

                {/* <div className="mt-8">
                  <h3 className="text-premium-white font-medium mb-4">Other</h3>
                  <div className="grid grid-cols-2 gap-5">
                    <Link href="/products/fusion" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                      <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                        <Zap className="h-6 w-6 text-premium-white" />
                      </div>
                      <div>
                        <h4 className="text-premium-white font-medium group-hover:text-premium-white">Fusion+</h4>
                        <p className="text-sm text-light-gray">Enjoy gasless cross-chain swaps and MEV protection</p>
                      </div>
                    </Link>

                    <Link href="/products/rabbithole" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                      <div className="flex-shrink-0 rounded-md bg-dark-gray/30 p-2">
                        <Shield className="h-6 w-6 text-premium-white" />
                      </div>
                      <div>
                        <h4 className="text-premium-white font-medium group-hover:text-premium-white">ZenWallet RabbitHole</h4>
                        <p className="text-sm text-light-gray">Stay protected from sandwich attacks</p>
                      </div>
                    </Link>
                  </div>
                </div> */}
              </div>

              <div className="w-1/3 relative overflow-hidden rounded-lg bg-gradient-to-br from-dark-gray/30 to-black">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-premium-white mb-2">Cross-chain swaps are here!</h3>
                  <p className="text-light-gray mb-6">Seamless, secure, and self-custodial, all at once.</p>
                  <Link
                    href="/products/fusion"
                    className="inline-flex items-center space-x-2 rounded-md border border-medium-gray bg-dark-gray/40 px-4 py-2 text-premium-white hover:bg-dark-gray/60 transition-colors"
                  >
                    <span>Learn more</span>
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDropdown && activeDropdown !== 'products' && (
        <div ref={dropdownRef} className="absolute left-0 right-0 mt-2 mx-auto max-w-6xl rounded-2xl bg-gradient-to-b from-[#080816] to-[#040410] border border-dark-gray/30 shadow-xl backdrop-blur-md overflow-hidden z-[100]">
          <div className="container mx-auto py-6 px-4">
            <div className="grid grid-cols-3 gap-8">
              {activeDropdown === 'developers' && (
                <>
                  <Link href="/developers/docs" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Documentation</h4>
                      <p className="text-sm text-light-gray">Comprehensive guides and API references</p>
                    </div>
                  </Link>
                  <Link href="/developers/api" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">API</h4>
                      <p className="text-sm text-light-gray">Access our powerful APIs</p>
                    </div>
                  </Link>
                  <Link href="/developers/sdk" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">SDK</h4>
                      <p className="text-sm text-light-gray">Build with our software development kits</p>
                    </div>
                  </Link>
                </>
              )}

              {activeDropdown === 'about' && (
                <>
                  <Link href="/about/team" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Team</h4>
                      <p className="text-sm text-light-gray">Meet the people behind ZenWallet</p>
                    </div>
                  </Link>
                  <Link href="/about/careers" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Careers</h4>
                      <p className="text-sm text-light-gray">Join our growing team</p>
                    </div>
                  </Link>
                  <Link href="/about/contact" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Contact</h4>
                      <p className="text-sm text-light-gray">Get in touch with us</p>
                    </div>
                  </Link>
                </>
              )}

              {activeDropdown === 'governance' && (
                <>
                  <Link href="/governance/proposals" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Proposals</h4>
                      <p className="text-sm text-light-gray">View and create governance proposals</p>
                    </div>
                  </Link>
                  <Link href="/governance/voting" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Voting</h4>
                      <p className="text-sm text-light-gray">Participate in governance voting</p>
                    </div>
                  </Link>
                  <Link href="/governance/treasury" className="group flex items-start space-x-4 rounded-md p-2 hover:bg-dark-gray/20 transition-colors">
                    <div>
                      <h4 className="text-premium-white font-medium group-hover:text-premium-white">Treasury</h4>
                      <p className="text-sm text-light-gray">View treasury assets and allocations</p>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 mt-2 mx-4 rounded-xl overflow-hidden z-[100]">
          <div className="space-y-1 px-4 py-3 bg-off-black border border-dark-gray shadow-xl">
            {/* Language Selector for Mobile */}
            <div className="py-2 border-b border-dark-gray/30 mb-2">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray"
                onClick={() => toggleDropdown('language-mobile')}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>Language - {currentLanguage.code}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'language-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'language-mobile' && (
                <div className="mt-2 space-y-1 rounded-md bg-dark-gray/20 py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className={`flex w-full items-center px-4 py-2 text-left ${currentLanguage.code === language.code
                        ? 'bg-dark-gray text-premium-white'
                        : 'text-light-gray hover:bg-dark-gray hover:text-premium-white'
                        }`}
                      onClick={() => changeLanguage(language)}
                    >
                      <span className="text-xl mr-2">{language.flag}</span>
                      <span>{language.name}</span>
                      <span className="ml-auto text-xs text-light-gray">{language.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="py-2">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray"
                onClick={() => toggleDropdown('products-mobile')}
              >
                <span>Products</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'products-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'products-mobile' && (
                <div className="mt-2 space-y-2 pl-4">
                  <Link href="/?tab=swap" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Swap
                  </Link>
                  <Link href="/?tab=limit" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Limit
                  </Link>
                  <Link href="/?tab=send" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Send
                  </Link>
                  <Link href="/?tab=receive" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Receive
                  </Link>
                </div>
              )}
            </div>

            <div className="py-2">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray"
                onClick={() => toggleDropdown('developers-mobile')}
              >
                <span>Developers</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'developers-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'developers-mobile' && (
                <div className="mt-2 space-y-2 pl-4">
                  <Link href="/developers/docs" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Documentation
                  </Link>
                  <Link href="/developers/api" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    API
                  </Link>
                  <Link href="/developers/sdk" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    SDK
                  </Link>
                </div>
              )}
            </div>

            <div className="py-2">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray"
                onClick={() => toggleDropdown('about-mobile')}
              >
                <span>About</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'about-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'about-mobile' && (
                <div className="mt-2 space-y-2 pl-4">
                  <Link href="/about/team" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Team
                  </Link>
                  <Link href="/about/careers" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Careers
                  </Link>
                  <Link href="/about/contact" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Contact
                  </Link>
                </div>
              )}
            </div>

            <div className="py-2">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray"
                onClick={() => toggleDropdown('governance-mobile')}
              >
                <span>Governance</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'governance-mobile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'governance-mobile' && (
                <div className="mt-2 space-y-2 pl-4">
                  <Link href="/governance/proposals" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Proposals
                  </Link>
                  <Link href="/governance/voting" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Voting
                  </Link>
                  <Link href="/governance/treasury" className="block rounded-md px-3 py-2 text-light-gray hover:bg-dark-gray hover:text-premium-white">
                    Treasury
                  </Link>
                </div>
              )}
            </div>

            <div className="py-2">
              <Link href="/blog" className="flex w-full items-center justify-between rounded-md px-3 py-2 text-premium-white hover:bg-dark-gray">
                <span>Blog</span>
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="py-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Dispatch custom event
                  const event = new CustomEvent('openWalletModal');
                  document.dispatchEvent(event);
                  // Close mobile menu
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-4 py-2 text-premium-white shadow-premium transition-all hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50"
              >
                <span>Connect Wallet</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 