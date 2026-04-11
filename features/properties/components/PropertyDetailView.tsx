"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, AlertTriangle, ArrowLeft, Bed, Bath, Wifi } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PropertyDetailViewProps {
    item: any;
    onBack: () => void;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ item, onBack }) => {
    const mainImg = item.featured_image ? (item.featured_image.startsWith('http') ? item.featured_image : `https://raymondred.thesyndicates.team/${item.featured_image}`) : (item.image || '');
    const [mainImage, setMainImage] = useState(mainImg);
    const city = item.location || item.city || 'Senegal';
    const priceStr = item.price ? (item.price.toString().includes('CFA') ? item.price : `${Number(item.price).toLocaleString()} CFA`) : 'Price on request';
    
    // safe fallbacks
    const meta = item.meta || { bedrooms: 0, bathrooms: 0 };
    const seller = item.seller || { name: 'Verified Seller', since: 'Member since 2024', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop' };
    const thumbs = Array.isArray(item.thumbs) ? item.thumbs.map((t: string) => t.startsWith('http') ? t : `https://raymondred.thesyndicates.team/${t}`) : [mainImg];

    return (
        <div className="w-full py-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center gap-2 text-[#2A8E8E] font-semibold mb-8 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to listings</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                            {mainImage && <Image src={mainImage} alt={item.title || "Property"} fill className="object-cover transition-all duration-300" />}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {thumbs.slice(0, 4).map((thumb: string, idx: number) => (
                                <div 
                                    key={idx} 
                                    onClick={() => setMainImage(thumb)}
                                    className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-pointer transition-all hover:opacity-80 ${
                                        mainImage === thumb ? 'ring-2 ring-[#2A8E8E]' : 'border border-gray-100'
                                    }`}
                                >
                                    <Image src={thumb} alt={`thumb-${idx}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6 lg:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#1B2232] mb-3 leading-tight">{item.title}</h1>
                                <div className="flex items-center gap-2 text-gray-400 text-[14px]">
                                    <MapPin className="w-4 h-4" />
                                    <span>{city}</span>
                                </div>
                            </div>
                            <span className="text-2xl lg:text-3xl font-bold text-[#F97316] whitespace-nowrap">{priceStr}</span>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100/50">
                                <Bed className="w-6 h-6 text-[#1D7E87]" />
                                <span className="text-[12px] text-gray-400 uppercase font-bold tracking-wider">Bedrooms</span>
                                <span className="text-[16px] font-bold text-gray-700">{meta.bedrooms}</span>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100/50">
                                <Bath className="w-6 h-6 text-[#1D7E87]" />
                                <span className="text-[12px] text-gray-400 uppercase font-bold tracking-wider">Bathrooms</span>
                                <span className="text-[16px] font-bold text-gray-700">{meta.bathrooms}</span>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100/50">
                                <Wifi className="w-6 h-6 text-[#1D7E87]" />
                                <span className="text-[12px] text-gray-400 uppercase font-bold tracking-wider">WiFi</span>
                                <span className="text-[16px] font-bold text-gray-700">Yes</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-[#1B2232]">Description</h3>
                            <div className="text-gray-500 text-[15px] leading-relaxed">
                                {item.description}
                                <button className="ml-2 text-[#1D7E87] font-bold hover:underline">Read More</button>
                            </div>
                        </div>
                    </Card>

                    {/* Safety Tips Section */}
                    <Card className="rounded-2xl border-gray-100 bg-gray-50/50 p-6 lg:p-8">
                        <h3 className="text-xl font-bold text-[#1B2232] mb-8">Safety tips</h3>
                        <ul className="space-y-5">
                            {[
                                'Do not pay in advance, even for delivery.',
                                'Meet the seller in a safe public place.',
                                'Inspect the item and make sure it\'s exactly what you want.',
                                'Make sure that the packaged item is the one you inspected.',
                                'Only pay if you are satisfied.'
                            ].map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-4 text-gray-500 text-[14px]">
                                    <div className="w-2 h-2 rounded-full bg-[#2A8E8E] mt-1.5 shrink-0" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Sidebar Section */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6 lg:p-8 sticky top-24">
                        <div className="flex items-center gap-5 mb-10">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-sm">
                                {seller.image && <Image src={seller.image} alt={seller.name} fill className="object-cover" />}
                            </div>
                            <div>
                                <h3 className="text-[18px] font-extrabold text-[#1B2232]">{seller.name}</h3>
                                <p className="text-gray-400 text-[13px]">{seller.since}</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <h4 className="text-[16px] font-bold text-[#1B2232]">Contact the seller</h4>
                            <div className="flex items-center gap-4 bg-[#EBF1FF] rounded-2xl p-4 text-[#2563EB] border border-[#2563EB]/10 transition-colors hover:bg-[#E1E9FF]">
                                <Phone className="w-5 h-5" />
                                <span className="font-extrabold text-[16px]">544 *******</span>
                            </div>
                            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[#10B981]/20 transition-all hover:scale-[1.02]">
                                <MessageCircle className="w-6 h-6" />
                                <span className="text-[16px]">WhatsApp</span>
                            </Button>
                            <button className="w-full flex items-center justify-center gap-3 text-white bg-[#1B2232] hover:bg-black font-bold h-14 rounded-2xl transition-all shadow-lg hover:scale-[1.02]">
                                <AlertTriangle className="w-5 h-5 text-orange-400" />
                                <span className="text-[16px]">Report this Ad</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailView;
