const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { transporter } = require("@/utils/nodeMailer/config");
const {
  passwordChangeTemplate,
} = require("@/components/emailTemplates/resetPassword");

interface reqBody {
  email: string;
  token: string;
  endpoint: string;
}

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key);
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as reqBody;

    const link = `${data.endpoint}/${data.token}`;
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
