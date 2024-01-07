import { AuthPage } from "@/components/Auth";
import { getSession } from "../actions/auth";

export default async function LoginPage() {
  const session = await getSession();
  return (
    <div className="w-full h-screen flex flex-col items-center pt-[100px] overflow-y-hidden">
      <AuthPage loginStatus={session.status} />
    </div>
  );
}
