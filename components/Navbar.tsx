import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";
import { MenuBar } from "./Menu";
import { getSession } from "@/app/actions/auth";
const Navbar = async () => {
  const res = (await getSession()) as {
    status: boolean;
    message: string;
    data: { email: string; project_id: string };
  };

  return (
    <div className="nav w-full flex justify-center items-center h-[60px] dark:border-slate-800 dark:bg-slate-900/40 bg-slate-100/40  m-0 p-2 border-b border-slate-200 fixed top-0 right-0 z-50">
      <nav className="flex justify-between items-center w-full min-w-[350px]">
        <div className="flex justify-center items-center gap-10">
          <Link
            href={"/"}
            className="text-xl flex justify-center items-center gap-2 select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
          >
            <ShieldIcon />
            <span className="font-semibold text-lg dark:text-white">RedShield</span>
          </Link>
          <span className="sm:inline-block hidden">|</span>
          <div className="justify-center items-center gap-5 text-md sm:flex hidden">
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Dashboard"}
            >
              dashboard
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Docs"}
            >
              docs
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Docs"}
            >
              about
            </Link>
            <Link
              className="dark:text-slate-300 text-slate-600 hover:text-slate-900 dark:hover:text-slate-100"
              href={"/Docs"}
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
