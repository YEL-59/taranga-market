"use client"

import React from "react"
import { Package, CheckCircle2, Clock, Eye } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const stats = [
  {
    label: "Total Listings",
    value: "2",
    icon: Package,
    color: "bg-blue-50 text-blue-500",
  },
  {
    label: "Active",
    value: "2",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-500",
  },
  {
    label: "Pending",
    value: "0",
    icon: Clock,
    color: "bg-amber-50 text-amber-500",
  },
  {
    label: "Total Views",
    value: "202",
    icon: Eye,
    color: "bg-purple-50 text-purple-500",
  },
]

const recentListings = [
  {
    id: 1,
    title: "Professional Plumbing Services - 24/7 Available",
    price: "15,000 CFA",
    status: "active",
    views: "124 views",
    date: "12/28/2025",
    image: "https://images.unsplash.com/photo-1542013916-753884710cdb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Professional House Cleaning Services",
    price: "20,000 CFA",
    status: "active",
    views: "78 views",
    date: "12/27/2025",
    image: "https://images.unsplash.com/photo-1581578731522-af986940bf87?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Appartement F4 Haut Standing - Vue Mer",
    price: "20,000 CFA",
    status: "active",
    views: "78 views",
    date: "12/27/2025",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "iPhone 16 Pro Max",
    price: "20,000 CFA",
    status: "active",
    views: "78 views",
    date: "12/27/2025",
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=400&auto=format&fit=crop&q=60",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
        <p className="text-slate-500 mt-1">Welcome back! Here&apos;s an overview of your listings.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all hover:shadow-md group">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-medium text-slate-400">{stat.label}</span>
                <p className="text-2xl font-bold text-slate-700">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-800">Recent Listings</h3>
          </div>
          <div className="p-4 space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/10 transition-all group">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-slate-700 group-hover:text-emerald-700 transition-colors line-clamp-1">{listing.title}</h4>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400">{listing.price}</span>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold px-2 py-0 border-none">
                      {listing.status}
                    </Badge>
                    <span className="text-xs text-slate-400">• {listing.views}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {listing.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

import { cn } from "@/lib/utils"
