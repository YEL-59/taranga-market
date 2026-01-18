import Image from "next/image";
import BannerBg from "@/assets/images/banner-bg.png";
import SearchHero from "@/clientcomponent/page";

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

  return (
    <section className="relative w-full h-[659px] flex flex-col items-center">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BannerBg}
          alt="Banner Background"
          fill
          priority
          className="object-fit object-center"
        />
      </div>

      {/* Main Content Content */}
      <div className="container relative z-10 mx-auto px-4 pt-20 pb-32 flex flex-col items-center">
        {/* Heading Section */}
        <div className="max-w-4xl text-center mb-10">
          <h1 className="text-[32px] md:text-[50px] lg:text-[60px] font-medium leading-[1.2] md:leading-[80px] text-[#1a2e35] font-[Inter]">
            A Simple Marketplace to Find and Contact Local Sellers
          </h1>
          <p className="mt-6 text-[16px] md:text-[20px] text-gray-600 font-normal leading-[1.6]  mx-auto font-[Inter]">
            Lorem ipsum dolor sit amet consectetur. Dictum congue eros at
            ullamcorper.
          </p>
        </div>

        {/* Search Component Wrapper */}
        <div className="w-full max-w-5xl transition-transform hover:scale-[1.01] duration-300">
          <SearchHero />
        </div>
      </div>

      {/* Floating Features Grid */}
      <div className=" px-4 relative z-20 bottom-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 px-5 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4 ">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
              <h3 className="text-[#000] text-[16px] font-semibold mb-1">
                {item.title}
              </h3>
              <p className="text-[#676F7E] font-[Inter] text-[13px] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
