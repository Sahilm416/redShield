import Hero from "./Hero";
import SubHero from "./SubHero";

export default async function Home() {
  return (
    <div className="w-full h-screen pt-[80px]">
      <Hero />
      <SubHero />
    </div>
  );
}
