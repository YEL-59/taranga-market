"use client";

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: "Getting Started",
            questions: [
                {
                    q: "How do I create an account on Taranga Market?",
                    a: "Creating an account is simple! Click the 'Login/Sign up' button in the top right corner, then select 'Create Account'. Fill in your name, email, phone number, and create a password. You'll receive a verification email to activate your account."
                },
                {
                    q: "Is Taranga Market free to use?",
                    a: "Yes! Browsing listings and creating an account is completely free. You can post listings, contact sellers, and save favorites at no cost. We may introduce premium features in the future, but basic functionality will always remain free."
                },
                {
                    q: "What categories are available on Taranga Market?",
                    a: "We currently offer five main categories: Vehicles (cars, motorcycles), Properties (rentals, sales), Products & Electronics (phones, laptops, gadgets), Services (plumbing, cleaning, design), and Jobs (full-time, part-time, freelance positions)."
                }
            ]
        },
        {
            category: "Buying & Browsing",
            questions: [
                {
                    q: "How do I search for items?",
                    a: "Use the search bar at the top of the page or browse by category. Each category page has advanced filters to narrow down results by location, price range, and specific attributes (e.g., make/model for vehicles, bedrooms for properties)."
                },
                {
                    q: "How do I contact a seller?",
                    a: "On any listing detail page, you'll find the seller's contact information including phone number and email. You can call, send a WhatsApp message, or email them directly. Always communicate through verified channels."
                },
                {
                    q: "Can I save items to view later?",
                    a: "Yes! Click the heart icon on any listing to add it to your Favorites. Access your saved items anytime by clicking the heart icon in the navigation bar."
                },
                {
                    q: "How do I know if a listing is genuine?",
                    a: "Look for verified seller badges, check seller ratings and reviews, examine listing photos carefully, and always meet in safe public places. If something seems too good to be true, it probably is. Report suspicious listings to our support team."
                }
            ]
        },
        {
            category: "Selling & Listings",
            questions: [
                {
                    q: "How do I post a listing?",
                    a: "Log into your account, click 'Post Listing' or '+' button, select the appropriate category, fill in all required details (title, description, price, location, photos), and submit. Your listing will be reviewed and published within 24 hours."
                },
                {
                    q: "What photos should I include in my listing?",
                    a: "Include clear, well-lit photos from multiple angles. For vehicles: exterior, interior, engine, and any damage. For properties: all rooms, exterior, and amenities. For products: front, back, sides, and any defects. Use high-quality images (at least 800x600 pixels)."
                },
                {
                    q: "How do I edit or delete my listing?",
                    a: "Go to 'My Listings' in your account dashboard. Click on the listing you want to modify, then select 'Edit' to make changes or 'Delete' to remove it. Edits may require re-approval."
                },
                {
                    q: "How long does my listing stay active?",
                    a: "Listings remain active for 60 days by default. You can renew them before expiration. Premium listings (coming soon) will have extended visibility and featured placement."
                }
            ]
        },
        {
            category: "Payments & Transactions",
            questions: [
                {
                    q: "Does Taranga Market handle payments?",
                    a: "Currently, Taranga Market facilitates connections between buyers and sellers, but transactions are completed directly between parties. We recommend using secure payment methods and meeting in person for high-value items."
                },
                {
                    q: "What payment methods are accepted?",
                    a: "Payment methods are agreed upon between buyer and seller. Common options include cash, bank transfer (bKash, Nagad, Rocket), and mobile banking. Always verify payment before handing over items."
                },
                {
                    q: "What if I have a payment dispute?",
                    a: "Since transactions occur between users, we cannot mediate payment disputes. However, you can report issues to our support team, and we'll investigate potential fraud or policy violations."
                }
            ]
        },
        {
            category: "Safety & Security",
            questions: [
                {
                    q: "How can I stay safe when buying or selling?",
                    a: "Meet in public places during daylight hours, bring a friend, verify items before payment, don't share sensitive personal information, use secure payment methods, trust your instincts, and report suspicious activity."
                },
                {
                    q: "What should I do if I encounter a scam?",
                    a: "Immediately stop communication with the suspicious party, do not send money or personal information, report the listing/user to our support team with evidence (screenshots, messages), and consider reporting to local authorities for serious cases."
                },
                {
                    q: "How does Taranga Market protect my personal information?",
                    a: "We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without consent. Read our Privacy Policy for detailed information."
                }
            ]
        },
        {
            category: "Account & Settings",
            questions: [
                {
                    q: "How do I change my password?",
                    a: "Go to Account Settings → Security → Change Password. Enter your current password, then your new password twice. Click 'Update Password'. You'll receive a confirmation email."
                },
                {
                    q: "Can I delete my account?",
                    a: "Yes. Go to Account Settings → Privacy → Delete Account. This action is permanent and will remove all your listings, favorites, and personal data. You'll need to confirm via email."
                },
                {
                    q: "How do I update my contact information?",
                    a: "Navigate to Account Settings → Profile. Update your name, email, phone number, or location. Changes to email or phone may require verification."
                }
            ]
        },
        {
            category: "Technical Issues",
            questions: [
                {
                    q: "The website isn't loading properly. What should I do?",
                    a: "Try clearing your browser cache and cookies, use a different browser, check your internet connection, disable browser extensions, or try accessing from a different device. If issues persist, contact our support team."
                },
                {
                    q: "I'm not receiving verification emails. What should I do?",
                    a: "Check your spam/junk folder, add support@tarangamarket.com to your contacts, verify your email address is correct in settings, wait a few minutes and try resending, or contact support if the problem continues."
                },
                {
                    q: "Why can't I upload photos to my listing?",
                    a: "Ensure your images are in JPG, PNG, or WebP format, under 5MB each, and you're uploading a maximum of 8 photos. Try resizing large images or using a different browser."
                }
            ]
        }
    ];

    const filteredFAQs = faqs.map(category => ({
        ...category,
        questions: category.questions.filter(faq =>
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <HelpCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about using Taranga Market
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none text-lg"
                        />
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="max-w-4xl mx-auto">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                            <p className="text-gray-600 text-lg">No results found for "{searchTerm}"</p>
                            <p className="text-gray-500 mt-2">Try different keywords or browse all categories</p>
                        </div>
                    ) : (
                        filteredFAQs.map((category, catIndex) => (
                            <div key={catIndex} className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center text-white text-sm">
                                        {catIndex + 1}
                                    </span>
                                    {category.category}
                                </h2>
                                <div className="space-y-3">
                                    {category.questions.map((faq, qIndex) => {
                                        const globalIndex = catIndex * 100 + qIndex;
                                        const isOpen = openIndex === globalIndex;
                                        
                                        return (
                                            <div
                                                key={qIndex}
                                                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                                            >
                                                <button
                                                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-semibold text-gray-900 pr-4">
                                                        {faq.q}
                                                    </span>
                                                    <ChevronDown
                                                        className={`w-5 h-5 text-[#1D7E87] flex-shrink-0 transition-transform ${
                                                            isOpen ? 'transform rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-4 pt-2 text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50">
                                                        {faq.a}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Still Need Help */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                        <p className="text-white/90 text-lg mb-8">
                            Can't find the answer you're looking for? Our support team is here to help!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="bg-white text-[#1D7E87] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                            >
                                Contact Support
                            </a>
                            <a
                                href="/help"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                            >
                                Visit Help Center
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
