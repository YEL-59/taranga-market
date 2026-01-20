
"use client";

import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import LeftFrameImg from "@/assets/images/testimonial-frame-left.jpg";
import CenterFrameImg from "@/assets/images/testimonial-frame-center.jpg";
import RightFrameImg from "@/assets/images/testimonial-frame-right.jpg";
// import LeftSideShap from "@/assets/images/left-side-shap.png"
// import RightSideShap from "@/assets/images/right-side-shap.png"

const testimonialData = [
  {
    id: 1,
    name: "Hannah Schmitt",
    role: "Bsc Student",
    image: "https://i.pravatar.cc/150?u=1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Msc Student",
    image: "https://i.pravatar.cc/150?u=2",
    text: "Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Faucibus venenatis felis id augue sit cursus pellentesque enim",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "College Student",
    image: "https://i.pravatar.cc/150?u=3",
    text: "Faucibus venenatis sed augue sit cursus pellentesque enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "PhD Student",
    image: "https://i.pravatar.cc/150?u=4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit curs.",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Undergraduate",
    image: "https://i.pravatar.cc/150?u=5",
    text: "The support here is incredible. I found my perfect studio within hours and the verification process gave me such peace of mind. Highly recommend to all international students!",
  },
  {
    id: 6,
    name: "Sophia Rodriguez",
    role: "Master Student",
    image: "https://i.pravatar.cc/150?u=6",
    text: "StudentStay made my move to Nottingham so much easier. The transparency about bills and location was exactly what I needed to make an informed decision.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 lg:py-32 bg-white overflow-hidden flex flex-col items-center">
        <div>
            {/* position left side shap */}
            {/* <Image className="absolute top-20 left-0 z-0"  src={LeftSideShap} alt="" /> */}
            {/* position right side shap */}
            {/* <Image className="absolute top-80 right-0 z-0 lg:block hidden"  src={RightSideShap} alt="" /> */}
        </div>
      {/* Header with Navigation */}
      <div className="flex items-center justify-center md:gap-8 lg:mb-16  px-4 z-20">
        <button className="testimonial-prev p-2 text-gray-400 hover:text-[#1D7E87] transition-all cursor-pointer active:scale-90">
          <ChevronLeft size={32} />
        </button>
        <h2 className="text-2xl lg:text-[40px] font-bold text-black">
          What Global Students Say About Us
        </h2>
        <button className="testimonial-next p-2 text-gray-400 hover:text-[#1D7E87] transition-all cursor-pointer active:scale-90">
          <ChevronRight size={32} />
        </button>
      </div>


{/* Main Container for Frames and Slider */}
      <div className="relative w-full max-w-[1240px] px-4 mx-auto">
        {/* STATIC BACKGROUND FRAMES - They stay put */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-none select-none z-0 px-4">
          {/* Left Frame */}
          <div className="relative flex-1 h-[450px] lg:h-[500px] scale-90 translate-y-16 hidden md:block">
            <Image
              src={LeftFrameImg}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Center Frame */}
          <div className="relative flex-1 h-[500px] lg:h-[550px] scale-100 lg:scale-110 translate-y-16">
            <Image
              src={CenterFrameImg}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Right Frame */}
          <div className="relative flex-1 h-[450px] lg:h-[500px] scale-90 translate-y-16 hidden md:block">
            <Image
              src={RightFrameImg}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* SLIDING CONTENT - Just the data moves */}
        <div className="w-full relative z-10">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".testimonial-prev",
              nextEl: ".testimonial-next",
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-dots",
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            className="testimonial-swiper"
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id}>
                {({ isActive }) => (
                  <div
                    className={`flex flex-col items-center justify-center h-[450px] md:h-[500px] lg:h-[550px] transition-all duration-700 text-center ${
                      isActive
                        ? "opacity-100 scale-100 lg:scale-110"
                        : "opacity-100 scale-90 pt-12"
                    }`}
                  >
                    {/* Content Box - Sized to fit exactly within the frames */}
                    <div className="flex flex-col items-center w-full max-w-[320px] px-6">
                      {/* Avatar */}
                      <div className="relative w-20 h-20 lg:w-24 lg:h-24 mb-6">
                        <div
                          className={`absolute -inset-1 bg-linear-to-tr from-[#1D7E87] to-[#EF6639] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300 ${
                            isActive ? "opacity-40" : "opacity-0"
                          }`}
                        ></div>
                        <div className="relative w-full h-full border-4 border-white rounded-full overflow-hidden shadow-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <h3 className="text-lg lg:text-xl font-bold text-black mb-1">
                        {item.name}
                      </h3>
                      <p className="text-[#676F7E] text-sm mb-4 font-medium">
                        {item.role}
                      </p>


{/* Quote */}
                      <Quote
                        className="text-[#1D7E87] mb-4 rotate-180"
                        size={24}
                        fill="currentColor"
                        fillOpacity={0.1}
                      />

                      {/* Text */}
                      <p
                        className={`text-[#565E69] text-sm leading-relaxed line-clamp-6 ${
                          isActive ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Pagination Dots */}
      <div className="testimonial-dots flex justify-center gap-2 mt-10 z-20"></div>

      <style jsx global>{`
        .testimonial-dots .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .testimonial-dots .swiper-pagination-bullet-active {
          background: #227c85;
          width: 25px;
          border-radius: 5px;
        }
        /* Crucial: Ensure the swiper clips anything outside the 3 active frames */
        .testimonial-swiper {
          overflow: hidden !important;
        }
        .testimonial-swiper .swiper-wrapper {
          align-items: center;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;