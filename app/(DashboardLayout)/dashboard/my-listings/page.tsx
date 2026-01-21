"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Eye, Trash2, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const tabs = ["All (2)", "Active (2)", "Pending (0)", "Sold (0)"]

const listings = [
  {
    id: 1,
    title: "Professional Plumbing Services - 24/7 Available",
    location: "Dakar",
    price: "15,000 CFA",
    status: "active",
    views: 124,
    date: "12/28/2025",
    image: "https://images.unsplash.com/photo-1542013916-753884710cdb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Professional House Cleaning Services",
    location: "Dakar",
    price: "20,000 CFA",
    status: "active",
    views: 78,
    date: "12/27/2025",
    image: "https://images.unsplash.com/photo-1581578731522-af986940bf87?w=400&auto=format&fit=crop&q=60",
  },
]

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState("All (2)")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Listings</h2>
          <p className="text-slate-500 mt-1">Manage and edit your listings</p>
        </div>
        <Link href="/dashboard/add-listing">
          <Button className="bg-[#1b7d81] hover:bg-[#16666a] gap-2 rounded-xl h-11 px-6">
            <Plus className="w-4 h-4" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <div className="bg-white p-2 rounded-2xl border border-slate-100 flex gap-1 w-fit shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab
                ? "bg-[#4f6eed] text-white shadow-md shadow-blue-100"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-5">Listing</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Views</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {listings.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-slate-100">
                        <Image src={item.image} alt="" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-700">{item.title}</p>
                        <p className="text-xs text-slate-400 font-medium">{item.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-600">{item.price}</span>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-bold px-3 py-0.5 text-[11px]">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <Eye className="w-4 h-4" />
                      {item.views}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400 font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
