"use client";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject } from "@/app/actions/project";
import { toast } from "sonner";

type Project = {
  id: string;
  image: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [disableDelete, setDisableDelete] = useState<boolean>(true);
  const router = useRouter();
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteproject = async ({
    project,
  }: {
    project: { id: string; key: string };
  }) => {
    toast.loading("Deleteting project...");
    const res = await deleteProject({
      id: project.id,
      key: project.key,
    });

    if (res.status) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    return router.refresh();
  };

  return (
    <>
      {projects.length > 0 ? (
        <main className="flex flex-col w-full px-4 gap-5 md:gap-8 md:px-10 mb-5">
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4 sticky top-[60px] nav pt-3  py-2 z-[20]">
            <Input
              className="bg-white dark:bg-black rounded-none border border-[#EBEBEB] dark:border-[#1F1F1F]"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Link href={"/New"}>
              <Button className="rounded-none">Add New Project</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl max-w-[450px] w-full mx-auto">
            {filteredProjects.map((project, i) => {
              return (
                <AlertDialog key={i}>
                  <Card className=" bg-white dark:bg-gray-900/20 shadow-md rounded-none border-[#EBEBEB] dark:border-[#1F1F1F] ">
                    <CardHeader className="gap-4 pb-2  ">
                      <div className="grid gap-2">
                        <CardTitle className="flex justify-between items-center">
                          <p>{project.name}</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger className=" focus:outline-none">
                              <span className=" cursor-pointer">
                                <MoreVertical />
                              </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="border-[#EBEBEB] dark:border-[#1F1F1F] rounded-none">
                              <DropdownMenuItem className="text-md rounded-none">
                                <AlertDialogTrigger className="w-full h-full text-start">
                                  Delete
                                </AlertDialogTrigger>
                              </DropdownMenuItem>

                              <DropdownMenuItem className="text-md rounded-none">
                                <Link
                                  className="w-full h-full text-start"
                                  href={`/Edit/Project/${project.id}`}
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="w-full h-[150px] overflow-hidden select-none">
                        <Avatar>
                          <AvatarImage
                            src={project.image}
                            width={400}
                            height={200}
                            alt="Picture of the author"
                            className=" w-full"
                          />
                          <AvatarFallback className=" w-full h-full flex justify-center items-center text-slate-300">
                            Loading...
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link className="w-full" href={`/Project/${project.id}`}>
                        <Button
                          variant={"outline"}
                          className="w-full rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]"
                        >
                          view
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  <AlertDialogContent className="bg-[#ffffff] dark:bg-black border-[#EBEBEB] dark:border-[#1F1F1F]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <p className=" leading-7">
                      This will permanently delete project{" "}
                      <span className="font-semibold text-red-700">
                        {project.name}
                      </span>{" "}
                      and also the related data such as users related to it.{" "}
                      <br />
                      Type{" "}
                      <span className="py-1 px-2 dark:bg-zinc-900 bg-zinc-100 rounded-lg">
                        delete project {project.name}
                      </span>{" "}
                      <br />
                      <Input
                        onPaste={(e) => e.preventDefault()}
                        onChange={(e) => {
                          setDisableDelete(
                            !(
                              e.target.value ===
                              `delete project ${project.name}`
                            )
                          );
                          console.log(disableDelete);
                        }}
                        name="delete_project"
                        className="rounded-none mt-3 border-[#EBEBEB] dark:border-[#1F1F1F]"
                      />
                    </p>
                    <AlertDialogFooter className="gap-3">
                      <AlertDialogCancel className=" rounded-none border-[#EBEBEB] dark:border-[#1F1F1F]">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDeleteproject({ project: project })
                        }
                        disabled={disableDelete}
                        className=" rounded-none bg-red-700 hover:bg-red-600 text-white"
                      >
                        delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              );
            })}
          </div>
        </main>
      ) : (
        <div className="w-full mt-[40px] min-h-[calc(100vh-100px)] flex flex-col items-center gap-5">
          <p className="text-center text-slate-400 text-xl mt-5">No Projects</p>
          <Link href={"/New"}>
            <Button className="w-[200px] rounded-none">create project</Button>
          </Link>
        </div>
      )}
    </>
  );
}
