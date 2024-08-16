//this should be a server component
import { AuthPage } from "@/components/Auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Page",
};

const Auth = () => {
  return (
    <div className="w-full mt-20 flex justify-center">
       <AuthPage />
    </div>
  );
};
export default Auth;