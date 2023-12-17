import { AuthPage } from "@/components/Auth"
export const revalidate = 0;
export default function LoginPage (){
    return (
        <div className="w-full h-screen flex flex-col items-center pt-[100px] overflow-y-hidden">
            <AuthPage/>
        </div>
    )
}