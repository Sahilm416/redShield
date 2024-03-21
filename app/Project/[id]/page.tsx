import { getProject } from "@/app/actions/project";
import ProjectComponent from "@/components/ProjectComponent";
import Users from "@/components/Users";

type resData = {
  id: string;
  name: string;
  description: string;
  key: string;
};
export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const res = (await getProject({ id: params.id })) as resData;
  if (!res) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
        <p>Invalid project</p>
      </div>
    );
  }
  return (
    <div className=" mt-[40px] min-h-[calc(100vh-100px)] flex flex-col gap-5  items-center">
      <ProjectComponent res={res} />
      <Users secret={res.key} />
    </div>
  );
}
