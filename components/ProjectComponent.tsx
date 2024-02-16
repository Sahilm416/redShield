"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ProjectComponent({
  res,
}: {
  res: { id: string; name: string; description: string; key: string };
}) {
  const [show, setShow] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(res.key)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Unable to copy to clipboard", error);
      });
  };

  return (
    <div className="w-full max-w-[1500px] px-5 flex sm:flex-row flex-col gap-10 justify-between">
      <Card className=" w-full sm:max-w-[600px] bg-zinc-50 dark:bg-zinc-950 select-none rounded-md border-[#EBEBEB] dark:border-[#1F1F1F] shadow-none">
        <CardHeader>
          <CardTitle>{res?.name}</CardTitle>
          <CardDescription className="">{res?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>key :</p>

          <div className="flex justify-center items-center mt-3">
            <Input
              disabled={true}
              className="border-r-0 rounded-none h-[40px] focus:outline-none disabled:opacity-100 disabled:cursor-pointer bg-zinc-50 dark:bg-zinc-950 border-[#EBEBEB] dark:border-[#1F1F1F]"
              type={show ? "text" : "password"}
              value={res?.key}
            />
            <span
              onClick={() => setShow(!show)}
              className="cursor-pointer h-[40px] border border-l-0 grid place-items-center p-1 bg-zinc-50 dark:bg-zinc-950 border-[#EBEBEB] dark:border-[#1F1F1F]"
            >
              {show ? <Eye className="" /> : <EyeOff className="" />}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCopyToClipboard}
            variant={"outline"}
            className="border-emerald-600 rounded-none"
          >
            copy key
          </Button>
          <p
            className={` ml-5 text-green-500 transition-opacity duration-500 ${
              isCopied ? "opacity-100" : "opacity-0"
            }`}
          >
            key copied
          </p>
        </CardFooter>
      </Card>
      <Card className="w-full bg-zinc-50 dark:bg-zinc-950 border-[#EBEBEB] dark:border-[#1F1F1F] rounded-md">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription className="">setup auth in minutes</CardDescription>
          <CardContent className="p-0 py-3">
            <p className="leading-7">
              Welcome to the journey of implementing authentication in your app
              using RedShield Auth. This guide will walk you through the
              essential steps required to integrate comprehensive authentication
              functionalities seamlessly into your application.
            </p>
          </CardContent>
          <CardFooter className="p-0">
            <Link href="/Docs/Installation">
              <Button className="rounded-none">view docs</Button>
            </Link>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
