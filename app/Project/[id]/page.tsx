import { getProject } from "@/app/actions/project";
import ProjectComponent from "@/components/Project";
type resData = {
    id: string
    name:string
    description:string,
    key: string
}
export default async function ProjectPage({params}:{params:{id:string}}){
    const res = await getProject({id:params.id}) as resData;
    return(
        <div className="mt-[100px] flex justify-center items-center">
           {res && <ProjectComponent res={res}/>}
        </div>
    )
}