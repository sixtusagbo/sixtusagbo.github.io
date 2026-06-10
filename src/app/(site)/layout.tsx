import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
