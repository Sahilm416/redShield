import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import React, { useEffect } from "react";


export function AuthPage({ loginStatus }: { loginStatus: boolean }) {
  
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
