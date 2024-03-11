import AdminPanel from "@/components/AdminPanel";
import { getSession } from "../actions/auth";

export default async function Admin() {
  const session = await getSession();
  if (!session?.data?.isAdmin) {
     return (
        <p className="text-lg text-center my-20 text-red-500">You are not authorized to access this route!</p>
     )
  }
  return (
    <div className="w-full ">
      <AdminPanel />
    </div>
  );
}
