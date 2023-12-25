import DashboardComponent from "@/components/Dashboard";
import { LoggedUser } from "../actions/auth";

export default async function () {
  const res = await LoggedUser();
  return (
    <>
      <DashboardComponent username={res.data} />
    </>
  );
}
