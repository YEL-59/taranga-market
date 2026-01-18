import Banner from "@/features/home/banner/Banner";
import Category from "@/features/home/category/page";
import Featured from "@/features/home/featured/Featured";
import Recentlist from "@/features/home/recent/Recentlist";
import ChoseUs from "@/features/home/choseus/Choseus";
import Testimonials from "@/features/testimonials/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner />
      <Category />
      <Featured />
  
      <Recentlist />
      <Testimonials />
      <ChoseUs />
    </div>
  );
}
