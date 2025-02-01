import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar/>
        <main className="flex-1 wrapper">{children}</main>
        <Footer/>
      </div>
    );
  }
  