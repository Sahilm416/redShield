import Hero from "./Hero";
import SubHero from "./SubHero";
import Footer from "./Footer";
import DashImage from "./DashImage";
import SecureImage from "./SecureImage";
export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Hero />
      <SubHero />
      <DashImage />
      <SecureImage />
      <Footer />
    </div>
  );
}
