import { checkToken } from "@/app/actions/auth";
export default async function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const res = await checkToken({ token: params.token });

  if (!res.status) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Invalid link</p>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <p>valid link</p>
    </div>
  );
}
