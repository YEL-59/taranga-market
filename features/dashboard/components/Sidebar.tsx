"use client"

import Link from "next/link"
import React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ListOrdered, 
  PlusCircle, 
  UserCircle, 
  LogOut 
} from "lucide-react"
import logo from "@/assets/images/logo-nav.png"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Listings",
    href: "/dashboard/my-listings",
    icon: ListOrdered,
  },
  {
    name: "Add Listing",
    href: "/dashboard/add-listing",
    icon: PlusCircle,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
    subLinks: [
      { name: "My Account Details", href: "/dashboard/profile" },
      { name: "Password", href: "/dashboard/profile/password" },
    ],
  },
]

import { ChevronDown } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [openDropdowns, setOpenDropdowns] = React.useState<string[]>(["Profile"])

  const toggleDropdown = (name: string) => {
    setOpenDropdowns(prev => 
      prev.includes(name) 
        ? prev.filter(d => d !== name) 
        : [...prev, name]
    )
  }

  return (
    <div className="w-[280px] bg-[#1a1f2e] h-screen fixed left-0 top-0 flex flex-col text-white z-50">
      <div className="p-8 pb-10">
        <Link href="/">
          <Image
            src={logo}
            alt="Teranga Market"
            width={160}
            height={60}
            className="brightness-0 invert h-auto w-auto"
          />
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const hasSubLinks = link.subLinks && link.subLinks.length > 0
          const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))
          const isOpen = openDropdowns.includes(link.name)

          if (hasSubLinks) {
            return (
              <div key={link.name} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(link.name)}
                  className={cn(
                    "flex items-center justify-between w-full gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                    isActive && !isOpen
                      ? "bg-[#1b7d81] text-white" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "group-hover:text-white"
                    )} />
                    <span className="font-medium">{link.name}</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isOpen && "rotate-180"
                  )} />
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-300 space-y-1 ml-4",
                  isOpen ? "max-h-40 opacity-100 py-1" : "max-h-0 opacity-0"
                )}>
                  {link.subLinks?.map((sub) => {
                    const isSubActive = pathname === sub.href
                    return (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={cn(
                          "block px-8 py-2.5 rounded-xl text-sm font-medium transition-all",
                          isSubActive 
                            ? "text-white bg-[#1b7d81]/40" 
                            : "text-slate-500 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {sub.name}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive 
                  ? "bg-[#1b7d81] text-white" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon className={cn(
                "w-5 h-5",
                isActive ? "text-white" : "group-hover:text-white"
              )} />
              <span className="font-medium">{link.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all group">
          <LogOut className="w-5 h-5 group-hover:text-orange-500" />
          <span className="font-medium text-orange-400">Sign Out</span>
        </button>
      </div>
    </div>
  )
}
