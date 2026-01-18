"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, ArrowRight, Calendar, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useFavorites } from '@/context/FavoritesContext';

// Mock data for recent items
const recentItems = [
    {
        id: 12, // Vehicle
        type: 'Vehicle',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=600&auto=format&fit=crop',
        title: 'Tesla Model 3 Long Range 2021',
        location: 'Dakar',
        price: '28,000,000 XOF',
        meta: { year: '2021', mileage: '20,000 km' }
    },
    {
        id: 103, // Phone
        type: 'Product',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop',
        title: 'Samsung Galaxy S23 Ultra - Phantom Black',
        location: 'Dakar',
        price: '700,000 XOF',
    },
    {
        id: 2, // Property
        type: 'Property',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop',
        title: 'Luxury Villa with Swimming Pool',
        location: 'Mbour, Saly',
        price: '450,000 XOF/month',
    },
    {
        id: 206, // Service
        type: 'Service',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&auto=format&fit=crop',
        title: 'Web Design & Development',
        location: 'Remote',
        price: '150,000 XOF',
    },
    {
        id: 301, // Job
        type: 'Job',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
        title: 'Senior Software Developer - Full Stack',
        location: 'Dakar',
        price: '1,500,000 CFA',
    },
    {
        id: 7, // Vehicle
        type: 'Vehicle',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=600&auto=format&fit=crop',
        title: 'Range Rover Sport 2020 HSE Dynamic',
        location: 'Dakar',
        price: '48,000,000 XOF',
        meta: { year: '2020', mileage: '35,000 km' }
    },
    {
        id: 105, // Phone (Product)
        type: 'Product',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=600&auto=format&fit=crop',
        title: 'Sony PlayStation 5 Console',
        location: 'Dakar',
        price: '350,000 XOF',
    },
    {
        id: 4, // Property
        type: 'Property',
        image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=600&auto=format&fit=crop',
        title: 'Seaside Condo for Sale',
        location: 'Mamelles, Dakar',
        price: '120,000,000 XOF',
    },
];

const getDetailLink = (item: any) => {
    switch (item.type) {
        case 'Vehicle':
            return `/vehicles?id=${item.id}`;
        case 'Product':
            return `/products?id=${item.id}`;
        case 'Service':
            return `/services?id=${item.id}`;
        case 'Property':
            return `/properties?id=${item.id}`;
        case 'Job':
            return `/jobs?id=${item.id}`;
        default:
            return `/all-items?id=${item.id}`;
    }
};

const ListingCard = ({ item }: { item: any }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const fav = isFavorite(item.id);

    return (
        <Card className="overflow-hidden border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group flex flex-col h-full rounded-[20px] p-2.5">
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 rounded-[15px]">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge */}
                <Badge 
                    className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm"
                >
                    {item.type}
                </Badge>
                
                {/* Heart Button */}
                <button 
                    onClick={() => toggleFavorite({ ...item, image: item.image })}
                    className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-colors ${
                        fav ? "bg-[#F97316] text-white" : "bg-white/95 text-[#F97316] hover:bg-white"
                    }`}
                >
                    <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} strokeWidth={2.5} />
                </button>
            </div>

            {/* Content */}
            <CardContent className="flex flex-col flex-1 p-3.5 pt-4">
                <h3 className="line-clamp-2 text-[14.5px] font-semibold text-gray-800 leading-snug mb-3">
                    {item.title}
                </h3>

                {/* Additional Meta for Vehicle */}
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
                            {item.price}
                        </span>
                    </div>

                    <Link href={getDetailLink(item)} className="block w-full">
                        <Button 
                            variant={item.featured ? "default" : "outline"} 
                            className={`w-full rounded-xl font-semibold text-[13px] h-10 transition-all ${
                                item.featured 
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

const Recentlist = () => {
    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-4 ">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Recent Listing
                    </h2>
                    <Link href="/all-items" className="group flex items-center gap-1.5 text-[15px] font-semibold text-gray-800 transition-colors hover:text-gray-600">
                        View all 
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {recentItems.map((item) => (
                        <ListingCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Recentlist;
