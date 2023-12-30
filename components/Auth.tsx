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
  const signGoogleUser = async () => {
    if (user.status === "authenticated") {
      const email = user.data.user?.email as string;
      const profile = user.data.user?.image as string;

      await checkGoogleUserExists({ email: email, profile_picture: profile });
      return router.push("/Dashboard");
    }
  };

  if (user.status === "authenticated") {
    signGoogleUser();
    return (
      <div className="w-full mt-[100px] grid place-items-center">
        <p className="text-3xl text-slate-500">Redirecting user...</p>
      </div>
    );
  } else {
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
}
