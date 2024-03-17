"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/app/actions/user";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetPasswordLink } from "@/app/actions/resetPassword";
import { Loader2 } from "lucide-react";
type User = {
  first_name?: string;
  last_name?: string;
  email: string;
  profile_picture?: string;
};

export default function UpdateUser({ user }: { user: User }) {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [resetPassLoading, setResetPassLoading] = useState<boolean>(false);

  const router = useRouter();
  const fakeLoad = async () => {
    return;
  };
  const update = async (formData: FormData) => {
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const check = validateInput({ first_name: firstName, last_name: lastName });
    if (check.status) {
      await fakeLoad();
      setSaveLoading(true);
      const res = await updateUser({
        first_name: firstName,
        last_name: lastName,
      });
      if (res.status) {
        toast.success(res.message);

        router.refresh();
        router.back();
      } else {
        toast.error(res.message);
      }
      setSaveLoading(false);
    } else {
      toast.error(check.message);
    }
  };

  const resetPassRequest = async () => {
    await fakeLoad();
    setResetPassLoading(true);
    const res = await sendResetPasswordLink({ email: user.email });
    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setResetPassLoading(false);
  };

  const validateInput = ({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) => {
    if (first_name.trim().length < 3) {
      return {
        status: false,
        message: "first name must be at least 3 characters",
      };
    }
    if (last_name.trim().length < 3) {
      return {
        status: false,
        message: "last name must be at least 3 characters",
      };
    }
    if (first_name.trim().length > 20) {
      return {
        status: false,
        message: "first name must be at most 20 characters",
      };
    }
    if (last_name.trim().length > 20) {
      return {
        status: false,
        message: "first name must be at most 20 characters",
      };
    }

    return {
      status: true,
      message: "valid input",
    };
  };
  return (
    <form action={update}>
      <Card className="w-[90vw] sm:max-w-[450px] shadow-lg bg-white dark:bg-gray-800/20 border-[#EBEBEB] dark:border-[#1F1F1F] rounded-sm">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className=" space-y-2">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              required
              name="first_name"
              type="text"
              placeholder={user?.first_name || "enter your first name"}
              id="first_name"
              className="border-[#EBEBEB] dark:border-[#1F1F1F] rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              required
              name="last_name"
              type="text"
              placeholder={user?.last_name || "enter your last name"}
              id="last_name"
              className="border-[#EBEBEB] dark:border-[#1F1F1F] rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={user.email}
              disabled
              className=" disabled:opacity-100 border-[#EBEBEB] dark:border-[#1F1F1F] rounded-sm"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
        </CardContent>
        <CardFooter className=" flex flex-col gap-5">
          <Button
            onClick={resetPassRequest}
            disabled={resetPassLoading}
            type="button"
            variant={"destructive"}
            className="w-full rounded-sm bg-red-700 text-white "
          >
            {resetPassLoading ? (
              <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]"/>
            ) : (
              "Request Password change"
            )}
          </Button>
          <div className="w-full flex gap-3">
            <Button
              onClick={() => router.back()}
              type="button"
              variant={"outline"}
              className="w-full rounded-sm border-[#EBEBEB] dark:border-[#1F1F1F]"
            >
              Back
            </Button>
            <Button
              disabled={saveLoading}
              type="submit"
              className="w-full rounded-sm"
            >
              {saveLoading ? (
                <Loader2 className="animate-[spin_0.4s_linear_infinite] w-[27px] h-[27px]"/>
              ) : (
                "save"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
