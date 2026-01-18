"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6">
                        <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Get In Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have a question or need assistance? We're here to help! Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Contact Info Cards */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-[#1D7E87] rounded-full flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600 mb-3">Call us during business hours</p>
                            <a href="tel:+8801712345678" className="text-[#1D7E87] hover:underline font-semibold">
                                +880 1712-345678
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-[#1D7E87] rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600 mb-3">Send us an email anytime</p>
                            <a href="mailto:support@tarangamarket.com" className="text-[#1D7E87] hover:underline font-semibold">
                                support@tarangamarket.com
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-[#1D7E87] rounded-full flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Office</h3>
                            <p className="text-gray-600 mb-3">Visit us at our location</p>
                            <p className="text-gray-700 text-sm">
                                House 123, Road 12, Dhanmondi<br />
                                Dhaka 1209, Bangladesh
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                            
                            {submitted && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                    <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                                    <p className="text-green-700 text-sm mt-1">We'll get back to you within 24 hours.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none transition-all"
                                        placeholder="+880 1712-345678"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none transition-all"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="report">Report an Issue</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#1D7E87] text-white py-3 px-6 rounded-lg font-bold hover:bg-[#156570] transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-6">
                            {/* Business Hours */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="w-6 h-6 text-[#1D7E87]" />
                                    <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
                                </div>
                                <div className="space-y-3 text-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Saturday - Thursday:</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold">Friday:</span>
                                        <span>Closed</span>
                                    </div>
                                    <div className="pt-3 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            Timezone: GMT+6 (Bangladesh Standard Time)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Link */}
                            <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-lg p-8 text-white">
                                <h3 className="text-xl font-bold mb-3">Quick Answers</h3>
                                <p className="mb-6 text-white/90">
                                    Looking for quick answers? Check out our FAQ page for commonly asked questions.
                                </p>
                                <a 
                                    href="/faq" 
                                    className="inline-block bg-white text-[#1D7E87] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Visit FAQ
                                </a>
                            </div>

                            {/* Help Center */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h3>
                                <p className="text-gray-700 mb-6">
                                    Our Help Center has detailed guides and tutorials to help you get the most out of Taranga Market.
                                </p>
                                <a 
                                    href="/help" 
                                    className="inline-block bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Visit Help Center
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map or Additional Info */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Other Ways to Reach Us</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl mb-3">💬</div>
                                <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
                                <p className="text-gray-600 text-sm">
                                    Chat with our support team in real-time (Coming Soon)
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">📱</div>
                                <h4 className="font-bold text-gray-900 mb-2">WhatsApp</h4>
                                <p className="text-gray-600 text-sm">
                                    Message us on WhatsApp for quick responses
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-3">🌐</div>
                                <h4 className="font-bold text-gray-900 mb-2">Social Media</h4>
                                <p className="text-gray-600 text-sm">
                                    Follow us on Facebook, Instagram, and Twitter
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
