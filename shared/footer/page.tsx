"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Img from "@/assets/images/nav-logo.png";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full bg-[#1B2232] text-white pt-20 pb-10"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={Img}
                alt="Taranga Market Logo"
                width={150}
                height={200}
                className="hover:opacity-80 transition-opacity"
              />
            </Link>

            <p className="text-gray-400 text-[14.5px] leading-relaxed max-w-[280px]">
              {t("tagline")}
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-[#1D7E87] hover:bg-[#1D7E87]/10 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[17px] font-bold text-white">
              {t("browseCategories")}
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                { key: "vehicles", href: "/vehicles" },
                { key: "properties", href: "/properties" },
                { key: "productsElectronics", href: "/products" },
                { key: "services", href: "/services" },
                { key: "jobs", href: "/jobs" },
                { key: "allItems", href: "/all-items" },
              ].map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[17px] font-bold text-white">
              {t("quickLinks")}
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                { key: "home", href: "/" },
                { key: "myFavorites", href: "/favorites" },
                { key: "aboutUs", href: "/about" },
                { key: "contactUs", href: "/contact" },
                { key: "faqs", href: "/faq" },
                { key: "helpCenter", href: "/help" },
              ].map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-gray-400 text-[15px] hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {t(key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[17px] font-bold text-white">
              {t("getInTouch")}
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#1D7E87] mt-0.5 shrink-0" />
                <span className="text-gray-400 text-[14.5px] leading-snug">
                  House 123, Road 12, Dhanmondi
                  <br />
                  Dhaka 1209, Bangladesh
                </span>
              </div>
              <a
                href="tel:+8801712345678"
                className="flex items-center gap-3.5 hover:text-white transition-colors group"
              >
                <Phone className="w-5 h-5 text-[#1D7E87] group-hover:text-white transition-colors" />
                <span className="text-gray-400 text-[14.5px] group-hover:text-white transition-colors">
                  +880 1712-345678
                </span>
              </a>
              <a
                href="mailto:support@tarangamarket.com"
                className="flex items-center gap-3.5 hover:text-white transition-colors group"
              >
                <Mail className="w-5 h-5 text-[#1D7E87] group-hover:text-white transition-colors" />
                <span className="text-gray-400 text-[14.5px] group-hover:text-white transition-colors">
                  support@tarangamarket.com
                </span>
              </a>
              <div className="mt-2 pt-4 border-t border-gray-800">
                <p className="text-gray-500 text-[13px] mb-2">
                  {t("businessHoursLabel")}
                </p>
                <p className="text-gray-400 text-[14px]">
                  {t("businessHours")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-[14px] text-center md:text-left">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-gray-500 text-[13px] hover:text-white transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href="/terms"
                className="text-gray-500 text-[13px] hover:text-white transition-colors"
              >
                {t("termsOfService")}
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 text-[13px] hover:text-white transition-colors"
              >
                {t("cookiePolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
