"use server";
import { db } from "@/utils/database/db";

export const checkUsername = async (data: { username: string }) => {
   const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,19}$/;



  if (!usernameRegex.test(data.username)) {
    return { status: false, message: "Username is not valid." };
  }

  const res = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_name: string;
    project_id: string;
  };
  if (!res) {
    return { status: false, message: "something went wrong" };
  } else {
    const check = await db.get(res.project_id + ":=>" + data.username.toLowerCase());

    if (check === null) {
      return { status: true, message: "username is available" };
    } else {
      return { status: false, message: "username is already taken" };
    }
  }
};

export const checkEmail = async (data: { email: string }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email) || data.email.length >= 25) {
    return { status: false, message: "invalid email" };
  }

  const res = (await db.get("API_KEY:" + process.env.RED_KEY!)) as {
    project_name: string;
    project_id: string;
  };
  if (!res) {
    return { status: false, message: "something went wrong" };
  } else {
    const check = await db.get(res.project_id + ":->" + data.email);
    if (check === null) {
      return { status: true, message: "valid email" };
    } else {
      return { status: false, message: "email already exists" };
    }
  }
};

export const checkPassword = async (data: { password: string }) => {
  // Check for at least one special character
  if (!/(?=.*[!@#$%^&*])/.test(data.password)) {
    return { status: false, message: "must contain one special character" };
  }

  //check for special characters
  if (!/(?=.*[0-9])/.test(data.password)) {
    return {
      status: false,
      message: "Password must contain at least one number.",
    };
  }

  // Check for minimum length of 8 characters
  if (data.password.length < 8) {
    return {
      status: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (data.password.length > 20) {
    return { status: false, message: "too long password" };
  }
  // If all conditions pass, consider the password valid
  return { status: true, message: "Valid password" };
};

