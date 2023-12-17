"use server";
import { cookies } from "next/headers";

export const LoginUser = async (data: {
  username: string;
  password: string;
}) => {
  try {
    const res = await fetch("https://redshield.vercel.app/api/service/login", {
      next: { revalidate: 0 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.RED_KEY!,
      },
      body: JSON.stringify({
        username: data.username.toLowerCase(),
        password: data.password,
      }),
    });
    const response = await res.json();
    if (response.message === "Login Success") {
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

export const registerUser = async (data: {
  username: string;
  password: string;
  email: string;
  profile_picture?: string;
}) => {
  try {
    const res = await fetch(
      "https://redshield.vercel.app/api/service/register",
      {
        next: { revalidate: 0 },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.RED_KEY!,
        },
        body: JSON.stringify({
          username: data.username.toLowerCase(),
          password: data.password,
          email: data.email.toLowerCase(),
          profile_picture: data.profile_picture,
        }),
      }
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const LoginSuccess = async () => {
  const cookiStore = cookies();
  const cookie = cookiStore.set("auth_token", "12345" , {
    httpOnly: true
  });

  return {
    status: true,
    message: "cookies set successfully",
  };
};
