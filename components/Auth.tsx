import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

export function AuthPage() {
  return (
    <Tabs className=" w-[90vw] max-w-[400px]" defaultValue="login">
      <TabsList className="grid dark:bg-slate-900 w-full grid-cols-2 rounded-sm">
        <TabsTrigger className=" rounded-sm" value="login">Login</TabsTrigger>
        <TabsTrigger className=" rounded-sm" value="register">Register</TabsTrigger>
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
