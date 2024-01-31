import DashboardComponent from "@/components/Dashboard";
import { getSession } from "../actions/auth";
import { AuthPage } from "@/components/Auth";
export default async function () {
  const session = await getSession();
  if (!session.status) {
    return (
      <div className="flex justify-center w-full h-[calc(100vh-100px)] mt-[40px]">
        <AuthPage loginStatus={false} />
      </div>
    );
  }
  return (
    <>{session.status && <DashboardComponent email={session?.data?.email} />}</>
  );
}
