import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Command from "@/components/Command";
import Code from "@/components/Code";
import { AlertTriangle } from "lucide-react";

export default function Installation() {
  return (
    <div className="w-full min-h-[calc(100vh-60px)] px-2 flex flex-col font-sans">
      <Card className=" border-none shadow-none dark:text-[#D4D4D4] text-[#444444] leading-7">
        <CardHeader>
          <CardTitle className="text-4xl text-black dark:text-[#FFFFFF]">
            Installation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex mb-5 gap-2 justify-start border border-yellow-400 px-2 py-3 rounded-md bg-yellow-200/20 dark:bg-yellow-400/10 text-black dark:text-white">
            <div className="flex h-full items-center gap-5">
              <AlertTriangle className="text-yellow-400 mt-1" />
            </div>
            <div className="flex flex-col gap-3">
              <p>
                redshield is only supported in next js version{" "}
                <span className="font-semibold">14.1.0</span> or above! , if you
                have lower version of next js installed please update it to
                latest by running following command in your project terminal.
              </p>
              <Command
                className="bg-transparent text-sm"
                text="npm install next@latest"
              />
            </div>
          </div>
          <p>
            Simply copy the following command and head towards your project
            terminal.
          </p>
          <div className="py-5">
            <Command text="npm install redshield" />
          </div>

          <p>
            Paste the command and hit{" "}
            <kbd className="px-2 py-1 bg-zinc-100 rounded-md dark:bg-zinc-900 dark:text-white">
              enter
            </kbd>{" "}
            to install redshield in your application locally. Wait until
            installation is complete.
          </p>
          <br />
          <br />
          <p>
            Now copy the api key and paste into the{" "}
            <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
              .env.local
            </span>{" "}
            file in below format
          </p>
          <br />
          <div className="max-w-[400px]">
            <Code
              fileName=".env.local"
              codeString="RED_KEY=YOUR_REDSHIELD_API_KEY"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <p className="text-red-600 p-3 bg-red-600/10 border border-red-600 rounded-md ">
            Keep the api keys confidential and make sure they aren't publically
            exposed. Exposing them will give your project access to others. 
            <Link
              className="underline ml-2"
              target="blanc"
              href={"https://vercel.com/docs/projects/environment-variables"}
            >
              learn more
            </Link>{" "}
          </p>{" "}
          <br />
          <p>
            After successfully installing redshield in your project and adding
            your api keys in specified format , Now your application is ready to
            configure authentication.
          </p>
        </CardFooter>
      </Card>
      <div className="w-full flex justify-between p-5 mb-5">
        <Link href={"/Docs/GetStarted"}>
          <Button
            variant={"outline"}
            className="w-[100px] dark:border-[#171717] rounded-sm "
          >
            Prev
          </Button>
        </Link>
        <Link href={"/Docs/Configure"}>
          <Button
            variant={"outline"}
            className="w-[100px] dark:border-[#171717] rounded-sm"
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
