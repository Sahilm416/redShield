"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { checkGoogleUserExists } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export function AuthPage() {
  useEffect(() => {
    toast.message("Login with your redshield account", {
      description: "provide the credentials to login",
    });
  }, []);
  const router = useRouter();
  const user = useSession();


  if (user.status === "authenticated") {
    const email = user.data.user?.email as string;
    const profile = user.data.user?.image as string;
    const signGoogleUser = async () => {
      await checkGoogleUserExists({ email: email, profile_picture: profile });
      return router.push("/Dashboard");
    };
    signGoogleUser();
  }

  return (
    <Tabs className=" w-[90vw] max-w-[400px]" defaultValue="login">
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
