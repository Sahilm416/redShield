"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function AuthPage({ loginStatus }: { loginStatus: boolean }) {
  const router = useRouter();
  if (loginStatus) {
    router.push("/Dashboard");
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <p className="text-2xl">Redirecting...</p>
      </div>
    );
  }

  useEffect(() => {
    toast.message("Login with your redshield account", {
      description: "provide the credentials to login",
    });
  }, []);

  return (
    <Tabs className=" w-[90vw] max-w-[400px]" defaultValue="login">
      <TabsList className="grid dark:bg-slate-900 w-full grid-cols-2 rounded-none">
        <TabsTrigger className=" rounded-none" value="login">Login</TabsTrigger>
        <TabsTrigger className=" rounded-none" value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginCard />
      </TabsContent>
      <TabsContent value="register">
        <RegisterCard />
      </TabsContent>
    </Tabs>
  );
}
