"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

// Import your feature icons
import Img1 from "@/assets/images/img1.png";
import Img2 from "@/assets/images/img2.png";
import Img3 from "@/assets/images/img3.png";
import Img4 from "@/assets/images/img4.png";

const Marque = () => {
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
        { 
            id: 3, 
            img: Img3, 
            title: "Local Support", 
            desc: "Help is always nearby" 
        },
        {
            id: 4,
            img: Img4,
            title: "Fast Delivery",
            desc: "Get items in record time",
        },
        {
            id: 5,
            img: Img1,
            title: "100% Verified",
            desc: "Every listing is personally verified",
        },
        {
            id: 6,
            img: Img2,
            title: "Secure Payments",
            desc: "Your transactions are protected",
        },
        { 
            id: 7, 
            img: Img3, 
            title: "Local Support", 
            desc: "Help is always nearby" 
        },
        {
            id: 8,
            img: Img4,
            title: "Fast Delivery",
            desc: "Get items in record time",
        },
    ];

    return (
        <section className="w-full relative z-20 mt-[-20px] md:mt-[-60px] py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    grabCursor={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.3,
                            spaceBetween: 16,
                        },
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 16,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="marque-swiper !overflow-visible"
                >
                    {features.map((item) => (
                        <SwiperSlide key={item.id} className="!h-auto">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group h-full">
                                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-[#0D1821] text-[18px] font-semibold mb-2 font-[Inter]">
                                    {item.title}
                                </h3>
                                <p className="text-[#676F7E] font-[Inter] text-[14px] leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Marque;