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
      <div className="flex justify-center mt-[40px] min-h-[calc(100vh-100px)] ">
        <AuthPage loginStatus={false} />
      </div>
    );
  }
  const project = (await getProject({ id: params.id })) as projectData;
  return (
    <div className="w-full flex justify-center mt-[40px] min-h-[calc(100vh-100px)] ">
      {project && <UpdateProject project={project} />}
    </div>
  );
}
