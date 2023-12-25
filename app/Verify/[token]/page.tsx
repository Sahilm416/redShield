"use client"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { verifyUser } from "@/app/actions/verification";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type ResData = {
  status: boolean;
  message: string;
  username: string;
  profile_picture: string;
};

export default function VerifyUserPage({
  params,
}: {
  params: { token: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [res, setRes] = useState<ResData>({ status: false, message: "", username: "", profile_picture: ""});
  const router = useRouter();
  useEffect(() => {
    checkVerification();
  }, [params.token]);

  const checkVerification = async () => {
    try {
      const data = await verifyUser({ token: params.token }) as ResData;
      setRes(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <p className="mt-[200px] text-center text-xl text-slate-400">
          Verifying user...
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center space-y-8 h-screen bg-gray-100 dark:bg-[rgb(18,18,18)] p-10">
          {res.status ? (
            <Card className="p-8 w-full max-w-md mx-auto bg-white dark:bg-black rounded-xl shadow-lg space-y-6">
              <CardHeader className="flex items-center justify-center">
                <Avatar className="h-12 w-12">
                  <AvatarImage className=" object-cover" alt="User Avatar" src={res.profile_picture} />
                  <AvatarFallback>{res.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardDescription>{res.username}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <h2 className="text-3xl font-semibold dark:text-slate-300 text-gray-800">
                  Email Verified
                </h2>
                <p className="text-gray-600 dark:text-slate-500 mt-2">
                  Your email address has been successfully verified.
                </p>
                <Badge className="items-center mt-6" variant="outline">
                  <CheckIcon className="h-4 w-4 text-green-500 -translate-x-1" />
                  Verified
                </Badge>
              </CardContent>
            </Card>
          ) : (
            <p className="text-xl text-slate-600">{res.message}</p>
          )}
          <Button onClick={()=> router.push('/Dashboard')} className="w-[220px] py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded">
            Continue
          </Button>
        </div>
      )}
    </>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
