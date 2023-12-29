"use server";
import { db } from "@/utils/database/db";

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
