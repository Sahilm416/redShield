"use server";
import { db } from "@/utils/database/db";
import { getSession } from "./auth";

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
  try {
    const pipeline = db.pipeline();

    pipeline.del(project_id + ":" + email + ":user");
    pipeline.get(project_id + ":" + email + ":projects");
    pipeline.del(project_id + ":" + email + ":projects");
    const res = (await pipeline.exec()) as [number, [{ key: string }], number];
    if (!res[1]) {
      return {
        status: true,
        message: "User deleted successfully",
      };
    }
    const keysArray = [];
    //find all the keys of the projects of user
    for (let i in res[1]) {
      let info = (await db.get(`API_KEY:${res[1][i].key}`)) as {
        project_id: string;
        project_name: string;
      };
      keysArray.push({ id: info.project_id, key: res[1][i].key });
    }
    //delete each user of each key
    for (let i in keysArray) {
      let users = (await getAllUsers({ key: keysArray[i].key })) as [
        { email: string }
      ];
      if (users.length > 0) {
        for (let j in users) {
          await db.del(`${keysArray[i].id}:${users[j].email}:user`);
        }
      }

      await db.del(`API_KEY:${keysArray[i].key}`);
    }

    return {
      status: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "error deleting user",
    };
  }
};

//update user

type User = {
  first_name?: string;
  last_name?: string;
  creation_date: string;
  email: string;
  password: string;
  uid: string;
  profile_picture?: string;
};
export const updateUser = async ({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) => {
  try {
    const session = await getSession();

    const user = (await db.get(
      `${session.data.project_id}:${session.data.email}:user`
    )) as User;
    const newUser = {
      ...user,
      first_name: first_name.trim(),
      last_name: last_name.trim(),
    };
    await db.set(
      `${session.data.project_id}:${session.data.email}:user`,
      newUser
    );
    return {
      status: true,
      message: "settings updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "error updating settings",
    };
  }
};

export const changeUserRole = async ({
  email,
  role,
  secret,
}: {
  email: string;
  role: string;
  secret: string;
}) => {
  try {
    const { project_id } = (await db.get(`API_KEY:${secret}`)) as {
      project_id: string;
    };
    const user = (await db.get(`${project_id}:${email}:user`)) as {};
    if (!user) {
      return {
        status: false,
        message: "user not found",
      };
    }
    const newUser = {
      ...user,
      isAdmin: role === "Admin",
    };

    await db.set(`${project_id}:${email}:user`, newUser);

    return {
      status: true,
      message: "user role updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "error updating user role",
    };
  }
};
