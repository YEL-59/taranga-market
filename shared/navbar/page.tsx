"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Heart } from "lucide-react"; // Accessible icons

// Shadcn UI Imports
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import Img from "@/assets/images/nav-logo.png";
import CommonButton from "@/common/commonButton/CommonButton";

interface NavLink {
  name: string;
  href: string;
}

import { useFavorites } from "@/context/FavoritesContext";

import { motion } from "framer-motion";

// ... existing imports

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [language, setLanguage] = useState<"En" | "Fn">("En");
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    // { name: "Vehicles", href: "/vehicles" },
    // { name: "Properties", href: "/properties" },
    // { name: "Services", href: "/services" },
    // { name: "Jobs", href: "/jobs" },
    { name: "All Items", href: "/all-items" },
    //{ name: "Dashboard", href: "/dashboard" },
  ];

  // Helper for active styles
  const getLinkStyles = (href: string) =>
    pathname === href
      ? "text-white bg-[#227c85]" // Active state with background
      : "text-[#565E69] hover:text-[#227c85]"; // Inactive state

  // Compute display name safely
  const displayName = user?.full_name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User";

  const baseUrl = "https://raymondred.thesyndicates.team/";
  const photoUrl = user?.profile_photo ? (user.profile_photo.startsWith('http') ? user.profile_photo : `${baseUrl}${user.profile_photo}`) : "";

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <nav className="container mx-auto flex items-center justify-between px-4 md:px-6 py-4">
        {/* --- LEFT: LOGO --- */}
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Image src={Img} alt="Logo" width={100} height={200} priority />
            </motion.div>
          </Link>
        </div>

        {/* --- MIDDLE: DESKTOP NAV --- */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-[16px] truncate font-medium transition-colors"
              // Styles moved to children/motion or handled via class logic below
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#227c85] rounded-full"
                    style={{ zIndex: -1 }} // Put behind text
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`${pathname === link.href ? "text-white" : "text-[#565E69] hover:text-[#227c85]"}`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {/* Search */}
          <div className="relative w-full max-w-[220px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-[#227c85]/20 focus:outline-none"
            />
            <Search className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" />
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full">
            {(["En", "Fn"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${language === lang
                  ? "bg-[#227c85] text-white shadow-sm"
                  : "text-gray-500"
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Favorites */}
          <Link href="/favorites" className="flex items-center gap-1.5 text-[#565E69] hover:text-[#227c85] relative">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium font-[Inter]">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#227c85] text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-slate-100 hover:border-emerald-500/30 hover:bg-slate-50 transition-all cursor-pointer outline-none group">
                  <div className="flex flex-col items-end hidden xl:flex">
                    <span className="text-sm font-bold text-slate-700 leading-tight truncate max-w-[120px] group-hover:text-[#227c85]">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-tight capitalize font-medium">
                      {user.role}
                    </span>
                  </div>
                  <Avatar className="h-9 w-9 border-2 border-slate-100 group-hover:border-emerald-500/50 transition-colors">
                    <AvatarImage src={photoUrl} alt={displayName} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold uppercase text-xs">
                      {displayName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-xl shadow-xl border-slate-100">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg mb-2">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={photoUrl} alt={displayName} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold uppercase">
                      {displayName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-800 truncate">
                      {displayName}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>

                <DropdownMenuSeparator className="bg-slate-100" />

                <DropdownMenuItem asChild className="rounded-lg py-2.5 my-0.5 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-focus:bg-emerald-100 group-focus:text-emerald-600">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Profile Info</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100" />

                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-lg py-2.5 my-0.5 text-red-600 focus:text-red-700 focus:bg-red-50 flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <CommonButton label="Login/Sign up" />
            </Link>
          )}
        </div>

        {/* --- MOBILE: SHADCN SHEET --- */}
        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-7 h-7 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle>
                  <Image src={Img} alt="Logo" width={100} height={30} />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 mt-8">
                {/* Mobile Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-lg font-medium ${getLinkStyles(
                        link.href
                      )}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/favorites"
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-lg font-medium text-[#565E69] hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6" />
                      <span>Favorites</span>
                    </div>
                    {favorites.length > 0 && (
                      <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                </div>

                <hr />

                {/* Mobile Language Switcher */}
                <div className="flex items-center justify-between px-2">
                  <span className="font-medium text-gray-600">Language</span>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {["En", "Fn"].map((l) => (
                      <button
                        key={l}
                        onClick={() => setLanguage(l as any)}
                        className={`px-4 py-1 text-sm rounded ${language === l ? "bg-white shadow" : "text-gray-500"
                          }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                {user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                      <Avatar className="h-14 w-14 border-2 border-emerald-500/20 shadow-sm">
                        <AvatarImage src={photoUrl} alt={displayName} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold uppercase text-xl">
                          {displayName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-base font-bold text-slate-900 leading-tight truncate">
                          {displayName}
                        </span>
                        <span className="text-xs text-slate-500 leading-tight mt-0.5 truncate">
                          {user.email}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 w-fit mt-1.5 uppercase tracking-wide">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-white border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 transition-all shadow-sm"
                      >
                        <UserIcon className="w-6 h-6 text-emerald-600" />
                        <span>Profile Info</span>
                      </Link>
                      <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold text-red-600 bg-white border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm w-full text-left"
                      >
                        <LogOut className="w-6 h-6" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <CommonButton label="Login/Sign up" className="w-full" />
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.div >

  );
};

export default Navbar;
