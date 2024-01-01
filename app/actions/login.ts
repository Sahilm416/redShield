"use server";
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { db } from "@/utils/database/db";

type User = {
  email: string,
  password: string,
  profile_picture: string
}
export const LoginUser = async (data: { email: string; password: string }) => {
  try {
   //ger project id
    const { project_id } = (await db.get(
      "API_KEY:" + process.env.RED_KEY!
    )) as { project_id: string };
  //get user from db
    const user = await db.get(project_id + ":" + data.email + ":user") as User;
  //check if user exists
    if (user) {
      //check hashed password with bcrypt
      const isAuth = await bcrypt.compare(data.password, user.password);

      if (isAuth) {
        //setJWT token
        await setJWT({email: user.email, project_id: project_id})
        return {
          status: true,
          message: "Login Success",
          project_id: project_id,
        };
      } else {
        return {
          status: false,
          message: "Invalid credentials",
        };
      }
    } else {
      return {
        status: false,
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};

export const setJWT = async ({
  email,
  project_id,
}: {
  email: string;
  project_id: string;
}) => {
  try {
    const JWTtoken = await sign(
      { email: email, project_id: project_id },
      process.env.JWT_SECRET_KEY!
    );
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    const cookie = setCookie("_auth_token", JWTtoken, {
      cookies,
      expires: date,
      httpOnly: true,
      sameSite: true,
    });
  } catch (error) {
    console.log(error);
  }
};
