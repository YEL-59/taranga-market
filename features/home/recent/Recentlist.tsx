"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, ArrowRight, Calendar, Gauge, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';
import { useRecentProducts } from '@/hooks/useRecentProducts';
import { useTranslations } from "next-intl";

const getDetailLink = (item: any) => {
    return `/featured-details?id=${item.id}`;
};

const ListingCard = ({ item }: { item: any }) => {
    const { toggleFavorite, isFavorite, isCustomer } = useFavorites();
    const ct = useTranslations("Common");
    const fav = isFavorite(item.id);


    console.log(item)

    const image = item.featured_image || '';
    const type = item.category?.name || 'Product';
    const price = item.price ? (item.price.toString().includes('XOF') ? item.price : `${Number(item.price).toLocaleString()} XOF`) : 'Price on request';

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

                {/* Badge */}
                <Badge
                    className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm"
                >
                    {type}
                </Badge>
               {
                item.is_featured && (
                    <Badge
                        className="absolute right-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold border border-gray-200 bg-white/95 text-gray-800 hover:bg-white shadow-sm"
                    >
                        {ct("featured")}
                    </Badge>
                )
               }

                {/* Heart Button - Only for Customers */}
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

                {/* Additional Meta for Vehicle (if available in attributes or meta) */}
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
                            <span className="truncate">{item.city} , {item.state}</span>
                        </div>
                        <span className="text-[13.5px] font-bold text-[#F97316]">
                            {price}
                        </span>
                    </div>

                    <Link href={getDetailLink(item)} className="block w-full">
                        <Button
                            variant={item.is_featured ? "default" : "outline"}
                            className={`w-full rounded-xl font-semibold text-[13px] h-10 transition-all bg-white border-gray-100 text-gray-600 hover:bg-[#1D7E87] hover:text-white hover:border-[#1D7E87] cursor-pointer`}
                        >
                            {ct("viewDetails")}
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

const Recentlist = ({ initialData = [] }: { initialData?: any[] }) => {
    const t = useTranslations("Recent");
    const ct = useTranslations("Common");
    const { recentProducts, isLoading, error } = useRecentProducts(initialData);

    if (error) {
        return (
            <section className="w-full py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-red-500 font-medium">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 ">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {t("title")}
                    </h2>
                    <Link href="/all-items" className="group flex items-center gap-1.5 text-[15px] font-semibold text-gray-800 transition-colors hover:text-gray-600">
                        {t("viewAll")}
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-[#2A8E8E]" />
                    </div>
                ) : recentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                        {recentProducts.slice(0, 8).map((item, index) => (
                            <ListingCard key={`${item.id}-${index}`} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        {t("noProducts")}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Recentlist;
