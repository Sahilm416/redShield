import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function GettingStarted() {
  return (
    <div className="w-full space-y-5 leading-7">
      <div>
        <h1 className="text-4xl font-semibold">Getting Started</h1>
      </div>
      <div>
        Implementing authentication in apps is crutial but takes extremely long
        time and efforts to make it work. It could literally take weeks to build
        authentication mechanism from scratch. To solve this issue there are
        auth providers available in tech such as <br />
        <ul className=" list-disc list-inside">
          <li>
            <a
              className="hover:underline text-blue-600"
              href="https://next-auth.js.org/"
            >
              next-auth
            </a>
          </li>
          <li>
            <a
              className="hover:underline text-blue-600"
              href="https://clerk.com/"
            >
              clerk
            </a>
          </li>
          <li>
            <a
              className="hover:underline text-blue-600"
              href="https://kinde.com/"
            >
              kinde auth
            </a>
          </li>
        </ul>{" "}
        <br />
        These are really cool and ready to go alternatives if you don't want to
        spend time on building your own authentication from scratch. With all
        these options there exist a problem that you don't have a low level
        control to the auth being Implemented. Clerk do provides some low level
        some addons for such purposes but they're too complex to understand.
        Also these providers mostly focus on providing effortless social logins
        with options like
        <span className=" italic">
          {" "}
          github , google , facebook , twitter ,
        </span>{" "}
        etc. All these alternatives sound really cool if you want social logins
        in your app, but what if you don't want to add social logins ? In such
        times you can use these providers but then you're stuck with there UI
        and redirects. <br /> <br />
        Redshield delivers you the best developer experience while implementing
        email and password authentication. It doesn't support social logins as
        of now but it has all the necessary features regarding email and
        password authentication. Like other providers redshield doesn't force
        you to use our auth UI. It provides both two options for implementation{" "}
        <br />
        <ol role="list" className=" list-decimal list-inside w-full">
          <li className="">
            <span className="text-blue-600">Auth with UI </span> (redshield's
            default auth UI)
          </li>
          <li>
            <span className="text-blue-600">Methods only </span> (use your own
            UI with redshield's methods)
          </li>
        </ol>{" "}
        <br />
        Redshield is specifically built for the{" "}
        <a className="hover:underline text-blue-600" href="https://nextjs.org/">
          next js
        </a>{" "}
        apps with server actions. It uses an{" "}
        <a className="hover:underline text-blue-600" href="https://upstash.com">
          upstash
        </a>{" "}
        redis instance to store users for faster retrival. Applications other
        than next js or older versions of next js are not supported as it is
        completely based on server actions introuduced in next js.
        <br /> <br />
        To start with the guide to add authentication make sure you already have
        redshield account and a project created in your dashboard. If not then
        simply head towards{" "}
        <Link className="text-blue-600 hover:underline" href={"/"}>
          home page
        </Link>{" "}
        and hit get started. This will redirect you to login and register page ,
        fill up the details and register your account. Now you'll be redirected
        to your dashboard where you can now create a new project. <br />
        Now let's add redshield to your project.
      </div>
      <div className="w-full flex justify-end">
        <Link href={'/Docs/Installation'}><Button
          variant={"outline"}
          className="w-[120px] dark:border-[#171717] group/btn flex gap-2 rounded-sm hover:bg-transparent"
        >
          Next{" "}
          <ArrowRight className=" relative left-0 group-hover/btn:left-1 transition-all fade-in-100" />
        </Button>
        </Link>
        
      </div>
    </div>
  );
}
