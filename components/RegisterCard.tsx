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
import { checkEmail, checkPassword, checkUsername } from "@/app/actions/RegCheck";
import { checkValue } from "@/utils/validation/val";
import { useState } from "react";
import { P } from "@upstash/redis/zmscore-b6b93f14";

export default function RegisterCard() {
  const [formCount, setFormCount] = useState<number>(1);

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

  const setUserName = async (e: any) => {
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
  };

  const setEmail = async (e: any) => {
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
  };

  const setPassword = async (e: any)=>{
    if(e){
      setPass((prevState) => ({
        ...prevState,
        message: "just a sec",
        value: e.target.value.trim(),
      }));
      const res = (await checkPassword({ password: e.target.value.trim() })) as {
        status: boolean;
        message: string;
      };
      setPass((prevState) => ({
        ...prevState,
        isValid: res.status,
        message: res.message,
      }));
    }
  }

  return (
    <Card className="w-[350px] h-[370px] box-border shadow-2xl">
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
                onChange={(e) => setCpass(e.target.value.trim())}
                value={cpass}
                name="passwordCR"
                required
                type="password"
                id="passwordCR"
                placeholder="enter password"
              />
              <div className="h-[5px]"></div>
            </div>
            
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-3 justify-between">
        <Button
          disabled={formCount === 1}
          onClick={() => {
            setFormCount(formCount - 1);
          }}
          className={`w-full`}
        >
          prev
        </Button>
        {formCount === 2 ? (
          <Button variant={"outline"} className="w-full">
            create profile
          </Button>
        ) : (
          <Button
            onClick={() => {
              if (formCount < 2) {
                setFormCount(formCount + 1);
              }
            }}
            className="w-full"
          >
            Next
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
