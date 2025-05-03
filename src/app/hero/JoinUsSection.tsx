import Link from 'next/link'
import React from 'react'
import {
    FaTelegram,
    FaDiscord,
    FaRedditAlien,
    FaFacebook,
    FaBell
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const JoinUsSection = () => {
    return (
        <section className="py-20 bg-off-black relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-premium-white mb-3">Join us</h2>
                    <p className="text-light-gray text-lg max-w-2xl mx-auto">
                        Stay updated with the latest news and developments
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 lg:gap-16">
                    {[
                        {
                            name: 'Telegram',
                            icon: FaTelegram,
                            href: '#telegram'
                        },
                        {
                            name: 'Discord',
                            icon: FaDiscord,
                            href: '#discord'
                        },
                        {
                            name: 'X',
                            icon: FaXTwitter,
                            href: '#twitter'
                        },
                        {
                            name: 'Reddit',
                            icon: FaRedditAlien,
                            href: '#reddit'
                        },
                        {
                            name: 'Facebook',
                            icon: FaFacebook,
                            href: '#facebook'
                        },
                        {
                            name: 'Subscribe',
                            icon: FaBell,
                            href: '#subscribe'
                        }
                    ].map((platform, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Link href={platform.href} className="group">
                                <div className="h-16 w-16 md:h-20 md:w-20 bg-premium-black rounded-2xl flex items-center justify-center border border-medium-gray/20 shadow-lg group-hover:border-medium-gray/40 group-hover:scale-105 transition-all duration-300">
                                    <platform.icon className="h-8 w-8 md:h-10 md:w-10 text-premium-white/70 group-hover:text-premium-white transition-colors" />
                                </div>
                                <div className="mt-4 text-light-gray group-hover:text-premium-white transition-colors text-center">{platform.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>)
}

export default JoinUsSection