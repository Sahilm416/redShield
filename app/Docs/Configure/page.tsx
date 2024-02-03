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

export default function GettingStarted() {
  //code to show for auth page
  const AuthCode = `import { getProject } from "redshield/actions/auth";
import AuthPage from "redshield/Auth";
  const Auth = async () => {
  //method that returns the project info by reading env key
  const res = await getProject();
  return (
    <div>
       <AuthPage project={res} />
    </div>
  );
};
export default Auth;`;
  //ends the Auth string

  //code for ResetPassword page
const resetPassCode = `import { checkResetPasswordToken } from "redshield/actions/forgotPassword";
import ResetPassPage from "redshield/components/ResetPassPage";
const ResetPassword = async ({ params }: { params: { token: string } }) => {
  const res = await checkResetPasswordToken({ token: params.token });
  return (
    <div className="w-full flex justify-center mt-[80px] mx-auto">
      <ResetPassPage data={res} />
    </div>
  );
};
export default ResetPassword;`
//ends the reset pass string
  return (
    <>
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col px-2">
        <div>
          <Card
            id="getting_started"
            className=" border-none shadow-none"
          >
            <CardHeader>
              <CardTitle className="text-4xl">Configure</CardTitle>
            </CardHeader>
            <CardContent>
              Create{" "}
              <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                /Auth
              </span>{" "}
              route and paste following code in <b>page.tsx</b>. <br />
              <br />
              <Code codeString={AuthCode} fileName={"/Auth/page.tsx"} />
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p>
                <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                  AuthPage
                </span>{" "}
                returns the ui for authentication. You can fully customize the
                position of this component according to your need.
              </p>
              <br />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Note: follow the folders naming conventions strictly.
              </p>
            </CardFooter>
          </Card>
          <Card  className=" border-none shadow-none">
            <CardContent>
              <p>Now create a <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                  /ResetPassword
                </span>{" "} route to perform forgot password action. Inside it create a folder named <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                  [token]
                </span>{" "} to catch the url token as parameter. Now paste the following code inside the <b>page.tsx</b> i.e. within [token] folder.</p><br />
                <Code fileName="/ResetPassword/[token]/page.tsx" codeString={resetPassCode}/>
            </CardContent>
            <CardFooter>
              <p>Now you're all set to implement middleware in your next app.</p>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex justify-between p-5 mb-5">
        <Link href={"/Docs/Installation"}>
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
    </>
  );
}
