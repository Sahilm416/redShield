"use client";
import {
  Card,
  CardContent,
  CardDescription,
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

  return (
    <Card className="w-auto sm:min-w-[500px] min-w-[370px] max-w-[750px bg-slate-100 dark:bg-black">
      <CardHeader>
        <CardTitle>{res?.name}</CardTitle>
        <CardDescription>{res?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>key :</p>

        <div className="flex justify-center items-center mt-3">
          <Input
            className=" border-r-0 rounded-none h-[40px]"
            type={show ? "text" : "password"}
            value={res?.key}
          />
          <span
            onClick={() => setShow(!show)}
            className="cursor-pointer h-[40px] border border-l-0 grid place-items-center p-1 bg-white dark:bg-black"
          >
            {show ? (
              <Eye />
            ) : (
              <EyeOff />
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
