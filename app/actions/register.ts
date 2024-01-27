"use server";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
import { db } from "@/utils/database/db";
import { LoginUser } from "./login";

//send th code to email address
export const sendCode = async ({ email }: { email: string }) => {


  const { project_id } = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_id: string;
  };
  const checkAlreadyExists = await db.get(`${project_id}:${email}:user`);
  if (checkAlreadyExists) {
    return {
      status: false,
      message: " user already exists",
    };
  }

  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/sendCode",
      {
        method: "POST",
        next: { revalidate: 0 },
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          email: email
        }),
      }
    );

    return {
      status: true,
      message: "email sent successfully",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "error sending email",
    };
  }
};

//verify the sent code
export const verifyCode = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  const { project_id } = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_id: string;
  };
  const actualCode = await db.get(project_id + ":" + email + ":code");

  if (actualCode == code) {
    return {
      status: true,
      message: "verified the code successfully",
    };
  } else {
    return {
      status: false,
      message: "invalid code",
    };
  }
};

//register the new user to database
export const registerUser = async (data: {
  email: string;
  password: string;
  profile_picture?: string;
}) => {
  try {
    const { project_id } = (await db.get(
      "API_KEY:" + process.env.RED_KEY!
    )) as { project_id: string };

    const checkAlreadyExists = await db.get(`${project_id}:${data.email}:user`);
    if (checkAlreadyExists) {
      return {
        status: false,
        message: " user already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password.trim(), 10);
    const newUser = {
      uid: uuidv4(),
      password: hashedPassword,
      email: data.email.trim(),
      profile_picture:
        data.profile_picture ||
        "https://vercel.com/api/www/avatar/e4HZrj63hu6L3DgyuIE06nf7?&s=64",
      creation_date: new Date(),
      pwd_version: Date.now(),
    };
    await db.set(project_id + ":" + data.email + ":user", newUser);
    await db.set(project_id + ":" + data.email + ":projects", []);
    await LoginUser({ email: data.email, password: data.password });
    return {
      status: true,
      message: "Registered successfully",
    };
  } catch (error) {
    console.log("error registering", error);
    return {
      status: false,
      message: "something went wrong",
    };
  }
};
