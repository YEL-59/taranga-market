import React from 'react';
import { Cookie, Settings, Eye, Shield, Info } from 'lucide-react';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <Cookie className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Cookie Policy
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
                            This Cookie Policy explains how <span className="font-bold text-[#1D7E87]">Taranga Market</span> uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are, why we use them, and your rights to control our use of them.
                        </p>
                    </section>

                    {/* What are Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Info className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">1. What Are Cookies?</h2>
                        </div>
                        
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                            </p>
                            <p className="leading-relaxed">
                                Cookies allow websites to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Remember your preferences and settings</li>
                                <li>Keep you signed in</li>
                                <li>Understand how you use the website</li>
                                <li>Improve your browsing experience</li>
                                <li>Show you relevant content and advertisements</li>
                            </ul>
                        </div>
                    </section>

                    {/* Types of Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
                        
                        <div className="space-y-6">
                            {/* Essential Cookies */}
                            <div className="border-l-4 border-[#1D7E87] pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Essential Cookies (Required)</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                                    <li>Logging into your account</li>
                                    <li>Filling in forms</li>
                                    <li>Setting privacy preferences</li>
                                    <li>Maintaining security and preventing fraud</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-2 italic">
                                    Duration: Session or up to 1 year
                                </p>
                            </div>

                            {/* Performance Cookies */}
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance Cookies (Analytics)</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                                    <li>Pages visited and time spent</li>
                                    <li>Click patterns and navigation paths</li>
                                    <li>Error messages encountered</li>
                                    <li>Device and browser information</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Examples:</strong> Google Analytics, Hotjar
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                    Duration: Up to 2 years
                                </p>
                            </div>

                            {/* Functionality Cookies */}
                            <div className="border-l-4 border-purple-500 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Functionality Cookies</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    These cookies enable enhanced functionality and personalization:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                                    <li>Remembering your language preference</li>
                                    <li>Saving your location for local listings</li>
                                    <li>Storing your favorite items</li>
                                    <li>Customizing your dashboard</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-2 italic">
                                    Duration: Up to 1 year
                                </p>
                            </div>

                            {/* Targeting Cookies */}
                            <div className="border-l-4 border-orange-500 pl-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Targeting/Advertising Cookies</h3>
                                <p className="text-gray-700 leading-relaxed mb-2">
                                    These cookies are used to deliver advertisements more relevant to you and your interests:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                                    <li>Tracking which ads you've seen</li>
                                    <li>Limiting how many times you see an ad</li>
                                    <li>Measuring ad campaign effectiveness</li>
                                    <li>Building a profile of your interests</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-2">
                                    <strong>Examples:</strong> Google Ads, Facebook Pixel
                                </p>
                                <p className="text-sm text-gray-600 italic">
                                    Duration: Up to 2 years
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Third-Party Cookies</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                We use services from third-party companies that may set cookies on your device:
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-2">Google Analytics</h4>
                                    <p className="text-sm text-gray-600">
                                        Helps us understand user behavior and improve our services.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-2">Social Media Platforms</h4>
                                    <p className="text-sm text-gray-600">
                                        Facebook, Instagram, Twitter for social sharing features.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-2">Payment Processors</h4>
                                    <p className="text-sm text-gray-600">
                                        Secure payment processing and fraud prevention.
                                    </p>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <h4 className="font-semibold text-gray-800 mb-2">Advertising Networks</h4>
                                    <p className="text-sm text-gray-600">
                                        Deliver targeted advertisements based on your interests.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Control Cookies */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">4. How to Control Cookies</h2>
                        </div>
                        
                        <div className="text-gray-700 space-y-4">
                            <p className="leading-relaxed">
                                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                            </p>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Browser Settings</h3>
                                <p className="leading-relaxed mb-2">
                                    Most web browsers allow you to control cookies through their settings:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                                    <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-900 font-semibold mb-2">⚠️ Important Note</p>
                                <p className="text-yellow-800 text-sm">
                                    Blocking or deleting cookies may impact your experience on our website. Some features may not function properly without cookies enabled.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Opt-Out Tools</h3>
                                <p className="leading-relaxed mb-2">
                                    You can opt out of targeted advertising cookies through:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#1D7E87] hover:underline">Digital Advertising Alliance</a></li>
                                    <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-[#1D7E87] hover:underline">Your Online Choices</a></li>
                                    <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#1D7E87] hover:underline">Google Analytics Opt-out</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Mobile Devices */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Mobile Devices</h2>
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                Mobile devices use identifiers similar to cookies:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>iOS:</strong> Settings → Privacy → Advertising → Limit Ad Tracking</li>
                                <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
                            </ul>
                        </div>
                    </section>

                    {/* Do Not Track */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">6. Do Not Track Signals</h2>
                        </div>
                        
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                Some browsers have a "Do Not Track" feature that signals websites you visit that you do not want your online activity tracked. Currently, there is no industry standard for how to respond to Do Not Track signals. We do not currently respond to Do Not Track signals.
                            </p>
                        </div>
                    </section>

                    {/* Updates */}
                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Updates to This Policy</h2>
                        <div className="text-gray-700">
                            <p className="leading-relaxed">
                                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
                            </p>
                        </div>
                    </section>

                    {/* More Information */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">8. More Information</h2>
                        </div>
                        
                        <div className="text-gray-700 space-y-3">
                            <p className="leading-relaxed">
                                For more information about how we handle your personal data, please see our <a href="/privacy" className="text-[#1D7E87] hover:underline font-semibold">Privacy Policy</a>.
                            </p>
                            <p className="leading-relaxed">
                                To learn more about cookies in general, visit:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-[#1D7E87] hover:underline">All About Cookies</a></li>
                                <li><a href="https://www.cookiechoices.org" target="_blank" rel="noopener noreferrer" className="text-[#1D7E87] hover:underline">Cookie Choices</a></li>
                            </ul>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                        <div className="text-gray-700 space-y-2">
                            <p className="leading-relaxed">
                                If you have questions about our use of cookies, please contact us:
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
