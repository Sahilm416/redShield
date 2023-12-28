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
import Loader from "./Loader";
type userData = {
  email: string;
  password: string;
};
export default function RegisterCard() {
  const [formCount, setFormCount] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<userData>({ email: "", password: "" });

  return (
    <div>
      <Card className=" w-auto max-w-[550px] min-w-[350px] dark:bg-black ">
        <CardHeader>
          <CardTitle>
            Register to <span className="text-red-600">Red</span>shield
          </CardTitle>
          <CardDescription>redis based auth</CardDescription>
        </CardHeader>
        {formCount === 1 ? (
          <Form1 setFormCount={setFormCount} setData={setData} />
        ) : formCount === 2 ? (
          <Form2 setFormCount={setFormCount} data={data} />
        ) : (
          <Form3 setData={setData} data={data}/>
        )}
      </Card>
    </div>
  );
}

const Form1 = ({
  setFormCount,
  setData,
}: {
  setFormCount: Dispatch<SetStateAction<1 | 2 | 3>>;
  setData: Dispatch<SetStateAction<userData>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

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
      setData((prev) => ({ ...prev, email: mail }));
      setFormCount(2);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card className="mx-6 h-[40px] mb-2 bg-slate-50 hover:bg-white cursor-pointer flex justify-center items-center gap-2 p-2">
        <GoogleIcon /> <p>continue with google</p>
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
              <Loader darkOn="bg-black" darkOff="bg-white" />
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
  data,
}: {
  setFormCount: Dispatch<SetStateAction<1 | 2 | 3>>;
  data: userData;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fakeLoade = async ()=> {return}
  const sendData = async (formData: FormData) => {
    const code = formData.get("code") as string;
    await fakeLoade();
    setLoading(true);
    const res = await verifyCode({ code: code, email: data.email });
    if (res.status) {
      toast.success(res.message);
      setFormCount(3);

    }else{
       toast.error(res.message);
    }
   setLoading(false);
 
  };
  return (
    <>
      <form action={sendData}>
        <CardContent>
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
              <Loader darkOn="bg-black" darkOff="bg-white" />
            ) : (
              "submit"
            )}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

const Form3 = ({
  setData,
  data
}: {
  setData: Dispatch<SetStateAction<userData>>;
  data :userData
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  

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
      console.log("validation is ",validation)
      if (validation.status) {
        setLoading(true);
        setData((prev: userData) => ({ ...prev, password: pass }));
       
        const res = await registerUser({email:data.email , password:data.password});
        if(res.status){
          toast.success(res.message);
        }else{
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
              <Loader darkOn="bg-black" darkOff="bg-white" />
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
