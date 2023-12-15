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
import { useState } from "react";

export default function RegisterCard() {
  const [formCount, setFormCount] = useState<number>(1);

  return (
    <Card className="w-[350px] h-[350px] box-border shadow-2xl">
      <CardHeader>
        <CardTitle>
          Register to <span className="text-red-500">Red</span>Shield
        </CardTitle>
        <CardDescription>redis based authentication</CardDescription>
      </CardHeader>
      <CardContent>
        {formCount === 1 ? (
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nameR">Name</Label>
              <Input
                autoFocus
                name="name"
                required
                type="text"
                id="nameR"
                placeholder="enter your name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="usernameR">username</Label>
              <Input
                name="password"
                required
                type="text"
                id="usernameR"
                placeholder="enter username"
              />
            </div>
          </div>
        ) : (
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nameR">Email</Label>
              <Input
                autoFocus
                name="name"
                required
                type="text"
                id="nameR"
                placeholder="enter your name"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="usernameR">Password</Label>
              <Input
                name="password"
                required
                type="text"
                id="usernameR"
                placeholder="enter username"
              />
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
        <Button
          onClick={() => {
            if(formCount < 3){
              setFormCount(formCount + 1);
            }
            
          }}
          className="w-full"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
