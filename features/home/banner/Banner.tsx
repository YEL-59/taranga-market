"use client";

import Image from "next/image";
import BannerBg from "@/assets/images/banner-bg.png";
import SearchHero from "@/clientcomponent/page";
import { motion } from "framer-motion";

// Import your feature icons
import Img1 from "@/assets/images/img1.png";
import Img2 from "@/assets/images/img2.png";
import Img3 from "@/assets/images/img3.png";
import Img4 from "@/assets/images/img4.png";

const Banner = () => {
  const features = [
    {
      id: 1,
      img: Img1,
      title: "100% Verified",
      desc: "Every listing is personally verified",
    },
    {
      id: 2,
      img: Img2,
      title: "Secure Payments",
      desc: "Your transactions are protected",
    },
    { id: 3, img: Img3, title: "Local Support", desc: "Help is always nearby" },
    {
      id: 4,
      img: Img4,
      title: "Fast Delivery",
      desc: "Get items in record time",
    },
  ];

  // Double the features for seamless marquee loop
  const marqueeFeatures = [...features, ...features];

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
        <div className="max-w-4xl text-center mb-8 md:mb-10">
          <h1 className="text-[28px] sm:text-[32px] md:text-[50px] lg:text-[60px] font-semibold leading-[1.3] md:leading-[1.2] lg:leading-[80px] text-[#1a2e35] font-[Inter]">
            A Simple Marketplace to Find and Contact Local Sellers
          </h1>
          <p className="mt-4 md:mt-6 text-[14px] md:text-[20px] text-gray-600 font-normal leading-[1.6] max-w-2xl mx-auto font-[Inter]">
            Lorem ipsum dolor sit amet consectetur. Dictum congue eros at
            ullamcorper.
          </p>
        </div>

        {/* Search Component Wrapper */}
        <div className="w-full max-w-5xl transition-transform hover:scale-[1.01] duration-300">
          <SearchHero />
        </div>
      </div>

      {/* Floating Features Section mobile marqu +desktop view */}
      {/* <div className="w-full relative z-20 mt-[-20px] md:mt-[-60px] pb-32 md:pb-16">
       
        <div className="sm:hidden overflow-visible py-4">
          <motion.div
            className="flex gap-4 w-max px-4"
            animate={{
              x: [0, -50 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {marqueeFeatures.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col items-center text-center w-[230px] shrink-0"
              >
                <div className="mb-3">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[#0D1821] text-[16px] font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-[#676F7E] font-[Inter] text-[13px] leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

      
        <div className="hidden sm:block container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group h-full"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-[#0D1821] text-[18px] font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-[#676F7E] font-[Inter] text-[14px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Banner;
