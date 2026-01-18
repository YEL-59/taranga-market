import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, ArrowRight, Calendar, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock data for featured items
const featuredItems = [
    {
        id: 1,
        type: 'Service',
        image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c77718e?q=80&w=600&auto=format&fit=crop', // Plumber
        title: 'Plumbing & Emergency Repair Service',
        location: 'Dakar',
        price: '15,000 XOF',
    },
    {
        id: 2,
        type: 'Product',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', // Tech/Phone
        title: 'iPhone 14 Pro Max 256GB - Brand New Sealed',
        location: 'Dakar',
        price: '15,000 XOF',
    },
    {
        id: 3,
        type: 'Vehicle',
        image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600&auto=format&fit=crop', // Car
        title: 'Toyota Corolla 2018 - Excellent condition',
        location: 'Dakar',
        price: '15,000 XOF',
        meta: { year: 2018, mileage: '65,000 km' },
        featured: true
    },
    {
        id: 4,
        type: 'Property',
        image: 'https://images.unsplash.com/photo-1600596542815-2a4d9f6fac86?q=80&w=600&auto=format&fit=crop', // House
        title: 'Professional Plumbing Services',
        location: 'Dakar',
        price: '15,000 XOF',
    },
];

const FeaturedCard = ({ item }: { item: typeof featuredItems[0] }) => {
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
                <button className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white/95 text-[#F97316] shadow-sm transition-colors hover:bg-white">
                    <Heart className="h-4 w-4" strokeWidth={2.5} />
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
                </div>
            </CardContent>
        </Card>
    );
};

const Featured = () => {
    return (
        <section className="w-full py-16 bg-[#FAFAFA]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Featured Listing
                    </h2>
                    <a href="#" className="group flex items-center gap-1.5 text-[15px] font-semibold text-gray-800 transition-colors hover:text-gray-600">
                        View all 
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredItems.map((item) => (
                        <FeaturedCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;

