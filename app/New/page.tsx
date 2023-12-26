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
import { createNewProject } from "../actions/project";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
export default function NewProject() {
  const [loading, setLoading] = useState<boolean>(false);

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
        window.location.href = "/Dashboard";
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Server action error", error);
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (name: string, description: string) => {
    if (name.length < 3) {
      return { status: false, message: "Name should be at least 3 characters" };
    }

    if (name.length > 15) {
      return { status: false, message: "Name should be at most 15 characters" };
    }

    if (description.length < 5) {
      return {
        status: false,
        message: "Description should be at least 5 characters",
      };
    }

    if (description.length > 40) {
      return {
        status: false,
        message: "Description should be at most 40 characters",
      };
    }

    return { status: true, message: "Validation successful" };
  };

  return (
    <div className="w-full grid place-items-center mt-[100px] sm:px-2 px-7">
      <Card className="w-full max-w-lg bg-slate-100 dark:bg-black">
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
                className="min-h-[100px]"
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
            className="sm:w-[200px] sm:ml-auto w-full"
          >
            {loading ? (
              <Loader darkOn="bg-black" darkOff="bg-white" />
            ) : (
              "create project"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
