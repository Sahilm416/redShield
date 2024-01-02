import { getProject } from "@/app/actions/project";
import UpdateProject from "@/components/UpdateProject";

type projectData = {
  id: string;
  image: string;
  name: string;
  description: string;
  key: string;
};
export default async function ({ params }: { params: { id: string } }) {
  const project = (await getProject({ id: params.id })) as projectData;


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <UpdateProject project={project} />
    </div>
  );
}
