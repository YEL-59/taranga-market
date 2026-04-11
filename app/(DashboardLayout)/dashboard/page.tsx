"use client";

import React, { useState, useEffect } from "react"
import { Package, CheckCircle2, Clock, Eye, Loader2, ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDashboardSummaryService, getRecentListingsService } from "@/services/listing"
import { cn } from "@/lib/utils"
import { useMySubscription } from "@/hooks/useMySubscription"
import { useMyBoosts } from "@/hooks/useMyBoosts"

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null)
  const [recentListings, setRecentListings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRecentLoading, setIsRecentLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  
  const { subscription, hasSubscription, isLoading: isSubLoading } = useMySubscription()
  const { boosts, isLoading: isBoostsLoading } = useMyBoosts()

  const fetchSummary = async () => {
    try {
      const res = await getDashboardSummaryService();
      if (res.success) {
        setSummary(res.data);
      }
    } catch (error) {
      console.error("Dashboard: Summary fetch failed", error);
    }
  };

  const fetchRecentListings = async (page: number) => {
    setIsRecentLoading(true);
    try {
      const res = await getRecentListingsService(page);
      if (res.success) {
        // Handle both: paginated object or direct array
        if (res.data.data && Array.isArray(res.data.data)) {
          setRecentListings(res.data.data);
          setPagination(res.data);
        } else if (Array.isArray(res.data)) {
          setRecentListings(res.data);
          // Fallback if no pagination metadata is provided by API
          setPagination({
            current_page: 1,
            last_page: 1,
            total: res.data.length,
            from: 1,
            to: res.data.length,
          });
        }
      }
    } catch (error) {
      console.error("Dashboard: Recent listings fetch failed", error);
    } finally {
      setIsRecentLoading(false);
    }
  };

  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      await Promise.all([fetchSummary(), fetchRecentListings(1)]);
      setIsLoading(false);
    };
    initData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      fetchRecentListings(currentPage);
    }
  }, [currentPage]);

  const stats = [
    {
      label: "Total Listings",
      value: summary?.total_listings || "0",
      icon: Package,
      color: "bg-blue-50 text-blue-500",
    },
    {
      label: "Active",
      value: summary?.active_listings || "0",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-500",
    },
    {
      label: "Pending",
      value: summary?.pending_listings || "0",
      icon: Clock,
      color: "bg-amber-50 text-amber-500",
    },
    {
      label: "Total Views",
      value: summary?.total_views || "0",
      icon: Eye,
      color: "bg-purple-50 text-purple-500",
    },
  ];

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        <p className="text-slate-500 mt-1">
          Welcome back! Here&apos;s an overview of your listings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {isLoading
            ? Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] animate-pulse"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 w-20 bg-slate-100 rounded" />
                      <div className="h-8 w-12 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))
            : stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all hover:shadow-md group"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                      stat.color,
                    )}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-medium text-slate-400">
                      {stat.label}
                    </span>
                    <p className="text-2xl font-bold text-slate-700">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Subscription & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Current Status */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 bg-[#1b7d81]/5">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1b7d81]" />
                Subscription Status
              </h3>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center text-center space-y-6">
              {isSubLoading ? (
                 <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#1b7d81]" /></div>
              ) : hasSubscription && subscription ? (
                <>
                  <div className="space-y-2">
                    <Badge className="bg-[#1b7d81] text-white rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest border-0 mb-2">
                      {(subscription.plan?.name || subscription.plan_name || "Free")} Plan
                    </Badge>
                    <p className="text-3xl font-black text-slate-900 leading-tight">
                      Active until<br />
                      <span className="text-[#1b7d81] font-extrabold uppercase text-lg tracking-tight">
                        {formatDate(subscription.ends_at)}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Boosts Left</p>
                      <p className="text-2xl font-black text-[#1b7d81]">{subscription.free_boosts_remaining ?? 0}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Discount</p>
                      <p className="text-2xl font-black text-[#1b7d81]">{subscription.plan?.boost_discount_percent ?? subscription.boost_discount_percent ?? 0}%</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-bold uppercase tracking-wider text-xs">No Active Plan</p>
                    <p className="text-slate-400 text-[10px] mt-1 uppercase font-bold tracking-widest">Upgrade to premium features</p>
                  </div>
                  <Link href="/dashboard/subscriptions" className="w-full">
                    <Button className="w-full bg-[#1b7d81] hover:bg-[#16666a] rounded-xl font-black text-[10px] h-10 uppercase tracking-widest">
                      View Plans
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Boosts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                Active Boosts
              </h3>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                {boosts.length} Boosted
              </Badge>
            </div>
            <div className="p-6">
              {isBoostsLoading ? (
                <div className="py-10 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#1b7d81]" /></div>
              ) : boosts.length > 0 ? (
                <div className="space-y-4">
                  {boosts.map((boost, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/30 border border-amber-100/50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                          <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{boost.listing_title}</h4>
                          <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{boost.boost_plan}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Expires</p>
                        <p className="text-xs font-black text-slate-700">{formatDate(boost.expires_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center space-y-3">
                  <Zap className="w-10 h-10 text-slate-200 mx-auto" />
                  <div>
                    <p className="text-slate-800 font-bold text-sm">No Boosts Active</p>
                    <p className="text-slate-400 text-xs">Boost your listings to get more visibility</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#1b7d81] rounded-full" />
              <h3 className="font-bold text-slate-800">Recent Listings</h3>
            </div>
            {isRecentLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-[#1b7d81]" />
            )}
          </div>

          <div className="p-6 space-y-4">
            {isRecentLoading && recentListings.length === 0 ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 animate-pulse"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-100 shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                      <div className="h-3 w-1/3 bg-slate-100 rounded-lg" />
                    </div>
                  </div>
                ))
            ) : recentListings.length > 0 ? (
              <div className="grid gap-4">
                {recentListings.map((listing, index) => (
                  <div
                    key={`${listing.id}-${index}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-[#1b7d81]/30 hover:bg-[#1b7d81]/5 transition-all duration-300 group"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative border border-slate-100 bg-white">
                      {listing.featured_image &&
                      !listing.featured_image.includes("No image") ? (
                        <Image
                          src={listing.featured_image}
                          alt={listing.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                          <Package className="w-8 h-8 opacity-20" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[#1b7d81] uppercase tracking-widest">
                        <span>{listing.category?.name}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-slate-400">
                          {listing.location}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-800 line-clamp-1 group-hover:text-[#1b7d81] transition-colors">
                        {listing.title}
                      </h4>

                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-sm font-bold text-slate-900">
                          {listing.price} CFA
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-white text-[10px] uppercase font-bold px-2.5 py-0.5 border-slate-200 text-slate-500 rounded-lg"
                        >
                          {listing.status}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{listing.views_count} Views</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 shrink-0">
                      {formatDate(listing.created_at)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                  <Package className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-slate-800 font-bold">No Listings Found</p>
                  <p className="text-slate-400 text-sm">
                    We couldn&apos;t find any recent listings at the moment.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Custom Pagination */}
          {pagination && pagination.last_page > 1 && (
            <div className="px-6 py-6 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Showing{" "}
                <span className="text-[#1b7d81]">{pagination.from}</span> to{" "}
                <span className="text-[#1b7d81]">{pagination.to}</span> of{" "}
                <span className="text-slate-900">{pagination.total}</span>
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 rounded-xl border-slate-200 bg-white hover:bg-[#1b7d81] hover:text-white hover:border-[#1b7d81] transition-all disabled:opacity-30 active:scale-90"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                {Array.from(
                  { length: Math.min(pagination.last_page, 5) },
                  (_, i) => i + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    className={cn(
                      "w-9 h-9 rounded-xl font-bold text-xs p-0 transition-all active:scale-95",
                      currentPage === page
                        ? "bg-[#1b7d81] hover:bg-[#16666a] border-[#1b7d81] text-white shadow-lg shadow-[#1b7d81]/20"
                        : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-[#1b7d81]",
                    )}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}

                {pagination.last_page > 5 && (
                  <span className="text-slate-300 px-1">...</span>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  className="w-9 h-9 rounded-xl border-slate-200 bg-white hover:bg-[#1b7d81] hover:text-white hover:border-[#1b7d81] transition-all disabled:opacity-30 active:scale-90"
                  disabled={currentPage === pagination.last_page}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



