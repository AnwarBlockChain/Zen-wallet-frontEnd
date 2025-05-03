"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-light-gray">
              Last Updated: June 15, 2024
            </p>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-dark-gray blur-3xl"></div>
          <div className="absolute bottom-40 right-40 w-80 h-80 rounded-full bg-dark-gray blur-3xl"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              <p>
                At ZenWallet, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile application, and related services (collectively, the "Services").
              </p>

              <p>
                Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">1.1 Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Create an account or profile</li>
                <li>Apply for a job position</li>
                <li>Contact our support team</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys, contests, or promotions</li>
                <li>Interact with our social media accounts</li>
              </ul>
              <p>
                This information may include your name, email address, phone number, postal address, professional information, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">1.2 Wallet Information</h3>
              <p>
                ZenWallet is a non-custodial wallet, which means we never have access to your private keys, seed phrases, or full control over your digital assets. However, we may collect and store public blockchain addresses and transaction history that is already publicly available on the blockchain.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">1.3 Automatically Collected Information</h3>
              <p>
                When you use our Services, we may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>IP address and location information</li>
                <li>Device information (type, model, operating system)</li>
                <li>Browser type and version</li>
                <li>Usage data and interaction with our Services</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">2. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Providing, maintaining, and improving our Services</li>
                <li>Processing job applications</li>
                <li>Communicating with you about updates, security alerts, and support</li>
                <li>Sending newsletters and marketing communications (with your consent)</li>
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">3. How We Share Your Information</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services on our behalf.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                <li><strong>With Your Consent:</strong> We may share your information with third parties when we have your consent to do so.</li>
              </ul>
              <p>
                We do not sell your personal information to third parties.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              <p>
                We recommend that you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Use strong, unique passwords for your ZenWallet account</li>
                <li>Never share your private keys or seed phrases with anyone, including ZenWallet staff</li>
                <li>Enable two-factor authentication when available</li>
                <li>Regularly update your devices and applications</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">5. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">5.1 California Privacy Rights</h3>
              <p>
                If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA). For more information about these rights and how to exercise them, please contact us.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">5.2 European Economic Area (EEA) Privacy Rights</h3>
              <p>
                If you are located in the EEA, you have rights under the General Data Protection Regulation (GDPR). For more information about these rights and how to exercise them, please contact us.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">6. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your browsing activities and to improve your experience on our Services. You can control cookies through your browser settings and other tools. For more detailed information about our use of cookies, please refer to our Cookie Policy.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">7. Children's Privacy</h2>
              <p>
                Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">9. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">10. Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="text-light-gray">
                Email: privacy@zenwallet.com<br />
                Address: 123 Blockchain Street, Suite 456, San Francisco, CA 94105, USA
              </p>

              <div className="mt-12 p-6 bg-dark-gray/20 rounded-2xl border border-dark-gray/30">
                <h3 className="text-xl font-bold text-premium-white mb-4">Summary of Key Points</h3>
                <ul className="list-disc pl-6 space-y-2 text-light-gray">
                  <li>ZenWallet is a non-custodial wallet and does not have access to your private keys or seed phrases.</li>
                  <li>We collect personal information that you voluntarily provide and automatically collected information about your device and usage.</li>
                  <li>We use your information to provide and improve our Services, process job applications, and communicate with you.</li>
                  <li>We do not sell your personal information to third parties.</li>
                  <li>You have rights regarding your personal information, including access, rectification, and deletion.</li>
                  <li>We implement security measures to protect your information, but no method is 100% secure.</li>
                  <li>We may update this Privacy Policy, and we will notify you of material changes.</li>
                </ul>
              </div>

              <div className="mt-12 text-center">
                <Link href="/terms-of-service" className="text-premium-white hover:underline">
                  View our Terms of Service
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