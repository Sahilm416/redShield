import DashboardComponent from "@/components/Dashboard";
import ProjectList from "@/components/ProjectList";

import { getUser } from "../actions/auth";

export default async function DashboardPage() {

  const user = await getUser() as {status:boolean,username : string, email : string, isVerified : boolean};
  

  if(!user.status){
    
    return(
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <h1>Session Expired Login again</h1>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[100px]">
        <DashboardComponent username={user.username} isVerified={user.isVerified} />
        <ProjectList/>
    </div>
  );
}
