import { getProject } from "@/app/actions/project";
import ProjectComponent from "@/components/Project";
import { Label } from "@/components/ui/label";
import Users from "@/components/Users";
type resData = {
    id: string
    name:string
    description:string,
    key: string
}
export default async function ProjectPage({params}:{params:{id:string}}){
    const res = await getProject({id:params.id}) as resData;
    return(
        <div className="mt-[100px] flex flex-col sm:items-start gap-5 sm:pl-5 justify-center items-center">
           {res && <ProjectComponent res={res}/>}
           <Label className="text-3xl">Users</Label>
           <p>{'1] sahil mulani'}</p>
           <Users/> 
        </div>
    )
}
