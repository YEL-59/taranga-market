"use client";

import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { serviceFilterOptions } from '../data/services';

interface FilterSidebarProps {
    filters: any;
    setFilters: (filters: any) => void;
    onReset: () => void;
    className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, onReset, className }) => {
    const handleSelectChange = (key: string, value: string) => {
        setFilters({ ...filters, [key]: value });
    };

    return (
        <div className={className || "w-full lg:w-[320px] bg-white border border-gray-100 rounded-[24px] p-7 shadow-sm sticky top-24 h-fit"}>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 font-bold text-[#1B2232] text-[18px]">
                    <Search className="w-5 h-5 text-gray-400" />
                    <span>Filters</span>
                </div>
                <button onClick={onReset} className="text-[13px] text-[#F97316] font-medium hover:underline flex items-center gap-1.5 transition-all">
                    Reset
                </button>
            </div>

            <div className="flex flex-col gap-6">
                {/* City */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">City</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.city}
                            onChange={(e) => handleSelectChange('city', e.target.value)}
                        >
                            <option value="">All Cities</option>
                            {serviceFilterOptions.cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Service Category */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Services</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.category}
                            onChange={(e) => handleSelectChange('category', e.target.value)}
                        >
                            <option value="">All Services</option>
                            {serviceFilterOptions.categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Price Range */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Price</label>
                    <div className="flex gap-3">
                        <input 
                            type="number" 
                            placeholder="Min" 
                            className="w-1/2 border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none focus:border-[#1D7E87] transition-colors"
                            value={filters.minPrice}
                            onChange={(e) => handleSelectChange('minPrice', e.target.value)}
                        />
                        <input 
                            type="number" 
                            placeholder="Max" 
                            className="w-1/2 border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none focus:border-[#1D7E87] transition-colors"
                            value={filters.maxPrice}
                            onChange={(e) => handleSelectChange('maxPrice', e.target.value)}
                        />
                    </div>
                </div>

                <Button className="w-full bg-[#1D7E87] hover:bg-[#16636a] text-white font-bold h-12 rounded-xl transition-all shadow-md mt-4 text-[15px]">
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterSidebar;
