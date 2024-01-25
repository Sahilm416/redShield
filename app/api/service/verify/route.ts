import { ValidateAuthToken } from "@/app/actions/auth";
const { db } = require("@/utils/database/db");
const { NextResponse } = require("next/server");

export const POST = async (request: Request) => {
  const key = request.headers.get("authorization") as string;
  const isValidKey = await db.get("API_KEY:" + key);

  if (!isValidKey) {
    console.log("unauthorized key");
    return NextResponse.json({ message: "Unauthorized key" }, { status: 401 });
  }

  const data: { token: string } = await request.json();
  try {
    const res = await ValidateAuthToken({ token: data.token });
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: false,
      message: "some error occurred",
    });
  }
};
