"use server";
import { nanoid } from "nanoid";
import { db } from "@/utils/database/db";
import { LogOut } from "./auth";
const bcrypt = require("bcrypt");

export const sendResetPasswordLink = async ({ email }: { email: string }) => {
  //token for link
  const generatedToken = nanoid(50);

  try {
    const { project_id } = (await db.get(
      "API_KEY:" + process.env.RED_KEY!
    )) as {
      project_id: string;
    };
    const count: number =
      (await db.get(`${project_id}:${email}:forgotPassAttempts`)) || 0;
    //if too many attempts then halt immediately i.e. 5
    if (count > 4) {
      return {
        status: false,
        message: "Too many attempts to reset password try again after 5 hours",
      };
    }
    //increase the password attempt counter
    await db.set(`${project_id}:${email}:forgotPassAttempts`, count + 1, {
      ex: 18000,
    });
    //set the token for password reset
    await db.set(
      `${project_id}:${generatedToken}:forgotPass`,
      { email: email },
      { ex: 180 }
    );

    const res = await fetch(
      "https://redshield.vercel.app/api/service/resetPassword",
      {
        method: "POST",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          email: email,
          token: generatedToken,
          endpoint: "http://localhost:3000/ResetPassword",
        }),
      }
    );

    const response = (await res.json()) as { status: boolean; message: string };

    return {
      status: response.status,
      message: response.message,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "sometghing went wrong",
    };
  }
};

export const checkResetPasswordToken = async ({ token }: { token: string }) => {
  try {
    //get project id of user
    const { project_id } = (await db.get(
      `API_KEY:${process.env.RED_KEY!}`
    )) as { project_id: string };
    const checktokenValidity = (await db.get(
      `${project_id}:${token}:forgotPass`
    )) as { email: string };
    //if token is null i.e. invalid token
    if (!checktokenValidity) {
      return {
        status: false,
        message: "invalid link to reset password",
      };
    }
    //token is valid
    return {
      status: true,
      message: "valid link to reset password",
      data: checktokenValidity.email,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};

//change password
type User = {
  email: string;
  password: string;
};

export const changePassword = async ({
  password,
  email,
  token,
}: {
  password: string;
  email: string;
  token: string;
}) => {
 
  try {
    const { project_id } = (await db.get(
      `API_KEY:${process.env.RED_KEY!}`
    )) as { project_id: string };

    const user = (await db.get(`${project_id}:${email}:user`)) as User;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pwd_version = new Date();
    pwd_version.getTime();
    const updatedUser = {
      ...user,
      password: hashedPassword,
      pwd_version: pwd_version.getTime(),
    };

    await db.set(`${project_id}:${email}:user`, updatedUser);
    await LogOut();
    await db.del(`${project_id}:${token}:forgotPass`);


    return {
      status: true,
      message: "password updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "failed to change password",
    };
  }
};
