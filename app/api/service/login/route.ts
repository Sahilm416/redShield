const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { setCookie } = require("cookies-next");
const { cookies } = require("next/headers");

interface reqBody {
  email: string;
  password: string;
  project_id: string;
}

export const POST = async (request: Request , response : Response) => {
  const pipeline = db.pipeline();
  const key = request.headers.get("authorization") as string;
  const { email, password, project_id } = (await request.json()) as reqBody;

  pipeline.get("API_KEY:" + key);
  pipeline.get(`${project_id}:${email}:loginFailed`) || 0;
  pipeline.get(`${project_id}:${email}:user`);

  const res = await pipeline.exec();

  if (!res[0]) {
    return NextResponse.json({
      status: false,
      message: "unauthorized key",
    });
  }
  if (res[1] > 9) {
    return NextResponse.json({
      status: false,
      message: "Too many failed login attempts try after 10 mins",
    });
  }
  if (!res[2]) {
    return NextResponse.json({
      status: false,
      message: "not found",
    });
  }
  const isAuth = await bcrypt.compare(password, res[2].password);

  if (isAuth) {
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    const JWTtoken = await sign(
      {
        email: res[2].email,
        project_id: project_id,
        pwd_version: res[2].pwd_version,
        expires: date.getTime(),
      },
      process.env.JWT_SECRET_KEY!
    );
      setCookie("_auth_token", JWTtoken, {
      cookies,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: date.getTime()
    });
    return NextResponse.json({
      status: true,
      message: "login success"
    })
  } else {
    const loginFailedAttempts = res[1] || 0;
    await db.set(
      `${project_id}:${email}:loginFailed`,
      loginFailedAttempts + 1,
      { ex: 600 }
    );
    return NextResponse.json({
      status: false,
      message: "Invalid  credentials",
    });
  }
};
