"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Heart, MessageCircle, Phone, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

const getDetailLink = (item: any) => {
    return `/featured-details?id=${item.id}`;
};

const ListingCard = ({ item }: { item: any }) => {
    const { toggleFavorite, isFavorite, isCustomer } = useFavorites();
    const fav = isFavorite(item.id);

    const image = item.featured_image || '';
    const type = item.category?.name || 'Product';
    const price = item.price ? (item.price.toString().includes('FCFA') ? item.price : `${Number(item.price).toLocaleString()} FCFA`) : 'Price on request';

    return (
        <Card className="overflow-hidden border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group flex flex-col h-full rounded-[20px] p-2.5">
            {/* Image Container */}
            <div className="relative aspect-16/10 w-full overflow-hidden bg-gray-100 rounded-[15px]">
                {image && (
                    <Image
                        src={image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                <Badge className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm">
                    {type}
                </Badge>

                {isCustomer && (
                    <button
                        onClick={() => toggleFavorite({ ...item, image: image })}
                        className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-colors ${fav ? "bg-[#F97316] text-white" : "bg-white/95 text-[#F97316] hover:bg-white"}`}
                    >
                        <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {/* Content */}
            <CardContent className="flex flex-col flex-1 p-3.5 pt-4">
                <h3 className="line-clamp-2 text-[14.5px] font-semibold text-gray-800 leading-snug mb-3">
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
                        <span className="text-[13.5px] font-bold text-[#F97316]">
                            {price}
                        </span>
                    </div>

                    <Link href={getDetailLink(item)} className="block w-full">
                        <Button
                            variant={item.is_featured ? "default" : "outline"}
                            className={`w-full rounded-xl font-semibold text-[13px] h-10 transition-all ${item.is_featured
                                ? "bg-[#2A8E8E] hover:bg-[#1D7E87] text-white border-0"
                                : "bg-white border-gray-100 text-gray-600 hover:bg-[#1D7E87] hover:text-white hover:border-[#1D7E87]"
                                }`}
                        >
                            View Details
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default function SellerDetails({ data }: { data: any }) {
    const seller = data.seller;
    const listings = data.listings || [];

    const profilePhoto = seller?.profile_photo;
    const isValidUrl = profilePhoto && (profilePhoto.startsWith('http://') || profilePhoto.startsWith('https://') || profilePhoto.startsWith('/'));
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(seller?.full_name || 'User')}&background=random`;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left side: Seller Info */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-[32px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden sticky top-24">
                        <CardContent className="p-8">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 border-4 border-white shadow-lg">
                                    <Image
                                        src={isValidUrl ? profilePhoto : fallbackUrl}
                                        alt={seller?.full_name || 'Seller'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h2 className="text-2xl font-extrabold text-[#1B2232] mb-1">{seller?.full_name}</h2>
                                <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                                    <Calendar className="w-4 h-4" /> 
                                    Joined {seller?.created_at ? new Date(seller.created_at).toLocaleDateString() : 'recently'}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                                    <span className="text-gray-500 font-medium">Total Listings</span>
                                    <span className="font-bold text-[#2A8E8E] text-lg">{listings.length}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {seller?.whatsapp_link && (
                                    <Button 
                                        onClick={() => window.open(seller.whatsapp_link, '_blank')}
                                        className="w-full h-14 rounded-2xl bg-[#2A8E8E] hover:bg-[#1D7E87] text-white font-bold text-lg shadow-lg shadow-[#2A8E8E]/20"
                                    >
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        WhatsApp
                                    </Button>
                                )}
                                {seller?.phone_number && (
                                    <Button 
                                        onClick={() => window.open(`tel:${seller.phone_number}`, '_self')}
                                        variant="outline" 
                                        className="w-full h-14 rounded-2xl border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-50"
                                    >
                                        <Phone className="mr-2 h-5 w-5 text-[#2A8E8E]" />
                                        Call Seller
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right side: Listings Grid */}
                <div className="lg:col-span-8">
                    <div className="mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-3xl font-extrabold text-[#1B2232]">
                            Seller's Listings
                        </h2>
                        <p className="text-gray-500 mt-2">Browse all items listed by {seller?.full_name}</p>
                    </div>

                    {listings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {listings.map((item: any) => (
                                <ListingCard key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[32px] border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                            <p className="text-gray-500 text-lg">No listings found for this seller.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
