import { AuthPage } from "@/components/Auth";
import { getSession } from "../actions/auth";

export default async function LoginPage() {
  const session = await getSession();
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center mt-[40px] overflow-y-hidden">
      <AuthPage loginStatus={session.status} />
    </div>
  );
}
