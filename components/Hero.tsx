import Command from "./Command";
import { Button } from "./ui/button";
import Link from "next/link";
export default function HeroComponent() {
  return (
    <div className="w-full h-full px-2">
      <div className="w-full h-full flex justify-start sm:items-center gap-5">
        <div className="h-full flex flex-col justify-center items-center">
          <span className="w-[20px] h-[20px] bg-zinc-800 shadow-[0px_0px_20px_#27272a] dark:bg-zinc-100 rounded-full dark:shadow-[0px_0px_20px_#fafafa]">
            {" "}
          </span>
          <span className="w-[5px] mt-[-5px] h-full bg-zinc-800 shadow-[0px_0px_20px_#27272a] dark:bg-zinc-100 dark:shadow-[0px_0px_20px_#fafafa]">
            {""}
          </span>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="pt-10 sm:pt-0 w-full inline">
            <span className="md:text-7xl sm:text-6xl text-5xl font-sans tracking-tighter none bg-clip-text text-transparent bg-gradient-to-b from-black via-black to-white dark:from-white dark:via-white/80 dark:to-black">
               Redis based authentication
            </span>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-zinc-400 max-w-[600px]">
              Swift authentication, seamless user management. Harness the power
              of Redis with elegance and speed.
            </p>
            <div className="flex sm:flex-row flex-col gap-5">
              <Link className="w-[200px]" href={"/Dashboard"}>
                <Button className=" rounded-none w-[200px]">Get Started</Button>
              </Link>

              <Button
                variant={"outline"}
                className=" rounded-none w-[200px] border-zinc-300"
              >
                GitHub <GitHubLogo />
              </Button>
            </div>
          </div>
          <span className="w-full sm:hidden h-2 border-b m-2 border-dashed border-zinc-500 my-7">
            {""}
          </span>
          <div className="flex flex-col gap-5 sm:mt-10">
            <p className="md:text-6xl sm:text-5xl text-4xl font-sans tracking-tighter none bg-clip-text text-transparent bg-gradient-to-b from-black via-black to-white dark:from-white dark:via-white dark:to-black">
              Install SDK
            </p>
            <p className="text-zinc-400">
              Install all the latest features and services with a single command
            </p>
            <Command />
          </div>
          <span className="w-full sm:hidden h-2 border-b m-2 border-dashed border-zinc-500 my-7">
            {""}
          </span>
        </div>
      </div>
    </div>
  );
}

const GitHubLogo = () => {
  return (
    <svg
      className=" w-[40px] h-[40px] dark:fill-slate-100"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 72 72"
    >
      <path d="M36,12c13.255,0,24,10.745,24,24c0,10.656-6.948,19.685-16.559,22.818c0.003-0.009,0.007-0.022,0.007-0.022	s-1.62-0.759-1.586-2.114c0.038-1.491,0-4.971,0-6.248c0-2.193-1.388-3.747-1.388-3.747s10.884,0.122,10.884-11.491	c0-4.481-2.342-6.812-2.342-6.812s1.23-4.784-0.426-6.812c-1.856-0.2-5.18,1.774-6.6,2.697c0,0-2.25-0.922-5.991-0.922	c-3.742,0-5.991,0.922-5.991,0.922c-1.419-0.922-4.744-2.897-6.6-2.697c-1.656,2.029-0.426,6.812-0.426,6.812	s-2.342,2.332-2.342,6.812c0,11.613,10.884,11.491,10.884,11.491s-1.097,1.239-1.336,3.061c-0.76,0.258-1.877,0.576-2.78,0.576	c-2.362,0-4.159-2.296-4.817-3.358c-0.649-1.048-1.98-1.927-3.221-1.927c-0.817,0-1.216,0.409-1.216,0.876s1.146,0.793,1.902,1.659	c1.594,1.826,1.565,5.933,7.245,5.933c0.617,0,1.876-0.152,2.823-0.279c-0.006,1.293-0.007,2.657,0.013,3.454	c0.034,1.355-1.586,2.114-1.586,2.114s0.004,0.013,0.007,0.022C18.948,55.685,12,46.656,12,36C12,22.745,22.745,12,36,12z"></path>
    </svg>
  );
};
