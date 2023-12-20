import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";
import { Profile } from "./profile";
import { LoggedUser } from "@/app/actions/auth";
import { Shield } from "lucide-react";
const Navbar = async () => {
  const res = await LoggedUser();

  return (
    <div className="w-full dark:bg-[rgba(18,18,18,0.85)] bg-[rgba(255,255,255,0.85)] flex justify-center items-center h-[60px] dark:border-slate-900  m-0 p-2 backdrop:blur-xl border-b border-slate-200 fixed top-0 right-0 z-50">
      <nav className="flex justify-between items-center w-[800px] min-w-[350px]">
        <Link
          href={"/"}
          className="text-xl flex justify-center items-center gap-2 select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
        >
          <ShieldIcon />
          <span className="font-bold text-lg">
            <span className="text-red-600">Red</span>
            Shield{"\n                          "}
          </span>
        </Link>
        <div className=" flex gap-10 pr-5">
          <ThemeBtn />
          <Profile logged={!res.status} />
        </div>
      </nav>
    </div>
  );
};

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  );
}

export default Navbar;
