"use client";
import { LoginUser } from "@/app/actions/auth";
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
export default function LoginCard() {
  const sendData = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("data is: ", email, password);
    const res = await LoginUser({email:email ,password:password});
    console.log("res is: ", res);
  };  
  return (
    <>
      <Card className=" w-auto max-w-[550px] min-w-[350px] dark:bg-black ">
        <form action={sendData}>
          <CardHeader>
            <CardTitle>
              Login to <span className="text-red-600">Red</span>shield
            </CardTitle>
            <CardDescription>redis based auth</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input autoFocus type="email" name="email" id="email" required />
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" required />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
