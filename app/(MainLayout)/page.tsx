import Banner from "@/pages/home/banner/Banner";
import Category from "@/pages/home/category/page";
import Featured from "@/pages/home/featured/Featured";
import Recentlist from "@/pages/home/recent/Recentlist";

export default function Home() {
  return (
    <div>
      <Banner />
      <Category />
      <Featured />
      <Recentlist />
    </div>
  );
}
