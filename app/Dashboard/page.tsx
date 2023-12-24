import { LoggedUser } from "../actions/auth";
import DashboardComponent from "@/components/Dashboard";
export default async function (){
  const res = await LoggedUser();
  return(
    <>
      <DashboardComponent username={res.data}/>
    </>
  )
}