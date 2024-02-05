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
import Code from "@/components/Code";
import Celebrate from "@/components/Celebrate";
import { useState } from "react";
export default function Middleware() {
  const [isCelebrate, setIsCelebrate] = useState<boolean>(false);
  //code for implementation of middleware
  const middlewareCode = `import { NextRequest, NextResponse } from "next/server";
import { getSession } from "redshield/actions/auth";
  
  export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const session = await getSession();
    //if already authenticated then redirect back to desired page
    if (url.pathname === "/Auth") {
      if (session.status) {
      //add path where logged in user should be redirected
        url.pathname = "/";
        return NextResponse.redirect(url);
      } else {
        return NextResponse.next();
      }
    }
   //this redirects the users to auth page if not authenticated
    if (session.status) {
      return NextResponse.next();
    } else {
      url.pathname = "/Auth";
      return NextResponse.redirect(url);
    }
  }
  export const config = {
      //add routes in matcher array to protect them from unauthenticated users
    matcher: ["/Protected", "/Auth" ],
  };
  `;
  //end of middleware code

  const handleCelebrate = () => {
    setIsCelebrate(true);
    setTimeout(() => {
      setIsCelebrate(false);
    }, 1500);
  };
  return (
    <>
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col px-2">
        <div>
          <Card id="getting_started" className=" border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-4xl">Middleware</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Create{" "}
                <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                  middleware.ts
                </span>{" "}
                file in root directory of your app. <br />{" "}
                <span className="text-sm text-zinc-600">
                  (For example if you are using app router then at same level as
                  app directory , if not then at{" "}
                  <span className="underline">src</span> folder level) <br />{" "}
                </span>{" "}
                <br />
                <br />
                Now copy the following code to secure the desired routes in your
                application.
              </p>
              <br />
              <Code fileName="middleware.ts" codeString={middlewareCode} />
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p>
                This will prevent the unauthorized users from accessing the
                secured routes. Now all you need is to edit the middleware file
                according to your need to secure the pages.
              </p>
              <br />
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center">
                <b>Congratulations your app now have authentication.</b>
                <Button
                  onClick={handleCelebrate}
                  className="dark:border-[#171717] w-[100px] rounded-none"
                  variant={"outline"}
                >
                  Celebrate 🥂
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex justify-between p-5 mb-5">
          <Link href={"/Docs/Configure"}>
            <Button
              variant={"outline"}
              className="w-[100px] dark:border-[#171717]"
            >
              prev
            </Button>
          </Link>
          <Link href={"#"}>
            <Button
              variant={"outline"}
              className="w-[100px] dark:border-[#171717]"
            >
              Next
            </Button>
          </Link>
        </div>
      </div>
      {isCelebrate && <Celebrate/>}
    </>
  );
}
