import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function GettingStarted() {
  return (
    <>
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col font-sans px-2">
        <div>
          <Card id="getting_started" className="border-none shadow-none text-zinc-900 dark:text-zinc-100 leading-7">
            <CardHeader>
              <CardTitle className="text-4xl text-black dark:text-white">Getting Started</CardTitle>
              <CardDescription className="text-zinc-900 dark:text-zinc-100">
                Implement authentication in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-black dark:text-white">Introduction</p>
              <br />
              <p>
                Redshild is a simple authentication SDK that provides everything
                you need to implement authentication in your app. <br />
                It is built for{" "}
                <Link
                  className="text-blue-700 dark:text-blue-500 hover:underline"
                  target="blanc"
                  href={"https://nextjs.org"}
                >
                  next js
                </Link>{" "}
                applications with support for all the latest features. <br />
                RedShield uses{" "}
                <Link
                  className="text-blue-700 dark:text-blue-500 hover:underline"
                  target="blanc"
                  href={"https://upstash.com"}
                >
                  upstash
                </Link>{" "}
                redis instance to store user information which makes it faster
                than any other authentication service. We not only provide
                authentication but we also provide user management for more
                effortless experience. <br />
                We are currently at{" "}
                <Badge className="bg-red-50 text-red-700 border-red-700 hover:bg-red-50">
                  alpha
                </Badge>{" "}
                release so using this in large scale production apps is not
                recommended. Until stable release, you can try redshield and
                play with it. <br />
                If spotted please report any bugs or vulnerabilities at{" "}
                <Link
                  href={"mailto:redshield.vercel.app@gmail.com"}
                  className="text-blue-700 dark:text-blue-500 cursor-pointer underline"
                >
                  support
                </Link>
                . This will help us to improve and serve a seamless developer
                experince.
              </p>
            </CardContent>
            <CardFooter>
              <p>
                Follow below steps to setup redshield authentication in your
                project{" "}
              </p>
            </CardFooter>
          </Card>
          <Card className=" border-none shadow-none dark:text-zinc-100 leading-7">
            <CardContent className="max-w-[600px]">
              <p className="text-3xl text-black dark:text-white">Create account</p>
              <br />
              <p>
                Go to{" "}
                <Link
                  className="text-blue-700 dark:text-blue-500 hover:underline"
                  href={"/"}
                >
                  redshield
                </Link>{" "}
                home page and click get started to create your redshield
                acoount.{" "}
                <span>
                  (Kindly skip this step if you have already registered to
                  redshield.)
                </span>{" "}
                <br /> <br />
                Then you'll be redirected to your dashboard where you need to
                create desired project.This will generate api keys which will be
                used for redshields services.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex justify-end p-5 mb-5">
          <Link href={"/Docs/Installation"}>
            <Button
              variant={"outline"}
              className="w-[100px] dark:border-[#171717] group/btn flex gap-2 rounded-none hover:bg-transparent"
            >
              Next {" "} <ArrowRight className=" relative left-0 group-hover/btn:left-1"/>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
