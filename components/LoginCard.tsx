"use client";
import { login } from "redshield";
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
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sendResetPasswordLink } from "@/app/actions/resetPassword";
import { Loader2 } from "lucide-react";
export default function LoginCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const router = useRouter();
  const fakeLoad = async () => {
    return;
  };
  const sendData = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await fakeLoad();
    setLoading(true);
    const res = await login({email: email, password: password})
    if (res.status) {
      toast.success(res.message);
      formData.delete("email")
      router.refresh();
      router.push("/Dashboard");
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  return (
    <>
      {forgotPassword ? (
        <ForgotPasswordComponent setForgotPassword={setForgotPassword} />
      ) : (
        <Card className=" dark:bg-gray-900/20 bg-white p-2 h-[380px] shadow-lg rounded-sm border-[#EBEBEB] dark:border-[#1F1F1F]">
          <form action={sendData}>
            <CardHeader>
              <CardTitle>Login to Redshield</CardTitle>
              <CardDescription>redis based auth</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                className=" rounded-sm border-[#EBEBEB] dark:border-[#1F1F1F]"
                autoFocus
                placeholder="enter email"
                type="email"
                name="email"
                id="email"
                required
              />
              <Label htmlFor="password">Password</Label>
              <Input
                className=" rounded-sm border-[#EBEBEB] dark:border-[#1F1F1F]"
                placeholder="enter password"
                type="password"
                name="password"
                id="password"
                required
              />
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button
                disabled={loading}
                className="w-full rounded-sm"
                type="submit"
              >
                {loading ? (
                  <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]" />
                ) : (
                  "login"
                )}
              </Button>
              <Button onClick={() => setForgotPassword(true)} variant={"link"}>
                forgot password
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </>
  );
}

function ForgotPasswordComponent({
  setForgotPassword,
}: {
  setForgotPassword: Dispatch<SetStateAction<boolean>>;
}) {
  const [resetPassLoading, setResetPassLoading] = useState<boolean>(false);
  const resetPassRequest = async (formData: FormData) => {
    const email = formData.get("email") as string;

    await fakeLoad();
    setResetPassLoading(true);
    const res = await sendResetPasswordLink({ email: email });
    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setResetPassLoading(false);
  };
  return (
    <form action={resetPassRequest}>
      <Card className=" rounded-sm dark:border-[#171717]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Label htmlFor="forgotPassEmail">Email</Label>
          <Input
            name="email"
            placeholder="enter your email address"
            required
            autoFocus
            className=" rounded-sm dark:border-[#171717]"
            id="forgotPassEmail"
            type="email"
          />
        </CardContent>
        <CardFooter className="gap-3">
          <Button
            onClick={() => setForgotPassword(false)}
            variant={"outline"}
            className="w-full rounded-sm dark:border-[#171717]"
          >
            Back
          </Button>
          <Button className=" rounded-sm w-full">
            {resetPassLoading ? (
              <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]" />
            ) : (
              "Send link"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

const fakeLoad = async () => {
  return;
};
