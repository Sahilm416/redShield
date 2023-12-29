"use client";
import {
  LogOut as LogOutIcon,
  Settings,
  Menu,
  MailIcon,
  LayoutDashboard,
  Book,
  Building2,
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
import { getUserInfo } from "@/app/actions/user";
import { useEffect, useState } from "react";

type user = {
  email: string;
  profile: string;
};

export function MenuBar({
  info,
}: {
  info: {
    status: boolean;
    message: string;
    data: { email: string; project_id: string };
  };
}) {
  const [user, setUser] = useState<user>({ email: "", profile: "" });

  useEffect(() => {
    LoadUser();
  }, [info.status]);

  const LoadUser = async () => {
    if (info.status) {
      const res = await getUserInfo({
        email: info.data.email,
        project_id: info.data.project_id,
      });
      setUser(res);
    }
  };

  return (
    <>
      {/*1st */}
      <div className="sm:flex hidden">
        {info.status && (
          <DropdownMenu>
            <DropdownMenuTrigger className=" cursor-pointer" asChild>
              <Avatar className="w-[35px] h-[35px]">
                <AvatarImage width={10} height={10} src={user.profile} />
                <AvatarFallback>{info.data.email[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto mr-7 mt-4 dark:bg-black">
              <DropdownMenuLabel className="text-sm flex text-slate-500">
                <MailIcon className="text-slate-300 w-[20px] mx-2" />
                {info.data.email}
              </DropdownMenuLabel>
              <DropdownMenuItem className="flex">
                <Settings className="text-slate-300 w-[20px] mx-2" />
                Account settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await LogOut();
                  return window.location.reload();
                }}
                className="flex"
              >
                <LogOutIcon className="text-slate-300 w-[20px] mx-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {/*2nd */}
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto mr-7 mt-4 shadow-lg">
            <DropdownMenuLabel className="flex"><MailIcon className="text-slate-300 w-[20px] mr-2" />{info.data.email.split('@')[0]}</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href="/Dashboard">
                <DropdownMenuItem className="text-lg">
                  <LayoutDashboard className="text-slate-300 w-[20px] mr-2" />{" "}
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="#">
                <DropdownMenuItem className="text-lg">
                  <Book className="text-slate-300 w-[20px] mr-2" />
                  Docs
                </DropdownMenuItem>
              </Link>
              <Link href="#">
                <DropdownMenuItem className="text-lg">
                  <Building2 className="text-slate-300 w-[20px] mr-2" /> About
                </DropdownMenuItem>
              </Link>
              <Link href="#">
                {" "}
                <DropdownMenuItem className="text-lg">
                  <Contact className="text-slate-300 w-[20px] mr-2" /> Contact
                </DropdownMenuItem>
              </Link>
              {info.status && (
                <Link href="#">
                  <DropdownMenuItem className="text-lg">
                    <CircleUser className="text-slate-300 w-[20px] mr-2" />{" "}
                    Account
                  </DropdownMenuItem>
                </Link>
              )}
              {info.status && (
                <DropdownMenuItem
                  className="text-lg"
                  onClick={async () => {
                    await LogOut();
                    return window.location.reload();
                  }}
                >
                  {" "}
                  <LogOutIcon className="text-slate-300 w-[20px] mr-2" />{" "}
                 Sign Out
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
