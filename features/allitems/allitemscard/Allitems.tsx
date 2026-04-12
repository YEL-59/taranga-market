"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Heart, Calendar, Gauge, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/context/FavoritesContext";
import { useAllProducts } from "@/hooks/useAllProducts";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const getDetailLink = (item: any) => {
  return `/featured-details?id=${item.id}`;
};

const ListingCard = ({ item }: { item: any }) => {
  const { toggleFavorite, isFavorite, isCustomer } = useFavorites();
  const ct = useTranslations("Common");
  const fav = isFavorite(item.id);

  const image = item.featured_image || "";
  const type = item.category?.name || "Product";
  const price = item.price
    ? item.price.toString().includes("FCFA")
      ? item.price
      : `${Number(item.price).toLocaleString()} FCFA`
    : "Price on request";

  console.log(item);

  return (
    <Card className="overflow-hidden border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] group flex flex-col h-full rounded-[20px] p-2.5">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 rounded-[15px]">
        {image && (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        <Badge className="absolute left-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold bg-white/95 text-gray-800 hover:bg-white border-0 shadow-sm">
          {type}
        </Badge>
        {item.is_featured && (
          <Badge className="absolute right-2.5 top-2.5 rounded-full px-3 py-0.5 text-[11px] font-semibold border border-gray-200 bg-white/95 text-gray-800 hover:bg-white shadow-sm">
            {ct("featured")}
          </Badge>
        )}
        {isCustomer && (
          <button
            onClick={() => toggleFavorite({ ...item, image: image })}
            className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg shadow-sm transition-colors ${
              fav
                ? "bg-[#F97316] text-white"
                : "bg-white/95 text-[#F97316] hover:bg-white"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${fav ? "fill-current" : ""}`}
              strokeWidth={2.5}
            />
          </button>
        )}
      </div>

      <CardContent className="flex flex-col flex-1 p-3.5 pt-4">
        <h3 className="line-clamp-2 text-[14.5px] font-semibold text-gray-800 leading-snug mb-3 min-h-[40px]">
          {item.title}
        </h3>

        {item.meta && (
          <div className="mb-4 flex items-center gap-4 text-[12px] text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span>{item.meta.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 text-gray-400" />
              <span>{item.meta.mileage}</span>
            </div>
          </div>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="truncate">
                {item.city} , {item.state}
              </span>
            </div>
            <span className="text-[13.5px] font-bold text-[#F97316]">
              {price}
            </span>
          </div>

          <Link href={getDetailLink(item)} className="block w-full">
            <Button
              variant={item.is_featured ? "default" : "outline"}
              className={`w-full rounded-xl font-semibold text-[13px] h-10 transition-all bg-white border-gray-100 text-gray-600 hover:bg-[#1D7E87] hover:text-white hover:border-[#1D7E87] cursor-pointer`}
            >
              {ct("viewDetails")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const Allitems = () => {
  const t = useTranslations("AllItems");
  const ct = useTranslations("Common");
  const { products, isLoading, isLoadingMore, error, loadMore, hasMore } =
    useAllProducts();

  if (error) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {t("title")}
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#2A8E8E]" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.1 }}
              >
                <ListingCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            {t("noProducts")}
          </div>
        )}

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <Button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="bg-[#1D7E87] hover:bg-[#16636a] text-white px-10 py-6 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#1D7E87]/20 min-w-[180px]"
            >
              {isLoadingMore ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{ct("loading")}</span>
                </div>
              ) : (
                t("loadMore")
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Allitems;
