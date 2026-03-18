import Banner from "@/features/home/banner/Banner";
import Category from "@/features/home/category/page";
import Featured from "@/features/home/featured/Featured";
import Recentlist from "@/features/home/recent/Recentlist";
import ChoseUs from "@/features/home/choseus/Choseus";
import Marque from "@/features/Marque/Marque";
import {
  getFeaturedProductsService,
  getRecentProductsService,
} from "@/services/listing";

export default async function Home() {
  // Fetch data on the server for immediate display
  const [featuredRes, recentRes] = await Promise.all([
    getFeaturedProductsService(),
    getRecentProductsService(),
  ]);

  const featuredData = featuredRes.success ? featuredRes.data : [];
  const recentData = recentRes.success ? recentRes.data : [];

  return (
    <div>
      <Banner />
      <Category />
      <Featured initialData={featuredData} />

      <Recentlist initialData={recentData} />
      <Marque />
      {/* <Testimonials /> */}
      <ChoseUs />
    </div>
  );
}
