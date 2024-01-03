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
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { sendCode } from "@/app/actions/register";
type User = {
  first_name?: string;
  last_name?: string;
  email: string;
  profile_picture?: string;
};

export default function UpdateUser({ user }: { user: User }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [changePassRequest, setChangePassRequest] = useState<boolean>(false);
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
    <>
      {changePassRequest ? (
        <ChangePass
          email={user.email}
          setChangePassRequest={setChangePassRequest}
        />
      ) : (
        <form action={update}>
          <Card className="w-[90vw] sm:max-w-[450px] shadow-lg bg-white dark:bg-gray-800/20">
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
            </CardContent>
            <CardFooter className=" flex flex-col gap-5">
              <Button
                onClick={async () => {
                  await sendCode({ email: user.email });
                  setChangePassRequest(true);
                }}
                type="button"
                variant={"destructive"}
                className="w-full rounded-none bg-red-700 text-white "
              >
                Request Password change
              </Button>
              <div className="w-full flex gap-3">
                <Button
                  onClick={() => router.back()}
                  type="button"
                  variant={"outline"}
                  className="w-full rounded-none"
                >
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
              </div>
            </CardFooter>
          </Card>
        </form>
      )}
    </>
  );
}

const ChangePass = ({
  email,
  setChangePassRequest,
}: {
  email: string;
  setChangePassRequest: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Card className="w-[90vw] sm:max-w-[450px] shadow-lg bg-white dark:bg-gray-800/20">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
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
          onClick={() => setChangePassRequest(false)}
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
    </Card>
  );
};
