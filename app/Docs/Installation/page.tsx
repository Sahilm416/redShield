"use client";
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

export default function Installation() {
  return (
    <div className="w-full min-h-[calc(100vh-60px)] px-2 flex flex-col justify-between">
      <Card className=" border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-4xl ">Installation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Simply copy the following command and head towards your project
            terminal.
          </p>
          <div className="py-5">
            <Command />
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
            Now copy the api key and paste into the env file in below format
          </p>
          <br />
          <div className="max-w-[400px]">
          <Code fileName="env" codeString="Red_Key=YOUR_REDSHIELD_API_KEY" />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <p>Keep the api keys confidential and make sure they aren't publically exposed. 
            Exposing them will give your project access to others.
          </p> <br />
          <p>After doing previous steps now your application is ready to configure for authentication</p>
        </CardFooter>
      </Card>
      <div className="w-full flex justify-between p-5 mb-5">
        <Link href={"/Docs/GetStarted"}>
          <Button
            variant={"outline"}
            className="w-[100px] dark:border-[#171717]"
          >
            Prev
          </Button>
        </Link>
        <Link href={"/Docs/Configure"}>
          <Button
            variant={"outline"}
            className="w-[100px] dark:border-[#171717]"
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}
