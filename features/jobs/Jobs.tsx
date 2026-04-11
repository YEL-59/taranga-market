"use client";

import React, { useState, useMemo } from 'react';
import { ChevronLeft, SlidersHorizontal, Briefcase } from 'lucide-react';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import JobDetailView from './components/JobDetailView';
import { getProductsByCategoryService } from '@/services/listing';
import { Loader2 } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useSearchParams, useRouter } from 'next/navigation';

// ... existing imports

const Jobs = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
    // API State
    const [jobDataState, setJobDataState] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // ... filters ...
    const [filters, setFilters] = useState({
        city: '',
        jobType: '',
        experienceLevel: '',
        industry: '',
        remote: '',
        minPrice: '',
        maxPrice: ''
    });

    // Check URL params
    React.useEffect(() => {
        const id = searchParams.get('id');
        if (id && jobDataState.length > 0) {
            const item = jobDataState.find(v => v.id === parseInt(id));
            if (item) {
                setSelectedItem(item);
                setView('detail');
            }
        } else if (!id) {
            setView('list');
            setSelectedItem(null);
        }
    }, [searchParams, jobDataState]);

    React.useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                // Fetch Jobs (category_id = 1, jobs = 2 maybe? I should check DB, but based on conversation, categories are 1-5. 
                // Conversation mentioned categories fixed 1-5, ID 1 is Services. Let's assume ID 2 is Jobs based on the page call in my previous turns.)
                const response = await getProductsByCategoryService(5); // WAIT, let me check category page mapping
                // CATEGORIES FROM features/home/category/page.tsx:
                // services: categoryId 1
                // jobs: categoryId 2
                // realEstate: categoryId 4
                // products: categoryId 3
                // vehicles: categoryId 5
                
                const responseData = await getProductsByCategoryService(2); 
                if (responseData.success && responseData.data?.listings) {
                    setJobDataState(responseData.data.listings);
                } else {
                    setJobDataState([]);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // ... filteredData ...
    const filteredData = useMemo(() => {
        return jobDataState.filter(item => {
            const itemCity = item.location || item.city || '';
            const matchesCity = !filters.city || itemCity === filters.city;
            
            const metaObj = item.meta || {};
            const matchesJobType = !filters.jobType || metaObj.jobType === filters.jobType;
            const matchesExperience = !filters.experienceLevel || metaObj.experienceLevel === filters.experienceLevel;
            const matchesIndustry = !filters.industry || metaObj.industry === filters.industry;
            const matchesRemote = !filters.remote || metaObj.remote === filters.remote;
            
            const numericPrice = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0 : (item.price || 0);
            const matchesMinSalary = !filters.minPrice || numericPrice >= parseInt(filters.minPrice);
            const matchesMaxSalary = !filters.maxPrice || numericPrice <= parseInt(filters.maxPrice);

            return matchesCity && matchesJobType && matchesExperience && matchesIndustry && matchesRemote && matchesMinSalary && matchesMaxSalary;
        });
    }, [filters, jobDataState]);

    const handleViewDetail = (item: any) => {
        setSelectedItem(item);
        setView('detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        router.push(`/jobs?id=${item.id}`, { scroll: false });
    };

    const handleBack = () => {
        setView('list');
        setSelectedItem(null);
        router.push('/jobs', { scroll: false });
    };

    const handleReset = () => {
        setFilters({
            city: '',
            jobType: '',
            experienceLevel: '',
            industry: '',
            remote: '',
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
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-[#1B2232] tracking-tight">Jobs</h1>
                                <p className="text-gray-500 mt-1 text-sm lg:text-base">Find your next career opportunity</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <span className="hidden sm:inline-flex text-gray-500 font-semibold bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm text-sm">
                                    {filteredData.length} opportunities
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
                                                <SheetTitle className="text-left text-2xl font-bold text-[#1B2232]">Job Search Filters</SheetTitle>
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
                                        <Loader2 className="animate-spin w-10 h-10 text-[#1D7E87]" />
                                    </div>
                                ) : filteredData.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                        {filteredData.map((item) => (
                                            <JobCard 
                                                key={item.id} 
                                                item={item} 
                                                onClick={() => handleViewDetail(item)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-24 lg:py-32 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Briefcase className="w-10 h-10 text-gray-200" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No jobs found</h3>
                                        <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm lg:text-base">We couldn't find any job opportunities matching your current search criteria.</p>
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
                    <JobDetailView 
                        item={selectedItem} 
                        onBack={handleBack} 
                    />
                )}
            </div>
        </section>
    );
};

export default Jobs;
