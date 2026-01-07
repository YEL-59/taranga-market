import Navbar from "@/shared/navbar/page";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main> {children}</main>
    </>
  );
};

export default MainLayout;
