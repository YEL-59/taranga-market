"use client"

import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit2, Eye, Trash2, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getMyListingsService, getListingDetailsService, deleteListingService } from "@/services/listing"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const tabs = ["All", "Active", "Pending"]  //"Sold"

export default function MyListingsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [listings, setListings] = useState<any[]>([])
  const [pagination, setPagination] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // Details Modal State
  const [selectedListing, setSelectedListing] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isDetailLoading, setIsDetailLoading] = useState(false)

  // Delete Modal State
  const [listingToDelete, setListingToDelete] = useState<any>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchListings = async (page: number) => {
    setIsLoading(true)
    try {
      const result = await getMyListingsService(page)
      if (result.success && result.data) {
        setListings(result.data.data)
        setPagination(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchListings(currentPage)
  }, [currentPage])

  const handleViewDetails = async (id: number) => {
    setIsDetailLoading(true)
    setIsDetailsOpen(true)
    try {
      const result = await getListingDetailsService(id)
      if (result.success) {
        setSelectedListing(result.data)
      } else {
        toast.error(result.message)
        setIsDetailsOpen(false)
      }
    } catch (error) {
      toast.error("Failed to fetch listing details")
    } finally {
      setIsDetailLoading(false)
    }
  }

  const handleDeleteListing = async () => {
    if (!listingToDelete) return
    setIsDeleting(true)
    try {
      const result = await deleteListingService(listingToDelete.id)
      if (result.success) {
        toast.success(result.message)
        setListings(prev => prev.filter(l => l.id !== listingToDelete.id))
        setIsDeleteOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Failed to delete listing")
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100'
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100'
      case 'sold':
        return 'bg-blue-50 text-blue-600 border-blue-100'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  const filteredListings = listings.filter(item => {
    if (activeTab === "All") return true
    return item.status.toLowerCase() === activeTab.toLowerCase()
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">My Listings</h2>
          <p className="text-slate-500 mt-1 text-sm">Manage, edit and monitor your business listings</p>
        </div>
        <Link href="/dashboard/add-listing">
          <Button className="bg-[#1b7d81] hover:bg-[#16666a] gap-2 rounded-xl h-11 px-6 shadow-sm shadow-[#1b7d81]/20 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <div className="bg-white p-1.5 rounded-2xl border border-slate-100 flex gap-1 w-fit shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === tab
              ? "bg-[#4f6eed] text-white shadow-md shadow-blue-100"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden min-h-[450px] flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-20 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1b7d81]/10 rounded-full blur-xl animate-pulse"></div>
              <Loader2 className="w-10 h-10 animate-spin text-[#1b7d81] relative z-10" />
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-bold">Loading Listings</p>
              <p className="text-slate-400 text-xs mt-1">Please wait a moment...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.1em]">
                    <th className="px-6 py-5">Listing Information</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Engagement</th>
                    <th className="px-6 py-5">Created At</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredListings.length > 0 ? (
                    filteredListings.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl overflow-hidden relative border border-slate-100 bg-slate-50 shrink-0">
                              {item.featured_image && !item.featured_image.includes("No image") ? (
                                <Image src={item.featured_image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-[#1b7d81]/30">
                                  <Plus className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-700 truncate max-w-[280px] group-hover:text-[#4f6eed] transition-colors">{item.title}</p>
                              <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                                {item.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-extrabold text-slate-600">{item.price} CFA</span>
                        </td>
                        <td className="px-6 py-5">
                          <Badge variant="outline" className={`${getStatusColor(item.status)} font-extrabold px-3 py-1 text-[10px] uppercase tracking-wider`}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                              <Eye className="w-3.5 h-3.5" />
                              {item.views_count} Views
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-400 font-semibold whitespace-nowrap">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-90" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button> */}
                            <button
                              onClick={() => handleViewDetails(item.id)}
                              className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-all active:scale-90"
                              title="View Detail"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setListingToDelete(item)
                                setIsDeleteOpen(true)
                              }}
                              className="p-2 text-orange-500 hover:bg-orange-50 rounded-xl transition-all active:scale-90"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-24 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-dashed border-slate-200">
                            <Plus className="w-10 h-10 text-slate-200" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-slate-800 font-bold">No Records Found</p>
                            <p className="text-slate-400 text-sm max-w-[250px] mx-auto">You haven't added any listings yet or none match this filter.</p>
                          </div>
                          <Link href="/dashboard/add-listing">
                            <Button className="bg-[#1b7d81] hover:bg-[#16666a] text-xs font-bold rounded-xl h-10 px-6">
                              Create New Listing
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {pagination && pagination.last_page > 1 && (
              <div className="mt-auto px-6 py-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Showing <span className="text-[#4f6eed]">{pagination.from}</span> to <span className="text-[#4f6eed]">{pagination.to}</span> of <span className="text-slate-900">{pagination.total}</span> Total
                </p>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-90"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={`w-9 h-9 rounded-xl font-bold text-xs p-0 transition-all active:scale-90 ${currentPage === page
                        ? "bg-[#4f6eed] hover:bg-[#435ec9] border-[#4f6eed] shadow-md shadow-blue-100 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    className="w-9 h-9 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all active:scale-90"
                    disabled={currentPage === pagination.last_page}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Listing Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-none shadow-2xl">
          {isDetailLoading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#1b7d81]" />
              <p className="text-slate-500 font-medium">Fetching details...</p>
            </div>
          ) : selectedListing ? (
            <div className="flex flex-col">
              {/* Header Image Part */}
              <div className="relative h-64 w-full bg-slate-100">
                {selectedListing.featured_image && !selectedListing.featured_image.includes("No image") ? (
                  <Image
                    src={selectedListing.featured_image}
                    alt={selectedListing.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                    <Plus className="w-12 h-12 mb-2" />
                    <span className="text-sm font-bold uppercase tracking-widest">No Featured Image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getStatusColor(selectedListing.status)} px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-0 shadow-lg`}>
                    {selectedListing.status}
                  </Badge>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Title & Category Area */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1b7d81] uppercase tracking-[0.2em]">
                    <span>{selectedListing.category?.name}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-slate-400">{selectedListing.location}</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                    {selectedListing.title}
                  </h2>
                  <div className="text-2xl font-black text-[#4f6eed] mt-2">
                    {selectedListing.price} CFA
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Views</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      {selectedListing.views_count}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Created On</span>
                    <span className="text-sm font-bold text-slate-700">{formatDate(selectedListing.created_at)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Featured</span>
                    <span className="text-sm font-bold text-slate-700">
                      {selectedListing.is_featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                    Description
                    <div className="flex-1 h-px bg-slate-100"></div>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {selectedListing.description}
                  </p>
                </div>

                {/* Additional Attributes if any */}
                {selectedListing.values && selectedListing.values.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                      Specifications
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedListing.values.map((v: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-slate-50 rounded-2xl shadow-sm text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1b7d81]"></div>
                          <span className="text-slate-600 font-medium">{v.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Gallery */}
                {selectedListing.images && selectedListing.images.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                      Gallery
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {selectedListing.images.map((img: any) => (
                        <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 hover:ring-2 hover:ring-[#4f6eed] transition-all cursor-pointer">
                          <Image src={img.image_path} alt="" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-0 rounded-3xl border-none shadow-2xl overflow-hidden">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">Are you absolutely sure?</h3>
              <p className="text-slate-500 text-sm">
                This action cannot be undone. This will permanently delete your listing: <br />
                <span className="font-bold text-slate-700">"{listingToDelete?.title}"</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 rounded-xl h-12 font-bold border-slate-200 text-slate-500 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteListing}
                disabled={isDeleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-red-100 active:scale-95 transition-all"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Yes, Delete It"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
