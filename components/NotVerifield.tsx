"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { sendVerification } from "@/app/actions/verification"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Loader from "./Loader"
import { useState } from "react"
export default function NotVerified({username,email}:{username: string , email:string}) {

  const [loading , setLoading] = useState<boolean>();

  const verifyEmail = async ()=>{
    setLoading(true);
    const res = await sendVerification({username: username , email: email });
    console.log("res: " + res);
    if(res){
      toast.success("verification email sent successfully");
    }else{
      toast.error("something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-[740px] grid place-items-center sm:border border-slate-200 dark:border-slate-700 rounded-sm px-7 sm:px-2 py-10">
     <Card className="mx-auto sm:text-center max-w-[400px] sm:border-none ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
        <CardDescription>Your email address is not yet verified.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
         
          <p className="text-gray-500 dark:text-gray-400">
            To access all features, please verify your email address. Click the button below to send the verification
            email.
          </p>
          <Button disabled={loading} onClick={verifyEmail} className="w-full">
            {
              loading ? <Loader darkOn="bg-black" darkOff="bg-white"/> : "Send verification email"
            }
          </Button>
        </div>
      </CardContent>
    </Card> 
    </div>
    
  )
}

