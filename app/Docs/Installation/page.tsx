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

export default function Installation() {
  return (
    <div className="max-w-[1500px] mx-[1vw] h-[calc(100vh-60px)] m-5 flex flex-col justify-between">
      <Card className="w-[90vw] max-w-[600px] border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-4xl ">Installation</CardTitle>
        </CardHeader>
        <CardContent className="max-w-[600px]">
          <p>
            Redshield provides the SDK with our{" "}
            <Link
              className="hover:underline text-blue-500"
              target="blanc"
              href={"https://npmjs.com"}
            >
              npm
            </Link>{" "}
            package. That is why you need to install the package in your
            application.
            <br />
            This will install the redshield authentication and related
            dependencies to your project locally. <br /> <br />
          </p>
          <p className="">Copy the following command :</p>
          <br />
          <div className="flex flex-col items-start border dark:border-[#171717]">
            <div className="border-b dark:border-[#171717] w-full p-3">
              <p>Terminal</p>
            </div>
            <div className="p-3">
              <Command />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>
            Run this command in your project terminal then wait until the
            installation is complete. You can always check the <Link
              className="hover:underline text-blue-500"
              target="blanc"
              href={"https://npmjs.com/redshield"}
            >
              npm registry for redshield
            </Link>{" "} to cross check latest releases. <br /> <br />
            After successful installation you can follow the instructions to configure the integration.
          </p>
        </CardFooter>
      </Card>
      <div className="w-full flex justify-between p-5">
        <Link href={"/Docs/GetStarted"}>
          <Button className="w-[100px]">Prev</Button>
        </Link>
        <Link href={""}>
          <Button className="w-[100px]">Next</Button>
        </Link>
      </div>
    </div>
  );
}
