const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const { transporter } = require("@/utils/nodeMailer/config");
const { verifyMail } = require("@/components/emailTemplates/verifyMail");

interface reqBody {
  email: string;
  code: number;
}

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const res = await db.get("API_KEY:" + key) as {project_id: string ,project_name: string};
  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }
  try {
    const data = (await request.json()) as reqBody;

    const mailOptions = {
      from: `${res.project_name} <redshield.vercel.app@gmail.com>`,
      to: data.email,
      subject: `Verify Email for ${res.project_name}`,
      html: await verifyMail({
        email: data.email,
        code: data.code,
        project: res.project_name,
      }),
    };
    await db.set(res.project_id + ":" + data.email + ":code", data.code, { ex: 180 });
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
