"use server";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { db } from "@/utils/database/db";
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

type User = {
  email: string;
  password: string;
  profile_picture: string;
  pwd_version: number;
};
export const LoginUser = async (data: {
  email: string;
  password: string;
  project_id: string;
}) => {
  try {
    const pipeline = db.pipeline();

    pipeline.get(`${data.project_id}:${data.email}:loginFailed`) || 0;
    pipeline.get(`${data.project_id}:${data.email}:user`);

    const res = (await pipeline.exec()) as [
      number,
      { email: string; password: string; pwd_version: string }
    ];
    if (res[0] > 9) {
      return {
        status: false,
        message: "Too many failed login attempts try after 10 mins",
      };
    }
    if (!res[1]) {
      return {
        status: false,
        message: "not found",
      };
    }

    const isAuth = await bcrypt.compare(data.password, res[1].password);

    if (isAuth) {
      const JWTtoken = await sign(
        {
          email: res[1].email,
          project_id: data.project_id,
          pwd_version: res[1].pwd_version,
        },
        process.env.JWT_SECRET_KEY!,
        {
          expiresIn: "7 days",
        }
      );

      setJWT({ token: JWTtoken });

      return {
        status: true,
        message: "login success",
      };
    } else {
      const loginFailedAttempts = res[0] || 0;
      await db.set(
        `${data.project_id}:${data.email}:loginFailed`,
        loginFailedAttempts + 1,
        { ex: 600 }
      );
      return {
        status: false,
        message: "Invalid  credentials",
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
