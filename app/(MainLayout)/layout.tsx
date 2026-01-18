"use client";

import Footer from "@/shared/footer/page";
import Navbar from "@/shared/navbar/page";
import SmoothScroll from "@/components/SmoothScroll";
import { motion } from "framer-motion";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom aesthetic easing
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default MainLayout;
