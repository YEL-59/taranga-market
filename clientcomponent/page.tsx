"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, Check, Loader2, Link as LinkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategoriesService, searchListingsService } from "@/services/listing";
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
  
  // Live Search States
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      setShowDropdown(true);
      try {
        const res = await searchListingsService(query);
        if (res.success && res.data?.data) {
          setSearchResults(res.data.data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 400);
    return () => clearTimeout(debounceTimer);
  }, [query]);

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

        {/* Sleek Input Section */}
        <div ref={searchContainerRef} className="w-full relative flex items-center justify-between px-4 py-3 md:py-4 gap-4 transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ff6b3d]/10 flex items-center justify-center shrink-0">
                <Search className="w-5 md:w-6 text-[#ff6b3d]" />
            </div>
            <div className="flex flex-col w-full">
                <span className="text-[10px] sm:hidden font-bold text-gray-400 uppercase tracking-wider mb-0.5">Find</span>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim().length > 0) setShowDropdown(true);
              }}
              onFocus={() => {
                  if (query.trim().length >= 2) setShowDropdown(true);
              }}
              placeholder="What are you looking for?"
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm md:text-base bg-transparent"
            />
          </div>
        </div>

          {/* Live Search Dropdown */}
          <AnimatePresence>
            {showDropdown && query.trim().length >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[110%] left-0 w-full z-[100] bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-[#227c85]" />
                  </div>
                ) : searchResults.length > 0 ? (
                  <ReactLenis options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }} className="max-h-[400px] overflow-y-auto w-full p-2">
                    <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Results for "{query}"</span>
                        <span className="text-xs font-bold text-[#227c85] bg-[#227c85]/10 px-2 py-1 rounded-md">{searchResults.length} found</span>
                    </div>
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => router.push(`/featured-details?id=${item.id}`)}
                        className="flex items-center gap-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors rounded-xl group"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative border border-gray-50">
                           {item.featured_image ? (
                             <img src={item.featured_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center"><Search className="w-5 h-5 text-gray-300" /></div>
                           )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-[#227c85] transition-colors">{item.title}</h4>
                          <span className="text-xs text-gray-500 truncate mt-1">{item.category?.name || "Product"} • {item.location}</span>
                        </div>
                        <div className="text-right shrink-0">
                           <span className="text-sm font-extrabold text-[#ff6b3d]">{item.price ? `${item.price} CFA` : 'N/A'}</span>
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={handleSearch}
                      className="w-full text-center py-3 mt-1 text-sm font-bold text-[#227c85] hover:bg-[#227c85]/5 cursor-pointer rounded-xl transition-colors"
                    >
                        View all results <LinkIcon className="w-3.5 h-3.5 inline ml-1" />
                    </div>
                  </ReactLenis>
                ) : (
                  <div className="px-6 py-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                        <Search className="w-6 h-6 text-gray-300" />
                    </div>
                    <span className="text-sm font-bold text-gray-800">No results found for "{query}"</span>
                    <span className="text-xs text-gray-500 mt-1">Try adjusting your search terms!</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search Button right inside the bar */}
          <button
            type="submit"
            className="bg-gradient-to-r from-[#227c85] to-[#1a636a] hover:from-[#1b636a] hover:to-[#124b51] text-white flex items-center justify-center gap-2 px-6 md:px-10 py-3.5 md:py-4 rounded-full transition-all duration-300 shadow-xl shadow-[#227c85]/30 hover:shadow-[#227c85]/40 active:scale-95 shrink-0"
          >
            <span className="font-bold text-sm md:text-base whitespace-nowrap hidden sm:inline">Search</span>
            <Search className="w-4 h-4 md:w-5 md:h-5 sm:hidden" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchHero;
