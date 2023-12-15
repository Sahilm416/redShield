"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginUser } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Success from "./Success";
import Loader from "./Loader";
import Link from "next/link";

export default function LoginForm() {
  const [inputUsernameErr, setInputUsernameErr] = useState<boolean>(true);
  const [inputPasswordErr, setInputPasswordErr] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [loginErr, setLoginErr] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [user, setUser] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loading , setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!inputPasswordErr && !inputUsernameErr) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputPasswordErr, inputUsernameErr]);

  const Login = async () => {
    
    try {
      setLoading(true);
      const checkMode = process.env.NODE_ENV === "development";
      const apiURL = checkMode
        ? "http://localhost:3000/api/service/login"
        : "https://redshield.vercel.app/api/service/login";
      const res = await LoginUser({
        username: user,
        password: pass,
        url: apiURL,
      });

      if (res?.success) {
        setSuccess(true);
        console.log(success)
        setTimeout(() => {
            return router.push("/");
        }, 2000);
      }

      setLoginErr(res?.message);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <>
      {success ? <Success/> :  <Card className="w-[350px] h-[350px] box-border shadow-2xl">
        <CardHeader>
          <CardTitle>
            Login to <span className="text-red-500">Red</span>Shield
          </CardTitle>
          <CardDescription>redis based authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user">Username</Label>
              <Input
                autoFocus
                onChange={(e) => {
                  setUser(e.target.value.trim());
                  if (e.target.value.trim().length > 3) {
                    setInputUsernameErr(false);
                  } else {
                    setInputUsernameErr(true);
                  }
                }}
                name="username"
                required
                type="text"
                id="user"
                placeholder="enter username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passwordlogin">Password</Label>
              <Input
                onChange={(e) => {
                  setPass(e.target.value.trim());
                  if (e.target.value.trim().length > 7) {
                    setInputPasswordErr(false);
                  } else {
                    setInputPasswordErr(true);
                  }
                }}
                name="password"
                required
                type="password"
                id="passwordlogin"
                placeholder="enter password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between">
          <Button disabled={isDisabled} onClick={Login} className="w-full">
           {loading ? <Loader/> : "Log in"}
          </Button>
        </CardFooter>
      </Card>}
      </>
  );
}
