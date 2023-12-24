import { LoggedUser } from "../actions/auth";
import DashboardComponent from "@/components/Dashboard";
export default async function () {
  const res = await LoggedUser();
  console.log("logged in", res.data);
  return (
    <>
      <p className="mt-[200px]">token username is {res.data}</p>
    </>
  );
}
