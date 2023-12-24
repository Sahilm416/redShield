"use client";
import Profile from "@/components/Profile";
import { LoggedUser, getUserInfo } from "../actions/auth";
import { useEffect, useState } from "react";
import ProjectList from "@/components/ProjectList";
import NotVerified from "@/components/NotVerifield";
import { P } from "@upstash/redis/zmscore-b6b93f14";

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
  const [res ,setREs] = useState<{status:boolean , message: string , data: string} | undefined>();
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
   const res = await LoggedUser() as {status:boolean , message: string , data: string} ;
   console.log("res is " + res);

    setREs(res);
  
   
    const user = await getUserInfo({ username: res.data });
    console.log("user is " + user);
    setData(user);
  };

  return (
    <p className="mt-[200px]">token data is {res?.data}</p>
   /* <div className="w-full flex flex-col gap-5 justify-start items-center mt-[100px]">
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
          {data.isVerified ? (<ProjectList projects={data.projects}  />) : (<NotVerified />)}
        </>
      )}
    </div> */
  );
}
