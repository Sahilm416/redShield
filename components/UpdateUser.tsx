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
import { Oval } from "react-loader-spinner";
type User = {
  first_name?: string;
  last_name?: string;
  email: string;
  profile_picture?: string;
};

export default function UpdateUser({ user }: { user: User }) {
  const [loading, setLoading] = useState<boolean>(false);
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
      setLoading(true);
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
      setLoading(false);
    } else {
      toast.error(check.message);
    }
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
      <Card className="w-[90vw] sm:max-w-[450px]">
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={user.email}
              disabled
              className=" disabled:opacity-100"
              id="email"
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Button type="button" className="p-0" variant={"link"}>
              Request Password change
            </Button>
          </div>
        </CardContent>
        <CardFooter className="gap-5">
            <Button onClick={()=> router.back()} type="button" variant={'outline'} className="w-full rounded-none">
                Back
            </Button>
          <Button
            disabled={loading}
            type="submit"
            className="w-full rounded-none"
          >
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
              "save"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
