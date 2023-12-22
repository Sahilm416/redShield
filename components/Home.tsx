import Hero from "./Hero";
import Command from "./Command";
import SubHero from "./SubHero";

export default function HomeComponent() {
  return (
    <div className="mt-[100px] w-auto min-w-[360px] mx-2 sm:mx-0 sm:mt-0 flex flex-col gap-3 justify-start items-center">
      <div className="h-auto sm:h-[100vh] sm:flex sm:justify-center sm:flex-col sm:items-center">
        <Hero />
        <Command />
      </div>
      <SubHero />
      <ArrowIcon/>
    </div>
  );
}

function ArrowIcon() {
  return (
    <div className="scroll-down sm:block hidden border-b-slate-700 border-r-slate-700 dark:border-b-slate-300 dark:border-r-slate-300">
    </div>
  );
}
