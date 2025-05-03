import Image from 'next/image'
import React from 'react'

const MultichainDexSection = () => {
    return (
        <section className="py-20 relative bg-premium-black/30 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-premium-white mb-6">
                        Optimize your trades across<br />
                        hundreds of DEXes on<br />
                        multiple networks
                    </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-10 md:gap-14 justify-center mb-8">
                    {[
                        {
                            name: 'Gnosis',
                            imageSrc: '/images/chains/gnosis-logo.svg',
                            imageAlt: 'Gnosis Chain Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Avalanche',
                            imageSrc: '/images/chains/avalanche-logo.svg',
                            imageAlt: 'Avalanche Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Arbitrum',
                            imageSrc: '/images/chains/arbitrum-logo.svg',
                            imageAlt: 'Arbitrum Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Fantom',
                            imageSrc: '/images/chains/fantom-logo.svg',
                            imageAlt: 'Fantom Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Kava',
                            imageSrc: '/images/chains/kava-logo.svg',
                            imageAlt: 'Kava Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Aurora',
                            imageSrc: '/images/chains/aurora-logo.svg',
                            imageAlt: 'Aurora Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'zkSync',
                            imageSrc: '/images/chains/zksync-logo.svg',
                            imageAlt: 'zkSync Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        },
                        {
                            name: 'Base',
                            imageSrc: '/images/chains/base-logo.svg',
                            imageAlt: 'Base Logo',
                            className: 'h-14 w-14 md:h-16 md:w-16 opacity-75 hover:opacity-100 transition-opacity duration-300'
                        }
                    ].map((network, index) => (
                        <div key={index} className="flex flex-col items-center justify-center text-center">
                            <div className="mb-4 flex items-center justify-center">
                                <Image
                                    src={network.imageSrc}
                                    alt={network.imageAlt}
                                    width={64}
                                    height={64}
                                    className={network.className}
                                />
                            </div>
                            <span className="text-light-gray text-sm font-medium">{network.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>)
}

export default MultichainDexSection