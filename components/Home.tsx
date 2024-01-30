import Hero from "./Hero";
import SubHero from "./SubHero";
import Footer from "./Footer";
import DashImage from "./DashImage";
import Ammouncement from "./Announcement";
export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-10">
      <Ammouncement/>
      <Hero />
      <SubHero />
      <DashImage />
      <Footer />
    </div>
  );
}
