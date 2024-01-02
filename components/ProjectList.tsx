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
import { imageLinks } from "@/public/images";
import { useState } from "react";

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {projects.length > 0 ? (
        <main className="flex flex-col w-full p-4 gap-5 md:gap-8 md:p-10">
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4 sticky top-[60px] nav pt-3  p-2 z-[20]">
            <form className="flex-1">
              <Input
                className="bg-white dark:bg-black rounded-none"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="sr-only" type="submit">
                Submit
              </Button>
            </form>
            <Link href={"/New"}>
              <Button className=" rounded-none">Add New Project</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl max-w-[450px] w-full mx-auto">
            {filteredProjects.map((project, i) => {
              return (
                <AlertDialog>
                  <Card
                    key={i}
                    className=" bg-white dark:bg-gray-900/20 shadow-md rounded-none"
                  >
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
                            <DropdownMenuContent className="">
                              <DropdownMenuItem className="text-md">
                                <AlertDialogTrigger className="w-full h-full text-start">
                                  Delete
                                </AlertDialogTrigger>
                              </DropdownMenuItem>

                              <DropdownMenuItem className="text-md">
                                Edit
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
                            src={imageLinks[i]}
                            width={400}
                            height={200}
                            alt="Picture of the author"
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
                          className="w-full rounded-none"
                        >
                          view
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                  <AlertDialogContent className=" flex flex-row justify-center items-center bg-transparent border-none p-3">
                    <div className="bg-white dark:bg-black border border-slate-400 p-3 flex flex-col gap-3">
                      <AlertDialogHeader className="my-2">
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete{" "}
                          <span className=" font-bold text-slate-800 dark:text-white text-md">
                            {project.name}
                          </span>{" "}
                          and remove related data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-4 place-items-center">
                        <AlertDialogCancel className=" rounded-none w-[70vw] sm:w-auto">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction className="bg-red-800 text-white rounded-none w-[70vw] sm:w-auto">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              );
            })}
          </div>
        </main>
      ) : (
        <div className="w-full mt-[100px] grid place-items-center gap-4">
          <p className="text-center text-slate-400 text-xl mt-5">No Projects</p>
          <Link href={"/New"}>
            <Button className="w-[200px]">create project</Button>
          </Link>
        </div>
      )}
    </>
  );
}
