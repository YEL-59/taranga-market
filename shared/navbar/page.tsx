"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart } from "lucide-react";

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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import Img from "@/assets/images/nav-logo.png";
import CommonButton from "@/common/commonButton/CommonButton";
import { useFavorites } from "@/context/FavoritesContext";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface NavLink {
  name: string;
  href: string;
}

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const t = useTranslations("Navbar");

  const navLinks: NavLink[] = [
    { name: t("home"), href: "/" },
    { name: t("allItems"), href: "/all-items" },
  ];

  // Helper for active styles
  const getLinkStyles = (href: string) =>
    pathname === href
      ? "text-white bg-[#227c85]"
      : "text-[#565E69] hover:text-[#227c85]";

  // Compute display name safely
  const displayName =
    user?.full_name ||
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
    "User";

  const baseUrl = "https://raymondred.thesyndicates.team/";
  const photoUrl = user?.profile_photo
    ? user.profile_photo.startsWith("http")
      ? user.profile_photo
      : `${baseUrl}${user.profile_photo}`
    : "";

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
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-[16px] truncate font-medium transition-colors"
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[#227c85] rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={`${
                    pathname === link.href
                      ? "text-white"
                      : "text-[#565E69] hover:text-[#227c85]"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Favorites */}
          {/* <Link
            href="/favorites"
            className="flex items-center gap-1.5 text-[#565E69] hover:text-[#227c85] relative"
            aria-label={t("favorites")}
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#227c85] text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link> */}

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
              <DropdownMenuContent
                align="end"
                className="w-64 mt-2 p-2 rounded-xl shadow-xl border-slate-100"
              >
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

                <DropdownMenuItem
                  asChild
                  className="rounded-lg py-2.5 my-0.5 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer"
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 w-full"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{t("profileInfo")}</span>
                  </Link>
                </DropdownMenuItem>

                {user?.role === "provider" && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem
                      asChild
                      className="rounded-lg py-2.5 my-0.5 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 w-full"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">
                          {t("providerDashboard")}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator className="bg-slate-100" />

                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-lg py-2.5 my-0.5 text-red-600 focus:text-red-700 focus:bg-red-50 flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <CommonButton label={t("login")} />
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
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-lg font-medium ${getLinkStyles(
                        link.href,
                      )}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/favorites"
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-lg font-medium text-[#565E69] hover:bg-gray-100"
                    aria-label={t("favorites")}
                  >
                    <div className="flex items-center gap-2">
                      <Heart className="w-6 h-6" />
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
                  <span className="font-medium text-gray-600 text-sm">
                    Language
                  </span>
                  <LanguageSwitcher />
                </div>

                <hr />

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
                        <span>{t("profileInfo")}</span>
                      </Link>
                      {user?.role === "provider" && (
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold text-slate-700 bg-white border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 transition-all shadow-sm"
                        >
                          <UserIcon className="w-6 h-6 text-emerald-600" />
                          <span>{t("providerDashboard")}</span>
                        </Link>
                      )}
                      <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold text-red-600 bg-white border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm w-full text-left"
                      >
                        <LogOut className="w-6 h-6" />
                        <span>{t("logout")}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <CommonButton label={t("login")} className="w-full" />
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;
