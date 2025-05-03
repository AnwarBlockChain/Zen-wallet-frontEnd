"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaBriefcase, FaClock, FaCheckCircle } from 'react-icons/fa';

// Import job data from the main careers page
// In a real application, this would be fetched from an API or database
import { jobOpenings } from '../data';

export default function JobPostingPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
    agreeToTerms: false
  });

  useEffect(() => {
    // Find the job posting that matches the ID from the URL
    const foundJob = jobOpenings.find(job => job.id === jobId);
    setJob(foundJob);
  }, [jobId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Application submitted successfully!');

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        portfolio: '',
        coverLetter: '',
        resume: null,
        agreeToTerms: false
      });
    }, 1500);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-premium-black relative">
        {/* Spacer div to account for navbar */}
        <div className="h-24 md:h-28 lg:h-32"></div>

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-premium-white mb-6">Job Not Found</h1>
          <p className="text-light-gray text-lg mb-8">The job posting you're looking for doesn't exist or has been removed.</p>
          <Link href="/careers" className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
            <FaArrowLeft size={14} className="mr-2" />
            <span>Back to Careers</span>
          </Link>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Job Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <Link href="/careers" className="inline-flex items-center text-light-gray hover:text-premium-white mb-8 transition-colors">
            <FaArrowLeft className="mr-2" size={14} />
            <span>Back to All Positions</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
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

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-white mb-6">
              {job.title}
            </h1>

            <p className="text-xl text-light-gray mb-8">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#apply-now" className="inline-flex items-center space-x-2 bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray px-6 py-3 rounded-full text-premium-white transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50">
                <span>Apply Now</span>
                <FaArrowRight size={14} />
              </a>
              <Link href="/careers" className="inline-flex items-center space-x-2 bg-premium-black/50 hover:bg-dark-gray/50 px-6 py-3 rounded-full text-premium-white transition-all border border-dark-gray/30 hover:border-medium-gray/50">
                <span>View Other Positions</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Job Details */}
      <section className="py-16 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Job Overview */}
              <div className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 mb-8">
                <h2 className="text-2xl font-bold text-premium-white mb-6">Job Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-dark-gray/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaMapMarkerAlt className="text-premium-white" />
                    </div>
                    <div>
                      <h3 className="text-premium-white font-medium mb-1">Location</h3>
                      <p className="text-light-gray text-sm">{job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-dark-gray/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaBriefcase className="text-premium-white" />
                    </div>
                    <div>
                      <h3 className="text-premium-white font-medium mb-1">Department</h3>
                      <p className="text-light-gray text-sm">{job.department}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-dark-gray/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <FaClock className="text-premium-white" />
                    </div>
                    <div>
                      <h3 className="text-premium-white font-medium mb-1">Employment Type</h3>
                      <p className="text-light-gray text-sm">{job.type}</p>
                    </div>
                  </div>
                </div>

                <p className="text-light-gray">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 mb-8">
                <h2 className="text-2xl font-bold text-premium-white mb-6">Key Responsibilities</h2>
                <ul className="space-y-4">
                  {job.responsibilities.map((responsibility: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                      <span className="text-light-gray">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30 mb-8">
                <h2 className="text-2xl font-bold text-premium-white mb-6">Requirements</h2>
                <ul className="space-y-4">
                  {job.requirements.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                      <span className="text-light-gray">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Form */}
              <div id="apply-now" className="bg-premium-black/50 rounded-2xl p-8 border border-dark-gray/30">
                <h2 className="text-2xl font-bold text-premium-white mb-6">Apply for this Position</h2>
                <p className="text-light-gray mb-8">
                  Please fill out the form below to apply for the {job.title} position. We'll review your application and get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-premium-white mb-2">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-premium-white mb-2">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                        placeholder="Your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-premium-white mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="linkedIn" className="block text-premium-white mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        id="linkedIn"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleInputChange}
                        className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-premium-white mb-2">Portfolio/Website</label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-premium-white mb-2">Cover Letter *</label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 placeholder-light-gray/70"
                      placeholder="Tell us why you're interested in this position and what you can bring to the team"
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-premium-white mb-2">Resume/CV (PDF) *</label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        accept=".pdf"
                        className="w-full py-3 px-4 rounded-lg bg-dark-gray border border-medium-gray/30 text-premium-white focus:outline-none focus:ring-2 focus:ring-medium-gray/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-medium-gray/30 file:text-premium-white hover:file:bg-medium-gray/50"
                      />
                    </div>
                    <p className="text-light-gray/70 text-sm mt-1">Please upload your resume in PDF format (max 5MB)</p>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleCheckboxChange}
                      required
                      className="mt-1 mr-3"
                    />
                    <label htmlFor="agreeToTerms" className="text-light-gray text-sm">
                      I consent to ZenWallet storing and processing my personal data for the purpose of this job application. I understand that my data will be handled in accordance with the <Link href="/privacy-policy" className="text-premium-white hover:underline">Privacy Policy</Link> and I agree to the <Link href="/terms-of-service" className="text-premium-white hover:underline">Terms of Service</Link>.
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto bg-gradient-to-r from-dark-gray to-medium-gray hover:from-medium-gray hover:to-dark-gray text-premium-white py-3 px-8 rounded-lg text-sm font-medium transition-all shadow-premium hover:shadow-lg hover:shadow-medium-gray/20 border border-medium-gray/50 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3">
              {/* Company Info */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 mb-8">
                <h3 className="text-xl font-bold text-premium-white mb-4">About ZenWallet</h3>
                <p className="text-light-gray text-sm mb-4">
                  ZenWallet is building the world's most elegant decentralized wallet experience, empowering users to navigate the future of finance with confidence and ease.
                </p>
                <p className="text-light-gray text-sm mb-4">
                  Our team combines deep expertise in blockchain technology, security, design, and financial services to create products that are both powerful and accessible.
                </p>
                <Link href="/about" className="text-premium-white text-sm font-medium hover:underline flex items-center">
                  Learn more about us
                  <FaArrowRight size={12} className="ml-2" />
                </Link>
              </div>

              {/* Benefits */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30 mb-8">
                <h3 className="text-xl font-bold text-premium-white mb-4">Benefits & Perks</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Competitive salary and equity</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Remote-first culture with flexible hours</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Comprehensive health insurance</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Learning and development stipend</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Regular team retreats</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-medium-gray mr-3 mt-1 flex-shrink-0" />
                    <span className="text-light-gray text-sm">Home office setup allowance</span>
                  </li>
                </ul>
                <Link href="/careers#benefits" className="text-premium-white text-sm font-medium hover:underline flex items-center mt-4">
                  View all benefits
                  <FaArrowRight size={12} className="ml-2" />
                </Link>
              </div>

              {/* Other Positions */}
              <div className="bg-premium-black/50 rounded-2xl p-6 border border-dark-gray/30">
                <h3 className="text-xl font-bold text-premium-white mb-4">Other Open Positions</h3>
                <div className="space-y-4">
                  {jobOpenings
                    .filter(otherJob => otherJob.id !== job.id)
                    .slice(0, 3)
                    .map((otherJob, index) => (
                      <Link
                        key={index}
                        href={`/careers/${otherJob.id}`}
                        className="block bg-dark-gray/30 hover:bg-dark-gray/50 rounded-xl p-4 transition-colors"
                      >
                        <h4 className="text-premium-white font-medium mb-1">{otherJob.title}</h4>
                        <div className="flex items-center text-light-gray text-xs">
                          <span className="mr-3">{otherJob.department}</span>
                          <span>{otherJob.location}</span>
                        </div>
                      </Link>
                    ))
                  }
                </div>
                <Link href="/careers#open-positions" className="text-premium-white text-sm font-medium hover:underline flex items-center mt-6">
                  View all positions
                  <FaArrowRight size={12} className="ml-2" />
                </Link>
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