import React from "react";
import Img from "@/assets/images/banner-bg.png";
import SearchHero from "@/clientcomponent/page";
import Image from "next/image";

import Img1 from "@/assets/images/img1.png";
import Img2 from "@/assets/images/img2.png";
import Img3 from "@/assets/images/img3.png";
import Img4 from "@/assets/images/img4.png";

const Banner = () => {
  return (
    <>
      {/* set the bg i imported the img   */}
      <div
        className="w-full relative  h-[659px] bg-white flex items-center justify-center"
        style={{
          backgroundImage: `url(${Img.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center align-middle mb-20 gap-4 w-full text-center">
          <h1 className="text-center  font-[Inter] text-[60px] not-italic font-medium leading-[80px] max-w-4xl">
            A Simple Marketplace to Find and Contact Local Sellers
          </h1>
          <p className="text-center mt-4 font-[Inter] text-[20px] not-italic font-normal leading-[32px] text-gray-600 max-w-2xl">
            Lorem ipsum dolor sit amet consectetur. Dictum congue eros at
            ullamcorper.
          </p>

          <div className="w-full max-w-5xl">
            <SearchHero />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 absolute -bottom-20">
            <div className="bg-white rounded-lg p-5 border border-[#D1D5DB] [box-shadow:0_1.593px_6.373px_0_rgba(29,_126,_135,_0.10)] px-5">
              <div className="flex text-center items-center justify-center gap-6">
                <Image src={Img1} alt="App Preview" width={100} height={100} />
              </div>
              <div>
                <h1 className="text-[#000] text-center  text-[14px] not-italic font-semibold leading-[19.119px]">
                  100% Verified
                </h1>
                <p className="text-[#676F7E] text-center font-[Inter] text-[12px] not-italic font-normal leading-[15.932px]">
                  Every listing is personally verified
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-[#D1D5DB] [box-shadow:0_1.593px_6.373px_0_rgba(29,_126,_135,_0.10)] px-5">
              <div className="flex text-center items-center justify-center gap-6">
                <Image src={Img2} alt="App Preview" width={100} height={100} />
              </div>
              <div>
                <h1 className="text-[#000] text-center  text-[14px] not-italic font-semibold leading-[19.119px]">
                  100% Verified
                </h1>
                <p className="text-[#676F7E] text-center font-[Inter] text-[12px] not-italic font-normal leading-[15.932px]">
                  Every listing is personally verified
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-[#D1D5DB] [box-shadow:0_1.593px_6.373px_0_rgba(29,_126,_135,_0.10)] px-5">
              <div className="flex text-center items-center justify-center gap-6">
                <Image src={Img3} alt="App Preview" width={100} height={100} />
              </div>
              <div>
                <h1 className="text-[#000] text-center  text-[14px] not-italic font-semibold leading-[19.119px]">
                  100% Verified
                </h1>
                <p className="text-[#676F7E] text-center font-[Inter] text-[12px] not-italic font-normal leading-[15.932px]">
                  Every listing is personally verified
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-[#D1D5DB] [box-shadow:0_1.593px_6.373px_0_rgba(29,_126,_135,_0.10)] px-5">
              <div className="flex text-center items-center justify-center gap-6">
                <Image src={Img4} alt="App Preview" width={100} height={100} />
              </div>
              <div>
                <h1 className="text-[#000] text-center  text-[14px] not-italic font-semibold leading-[19.119px]">
                  100% Verified
                </h1>
                <p className="text-[#676F7E] text-center font-[Inter] text-[12px] not-italic font-normal leading-[15.932px]">
                  Every listing is personally verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
