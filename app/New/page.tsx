import CreateProject from "@/components/CreateProject";
import { getSession } from "../actions/auth";
import { AuthPage } from "@/components/Auth";
export default async function NewProject() {
  const session = await getSession();
  if (!session.status) {
    return (
      <div className="flex justify-center mt-[100px] ">
        <AuthPage loginStatus={false} />
      </div>
    );
  }
  return <CreateProject />;
}
