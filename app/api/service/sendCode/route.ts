const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const nodemailer = require("nodemailer");
const { verifyMail } = require("@/components/emailTemplates/verifyMail");
const {
  passwordChangeTemplate,
} = require("@/components/emailTemplates/resetPassword");

interface reqBody {
  email: string;
  code: number;
  cause: string;
}

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key);
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as reqBody;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
      },
    });

    const mailOptions =
      data.cause === "register"
        ? {
            from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
            to: data.email,
            subject: `Verify Email for ${res.project_name}`,
            html: await verifyMail({
              name: data.email,
              code: data.code,
              project: res.project_name,
            }),
          }
        : {
            from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
            to: data.email,
            subject: `Change password for ${res.project_name}`,
            html: await passwordChangeTemplate({
              name: data.email,
              code: data.code,
              project: res.project_name,
            }),
          };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "sent successfully" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error sending mail" },
      { status: 409 }
    );
  }
};
