import Image from 'next/image'
import React from 'react'

const PartnersSection = () => {
    return (
        <section className="py-20 relative bg-premium-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-premium-white mb-3">Partners and stakeholders</h2>
                    <p className="text-light-gray text-lg max-w-2xl mx-auto">
                        Trusted by the world's leading blockchain organizations
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 md:gap-16">
                    {[
                        {
                            name: 'Binance',
                            logo: '/brands/binance.svg',
                            type: 'CEX'
                        },
                        {
                            name: 'Coinbase',
                            logo: '/brands/coinbase.svg',
                            type: 'CEX'
                        },
                        {
                            name: 'Kraken',
                            logo: '/brands/kraken.svg',
                            type: 'CEX'
                        },
                        {
                            name: 'KuCoin',
                            logo: '/brands/kucoin.svg',
                            type: 'CEX'
                        },
                        {
                            name: 'dYdX',
                            logo: '/brands/dydx.svg',
                            type: 'DEX'
                        },
                        {
                            name: 'Uniswap',
                            type: 'DEX'
                        },
                        {
                            name: 'OKX',
                            type: 'CEX'
                        },
                        {
                            name: 'PancakeSwap',
                            type: 'DEX'
                        },
                        {
                            name: 'SushiSwap',
                            type: 'DEX'
                        },
                        {
                            name: 'Bybit',
                            type: 'CEX'
                        }
                    ].map((partner, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div className="h-20 w-full flex items-center justify-center mb-4 bg-off-black/50 rounded-xl p-4">
                                {partner.logo ? (
                                    <Image
                                        src={partner.logo}
                                        alt={`${partner.name} Logo`}
                                        width={80}
                                        height={80}
                                        className="max-h-full w-auto object-contain transition-all duration-300 opacity-70 hover:opacity-100 filter invert"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full text-light-gray">
                                        <span className="text-xl font-bold">{partner.name}</span>
                                    </div>
                                )}
                            </div>
                            <span className="text-medium-gray text-sm group-hover:text-premium-white font-medium transition-colors">
                                {partner.name}
                            </span>
                            <span className="text-light-gray/50 text-xs mt-1">
                                {partner.type}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>)
}

export default PartnersSection