"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, SlidersHorizontal, Settings } from 'lucide-react';
import FilterSidebar from './components/FilterSidebar';
import ServiceCard from './components/ServiceCard';
import ServiceDetailView from './components/ServiceDetailView';
import { getProductsByCategoryService } from '@/services/listing';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useSearchParams, useRouter } from 'next/navigation';

// ... existing imports

const Services = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    // API State
    const [serviceDataState, setServiceDataState] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // ... filters ...
    const [filters, setFilters] = useState({
        city: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    // Check URL params
    React.useEffect(() => {
        const id = searchParams.get('id');
        if (id && serviceDataState.length > 0) {
            const item = serviceDataState.find(v => v.id === parseInt(id));
            if (item) {
                setSelectedItem(item);
                setView('detail');
            }
        } else if (!id) {
            setView('list');
            setSelectedItem(null);
        }
    }, [searchParams, serviceDataState]);

    React.useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                // Fetch Services (category_id = 1)
                const response = await getProductsByCategoryService(1);
                if (response.success && response.data?.listings) {
                    setServiceDataState(response.data.listings);
                } else {
                    setServiceDataState([]);
                }
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);


    const filteredData = useMemo(() => {
        return serviceDataState.filter(item => {
            const itemCity = item.location || item.city || '';
            const matchesCity = !filters.city || itemCity === filters.city;
            
            const numericPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0 : (item.price || 0);
            const matchesMinPrice = !filters.minPrice || numericPrice >= parseInt(filters.minPrice);
            const matchesMaxPrice = !filters.maxPrice || numericPrice <= parseInt(filters.maxPrice);
            
            const categoryName = item.subcategory?.name || item.meta?.category || '';
            const matchesCategory = !filters.category || categoryName === filters.category;

            return matchesCity && matchesMinPrice && matchesMaxPrice && matchesCategory;
        });
    }, [filters, serviceDataState]);

    const handleViewDetail = (item: any) => {
        setSelectedItem(item);
        setView('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/services?id=${item.id}`, { scroll: false });
    };

    const handleBack = () => {
        setView('list');
        setSelectedItem(null);
        router.push('/services', { scroll: false });
    };

    const handleReset = () => {
        setFilters({
            city: '',
            category: '',
            minPrice: '',
            maxPrice: ''
        });
    };

    return (
        <section className="w-full min-h-screen bg-[#FAFAFA]">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {view === 'list' ? (
                    <div className="space-y-8 lg:space-y-10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1B2232] tracking-tight">Services</h1>
                                <p className="text-gray-500 mt-1 text-sm lg:text-base">Find skilled professionals for your needs</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:inline-flex text-gray-500 font-semibold bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm">
                                    {filteredData.length} results
                                </span>
                                
                                {/* Mobile Filter Toggle */}
                                <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                                    <SheetTrigger asChild>
                                        <button className="lg:hidden flex items-center gap-2 bg-[#1D7E87] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#1D7E87]/20 transition-all hover:scale-105 active:scale-95">
                                            <SlidersHorizontal className="w-4 h-4" />
                                            <span>Filters</span>
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 border-r-0">
                                        <div className="h-full overflow-y-auto pt-6 px-6 pb-10">
                                            <SheetHeader className="mb-6">
                                                <SheetTitle className="text-left text-2xl font-bold text-[#1B2232]">Service Filters</SheetTitle>
                                            </SheetHeader>
                                            <FilterSidebar 
                                                filters={filters} 
                                                setFilters={setFilters} 
                                                onReset={handleReset}
                                                className="w-full space-y-6"
                                            />
                                            <div className="mt-8">
                                                <button 
                                                    onClick={() => setIsMobileFilterOpen(false)}
                                                    className="w-full bg-[#1B2232] text-white font-bold py-4 rounded-xl shadow-lg"
                                                >
                                                    Show {filteredData.length} Results
                                                </button>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                            {/* Desktop Sidebar */}
                            <div className="hidden lg:block">
                                <FilterSidebar 
                                    filters={filters} 
                                    setFilters={setFilters} 
                                    onReset={handleReset}
                                />
                            </div>

                            <div className="flex-1 space-y-12">
                                {isLoading ? (
                                    <div className="flex justify-center items-center py-32">
                                        <div className="animate-spin w-10 h-10 border-4 border-[#1D7E87] border-t-transparent rounded-full" />
                                    </div>
                                ) : filteredData.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                        {filteredData.map((item) => (
                                            <ServiceCard 
                                                key={item.id} 
                                                item={item} 
                                                onClick={() => handleViewDetail(item)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-24 lg:py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Settings className="w-10 h-10 text-gray-200" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No services found</h3>
                                        <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm lg:text-base">We couldn't find any services matching your current filters.</p>
                                        <button onClick={handleReset} className="text-[#1D7E87] font-bold hover:underline bg-[#1D7E87]/10 px-6 py-3 rounded-xl transition-all">
                                            Clear all filters
                                        </button>
                                    </div>
                                )}

                                {filteredData.length > 0 && (
                                    <div className="flex justify-center items-center gap-3 pt-4 lg:pt-8">
                                        <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gray-200 bg-white rounded-xl text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
                                            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                                        </button>
                                        <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#1D7E87] text-white font-bold rounded-xl shadow-lg shadow-[#1D7E87]/20">1</button>
                                        <button className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gray-200 bg-white rounded-xl text-gray-400 hover:bg-gray-50 transition-colors shadow-sm">
                                            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 rotate-180" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <ServiceDetailView 
                        item={selectedItem} 
                        onBack={handleBack} 
                    />
                )}
            </div>
        </section>
    );
};

export default Services;
