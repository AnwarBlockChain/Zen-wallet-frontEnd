import Link from 'next/link'
import React from 'react'

const ZenWalletSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-premium-black">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 grid-rows-12 gap-4">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border border-medium-gray rounded"></div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-premium-white mb-3">Build your own Web3 solution</h2>
                    <p className="text-light-gray text-lg max-w-2xl mx-auto">
                        Access our powerful APIs and developer tools to integrate ZenWallet features into your applications
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    <div className="bg-dark-gray border border-medium-gray rounded-2xl p-8 max-w-md hover:border-light-gray transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="h-12 w-12 bg-medium-gray rounded-xl flex items-center justify-center mb-6">
                            <svg className="h-6 w-6 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-premium-white mb-4">Developer API</h3>
                        <p className="text-light-gray mb-6">
                            Integrate our powerful swap, bridge, and portfolio functionality directly into your applications with our comprehensive API suite.
                        </p>
                        <Link href="/developers" className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-full transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                            Explore API docs
                        </Link>
                    </div>

                    <div className="bg-dark-gray border border-medium-gray rounded-2xl p-8 max-w-md hover:border-light-gray transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="h-12 w-12 bg-medium-gray rounded-xl flex items-center justify-center mb-6">
                            <svg className="h-6 w-6 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-premium-white mb-4">Widget SDK</h3>
                        <p className="text-light-gray mb-6">
                            Add ZenWallet's powerful swap capabilities to your website or app in minutes with our customizable widget.
                        </p>
                        <Link href="/widget" className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-full transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                            Get started with SDK
                        </Link>
                    </div>
                </div>
            </div>
        </section>)
}

export default ZenWalletSection