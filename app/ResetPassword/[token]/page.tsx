import { checkResetPasswordToken } from "@/app/actions/resetPassword";
import ResetPassComponent from "@/components/ResetPassComponent";
export const revalidate = 0;
export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const res = (await checkResetPasswordToken({ token: params.token })) as {
    status: boolean;
    data: string;
  };

  if (!res.status) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Invalid link</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center mt-[100px]">
      <ResetPassComponent email={res.data} token={params.token} />
    </div>
  );
}
