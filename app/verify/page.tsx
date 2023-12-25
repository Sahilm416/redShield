import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col justify-center items-center space-y-8 h-screen bg-gray-100 p-10">
      <Card className="p-8 w-full max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
        <CardHeader className="flex items-center justify-center">
          <Avatar className="h-12 w-12">
            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback>UV</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Email Verified</h2>
          <p className="text-gray-600 mt-2">Your email address has been successfully verified.</p>
          <Badge className="items-center mt-6" variant="outline">
            <CheckIcon className="h-4 w-4 text-green-500 -translate-x-1" />
            Verified
          </Badge>
        </CardContent>
      </Card>
      <Button className="w-[220px] py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded">Continue</Button>
    </div>
  )
}

function CheckIcon(props:any) {
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
  )
}
