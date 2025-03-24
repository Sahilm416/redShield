import Link from "next/link";

import { Button } from "@/components/ui/button";
import Command from "@/components/Command";
import Code from "@/components/Code";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Installation",
};

export default function Installation() {
  const envCode = `RED_KEY=your_project_api_key
JWT_SECRET=your_own_jwt_secret`;
  return (
    <div className="w-full space-y-5 leading-7">
      <div>
        <h1 className="text-4xl font-semibold">Installation</h1>
      </div>
      <div>
        To add redshield's methods and UI to your app you need to install npm
        package that'll add the redshield locally to your project. Before
        installing redshield make sure that{" "}
        <span className="p-1 font-mono">next@14.1.0</span> or greater is
        installed in your project. If not simply run following command in your
        project terminal.
        <Command text="npm install next@14.1.0" /> <br />
        <div className="bg-yellow-500/10 rounded-md border border-yellow-500 p-3 text-yellow-500">
          Important note : Redshield won't work on older version of next.
          minimum requirement is 14.1.0 (Next 15 is not supported!)
        </div>{" "}
        <br />
        Now install the redshield npm package by running the following command
        in your project terminal
        <Command text="npm install redshield" /> <br />
        After successfully installing it go to{" "}
        <span className=" font-mono p-1">package.json</span> file and look for
        redshield in dependencies to esnure the installation. <br /> <br />

        <h2 className="text-3xl">Add environment variables</h2> <br />
        Now you have to add your API key and JWT secret to your project
        environment variables. Create a{" "}
        <span className=" font-mono p-1">.env.local</span> file in your project
        root directory and add the following keys as specified below <br />{" "}
        <br />
        <Code fileName=".env.local" codeString={envCode} /> <br />
        <span className=" font-mono p-1">RED_KEY</span> is the project api key in your redshield project and <span className=" font-mono p-1">JWT_SECRET</span>
        is the secret used to encode and decode the JWT tokens so it's
        completely your choice to add whatever seems secure to your project. Its
        reccomended to use the combinations of letters and numbers for
        <span className="font-mono p-1">JWT_SECRET</span>. <br /> <br />
        <div className="bg-red-500/10 rounded-md border border-red-500 p-3 text-red-500">
          Important note : keep the api key and jwt secret confidential.{" "}
          <a
            className="underline"
            href="https://vercel.com/docs/projects/environment-variables"
          >
            learn more
          </a>
        </div>{" "}
        <br />
        <p className="text-sm">
          Note : do not change the naming of environment variables specified.{" "}
        </p>
      </div>
      <div className="w-full flex justify-between">
        <Link href={"/Docs/GetStarted"}>
          <Button
            className="dark:border-[#171717] w-[120px]"
            variant={"outline"}
          >
            prev
          </Button>
        </Link>
        <Link href={"/Docs/Configure"}>
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
