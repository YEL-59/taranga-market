"use client";

import React from 'react';
import { Search, ChevronDown, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { filterOptions } from '../data/vehicles';

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

    const handleTransmissionChange = (type: string) => {
        const newTrans = filters.transmission.includes(type)
            ? filters.transmission.filter((t: string) => t !== type)
            : [...filters.transmission, type];
        setFilters({ ...filters, transmission: newTrans });
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
                            {filterOptions.cities.map(city => (
                                <option key={city} value={city}>{city}</option>
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

                {/* Make */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Make</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.make}
                            onChange={(e) => handleSelectChange('make', e.target.value)}
                        >
                            <option value="">All Makes</option>
                            {filterOptions.makes.map(make => (
                                <option key={make} value={make}>{make}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Model */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Model</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.model || ""}
                            onChange={(e) => handleSelectChange('model', e.target.value)}
                        >
                            <option value="">All Models</option>
                            {filterOptions.models.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Year */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Year</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.year || ""}
                            onChange={(e) => handleSelectChange('year', e.target.value)}
                        >
                            <option value="">All Years</option>
                            {filterOptions.years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Mileage */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Mileage (km)</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.mileage || ""}
                            onChange={(e) => handleSelectChange('mileage', e.target.value)}
                        >
                            <option value="">All Mileage Ranges</option>
                            {filterOptions.mileages.map(mileage => (
                                <option key={mileage} value={mileage}>{mileage}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Transmission */}
                <div className="flex flex-col gap-3">
                    <label className="text-[14px] font-semibold text-gray-700">Transmission</label>
                    <div className="flex flex-col gap-3">
                        {['Automatic', 'Manual'].map((type) => (
                            <div key={type} className="flex items-center gap-3">
                                <div className="relative flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={type} 
                                        checked={filters.transmission.includes(type)}
                                        onChange={() => handleTransmissionChange(type)}
                                        className="w-5 h-5 rounded border-gray-300 text-[#1D7E87] focus:ring-[#1D7E87] cursor-pointer accent-[#1D7E87]" 
                                    />
                                </div>
                                <label htmlFor={type} className="text-[14px] text-gray-600 cursor-pointer font-medium">{type}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fuel Type */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-[14px] font-semibold text-gray-700">Fuel Type</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-[14px] text-gray-600 outline-none appearance-none cursor-pointer focus:border-[#1D7E87] transition-colors"
                            value={filters.fuelType || ""}
                            onChange={(e) => handleSelectChange('fuelType', e.target.value)}
                        >
                            <option value="">All Fuel Types</option>
                            {filterOptions.fuelTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
