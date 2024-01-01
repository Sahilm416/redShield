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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MoreVertical } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
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
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4 sticky top-[60px] nav pt-3  p-2">
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
                <Drawer>
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
                            <DropdownMenuContent>
                              <DropdownMenuItem className="text-md">
                                <DrawerTrigger className="w-full h-full text-start">
                                  Delete
                                </DrawerTrigger>
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
                  <DrawerContent className="flex justify-center items-center flex-col h-[40vh] bg-white dark:bg-black">
                    <DrawerHeader>
                      <DrawerTitle className=" text-center">
                        Are tou sure ?
                      </DrawerTitle>
                      <DrawerDescription className="text-center">
                        This action can't be undone.
                      </DrawerDescription>
                    </DrawerHeader>
                    <p className=" dark:text-slate-200 text-slate-500">
                      Delete project{" "}
                      <span className="text-slate-600 dark:text-slate-100 font-bold">
                        {project.name}
                      </span>
                    </p>
                    <div className="flex sm:flex-row gap-8 my-10">
                      <Button className=" rounded-none" variant={"destructive"}>
                        Delete
                      </Button>
                      <DrawerClose>
                        <Button className=" rounded-none">Cancel</Button>
                      </DrawerClose>
                    </div>
                  </DrawerContent>
                </Drawer>
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
