import DashboardComponent from "@/components/Dashboard";
import ProjectList from "@/components/ProjectList";
import { getUser } from "../actions/auth";
export default async function DashboardPage() {
  const user = await getUser() as {username: string , email: string , isVerified: boolean};
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[100px]">
        <DashboardComponent username={user.username} isVerified={user.isVerified} />
        
        <ProjectList/>
    </div>
  );
}
