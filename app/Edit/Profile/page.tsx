import { getUserInfo } from "@/app/actions/auth";
import UpdateUser from "@/components/UpdateUser";

export default async function EditProfile() {
  const userData = await getUserInfo();
  return (
    <div className="mt-[40px] min-h-[calc(100vh-100px)] w-full flex justify-center">
      <UpdateUser user={userData} />
    </div>
  );
}
