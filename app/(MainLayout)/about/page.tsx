import React from 'react';
import { Target, Users, Award, TrendingUp, Heart, Shield } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        About Taranga Market
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Bangladesh's trusted online marketplace connecting buyers and sellers across vehicles, properties, electronics, services, and job opportunities.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-[#1D7E87] rounded-full flex items-center justify-center">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            To empower individuals and businesses across Bangladesh by providing a safe, efficient, and user-friendly platform for buying, selling, and discovering opportunities. We strive to make online commerce accessible to everyone.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            To become Bangladesh's most trusted and comprehensive online marketplace, fostering economic growth and creating opportunities for millions of users while maintaining the highest standards of security and customer satisfaction.
                        </p>
                    </div>
                </div>

                {/* Our Story */}
                <div className="max-w-4xl mx-auto mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Taranga Market was founded in 2025 with a simple yet powerful vision: to create a platform where anyone in Bangladesh could easily buy, sell, or find services online. We recognized the growing need for a trusted, comprehensive marketplace that serves diverse needs - from finding your next car to hiring a professional service provider.
                            </p>
                            <p>
                                What started as a small team with big dreams has grown into a thriving community of thousands of users. Our platform now hosts listings across five major categories: Vehicles, Properties, Products & Electronics, Services, and Jobs. Each category is designed with the user in mind, featuring intuitive navigation, powerful search filters, and secure communication channels.
                            </p>
                            <p>
                                We're proud to be built in Bangladesh, for Bangladesh. Our team understands the local market, cultural nuances, and the specific needs of Bangladeshi buyers and sellers. This local expertise, combined with world-class technology, makes Taranga Market the ideal platform for online commerce.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Core Values */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
                            <p className="text-gray-600">
                                We prioritize user safety with verified listings, secure transactions, and robust fraud prevention measures.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
                            <p className="text-gray-600">
                                Our users are at the heart of everything we do. We listen, adapt, and continuously improve based on feedback.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for excellence in every aspect - from platform design to customer support and user experience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-xl p-8 md:p-12 mb-16 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Taranga Market by the Numbers</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">10K+</div>
                            <div className="text-white/90 text-sm md:text-base">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">50K+</div>
                            <div className="text-white/90 text-sm md:text-base">Total Listings</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">5</div>
                            <div className="text-white/90 text-sm md:text-base">Categories</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">24/7</div>
                            <div className="text-white/90 text-sm md:text-base">Support</div>
                        </div>
                    </div>
                </div>

                {/* What We Offer */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Offer</h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#1D7E87]">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">🚗 Vehicles</h3>
                            <p className="text-gray-700">
                                Find your dream car, motorcycle, or commercial vehicle. Browse thousands of listings with detailed specifications, multiple photos, and verified sellers.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">🏠 Properties</h3>
                            <p className="text-gray-700">
                                Discover apartments, houses, land, and commercial spaces for rent or sale. Advanced filters help you find the perfect property in your desired location.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">📱 Products & Electronics</h3>
                            <p className="text-gray-700">
                                Shop for the latest smartphones, laptops, tablets, and electronics. Compare prices, check conditions, and buy with confidence.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">🛠️ Services</h3>
                            <p className="text-gray-700">
                                Connect with skilled professionals for plumbing, cleaning, electrical work, design, and more. Read reviews and hire with confidence.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">💼 Jobs</h3>
                            <p className="text-gray-700">
                                Find your next career opportunity or hire talented professionals. Browse full-time, part-time, remote, and freelance positions across industries.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="max-w-5xl mx-auto mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Taranga Market?</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">User-Friendly Interface</h4>
                                    <p className="text-gray-600 text-sm">Intuitive design makes browsing and posting listings effortless</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Advanced Search Filters</h4>
                                    <p className="text-gray-600 text-sm">Find exactly what you're looking for with powerful filtering options</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Secure Platform</h4>
                                    <p className="text-gray-600 text-sm">Your data and transactions are protected with industry-standard security</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Mobile Optimized</h4>
                                    <p className="text-gray-600 text-sm">Browse seamlessly on any device - desktop, tablet, or smartphone</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Customer Support</h4>
                                    <p className="text-gray-600 text-sm">Our dedicated team is always here to help you</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#1D7E87] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Free to Use</h4>
                                    <p className="text-gray-600 text-sm">Browse and post listings at no cost</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-xl p-8 md:p-12">
                        <Heart className="w-16 h-16 text-white mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Join Our Growing Community
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Whether you're buying, selling, or exploring opportunities, Taranga Market is here to help you succeed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="/" 
                                className="bg-white text-[#1D7E87] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                            >
                                Start Browsing
                            </a>
                            <a 
                                href="/contact" 
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
