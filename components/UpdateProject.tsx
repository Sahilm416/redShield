"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "@/app/actions/project";
import { validateInput } from "@/app/actions/checks";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";

type projectData = {
  id: string;
  image: string;
  name: string;
  description: string;
  key: string;
};
export default function UpdateProject({ project }: { project: projectData }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const fakeLoad = async () => {
    return;
  };
  const update = async (formData: FormData) => {
    const name = formData.get("pname") as string;
    const description = formData.get("pdescription") as string;
    const check = validateInput(name, description);
    if (check.status) {
      await fakeLoad();
      setLoading(true);
      const res = await updateProject(formData, project.id);
      if (res.status) {
        toast.success(res.message);
        router.push("/Dashboard");
        router.refresh();
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } else {
      toast.error(check.message);
    }
  };
  return (
    <>
      <form action={update}>
        <Card className="w-[90vw] sm:max-w-[450px] shadow-lg  bg-white dark:bg-gray-900/20">
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Label htmlFor="pname">Project Name</Label>
            <Input
              required
              type="text"
              placeholder={project?.name}
              name="pname"
              id="pname"
              className=" placeholder:dark:text-slate-100 placeholder:text-slate-800"
            />
            <Label htmlFor="pdescription">Project Description</Label>
            <Input
              required
              type="text"
              placeholder={project?.description}
              name="pdescription"
              id="pdescription"
              className=" placeholder:dark:text-slate-100 placeholder:text-slate-800"
            />
          </CardContent>
          <CardFooter className=" justify-end">
            <Button
              disabled={loading}
              type="submit"
              className="w-[150px] rounded-none"
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
                "save"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
