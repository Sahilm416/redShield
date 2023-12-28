import DashboardComponent from "@/components/Dashboard";
import { getUser } from "../actions/auth";

export default async function () {
  const res = await getUser();
  return (
    <>
       {res.status && <DashboardComponent email={res?.data?.email} />}
    </>
  );
}
