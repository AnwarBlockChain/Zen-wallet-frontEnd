"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaLinkedin, FaTwitter, FaGithub, FaArrowRight } from 'react-icons/fa';

// Sample team members data
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    bio: "Former fintech executive with 10+ years of experience in blockchain and financial services. Led product strategy at Coinbase before founding ZenWallet.",
    image: "/images/team/sarah-chen.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      github: "https://github.com/sarahchen"
    }
  },
  {
    name: "Michael Rodriguez",
    role: "CTO & Co-Founder",
    bio: "Blockchain architect and security expert with experience at Ethereum Foundation. Led development teams at multiple successful Web3 startups.",
    image: "/images/team/michael-rodriguez.jpg",
    social: {
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      twitter: "https://twitter.com/michaelrodriguez",
      github: "https://github.com/michaelrodriguez"
    }
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Product leader with experience at top fintech companies. Passionate about creating intuitive user experiences in the decentralized finance space.",
    image: "/images/team/david-kim.jpg",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      twitter: "https://twitter.com/davidkim",
      github: "https://github.com/davidkim"
    }
  },
  {
    name: "Emily Johnson",
    role: "Head of Design",
    bio: "Award-winning designer specializing in crypto and fintech interfaces. Previously led design teams at Robinhood and Metamask.",
    image: "/images/team/emily-johnson.jpg",
    social: {
      linkedin: "https://linkedin.com/in/emilyjohnson",
      twitter: "https://twitter.com/emilyjohnson",
      github: "https://github.com/emilyjohnson"
    }
  },
  {
    name: "Alex Thompson",
    role: "Head of Business Development",
    bio: "Strategic partnerships expert with deep connections in the blockchain ecosystem. Previously led business development at Aave and Compound.",
    image: "/images/team/alex-thompson.jpg",
    social: {
      linkedin: "https://linkedin.com/in/alexthompson",
      twitter: "https://twitter.com/alexthompson",
      github: "https://github.com/alexthompson"
    }
  },
  {
    name: "Sophia Martinez",
    role: "Head of Security",
    bio: "Cybersecurity expert with a focus on blockchain security. Led security audits for major DeFi protocols and implemented robust security measures.",
    image: "/images/team/sophia-martinez.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sophiamartinez",
      twitter: "https://twitter.com/sophiamartinez",
      github: "https://github.com/sophiamartinez"
    }
  }
];

// Company milestones
const milestones = [
  {
    year: "2021",
    quarter: "Q3",
    title: "ZenWallet Founded",
    description: "Sarah Chen and Michael Rodriguez founded ZenWallet with a vision to create the most elegant and secure decentralized wallet experience."
  },
  {
    year: "2021",
    quarter: "Q4",
    title: "Seed Funding Round",
    description: "Raised $5M in seed funding from leading crypto venture capital firms to build the initial product and grow the team."
  },
  {
    year: "2022",
    quarter: "Q1",
    title: "Alpha Launch",
    description: "Released the alpha version of ZenWallet to a select group of early adopters, focusing on core wallet functionality and security."
  },
  {
    year: "2022",
    quarter: "Q3",
    title: "Beta Launch",
    description: "Expanded to public beta with support for Ethereum and compatible chains, introducing the swap feature and portfolio tracking."
  },
  {
    year: "2022",
    quarter: "Q4",
    title: "Series A Funding",
    description: "Secured $20M in Series A funding to accelerate development and expand the team across engineering, design, and business development."
  },
  {
    year: "2023",
    quarter: "Q1",
    title: "Multi-chain Support",
    description: "Added support for multiple blockchain networks, including Layer 2 solutions and alternative Layer 1 chains."
  },
  {
    year: "2023",
    quarter: "Q2",
    title: "Mobile App Launch",
    description: "Released the ZenWallet mobile app for iOS and Android, bringing the elegant wallet experience to mobile users."
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "1 Million Users",
    description: "Reached the milestone of 1 million active users across all platforms, with over $1B in total transaction volume."
  },
  {
    year: "2024",
    quarter: "Q1",
    title: "ZenWallet 2.0",
    description: "Launched ZenWallet 2.0 with a redesigned interface, enhanced security features, and improved performance across all platforms."
  }
];

// Company values
const values = [
  {
    title: "Security First",
    description: "We prioritize the security of our users' assets above all else, implementing industry-leading security measures and regular audits."
  },
  {
    title: "Elegant Simplicity",
    description: "We believe that powerful technology should be accessible through intuitive design, making complex blockchain interactions simple and elegant."
  },
  {
    title: "User Sovereignty",
    description: "We are committed to non-custodial solutions that give users complete control over their digital assets and data."
  },
  {
    title: "Continuous Innovation",
    description: "We constantly push the boundaries of what's possible in decentralized finance, staying at the forefront of blockchain technology."
  },
  {
    title: "Global Accessibility",
    description: "We build for users around the world, ensuring our products are accessible regardless of location, language, or technical expertise."
  },
  {
    title: "Transparent Operations",
    description: "We operate with full transparency, communicating openly with our community and maintaining the highest ethical standards."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-premium-black relative">
      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-premium-white mb-6">
              About ZenWallet
            </h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl mx-auto">
              We're building the world's most elegant decentralized wallet experience, empowering users to navigate the future of finance with confidence and ease.
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-6">Our Mission</h2>
              <p className="text-light-gray text-lg mb-6">
                At ZenWallet, we're on a mission to make decentralized finance accessible to everyone through intuitive design and powerful technology. We believe that financial sovereignty is a fundamental right, and we're building the tools to make that right a reality for people around the world.
              </p>
              <p className="text-light-gray text-lg mb-6">
                Our team combines deep expertise in blockchain technology, security, design, and financial services to create a wallet experience that is both powerful and elegant. We're committed to building products that empower users to take control of their financial future in the decentralized economy.
              </p>
              <p className="text-light-gray text-lg">
                We envision a world where decentralized finance is the norm, not the exception—where users can seamlessly interact with blockchain networks without needing to understand the complex technology underneath. ZenWallet is our contribution to making that vision a reality.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-premium-white text-lg font-medium">Mission Image</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 aspect-video rounded-2xl overflow-hidden border-4 border-premium-black">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-premium-white text-sm font-medium">Team at Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-off-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Our Values</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              These core principles guide everything we do at ZenWallet, from product development to team culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10">
                <div className="w-12 h-12 rounded-full bg-dark-gray/50 flex items-center justify-center mb-6">
                  <span className="text-premium-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-premium-white mb-3">{value.title}</h3>
                <p className="text-light-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Meet Our Team</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              We're a diverse team of experts passionate about building the future of decentralized finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-premium-black/50 rounded-2xl overflow-hidden border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10 group">
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-premium-white text-lg font-medium">{member.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-premium-white mb-1">{member.name}</h3>
                  <p className="text-light-gray text-sm mb-4">{member.role}</p>
                  <p className="text-light-gray text-sm mb-6">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                      <FaLinkedin size={16} />
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                      <FaTwitter size={16} />
                    </a>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                      <FaGithub size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/careers" className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
              <span>Join Our Team</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-off-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Our Journey</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              From our founding to the present day, we've been on a mission to revolutionize decentralized finance.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-dark-gray/50 transform md:translate-x-px"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 pb-12 md:pb-0 md:px-8">
                    <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10">
                      <div className="flex items-center mb-4">
                        <div className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full mr-2">
                          {milestone.year}
                        </div>
                        <div className="text-light-gray text-sm">
                          {milestone.quarter}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-premium-white mb-2">{milestone.title}</h3>
                      <p className="text-light-gray text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 top-6 w-6 h-6 rounded-full bg-dark-gray border-4 border-premium-black transform -translate-x-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-dark-gray/50 to-premium-black rounded-3xl p-12 border border-dark-gray/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-6">Join the ZenWallet Community</h2>
            <p className="text-light-gray text-lg mb-8 max-w-2xl mx-auto">
              Be part of the future of decentralized finance. Connect with us, stay updated, and help shape the evolution of ZenWallet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog" className="bg-dark-gray/50 hover:bg-dark-gray text-premium-white px-6 py-3 rounded-full transition-colors border border-dark-gray/50">
                Read Our Blog
              </Link>
              <Link href="/careers" className="bg-dark-gray/50 hover:bg-dark-gray text-premium-white px-6 py-3 rounded-full transition-colors border border-dark-gray/50">
                Join Our Team
              </Link>
              <Link href="/contact" className="bg-dark-gray/50 hover:bg-dark-gray text-premium-white px-6 py-3 rounded-full transition-colors border border-dark-gray/50">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 