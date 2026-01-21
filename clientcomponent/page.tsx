"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

const SearchHero: React.FC = () => {
  const [service, setService] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-3xl md:rounded-[20px] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
        
        {/* 1. Service Input Section */}
        <div className="flex-[1.5] flex items-center px-5 md:px-6 py-4 md:py-5 gap-3 border-b md:border-b-0 md:border-r border-gray-100 active:bg-slate-50/50 transition-colors">
          <Search className="w-5 h-5 md:w-6 h-6 text-[#ff6b3d] shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] md:hidden font-bold text-gray-400 uppercase tracking-wider mb-0.5">Find Service</span>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="What service do you need?"
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm md:text-base bg-transparent"
            />
          </div>
        </div>

        {/* 2. Location Section */}
        <div className="flex-1 flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 cursor-pointer hover:bg-slate-50/50 transition-colors min-w-0">
          <MapPin className="w-5 h-5 text-[#227c85] shrink-0" />
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] md:text-sm font-bold text-gray-900 leading-tight">
              Location
            </span>
            <span className="text-xs text-slate-500 truncate">Dakar, Senegal</span>
          </div>
        </div>

        {/* 3. Categories Section & Search Button */}
        <div className="flex flex-[1.2] items-center justify-between gap-4 px-5 md:px-6 py-4">
          <div className="flex flex-col cursor-pointer group flex-1">
            <span className="text-[10px] md:text-sm font-bold text-gray-900 leading-tight">
              Categories
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 group-hover:text-[#227c85] transition-colors line-clamp-1">
                All Categories
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#227c85] transition-colors" />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#227c85] hover:bg-[#1a636a] text-white flex items-center justify-center gap-2 px-5 md:px-8 py-3.5 rounded-2xl md:rounded-xl transition-all duration-300 shadow-md hover:shadow-[#227c85]/25 active:scale-95">
            <Search className="w-4 h-4 md:w-5 h-5" />
            <span className="font-semibold text-sm md:text-base whitespace-nowrap">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
