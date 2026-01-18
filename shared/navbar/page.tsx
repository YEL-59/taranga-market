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

import Img from "@/assets/images/logo-nav.png";
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

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/all-items" },
  ];

  // Helper for active styles
  const getLinkStyles = (href: string) =>
    pathname === href
      ? "text-white bg-[#227c85]" // Active state with background
      : "text-[#565E69] hover:text-[#227c85]"; // Inactive state

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
               <Image src={Img} alt="Logo" width={120} height={40} priority />
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
                className="relative px-6 py-2 rounded-full text-[16px] font-medium transition-colors"
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
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  language === lang
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
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <CommonButton label="Login/Sign up" />
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
                        className={`px-4 py-1 text-sm rounded ${
                          language === l ? "bg-white shadow" : "text-gray-500"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <CommonButton label="Login/Sign up" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
