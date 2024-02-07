import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";
import { MenuBar } from "./Menu";
import { getSession } from "@/app/actions/auth";
import { Badge } from "./ui/badge";
const Navbar = async () => {
  const res = (await getSession()) as {
    status: boolean;
    message: string;
    data: { email: string; project_id: string };
  };
  

  return (
    <div className="nav w-full flex justify-center items-center h-[60px] dark:border-[#1A1A1A] m-0 p-2 bg-white/90 border-b dark:bg-black/80 sticky top-0 right-0 z-50 overflow-y-hidden">
      <nav className="flex justify-between items-center w-full max-w-[1500px]">
        <div className="flex justify-center items-center gap-10">
          <Link
            href={"/"}
            className="text-xl flex justify-center items-center gap-2 select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
          >
            <span className="font-semibold font-sans text-lg dark:text-white">
              RedShield
            </span>
            <Badge>alpha</Badge>
          </Link>
          <span className="sm:inline-block hidden">|</span>
          <div className="justify-center items-center gap-5 text-md md:flex hidden">
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Docs/GetStarted"}
            >
              documentation
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              target="blanc"
              href={"https://twitter.com/sahil__501"}
            >
              contact
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 mx-5">
          <ThemeBtn />
          <MenuBar info={res} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
