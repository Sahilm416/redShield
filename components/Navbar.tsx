"use client";
import Link from "next/link";
import { ThemeBtn } from "./ThemeBtn";
import { Profile } from "./profile";
import { getCookie } from "cookies-next";
import { ValidateAuthToken } from "@/app/actions/auth";
import { useEffect, useState } from "react";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const cookie = getCookie("_auth_token");
;
  const checkCookkieValidation = async () => {
    const res = await ValidateAuthToken(cookie);
    setIsLoggedIn(res.status);
  };

  checkCookkieValidation();

  return (
    <div className="w-full h-[60px] dark:border-slate-900  m-0 p-2 backdrop:blur-xl border-b border-slate-300 fixed top-0 right-0 z-50">
      <nav className="flex justify-between items-center">
        <Link
          href={"/"}
          className="text-xl select-none cursor-pointer dark:text-slate-200 text-slate-900 font-sans font-bold ml-5 p-1"
        >
          <span className="text-red-500">Red</span>Shield
        </Link>
        <ul className="text-slate-800 dark:text-slate-300 flex gap-4 mr-6 justify-center items-center">
          {isLoggedIn && (
            <li>
              <Profile />
            </li>
          )}
          <li>
            <ThemeBtn />
          </li>
          <li>
            <Link href={"/"}>About</Link>
          </li>
          <li>
            <Link href={"/"}>Docs</Link>
          </li>
          <li>
            <Link href={"/"}>Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;