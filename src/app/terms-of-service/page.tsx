"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-premium-black relative">



      {/* Spacer div to account for navbar */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      {/* Header */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-off-black to-premium-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-premium-white mb-6">
              Terms of Service
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
                Welcome to ZenWallet. These Terms of Service ("Terms") govern your access to and use of the ZenWallet website, mobile application, and related services (collectively, the "Services") provided by ZenWallet Inc. ("ZenWallet," "we," "us," or "our").
              </p>

              <p>
                Please read these Terms carefully before using our Services. By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
              </p>

              <div className="p-6 bg-dark-gray/20 rounded-2xl border border-dark-gray/30 my-8">
                <h3 className="text-xl font-bold text-premium-white mb-4">Important Notice</h3>
                <p className="text-light-gray mb-0">
                  These Terms contain important information about your legal rights, remedies, and obligations. By using our Services, you agree to these Terms, including the provisions that limit our liability to you and require individual arbitration for any potential legal dispute.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">1. Eligibility</h2>
              <p>
                To use our Services, you must be at least 18 years old and have the legal capacity to enter into these Terms. By using our Services, you represent and warrant that you meet these requirements and that you are not prohibited from using the Services under applicable laws.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">2. ZenWallet Account</h2>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">2.1 Account Creation</h3>
              <p>
                To use certain features of our Services, you may need to create a ZenWallet account. When you create an account, you agree to provide accurate, current, and complete information and to update this information to keep it accurate, current, and complete.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">2.2 Account Security</h3>
              <p>
                You are responsible for safeguarding your account credentials, including your password and recovery phrase (seed phrase). You agree not to disclose your password or recovery phrase to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
              </p>
              <p>
                ZenWallet cannot and will not be liable for any loss or damage arising from your failure to maintain the security of your account, including the loss of your private keys or recovery phrase. ZenWallet does not store your private keys or recovery phrase and cannot recover them for you if lost.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">3. Non-Custodial Wallet</h2>
              <p>
                ZenWallet is a non-custodial wallet, which means:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>We do not have access to or control over your private keys, recovery phrase, or digital assets.</li>
                <li>We cannot initiate transactions on your behalf without your explicit authorization.</li>
                <li>We cannot recover or reset your private keys or recovery phrase if lost.</li>
                <li>You have full control and responsibility for your digital assets.</li>
              </ul>
              <p>
                You acknowledge and agree that you are solely responsible for maintaining the security of your private keys and recovery phrase. We strongly recommend that you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Store your recovery phrase in a secure location.</li>
                <li>Never share your private keys or recovery phrase with anyone.</li>
                <li>Use strong, unique passwords for your ZenWallet account.</li>
                <li>Enable additional security features, such as biometric authentication and two-factor authentication, when available.</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">4. Digital Assets and Transactions</h2>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">4.1 Digital Assets</h3>
              <p>
                ZenWallet supports various digital assets, including cryptocurrencies and tokens. You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Digital assets are not legal tender and are not backed by any government.</li>
                <li>Digital asset transactions may be irreversible, and losses due to fraudulent or accidental transactions may not be recoverable.</li>
                <li>The value of digital assets can be volatile and may fluctuate significantly.</li>
                <li>You are solely responsible for determining what, if any, taxes apply to your digital asset transactions.</li>
              </ul>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">4.2 Transactions</h3>
              <p>
                When you use our Services to send, receive, or exchange digital assets, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>ZenWallet does not guarantee the execution or settlement of any transaction.</li>
                <li>Blockchain transactions are subject to network fees (gas fees) that are determined by the respective blockchain networks and may vary based on network congestion.</li>
                <li>Transaction times are determined by the respective blockchain networks and may vary based on network congestion.</li>
                <li>Once submitted to a blockchain network, transactions cannot be canceled or reversed by ZenWallet.</li>
                <li>You are responsible for providing the correct recipient address for any transaction.</li>
              </ul>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">4.3 Third-Party Services</h3>
              <p>
                Our Services may integrate with or provide access to third-party services, such as decentralized exchanges, lending protocols, or other DeFi applications. You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>ZenWallet is not responsible for the operation, policies, or practices of any third-party service.</li>
                <li>Your use of third-party services is subject to the terms and conditions of those services.</li>
                <li>ZenWallet does not guarantee the availability, reliability, or security of any third-party service.</li>
                <li>ZenWallet is not liable for any loss or damage arising from your use of third-party services.</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">5. Prohibited Activities</h2>
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Violating any applicable law, regulation, or these Terms.</li>
                <li>Using our Services for any illegal purpose, including money laundering, terrorist financing, or fraud.</li>
                <li>Attempting to circumvent any security measures or limitations of our Services.</li>
                <li>Attempting to gain unauthorized access to other users' accounts or private information.</li>
                <li>Interfering with or disrupting the operation of our Services or the servers or networks that host our Services.</li>
                <li>Using our Services to transmit any viruses, malware, or other malicious code.</li>
                <li>Engaging in any activity that could damage, disable, overburden, or impair our Services.</li>
                <li>Using automated means, including bots, scripts, or scrapers, to access or collect data from our Services without our prior written consent.</li>
                <li>Reverse engineering, decompiling, or disassembling any software or technology used in our Services.</li>
                <li>Removing, circumventing, disabling, or otherwise interfering with security-related features of our Services.</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">6. Intellectual Property</h2>
              <p>
                Our Services and all content, features, and functionality thereof, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the design, selection, and arrangement thereof, are owned by ZenWallet, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p>
                These Terms do not grant you any right, title, or interest in or to our Services or any content, features, or functionality thereof. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
                <li>You may print or download one copy of a reasonable number of pages of our Services for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
              </ul>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">7. Disclaimer of Warranties</h2>
              <p>
                YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
              </p>
              <p>
                ZENWALLET, ITS SUBSIDIARIES, AFFILIATES, AND LICENSORS DO NOT WARRANT THAT:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>OUR SERVICES WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION;</li>
                <li>ANY ERRORS OR DEFECTS WILL BE CORRECTED;</li>
                <li>OUR SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR</li>
                <li>THE RESULTS OF USING OUR SERVICES WILL MEET YOUR REQUIREMENTS.</li>
              </ul>
              <p>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">8. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ZENWALLET, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, THAT RESULT FROM THE USE OF, OR INABILITY TO USE, OUR SERVICES.
              </p>
              <p>
                UNDER NO CIRCUMSTANCES WILL ZENWALLET BE RESPONSIBLE FOR ANY DAMAGE, LOSS, OR INJURY RESULTING FROM HACKING, TAMPERING, OR OTHER UNAUTHORIZED ACCESS OR USE OF OUR SERVICES OR YOUR ACCOUNT OR THE INFORMATION CONTAINED THEREIN.
              </p>
              <p>
                ZENWALLET ASSUMES NO LIABILITY OR RESPONSIBILITY FOR:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-light-gray">
                <li>ANY ERRORS, MISTAKES, OR INACCURACIES OF CONTENT;</li>
                <li>PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO OR USE OF OUR SERVICES;</li>
                <li>ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION STORED THEREIN;</li>
                <li>ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM OUR SERVICES;</li>
                <li>ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE THAT MAY BE TRANSMITTED TO OR THROUGH OUR SERVICES BY ANY THIRD PARTY;</li>
                <li>ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, EMAILED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE THROUGH OUR SERVICES; AND/OR</li>
                <li>THE DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY THIRD PARTY.</li>
              </ul>
              <p>
                IN NO EVENT SHALL ZENWALLET, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE TO YOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES, OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO ZENWALLET HEREUNDER OR $100.00, WHICHEVER IS GREATER.
              </p>
              <p>
                THIS LIMITATION OF LIABILITY SECTION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF ZENWALLET HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
              <p>
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">9. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless ZenWallet, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our Services, including, but not limited to, any use of our Services' content, services, and products other than as expressly authorized in these Terms or your use of any information obtained from our Services.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">10. Dispute Resolution</h2>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">10.1 Governing Law</h3>
              <p>
                These Terms and your use of our Services shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any choice or conflict of law provision or rule.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">10.2 Arbitration</h3>
              <p>
                Any dispute, controversy, or claim arising out of or relating to these Terms or your use of our Services shall be settled by binding arbitration in accordance with the commercial arbitration rules of the American Arbitration Association. The arbitration shall be conducted in San Francisco, California, and judgment on the arbitration award may be entered in any court having jurisdiction thereof.
              </p>
              <p>
                You agree that any arbitration shall be conducted on an individual basis and not in a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, you waive any right to a jury trial.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">10.3 Exceptions</h3>
              <p>
                Notwithstanding the foregoing, ZenWallet may seek injunctive or other equitable relief to protect its intellectual property rights or to prevent irreparable harm in any court of competent jurisdiction.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">11. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Terms on this page and updating the "Last Updated" date. Your continued use of our Services after any such changes constitutes your acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">12. Termination</h2>
              <p>
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use our Services will immediately cease. If you wish to terminate your account, you may simply discontinue using our Services or delete your account through the settings in our application.
              </p>
              <p>
                All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">13. Miscellaneous</h2>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">13.1 Entire Agreement</h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and ZenWallet regarding our Services and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning our Services.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">13.2 Waiver</h3>
              <p>
                No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and ZenWallet's failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">13.3 Severability</h3>
              <p>
                If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of these Terms will continue in full force and effect.
              </p>

              <h3 className="text-xl font-bold text-premium-white mt-8 mb-3">13.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms, by operation of law or otherwise, without ZenWallet's prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and void. ZenWallet may freely assign or transfer these Terms without restriction.
              </p>

              <h2 className="text-2xl font-bold text-premium-white mt-10 mb-4">14. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-light-gray">
                Email: legal@zenwallet.com<br />
                Address: 123 Blockchain Street, Suite 456, San Francisco, CA 94105, USA
              </p>

              <div className="mt-12 p-6 bg-dark-gray/20 rounded-2xl border border-dark-gray/30">
                <h3 className="text-xl font-bold text-premium-white mb-4">Summary of Key Points</h3>
                <ul className="list-disc pl-6 space-y-2 text-light-gray">
                  <li>ZenWallet is a non-custodial wallet, meaning you have full control and responsibility for your digital assets.</li>
                  <li>You are responsible for maintaining the security of your account, including your private keys and recovery phrase.</li>
                  <li>Digital asset transactions may be irreversible, and ZenWallet cannot cancel or reverse transactions once submitted to a blockchain network.</li>
                  <li>ZenWallet is not responsible for the operation, policies, or practices of third-party services integrated with our Services.</li>
                  <li>Our Services are provided "as is" and "as available" without warranties of any kind.</li>
                  <li>Disputes will be resolved through binding arbitration on an individual basis.</li>
                  <li>We may update these Terms from time to time, and your continued use of our Services constitutes acceptance of the updated Terms.</li>
                </ul>
              </div>

              <div className="mt-12 text-center">
                <Link href="/privacy-policy" className="text-premium-white hover:underline">
                  View our Privacy Policy
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