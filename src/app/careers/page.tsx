"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaArrowRight, FaLaptopCode, FaShieldAlt, FaChartLine, FaPalette, FaGlobe, FaUserFriends } from 'react-icons/fa';

// Import data from the data file
import { jobOpenings, benefits, cultureValues } from './data';

// Map icon strings to actual icon components
const iconMap = {
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
  FaLaptopCode,
  FaPalette,
  FaUserFriends
};

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter job openings based on selected department and search query
  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  // Get unique departments for filter
  const departments = ["All", ...new Set(jobOpenings.map(job => job.department))];

  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-premium-white mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-light-gray mb-10 max-w-3xl mx-auto">
              Help us build the future of decentralized finance with elegant, secure, and accessible products that empower users worldwide.
            </p>
            <Link href="#open-positions" className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
              <span>View Open Positions</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-premium-white text-lg font-medium">Team Collaboration</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square rounded-2xl overflow-hidden border-4 border-premium-black">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-gray to-premium-black opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-premium-white text-sm font-medium">Team Event</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-6">Our Culture</h2>
              <p className="text-light-gray text-lg mb-6">
                At ZenWallet, we're building a global team of passionate individuals who are excited about creating the future of decentralized finance. Our remote-first culture emphasizes autonomy, collaboration, and impact.
              </p>
              <p className="text-light-gray text-lg mb-6">
                We believe that the best products are built by diverse teams with different perspectives and backgrounds. We value clear communication, thoughtful feedback, and a commitment to continuous improvement.
              </p>
              <p className="text-light-gray text-lg">
                As a ZenWallet team member, you'll have the opportunity to work on challenging problems, learn from talented colleagues, and make a meaningful impact on how people interact with digital assets and decentralized finance.
              </p>
            </div>
          </div>

          {/* Culture Values */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-premium-white mb-4">Our Values</h3>
              <p className="text-light-gray text-lg max-w-2xl mx-auto">
                These core principles guide how we work together and build products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureValues.map((value, index) => (
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
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-off-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Benefits & Perks</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              We offer competitive benefits to support your professional growth, health, and work-life balance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              // Get the icon component from the map using the icon name
              const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];

              return (
                <div key={index} className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10">
                  <div className="w-12 h-12 rounded-full bg-dark-gray/50 flex items-center justify-center mb-6">
                    <IconComponent className="text-premium-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-premium-white mb-3">{benefit.title}</h3>
                  <p className="text-light-gray">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Open Positions</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              Join our team and help build the future of decentralized finance.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div className="flex flex-wrap gap-2">
              {departments.map((department, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedDepartment === department
                    ? 'bg-dark-gray text-premium-white border border-medium-gray/50'
                    : 'bg-premium-black/50 text-light-gray border border-dark-gray/30 hover:bg-dark-gray/50 hover:text-premium-white'
                    }`}
                  onClick={() => setSelectedDepartment(department)}
                >
                  {department}
                </button>
              ))}
            </div>

            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 py-2 px-4 rounded-full bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index} className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 hover:border-medium-gray/50 transition-all hover:shadow-lg hover:shadow-dark-gray/10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-premium-white mb-1">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full">
                          {job.department}
                        </span>
                        <span className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full">
                          {job.location}
                        </span>
                        <span className="bg-dark-gray/80 text-premium-white text-xs px-3 py-1 rounded-full">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-4 py-2 rounded-full text-premium-white text-sm transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50 mt-4 md:mt-0"
                    >
                      <span>View Details</span>
                      <FaArrowRight size={12} />
                    </Link>
                  </div>
                  <p className="text-light-gray mb-4">{job.description}</p>
                  <div className="border-t border-dark-gray/30 pt-4">
                    <h4 className="text-premium-white font-medium mb-2">Key Requirements:</h4>
                    <ul className="list-disc list-inside text-light-gray text-sm space-y-1">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                      {job.requirements.length > 3 && (
                        <li className="list-none text-premium-white text-sm mt-1">
                          <Link href={`/careers/${job.id}`} className="hover:underline">
                            + {job.requirements.length - 3} more requirements
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 text-center">
                <p className="text-light-gray text-lg mb-4">No positions found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedDepartment("All");
                    setSearchQuery("");
                  }}
                  className="text-premium-white hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 bg-off-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-4">Our Application Process</h2>
            <p className="text-light-gray text-lg max-w-2xl mx-auto">
              We've designed a straightforward process to help us find the right candidates while respecting your time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Process Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-dark-gray/50"></div>

              <div className="space-y-12">
                {[
                  {
                    step: 1,
                    title: "Application Review",
                    description: "Submit your application through our careers page. Our team will review your resume and cover letter to assess your qualifications and fit for the role."
                  },
                  {
                    step: 2,
                    title: "Initial Interview",
                    description: "If your application is selected, you'll have an initial interview with the hiring manager to discuss your experience, skills, and interest in the role."
                  },
                  {
                    step: 3,
                    title: "Technical Assessment",
                    description: "Depending on the role, you may be asked to complete a technical assessment or case study to demonstrate your skills and problem-solving abilities."
                  },
                  {
                    step: 4,
                    title: "Team Interviews",
                    description: "Meet with team members and stakeholders to discuss your experience in more depth and get to know the people you'll be working with."
                  },
                  {
                    step: 5,
                    title: "Final Interview",
                    description: "A final interview with senior leadership to discuss your career goals, alignment with our mission, and any remaining questions."
                  },
                  {
                    step: 6,
                    title: "Offer & Onboarding",
                    description: "If selected, you'll receive an offer and begin our comprehensive onboarding process to set you up for success in your new role."
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-8 top-8 w-6 h-6 rounded-full bg-dark-gray border-4 border-premium-black transform -translate-x-1/2"></div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-dark-gray/50 flex items-center justify-center mr-6">
                      <span className="text-premium-white text-xl font-bold">{step.step}</span>
                    </div>
                    <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 flex-grow">
                      <h3 className="text-xl font-bold text-premium-white mb-2">{step.title}</h3>
                      <p className="text-light-gray">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-dark-gray/50 to-premium-black rounded-3xl p-12 border border-dark-gray/30 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-premium-white mb-6">Ready to Join Us?</h2>
            <p className="text-light-gray text-lg mb-8 max-w-2xl mx-auto">
              Explore our open positions and take the first step toward building the future of decentralized finance with ZenWallet.
            </p>
            <Link href="#open-positions" className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
              <span>View Open Positions</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 