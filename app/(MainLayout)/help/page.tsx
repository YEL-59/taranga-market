import React from 'react';
import { BookOpen, ShoppingCart, Tag, Shield, Users, Settings, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
    const helpTopics = [
        {
            icon: <ShoppingCart className="w-8 h-8" />,
            title: "Buying Guide",
            description: "Learn how to find, evaluate, and purchase items safely",
            color: "bg-blue-500",
            articles: [
                "How to search for items effectively",
                "Understanding listing details",
                "Contacting sellers safely",
                "Meeting sellers in person",
                "Verifying item condition",
                "Negotiating prices"
            ]
        },
        {
            icon: <Tag className="w-8 h-8" />,
            title: "Selling Guide",
            description: "Tips for creating great listings and selling successfully",
            color: "bg-green-500",
            articles: [
                "Creating your first listing",
                "Writing effective descriptions",
                "Taking quality photos",
                "Setting competitive prices",
                "Managing inquiries",
                "Completing transactions"
            ]
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Safety & Security",
            description: "Stay safe while buying and selling online",
            color: "bg-red-500",
            articles: [
                "Recognizing scams and fraud",
                "Safe meeting locations",
                "Secure payment methods",
                "Protecting personal information",
                "Reporting suspicious activity",
                "Account security best practices"
            ]
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Account Management",
            description: "Manage your profile, settings, and preferences",
            color: "bg-purple-500",
            articles: [
                "Creating and verifying your account",
                "Updating profile information",
                "Managing privacy settings",
                "Changing your password",
                "Email and notification preferences",
                "Deleting your account"
            ]
        },
        {
            icon: <Settings className="w-8 h-8" />,
            title: "Platform Features",
            description: "Get the most out of Taranga Market's features",
            color: "bg-orange-500",
            articles: [
                "Using advanced search filters",
                "Saving items to favorites",
                "Setting up alerts",
                "Understanding categories",
                "Mobile app features",
                "Keyboard shortcuts"
            ]
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Communication",
            description: "Best practices for buyer-seller communication",
            color: "bg-teal-500",
            articles: [
                "Messaging etiquette",
                "Response time expectations",
                "Language and professionalism",
                "Handling difficult conversations",
                "Blocking and reporting users",
                "Communication preferences"
            ]
        }
    ];

    const quickLinks = [
        { title: "Getting Started Guide", href: "#" },
        { title: "Video Tutorials", href: "#" },
        { title: "Community Guidelines", href: "#" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Cookie Policy", href: "/cookies" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Help Center
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about using Taranga Market
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-200">
                        <input
                            type="text"
                            placeholder="Search help articles..."
                            className="w-full px-4 py-3 outline-none text-lg"
                        />
                    </div>
                    <p className="text-center text-gray-500 mt-3 text-sm">
                        Try searching: "how to post a listing", "payment methods", "account security"
                    </p>
                </div>

                {/* Help Topics Grid */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Topic</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helpTopics.map((topic, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                <div className={`w-14 h-14 ${topic.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                                    {topic.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm">{topic.description}</p>
                                <ul className="space-y-2">
                                    {topic.articles.slice(0, 4).map((article, idx) => (
                                        <li key={idx}>
                                            <a href="#" className="text-[#1D7E87] hover:underline text-sm flex items-center gap-2">
                                                <span className="text-gray-400">→</span>
                                                {article}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {topic.articles.length > 4 && (
                                    <a href="#" className="text-[#1D7E87] hover:underline text-sm font-semibold mt-3 inline-block">
                                        View all {topic.articles.length} articles →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Articles */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="w-6 h-6 text-[#1D7E87]" />
                            <h2 className="text-2xl font-bold text-gray-900">Popular Articles</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#1D7E87] hover:bg-gray-50 transition-all">
                                <h4 className="font-semibold text-gray-900 mb-1">How to create your first listing</h4>
                                <p className="text-sm text-gray-600">Step-by-step guide to posting items</p>
                            </a>
                            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#1D7E87] hover:bg-gray-50 transition-all">
                                <h4 className="font-semibold text-gray-900 mb-1">Safe payment methods</h4>
                                <p className="text-sm text-gray-600">Protect yourself during transactions</p>
                            </a>
                            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#1D7E87] hover:bg-gray-50 transition-all">
                                <h4 className="font-semibold text-gray-900 mb-1">Recognizing and avoiding scams</h4>
                                <p className="text-sm text-gray-600">Stay safe from fraudulent activity</p>
                            </a>
                            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-[#1D7E87] hover:bg-gray-50 transition-all">
                                <h4 className="font-semibold text-gray-900 mb-1">Using search filters effectively</h4>
                                <p className="text-sm text-gray-600">Find exactly what you're looking for</p>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {quickLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-3 text-gray-700 hover:text-[#1D7E87] transition-colors"
                                >
                                    <span className="w-2 h-2 bg-[#1D7E87] rounded-full"></span>
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Support */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                        <p className="text-white/90 text-lg mb-8">
                            Our support team is ready to help you with any questions or issues.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-white text-[#1D7E87] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-block"
                            >
                                Contact Support
                            </Link>
                            <Link
                                href="/faq"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors inline-block"
                            >
                                View FAQ
                            </Link>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/20">
                            <p className="text-white/80 text-sm">
                                Email: <a href="mailto:support@tarangamarket.com" className="underline hover:text-white">support@tarangamarket.com</a> | 
                                Phone: <a href="tel:+8801712345678" className="underline hover:text-white">+880 1712-345678</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
