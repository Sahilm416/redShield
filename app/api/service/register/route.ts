const { NextResponse } = require("next/server");
const { db } = require("@/utils/database/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

interface reqBody {
  email: string;
  password: string;
  profile_picture?: string;
}

export const POST = async (request: Request) => {
  const data: reqBody = await request.json();
  const key = request.headers.get("authorization") as string;
  const res = (await db.get("API_KEY:" + key)) as { project_id: string };

  if (!res) {
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }

  try {
    const checkAlreadyExists = await db.get(
      `${res.project_id}:${data.email}:user`
    );
    if (checkAlreadyExists) {
      return NextResponse.json({
        status: false,
        message: " user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password.trim(), 10);
    const newUser = {
      uid: uuidv4(),
      password: hashedPassword,
      email: data.email.trim(),
      profile_picture:
        data.profile_picture ||
        "https://vercel.com/api/www/avatar/e4HZrj63hu6L3DgyuIE06nf7?&s=64",
      creation_date: new Date(),
      pwd_version: Date.now(),
    };
    await db.set(res.project_id + ":" + data.email + ":user", newUser);

    return NextResponse.json({
      status: true,
      message: "Registered successfully",
    });
  } catch (error) {
    console.log("error registering", error);
    return NextResponse.json({
      status: false,
      message: "something went wrong",
    });
  }
};
