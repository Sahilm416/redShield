"use server";
import { db } from "@/utils/database/db";
import { getUser } from "./auth";

//get the specific user
export const getUserInfo = async ({
  email,
  project_id,
}: {
  email: string;
  project_id: string;
}) => {
  try {
    const user = await db.get(project_id + ":" + email) as {email: string , profile_picture: string};

    return {
        email: user.email,
        profile: user.profile_picture,
    }
  } catch (error) {
    console.log("something went wrong", error);
    return {
        email: "ok",
        profile: "ok",
    }
  }
};


export const getAllUsers = async ()=>{
    const user = await getUser();

    const allUsers = await db.keys(user.data.project_id+":*:projects");
    console.log(allUsers)
}