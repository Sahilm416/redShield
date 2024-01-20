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
import { checkPassword } from "@/app/actions/checks";
import { registerUser, sendCode, verifyCode } from "@/app/actions/register";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";

export default function RegisterCard() {
  const [formCount, setFormCount] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <Card className=" dark:bg-gray-900/20 bg-white px-2 h-auto shadow-lg rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]">
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
      <form action={sendData}>
        <CardContent>
          <Label htmlFor="email">Email</Label>
          <Input
          className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]"
            required
            id="email"
            name="email"
            type="email"
            placeholder="enter your email"
          />
        </CardContent>
        <CardFooter>
          <Button disabled={loading} type="submit" className="w-full rounded-none">
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

  const sendData = async (formData: FormData) => {
    const code = formData.get("code") as string;
    await fakeLoad();
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
          <Input className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]" name="code" type="text" required placeholder="enter code" />
        </CardContent>
        <CardFooter className="flex gap-3">
          <Button
            onClick={() => setFormCount(1)}
            type="button"
            className="w-[50%] rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]"
            variant={"outline"}
          >
            back
          </Button>
          <Button disabled={loading} type="submit" className="w-[50%] rounded-none">
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
          router.push("/Dashboard");
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
          <Input className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F] " name="pass" id="pass" type="password" />
          <Label htmlFor="confirm">Confirm Password</Label>
          <Input className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]" name="confirm" id="confirm" type="password" />
        </CardContent>
        <CardFooter>
          <Button disabled={loading} type="submit" className="w-full rounded-none">
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
//fake loading
const fakeLoad = async ()=>{
  return
}


