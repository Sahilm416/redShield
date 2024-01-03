import { getSession, getUserInfo } from "@/app/actions/auth";
import UpdateUser from "@/components/UpdateUser";

export default async function EditProfile() {
  const session = await getSession();
  const userData = await getUserInfo({ email: session.data.email });
  return (
    <div className="mt-[100px] w-full flex justify-center items-center">
      <UpdateUser user={userData} />
    </div>
  );
}
