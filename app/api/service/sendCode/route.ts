const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { verifyMail } = require("@/components/emailTemplates/verifyMail");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER!,
      pass: process.env.MAIL_PASS!,
    },
  });
  

interface reqBody {
  email: string;
}

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key) as {project_id: string ,project_name: string};
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as reqBody;
    const code = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
      to: data.email,
      subject: `Verify Email for ${res.project_name}`,
      html: await verifyMail({
        email: data.email,
        code: code,
        project: res.project_name,
      }),
    };
    await db.set(res.project_id + ":" + data.email + ":code", code, { ex: 180 });
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
