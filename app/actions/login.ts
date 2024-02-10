"use server";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { db } from "@/utils/database/db";

type User = {
  email: string;
  password: string;
  profile_picture: string;
  pwd_version: number;
};
export const LoginUser = async (data: { email: string; password: string }) => {
  try {
    //ger project id
    const { project_id } = (await db.get(
      "API_KEY:" + process.env.RED_KEY!
    )) as { project_id: string };

    //api for login user
    const res = await fetch("https://redshield.vercel.app/api/service/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.RED_KEY!
      },
      body: JSON.stringify({
        email : data.email,
        password: data.password,
        project_id: project_id,
      })
    });

    const response = await res.json() as { status: boolean, message: string , token: string};
    if(response.status){
         setJWT({token: response.token})
    }

    return {
      status: response.status || false,
      message: response.message || "something went wrong",
    }

    //check if too many failed login attempts
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};

const setJWT = ({ token }: { token: string }) => {
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);

  const cookie = setCookie("_auth_token", token, {
    cookies,
    expires: date,
    httpOnly: true,
    sameSite: true,
  });
};
