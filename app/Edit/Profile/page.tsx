import { getSession, getUserInfo } from "@/app/actions/auth";
import UpdateUser from "@/components/UpdateUser";
import { AuthPage } from "@/components/Auth";
export default async function EditProfile() {
  const session = await getSession();
  if (!session.status) {
    return (
      <div className="flex justify-center mt-[40px] ">
        <AuthPage loginStatus={false} />
      </div>
    );
  }
  const userData = await getUserInfo({ email: session.data.email });
  return (
    <div className="mt-[40px] w-full flex justify-center items-center">
      <UpdateUser user={userData} />
    </div>
  );
}
