"use client";
import Profile from "@/components/Profile";
import { LoggedUser, getUserInfo } from "../actions/auth";
import { useEffect, useState } from "react";
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

export default function DashboardPage() {
  const [data, setData] = useState<userData>();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await LoggedUser();
    const user = await getUserInfo({ username: res.data }) as userData;
    setData(user);
  };

  return (
    <div className="w-full flex flex-col gap-5 justify-start items-center mt-[100px]">
      {!data ? (
        "Loading..."
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
            <NotVerified />
          )}
        </>
      )}
    </div>
  );
}
