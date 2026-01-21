"use client"

import React from "react"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TopbarProps {
  title: string
}

export default function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">
      <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Esther Howard</span>
              <Avatar className="w-9 h-9 border-2 border-slate-50 group-hover:border-emerald-100 transition-all">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EH</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 mt-2">
            <DropdownMenuLabel className="font-bold text-slate-800">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer gap-2 py-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="cursor-pointer gap-2 py-2.5">
                <UserCircle className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/my-listings" className="cursor-pointer gap-2 py-2.5">
                <ListOrdered className="w-4 h-4" />
                <span>My Listings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-600 focus:bg-red-50 cursor-pointer gap-2 py-2.5">
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { LayoutDashboard, UserCircle, ListOrdered, LogOut } from "lucide-react"
