import Code from "@/components/Code";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Additional() {
  // getSession() example
  const getSessionCode = `import { getSession } from "redshield";

const ProtectedPage = async () => {
  const session = await getSession(); // returns { status: boolean , message: string , data: {email: string , isAdmin: boolean}}
  if(session.status){
    return(
        <div>
           <p>user is logged in as {session.data.email}</p>
           <p>roll is {session.data.isAdmin ? "admin" : "user"}</p>
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

export default Dashboard;`;
  //login code example
  const loginCode = `import { login } from "redshield";

const handleLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await login({ email: email, password: password }); //returns {status: boolean , message: string }
};`;
  //register code example
  const registerCode = `import { register } from "redshield";

const handleRegister = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const res = await register({ email: email, password: password }); //returns {status: boolean , message: string }
};`;
  //email verification code example
  const sendEmailVerificationCode = `import { sendEmailVerificationCode } from "redshield";

const handleSendCode = async (formData: FormData) => {
  const email = formData.get("code_email") as string;
  const res = await sendEmailVerificationCode({ email: email }); //returns {status: boolean , message: string }
};`;
  //example verification code example
  const verifyEmailVerificationCode = `import { verifyVerificationCode } from "redshield";

const handleVerifyCode = async (formData: FormData) => {
  const code = formData.get("verification_code") as string;
  const email = formData.get("email") as string;
  const res = await verifyVerificationCode({
    email: email,
    code: code,
  });    //returns {status: boolean , message: string }
};`;
  //end of code examples
  return (
    <div className="w-full space-y-5 leading-7">
      <div>
        <h1 className="text-4xl font-semibold">Addional Methods</h1>
      </div>
      <div>
        These are the underhood methods that redshield auth uses to provide the
        authentication as a service. Using these methods you can build your own
        authentication mechanism without relying on the default authentication
        UI provided by redshield itself.
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl">1. login</h2>
        </div>
        <div>
          This is the core login method used in redshield auth. All You have to
          do is pass the object consisting email and password to the login
          method. This method returns a promise so always use it in async
          function blocks.
        </div>
        <Code fileName="login.ts" codeString={loginCode} />
      </div>
      <hr />
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl">2. register</h2>
        </div>
        <div>
          This methods is used to register a new user to your application. You
          dont have to do any checks if user is already registered or not All
          you need to do is call the register method by providing object of
          email and password. This also return a promise.
        </div>
        <Code fileName="register.ts" codeString={registerCode} />
        <p className="text-sm">
          Note : make sure to verify user email by following methods before
          registering user.
        </p>
      </div>
      <hr />
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl">3. sendEmailVerificationCode</h2>
        </div>
        <div>
          This method allows you to send email to your user consisting of a
          server generated 6 digit code for verification. This code can be later
          verified with{" "}
          <span className="p-1 font-mono">verifyVerificationCode</span> method.
          The code sent is only valid for 3 minutes.
        </div>
        <Code
          fileName="sendVerification.ts"
          codeString={sendEmailVerificationCode}
        />
        <p className="text-sm">
          Note : Don't send codes continuously as this method has limits.
        </p>
      </div>
      <hr />
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl">4. verifyVerificationCode</h2>
        </div>
        <div>
          This method verifies the code sent by the
          <span className="p-1 font-mono">sendEmailVerificationCode</span>{" "}
          method.
        </div>
        <Code
          fileName="verifyVerificationCode.ts"
          codeString={verifyEmailVerificationCode}
        />
      </div>
      <hr />
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl">5. getSession</h2>
        </div>
        <div>
          This is the core method for getting the session of current user. It
          has all the information related to authentication state of user. The
          main response by this method consits of a object that has{" "}
          <span className="p-1 font-mono">status</span> property which indicates
          the status of the user. If it returns true then the user is
          authenticated else the user is not authenticated. <br />
          This also returns some additional information with the status property
          as <span className="p-1 font-mono">data</span>. data has information
          like <span className="p-1 font-mono">email , isAdmin</span> etc,
        </div>
        <Code fileName="ProtectedPage.tsx" codeString={getSessionCode} />
        <p>
          You can manage the user roles in your redshield app dashboard by a
          single click
        </p>
      </div>
      <div className="w-full flex justify-start">
        <Link href={"/Docs/Middleware"}>
          <Button
            className="w-[120px] dark:border-[#171717]"
            variant={"outline"}
          >
            prev
          </Button>
        </Link>
      </div>
    </div>
  );
}
