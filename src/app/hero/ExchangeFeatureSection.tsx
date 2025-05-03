import React from 'react'

const ExchangeFeatureSection = () => {
    return (
        <section className="py-20 bg-off-black relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        {/* Remove the outer container wrapper div and move content directly here */}
                        <div className="relative transform hover:scale-105 transition-transform duration-700 w-full h-full">
                            {/* Remove gradient background div */}

                            {/* Premium exchange mockup - frameless with animations */}
                            <div className="relative z-10 w-full max-w-sm mx-auto overflow-hidden">
                                {/* Swap interface with flow animation */}
                                <div className="bg-[#0A0A0A] rounded-2xl border border-medium-gray/20 shadow-xl overflow-hidden">
                                    <div className="flex animate-flow" style={{ width: '300%' }}>
                                        {/* Screen 1: Swap Interface */}
                                        <div className="p-6 w-1/3">
                                            <div className="flex justify-between items-center mb-5">
                                                <div className="text-premium-white font-medium tracking-tight text-lg">Exchange</div>
                                                <div className="bg-dark-gray/40 backdrop-blur-sm rounded-lg flex p-0.5 border border-medium-gray/10">
                                                    <button className="px-3 py-1 text-xs text-premium-white bg-dark-gray/80 rounded-md shadow-sm">
                                                        Market
                                                    </button>
                                                    <button className="px-3 py-1 text-xs text-light-gray/70 hover:text-light-gray transition-colors">
                                                        Limit
                                                    </button>
                                                </div>
                                            </div>

                                            {/* From token - with focus animation */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-2 border border-medium-gray/10 focus-within:border-medium-gray/30 transition-colors">
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="text-xs text-light-gray/70">You pay</div>
                                                    <div className="text-xs text-light-gray/70">Balance: 4.05 ETH</div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        defaultValue="1.0"
                                                        className="bg-transparent text-2xl text-premium-white font-medium w-1/2 focus:outline-none"
                                                    />
                                                    <button className="flex items-center bg-dark-gray/40 hover:bg-dark-gray/60 px-3 py-2 rounded-lg border border-medium-gray/20 transition-colors group">
                                                        <div className="h-5 w-5 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner group-hover:border-medium-gray/40 transition-colors">
                                                            <span className="text-premium-white text-[10px]">Ξ</span>
                                                        </div>
                                                        <span className="text-premium-white text-sm mr-2">ETH</span>
                                                        <svg className="h-3.5 w-3.5 text-light-gray/70 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="text-xs text-light-gray/70 mt-1">≈ $2,425.12</div>
                                            </div>

                                            {/* Swap icon - with rotation animation */}
                                            <div className="flex justify-center -my-2.5 relative z-10">
                                                <button className="h-9 w-9 rounded-lg bg-[#0A0A0A] border border-medium-gray/30 flex items-center justify-center shadow-lg hover:rotate-180 transition-transform duration-500">
                                                    <svg className="h-4 w-4 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* To token - with shimmer effect */}
                                            <div className="bg-[#121212] rounded-xl p-4 mt-2 mb-5 border border-medium-gray/10 focus-within:border-medium-gray/30 transition-colors relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-white/5 to-transparent -translate-x-full animate-shimmer"></div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="text-xs text-light-gray/70">You receive</div>
                                                    <div className="text-xs text-light-gray/70">Balance: 0 USDC</div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <input
                                                        type="text"
                                                        defaultValue="2,425.12"
                                                        className="bg-transparent text-2xl text-premium-white font-medium w-1/2 focus:outline-none"
                                                    />
                                                    <button className="flex items-center bg-dark-gray/40 hover:bg-dark-gray/60 px-3 py-2 rounded-lg border border-medium-gray/20 transition-colors group">
                                                        <div className="h-5 w-5 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner group-hover:border-medium-gray/40 transition-colors">
                                                            <span className="text-premium-white text-[10px]">$</span>
                                                        </div>
                                                        <span className="text-premium-white text-sm mr-2">USDC</span>
                                                        <svg className="h-3.5 w-3.5 text-light-gray/70 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Exchange details - with hover highlight */}
                                            <div className="bg-dark-gray/10 rounded-lg p-3 mb-4 border border-medium-gray/10 hover:border-medium-gray/20 transition-colors">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-xs text-light-gray/70">Rate</div>
                                                    <div className="text-xs text-premium-white">1 ETH = 2,425.12 USDC</div>
                                                </div>
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="text-xs text-light-gray/70">Route</div>
                                                    <div className="text-xs text-premium-white flex items-center group cursor-pointer">
                                                        <span>ETH → USDC</span>
                                                        <svg className="h-3.5 w-3.5 text-light-gray/70 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Swap button - with hover animation */}
                                            <button className="w-full py-3 px-4 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-xl font-medium tracking-tight transition-all duration-300 shadow-sm hover:shadow-md border border-medium-gray/30 hover:scale-[1.02] active:scale-[0.98] focus:scale-[0.98]">
                                                Swap Now
                                            </button>
                                        </div>

                                        {/* Screen 2: Review Swap */}
                                        <div className="p-6 w-1/3">
                                            <div className="flex items-center mb-5">
                                                <button className="h-8 w-8 rounded-lg bg-dark-gray/40 backdrop-blur-sm border border-medium-gray/10 flex items-center justify-center mr-3">
                                                    <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <div className="text-premium-white text-lg font-medium">Review Swap</div>
                                            </div>

                                            {/* Swap summary */}
                                            <div className="bg-[#121212] rounded-xl p-4 mb-5 border border-medium-gray/10">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                            <span className="text-premium-white text-[10px]">Ξ</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-premium-white text-sm font-medium">1.0 ETH</div>
                                                            <div className="text-light-gray/70 text-xs">$2,425.12</div>
                                                        </div>
                                                    </div>
                                                    <div className="h-8 w-8 rounded-full bg-dark-gray/40 flex items-center justify-center">
                                                        <svg className="h-4 w-4 text-premium-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                            <span className="text-premium-white text-[10px]">$</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-premium-white text-sm font-medium">2,425.12 USDC</div>
                                                            <div className="text-light-gray/70 text-xs">$2,425.12</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-dark-gray/40 my-4"></div>

                                                {/* Swap details */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Rate</div>
                                                        <div className="text-xs text-premium-white">1 ETH = 2,425.12 USDC</div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Price Impact</div>
                                                        <div className="text-xs text-green-400">0.05%</div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Network Fee</div>
                                                        <div className="text-xs text-premium-white">~$3.50</div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Route</div>
                                                        <div className="text-xs text-premium-white">ETH → USDC</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Warning */}
                                            <div className="bg-[#221111]/30 border border-[#442222]/20 rounded-lg p-3 mb-5">
                                                <div className="flex items-start">
                                                    <svg className="h-4 w-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    <div className="text-xs text-light-gray">
                                                        Prices may change due to market conditions. Review the details before confirming your swap.
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Confirm button */}
                                            <button className="w-full py-3 px-4 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-xl font-medium tracking-tight transition-all duration-300 shadow-sm hover:shadow-md border border-medium-gray/30">
                                                Confirm Swap
                                            </button>
                                        </div>

                                        {/* Screen 3: Success */}
                                        <div className="p-6 w-1/3">
                                            {/* Success animation */}
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <div className="h-16 w-16 rounded-full bg-[#112211]/30 border border-[#224422]/20 flex items-center justify-center mb-4">
                                                    <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="text-premium-white text-xl font-bold mb-1">Swap Successful!</div>
                                                <div className="text-light-gray/70 text-sm mb-6">Your transaction has been confirmed</div>

                                                <div className="bg-[#121212] rounded-xl p-4 w-full mb-5 border border-medium-gray/10">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                                <span className="text-premium-white text-[10px]">Ξ</span>
                                                            </div>
                                                            <div>
                                                                <div className="text-premium-white text-sm font-medium">1.0 ETH</div>
                                                                <div className="text-light-gray/70 text-xs">Sent</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 rounded-full bg-dark-gray border border-medium-gray/20 flex items-center justify-center mr-2 shadow-inner">
                                                                <span className="text-premium-white text-[10px]">$</span>
                                                            </div>
                                                            <div>
                                                                <div className="text-premium-white text-sm font-medium">2,425.12 USDC</div>
                                                                <div className="text-light-gray/70 text-xs">Received</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="h-px bg-dark-gray/40 my-4"></div>

                                                    <div className="flex justify-between items-center">
                                                        <div className="text-xs text-light-gray/70">Transaction Hash</div>
                                                        <div className="text-xs text-premium-white flex items-center">
                                                            <span className="mr-1">0x71C...93E4</span>
                                                            <svg className="h-3 w-3 text-light-gray/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-3 w-full">
                                                    <button className="flex-1 py-3 px-4 bg-dark-gray/40 text-premium-white rounded-xl font-medium tracking-tight border border-medium-gray/20">
                                                        View on Explorer
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

                    <div>
                        <h2 className="text-4xl font-bold text-premium-white mb-6">Exchange Features</h2>
                        <p className="text-light-gray text-lg mb-8">
                            Trade with confidence using our advanced exchange features that optimize for the best rates while giving you full control.
                        </p>

                        <div className="space-y-5">
                            {[
                                { title: 'Token Swapping', desc: 'Direct exchange between thousands of tokens using AMM protocols' },
                                { title: 'Liquidity Pools', desc: 'Interface for adding/removing liquidity from pools' },
                                { title: 'Slippage Control', desc: 'Customizable settings to prevent excessive price impact' },
                                { title: 'Route Optimization', desc: 'Smart routing to find the best prices across multiple pools' },
                                { title: 'Limit Orders', desc: 'Advanced trading options (optional premium feature)' },
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
                </div>
            </div>
        </section>
    )
}

export default ExchangeFeatureSection