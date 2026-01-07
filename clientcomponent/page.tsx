"use client";

import React, { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

const SearchHero: React.FC = () => {
  const [service, setService] = useState("");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Container */}
      <div className="flex flex-col md:flex-row items-center bg-white rounded-[20px] shadow-lg border border-gray-100 overflow-hidden">
        {/* 1. Service Input Section */}
        <div className="flex flex-1 items-center px-6 py-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
          <Search className="w-6 h-6 text-[#ff6b3d] shrink-0" />
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="What service do you need?"
            className="w-full outline-none text-gray-600 placeholder:text-gray-400 font-medium"
          />
        </div>

        {/* 2. Location Section */}
        <div className="flex flex-1 items-center px-6 py-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 min-w-[200px]">
          <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              Location
            </span>
            <span className="text-xs text-slate-500">Senegal</span>
          </div>
        </div>

        {/* 3. Categories Section */}
        <div className="flex flex-1 items-center justify-between px-6 py-4 min-w-[220px]">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              Categories
            </span>
            <div className="flex items-center gap-1 cursor-pointer group">
              <span className="text-xs text-slate-500 group-hover:text-[#227c85] transition-colors">
                All Categories
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#227c85]" />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-[#227c85] hover:bg-[#1a636a] text-white flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#227c85]/20">
            <Search className="w-5 h-5" />
            <span className="font-semibold tracking-wide">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
