import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Privacy Policy
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
                            At <span className="font-bold text-[#1D7E87]">Taranga Market</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our marketplace platform.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Database className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                        </div>
                        
                        <div className="space-y-4 ml-9">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    When you register or use our services, we may collect:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                                    <li>Name and contact information (email, phone number)</li>
                                    <li>Account credentials (username, password)</li>
                                    <li>Profile information and preferences</li>
                                    <li>Location data (city, region)</li>
                                    <li>Payment information (processed securely through third-party providers)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Listing Information</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    When you create listings, we collect:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
                                    <li>Product/service descriptions and images</li>
                                    <li>Pricing and availability information</li>
                                    <li>Category and location details</li>
                                    <li>Contact preferences</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Device information (browser type, operating system)</li>
                                    <li>IP address and location data</li>
                                    <li>Usage data (pages visited, time spent, clicks)</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <UserCheck className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
                        </div>
                        
                        <div className="ml-9 space-y-3 text-gray-700">
                            <p className="leading-relaxed">We use your information to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Provide, maintain, and improve our marketplace services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
                                <li>Respond to your inquiries and provide customer support</li>
                                <li>Detect, prevent, and address fraud and security issues</li>
                                <li>Analyze usage patterns to enhance user experience</li>
                                <li>Comply with legal obligations and enforce our terms</li>
                                <li>Personalize your experience and show relevant listings</li>
                            </ul>
                        </div>
                    </section>

                    {/* Information Sharing */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">3. Information Sharing and Disclosure</h2>
                        </div>
                        
                        <div className="ml-9 space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                                We do not sell your personal information. We may share your information in the following circumstances:
                            </p>
                            
                            <div className="space-y-3">
                                <div>
                                    <h3 className="font-semibold text-gray-800">With Other Users</h3>
                                    <p className="text-gray-700">Your public profile and listings are visible to other users to facilitate transactions.</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-800">Service Providers</h3>
                                    <p className="text-gray-700">We work with third-party service providers for hosting, analytics, payment processing, and customer support.</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-800">Legal Requirements</h3>
                                    <p className="text-gray-700">We may disclose information if required by law, court order, or government request.</p>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-800">Business Transfers</h3>
                                    <p className="text-gray-700">In the event of a merger, acquisition, or sale of assets, your information may be transferred.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Security */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
                        </div>
                        
                        <div className="ml-9 text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                We implement industry-standard security measures to protect your information:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Secure server infrastructure and regular security audits</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Regular security updates and vulnerability assessments</li>
                                <li>Employee training on data protection practices</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                            </p>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">5. Your Rights and Choices</h2>
                        </div>
                        
                        <div className="ml-9 text-gray-700 space-y-3">
                            <p className="leading-relaxed">You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Access:</strong> Request a copy of your personal information</li>
                                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                                <li><strong>Restrict Processing:</strong> Limit how we use your information</li>
                            </ul>
                            <p className="leading-relaxed mt-4">
                                To exercise these rights, please contact us at <a href="mailto:privacy@tarangamarket.com" className="text-[#1D7E87] hover:underline font-semibold">privacy@tarangamarket.com</a>
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                We use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. For more information, see our <a href="/cookies" className="text-[#1D7E87] hover:underline font-semibold">Cookie Policy</a>.
                            </p>
                        </div>
                    </section>

                    {/* Children's Privacy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                Our services are not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe we have collected information from a child, please contact us immediately.
                            </p>
                        </div>
                    </section>

                    {/* Changes to Policy */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                            </p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <div className="text-gray-700 space-y-2">
                            <p className="leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="space-y-2 mt-3">
                                <li><strong>Email:</strong> <a href="mailto:privacy@tarangamarket.com" className="text-[#1D7E87] hover:underline">privacy@tarangamarket.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+8801712345678" className="text-[#1D7E87] hover:underline">+880 1712-345678</a></li>
                                <li><strong>Address:</strong> House 123, Road 12, Dhanmondi, Dhaka 1209, Bangladesh</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
