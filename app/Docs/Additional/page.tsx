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
import Code from "@/components/Code";

export default function Additional() {
  // getSession() example
  const getSessionCode = `import { getSession } from "redshield/actions/auth";

const ProtectedPage = async () => {
  const session = await getSession();
  if(session.status){
    return(
        <div>
           <p>user is logged in as {session.data.email}</p>
        </div>
    );
  }
  return(
    <div>
        <p>user is not logged in. Please log in to access this page</p>
    </div>
  )
}
export default ProtectedPage;`;
// logOut example code
const logOutCode = `import { logOut } from "redshield/actions/auth";

const Dashboard = () => {
  const LogOutUser = async () => {
    await logOut();
  }
  return(
    <div>
        <button onClick={LogOutUser}>log out</button>
    </div>
  )
}
export default Dashboard;`
  return (
    <>
      <div className="w-full min-h-[calc(100vh-60px)] flex flex-col px-2">
        <div>
          <Card className=" border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-4xl">Additional</CardTitle>
              <CardDescription>
                These are underhood methods used in redshield. You can always
                have a custom logic for your app using these methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="text-3xl">1. getSession()</h2>
              <br />
              <p>
                This method returns the object which has information related to
                authentication state of user. Object contains information as
                status which is boolean and message which is a string. If user
                is logged in then addional data is also returned which has user
                email. You can do something like this in your application.
              </p>
              <br />
              <Code fileName="Protected/page.tsx" codeString={getSessionCode} />
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Note :{" "}
                <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                  getSession()
                </span>{" "}
                returns a promise so always remember to use it in async
                components i.e. server components.
              </p>
            </CardFooter>
          </Card>
          <Card className=" border-none shadow-none">
            <CardContent>
              <h2 className="text-3xl">2. LogOut()</h2>
              <br />
              <p>
                This function as per the name logs the user out. Usage is simple
                as all you need is to call this function on onclick event of a
                button or any element.
              </p><br />
              <Code fileName="/Dashboard/page.tsx" codeString={logOutCode} />
            </CardContent>
            <CardFooter className="flex-col items-start">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Note :{" "}
                
                You can always use the inbuilt <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                LogOutButton 
                </span>{" "} for that purpose.
              </p>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full flex justify-start p-5 mb-5">
          <Link href={"/Docs/Middleware"}>
            <Button
              variant={"outline"}
              className="w-[100px] dark:border-[#171717]"
            >
              prev
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
