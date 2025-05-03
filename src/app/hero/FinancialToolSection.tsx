import React from 'react'

const FinancialToolSection = () => {
    return (
        <section className="py-20 relative bg-premium-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-bold text-premium-white mb-6">Financial Tools</h2>
                        <p className="text-light-gray text-lg mb-8">
                            Manage your portfolio with precision using our suite of financial tools designed to maximize your investment potential.
                        </p>

                        <div className="space-y-5">
                            {[
                                { title: 'Portfolio Tracking', desc: 'Real-time valuation and performance metrics' },
                                { title: 'Price Alerts', desc: 'Customizable notifications for price movements' },
                                { title: 'Yield Farming Integration', desc: 'Access to staking and farming opportunities' },
                                { title: 'Tax Reporting', desc: 'Transaction exports for financial records' },
                                { title: 'Gas Fee Optimization', desc: 'Tools to manage and optimize network fees' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="h-6 w-6 rounded-full bg-dark-gray border border-medium-gray flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-premium-white">{item.title}</h3>
                                        <p className="text-light-gray">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative order-1 lg:order-2">
                        {/* Premium financial dashboard mockup - frameless with animations */}
                        <div className="relative transform hover:scale-[1.02] transition-transform duration-700 w-full h-full">
                            {/* Premium financial dashboard mockup */}
                            <div className="relative z-10 w-full max-w-sm mx-auto overflow-hidden">
                                <div className="bg-[#0A0A0A] backdrop-blur-sm rounded-2xl border border-medium-gray/30 shadow-2xl overflow-hidden">
                                    <div className="flex animate-flow" style={{ width: '300%' }}>
                                        {/* Screen 1: Portfolio Overview */}
                                        <div className="p-6 w-1/3">
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-5">
                                                <div>
                                                    <div className="text-premium-white font-semibold tracking-tight">Portfolio</div>
                                                    <div className="text-light-gray/50 text-xs mt-0.5 animate-pulse">Last updated: 2 minutes ago</div>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center hover:bg-dark-gray/60 transition-colors">
                                                        <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                                        </svg>
                                                    </button>
                                                    <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center hover:bg-dark-gray/60 transition-colors">
                                                        <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Portfolio overview - with live chart animation */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-5 border border-medium-gray/10 hover:border-medium-gray/30 transition-colors">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="text-sm text-premium-white font-medium">Total Value</div>
                                                    <div className="flex items-center text-xs text-green-400 rounded-full px-2 py-0.5 bg-[#112211]/30 border border-[#224422]/20 animate-pulse">
                                                        <svg className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                        </svg>
                                                        <span>+3.2%</span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-premium-white text-3xl font-bold">$14,382.59</div>
                                                    <div className="text-xs text-light-gray/70 mt-0.5">+$459.12 today</div>
                                                </div>

                                                {/* Mini chart - with animation */}
                                                <div className="mt-4 h-[60px] relative">
                                                    <svg className="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                                                        {/* Chart grid lines */}
                                                        <line x1="0" y1="15" x2="300" y2="15" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />
                                                        <line x1="0" y1="30" x2="300" y2="30" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />
                                                        <line x1="0" y1="45" x2="300" y2="45" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />

                                                        {/* Chart line - with animation */}
                                                        <path
                                                            d="M0,45 C25,42 50,40 75,35 S125,25 150,20 S200,15 225,25 S275,45 300,30"
                                                            fill="none"
                                                            stroke="#ADADAD"
                                                            strokeWidth="1.5"
                                                            className="chart-line"
                                                        />

                                                        {/* Highlight dot - with pulse animation */}
                                                        <circle cx="225" cy="25" r="3" fill="#FFFFFF" className="animate-pulse" />
                                                    </svg>

                                                    {/* Timeframe controls - with active state */}
                                                    <div className="absolute right-0 -bottom-1 flex space-x-1 text-[10px]">
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1D</span>
                                                        <span className="text-premium-white px-1 rounded bg-premium-white/10">1W</span>
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1M</span>
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1Y</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Asset breakdown - with interactive elements */}
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="text-sm text-premium-white font-medium">Asset Breakdown</div>
                                                    <div className="text-xs text-light-gray/70">
                                                        <span className="underline decoration-dotted cursor-pointer hover:text-premium-white transition-colors">View all</span>
                                                    </div>
                                                </div>

                                                {/* Asset list with hover effects */}
                                                <div className="space-y-3">
                                                    <div className="flex items-center bg-dark-gray/10 p-2 rounded-lg hover:bg-dark-gray/20 transition-colors cursor-pointer">
                                                        <div className="w-[5%] text-xs text-light-gray/70">1</div>
                                                        <div className="w-[25%] flex items-center">
                                                            <div className="h-7 w-7 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                                <span className="text-premium-white text-[10px]">ETH</span>
                                                            </div>
                                                            <div className="text-sm text-premium-white">ETH</div>
                                                        </div>
                                                        <div className="w-[30%] pr-2">
                                                            <div className="h-1.5 bg-dark-gray/40 rounded-full overflow-hidden">
                                                                <div className="h-full bg-light-gray/70 rounded-full" style={{ width: '68%' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="w-[20%] text-right text-xs text-light-gray/70">68.2%</div>
                                                        <div className="w-[20%] text-right text-xs text-green-400">+2.8%</div>
                                                    </div>

                                                    <div className="flex items-center bg-dark-gray/10 p-2 rounded-lg hover:bg-dark-gray/20 transition-colors cursor-pointer">
                                                        <div className="w-[5%] text-xs text-light-gray/70">2</div>
                                                        <div className="w-[25%] flex items-center">
                                                            <div className="h-7 w-7 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                                <span className="text-premium-white text-[10px]">BTC</span>
                                                            </div>
                                                            <div className="text-sm text-premium-white">BTC</div>
                                                        </div>
                                                        <div className="w-[30%] pr-2">
                                                            <div className="h-1.5 bg-dark-gray/40 rounded-full overflow-hidden">
                                                                <div className="h-full bg-light-gray/70 rounded-full" style={{ width: '21%' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="w-[20%] text-right text-xs text-light-gray/70">21.4%</div>
                                                        <div className="w-[20%] text-right text-xs text-green-400">+1.4%</div>
                                                    </div>

                                                    <div className="flex items-center bg-dark-gray/10 p-2 rounded-lg hover:bg-dark-gray/20 transition-colors cursor-pointer group relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                                                        <div className="w-[5%] text-xs text-light-gray/70">3</div>
                                                        <div className="w-[25%] flex items-center">
                                                            <div className="h-7 w-7 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                                <span className="text-premium-white text-[10px]">SOL</span>
                                                            </div>
                                                            <div className="text-sm text-premium-white">SOL</div>
                                                        </div>
                                                        <div className="w-[30%] pr-2">
                                                            <div className="h-1.5 bg-dark-gray/40 rounded-full overflow-hidden">
                                                                <div className="h-full bg-light-gray/70 rounded-full" style={{ width: '10%' }}></div>
                                                            </div>
                                                        </div>
                                                        <div className="w-[20%] text-right text-xs text-light-gray/70">10.4%</div>
                                                        <div className="w-[20%] text-right text-xs text-red-400">-0.8%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Screen 2: Asset Details */}
                                        <div className="p-6 w-1/3">
                                            {/* Header with back button */}
                                            <div className="flex items-center mb-5">
                                                <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center mr-3">
                                                    <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <div className="text-premium-white text-lg font-medium">Ethereum</div>
                                            </div>

                                            {/* Asset summary */}
                                            <div className="flex items-center mb-5">
                                                <div className="h-12 w-12 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-4 shadow-inner">
                                                    <span className="text-premium-white font-semibold">ETH</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-premium-white text-xl font-medium">Ethereum</div>
                                                        <div className="flex items-center text-xs text-green-400 rounded-full px-2 py-0.5 bg-[#112211]/30 border border-[#224422]/20">
                                                            <svg className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                            </svg>
                                                            <span>+2.8%</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-0.5">
                                                        <div className="text-light-gray/70 text-sm">4.05 ETH</div>
                                                        <div className="text-premium-white text-sm font-medium">$9,812.45</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price chart */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-4 border border-medium-gray/10">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="text-sm text-premium-white font-medium">Price Chart</div>
                                                    <div className="flex space-x-1 text-[10px]">
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1D</span>
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1W</span>
                                                        <span className="text-premium-white px-1 rounded bg-premium-white/10">1M</span>
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">1Y</span>
                                                        <span className="text-light-gray/50 hover:text-light-gray cursor-pointer transition-colors">All</span>
                                                    </div>
                                                </div>

                                                {/* Larger chart with animation */}
                                                <div className="h-[120px] relative">
                                                    <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                                                        {/* Chart grid lines */}
                                                        <line x1="0" y1="30" x2="300" y2="30" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />
                                                        <line x1="0" y1="60" x2="300" y2="60" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />
                                                        <line x1="0" y1="90" x2="300" y2="90" stroke="#1F1F1F" strokeWidth="1" strokeDasharray="2 2" />

                                                        {/* Chart line with animation */}
                                                        <path
                                                            d="M0,90 C15,85 30,80 45,70 S75,50 90,40 S120,30 135,35 S165,50 180,45 S210,30 225,20 S255,15 270,25 S285,40 300,35"
                                                            fill="none"
                                                            stroke="#ADADAD"
                                                            strokeWidth="2"
                                                            className="chart-line"
                                                        />

                                                        {/* Chart area gradient */}
                                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                            <stop offset="0%" stopColor="#ADADAD" stopOpacity="0.2" />
                                                            <stop offset="100%" stopColor="#ADADAD" stopOpacity="0" />
                                                        </linearGradient>
                                                        <path
                                                            d="M0,90 C15,85 30,80 45,70 S75,50 90,40 S120,30 135,35 S165,50 180,45 S210,30 225,20 S255,15 270,25 S285,40 300,35 V120 H0 Z"
                                                            fill="url(#chartGradient)"
                                                        />

                                                        {/* Highlight dot with pulse animation */}
                                                        <circle cx="225" cy="20" r="4" fill="#FFFFFF" className="animate-pulse" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Asset actions */}
                                            <div className="grid grid-cols-3 gap-3 mb-4">
                                                <button className="bg-dark-gray/40 rounded-lg p-3 flex flex-col items-center justify-center border border-medium-gray/20 hover:bg-dark-gray/60 transition-colors">
                                                    <svg className="h-5 w-5 text-premium-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    <span className="text-xs text-light-gray">Buy</span>
                                                </button>
                                                <button className="bg-dark-gray/40 rounded-lg p-3 flex flex-col items-center justify-center border border-medium-gray/20 hover:bg-dark-gray/60 transition-colors">
                                                    <svg className="h-5 w-5 text-premium-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                    </svg>
                                                    <span className="text-xs text-light-gray">Send</span>
                                                </button>
                                                <button className="bg-dark-gray/40 rounded-lg p-3 flex flex-col items-center justify-center border border-medium-gray/20 hover:bg-dark-gray/60 transition-colors">
                                                    <svg className="h-5 w-5 text-premium-white mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                    <span className="text-xs text-light-gray">Receive</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Screen 3: Transaction Details */}
                                        <div className="p-6 w-1/3">
                                            {/* Header with back button */}
                                            <div className="flex items-center mb-5">
                                                <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center mr-3">
                                                    <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <div className="text-premium-white text-lg font-medium">Transaction Details</div>
                                            </div>

                                            {/* Transaction card */}
                                            <div className="bg-[#121212] rounded-xl p-5 mb-5 border border-medium-gray/10">
                                                {/* Transaction header */}
                                                <div className="flex items-center mb-4">
                                                    <div className="h-12 w-12 rounded-full bg-[#112211]/30 border border-[#224422]/20 flex items-center justify-center mr-4">
                                                        <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="text-premium-white text-lg font-medium">Received ETH</div>
                                                        <div className="text-light-gray/70 text-xs">May 15, 2023 at 14:32</div>
                                                    </div>
                                                </div>

                                                {/* Transaction details */}
                                                <div className="space-y-4">
                                                    <div className="flex justify-between">
                                                        <div className="text-light-gray/70 text-sm">Amount</div>
                                                        <div className="text-premium-white text-sm font-medium">0.35 ETH ($847.80)</div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <div className="text-light-gray/70 text-sm">From</div>
                                                        <div className="text-premium-white text-sm font-medium">0x71C...93E4</div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <div className="text-light-gray/70 text-sm">To</div>
                                                        <div className="text-premium-white text-sm font-medium">Your Wallet (0x28F...76B2)</div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <div className="text-light-gray/70 text-sm">Network Fee</div>
                                                        <div className="text-premium-white text-sm font-medium">0.0012 ETH ($2.90)</div>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <div className="text-light-gray/70 text-sm">Status</div>
                                                        <div className="text-green-400 text-sm font-medium">Confirmed</div>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-dark-gray/40 my-4"></div>

                                                {/* Transaction hash */}
                                                <div className="flex justify-between items-center">
                                                    <div className="text-light-gray/70 text-xs">Transaction Hash</div>
                                                    <div className="text-premium-white text-xs flex items-center">
                                                        <span className="mr-1">0xb731...a9c4</span>
                                                        <svg className="h-3 w-3 text-light-gray/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex space-x-3">
                                                <button className="flex-1 py-3 px-4 bg-dark-gray/40 text-premium-white rounded-xl font-medium tracking-tight border border-medium-gray/20 text-sm">
                                                    View on Explorer
                                                </button>
                                                <button className="flex-1 py-3 px-4 bg-gradient-to-r from-dark-gray to-medium-gray text-premium-white rounded-xl font-medium tracking-tight border border-medium-gray/30 text-sm">
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FinancialToolSection