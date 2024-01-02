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
    const user = (await db.get(project_id + ":" + email + ":user")) as {
      email: string;
      profile_picture: string;
    };

    return {
      email: user.email,
      profile: user.profile_picture,
    };
  } catch (error) {
    console.log("something went wrong", error);
    return {
      email: "ok",
      profile: "ok",
    };
  }
};

export const getAllUsers = async ({ key }: { key: string }) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/getAllUsers",
      {
        headers: {
          Authorization: key,
        },
      }
    );
    if (res.status === 200) {
      const response = await res.json();
      return response.users;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const deleteUser = async ({
  email,
  secret,
}: {
  email: string;
  secret: string;
}) => {
  const { project_id } = (await db.get("API_KEY:" + secret)) as {
    project_id: string;
  };

await db.del(project_id + ":" + email + ":user");
await db.del(project_id + ":" + email + ":projects");

};


