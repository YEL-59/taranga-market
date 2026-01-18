"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Calendar, Gauge, ArrowLeft, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';

const FavoritesPage = () => {
    const { favorites, toggleFavorite } = useFavorites();

    return (
        <section className="w-full min-h-screen bg-[#FAFAFA] py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 text-[#2A8E8E] font-semibold mb-4 hover:opacity-80 transition-opacity">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Home</span>
                        </Link>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Favorites</h1>
                        <p className="text-gray-500 mt-1">You have {favorites.length} items saved.</p>
                    </div>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {favorites.map((item) => (
                            <Card key={item.id} className="overflow-hidden border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group flex flex-col h-full rounded-[20px] p-2.5">
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 rounded-[15px]">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    
                                    <Badge className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm">
                                        {item.type}
                                    </Badge>
                                    
                                    <button 
                                        onClick={() => toggleFavorite(item)}
                                        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#F97316] text-white shadow-md transition-all hover:bg-red-600"
                                        title="Remove from favorites"
                                    >
                                        <Trash2 className="h-4.5 w-4.5" />
                                    </button>
                                </div>

                                <CardContent className="flex flex-col flex-1 p-3.5 pt-4">
                                    <h3 className="line-clamp-2 text-[14.5px] font-semibold text-gray-800 leading-snug mb-3 hover:text-[#1D7E87] transition-colors">
                                        {item.title}
                                    </h3>

                                    {item.meta && (
                                        <div className="mb-4 flex items-center gap-4 text-[12px] text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                <span>{item.meta.year}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Gauge className="h-3.5 w-3.5 text-gray-400" />
                                                <span>{item.meta.mileage}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="truncate">{item.location}</span>
                                            </div>
                                            <span className="text-[14px] font-bold text-[#F97316]">
                                                {item.price}
                                            </span>
                                        </div>

                                        <Link href={item.type === 'Vehicle' ? '/vehicles' : '/all-items'} className="block">
                                            <Button 
                                                variant="outline"
                                                className="w-full rounded-xl font-semibold text-[13px] h-10 transition-all bg-white border-gray-100 text-gray-600 hover:bg-[#1D7E87] hover:text-white hover:border-[#1D7E87]"
                                            >
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[30px] border border-dashed border-gray-200 py-24 text-center">
                        <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-gray-200" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Your favorites list is empty</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore our categories and add items to your favorites list to see them here.</p>
                        <Link href="/all-items">
                            <Button className="bg-[#1D7E87] hover:bg-[#16636a] text-white px-8 py-6 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#1D7E87]/20">
                                Start Exploring
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FavoritesPage;
