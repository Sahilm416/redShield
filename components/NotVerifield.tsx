
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function NotVerified() {
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
          <Button className="w-full">Verify Email</Button>
        </div>
      </CardContent>
    </Card> 
    </div>
    
  )
}

