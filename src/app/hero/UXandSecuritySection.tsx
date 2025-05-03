import React from 'react'

const UXandSecuritySection = () => {
    return (
        <section className="py-20 bg-off-black relative z-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-premium-white mb-3">Premium Experience & Security</h2>
                    <p className="text-light-gray text-lg max-w-2xl mx-auto">
                        We've designed ZenWallet with both intuitive usability and military-grade security in mind
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* User Experience Card */}
                    <div className="bg-dark-gray border border-medium-gray rounded-2xl p-8 hover:border-light-gray transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-premium-white">User Experience</h3>
                            <div className="h-12 w-12 bg-medium-gray rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-4 mb-6">
                            {[
                                { title: 'Intuitive Interface', desc: 'Clean, accessible design for all user levels' },
                                { title: 'Customizable Dashboard', desc: 'Personalized overview of assets and activities' },
                                { title: 'Educational Resources', desc: 'In-app guides and tutorials for DeFi concepts' },
                                { title: 'Multilingual Support', desc: 'Interface available in multiple languages' },
                                { title: 'Dark/Light Modes', desc: 'Visual preference options' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="h-5 w-5 rounded-full bg-dark-gray border border-medium-gray flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-light-gray"><span className="text-premium-white font-medium">{item.title}:</span> {item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Features Card */}
                    <div className="bg-dark-gray border border-medium-gray rounded-2xl p-8 hover:border-light-gray transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-premium-white">Security Features</h3>
                            <div className="h-12 w-12 bg-medium-gray rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-4 mb-6">
                            {[
                                { title: 'Biometric Authentication', desc: 'Fingerprint and facial recognition' },
                                { title: 'Transaction Signing', desc: 'Secure confirmation of all activities' },
                                { title: 'Spending Limits', desc: 'Customizable transaction thresholds' },
                                { title: 'Session Management', desc: 'Automatic lockout and activity timeouts' },
                                { title: 'Phishing Protection', desc: 'Safeguards against common attack vectors' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="h-5 w-5 rounded-full bg-dark-gray border border-medium-gray flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-premium-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-light-gray"><span className="text-premium-white font-medium">{item.title}:</span> {item.desc}</p>
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

export default UXandSecuritySection