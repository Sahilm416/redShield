const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

interface reqBody {
  email: string;
  password: string;
}
//make it run on edge
export const runtime = "edge"

export const POST = async (request: Request) => {
  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const { project_id } = await db.get("API_KEY:" + key);

  if (!project_id) {
    console.log("unauthorized key");
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  } else {
    //check if too many failed login attempts
    const loginFailedAttempts: number =
      (await db.get(`${project_id}:${data.email}:loginFailed`)) || 0;
      //check excides failed login attempts
    if (loginFailedAttempts > 9) {
      return NextResponse.json({
        status: false,
        message: "Too many failed login attempts try after 10 mins",
      });
    }
    const searchKey = project_id + ":" + data.email + ":user";
    const user = await db.get(searchKey);

    if (user) {
      const isAuth = await bcrypt.compare(data.password, user.password);

      if (isAuth) {
        const date = new Date();
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        const JWTtoken = await sign(
          {
            email: user.email,
            project_id: project_id,
            pwd_version: user.pwd_version,
            expires: date.getTime(),
          },
          process.env.JWT_SECRET_KEY!
        );

        return NextResponse.json({
          status: true,
          message: "Login Success",
          token: JWTtoken,
        });
      } else {
        //login fail count 
        await db.set(
          `${project_id}:${data.email}:loginFailed`,
          loginFailedAttempts + 1,
          { ex: 600 }
        );
        return NextResponse.json({
          status: false,
          message: "Invalid credentials",
        });
      }
    } else {
      return NextResponse.json({
        status: false,
        message: "Invalid credentials",
      });
    }
  }
};
