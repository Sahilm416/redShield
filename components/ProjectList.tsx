import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
type Project = {
  id: string
  name: string;
  description: string;
  created_at: string;
  key: string;
};

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <>
      {(projects.length > 0) ? (
        <main className="w-full max-w-[750px] grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 sm:px-2 px-4">
          {projects.map((project, i) => (
            <Link href={`/Project/${project.id}`}>
            <Card
              key={i}
              className="bg-slate-300 cursor-pointer hover:border-slate-500 m-3 dark:bg-black dark:text-slate-300 text-slate-800"
            >
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card></Link>
          ))}
        </main>
      ) : (
        <p className="text-center text-slate-400 text-xl mt-5">No Projects</p>
      )}
    </>
  );
}
