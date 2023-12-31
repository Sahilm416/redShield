import { getProject } from "@/app/actions/project";
import ProjectComponent from "@/components/Project";
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
  return (
    <div className="mt-[100px] flex flex-col gap-5 justify-center items-center">
      {res ? (
        <>
          <ProjectComponent res={res} />
          <Users secret={res.key} />
        </> 
      ): <p className="text-2xl text-slate-500">Logging Out...</p>}
    
    </div>
  );
}
