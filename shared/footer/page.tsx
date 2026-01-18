import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-[#0F172A] text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                                {/* Using a placeholder tree-like icon/SVG to match the logo in the image */}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    className="w-full h-full text-green-600" 
                                    fill="currentColor"
                                >
                                    <path d="M12 2C13.5 2 14.5 3 14.5 3S13.5 4 12 4C10.5 4 9.5 3 9.5 3S10.5 2 12 2M12 5C15.5 5 18 7.5 18 10C18 11.5 17 12.5 16 13.5C15 14.5 14 15 14 17H10C10 15 9 14.5 8 13.5C7 12.5 6 11.5 6 10C6 7.5 8.5 5 12 5M11 18H13V22H11V18Z" />
                                </svg>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-xl font-bold tracking-tight">Teranga</span>
                                <span className="text-xl font-bold tracking-tight text-[#4ADE80]">Market</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-400 text-[14.5px] leading-relaxed max-w-[280px]">
                            Browse verified local listings across multiple categories and connect directly with sellers and service providers.
                        </p>

                        <div className="flex items-center gap-4">
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all">
                                <Facebook className="w-4.5 h-4.5" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all">
                                <Instagram className="w-4.5 h-4.5" />
                            </a>
                            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-all">
                                <MessageCircle className="w-4.5 h-4.5" />
                            </a>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold">Categories</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Vehicles</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Real Estate</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Products</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold">Quick Links</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-gray-400 text-[15px] hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold">Contact Us</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3.5">
                                <MapPin className="w-5 h-5 text-[#1D7E87] mt-0.5" />
                                <span className="text-gray-400 text-[14.5px] leading-snug">
                                    123 University Road, Nottingham, NG1 1AA
                                </span>
                            </div>
                            <div className="flex items-center gap-3.5">
                                <Phone className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-gray-400 text-[14.5px]">
                                    +44 123 456 7890
                                </span>
                            </div>
                            <div className="flex items-center gap-3.5">
                                <Mail className="w-5 h-5 text-[#1D7E87]" />
                                <span className="text-gray-400 text-[14.5px]">
                                    example@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex justify-center">
                    <p className="text-gray-500 text-[14px]">
                        © 2025 Teranga Market. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
