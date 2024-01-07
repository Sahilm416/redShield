"use server";
import { nanoid } from "nanoid";
import { db } from "@/utils/database/db";

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

    const res = await fetch("https://redshield.vercel.app/api/service/resetPassword", {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.RED_KEY!,
      },
      body: JSON.stringify({
        email: email,
        token: generatedToken,
        endpoint: "https://redshield.vercel.app/ResetPassword",
      }),
    });
    
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
