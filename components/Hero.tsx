import Command from "./Command";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
export default function HeroComponent() {
  return (
    <div className=" w-full h-full max-h-[1000px] flex flex-col md:justify-center justify-start pt-[80px] md:pt-0 items-center transition-opacity duration-1000 opacity-100">
      <div className="flex w-full justify-center max-w-[1200px]">
        <div className="flex h-full flex-col justify-between ">
          <div className="h-[5vw] w-[5vw] border-b-2 border-r-2  border-[#A8A8A8] dark:border-[#878787] flex justify-end items-end">
            <div className="w-[5vw] h-[5vw] rounded-full relative top-[2.5vw] left-[2.5vw] border-t-2 border-l-2 border-[#A8A8A8] dark:border-[#878787] border-dashed">
              {" "}
            </div>
          </div>
          <div className="h-[5vw] w-[5vw] border-t-2 border-r-2 dark:border-zinc-700">
            {" "}
          </div>
        </div>
        <div className="flex flex-col mt-[5vw] mb-[5vw]">
          <div className="h-full w-full border-2 border-[#EBEBEB] dark:border-[#1F1F1F] flex flex-col items-center">
            <p className="text-[max(38px,min(5vw,70px))] xs:text-white font-bold font-sans text-center dark:text-[#EDEDED] text-[#171717] border-b border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-3 selection:bg-violet-700 selection:text-white">
              Redis based authentication
            </p>
            <div className="w-full flex justify-center items-center text-center border-b border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-3">
              <p className=" text-lg font-normal font-sans max-w-[700px] dark:text-[#A1A1A1] text-[#666666] p-2 selection:bg-violet-700 selection:text-white">
              Swift authentication, seamless user management. Harness the power
              of Redis with elegance and speed.
            </p>
            </div>
            
            <div className="w-full flex flex-col items-center">
              <div className="flex gap-5 border-l border-r border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-5">
                <Link href={"/Dashboard"}>
                  <Button className="rounded-none md:w-[200px] w-[35vw] h-[45px]">
                    Get started
                  </Button>
                </Link>
                <Link href={"https://github.com/sahilm416"}>
                  <Button
                    variant={"outline"}
                    className="rounded-none md:w-[200px] w-[35vw]  h-[45px] border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    Github <GitHubLogo/>
                  </Button>
                </Link>
              </div>
              <div className="w-full border-t border-dashed border-[#EBEBEB] dark:border-[#1F1F1F] p-3">
                <Command />
              </div>
              
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="h-[5vw] w-[5vw] border-b-2 border-l-2 dark:border-zinc-700">
            {" "}
          </div>

          <div className="h-[5vw] w-[5vw] border-t-2 border-l-2 border-[#A8A8A8] dark:border-[#878787] ">
            <div className="w-[5vw] h-[5vw] rounded-full relative top-[-2.5vw] left-[-2.5vw] border-b-2 border-r-2 border-[#A8A8A8] dark:border-[#878787] border-dashed">
              {" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /*<p className="text-[max(40px,min(5vw,70px))] font-bold font-sans text-center text-slate-800 dark:text-[#dddddd] mx-[5vw] border border-dashed p-2">
          Redis based Authentication
        </p>*/
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
