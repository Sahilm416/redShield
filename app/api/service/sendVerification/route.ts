const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { sign, verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  emailTemplate,
} = require("../../../../components/emailTemplates/verifyMail");

interface reqBody {
  username: string;
  email: string;
  url_endpoint: string;
}



export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key);
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    const data: reqBody = await request.json();
    if((!data.email) || (!data.username.length) || (!data.url_endpoint)) {
      return NextResponse.json({message:"provide essential data !"}, { status: 401 });
    }
    const requestedUser = await db.get(
      `${res.project_id + ":=>" + data.username}`
    );
    if (!requestedUser) {
      return NextResponse.json(
        { message: "username doesnt exists" },
        { status: 401 }
      );
    }
    try {

      const token = sign({username :data.username },process.env.JWT_SECRET_KEY!);
      console.log(token);
      await db.set(res.project_id+":"+requestedUser.username+":"+"verify",token,{ex:600});
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER!,
          pass: process.env.MAIL_PASS!,
        },
      });
      const mailOptions = {
        from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
        to: data.email,
        subject: `Verify Email for ${res.project_name}`,
        html: await emailTemplate({
          name: data.username,
          verificationLink: data.url_endpoint+`/${token}`,
          project:res.project_name
        }),
      };

      const info = await transporter.sendMail(mailOptions);
      
      return NextResponse.json(
        {message:"email sent successfully" },{status:200}
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "error while sending mail" },
        { status: 400 }
      );
    }
  }
};
