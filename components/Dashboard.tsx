
import { getUserInfo } from "../app/actions/auth";
import ErrorPage from "./Error";
import ProjectList from "@/components/ProjectList";


type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

type userData = {
  username: string;
  email: string;
  isVerified: boolean;
  profile_picture?: string;
  projects: Project[];
};

export default async function DashboardComponent({ email }: { email: string }) {
  const data = await getUserInfo({ email: email });

  return (
    <div className="w-full mt-[100px] flex flex-col gap-5 justify-start items-center">
      {!data ? (
        <ErrorPage />
      ) : (
        <>
          <ProjectList projects={data.projects} />
        </>
      )}
    </div>
  );
}
