"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Img from "@/assets/images/nav-logo.png";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full bg-[#1B2232] text-white pt-20 pb-10"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Img} alt="Taranga Market Logo" width={150} height={200} className="hover:opacity-80 transition-opacity" /> 
                        </Link>
                        
                        <p className="text-gray-400 text-[14.5px] leading-relaxed max-w-[280px]">
                            Your trusted marketplace for buying and selling vehicles, properties, electronics, services, and finding job opportunities across Bangladesh.
                        </p>

                        <div className="flex items-center gap-4">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-4.5 h-4.5" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4.5 h-4.5" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4.5 h-4.5" />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4.5 h-4.5" />
                            </a>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold text-white">Browse Categories</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/vehicles" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    🚗 Vehicles
                                </Link>
                            </li>
                            <li>
                                <Link href="/properties" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    🏠 Properties
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    📱 Products & Electronics
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    🛠️ Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/jobs" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    💼 Jobs
                                </Link>
                            </li>
                            <li>
                                <Link href="/all-items" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    📂 All Items
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold text-white">Quick Links</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    My Favorites
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="/help" className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all">
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[17px] font-bold text-white">Get In Touch</h3>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-3.5">
                                <MapPin className="w-5 h-5 text-[#1D7E87] mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-[14.5px] leading-snug">
                                    House 123, Road 12, Dhanmondi<br />
                                    Dhaka 1209, Bangladesh
                                </span>
                            </div>
                            <a 
                                href="tel:+8801712345678" 
                                className="flex items-center gap-3.5 hover:text-white transition-colors group"
                            >
                                <Phone className="w-5 h-5 text-[#1D7E87] group-hover:text-white transition-colors" />
                                <span className="text-gray-400 text-[14.5px] group-hover:text-white transition-colors">
                                    +880 1712-345678
                                </span>
                            </a>
                            <a 
                                href="mailto:support@tarangamarket.com" 
                                className="flex items-center gap-3.5 hover:text-white transition-colors group"
                            >
                                <Mail className="w-5 h-5 text-[#1D7E87] group-hover:text-white transition-colors" />
                                <span className="text-gray-400 text-[14.5px] group-hover:text-white transition-colors">
                                    support@tarangamarket.com
                                </span>
                            </a>
                            <div className="mt-2 pt-4 border-t border-gray-800">
                                <p className="text-gray-500 text-[13px] mb-2">Business Hours:</p>
                                <p className="text-gray-400 text-[14px]">
                                    Saturday - Thursday<br />
                                    9:00 AM - 6:00 PM (GMT+6)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-[14px] text-center md:text-left">
                            © 2025 Taranga Market. All rights reserved. Built with ❤️ for Bangladesh 🇧🇩
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="text-gray-500 text-[13px] hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-500 text-[13px] hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-gray-500 text-[13px] hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;
