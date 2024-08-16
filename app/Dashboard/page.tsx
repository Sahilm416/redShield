import DashboardComponent from "@/components/Dashboard";
import { getSession } from "redshield";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function () {
  const session = await getSession();
  return (
    <div className="w-full">
      <DashboardComponent email={session?.data?.email} />
    </div>
  );
}
