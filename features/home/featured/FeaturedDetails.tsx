"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFeaturedProductDetails } from '@/hooks/useFeaturedProductDetails';
import { Loader2, MapPin, Calendar, Gauge, ChevronLeft, Heart, Share2, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/context/FavoritesContext';

interface FeaturedDetailsProps {
    initialData?: any;
}

const FeaturedDetails = ({ initialData }: FeaturedDetailsProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const { productDetails, isLoading, error } = useFeaturedProductDetails(id || undefined, initialData);
    const { toggleFavorite, isFavorite, isCustomer } = useFavorites();
    const [activeImage, setActiveImage] = useState<string>('');

    const isFav = id ? isFavorite(id) : false;

    useEffect(() => {
        if (productDetails?.featured_image) {
            setActiveImage(productDetails.featured_image);
        }
    }, [productDetails]);

    if (isLoading && !productDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-[#2A8E8E] mb-4" />
                <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] container mx-auto px-4">
                <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center max-w-md">
                    <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
                    <p className="mb-6">{error}</p>
                    <Button onClick={() => router.back()} className="bg-red-600 hover:bg-red-700 text-white border-0">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    if (!productDetails) {
        return null;
    }

    const item = productDetails;
    const price = item.price ? (item.price.toString().includes('XOF') ? item.price : `${Number(item.price).toLocaleString()} XOF`) : 'Price on request';

    // Combine featured image and gallery images for the thumbnails
    const allImages = [
        { id: 'featured', image_path: item.featured_image },
        ...(item.images || [])
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-20">
            {/* Navigation Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5" />
                        <span>Back</span>
                    </button>
                    <div className="flex items-center gap-3">
                        {/* <button className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
                            <Share2 className="h-5 w-5" />
                        </button> */}
                        {isCustomer && (
                            <button
                                onClick={() => toggleFavorite(item)}
                                className={cn(
                                    "p-2.5 rounded-xl transition-all duration-300",
                                    isFav ? "bg-red-50 text-red-500" : "hover:bg-gray-100 text-gray-600"
                                )}
                            >
                                <Heart className={cn("h-5 w-5", isFav && "fill-current")} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Images & Main Info */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Main Image Display */}
                        <div className="relative aspect-video w-full rounded-[32px] overflow-hidden bg-white shadow-sm border border-gray-100">
                            {activeImage && (
                                <Image
                                    src={activeImage}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-500"
                                    priority
                                />
                            )}
                            {item.is_featured && (
                                <Badge className="absolute top-6 left-6 bg-[#2A8E8E] text-white px-4 py-1.5 rounded-full text-sm font-bold border-0 shadow-lg">
                                    Featured
                                </Badge>
                            )}
                        </div>

                        {/* Image Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                                {allImages.map((img: any, idx: number) => (
                                    <div
                                        key={img.id || idx}
                                        onClick={() => setActiveImage(img.image_path)}
                                        className={cn(
                                            "relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105",
                                            activeImage === img.image_path ? "border-[#2A8E8E] ring-2 ring-[#2A8E8E]/20" : "border-gray-100 opacity-70 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={img.image_path}
                                            alt={`${item.title} gallery ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Title & Stats */}
                        <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-1 font-semibold border-0">
                                    {item.category?.name || 'Item'}
                                </Badge>
                                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                    <Calendar className="h-4 w-4" />
                                    <span>Added {new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1B2232] mb-4 leading-tight">
                                {item.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-[#2A8E8E]" />
                                    </div>
                                    <span className="font-medium">{item.location}</span>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 w-full mb-8" />

                            <h3 className="text-xl font-bold text-[#1B2232] mb-4">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                                {item.description}
                            </p>
                        </div>

                        {/* Attributes/Specs if they are like the response example */}
                        {item.values && item.values.length > 0 && (
                            <div className="bg-white p-8 rounded-[32px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
                                <h3 className="text-xl font-bold text-[#1B2232] mb-6">Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.values.map((v: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                                            <span className="text-gray-500 font-medium">{v.value.split(':')[0]}</span>
                                            <span className="font-bold text-[#1B2232]">{v.value.split(':')[1] || v.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Pricing & Seller Info */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Price Card */}
                        <Card className="rounded-[32px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                            <CardContent className="p-8">
                                <div className="mb-6">
                                    <span className="text-sm text-gray-400 font-medium block mb-1">Price</span>
                                    <div className="text-4xl font-extrabold text-[#F97316]">
                                        {price}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Button className="w-full h-14 rounded-2xl bg-[#2A8E8E] hover:bg-[#1D7E87] text-white font-bold text-lg shadow-lg shadow-[#2A8E8E]/20">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Message Seller
                                    </Button>
                                    <Button variant="outline" className="w-full h-14 rounded-2xl border-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-50">
                                        <Phone className="mr-2 h-5 w-5 text-[#2A8E8E]" />
                                        Call Seller
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seller Card */}
                        {item.user && (
                            <Card className="rounded-[32px] border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                                <CardContent className="p-8">
                                    <h3 className="text-xl font-bold text-[#1B2232] mb-6">Seller Information</h3>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                                            {(() => {
                                                const profilePhoto = item.user.profile_photo;
                                                const isValidUrl = profilePhoto && (profilePhoto.startsWith('http://') || profilePhoto.startsWith('https://') || profilePhoto.startsWith('/'));
                                                const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.user.first_name + ' ' + (item.user.last_name || ''))}&background=random`;
                                                
                                                return (
                                                    <Image
                                                        src={isValidUrl ? profilePhoto : fallbackUrl}
                                                        alt={item.user.first_name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                );
                                            })()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-[#1B2232]">{item.user.first_name} {item.user.last_name}</h4>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{item.user.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Joined</span>
                                            <span className="font-bold text-[#1B2232]">{new Date(item.user.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-400">Total Listings</span>
                                            <span className="font-bold text-[#1B2232]">{item.user.limit || 0}</span>
                                        </div>
                                    </div>
                                    {/* <Button variant="ghost" className="w-full mt-6 text-[#2A8E8E] font-bold hover:bg-[#2A8E8E]/5">
                                        View Seller Profile
                                    </Button> */}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedDetails;
