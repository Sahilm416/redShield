"use client"
import Command from "./Command";
import { Button } from "./ui/button";
import Link from "next/link";
import {motion} from "framer-motion"
export default function HeroComponent() {
  return (
    <motion.div  initial={{opacity: 0 ,dur: 1 , y:20}} whileInView={{opacity: 1, y:0}} className=" w-full h-max flex flex-col pt-[80px] md:pt-[80px] items-center">
      <div className="flex w-full justify-center max-w-[1500px]">
        <div className="flex flex-col justify-between ">
          <div className="h-[7vw] w-[7vw] border-b border-r border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] flex justify-end items-end">
            <div className="w-[7vw] h-[7vw] rounded-full relative top-[3.5vw] left-[3.5vw] border-t border-l border-[#EBEBEB] dark:border-[#1F1F1F] border-dashed">
              {" "}
            </div>
          </div>
          <div className="h-[7vw] w-[7vw] border-t border-r border-dashed border-[#EBEBEB] dark:border-[#1F1F1F]">
            {" "}
          </div>
        </div>
        <div className="w-full flex flex-col mt-[7vw] mb-[7vw]">
          <div className="h-full w-full border border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] flex flex-col items-center">
            <h1 className="text-[max(48px,min(5vw,72px))] w-full xs:text-white font-[800] text-center bg-clip-text text-transparent bg-gradient-to-b from-[#171717]/70 via-[#171717]/90 to-[#171717] dark:from-[#EDEDED] dark:via-[#EDEDED]/80 dark:to-[#EDEDED]/90 border-b border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-8 leading-none">
              Redis based Auth for Next
            </h1>

            <div className="w-full flex justify-center items-center text-center border-b border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-3">
              <p className=" text-lg font-normal max-w-[700px] dark:text-[#A1A1A1] text-[#666666] py-5 px-7 ">
                Swift authentication, seamless user management. Harness the
                power of Redis with elegance and speed.
              </p>
            </div>

            <div className="w-full flex flex-col items-center">
              <div className="flex gap-5 px-5 py-10 md:border-x border-dashed border-[#EBEBEB] dark:border-[#1F1F1F]">
                <Link href={"/Dashboard"}>
                  <Button className="rounded-none md:w-[200px] w-[35vw] h-[45px]">
                    Get started
                  </Button>
                </Link>
                <Link target="blanc" href={"https://github.com/sahilm416"}>
                  <Button
                    variant={"outline"}
                    className="rounded-none md:w-[200px] w-[35vw]  h-[45px] dark:border-zinc-700 border-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    Github <GitHubLogo />
                  </Button>
                </Link>
              </div>
              <div className="w-full border-t border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-5">
                <Command />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-[7vw] w-[7vw] border-b border-l border-dashed border-[#EBEBEB] dark:border-[#1F1F1F]">
            {" "}
          </div>

          <div className="h-[7vw] w-[7vw] border-t border-l border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] ">
            <div className="w-[7vw] h-[7vw] rounded-full relative top-[-3.5vw] left-[-3.5vw] border-b border-r border-[#EBEBEB] dark:border-[#1F1F1F] border-dashed">
              {" "}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
