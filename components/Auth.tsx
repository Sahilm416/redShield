import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginCard from "./LoginCard"
import RegisterCard from "./RegisterCard"
export function AuthPage() {



  return (
    <Tabs defaultValue="login" className="w-[350px] h-[400px] flex justify-center items-center flex-col">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
          <LoginCard/>
      </TabsContent>
      <TabsContent value="register">
           <RegisterCard/>
      </TabsContent>
    </Tabs>
  )
}
