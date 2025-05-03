"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Decentralized Finance: Trends to Watch in 2024",
    excerpt: "Explore the emerging trends in DeFi that are set to reshape the financial landscape in the coming year.",
    category: "DeFi",
    author: "Alex Johnson",
    date: "March 10, 2024",
    readTime: "8 min read",
    image: "/images/blog/defi-trends.jpg",
    featured: true
  },
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
    id: 3,
    title: "How to Secure Your Crypto Assets: Best Practices",
    excerpt: "Essential security measures every crypto holder should implement to protect their digital assets.",
    category: "Security",
    author: "Michael Rivera",
    date: "February 28, 2024",
    readTime: "5 min read",
    image: "/images/blog/crypto-security.jpg"
  },
  {
    id: 4,
    title: "The Evolution of NFTs: Beyond Digital Art",
    excerpt: "Exploring the expanding use cases of NFTs in gaming, real estate, identity verification, and more.",
    category: "NFTs",
    author: "Emma Wilson",
    date: "February 20, 2024",
    readTime: "7 min read",
    image: "/images/blog/nft-evolution.jpg"
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
    id: 6,
    title: "Regulatory Developments in Crypto: Global Perspectives",
    excerpt: "A comprehensive overview of how different countries are approaching cryptocurrency regulation.",
    category: "Regulation",
    author: "Sarah Martinez",
    date: "February 8, 2024",
    readTime: "10 min read",
    image: "/images/blog/crypto-regulation.jpg"
  }
];

// Blog categories
const categories = [
  { name: "All", count: 24 },
  { name: "DeFi", count: 8 },
  { name: "Technology", count: 12 },
  { name: "Security", count: 6 },
  { name: "NFTs", count: 5 },
  { name: "Regulation", count: 4 },
  { name: "Tutorials", count: 7 }
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.filter(post => !post.featured);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-premium-white mb-6">
              ZenWallet Blog
            </h1>
            <p className="text-xl text-light-gray mb-10 max-w-2xl mx-auto">
              Insights, tutorials, and updates from the world of decentralized finance and blockchain technology.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-premium-white transition-colors">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="py-16 bg-premium-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[16/9] relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-premium-white text-lg font-medium">Featured Image</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-dark-gray/80 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-premium-white text-sm font-medium">Featured</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-light-gray text-sm flex items-center">
                    <FaCalendarAlt className="mr-1" size={12} />
                    {featuredPost.date}
                  </span>
                  <span className="text-light-gray text-sm flex items-center">
                    <FaUser className="mr-1" size={12} />
                    {featuredPost.author}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-light-gray text-lg mb-6">
                  {featuredPost.excerpt}
                </p>
                <Link href={`/blog/${featuredPost.id}`} className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                  <span>Read Article</span>
                  <FaArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Section */}
      <section className="py-16 bg-off-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-premium-white mb-6">Recent Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="bg-premium-black/50 rounded-2xl overflow-hidden border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10 group">
                      <div className="aspect-[16/9] relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-premium-white text-lg font-medium">Article Image</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="bg-dark-gray/80 text-premium-white text-xs px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-light-gray text-xs">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-premium-white mb-3 group-hover:text-premium-white transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-light-gray text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-dark-gray flex items-center justify-center">
                              <span className="text-premium-white text-xs">{post.author.charAt(0)}</span>
                            </div>
                            <span className="text-light-gray text-sm">{post.author}</span>
                          </div>
                          <Link href={`/blog/${post.id}`} className="text-premium-white text-sm font-medium hover:underline flex items-center">
                            Read more
                            <FaArrowRight size={12} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <button className="w-10 h-10 rounded-full bg-dark-gray flex items-center justify-center text-premium-white border border-medium-gray/30 hover:bg-medium-gray transition-colors">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-full bg-premium-black flex items-center justify-center text-light-gray border border-dark-gray/30 hover:bg-dark-gray hover:text-premium-white transition-colors">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-full bg-premium-black flex items-center justify-center text-light-gray border border-dark-gray/30 hover:bg-dark-gray hover:text-premium-white transition-colors">
                      3
                    </button>
                    <button className="w-10 h-10 rounded-full bg-premium-black flex items-center justify-center text-light-gray border border-dark-gray/30 hover:bg-dark-gray hover:text-premium-white transition-colors">
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Categories */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 mb-8">
                <h3 className="text-xl font-bold text-premium-white mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setActiveCategory(category.name)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${activeCategory === category.name
                          ? 'bg-dark-gray text-premium-white'
                          : 'text-light-gray hover:bg-dark-gray/50 hover:text-premium-white'
                          }`}
                      >
                        <span className="flex items-center">
                          <FaTag className="mr-2" size={12} />
                          {category.name}
                        </span>
                        <span className="bg-premium-black/50 px-2 py-1 rounded-full text-xs">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-dark-gray/50 to-premium-black rounded-2xl p-6 border border-dark-gray/30">
                <h3 className="text-xl font-bold text-premium-white mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-light-gray text-sm mb-4">
                  Stay updated with the latest insights and news in the blockchain world.
                </p>
                <form onSubmit={handleSubscribe}>
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full py-3 px-4 rounded-lg bg-premium-black border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white py-3 rounded-lg text-sm font-medium transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50"
                  >
                    Subscribe
                  </button>
                </form>
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