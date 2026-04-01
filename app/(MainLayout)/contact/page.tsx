"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Loader2, CheckCircle2 } from 'lucide-react';
import { contactUsService } from '@/services/contact';
import { toast } from 'sonner';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await contactUsService({
                full_name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject_id: parseInt(formData.subject),
                message: formData.message
            });

            if (result.success) {
                toast.success(result.message || "Message sent successfully!");
                setIsSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                // Reset success message after 5 seconds
                setTimeout(() => setIsSuccess(false), 5000);
            } else {
                toast.error(result.message || "Failed to send message. Please try again.");
            }
        } catch (error: any) {
            toast.error(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
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
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1D7E87] rounded-[2.5rem] rotate-12 shadow-inner mb-6 transition-transform hover:rotate-0 duration-500">
                        <MessageCircle className="w-10 h-10 text-white -rotate-12 hover:rotate-0 transition-transform" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Get In Touch
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have a question or need assistance? We're here to help! Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {/* Contact Info Cards */}
                        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#1D7E87]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D7E87] transition-colors">
                                <Phone className="w-7 h-7 text-[#1D7E87] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Call us during business hours for immediate support</p>
                            <a href="tel:+8801712345678" className="text-[#1D7E87] hover:text-[#14646b] font-bold text-lg inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                +880 1712-345678
                            </a>
                        </div>

                        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#1D7E87]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D7E87] transition-colors">
                                <Mail className="w-7 h-7 text-[#1D7E87] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Send us an email anytime, we'll respond within 24h</p>
                            <a href="mailto:support@tarangamarket.com" className="text-[#1D7E87] hover:text-[#14646b] font-bold text-lg inline-flex items-center gap-1 group-hover:gap-2 transition-all break-all">
                                support@tarangamarket.com
                            </a>
                        </div>

                        <div className="group bg-white rounded-3xl shadow-sm hover:shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-14 h-14 bg-[#1D7E87]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1D7E87] transition-colors">
                                <MapPin className="w-7 h-7 text-[#1D7E87] group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Office</h3>
                            <p className="text-gray-600 mb-4 leading-relaxed">Visit our headquarters in Dhaka to meet the team</p>
                            <p className="text-gray-900 font-semibold leading-relaxed">
                                House 123, Road 12, Dhanmondi<br />
                                Dhaka 1209, Bangladesh
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        {/* Contact Form */}
                        <div className="lg:col-span-3 bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                            {/* Decorative background circle */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                            
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 relative">Send Us a Message</h2>
                            
                            {isSuccess && (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex gap-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-emerald-900 font-bold text-lg">Message sent successfully!</p>
                                        <p className="text-emerald-700 mt-1">Our support team will get back to you within 24 hours.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6 relative">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1D7E87]/20 focus:border-[#1D7E87] outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1D7E87]/20 focus:border-[#1D7E87] outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1D7E87]/20 focus:border-[#1D7E87] outline-none transition-all bg-gray-50/50 hover:bg-white"
                                            placeholder="+880 1XXX-XXXXXX"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-bold text-gray-700 ml-1">
                                            How can we help? <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1D7E87]/20 focus:border-[#1D7E87] outline-none transition-all bg-gray-50/50 hover:bg-white appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="1">General Inquiry</option>
                                            <option value="2">Technical Support</option>
                                            <option value="3">Billing Question</option>
                                            <option value="4">Report an Issue</option>
                                            <option value="5">Feedback</option>
                                            <option value="6">Partnership Opportunity</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-gray-700 ml-1">
                                        Detailed Message <span className="text-red-500">*</span>
                                        <span className="text-xs text-gray-400 font-normal ml-2">(Min. 10 characters)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#1D7E87]/20 focus:border-[#1D7E87] outline-none transition-all bg-gray-50/50 hover:bg-white resize-none"
                                        placeholder="Write your message here..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#1D7E87] text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-[#14646b] disabled:bg-gray-400 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            Sending Message...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-6 h-6" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Additional Info (Right Side) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Business Hours */}
                            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 group hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-[#1D7E87]/10 rounded-xl flex items-center justify-center text-[#1D7E87]">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Business Hours</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                                        <span className="font-bold text-gray-700">Saturday - Thursday</span>
                                        <span className="text-[#1D7E87] font-bold">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4">
                                        <span className="font-bold text-gray-600">Friday</span>
                                        <span className="text-red-500 font-bold">Closed</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <p className="text-sm font-medium">Timezone: GMT+6 (BST)</p>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ Link (Quick Answers) */}
                            <div className="relative overflow-hidden bg-[#1D7E87] rounded-3xl shadow-xl p-8 text-white group">
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transition-transform group-hover:scale-150 duration-700" />
                                <h3 className="text-2xl font-bold mb-4 relative z-10">Common Questions?</h3>
                                <p className="mb-8 text-teal-50/90 leading-relaxed text-lg relative z-10">
                                    Check our FAQ for instant answers. Most users find what they need there.
                                </p>
                                <a 
                                    href="/faq" 
                                    className="inline-flex relative z-10 bg-white text-[#1D7E87] px-8 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
                                >
                                    Explore FAQs
                                </a>
                            </div>

                            {/* Live Support Notice */}
                            <div className="bg-gray-900 rounded-3xl shadow-xl p-8 text-white relative">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                    <h4 className="font-bold text-xl">Technical Support</h4>
                                </div>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Our technical experts are available for complex issues during working hours.
                                </p>
                                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Typically responds in 2 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* social ways */}
                <div className="max-w-6xl mx-auto mt-20">
                    <div className="bg-white rounded-[3rem] shadow-sm p-12 border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/2 bg-gray-50/50 pointer-events-none" />
                        
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center relative">Connect with us on Socials</h2>
                        <div className="grid sm:grid-cols-3 gap-12 relative">
                            <div className="group text-center">
                                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                    <MessageCircle className="w-10 h-10" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-xl mb-2">WhatsApp</h4>
                                <p className="text-gray-600">
                                    Message us for direct instant support
                                </p>
                            </div>
                            <div className="group text-center">
                                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-xl mb-2">Telegram</h4>
                                <p className="text-gray-600">
                                    Join our community for regular updates
                                </p>
                            </div>
                            <div className="group text-center">
                                <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                                    <Mail className="w-10 h-10" />
                                </div>
                                <h4 className="font-bold text-gray-900 text-xl mb-2">Social Feed</h4>
                                <p className="text-gray-600">
                                    Follow us for the latest marketplace news
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


