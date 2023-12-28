"use server";

import { db } from "@/utils/database/db";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
const { sign, verify } = require("jsonwebtoken");
//action to send email verification using resend
export const sendVerification = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/sendVerification",
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          username: username,
          email: email,
          url_endpoint: "https://redshield.vercel.app/Verify",
        }),
      }
    );
    const response = await res.json();
    if (response)
      return {
        status: true,
        message: "verification sent successfully",
      };
  } catch (error) {
    console.log("error sending verification", error);
    return null;
  }
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

export const verifyUser = async ({ token }: { token: string }) => {
  try {
    const data = verify(token, process.env.JWT_SECRET_KEY!) as {
      username: string;
    };
    const key = (await db.get("API_KEY:" + process.env.RED_KEY)) as {
      project_name: string;
      project_id: string;
    };
    if (key) {
      const checkExpiry = await db.get(
        key.project_id + ":" + data.username + ":verify"
      );
      if (!checkExpiry) {
        console.log("invalid link");
        return {
          status: false,
          message: "invalid link",
          username: "",
          profile_picture: "",
        };
      }
      const searchKey = key.project_id + ":=>" + data.username;
      const user = (await db.get(searchKey)) as User;
      const updatedUser = await db.set(searchKey, {
        ...user,
        isVerified: true,
      });
      const updatedToken = sign(
        { username: user.username, isVerified: true },
        process.env.JWT_SECRET_KEY!
      );
      const date = new Date();
      const time = Date.now() + 7 * 24 * 60 * 60 * 1000;
      date.setTime(time);
      setCookie("_auth_token", updatedToken, {
        cookies,
        expires: date,
        secure: true,
        sameSite: true,
        httpOnly: true,
      });
      return {
        status: true,
        message: "success",
        username: user.username,
        profile_picture: user.profile_picture || "",
      };
    }
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "something went wrong",
      username: "",
      profile_picture: "",
    };
  }
};


export const RegisterAction = async (formData:FormData)=>{
  const email = formData.get('email');
  if(email){
  console.log("data is", email);
  }else{
  console.log("data is", formData.get('code'));
    
  }
}