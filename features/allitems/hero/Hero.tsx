import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920&auto=format&fit=crop"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4 flex flex-col items-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 tracking-tight">
                    Find your Need
                </h1>

                {/* Search Bar */}
                <div className="w-full max-w-4xl bg-white rounded-2xl md:rounded-full shadow-2xl p-2 flex flex-col md:flex-row items-center gap-2 md:gap-0">
                    {/* Select Category */}
                    <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
                        <span className="text-[13px] font-bold text-gray-900 mb-0.5">Select category</span>
                        <div className="flex items-center justify-between cursor-pointer group">
                            <span className="text-gray-400 text-[14px]">All category</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#1D7E87] transition-colors" />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex-1 w-full px-6 py-3 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
                        <span className="text-[13px] font-bold text-gray-900 mb-0.5">Location</span>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#1D7E87]" strokeWidth={2.5} />
                            <input 
                                type="text" 
                                placeholder="Enter city or area..." 
                                className="w-full outline-none text-[14px] text-gray-600 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="w-full md:w-auto p-1">
                        <button className="w-full md:w-auto bg-[#1D7E87] hover:bg-[#16636a] text-white px-10 py-3.5 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#1D7E87]/20">
                            <Search className="w-5 h-5" />
                            <span>Search</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
