"use server";
const { sign } = require("jsonwebtoken");
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
export const LoginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/login", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    });
    const response = await res.json();

    if (response.status) {
      await setJWT({ email: data.email, project_id: response.project_id });
      return {
        status: true,
        message: response.message,
      };
    }
    return {
      status: false,
      message: response.message,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};

const setJWT = async ({
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
