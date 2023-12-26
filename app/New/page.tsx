"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createNewProject } from "../actions/project"
import { toast } from "sonner"

export default function NewProject() {

 const createProject = async (formData:FormData)=>{
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

   const res = await createNewProject({project_name: name, project_description: description});
  toast.message(res.message);

 }
  return (
    <div className="w-full grid place-items-center mt-[100px] sm:px-2 px-7">
        <form action={createProject}>
        <Card className="w-full max-w-lg">
      <CardHeader className="flex flex-row items-start">
        <div className="space-y-1.5">
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>Start a new project by filling out the details below.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="border-t pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input name="name" id="project-name" placeholder="Enter project name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project-description">Project Description</Label>
            <Textarea name="description" className="min-h-[100px]" id="project-description" placeholder="Describe the project" required />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" type="submit">
          Create Project
        </Button>
      </CardFooter>
    </Card>
        </form>
    </div>
  )
}

