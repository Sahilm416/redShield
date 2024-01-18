import Hero from "./Hero";
import SubHero from "./SubHero";
import Footer from "./Footer";
export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <SubHero />
      <Footer />
    </div>
  );
}
