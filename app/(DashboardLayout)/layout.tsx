"use client"

import React from "react"
import Sidebar from "@/features/dashboard/components/Sidebar"
import Topbar from "@/features/dashboard/components/Topbar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const getTitle = () => {
    if (pathname.includes("/profile/password")) return "Password"
    if (pathname.includes("/profile")) return "Profile"
    if (pathname.includes("/my-listings")) return "My Listings"
    if (pathname.includes("/add-listing")) return "Add Listing"
    return "Dashboard"
  }

  return (
    <div className="min-h-screen bg-[#f8faff]">
      <Sidebar />
      <div className="pl-[280px]">
        <Topbar title={getTitle()} />
        <main className="p-8 pb-12">
          {children}
        </main>
        <footer className="text-center py-6 text-xs text-slate-400">
          Copyright © Teranga Market 2025. All Rights Reserved.
        </footer>
      </div>
    </div>
  )
}
