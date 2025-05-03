import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductsSection = () => {
    return (
        <section className="py-20 bg-off-black relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-premium-white mb-3">ZenWallet Products</h2>
                    <p className="text-light-gray text-lg max-w-2xl mx-auto">
                        Experience our comprehensive suite of DeFi tools designed for seamless crypto management
                    </p>
                </div>

                {/* Swap Product */}
                <div className="bg-dark-gray border border-medium-gray rounded-3xl overflow-hidden mb-16 transform hover:scale-[1.01] transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 md:p-12">
                            <div className="inline-block px-4 py-1 bg-medium-gray rounded-full text-premium-white text-sm font-medium mb-4">
                                FEATURED
                            </div>
                            <h3 className="text-3xl font-bold text-premium-white mb-4">ZenWallet Swap</h3>
                            <p className="text-light-gray mb-6">
                                Get the best rates across multiple liquidity sources with our advanced routing algorithm.
                                Save on fees and maximize your returns with intelligent swap paths.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    'Lowest slippage in the market',
                                    'Multi-chain support',
                                    'MEV protection',
                                    'Gas optimization'
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-center text-light-gray">
                                        <svg className="h-5 w-5 mr-2 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/swap" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-full transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                                Swap Now
                            </Link>
                        </div>
                        <div className="bg-premium-black p-8 flex items-center justify-center">
                            <div className="relative w-full max-w-md">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-dark-gray to-medium-gray rounded-2xl blur opacity-20"></div>
                                <div className="relative bg-dark-gray rounded-2xl p-4 md:p-6 border border-medium-gray">
                                    <div className="mb-4 flex justify-between items-center">
                                        <span className="text-lg font-semibold text-premium-white">Swap</span>
                                        <div className="flex space-x-2">
                                            <button className="p-1 rounded-md hover:bg-medium-gray">
                                                <svg className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                </svg>
                                            </button>
                                            <button className="p-1 rounded-md hover:bg-medium-gray">
                                                <svg className="h-5 w-5 text-light-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-premium-black rounded-xl mb-2">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-light-gray">From</span>
                                            <span className="text-light-gray">Balance: 0.42</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 bg-medium-gray rounded-full flex items-center justify-center mr-2">
                                                    <span className="text-premium-white font-semibold">E</span>
                                                </div>
                                                <span className="text-premium-white">ETH</span>
                                            </div>
                                            <span className="text-xl font-medium text-premium-white">0.5</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center -my-2 relative z-10">
                                        <button className="h-10 w-10 rounded-full bg-dark-gray border border-medium-gray flex items-center justify-center">
                                            <svg className="h-5 w-5 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-3 bg-premium-black rounded-xl mt-2 mb-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-light-gray">To (estimated)</span>
                                            <span className="text-light-gray">Balance: 0</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 bg-medium-gray rounded-full flex items-center justify-center mr-2">
                                                    <span className="text-premium-white font-semibold">U</span>
                                                </div>
                                                <span className="text-premium-white">USDC</span>
                                            </div>
                                            <span className="text-xl font-medium text-premium-white">945.33</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-light-gray mb-4">
                                        <span>Rate</span>
                                        <span>1 ETH = 1,890.66 USDC</span>
                                    </div>
                                    <button className="w-full py-3 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-full font-medium transition-all duration-300 shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                                        Swap Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other ZenWallet Products */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "ZenWallet Portfolio",
                            description: "Track and analyze your crypto investments across all blockchains with real-time data visualization.",
                            icon: "/images/products/portfolio-icon.svg",
                            altText: "Portfolio Icon",
                            link: "portfolio"
                        },
                        {
                            title: "ZenWallet Card",
                            description: "Connect your crypto to everyday purchases with our virtual and physical debit cards.",
                            icon: "/images/products/card-icon.svg",
                            altText: "Card Icon",
                            link: "card"
                        },
                        {
                            title: "ZenWallet Bridge",
                            description: "Transfer assets between different blockchains with the lowest fees and highest security.",
                            icon: "/images/products/bridge-icon.svg",
                            altText: "Bridge Icon",
                            link: "bridge"
                        }
                    ].map((product, index) => (
                        <div key={index} className="bg-dark-gray border border-medium-gray rounded-2xl p-6 hover:border-light-gray transition-all duration-300 transform hover:scale-[1.02]">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-premium-white">{product.title}</h3>
                                <div className="h-10 w-10 flex items-center justify-center">
                                    <Image
                                        src={product.icon}
                                        alt={product.altText}
                                        width={32}
                                        height={32}
                                        className="h-8 w-8"
                                    />
                                </div>
                            </div>
                            <p className="text-light-gray mb-6">{product.description}</p>
                            <Link href={`/${product.link}`} className="inline-flex items-center text-premium-white hover:text-light-gray transition-colors">
                                <span>Learn more</span>
                                <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductsSection