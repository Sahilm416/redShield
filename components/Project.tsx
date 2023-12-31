"use client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export default function ProjectComponent({
  res,
}: {
  res: { id: string; name: string; description: string; key: string };
}) {
  const [show, setShow] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(res.key)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Unable to copy to clipboard", error);
      });
  };

  return (
    <Card className=" w-[90vw] max-w-[500px] shadow-lg bg-white dark:bg-gray-800/20 select-none">
      <CardHeader>
        <CardTitle>{res?.name}</CardTitle>
        <CardDescription>{res?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>key :</p>

        <div className="flex justify-center items-center mt-3">
          <Input
            disabled={true}
            className=" border-r-0 rounded-none h-[40px] focus:outline-none disabled:opacity-100 disabled:cursor-pointer"
            type={show ? "text" : "password"}
            value={res?.key}
          />
          <span
            onClick={() => setShow(!show)}
            className="cursor-pointer h-[40px] border border-l-0 grid place-items-center p-1 bg-white dark:bg-gray-800/20"
          >
            {show ? <Eye /> : <EyeOff />}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopyToClipboard} variant={"outline"}>
          copy key
        </Button>
        <p className={` ml-5 text-green-500 transition-opacity duration-500 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
          key copied
        </p>
      </CardFooter>
    </Card>
  );
}
