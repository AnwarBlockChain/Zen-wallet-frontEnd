"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaCalendarAlt, FaUser, FaTag, FaClock, FaFacebook, FaTwitter, FaLinkedin, FaLink, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Sample blog post data (this would typically come from a CMS or API)
const blogPost = {
  id: 1,
  title: "The Future of Decentralized Finance: Trends to Watch in 2024",
  excerpt: "Explore the emerging trends in DeFi that are set to reshape the financial landscape in the coming year.",
  content: `
    <p class="mb-6">Decentralized Finance (DeFi) has evolved significantly since its inception, transforming from a niche concept into a robust ecosystem with billions in total value locked (TVL). As we move through 2024, several key trends are emerging that could further revolutionize the space.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">1. Cross-Chain Interoperability</h2>
    <p class="mb-6">One of the most significant developments in DeFi is the push toward seamless cross-chain interoperability. Projects like Polkadot, Cosmos, and newer solutions are creating bridges that allow assets and data to flow freely between different blockchain networks. This interoperability is crucial for scaling DeFi and creating a more connected ecosystem.</p>
    <p class="mb-6">The ability to transfer assets across chains without centralized intermediaries reduces friction and opens up new possibilities for composability between protocols on different networks. We're seeing increased adoption of cross-chain DEXes and lending platforms that leverage this interoperability to provide users with more options and better rates.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">2. Real-World Asset Tokenization</h2>
    <p class="mb-6">The tokenization of real-world assets (RWAs) is gaining significant traction in 2024. This trend involves bringing traditional assets like real estate, commodities, and securities onto the blockchain, making them accessible through DeFi protocols.</p>
    <p class="mb-6">RWA tokenization offers several advantages, including increased liquidity for traditionally illiquid assets, fractional ownership, and 24/7 trading. Projects like Centrifuge, Maple Finance, and Goldfinch are leading the way in bringing real-world assets on-chain, creating new opportunities for yield generation and investment diversification.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">3. Institutional DeFi Adoption</h2>
    <p class="mb-6">As regulatory clarity improves and DeFi infrastructure matures, we're witnessing increased institutional interest and participation in the space. Financial institutions are exploring ways to leverage DeFi for more efficient settlement, lending, and trading operations.</p>
    <p class="mb-6">This institutional adoption is driving the development of permissioned DeFi solutions that comply with regulatory requirements while still leveraging the efficiency and transparency of blockchain technology. The convergence of traditional finance and DeFi, sometimes called "TradFi meets DeFi," is creating new hybrid models that could accelerate mainstream adoption.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">4. Layer 2 Scaling Solutions</h2>
    <p class="mb-6">Ethereum's Layer 2 scaling solutions have matured significantly, with optimistic rollups and zero-knowledge rollups providing much-needed scalability improvements. These solutions are enabling faster and cheaper transactions while maintaining security by leveraging Ethereum's base layer.</p>
    <p class="mb-6">Projects built on Layer 2 networks like Arbitrum, Optimism, and zkSync are seeing substantial growth in users and TVL. As these scaling solutions continue to improve, we can expect more DeFi activity to migrate to Layer 2, reducing congestion on the Ethereum mainnet and making DeFi more accessible to users with smaller portfolios.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">5. Decentralized Identity and Privacy Solutions</h2>
    <p class="mb-6">As DeFi grows, so does the need for robust identity and privacy solutions. Zero-knowledge proofs and other privacy-preserving technologies are being integrated into DeFi protocols to enable compliance without compromising user privacy.</p>
    <p class="mb-6">Decentralized identity solutions are also emerging that allow users to verify their identity or credentials without revealing sensitive information. These developments are crucial for bridging the gap between the pseudonymous nature of blockchain and the compliance requirements of traditional finance.</p>
    
    <h2 class="text-2xl font-bold text-premium-white mb-4 mt-8">Conclusion</h2>
    <p class="mb-6">The DeFi landscape continues to evolve at a rapid pace, with innovations addressing key challenges around scalability, interoperability, and real-world integration. As these trends develop throughout 2024, we can expect to see DeFi becoming more accessible, efficient, and integrated with traditional financial systems.</p>
    <p class="mb-6">For users and investors in the space, staying informed about these developments is crucial for navigating the opportunities and risks in this dynamic ecosystem. The future of finance is increasingly decentralized, and the trends we're seeing now are laying the groundwork for that transformation.</p>
  `,
  category: "DeFi",
  author: {
    name: "Alex Johnson",
    bio: "Alex is a DeFi researcher and analyst with over 5 years of experience in the blockchain industry. He specializes in emerging financial technologies and their impact on traditional markets.",
    avatar: "/images/blog/authors/alex-johnson.jpg"
  },
  date: "March 10, 2024",
  readTime: "8 min read",
  image: "/images/blog/defi-trends.jpg",
  tags: ["DeFi", "Blockchain", "Finance", "Crypto", "Trends"]
};

// Related posts
const relatedPosts = [
  {
    id: 2,
    title: "Understanding Zero-Knowledge Proofs: A Beginner's Guide",
    excerpt: "A comprehensive introduction to zero-knowledge proofs and their applications in blockchain technology.",
    category: "Technology",
    author: "Sophia Chen",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "/images/blog/zkp-guide.jpg"
  },
  {
    id: 5,
    title: "Layer 2 Solutions: Scaling Blockchain for Mass Adoption",
    excerpt: "An in-depth look at how Layer 2 solutions are addressing blockchain scalability challenges.",
    category: "Technology",
    author: "David Kim",
    date: "February 15, 2024",
    readTime: "9 min read",
    image: "/images/blog/layer2-scaling.jpg"
  },
  {
    id: 3,
    title: "How to Secure Your Crypto Assets: Best Practices",
    excerpt: "Essential security measures every crypto holder should implement to protect their digital assets.",
    category: "Security",
    author: "Michael Rivera",
    date: "February 28, 2024",
    readTime: "5 min read",
    image: "/images/blog/crypto-security.jpg"
  }
];

export default function BlogPost() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Article Header */}
      <section className="relative py-16 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-light-gray hover:text-premium-white mb-6 transition-colors">
              <FaArrowLeft className="mr-2" size={14} />
              <span>Back to Blog</span>
            </Link>

            <div className="flex flex-wrap items-center space-x-4 mb-4">
              <span className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full">
                {blogPost.category}
              </span>
              <span className="text-light-gray text-sm flex items-center">
                <FaCalendarAlt className="mr-1" size={12} />
                {blogPost.date}
              </span>
              <span className="text-light-gray text-sm flex items-center">
                <FaClock className="mr-1" size={12} />
                {blogPost.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-white mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <p className="text-xl text-light-gray mb-8">
              {blogPost.excerpt}
            </p>

            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-dark-gray flex items-center justify-center">
                <span className="text-premium-white text-lg font-medium">{blogPost.author.name.charAt(0)}</span>
              </div>
              <div>
                <div className="text-premium-white font-medium">{blogPost.author.name}</div>
                <div className="text-light-gray text-sm">Author</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="w-full bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-premium-white text-2xl font-medium">Featured Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-12 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <article className="prose prose-invert prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
              </article>

              {/* Tags */}
              <div className="mt-12 mb-8">
                <div className="text-premium-white font-medium mb-3">Tags:</div>
                <div className="flex flex-wrap gap-2">
                  {blogPost.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${tag}`}
                      className="bg-dark-gray/50 hover:bg-dark-gray text-light-gray hover:text-premium-white px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="border-t border-dark-gray/30 pt-8 mb-12">
                <div className="text-premium-white font-medium mb-4">Share this article:</div>
                <div className="flex space-x-3">
                  <button className="w-10 h-10 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                    <FaTwitter size={16} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                    <FaFacebook size={16} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors">
                    <FaLinkedin size={16} />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-dark-gray/50 hover:bg-dark-gray flex items-center justify-center text-light-gray hover:text-premium-white transition-colors relative"
                    onClick={copyToClipboard}
                  >
                    <FaLink size={16} />
                    {copied && (
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-dark-gray px-2 py-1 rounded text-xs text-premium-white whitespace-nowrap">
                        Copied!
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-dark-gray/20 rounded-2xl p-6 border border-dark-gray/30 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-dark-gray flex-shrink-0 flex items-center justify-center">
                    <span className="text-premium-white text-2xl font-medium">{blogPost.author.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-premium-white mb-2">About {blogPost.author.name}</h3>
                    <p className="text-light-gray text-sm">{blogPost.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Post Navigation */}
              <div className="flex flex-col sm:flex-row justify-between border-t border-dark-gray/30 pt-8 mb-12">
                <Link href="/blog/previous-post" className="flex items-center text-light-gray hover:text-premium-white mb-4 sm:mb-0 transition-colors">
                  <FaArrowLeft className="mr-2" size={14} />
                  <span>Previous Article</span>
                </Link>
                <Link href="/blog/next-post" className="flex items-center text-light-gray hover:text-premium-white transition-colors">
                  <span>Next Article</span>
                  <FaArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Author Card */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-dark-gray flex items-center justify-center">
                    <span className="text-premium-white text-2xl font-medium">{blogPost.author.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-premium-white font-bold text-lg">{blogPost.author.name}</div>
                    <div className="text-light-gray text-sm">Author</div>
                  </div>
                </div>
                <p className="text-light-gray text-sm mb-4">{blogPost.author.bio}</p>
                <Link href={`/blog/author/${blogPost.author.name.toLowerCase().replace(' ', '-')}`} className="inline-block text-premium-white text-sm font-medium hover:underline">
                  View all posts
                </Link>
              </div>

              {/* Related Posts */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30">
                <h3 className="text-xl font-bold text-premium-white mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map((post) => (
                    <div key={post.id} className="flex space-x-4 group">
                      <div className="w-20 h-20 rounded-lg bg-dark-gray/50 flex-shrink-0 flex items-center justify-center">
                        <span className="text-premium-white text-xs">Image</span>
                      </div>
                      <div>
                        <span className="text-light-gray text-xs">{post.category}</span>
                        <h4 className="text-premium-white text-sm font-medium group-hover:text-premium-white transition-colors line-clamp-2 mb-1">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        <span className="text-light-gray text-xs">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 