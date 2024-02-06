"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function DocLinks() {
  const path = usePathname();

  return (
    <div className="flex flex-col gap-5 px-5 w-full mt-[50px]">
      <Link
        className={`${
          path === "/Docs/GetStarted" ? "text-blue-700" : "text-zinc-500"
        } text-xl hover:underline`}
        href={"/Docs/GetStarted"}
      >
        Get Started
      </Link>
      <Link
        className={`${
          path === "/Docs/Installation" ? "text-blue-700" : "text-zinc-500"
        } text-xl hover:underline`}
        href={"/Docs/Installation"}
      >
        Installation
      </Link>
      <Link
        className={`${
          path === "/Docs/Configure" ? "text-blue-700" : "text-zinc-500"
        } text-xl hover:underline`}
        href={"/Docs/Configure"}
      >
        Configure
      </Link>
      <Link
        className={`${
          path === "/Docs/Middleware" ? "text-blue-700" : "text-zinc-500"
        } text-xl hover:underline`}
        href={"/Docs/Middleware"}
      >
        Middleware
      </Link>
      <Link
        className={`${
          path === "/Docs/Additional" ? "text-blue-700" : "text-zinc-500"
        } text-xl hover:underline`}
        href={"/Docs/Additional"}
      >
        Additional
      </Link>
    </div>
  );
}
