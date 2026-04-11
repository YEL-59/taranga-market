"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, ChevronDown, Check, Loader2, Link as LinkIcon, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategoriesService, searchListingsService } from "@/services/listing";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";
import { useTranslations } from "next-intl";



const SearchHero: React.FC = () => {
  const t = useTranslations("SearchHero");
  const ct = useTranslations("Common");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
 
  
  // Live Search States
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchContainerRef = useRef<HTMLFormElement>(null);



  useEffect(() => {
    const fetchResults = async () => {
      // Show results if any of the fields have at least 2 characters
      const hasMinChars = query.trim().length >= 2 || city.trim().length >= 2 || state.trim().length >= 2;
      
      if (!hasMinChars) {
        setSearchResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      setShowDropdown(true);
      try {
        const res = await searchListingsService(query, city, state);
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
  }, [query, city, state]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (city) params.set("city", city);
    if (state) params.set("state", state);

    router.push(`/all-items?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 md:py-8">
      <form
        onSubmit={handleSearch}
        className="relative bg-white rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_70px_-15px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18)]"
        ref={searchContainerRef}
      >
        <div className="flex flex-col md:flex-row items-stretch md:items-center p-2">
          
          {/* Main Query Section */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 md:py-4 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#ff6b3d]/10 flex items-center justify-center shrink-0">
              <Search className="w-5 md:w-6 text-[#ff6b3d]" />
            </div>
            <div className="flex flex-col w-full min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t("what")}</span>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={t("whatPlaceholder")}
                className="w-full outline-none text-gray-800 placeholder:text-gray-400 font-bold text-sm md:text-base bg-transparent truncate"
              />
            </div>
          </div>

          {/* City Section */}
          <div className="flex-[0.7] flex items-center gap-3 px-4 py-3 md:py-4 border-b md:border-b-0 md:border-r border-gray-100 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#227c85]/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 md:w-6 text-[#227c85]" />
            </div>
            <div className="flex flex-col w-full min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t("city")}</span>
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={t("cityPlaceholder")}
                className="w-full outline-none text-gray-800 placeholder:text-gray-400 font-bold text-sm md:text-base bg-transparent truncate"
              />
            </div>
          </div>

          {/* State/Region Section */}
          <div className="flex-[0.7] flex items-center gap-3 px-4 py-3 md:py-4 min-w-0 border-b md:border-b-0 border-gray-100">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
              <Globe className="w-5 md:w-6 text-indigo-500" />
            </div>
            <div className="flex flex-col w-full min-w-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{t("state")}</span>
              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={t("statePlaceholder")}
                className="w-full outline-none text-gray-800 placeholder:text-gray-400 font-bold text-sm md:text-base bg-transparent truncate"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="md:ml-2 mt-2 md:mt-0 bg-gradient-to-br from-[#227c85] to-[#1a636a] hover:from-[#1b636a] hover:to-[#124b51] text-white flex items-center justify-center gap-2 px-8 py-4 md:py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-[#227c85]/20 hover:shadow-[#227c85]/40 active:scale-[0.98] shrink-0"
          >
            <span className="font-extrabold text-base whitespace-nowrap">{t("searchNow")}</span>
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Live Search Dropdown */}
        <AnimatePresence>
          {showDropdown && (query.trim().length >= 2 || city.trim().length >= 2 || state.trim().length >= 2) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute top-[calc(100%+0.75rem)] left-0 w-full z-[100] bg-white rounded-[2rem] shadow-[0_35px_90px_-20px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden"
            >
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-[#227c85]/20 border-t-[#227c85] rounded-full animate-spin" />
                    <Search className="w-5 h-5 text-[#227c85] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-sm font-bold text-gray-400 animate-pulse">{t("searching")}</span>
                </div>
              ) : searchResults.length > 0 ? (
                <ReactLenis options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }} className="max-h-[450px] overflow-y-auto w-full p-2">
                  <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between sticky top-0 bg-white z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("matchingItems")}</span>
                      <span className="text-xs font-bold text-gray-600">{t("showingTopResults")}</span>
                    </div>
                    <span className="text-xs font-bold text-[#227c85] bg-[#227c85]/10 px-3 py-1.5 rounded-full">{searchResults.length} {t("results")}</span>
                  </div>
                  <div className="p-2 space-y-1">
                    {searchResults.map((item, index) => (
                      <div
                        key={`${item.id || ""}-${index}`}
                        onClick={() => router.push(`/featured-details?id=${item.id}`)}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-[#227c85]/5 cursor-pointer transition-all duration-200 rounded-2xl group border border-transparent hover:border-[#227c85]/10"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 relative border border-gray-100 shadow-sm">
                          {item.featured_image ? (
                            <img src={item.featured_image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-50"><Search className="w-6 h-6 text-gray-200" /></div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <h4 className="text-base font-bold text-gray-800 truncate group-hover:text-[#227c85] transition-colors">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold bg-[#ff6b3d]/10 text-[#ff6b3d] px-2 py-0.5 rounded uppercase">{item.category?.name || "Product"}</span>
                            <span className="text-[10px] font-bold text-gray-400">•</span>
                            <span className="text-xs font-bold text-gray-400 truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {item.city} , {item.state}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-lg font-black text-[#ff6b3d]">{item.price ? `${item.price.toLocaleString()} CFA` : 'N/A'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSearch}
                    className="w-full text-center py-4 mt-2 text-sm font-black text-[#227c85] hover:bg-[#227c85] hover:text-white transition-all duration-300 rounded-2xl group flex items-center justify-center gap-2"
                  >
                    {t("exploreAll")}
                    <LinkIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </ReactLenis>
              ) : (
                <div className="px-6 py-16 text-center flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-100 relative">
                    <Search className="w-8 h-8 text-gray-300" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold text-xs ring-4 ring-white">!</div>
                  </div>
                  <div className="max-w-[250px]">
                    <h3 className="text-lg font-bold text-gray-800">{t("noMatchTitle")}</h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {t("noMatchDesc", { query: query, location: city || state || "everywhere" })}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default SearchHero;
