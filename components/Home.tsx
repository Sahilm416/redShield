import Hero from "./Hero";
import SubHero from "./SubHero";
import DashImage from "./DashImage";
import Ammouncement from "./Announcement";
export default async function Home() {
  return (
    <div className="w-full flex flex-col gap-10 mb-5">
      <Ammouncement/>
      <Hero />
      <SubHero />
      <DashImage />
    </div>
  );
}
