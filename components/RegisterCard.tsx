"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { checkPassword } from "@/app/actions/RegCheck";
import { registerUser, sendCode, verifyCode } from "@/app/actions/register";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"
export default function RegisterCard() {
  const [formCount, setFormCount] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <Card className=" dark:bg-gray-900/20 bg-white px-2 h-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Register to Redshield</CardTitle>
          <CardDescription>redis based auth</CardDescription>
        </CardHeader>
        {formCount === 1 ? (
          <Form1 setFormCount={setFormCount} setEmail={setEmail} />
        ) : formCount === 2 ? (
          <Form2 setFormCount={setFormCount} email={email} />
        ) : (
          <Form3 email={email} />
        )}
      </Card>
    </>
  );
}

const Form1 = ({
  setFormCount,
  setEmail,
}: {
  setFormCount: Dispatch<SetStateAction<1 | 2 | 3>>;
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    await signIn('google');
    return;
  };

  const fakeLoad = async () => {
    return;
  };
  const sendData = async (formData: FormData) => {
    const mail = formData.get("email") as string;
    await fakeLoad();
    setLoading(true);
    const res = await sendCode({ email: mail });
    if (res.status) {
      toast.success(res.message);
      setEmail(mail);
      setFormCount(2);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card
        onClick={signInWithGoogle}
        className="mx-6 h-[40px] mb-2 bg-slate-50 dark:border-slate-300 hover:bg-white cursor-pointer flex justify-center items-center gap-2 p-2"
      >
        <GoogleIcon />{" "}
        <p className="dark:text-slate-900">continue with google</p>
      </Card>
      <Label className="grid place-items-center py-3">OR</Label>
      <form action={sendData}>
        <CardContent>
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="enter your email"
          />
        </CardContent>
        <CardFooter>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <Oval
              visible={true}
              height="25"
              width="25"
              strokeWidth="5"
              color="white"
              ariaLabel="oval-loading"
              secondaryColor="black"
            />
            ) : (
              "continue"
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

const Form2 = ({
  setFormCount,
  email,
}: {
  setFormCount: Dispatch<SetStateAction<1 | 2 | 3>>;
  email: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fakeLoade = async () => {
    return;
  };
  const sendData = async (formData: FormData) => {
    const code = formData.get("code") as string;
    await fakeLoade();
    setLoading(true);
    const res = await verifyCode({ code: code, email: email });
    if (res.status) {
      toast.success(res.message);
      setFormCount(3);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      <form action={sendData}>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            enter the code sent to <br />
            <span className="text-slate-700 dark:text-slate-300">
              {email}
            </span>{" "}
          </p>
          <Input name="code" type="text" required placeholder="enter code" />
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button
            onClick={() => setFormCount(1)}
            type="button"
            className="w-[50%]"
            variant={"outline"}
          >
            back
          </Button>
          <Button disabled={loading} type="submit" className="w-[50%]">
            {loading ? (
              <Oval
              visible={true}
              height="25"
              width="25"
              strokeWidth="5"
              color="white"
              ariaLabel="oval-loading"
              secondaryColor="black"
            />
            ) : (
              "submit"
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

const Form3 = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    toast.warning(
      "password should be at least 8 characters and combination of letters and numbers"
    );
  }, []);

  const createUser = async (formData: FormData) => {
    const pass = formData.get("pass") as string;
    const confirmPass = formData.get("confirm") as string;
    if (pass === confirmPass) {
      const validation = await checkPassword({ password: pass });
      if (validation.status) {
        setLoading(true);

        const res = await registerUser({ email: email, password: pass });
        if (res.status) {
          toast.success(res.message);
          return router.push("/Dashboard");
        } else {
          toast.error(res.message);
        }
        setLoading(false);
      } else {
        toast.error(validation.message);
      }
    } else {
      toast.error("password does not match");
    }
  };
  return (
    <>
      <form action={createUser}>
        <CardContent className="flex flex-col gap-3">
          <Label htmlFor="pass">Password</Label>
          <Input name="pass" id="pass" type="password" />
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input name="confirm" id="confirm" type="password" />
        </CardContent>
        <CardFooter>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? (
              <Oval
              visible={true}
              height="25"
              width="25"
              strokeWidth="5"
              color="white"
              ariaLabel="oval-loading"
              secondaryColor="black"
            />
            ) : (
              "create account"
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

//svg for google icon
const GoogleIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 262"
        id="google"
      >
        <path
          fill="#4285F4"
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        ></path>
        <path
          fill="#34A853"
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        ></path>
        <path
          fill="#FBBC05"
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        ></path>
        <path
          fill="#EB4335"
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        ></path>
      </svg>
    </>
  );
};
