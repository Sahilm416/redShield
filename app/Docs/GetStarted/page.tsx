import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export default function GettingStarted() {
  return (
    <>
      <div className="max-w-[700px] flex flex-col justify-between px-2">
        <div>
          <Card
            id="getting_started"
            className="w-[90vw] max-w-[600px] border-none shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-4xl">
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="max-w-[600px]">
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
              <br />
              Effortlessly keep track of your users with Redshield's user
              management feature.
            </CardContent>
            <CardFooter>
              <p>
                Follow below steps to setup redshield authentication in your
                project{" "}
              </p>
            </CardFooter>
          </Card>
          <Card className="w-[90vw] max-w-[600px] border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-4xl ">Create Account</CardTitle>
            </CardHeader>
            <CardContent className="max-w-[600px]">
              <p>
                Go to{" "}
                <Link
                  className="text-blue-700 dark:text-blue-500 hover:underline"
                  href={"https://redshield.vercel.app"}
                >
                  redshield
                </Link>{" "}
                home page and click get started to create your redshield
                acoount.{" "}
                <span className="text-zinc-500">
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
            <Button variant={'outline'} className="w-[100px] dark:border-[#171717]">Next</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
