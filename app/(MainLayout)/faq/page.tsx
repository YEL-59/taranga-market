"use client";

import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Search, Loader2 } from 'lucide-react';
import { getFaqsService, FAQCategory } from '@/services/faq';

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState<FAQCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchFaqs = async () => {
            setIsLoading(true);
            try {
                const response = await getFaqsService(searchTerm);
                if (response.success && response.data) {
                    setCategories(response.data.categories);
                    // Open the first item of the first category by default on initial load
                    if (!searchTerm && response.data.categories.length > 0 && response.data.categories[0].items.length > 0) {
                        setOpenIndex(0);
                    }
                }
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchFaqs();
        }, searchTerm ? 300 : 0);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

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
                        {isLoading ? (
                            <Loader2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#1D7E87] animate-spin" />
                        ) : (
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        )}
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1D7E87] focus:border-transparent outline-none text-lg transition-all shadow-sm hover:border-gray-400"
                        />
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="max-w-4xl mx-auto">
                    {isLoading && categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-[#1D7E87] animate-spin mb-4" />
                            <p className="text-gray-500 text-lg">Loading FAQs...</p>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-10 h-10 text-gray-300" />
                            </div>
                            <p className="text-gray-600 text-lg font-semibold">No results found for "{searchTerm}"</p>
                            <p className="text-gray-500 mt-2">Try different keywords or browse all categories</p>
                        </div>
                    ) : (
                        categories.map((category, catIndex) => (
                            <div key={category.category_id} className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-[#1D7E87] rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                                        {catIndex + 1}
                                    </span>
                                    {category.category_name}
                                </h2>
                                <div className="space-y-4">
                                    {category.items.map((item, qIndex) => {
                                        const globalIndex = catIndex * 1000 + qIndex;
                                        const isOpen = openIndex === globalIndex;
                                        
                                        return (
                                            <div
                                                key={item.id}
                                                className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                                                    isOpen 
                                                        ? 'border-[#1D7E87] ring-1 ring-[#1D7E87]/20 shadow-md' 
                                                        : 'border-gray-100 hover:border-gray-300 hover:shadow-md'
                                                } overflow-hidden`}
                                            >
                                                <button
                                                    onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                                >
                                                    <span className={`font-bold text-lg pr-4 ${isOpen ? 'text-[#1D7E87]' : 'text-gray-900'}`}>
                                                        {item.question}
                                                    </span>
                                                    <div className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-[#1D7E87] text-white' : 'bg-gray-50 text-gray-400'}`}>
                                                        <ChevronDown
                                                            className={`w-5 h-5 transition-transform duration-300 ${
                                                                isOpen ? 'transform rotate-180' : ''
                                                            }`}
                                                        />
                                                    </div>
                                                </button>
                                                {isOpen && (
                                                    <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed bg-white">
                                                        <div className="h-[1px] w-full bg-gray-100 mb-4" />
                                                        <div className="prose prose-sm max-w-none text-gray-600 text-[1.05rem]">
                                                            {item.answer}
                                                        </div>
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
                <div className="max-w-4xl mx-auto mt-20">
                    <div className="relative overflow-hidden bg-[#1D7E87] rounded-[2rem] shadow-2xl p-8 md:p-14 text-center text-white">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Still Have Questions?</h2>
                            <p className="text-teal-50 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                                Can't find the answer you're looking for? Our dedicated support team is ready to help you with anything you need.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <a
                                    href="/contact"
                                    className="bg-white text-[#1D7E87] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-lg active:scale-95"
                                >
                                    Contact Support
                                </a>
                                <a
                                    href="/help"
                                    className="bg-transparent border-2 border-white/40 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
                                >
                                    Visit Help Center
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

