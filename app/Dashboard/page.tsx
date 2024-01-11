import DashboardComponent from "@/components/Dashboard";
import { getSession } from "../actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function () {
  const res = await getSession();
  if (!res.status) {
    return (
      <div className=" w-full h-screen flex flex-col gap-3 justify-start items-center mt-[100px]">
        <p className=" text-lg">Login to access dashboard</p>
        <Link href={"/Auth"}>
          <Button className=" rounded-none w-[200px]">login</Button>
        </Link>
      </div>
    );
  }
  return <>{res.status && <DashboardComponent email={res?.data?.email} />}</>;
}
