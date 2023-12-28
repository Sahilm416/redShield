"use server";

import { setCookie, getCookie, deleteCookie } from "cookies-next";

import { cookies } from "next/headers";
const { sign, verify } = require("jsonwebtoken");

export const LoginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/login", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.RED_KEY!,
      },
      body: JSON.stringify({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    });
    const response = await res.json();

    if (response.status) {
      return {
        success: true,
        message: response.message,
      };
    }
    return {
      success: false,
      message: response.message,
    };
  } catch (error) {
    console.log(error);
  }
};



export const ValidateAuthToken = async (token: string | undefined) => {
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

export const LoggedUser = async () => {
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
      data: verifyToken.username,
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
  isVerified: boolean;
  password: string;
  uid: string;
  username: string;
  profile_picture?: string;
};

type userInfoStructure = {
  user: User;
  projects: Project[];
};

export const getUserInfo = async ({ username }: { username: string }) => {
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
          username: username.toLowerCase(),
        }),
      }
    );

    const response: userInfoStructure = await res.json();
    return {
      username: response.user.username,
      email: response.user.email,
      isVerified: response.user.isVerified,
      profile_picture:
        response.user.profile_picture || "https://github.com/sahilm416.png",
      projects: response.projects,
    };
  } catch (error) {
    console.log("something went wrong", error);
  }
};

