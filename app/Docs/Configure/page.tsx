import Link from "next/link";
import { Button } from "@/components/ui/button";
import Code from "@/components/Code";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configure",
};

export default function GettingStarted() {
  //code to show for auth page
  const AuthCode = `//this should be a server component
import { AuthPage } from "redshield/ui";

const Auth = () => {
  return (
    <div>
       <AuthPage />
    </div>
  );
};
export default Auth;`;
  //ends the Auth string

  //code for ResetPassword page
  const resetPassCode = `import { ResetPassPage } from "redshield/ui";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <div>
      <ResetPassPage token={params.token} />
    </div>
  );
};
export default ResetPassword;`;
  //ends the reset pass string

  //LogOutButton example code
  const LogOutButtonCode = `import { LogOutButton } from "redshield/ui";

const LogOutComponent = () => {
    return <LogOutButton className="" />
}
export default LogOutComponent;`;
  return (
    <div className="w-full space-y-5 leading-7">
      <div>
        <h1 className="text-4xl font-semibold">Configure</h1>
      </div>
      <div>
        This configuration provides guide to add the redshield's default UI for
        authentication. If you want to add authentication with custom UI you can
        skip to the{" "}
        <Link
          className="text-blue-600 hover:underline"
          href={"/Docs/Additional"}
        >
          additional methods
        </Link>{" "}
        part. Remember to follow the naming conventions as provided , modifying
        them will break the authentication. <br /> <br /> <hr /> <br />
        <div className="space-y-3">
          <div>
            <h2 className="text-3xl">1. AuthPage</h2>
          </div>
          <div>
            This component returns the login and register UI. To add it create a
            route for authentication as{" "}
            <span className="p-1 font-mono">/Auth</span> in your application.
            Now add the following code to the{" "}
            <span className="p-1 font-mono">page.tsx</span>
          </div>
          <Code fileName="/Auth/page.tsx" codeString={AuthCode} />
          <p className="text-sm">Note : This has to be a server component.</p>
        </div>{" "}
        <br />
        <hr />
        <br />
        <div className="space-y-3">
          <div>
            <h2 className="text-3xl">2. LogOutButton</h2>
          </div>
          <div>
            This returns the button to perform logout action. To use this add
            following code to your application. <br /> <br />
            <Code
              fileName="LogOutButtonComponent.tsx"
              codeString={LogOutButtonCode}
            />
          </div>
        </div>{" "}
        <br />
        <hr />
        <br />
        <div className="space-y-3">
          <div>
            <h2 className="text-3xl">3. ResetPassPage</h2>
          </div>
          <div>
            Now create a <span className="p-1 font-mono">/ResetPassword</span>{" "}
            route to perform forgot password action. Inside it create a folder
            named <span className="p-1 font-mono">[token]</span> to catch the
            url token as parameter. Now paste the following code inside the{" "}
            <span className="p-1 font-mono">page.tsx</span> i.e. within{" "}
            <span className="p-1 font-mono">[token]</span> folder.
          </div>
          <Code
            fileName="/ResetPassword/[token]/page.tsx"
            codeString={resetPassCode}
          />{" "}
          <p className="text-sm">Note : This is a server component.</p>
        </div>{" "}
        <br />
        <div>
          <h3 className=" font-semibold">
            Now your application is ready for the middleware implementaion. 🥂
          </h3>
        </div>
      </div>{" "}
      <div className="w-full flex justify-between">
        <Link href={"/Docs/Installation"}>
          <Button
            className="dark:border-[#171717] w-[120px]"
            variant={"outline"}
          >
            prev
          </Button>
        </Link>
        <Link href={"/Docs/Middleware"}>
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
