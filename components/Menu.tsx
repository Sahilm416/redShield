"use client";
import {
  LogOut as LogOutIcon,
  Settings,
  Menu,
  MailIcon,
  LayoutDashboard,
  Book,
  UserRound,
  Contact,
  CircleUser,
} from "lucide-react";
import { LogOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSpecificUser } from "@/app/actions/user";

type user = {
  email: string;
  profile: string;
};

export function MenuBar({
  session,
}: {
  session: {
    status: boolean;
    message: string;
    data: { email: string; project_id: string; isAdmin: boolean };
  };
}) {
  const [user, setUser] = useState<user>({ email: "", profile: "" });

  useEffect(() => {
    LoadUser();
  }, [session.status]);

  const LoadUser = async () => {
    if (session?.status) {
      const res = await getSpecificUser({
        email: session.data.email,
        project_id: session.data.project_id,
      });
      setUser(res);
    }
  };

  return (
    <>
      {/*1st */}
      <div className="md:flex hidden">
        {session.status && (
          <DropdownMenu>
            <DropdownMenuTrigger className=" cursor-pointer" asChild>
              <Avatar className="w-[35px] h-[35px]">
                <AvatarImage width={10} height={10} src={user.profile} />
                <AvatarFallback>{session.data.email[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto mr-7 mt-4 border-[#EBEBEB] dark:border-[#1F1F1F] bg-white dark:bg-black rounded-none">
              <DropdownMenuLabel className="text-sm flex text-slate-500">
                <MailIcon className="text-slate-300 w-[20px] mx-2" />
                {session.data.email}
              </DropdownMenuLabel>
              <Link href={`/Edit/Profile`}>
                <DropdownMenuItem className="flex cursor-pointer">
                  <Settings className="text-slate-300 w-[20px] mx-2" />
                  Account settings
                </DropdownMenuItem>
              </Link>

              <Link href={"/Dashboard"}>
                <DropdownMenuItem className=" cursor-pointer">
                  <LayoutDashboard className="text-slate-300 w-[20px] mx-2" />
                  dashboard
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={async () => {
                  await LogOut();
                  toast.success("Logged Out");
                  return window.location.reload();
                }}
                className="flex cursor-pointer"
              >
                <LogOutIcon className="text-slate-300 w-[20px] mx-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {/*2nd */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className=" w-[45px] h-[45px] p-0 rounded-full focus:outline-none focus:border-none"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto mr-7 mt-4 shadow-lg dark:bg-black rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]">
            {session.status && (
              <DropdownMenuLabel className="flex">
                <MailIcon className="text-slate-300 w-[20px] mr-2" />
                {session.data.email.split("@")[0]}
              </DropdownMenuLabel>
            )}
            <DropdownMenuGroup>
            {session?.data?.isAdmin && (
                <Link href="/Admin">
                  <DropdownMenuItem className="text-lg">
                    <UserRound className="text-slate-300 w-[20px] mr-2" />
                    Admin
                  </DropdownMenuItem>
                </Link>
              )}
              {session.status && (
                <Link href="/Dashboard">
                  <DropdownMenuItem className="text-lg">
                    <LayoutDashboard className="text-slate-300 w-[20px] mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
              )}
              <Link href="/Docs/GetStarted">
                <DropdownMenuItem className="text-lg">
                  <Book className="text-slate-300 w-[20px] mr-2" />
                  Docs
                </DropdownMenuItem>
              </Link>
              <Link target="blanc" href={"https://twitter.com/sahil__501"}>
                {" "}
                <DropdownMenuItem className="text-lg">
                  <Contact className="text-slate-300 w-[20px] mr-2" /> Contact
                </DropdownMenuItem>
              </Link>
              {session.status && (
                <Link href={`/Edit/Profile`} className=" cursor-pointer">
                  <DropdownMenuItem className="text-lg">
                    <CircleUser className="text-slate-300 w-[20px] mr-2" />{" "}
                    Account Settings
                  </DropdownMenuItem>
                </Link>
              )}
              {session.status && (
                <DropdownMenuItem
                  className="text-lg"
                  onClick={async () => {
                    await LogOut();
                    toast.success("Logged Out");
                    return window.location.reload();
                  }}
                >
                  {" "}
                  <LogOutIcon className="text-slate-300 w-[20px] mr-2" />
                  Logout
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
