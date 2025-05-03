import React from 'react'

const WalletInfraSection = () => {
    return (
        <section className="py-20 relative bg-premium-black">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-bold text-premium-white mb-6">Wallet Infrastructure</h2>
                        <p className="text-light-gray text-lg mb-8">
                            Our non-custodial wallet architecture prioritizes security and flexibility, giving you complete control over your digital assets.
                        </p>

                        <div className="space-y-5">
                            {[
                                { title: 'Multi-chain Support', desc: 'Initially focusing on Ethereum and compatible chains (BSC, Polygon, etc.)' },
                                { title: 'Secure Key Management', desc: 'Non-custodial design with industry-standard encryption' },
                                { title: 'Multiple Account Types', desc: 'HD wallet support with multiple derivation paths' },
                                { title: 'Transaction History', desc: 'Comprehensive record of all user activities' },
                                { title: 'Address Book', desc: 'Saved contacts and recurring transaction templates' },
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
                        {/* Remove the outer container wrapper div and move content directly here */}
                        <div className="relative transform hover:scale-[1.02] transition-transform duration-700 w-full h-full">
                            {/* Remove gradient background div as requested */}

                            {/* Premium wallet mockup - frameless with animations */}
                            <div className="relative z-10 w-full max-w-sm mx-auto overflow-hidden">
                                <div className="relative mx-auto bg-[#0A0A0A] rounded-2xl border border-medium-gray/20 shadow-xl overflow-hidden">
                                    {/* App content with flow animation */}
                                    <div className="flex animate-flow" style={{ width: '300%' }}>
                                        {/* Screen 1: Wallet Overview */}
                                        <div className="p-6 w-1/3">
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-5">
                                                <div>
                                                    <div className="text-premium-white text-xl font-bold tracking-tight">ZenWallet</div>
                                                    <div className="text-light-gray/70 text-xs mt-0.5">Your secure wallet for crypto</div>
                                                </div>
                                                <div className="h-9 w-9 rounded-full bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center hover:bg-dark-gray/60 transition-colors cursor-pointer">
                                                    <svg className="h-4 w-4 text-premium-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Balance card - with subtle pulse animation */}
                                            <div className="bg-gradient-to-br from-[#121212] to-[#181818] rounded-2xl p-5 mb-5 border border-dark-gray/50 shadow-lg relative overflow-hidden">
                                                <div className="absolute -right-10 -top-10 w-20 h-20 bg-premium-white/5 rounded-full blur-xl animate-pulse-slow"></div>
                                                <div className="text-xs text-light-gray/70 mb-1.5">Total Balance</div>
                                                <div className="flex items-end justify-between">
                                                    <div className="text-premium-white text-3xl font-bold tracking-tight">$14,382.59</div>
                                                    <div className="flex items-center text-xs text-green-400 rounded-full px-2 py-0.5 bg-[#112211]/30 border border-[#224422]/20">
                                                        <svg className="h-3 w-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                                        </svg>
                                                        <span>+3.2%</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-6">
                                                    <button className="bg-dark-gray/60 border border-medium-gray/20 rounded-lg flex items-center justify-center h-9 w-9 hover:bg-dark-gray/80 transition-colors">
                                                        <svg className="h-4 w-4 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </button>
                                                    <button className="bg-dark-gray/60 border border-medium-gray/20 rounded-lg flex items-center justify-center h-9 w-9 hover:bg-dark-gray/80 transition-colors">
                                                        <svg className="h-4 w-4 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                                        </svg>
                                                    </button>
                                                    <button className="bg-dark-gray/60 border border-medium-gray/20 rounded-lg flex items-center justify-center h-9 w-9 hover:bg-dark-gray/80 transition-colors">
                                                        <svg className="h-4 w-4 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Assets - with hover effects */}
                                            <div>
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="text-premium-white font-semibold text-sm">My Assets</div>
                                                    <div className="text-light-gray/70 text-xs">
                                                        <span className="underline decoration-dotted cursor-pointer hover:text-premium-white transition-colors">View all</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    {/* ETH - with hover effect */}
                                                    <div className="bg-gradient-to-r from-dark-gray/20 to-dark-gray/10 rounded-xl p-3 flex items-center border border-medium-gray/10 hover:border-medium-gray/30 transition-all cursor-pointer group">
                                                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-dark-gray to-dark-gray/60 mr-3 shadow-inner border border-medium-gray/20 group-hover:border-medium-gray/40 transition-all">
                                                            <span className="text-premium-white font-semibold text-sm">ETH</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-premium-white text-sm font-medium">Ethereum</div>
                                                                <div className="text-premium-white text-sm font-medium group-hover:scale-105 transition-transform">$9,812.45</div>
                                                            </div>
                                                            <div className="flex justify-between items-center mt-0.5">
                                                                <div className="text-light-gray/70 text-xs">4.05 ETH</div>
                                                                <div className="text-green-400 text-xs">+2.8%</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* BTC - with shimmer animation */}
                                                    <div className="bg-gradient-to-r from-dark-gray/20 to-dark-gray/10 rounded-xl p-3 flex items-center border border-medium-gray/10 hover:border-medium-gray/30 transition-all cursor-pointer relative overflow-hidden group">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
                                                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-dark-gray to-dark-gray/60 mr-3 shadow-inner border border-medium-gray/20 group-hover:border-medium-gray/40 transition-all">
                                                            <span className="text-premium-white font-semibold text-sm">BTC</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-premium-white text-sm font-medium">Bitcoin</div>
                                                                <div className="text-premium-white text-sm font-medium group-hover:scale-105 transition-transform">$4,570.14</div>
                                                            </div>
                                                            <div className="flex justify-between items-center mt-0.5">
                                                                <div className="text-light-gray/70 text-xs">0.14 BTC</div>
                                                                <div className="text-green-400 text-xs">+1.4%</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Screen 2: Send Crypto */}
                                        <div className="p-6 w-1/3">
                                            {/* Header */}
                                            <div className="flex items-center mb-5">
                                                <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center mr-3">
                                                    <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <div className="text-premium-white text-lg font-medium">Send ETH</div>
                                            </div>

                                            {/* Amount input */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-5 border border-medium-gray/10">
                                                <div className="text-xs text-light-gray/70 mb-2">Amount</div>
                                                <div className="flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        defaultValue="1.25"
                                                        className="bg-transparent text-2xl text-premium-white font-medium w-1/2 focus:outline-none"
                                                    />
                                                    <div className="flex items-center bg-dark-gray/40 px-3 py-2 rounded-lg border border-medium-gray/20">
                                                        <div className="h-5 w-5 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                            <span className="text-premium-white text-[10px]">Ξ</span>
                                                        </div>
                                                        <span className="text-premium-white text-sm">ETH</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-light-gray/70 mt-1">≈ $3,031.40</div>
                                            </div>

                                            {/* Recipient */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-5 border border-medium-gray/10">
                                                <div className="text-xs text-light-gray/70 mb-2">To</div>
                                                <div className="flex items-center">
                                                    <div className="h-8 w-8 rounded-full bg-dark-gray/60 flex items-center justify-center mr-3">
                                                        <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-premium-white text-sm font-medium">Alex</div>
                                                        <div className="text-light-gray/70 text-xs">0x71C...93E4</div>
                                                    </div>
                                                    <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center">
                                                        <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Network Fee */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-5 border border-medium-gray/10">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-xs text-light-gray/70">Network Fee</div>
                                                    <div className="text-xs text-premium-white">0.0012 ETH ($2.90)</div>
                                                </div>
                                                <div className="mt-2 h-1.5 bg-dark-gray/40 rounded-full overflow-hidden">
                                                    <div className="h-full bg-light-gray/70 rounded-full" style={{ width: '60%' }}></div>
                                                </div>
                                                <div className="flex justify-between items-center mt-1">
                                                    <div className="text-[10px] text-light-gray/50">Slow</div>
                                                    <div className="text-[10px] text-light-gray/50">Fast</div>
                                                </div>
                                            </div>

                                            {/* Send button */}
                                            <button className="w-full py-3 px-4 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-xl font-medium tracking-tight transition-all duration-300 shadow-sm hover:shadow-md border border-medium-gray/30">
                                                Review Transaction
                                            </button>
                                        </div>

                                        {/* Screen 3: Confirmation */}
                                        <div className="p-6 w-1/3">
                                            {/* Success animation */}
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <div className="h-16 w-16 rounded-full bg-[#112211]/30 border border-[#224422]/20 flex items-center justify-center mb-4">
                                                    <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="text-premium-white text-xl font-bold mb-1">Transaction Sent!</div>
                                                <div className="text-light-gray/70 text-sm mb-6">1.25 ETH has been sent successfully</div>

                                                <div className="bg-[#121212] rounded-xl p-4 w-full mb-5 border border-medium-gray/10">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="text-xs text-light-gray/70">Amount</div>
                                                        <div className="text-sm text-premium-white">1.25 ETH ($3,031.40)</div>
                                                    </div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <div className="text-xs text-light-gray/70">To</div>
                                                        <div className="text-sm text-premium-white">Alex (0x71C...93E4)</div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Fee</div>
                                                        <div className="text-sm text-premium-white">0.0012 ETH ($2.90)</div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3 w-full">
                                                    <button className="flex-1 py-3 px-4 bg-dark-gray/40 text-premium-white rounded-xl font-medium tracking-tight border border-medium-gray/20">
                                                        View Details
                                                    </button>
                                                    <button className="flex-1 py-3 px-4 bg-gradient-to-r from-dark-gray to-medium-gray text-premium-white rounded-xl font-medium tracking-tight border border-medium-gray/30">
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
            </div>
        </section>
    )
}

export default WalletInfraSection