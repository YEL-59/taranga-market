"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategoriesService } from "@/services/listing";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";

const locations = [
  "All Locations",
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Narayanganj"
];

const SearchHero: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState({ id: "all", name: "All Categories" });
  
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const locationRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategoriesService();
      if (res.success && res.data) {
        setCategories([{ id: "all", name: "All Categories" }, ...res.data]);
      }
    };
    fetchCategories();

    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location !== "All Locations") params.set("location", location);
    if (category.id !== "all") params.set("category", category.id.toString());
    
    router.push(`/all-items?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      <form 
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-3xl md:rounded-[20px] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-visible transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
      >
        
        {/* 1. Query Input Section */}
        <div className="flex-[1.5] flex items-center px-5 md:px-6 py-4 md:py-5 gap-3 border-b md:border-b-0 md:border-r border-gray-100 active:bg-slate-50/50 transition-colors">
          <Search className="w-5 md:w-6 text-[#ff6b3d] shrink-0" />
          <div className="flex flex-col w-full">
            <span className="text-[10px] md:hidden font-bold text-gray-400 uppercase tracking-wider mb-0.5">Find Service</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm md:text-base bg-transparent"
            />
          </div>
        </div>

        {/* 2. Location Section */}
        <div 
          ref={locationRef}
          className="relative flex-1 flex items-center px-5 md:px-6 py-3 md:py-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 cursor-pointer hover:bg-slate-50/50 transition-colors min-w-0"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
        >
          <MapPin className="w-5 text-[#227c85] shrink-0" />
          <div className="flex flex-col overflow-hidden w-full">
            <span className="text-[10px] md:text-sm font-bold text-gray-900 leading-tight">
              Location
            </span>
            <span className="text-xs text-slate-500 truncate flex items-center justify-between">
              {location}
              <ChevronDown className={cn("w-3 h-3 transition-transform", isLocationOpen && "rotate-180")} />
            </span>
          </div>

          <AnimatePresence>
            {isLocationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <ReactLenis options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }} className="max-h-[300px] overflow-y-auto py-2 w-full">
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      className="px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-gray-700 flex items-center justify-between group"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(loc);
                        setIsLocationOpen(false);
                      }}
                    >
                      {loc}
                      {location === loc && <Check className="w-4 h-4 text-[#227c85]" />}
                    </div>
                  ))}
                </ReactLenis>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. Categories Section & Search Button */}
        <div ref={categoryRef} className="relative flex flex-[1.2] items-center justify-between gap-4 px-5 md:px-6 py-4">
          <div 
            className="flex flex-col cursor-pointer group flex-1 min-w-0"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <span className="text-[10px] md:text-sm font-bold text-gray-900 leading-tight">
              Categories
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 group-hover:text-[#227c85] transition-colors line-clamp-1">
                {category.name}
              </span>
              <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 group-hover:text-[#227c85] transition-colors", isCategoryOpen && "rotate-180")} />
            </div>
          </div>

          <AnimatePresence>
            {isCategoryOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-1/4 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                <ReactLenis options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }} className="max-h-[300px] overflow-y-auto py-2 w-full">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-gray-700 flex items-center justify-between group"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategory({ id: cat.id, name: cat.name });
                          setIsCategoryOpen(false);
                        }}
                      >
                        {cat.name}
                        {category.id === cat.id && <Check className="w-4 h-4 text-[#227c85]" />}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-xs text-gray-400 italic">No categories found</div>
                  )}
                </ReactLenis>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Button */}
          <button 
            type="submit"
            className="bg-[#227c85] hover:bg-[#1a636a] text-white flex items-center justify-center gap-2 px-5 md:px-8 py-3.5 rounded-2xl md:rounded-xl transition-all duration-300 shadow-md hover:shadow-[#227c85]/25 active:scale-95 shrink-0"
          >
            <Search className="w-4 md:w-5" />
            <span className="font-semibold text-sm md:text-base whitespace-nowrap hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;
