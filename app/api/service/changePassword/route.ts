const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");
const bcrypt = require("bcrypt");

type User = {
    email: string;
    password: string;
  };
export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const isValidKey = (await db.get("API_KEY:" + key)) as { project_id: string };

  if (!isValidKey) {
    return NextResponse.json({
      status: false,
      message: "Invalid authorization key",
    });
  }

  const { token , email , password } = (await request.json()) as {
    token: string;
    email: string;
    password: string;
  };
  try {
    const checktokenValidity = (await db.get(
      `${isValidKey.project_id}:${token}:forgotPass`
    )) as { email: string };
 
    //check the token here too for extra security 
    if (!checktokenValidity) {
      return NextResponse.json({
        status: false,
        message: "invalid token to reset password",
      });
    }
    const user = (await db.get(`${isValidKey.project_id}:${email}:user`)) as User;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pwd_version = new Date();

    const updatedUser = {
      ...user,
      password: hashedPassword,
      pwd_version: pwd_version.getTime(),
    };
    //set the updated password
    await db.set(`${isValidKey.project_id}:${email}:user`, updatedUser);
    //delete the token 
    await db.del(`${isValidKey.project_id}:${token}:forgotPass`);
    
    return NextResponse.json({
      status: true,
      message: "password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "some error occurred",
    });
  }
};
