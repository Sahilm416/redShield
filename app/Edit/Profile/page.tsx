import { getSession, getUserInfo } from "@/app/actions/auth";
import UpdateUser from "@/components/UpdateUser";

export default async function EditProfile() {
  const session = await getSession();
  if (session.status) {
    const userData = await getUserInfo({ email: session.data.email });
    return (
      <div className="mt-[100px] w-full flex justify-center items-center">
        <UpdateUser user={userData} />
      </div>
    );
  }else {
    return (
      <div className="h-screen w-full flex justify-center items-center">
         <p className="text-xl">Session Expired</p>
      </div>
    );
  }
}
