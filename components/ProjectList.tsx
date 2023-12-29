import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
        <main className="flex flex-col w-full p-4 gap-5 md:gap-8 md:p-10 mt-[100px]">
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
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="grid gap-1">
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Link className="w-full" href={`/Project/${project.id}`}>
                      <Button
                        variant={"outline"}
                        className="w-full bg-gray-400/20 dark:bg-gray-700/80 dark:hover:bg-slate-700"
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
        <p className="text-center text-slate-400 text-xl mt-5">No Projects</p>
      )}
    </>
  );
}
