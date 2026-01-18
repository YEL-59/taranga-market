"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, Calendar, Gauge } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/context/FavoritesContext';

interface VehicleCardProps {
    item: any;
    onClick: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ item, onClick }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const fav = isFavorite(item.id);

    return (
        <Card 
            onClick={onClick}
            className="overflow-hidden border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group flex flex-col h-full rounded-[20px] p-2.5 cursor-pointer"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 rounded-[15px]">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <Badge className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm">Vehicle</Badge>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item);
                    }}
                    className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-colors ${
                        fav ? "bg-[#F97316] text-white" : "bg-white/95 text-[#F97316] hover:bg-white"
                    }`}
                >
                    <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} />
                </button>
            </div>

            <CardContent className="flex flex-col flex-1 p-3.5 pt-4">
                <h3 className="line-clamp-2 text-[14.5px] font-semibold text-gray-800 leading-snug mb-3 hover:text-[#1D7E87] transition-colors">
                    {item.title}
                </h3>
                <div className="mb-4 flex items-center gap-4 text-[12px] text-gray-500">
                    <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gray-400" /><span>{item.meta.year}</span></div>
                    <div className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-gray-400" /><span>{item.meta.mileage}</span></div>
                </div>
                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="truncate">{item.location}</span>
                        </div>
                        <span className="text-[13.5px] font-bold text-[#F97316] whitespace-nowrap">{item.price}</span>
                    </div>
                    <Button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick();
                        }}
                        variant="outline"
                        className="w-full rounded-xl font-semibold text-[13px] h-10 transition-all bg-white border-gray-100 text-gray-600 hover:bg-[#1D7E87] hover:text-white hover:border-[#1D7E87]"
                    >
                        View Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;
