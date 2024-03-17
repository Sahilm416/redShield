"use client";
import {
  CardTitle,

  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkPassword } from "@/app/actions/checks";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword } from "@/app/actions/resetPassword";
import { Loader2 } from "lucide-react";

export default function ResetPassComponent({ email , token}: { email: string , token: string}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const sendData = async (formData: FormData) => {
    const password = formData.get("reset_pass") as string;
    const confirm_password = formData.get("confirm_reset_pass") as string;

    if (password.trim() === confirm_password.trim()) {
      const checkInputPassword = await checkPassword({ password: password });
      if (checkInputPassword.status) {
        await fakeLoad();
        setLoading(true);
        const res = await changePassword({ password: password, email: email , token: token });
        if (res.status) {
          toast.success(res.message);
          router.refresh();
          router.push('/Auth');
        } else {
          toast.error(res.message);
        }
        setLoading(false);
      } else {
        toast.error(checkInputPassword.message);
      }
    } else {
      toast.error("password did not match");
    }
  };
  return (
    <>
      <form action={sendData}>
        <Card className="w-[90vw] max-w-[450px] shadow-lg rounded-sm bg-white dark:bg-gray-900/20">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label htmlFor="resetpass">New password</Label>
            <Input
              required
              name="reset_pass"
              id="resetpass"
              type="password"
              className=" rounded-sm"
            />
            <Label htmlFor="confirmresetpass">Confirm Password</Label>
            <Input
              required
              name="confirm_reset_pass"
              id="confirmresetpass"
              type="password"
              className=" rounded-sm"
            />
          </CardContent>
          <CardFooter className=" justify-end">
            <Button
              disabled={loading}
              type="submit"
              className=" w-[150px] rounded-sm"
            >
              {loading ? (
                <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]"/>
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}

const fakeLoad = async () => {
  return;
};
