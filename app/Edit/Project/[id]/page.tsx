import { getProject } from "@/app/actions/project";
import UpdateProject from "@/components/UpdateProject";
import { getSession } from "@/app/actions/auth";
import { AuthPage } from "@/components/Auth";
type projectData = {
  id: string;
  image: string;
  name: string;
  description: string;
  key: string;
};
export default async function ({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session.status) {
    return (
      <div className="flex justify-center mt-[100px] ">
        <AuthPage loginStatus={false} />
      </div>
    );
  }
  const project = (await getProject({ id: params.id })) as projectData;
  return (
    <div className="w-full sm:h-screen flex justify-center mt-[100px] sm:mt-0 sm:items-center">
      {project && <UpdateProject project={project} />}
    </div>
  );
}
