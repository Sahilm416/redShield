import DashboardComponent from "@/components/Dashboard";
import ProjectList from "@/components/ProjectList";
import { LoggedUser } from "../actions/auth";


export default async function DashboardPage() {

  const user = await LoggedUser();


  if(!user.status){
    
    return(
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <h1>Session Expired Login again</h1>
        <p>{user.message}</p>
      </div>
    )
  }
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[100px]">
        <DashboardComponent username={"sahil"} isVerified={true} />
        <ProjectList/>
    </div>
  );
}
