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
import {
  checkEmail,
  checkPassword,
  checkUsername,
} from "@/app/actions/RegCheck";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { NewUser } from "./NewUser";

export default function RegisterCard() {
  const [formCount, setFormCount] = useState<number>(1);
  const [form1Complete, setForm1Complete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [user, setUser] = useState({
    isValid: false,
    message: "",
    value: "",
  });

  const [mail, setMail] = useState({
    isValid: false,
    message: "",
    value: "",
  });

  const [pass, setPass] = useState({
    isValid: false,
    message: "",
    value: "",
  });
  const [cpass, setCpass] = useState<string>("");

  const router = useRouter();

  const setUserName = async (e: any) => {
    setForm1Complete(false);
    if (e) {
      setUser((prevState) => ({
        ...prevState,
        message: "just a sec",
        value: e.target.value.trim(),
      }));

      const res = (await checkUsername({
        username: e.target.value.trim(),
      })) as { status: boolean; message: string };

      setUser((prevState) => ({
        ...prevState,
        isValid: res.status,
        message: res.message,
      }));
    }
    setForm1Complete(true);
  };

  const setEmail = async (e: any) => {
    setForm1Complete(false);
    if (e) {
      setMail((prevState) => ({
        ...prevState,
        message: "just a sec",
        value: e.target.value.trim(),
      }));
      const res = (await checkEmail({ email: e.target.value.trim() })) as {
        status: boolean;
        message: string;
      };

      setMail((prevState) => ({
        ...prevState,
        isValid: res.status,
        message: res.message,
      }));
    }
    setForm1Complete(true);
  };

  const setPassword = async (e: any) => {
    if (e) {
      setPass((prevState) => ({
        ...prevState,
        message: "just a sec",
        value: e.target.value.trim(),
      }));
      const res = (await checkPassword({
        password: e.target.value.trim(),
      })) as {
        status: boolean;
        message: string;
      };
      setPass((prevState) => ({
        ...prevState,
        isValid: res.status,
        message: res.message,
      }));
    }
  };

  const comparePass = (e: any)=>{
    setCpass(e.target.value.trim())
    if (e.target.value === pass.value) {
      setIsMatch(true);
    } else {
      setIsMatch(false);
    }
  }

  const nextStep = () => {
    if (user.isValid && mail.isValid && form1Complete) {
      setFormCount(2);
    } else {
      toast.error("complete the fields first!");
    }
  };

  const createProfile = async () => {
    try {
      setLoading(true);

      const res = await registerUser({
        username: user.value,
        password: pass.value,
        email: mail.value,
      });

      if (res.status) {
        return setIsRegistered(true);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isRegistered ? (
        <NewUser username={user.value} />
      ) : (
        <Card className="sm:w-[350px] w-[400px] h-[370px] box-border dark:shadow-slate-200 dark:shadow-sm shadow-2xl">
          <CardHeader>
            <CardTitle>
              Register to <span className="text-red-500">Red</span>Shield
            </CardTitle>
            <CardDescription>redis based authentication</CardDescription>
          </CardHeader>
          <CardContent>
            {formCount === 1 ? (
              <div className="grid w-full items-center gap-5">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="usernameR">Username</Label>
                  <Input
                    onChange={(e) => setUserName(e)}
                    autoFocus
                    value={user.value}
                    name="usernameR"
                    required
                    type="text"
                    id="usernameR"
                    placeholder="enter username"
                  />
                  <div className=" h-[5px]">
                    {user.isValid ? (
                      <p
                        className={`text-sm ${
                          user.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {user.message}
                      </p>
                    ) : (
                      <p
                        className={`text-red-700 text-sm ${
                          user.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {user.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="emailR">Email</Label>
                  <Input
                    onChange={(e) => setEmail(e)}
                    value={mail.value}
                    name="emailR"
                    required
                    type="email"
                    id="emailR"
                    placeholder="enter your email"
                  />
                  <div className="h-[5px]">
                    {mail.isValid ? (
                      <p
                        className={`text-sm ${
                          mail.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {mail.message}
                      </p>
                    ) : (
                      <p
                        className={`text-red-700 text-sm ${
                          mail.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {mail.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid w-full items-center gap-5">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="passwordR">Password</Label>
                  <Input
                    onChange={(e) => setPassword(e)}
                    value={pass.value}
                    name="passwordR"
                    required
                    type="password"
                    id="passwordR"
                    placeholder="enter password"
                  />
                  <div className="h-[5px]">
                    {pass.isValid ? (
                      <p
                        className={`text-sm ${
                          pass.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {pass.message}
                      </p>
                    ) : (
                      <p
                        className={`text-red-700 text-sm ${
                          pass.message === "just a sec"
                            ? "text-slate-700"
                            : "text-green-700"
                        }`}
                      >
                        {pass.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="passwordCR">Confirm password</Label>
                  <Input
                    onChange={(e) => {
                       comparePass(e);
                    }}
                    value={cpass}
                    name="passwordCR"
                    required
                    type="password"
                    id="passwordCR"
                    placeholder="enter password"
                  />
                  <div className="h-[5px]">
                    {cpass.length > 7 && (isMatch ? (
                      <p className=" text-sm text-green-700">password match</p>
                    ) : (
                      <p className=" text-sm text-red-700">pasword didn't match</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center gap-3 justify-between">
            <Button
              disabled={formCount === 1}
              onClick={() => {
                setFormCount(1);
              }}
              className={`w-full`}
            >
              prev
            </Button>
            {formCount === 2 ? (
              <Button
                disabled={loading}
                variant={"outline"}
                onClick={() => {
                 if(pass.isValid && isMatch){
                  toast.promise(createProfile, {
                    loading: "creating profile wait",
                    success: "profile created successfully",
                    error: "profile creation failed",
                  });
                }else{
                  toast.error("confirm the password first")
                }
              }
                 }
                  
                className="w-full"
              >
                create profile
              </Button>
            ) : (
              <Button onClick={nextStep} className="w-full">
                Next
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
