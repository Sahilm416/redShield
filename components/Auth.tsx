"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { useEffect } from "react";
import { toast } from "sonner";

export const dynamic = "force-dynamic";
export function AuthPage() {
  useEffect(() => {
    toast.message("Login with your redshield account", {
      description: "provide the credentials to login",
    });
  }, []);

  return (
    <Tabs defaultValue="login">
      <TabsList className="grid dark:bg-slate-900 w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
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
