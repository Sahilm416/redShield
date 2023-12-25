import Profile from "@/components/Profile";
import { getUserInfo } from "../app/actions/auth";
import ErrorPage from "./Error";
import ProjectList from "@/components/ProjectList";
import NotVerified from "@/components/NotVerifield";

type Project = {
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

export default async function DashboardComponent({
  username,
}: {
  username: string;
}) {
  const data = await getUserInfo({ username: username });

  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center mt-[100px]">
      {!data ? (
        (<ErrorPage/>)
      ) : (
        <>
          <Profile
            username={data?.username}
            email={data?.email}
            isVerified={data?.isVerified}
            profile_picture={data?.profile_picture}
          />
          {data.isVerified ? (
            <ProjectList projects={data.projects} />
          ) : (
            <NotVerified username={data.username} email={data.email} />
          )}
        </>
      )}
    </div>
  );
}
