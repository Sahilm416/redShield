import DashboardComponent from "@/components/Dashboard";
import { LoggedUser } from "../actions/auth";
export default async function DashboardPage() {
  const res = await LoggedUser();
 
  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center mt-[100px]">
        <DashboardComponent username={res.data} />
    </div>
  );
}
