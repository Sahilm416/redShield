const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { transporter } = require("@/utils/nodeMailer/config");
const {
  passwordChangeTemplate,
} = require("@/components/emailTemplates/resetPassword");
import { nanoid } from "nanoid";

interface reqBody {
  email: string;
  endpoint: string;
}

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = (await db.get("API_KEY:" + key)) as {
    project_id: string;
    project_name: string;
  };
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as reqBody;
    //check if user exists
    const userExists = await db.get(`${res.project_id}:${data.email}:user`);
    if (!userExists) {
      return NextResponse.json({
        status: false,
        message: "User not found",
      });
    }
    //check the password reset attempts
    const count: number =
      (await db.get(`${res.project_id}:${data.email}:forgotPassAttempts`)) || 0;
    //if too many password reset attempts
    if (count > 4) {
      return NextResponse.json({
        status: false,
        message: "Too many attempts to reset password try again after 5 hours",
      });
    }
    //increase the password attempt counter
    await db.set(
      `${res.project_id}:${data.email}:forgotPassAttempts`,
      count + 1,
      {
        ex: 18000,
      }
    );
    //generate token for password reset
    const generatedToken = nanoid(50);
    //set the token for password reset
    await db.set(
      `${res.project_id}:${generatedToken}:forgotPass`,
      { email: data.email },
      { ex: 180 }
    );
    //link to endpoint
    const link = `${data.endpoint}/${generatedToken}`;
    const mailOptions = {
      from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
      to: data.email,
      subject: `Reset password for ${res.project_name}`,
      html: await passwordChangeTemplate({
        email: data.email,
        link: link,
        project: res.project_name,
      }),
    };
    //send email with nodemailer email
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: true,
      message: "link sent successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: false, message: "error sending mail" });
  }
};
