import Footer from "@/shared/footer/page";
import Navbar from "@/shared/navbar/page";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
