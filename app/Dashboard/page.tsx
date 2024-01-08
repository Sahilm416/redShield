import DashboardComponent from "@/components/Dashboard";
import { getSession } from "../actions/auth";

export default async function () {
  const res = await getSession();
  return <>{res.status && <DashboardComponent email={res?.data?.email} />}</>;
}
