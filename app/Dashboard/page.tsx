import DashboardComponent from "@/components/Dashboard";
import { getUser } from "../actions/auth";

export default async function () {
  const res = await getUser();
  return (
    <>
      <DashboardComponent email={res.data.email} />
    </>
  );
}
