"use client";

import Image from "next/image";
import BannerBg from "@/assets/images/banner-bg.png";
import SearchHero from "@/clientcomponent/page";
import { useTranslations } from "next-intl";
import { useHeroSection } from "@/hooks/useHeroSection";

const Banner = () => {
  const t = useTranslations("Banner");
  const { heroData, isLoading } = useHeroSection();

  return (
    <section className="relative w-full min-h-[650px] md:min-h-[700px] lg:h-[750px] flex flex-col items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 h-[85%] md:h-full overflow-hidden">
        <Image
          src={BannerBg}
          alt="Banner Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main Content Content */}
      <div className="container relative z-10 mx-auto px-4 pt-12 md:pt-20 pb-16 md:pb-32 flex flex-col items-center">
        {/* Heading Section */}
        <div className="max-w-4xl text-center mb-8 md:mb-10 w-full">
          <h1 className="text-[28px] sm:text-[32px] md:text-[50px] lg:text-[60px] font-semibold leading-[1.3] md:leading-[1.2] lg:leading-[80px] text-[#1a2e35] font-[Inter]">
            {isLoading ? (
              <span className="inline-block w-4/5 h-14 md:h-16 bg-gray-200 animate-pulse rounded-xl" />
            ) : heroData ? (
              heroData.heading
            ) : (
              t("heading")
            )}
          </h1>
          <p className="mt-4 md:mt-6 text-[14px] md:text-[20px] text-gray-600 font-normal leading-[1.6] max-w-2xl mx-auto font-[Inter]">
            {isLoading ? (
              <span className="inline-block w-2/3 h-8 bg-gray-200 animate-pulse rounded-lg" />
            ) : heroData ? (
              heroData.subtitle || heroData.sort_description
            ) : (
              t("subheading")
            )}
          </p>
        </div>

        {/* Search Component Wrapper */}
        <div className="w-full max-w-5xl transition-transform hover:scale-[1.01] duration-300">
          <SearchHero />
        </div>
      </div>
    </section>
  );
};

export default Banner;

