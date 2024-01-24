import Hero from "./Hero";
import SubHero from "./SubHero";
import Footer from "./Footer";
import DashImage from "./DashImage";

export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Hero />
      <SubHero />
      <DashImage />
      <Footer />
    </div>
  );
}
