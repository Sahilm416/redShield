"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createNewProject } from "@/app/actions/project";
import { validateInput } from "@/app//actions/checks";
import { toast } from "sonner";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
export default function CreateProject(){
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [data, setData] = useState<{ name: string; description: string }>({
      name: "",
      description: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    };
    const createProject = async () => {
      try {
        setLoading(true);
  
        const validation = validateInput(data.name, data.description);
  
        if (!validation.status) {
          setLoading(false);
          toast.error(validation.message);
          return;
        }
  
        const res = await createNewProject({
          project_name: data.name,
          project_description: data.description,
        });
  
        if (res.status) {
          toast.success(res.message);
          router.push("/Dashboard");
          return router.refresh();
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.error("Server action error", error);
      } finally {
        setLoading(false);
      }
    };
    return (
        <div className="w-full grid place-items-center mt-[100px] sm:px-2 px-7">
        <Card className="w-full max-w-lg dark:bg-gray-900/20 bg-white rounded-none shadow-lg">
          <CardHeader className="flex flex-row items-start">
            <div className="space-y-1.5">
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>
                Start a new project by filling out the details below.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="border-t pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  className=" rounded-none"
                  onChange={handleChange}
                  value={data.name}
                  name="name"
                  id="project-name"
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea
                  onChange={handleChange}
                  value={data.description}
                  name="description"
                  className="min-h-[100px] max-h-[300px] rounded-none"
                  id="project-description"
                  placeholder="Describe the project"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={createProject}
              disabled={loading}
              className="sm:w-[200px] sm:ml-auto w-full rounded-none"
            >
              {loading ? (
               <Oval
               visible={true}
               height="25"
               width="25"
               strokeWidth="5"
               color="white"
               ariaLabel="oval-loading"
               secondaryColor="black"
             />
              ) : (
                "create project"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
}