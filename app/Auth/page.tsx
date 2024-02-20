import AuthPage from "redshield/Auth";
import { getProject } from "redshield/actions/auth";

export default async function LoginPage() {
  const project = await getProject();
  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col items-center mt-[40px] overflow-y-hidden">
      <AuthPage project={project} />
    </div>
  );
}
