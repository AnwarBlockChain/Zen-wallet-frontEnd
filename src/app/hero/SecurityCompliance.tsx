import Link from 'next/link'
import React from 'react'

const SecurityCompliance = () => {
    return (
        <section className="py-20 bg-off-black relative">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-premium-white mb-6">Securing Compliance in DeFi</h2>
                        <p className="text-light-gray text-lg mb-8">
                            Your assets are protected by industry-leading security measures. We employ advanced encryption, multi-sig technology, and regular security audits to ensure your investments remain safe.
                        </p>

                        <div className="space-y-4">
                            {[
                                { title: 'Multi-Layer Protection', desc: 'Defense in depth approach with multiple security layers' },
                                { title: 'Regular Security Audits', desc: 'Independent third-party audits of all smart contracts' },
                                { title: 'Insurance Coverage', desc: 'Additional protection for stored assets' },
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

                        <Link href="/security" className="inline-flex items-center mt-8 px-6 py-3 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white rounded-full transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                            Learn about our security
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-medium-gray to-dark-gray rounded-2xl blur opacity-20"></div>
                        <div className="relative rounded-2xl border border-medium-gray bg-dark-gray overflow-hidden">
                            <div className="p-8 flex items-center justify-center">
                                <div className="relative z-10 text-center">
                                    <div className="h-24 w-24 mx-auto mb-6 relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-medium-gray to-dark-gray rounded-full blur-md opacity-30 animate-pulse"></div>
                                        <div className="relative h-full w-full bg-off-black rounded-full flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-premium-white mb-4">State-of-the-Art Protection</h3>
                                    <p className="text-light-gray">
                                        Your data and private keys are protected with AES-256 encryption, the same standard used by financial institutions and governments worldwide
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SecurityCompliance