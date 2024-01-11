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
    <div className="nav w-full flex justify-center items-center h-[60px] dark:border-slate-800  m-0 p-2 bg-white/90 border-b dark:bg-black/80 fixed top-0 right-0 z-50">
      <nav className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center gap-10">
          <Link
            href={"/"}
            className="text-xl flex justify-center items-center gap-2 select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
          >
      
            <span className="font-semibold text-lg dark:text-white">
              RedShield
            </span>
            <Badge>alpha</Badge>
          </Link>
          <span className="sm:inline-block hidden">|</span>
          <div className="justify-center items-center gap-5 text-md sm:flex hidden">
            {res.status && (
              <Link
                className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
                href={"/Dashboard"}
              >
                dashboard
              </Link>
            )}
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Docs"}
            >
              docs
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/About"}
            >
              about
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Contact"}
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
