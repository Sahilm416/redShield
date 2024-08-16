import Link from "next/link";
import { Button } from "@/components/ui/button";
import Code from "@/components/Code";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Middleware",
};

export default function Middleware() {
  //code for implementation of middleware
  const middlewareCode = `import { NextRequest, NextResponse } from "next/server";
import { getSession } from "redshield";
  
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
    matcher: ["/", "/Auth" ],
};`;
  //end of middleware code

  return (
    <div className="w-full space-y-5 leading-7">
      <div>
        <h1 className="text-4xl font-semibold">Middleware</h1>
      </div>
      <div>
        Create <span className="p-1 font-mono">middleware.ts</span> file in root
        directory of your app. <br />
        <span className="text-sm">
          (For example if you are using app router then at same level as app
          directory , if not then at src folder level)
        </span>{" "}
        <br />
        Now copy the following code to secure the desired routes in your
        application. <br /> <br />
        <Code fileName="middleware.ts" codeString={middlewareCode} /> <br />
        <h3 className="font-semibold">
          Congratulations! Your app now have authentication.
        </h3>
      </div>
      <br />
      <div className="w-full flex justify-between">
        <Link href={"/Docs/Configure"}>
          <Button
            className="dark:border-[#171717] w-[120px]"
            variant={"outline"}
          >
            prev
          </Button>
        </Link>
        <Link href={"/Docs/Additional"}>
          <Button
            className="dark:border-[#171717] w-[120px]"
            variant={"outline"}
          >
            next
          </Button>
        </Link>
      </div>
    </div>
  );
}
