"use client";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const token = "rgcr464647xrgrgcvrc";

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center p-5">
      <div className="boxpatternTop sm:w-[400px] w-[300px] h-[20px] border-l border-r border-t"></div>
      <div className="boxpatternTop sm:w-[420px] w-[320px] h-[20px] border-l border-r border-t"></div>
      <div className="boxpatternTop sm:w-[460px] w-[360px] h-[20px] border-l border-r border-t"></div>
      <div className=" sm:w-[500px] w-[400px] border-t border-b flex border-[1px 1px 1px 1px] flex-col items-center justify-center">
        <p className="sm:text-6xl text-5xl text-center font-roboto font-bold text-slate-700 p-3 ">
          Redis based <br /> authentication
        </p>
        <Link href={"/Auth"}>
          <Button className="mx-4 w-[200px] h-[45px] bg-slate-900 my-5 rounded-lg">
            Start now
          </Button>{" "}
        </Link>
      </div>
      <div className="boxpatternBottom sm:w-[460px] w-[360px] h-[20px] border-l border-r border-b"></div>
      <div className="boxpatternBottom sm:w-[420px] w-[320px] h-[20px] border-l border-r border-b"></div>
      <div className="boxpatternBottom sm:w-[400px] w-[300px] h-[20px] border-l border-r border-b"></div>
    </div>
  );
};

export default Hero;
