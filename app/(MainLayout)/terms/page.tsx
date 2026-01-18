import React from 'react';
import { FileText, Scale, UserX, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <Scale className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Last Updated: January 18, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
                    {/* Introduction */}
                    <section>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Welcome to <span className="font-bold text-[#1D7E87]">Taranga Market</span>. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
                        </p>
                    </section>

                    {/* Acceptance */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                By creating an account, browsing listings, or using any feature of Taranga Market, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                            <p className="leading-relaxed">
                                If you do not agree to these terms, you must not use our services.
                            </p>
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                To use Taranga Market, you must:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Be at least 18 years of age</li>
                                <li>Have the legal capacity to enter into binding contracts</li>
                                <li>Not be prohibited from using our services under Bangladesh law</li>
                                <li>Provide accurate and complete registration information</li>
                                <li>Maintain the security of your account credentials</li>
                            </ul>
                        </div>
                    </section>

                    {/* User Accounts */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                        <div className="text-gray-700 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Registration</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>You must provide accurate, current, and complete information</li>
                                    <li>You are responsible for maintaining the confidentiality of your password</li>
                                    <li>You are responsible for all activities under your account</li>
                                    <li>You must notify us immediately of any unauthorized access</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Termination</h3>
                                <p className="leading-relaxed">
                                    We reserve the right to suspend or terminate your account at any time for violations of these terms, fraudulent activity, or any other reason we deem necessary.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Listings */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">4. Listings and Content</h2>
                        </div>
                        
                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Seller Responsibilities</h3>
                                <p className="leading-relaxed mb-2">When creating listings, you must:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate and truthful descriptions</li>
                                    <li>Use only images you own or have permission to use</li>
                                    <li>Set fair and reasonable prices</li>
                                    <li>Honor all commitments made in your listings</li>
                                    <li>Comply with all applicable laws and regulations</li>
                                    <li>Not list prohibited or illegal items</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Prohibited Items</h3>
                                <p className="leading-relaxed mb-2">You may not list:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Illegal goods, weapons, or controlled substances</li>
                                    <li>Counterfeit or stolen items</li>
                                    <li>Items that infringe on intellectual property rights</li>
                                    <li>Adult content or services</li>
                                    <li>Hazardous materials</li>
                                    <li>Items that violate Bangladesh law</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Ownership</h3>
                                <p className="leading-relaxed">
                                    You retain ownership of content you post. By posting, you grant Taranga Market a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content on our platform.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Transactions */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Transactions and Payments</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                Taranga Market facilitates connections between buyers and sellers but is not a party to transactions. All transactions are between users.
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Buyers and sellers are responsible for completing transactions</li>
                                <li>Payment terms are agreed upon between parties</li>
                                <li>We are not responsible for payment disputes</li>
                                <li>Users must comply with all tax obligations</li>
                                <li>Refunds and returns are subject to seller policies</li>
                            </ul>
                        </div>
                    </section>

                    {/* Prohibited Conduct */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <XCircle className="w-6 h-6 text-red-600" />
                            <h2 className="text-2xl font-bold text-gray-900">6. Prohibited Conduct</h2>
                        </div>
                        
                        <div className="text-gray-700">
                            <p className="leading-relaxed mb-3">You agree not to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Violate any laws or regulations</li>
                                <li>Infringe on intellectual property rights</li>
                                <li>Post false, misleading, or fraudulent content</li>
                                <li>Harass, threaten, or abuse other users</li>
                                <li>Spam or send unsolicited communications</li>
                                <li>Attempt to hack or compromise our systems</li>
                                <li>Use automated tools to scrape data</li>
                                <li>Create multiple accounts to manipulate ratings</li>
                                <li>Engage in price manipulation or bid rigging</li>
                                <li>Interfere with other users' listings or transactions</li>
                            </ul>
                        </div>
                    </section>

                    {/* Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                All content on Taranga Market, including logos, designs, text, graphics, and software, is owned by or licensed to us and protected by copyright, trademark, and other intellectual property laws.
                            </p>
                            <p className="leading-relaxed">
                                You may not copy, modify, distribute, or create derivative works without our express written permission.
                            </p>
                        </div>
                    </section>

                    {/* Disclaimers */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-yellow-600" />
                            <h2 className="text-2xl font-bold text-gray-900">8. Disclaimers and Limitations</h2>
                        </div>
                        
                        <div className="text-gray-700 space-y-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="font-semibold text-yellow-900 mb-2">Service "As Is"</p>
                                <p className="text-yellow-800 text-sm">
                                    Our services are provided "as is" without warranties of any kind, either express or implied. We do not guarantee uninterrupted, secure, or error-free service.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Liability for User Content</h3>
                                <p className="leading-relaxed">
                                    We are not responsible for the accuracy, quality, safety, or legality of listings, user content, or the ability of sellers to complete transactions.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                                <p className="leading-relaxed">
                                    To the maximum extent permitted by law, Taranga Market shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Indemnification */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                You agree to indemnify and hold harmless Taranga Market, its affiliates, and employees from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any rights of third parties.
                            </p>
                        </div>
                    </section>

                    {/* Dispute Resolution */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                Any disputes arising from these terms or your use of our services shall be resolved through:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                <li>Good faith negotiation between parties</li>
                                <li>Mediation, if negotiation fails</li>
                                <li>Arbitration or litigation in Dhaka, Bangladesh</li>
                            </ol>
                            <p className="leading-relaxed mt-3">
                                These terms are governed by the laws of Bangladesh.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Terms */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notification. Continued use of our services after changes constitutes acceptance of the updated terms.
                            </p>
                        </div>
                    </section>

                    {/* Termination */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserX className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">12. Termination</h2>
                        </div>
                        
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                We may terminate or suspend your account and access to our services immediately, without prior notice, for:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Violation of these terms</li>
                                <li>Fraudulent or illegal activity</li>
                                <li>Requests by law enforcement</li>
                                <li>Extended periods of inactivity</li>
                                <li>Any other reason at our sole discretion</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <div className="text-gray-700 space-y-2">
                            <p className="leading-relaxed">
                                If you have questions about these Terms of Service, please contact us:
                            </p>
                            <ul className="space-y-2 mt-3">
                                <li><strong>Email:</strong> <a href="mailto:legal@tarangamarket.com" className="text-[#1D7E87] hover:underline">legal@tarangamarket.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+8801712345678" className="text-[#1D7E87] hover:underline">+880 1712-345678</a></li>
                                <li><strong>Address:</strong> House 123, Road 12, Dhanmondi, Dhaka 1209, Bangladesh</li>
                            </ul>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <section className="bg-[#1D7E87]/5 border border-[#1D7E87]/20 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-[#1D7E87] flex-shrink-0 mt-1" />
                            <div className="text-gray-700">
                                <p className="font-semibold text-gray-900 mb-2">Acknowledgment</p>
                                <p className="leading-relaxed">
                                    By using Taranga Market, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
