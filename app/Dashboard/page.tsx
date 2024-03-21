import DashboardComponent from "@/components/Dashboard";
import { getSession } from "redshield";
export default async function () {
  const session = await getSession();
  return (
    <div className="w-full">
      <DashboardComponent email={session?.data?.email} />
    </div>
  );
}
