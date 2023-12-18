"use client";
import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";
import { Profile } from "./profile";

const Navbar = () => {

  return (
    <div className="w-full flex justify-center items-center h-[60px] dark:border-slate-900  m-0 p-2 backdrop:blur-xl border-b border-slate-300 fixed top-0 right-0 z-50">
      <nav className="flex justify-between items-center w-[800px] min-w-[350px]">
        <Link
          href={"/"}
          className="text-xl select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
        >
          <span className="text-red-500">Red</span>Shield
        </Link>
        <div className=" flex gap-10 pr-5">
          <ThemeBtn/>
          <Profile/>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
