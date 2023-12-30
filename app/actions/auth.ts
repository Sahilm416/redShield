"use server";

import { db } from "@/utils/database/db";
import { getCookie, deleteCookie } from "cookies-next";
import { setJWT } from "./login";
import { cookies } from "next/headers";
import { registerUser } from "./register";
import { nanoid } from "nanoid";
const { verify } = require("jsonwebtoken");

export const checkToken = async ({ token }: { token: string }) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/verify", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("something went wrong", error);
    return {
      status: false,
    };
  }
};

export const ValidateAuthToken = async ({ token }: { token: string }) => {
  if (!token) {
    return {
      status: false,
      message: "session token not found",
    };
  }

  try {
    const verifyToken = verify(token, process.env.JWT_SECRET_KEY!);
    return {
      status: true,
      message: "token is valid",
      data: verifyToken,
    };
  } catch (error) {
    console.log("error verifying token: " + error);

    return {
      status: false,
      message: "token signature invalid",
    };
  }
};

export const LogOut = async () => {
  const res = deleteCookie("_auth_token", { cookies });
  return {
    status: true,
    message: "logged out successfully",
  };
};

//return the details of logged in user

export const getUser = async () => {
  const token = getCookie("_auth_token", { cookies });
  if (!token) {
    return {
      status: false,
      message: "session token not found",
    };
  }

  try {
    const verifyToken = verify(token, process.env.JWT_SECRET_KEY!);
    return {
      status: true,
      message: "token is valid",
      data: verifyToken,
    };
  } catch (error) {
    console.log("error verifying token: " + error);

    return {
      status: false,
      message: "token signature invalid",
    };
  }
};

//get user information and project information

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  key: string;
};

type User = {
  creation_date: string;
  email: string;
  password: string;
  uid: string;
  profile_picture?: string;
};

type userInfoStructure = {
  user: User;
  projects: Project[];
};

export const getUserInfo = async ({ email }: { email: string }) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/getUser",
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          append: "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
      }
    );

    const response = (await res.json()) as userInfoStructure;
    return {
      email: response.user.email,
      profile_picture: response.user.profile_picture,
      projects: response.projects,
    };
  } catch (error) {
    console.log("something went wrong", error);
  }
};

export const checkGoogleUserExists = async ({
  email,
  profile_picture,
}: {
  email: string;
  profile_picture: string;
}) => {
  try {
    const { project_id } = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
      project_id: string;
    };
    const checkUser = await db.get(project_id + ":" + email);
    if (checkUser) {
      await setJWT({ email: email, project_id: project_id });
    } else {
      await registerUser({
        email: email,
        password: nanoid(10),
        profile_picture: profile_picture,
      });
    }
  } catch (error) {
    console.log("error happened",error)
  }
};
