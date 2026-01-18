"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VehicleDetailViewProps {
    item: any;
    onBack: () => void;
}

const VehicleDetailView: React.FC<VehicleDetailViewProps> = ({ item, onBack }) => {
    const [mainImage, setMainImage] = useState(item.image);

    return (
        <div className="w-full py-8 animate-in fade-in duration-500">
            <button onClick={onBack} className="flex items-center gap-2 text-[#2A8E8E] font-semibold mb-8 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to listings</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-4">
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                            <Image src={mainImage} alt={item.title} fill className="object-cover transition-all duration-300" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[item.image, ...item.thumbs.slice(1)].map((thumb: string, idx: number) => (
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

                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                            <div>
                                <h1 className="text-xl md:text-2xl font-extrabold text-[#1B2232] mb-2">{item.title}</h1>
                                <div className="flex items-center gap-2 text-gray-400 text-[13.5px]">
                                    <MapPin className="w-4 h-4" />
                                    <span>{item.location}</span>
                                </div>
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-[#F97316]">{item.price}</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
                            {Object.entries(item.meta).map(([key, value]) => (
                                <div key={key} className="flex flex-col bg-gray-50/80 rounded-lg p-2 items-center text-center">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">{key}</span>
                                    <span className="text-[12px] font-bold text-gray-700 truncate w-full">{value as string}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800">Description</h3>
                            <p className="text-gray-500 text-[14px] leading-relaxed">{item.description}</p>
                        </div>
                    </Card>

                    <Card className="rounded-2xl border-gray-100 bg-gray-50/50 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Safety tips</h3>
                        <ul className="space-y-4">
                            {[
                                'Do not pay in advance, even for delivery.',
                                'Meet the seller in a safe public place.',
                                'Inspect the item and make sure it\'s exactly what you want.',
                                'Only pay if you are satisfied.'
                            ].map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-500 text-[13.5px]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A8E8E] mt-2 shrink-0" />
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card className="rounded-2xl border-gray-100 shadow-sm p-6 sticky top-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 border">
                                <Image src={item.seller.image} alt={item.seller.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="text-[16px] font-bold text-[#1B2232]">{item.seller.name}</h3>
                                <p className="text-gray-400 text-[12px]">{item.seller.since}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[15px] font-bold text-[#1B2232]">Contact the seller</h4>
                            <div className="flex items-center gap-3 bg-[#EBF1FF] rounded-xl p-3.5 text-[#2563EB]">
                                <Phone className="w-5 h-5" />
                                <span className="font-bold">544 *******</span>
                            </div>
                            <Button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                <span>WhatsApp</span>
                            </Button>
                            <button className="w-full flex items-center justify-center gap-2 text-white bg-[#1B2232] hover:bg-black font-bold h-12 rounded-xl transition-all">
                                <AlertTriangle className="w-4 h-4 text-orange-400" />
                                <span>Report this Ad</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailView;
