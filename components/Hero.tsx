"use client";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  const token = "rgcr464647xrgrgcvrc";

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-start p-5">
      <p className="text-5xl font-sans font-bold text-blue-500 p-3 ">
        <span className="text-slate-800">Redis</span> based <br />{" "}
        authentication library{" "}
      </p>
      <Link href={"/Auth"}>
        <Button className="mx-4 w-[200px] h-[45px] rounded-none my-5">
          Start now
        </Button>{" "}
      </Link>
  
    </div>
  );
};

export default Hero;
