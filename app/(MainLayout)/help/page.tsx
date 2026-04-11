"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, ShoppingCart, Tag, Shield, Users, Settings, MessageSquare, TrendingUp, Search, X, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getHelpService, HelpArticle } from '@/services/help';
import { useTranslations } from 'next-intl';

const getIcon = (iconName: string | null) => {
    switch (iconName) {
        case 'bx bx-cart': return <ShoppingCart className="w-8 h-8" />;
        case 'bx bx-purchase-tag': return <Tag className="w-8 h-8" />;
        case 'bx bx-shield': return <Shield className="w-8 h-8" />;
        case 'bx bx-user': return <Users className="w-8 h-8" />;
        case 'bx bx-cog': return <Settings className="w-8 h-8" />;
        case 'bx bx-message-rounded': return <MessageSquare className="w-8 h-8" />;
        default: return <BookOpen className="w-8 h-8" />;
    }
};

const getColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-orange-500', 'bg-teal-500'];
    return colors[index % colors.length];
};

export default function HelpPage() {
    const t = useTranslations("Help");
    const ct = useTranslations("Common");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
    const [helpData, setHelpData] = useState<{ articles: HelpArticle[], popular_articles: HelpArticle[] }>({ articles: [], popular_articles: [] });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await getHelpService();
            if (res.success) {
                setHelpData(res.data);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const toggleTopic = (title: string) => {
        setExpandedTopics(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    const helpTopics = useMemo(() => {
        return helpData.articles.map((item, index) => ({
            id: item.id,
            icon: getIcon(item.icon),
            title: item.title,
            description: item.subtitle,
            color: getColor(index),
            articles: item.description.split('\n').filter(Boolean)
        }));
    }, [helpData.articles]);

    const filteredTopics = useMemo(() => {
        if (!searchQuery.trim()) return helpTopics;

        const query = searchQuery.toLowerCase();
        return helpTopics.map(topic => {
            const matchesTopic = topic.title.toLowerCase().includes(query) || 
                                topic.description.toLowerCase().includes(query);
            const matchingArticles = topic.articles.filter(article => 
                article.toLowerCase().includes(query)
            );

            if (matchesTopic || matchingArticles.length > 0) {
                return {
                    ...topic,
                    matchingArticles: matchingArticles.length > 0 ? matchingArticles : topic.articles
                };
            }
            return null;
        }).filter(Boolean) as any[];
    }, [searchQuery, helpTopics]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#1D7E87]">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-bold animate-pulse">{t("loadingHelp")}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1D7E87] rounded-full mb-6 shadow-lg shadow-[#1D7E87]/20">
                        <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        {t("title")}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#1D7E87] transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("searchPlaceholder")}
                            className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl shadow-lg border border-gray-100 outline-none text-lg transition-all focus:ring-4 focus:ring-[#1D7E87]/10 focus:border-[#1D7E87]"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="text-gray-400 text-sm">{t("popular")}:</span>
                        {["Listing", "Payment", "Safety"].map((tag) => (
                            <button 
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-[#1D7E87]/10 hover:text-[#1D7E87] px-3 py-1 rounded-full transition-all"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Help Topics Grid */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {searchQuery ? t("searchResults") : t("browseByTopic")}
                        </h2>
                        {searchQuery && (
                            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                {filteredTopics.length} {t("topicsFound")}
                            </span>
                        )}
                    </div>

                    <AnimatePresence mode='wait'>
                        {filteredTopics.length > 0 ? (
                            <motion.div 
                                key="results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredTopics.map((topic, index) => (
                                    <motion.div
                                        layout
                                        key={`${topic.id}-${index}`}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-2xl shadow-md p-6 border border-gray-50 hover:shadow-xl transition-all group overflow-hidden relative"
                                    >
                                        <div className={`w-14 h-14 ${topic.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            {topic.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">{topic.description}</p>
                                        <ul className="space-y-3">
                                            {(topic.matchingArticles || topic.articles).slice(0, expandedTopics[topic.title] ? undefined : 4).map((article: string, idx: number) => (
                                                <li key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                                                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover/link:text-[#1D7E87] transition-colors" />
                                                        <span className={searchQuery && article.toLowerCase().includes(searchQuery.toLowerCase()) ? "font-bold text-[#1D7E87]" : ""}>
                                                            {article}
                                                        </span>
                                                </li>
                                            ))}
                                        </ul>
                                        {topic.articles.length > 4 && (
                                            <div className="mt-6 pt-4 border-t border-gray-50">
                                                <button 
                                                    onClick={() => toggleTopic(topic.title)}
                                                    className="text-[#1D7E87] hover:text-[#2A8E8E] text-sm font-bold flex items-center gap-1 group/btn"
                                                >
                                                    {expandedTopics[topic.title] ? ct("showLess") : t("viewAllArticles", { count: topic.articles.length })} 
                                                    <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedTopics[topic.title] ? "-rotate-90" : "group-hover/btn:translate-x-0.5"}`} />
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="no-results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("noResultsTitle", { query: searchQuery })}</h3>
                                <p className="text-gray-500">{t("noResultsDesc")}</p>
                                <button 
                                    onClick={() => setSearchQuery("")}
                                    className="mt-6 text-[#1D7E87] font-bold hover:underline"
                                >
                                    {ct("clearSearch")}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Popular Articles */}
                <AnimatePresence>
                    {helpData.popular_articles.length > 0 && !searchQuery && (
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto mb-16"
                        >
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-[#1D7E87]" />
                                    <h2 className="text-2xl font-bold text-gray-900">{t("popularArticles")}</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {helpData.popular_articles.map((item, index) => (
                                        <Link 
                                            key={`${item.id}-${index}`}
                                            href={`#`}
                                            className="p-4 border border-gray-200 rounded-lg hover:border-[#1D7E87] hover:bg-gray-50 transition-all block group"
                                        >
                                            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1D7E87] transition-colors">{item.title}</h4>
                                            <p className="text-sm text-gray-600 line-clamp-1">{item.subtitle}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Contact Support */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#1D7E87] to-[#2A8E8E] rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">{t("cantFindTitle")}</h2>
                        <p className="text-white/90 text-lg mb-8">
                            {t("cantFindDesc")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-white text-[#1D7E87] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-block"
                            >
                                {t("contactSupport")}
                            </Link>
                            <Link
                                href="/faq"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors inline-block"
                            >
                                {t("viewFaq")}
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
