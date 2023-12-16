import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function NewUser({username} : {username: string}) {

    const reload = ()=>{
        return window.location.reload()
      }
  return (
    <Card className="sm:w-[350px] w-[400px] h-[370px] flex flex-col justify-center items-center shadow-2xl">
      <CardHeader>
        <CardTitle>Accout Created <span className="text-green-700">Successfully</span></CardTitle>
        <CardDescription>try logging in to your created account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <p className=" text-xl text-slate-800">Hey, <span className="text-red-700">{username}</span></p>
            <p className=" text-sm text-slate-500">You have successfully created the redshield account <br /> try login with your credentials</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="w-full ">
            <Button onClick={reload} className="w-full">To Login Page</Button>
      </CardFooter>
    </Card>
  )
}
