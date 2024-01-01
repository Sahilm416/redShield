import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <>
      {projects.length > 0 ? (
        <main className="flex flex-col w-full p-4 gap-5 md:gap-8 md:p-10">
          <div className="max-w-6xl w-full mx-auto flex items-center gap-4">
            <form className="flex-1">
              <Input
                className="bg-white dark:bg-black"
                placeholder="Search projects..."
              />
              <Button className="sr-only" type="submit">
                Submit
              </Button>
            </form>
            <Link href={"/New"}>
              <Button>Add New Project</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:max-w-6xl max-w-[450px] w-full mx-auto">
            {projects.map((project, i) => {
              return (
                <Card key={i} className=" bg-white dark:bg-black">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2  ">
                    <div className="grid gap-1">
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="w-full h-[150px] overflow-hidden select-none">
                      <Image
                        src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        width={400}
                        height={200}
                        alt="Picture of the author"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link className="w-full" href={`/Project/${project.id}`}>
                      <Button
                        variant={"outline"}
                        className="w-full bg-green-700 text-white hover:text-slate-100 hover:bg-green-800"
                      >
                        view
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
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
